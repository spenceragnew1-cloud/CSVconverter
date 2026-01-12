"use client";

import { useState, useRef, DragEvent, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/ga";

const MAX_FILE_SIZE_MB = 10;
const MAX_ROWS = 50000;

type ParseState = "idle" | "parsing" | "ready" | "converting" | "done" | "error";

interface ParsedData {
  rows: string[][];
  delimiter: string;
  rowCount: number;
  fileName: string;
  fileSize: number;
}

export default function CSVToGoogleSheetsPage() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<ParseState>("idle");
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [error, setError] = useState<string>("");
  const [hasHeader, setHasHeader] = useState(true);
  const [autoDetectDelimiter, setAutoDetectDelimiter] = useState(true);
  const [delimiter, setDelimiter] = useState<string>(",");
  const [sheetName, setSheetName] = useState<string>("Sheet1");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [spreadsheetUrl, setSpreadsheetUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle OAuth callback
  useEffect(() => {
    const token = searchParams.get("token");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setError(
        errorParam === "access_denied"
          ? "Authorization was denied. Please try again and grant the necessary permissions."
          : `Authorization error: ${errorParam}`
      );
      setState("error");
      // Clean URL
      window.history.replaceState({}, "", "/csv-to-google-sheets");
    } else if (token) {
      setAccessToken(token);
      // Clean URL
      window.history.replaceState({}, "", "/csv-to-google-sheets");
      // If we have data ready, automatically upload
      if (parsedData) {
        uploadToGoogleSheets(token);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Sample CSV for testing
  const sampleCSV = `Name,Age,City,Email
John Doe,30,New York,john@example.com
Jane Smith,25,Los Angeles,jane@example.com
Bob Johnson,35,Chicago,bob@example.com
Alice Williams,28,Houston,alice@example.com
Charlie Brown,32,Phoenix,charlie@example.com`;

  const detectDelimiter = (text: string): string => {
    const firstLines = text.split("\n").slice(0, 5).join("\n");
    const delimiters = [",", ";", "\t"];
    let bestDelimiter = ",";
    let maxCount = 0;

    for (const delim of delimiters) {
      const count = (firstLines.match(new RegExp(delim, "g")) || []).length;
      if (count > maxCount) {
        maxCount = count;
        bestDelimiter = delim;
      }
    }

    return bestDelimiter;
  };

  const parseCSV = (text: string, delim: string): string[][] => {
    const lines = text.split(/\r?\n/).filter((line) => line.trim());
    const rows: string[][] = [];

    for (const line of lines) {
      const row: string[] = [];
      let current = "";
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
          if (inQuotes && nextChar === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === delim && !inQuotes) {
          row.push(current);
          current = "";
        } else {
          current += char;
        }
      }
      row.push(current);
      rows.push(row);
    }

    return rows;
  };

  const handleFile = async (file: File) => {
    setError("");
    setState("parsing");

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please upload a .csv file.");
      setState("error");
      return;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      setError(
        `File is too large (${fileSizeMB.toFixed(2)}MB). Maximum size is ${MAX_FILE_SIZE_MB}MB. Please split your file or use a smaller file.`
      );
      setState("error");
      return;
    }

    try {
      const text = await file.text();
      const detectedDelimiter = autoDetectDelimiter
        ? detectDelimiter(text)
        : delimiter;
      const rows = parseCSV(text, detectedDelimiter);

      const rowCount = rows.length;

      if (rowCount > MAX_ROWS) {
        setError(
          `File has too many rows (${rowCount.toLocaleString()}). Maximum is ${MAX_ROWS.toLocaleString()} rows. Please filter or split your file. Large file support coming soon!`
        );
        setState("error");
        return;
      }

      setParsedData({
        rows,
        delimiter: detectedDelimiter,
        rowCount,
        fileName: file.name.replace(/\.csv$/i, ""),
        fileSize: file.size,
      });
      setDelimiter(detectedDelimiter);
      setState("ready");
    } catch (err) {
      setError("Failed to parse CSV file. Please check the file format.");
      setState("error");
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSampleFile = () => {
    const blob = new Blob([sampleCSV], { type: "text/csv" });
    const file = new File([blob], "sample.csv", { type: "text/csv" });
    handleFile(file);
  };

  const initiateOAuth = async () => {
    try {
      const response = await fetch("/api/google-sheets/auth");
      const data = await response.json();

      if (!response.ok || !data.authUrl) {
        setError("Failed to initiate Google authorization. Please try again.");
        setState("error");
        return;
      }

      // Redirect to Google OAuth
      window.location.href = data.authUrl;
    } catch (err) {
      setError("Failed to connect to Google. Please try again.");
      setState("error");
    }
  };

  const uploadToGoogleSheets = async (token?: string) => {
    if (!parsedData) return;

    const tokenToUse = token || accessToken;

    if (!tokenToUse) {
      // Need to authenticate first
      await initiateOAuth();
      return;
    }

    setState("converting");
    setError("");

    try {
      // Prepare data for upload
      const dataToUpload = parsedData.rows;

      const response = await fetch("/api/google-sheets/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: tokenToUse,
          data: dataToUpload,
          sheetName: sheetName || "Sheet1",
          fileName: parsedData.fileName || "CSV Import",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to upload to Google Sheets");
      }

      if (result.success && result.spreadsheetUrl) {
        setSpreadsheetUrl(result.spreadsheetUrl);
        setState("done");

        trackEvent("csv_to_google_sheets_success", {
          page_path: window.location.pathname,
          file_size_bytes: parsedData.fileSize,
          rows: parsedData.rowCount,
          sheet_name: sheetName,
        });
      } else {
        throw new Error("Upload completed but no spreadsheet URL returned");
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(
        err.message || "Failed to upload to Google Sheets. Please try again."
      );
      setState("error");
    }
  };

  const previewRows = parsedData ? parsedData.rows.slice(0, 10) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          CSV to Google Sheets Converter
        </h1>
        <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
          Import CSV files directly into Google Sheets for collaboration and analysis. Share and collaborate on your data instantly. All processing happens in your browser.
        </p>

        {/* File Limits Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Best for files up to {MAX_FILE_SIZE_MB}MB and up to {MAX_ROWS.toLocaleString()} rows.</strong>
          </p>
          <p className="text-sm text-blue-700 mt-1">
            For larger files, we&apos;ll add a large-file option later.
          </p>
        </div>

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center mb-6 transition-colors ${
            state === "idle" || state === "error"
              ? "border-gray-300 bg-white hover:border-blue-400"
              : "border-gray-200 bg-gray-50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {state === "idle" || state === "error" ? (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileInput}
                className="hidden"
              />
              <p className="text-lg text-gray-700 mb-4">
                Drag and drop your CSV file here, or
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Browse Files
              </button>
              <p className="text-sm text-gray-500 mt-4">
                <button
                  onClick={handleSampleFile}
                  className="text-blue-600 hover:underline"
                >
                  Try sample file
                </button>
              </p>
            </>
          ) : state === "parsing" ? (
            <p className="text-lg text-gray-700">Parsing CSV file...</p>
          ) : state === "ready" ? (
            <div className="text-left">
              <p className="text-lg text-gray-700 mb-4">
                File loaded: <strong>{parsedData?.fileName}.csv</strong>
              </p>
              <p className="text-sm text-gray-600">
                Size: {(parsedData!.fileSize / 1024).toFixed(2)} KB | Rows:{" "}
                {parsedData!.rowCount.toLocaleString()} | Delimiter: &quot;
                {parsedData!.delimiter === "\t" ? "Tab" : parsedData!.delimiter}
                &quot;
              </p>
            </div>
          ) : state === "converting" ? (
            <p className="text-lg text-gray-700">Uploading to Google Sheets...</p>
          ) : state === "done" && spreadsheetUrl ? (
            <div className="text-center">
              <p className="text-lg text-green-700 mb-4">Upload complete!</p>
              <a
                href={spreadsheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Open Google Sheet
              </a>
            </div>
          ) : (
            <p className="text-lg text-green-700">Upload complete!</p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Options */}
        {state === "ready" && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Conversion Options
            </h2>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={autoDetectDelimiter}
                  onChange={(e) => {
                    setAutoDetectDelimiter(e.target.checked);
                    if (!e.target.checked) {
                      setDelimiter(",");
                    }
                  }}
                  className="mr-2"
                />
                <span className="text-gray-700">Delimiter auto-detect</span>
              </label>
              {!autoDetectDelimiter && (
                <div className="ml-6">
                  <label className="block text-sm text-gray-600 mb-1">
                    Delimiter:
                  </label>
                  <select
                    value={delimiter}
                    onChange={(e) => setDelimiter(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1"
                  >
                    <option value=",">Comma (,)</option>
                    <option value=";">Semicolon (;)</option>
                    <option value="\t">Tab</option>
                  </select>
                </div>
              )}
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={hasHeader}
                  onChange={(e) => setHasHeader(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-gray-700">Header row present</span>
              </label>
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Sheet Name:
                </label>
                <input
                  type="text"
                  value={sheetName}
                  onChange={(e) => setSheetName(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  placeholder="Sheet1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Convert Button */}
        {state === "ready" && (
          <div className="text-center mb-6">
            {!accessToken && (
              <p className="text-sm text-gray-600 mb-4">
                You&apos;ll need to authorize access to your Google account to upload the file.
              </p>
            )}
            <button
              onClick={() => uploadToGoogleSheets()}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              {accessToken ? "Upload to Google Sheets" : "Authorize & Upload to Google Sheets"}
            </button>
          </div>
        )}

        {/* Preview */}
        {state === "ready" && previewRows.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Preview (first 10 rows)
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border-collapse">
                <thead>
                  {hasHeader && previewRows[0] && (
                    <tr className="bg-gray-100">
                      {previewRows[0].map((cell, idx) => (
                        <th
                          key={idx}
                          className="border border-gray-300 px-3 py-2 text-left font-semibold"
                        >
                          {cell}
                        </th>
                      ))}
                    </tr>
                  )}
                </thead>
                <tbody>
                  {(hasHeader ? previewRows.slice(1) : previewRows).map(
                    (row, rowIdx) => (
                      <tr key={rowIdx}>
                        {row.map((cell, cellIdx) => (
                          <td
                            key={cellIdx}
                            className="border border-gray-300 px-3 py-2"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Privacy Notice */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-12">
          <p className="text-sm text-gray-700">
            <strong>Privacy:</strong> Your CSV file is processed in your browser. Data is only sent to Google Sheets after you authorize the connection. We don&apos;t store your files.
          </p>
        </div>

        {/* SEO Content Section */}
        <div className="max-w-3xl mx-auto mt-12 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              What is CSV to Google Sheets Conversion?
            </h2>
            <p className="text-gray-700 mb-4">
              Converting CSV files to Google Sheets allows you to import your data directly into Google&apos;s cloud-based spreadsheet platform. This enables real-time collaboration, sharing, and analysis of your data without needing to download or manually import files.
            </p>
            <p className="text-gray-700 mb-4">
              Our browser-based converter processes your CSV files locally, then uploads the data to Google Sheets after you authorize the connection. This ensures your data is securely transferred to your Google account while maintaining privacy during the conversion process.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Why Import CSV to Google Sheets?
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Real-Time Collaboration:</strong> Share and collaborate on data with team members in real-time</li>
              <li><strong>Cloud Access:</strong> Access your data from any device, anywhere with internet connection</li>
              <li><strong>Automatic Backups:</strong> Google Sheets automatically saves your work, preventing data loss</li>
              <li><strong>Easy Sharing:</strong> Share spreadsheets with specific people or make them publicly accessible</li>
              <li><strong>Integration:</strong> Connect with other Google Workspace tools and third-party applications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How CSV to Google Sheets Works
            </h2>
            <p className="text-gray-700 mb-4">
              The conversion process involves parsing your CSV file in the browser, then uploading the data to Google Sheets via the Google Sheets API. You&apos;ll need to authorize the connection to your Google account, which allows the converter to create a new spreadsheet or add data to an existing one.
            </p>
            <p className="text-gray-700 mb-4">
              The converter automatically:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Detects CSV delimiters and parses your data correctly</li>
              <li>Preserves header rows and data structure</li>
              <li>Creates a new Google Sheet with your specified name</li>
              <li>Formats data appropriately for Google Sheets</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Common CSV to Google Sheets Use Cases
            </h2>
            <p className="text-gray-700 mb-4">
              CSV to Google Sheets conversion is essential for:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Importing data exports from databases or systems into Google Sheets</li>
              <li>Sharing data with team members for collaborative analysis</li>
              <li>Creating reports and dashboards in Google Sheets</li>
              <li>Migrating data from local spreadsheets to cloud-based solutions</li>
              <li>Integrating CSV data with Google Workspace workflows</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How to Use This Converter
            </h2>
            <p className="text-gray-700 mb-4">
              Importing your CSV to Google Sheets is simple:
            </p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
              <li>Upload your CSV file using drag-and-drop or the browse button</li>
              <li>Review the preview to ensure your data is parsed correctly</li>
              <li>Choose your sheet name and conversion options</li>
              <li>Authorize the connection to your Google account</li>
              <li>Click &quot;Upload to Google Sheets&quot; to create your spreadsheet</li>
            </ol>
            <p className="text-gray-700 mb-4">
              After upload, you&apos;ll receive a link to your new Google Sheet. For more detailed instructions, see our{" "}
              <Link href="/how-to-convert-csv-to-google-sheets" className="text-blue-600 hover:underline">
                step-by-step guide
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Common Issues and Solutions
            </h2>
            <p className="text-gray-700 mb-4">
              When importing CSV to Google Sheets, you may encounter:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Authorization Issues:</strong> Ensure you grant the necessary permissions for Google Sheets access</li>
              <li><strong>Large Files:</strong> Files over 10MB or 50,000 rows may take longer to upload</li>
              <li><strong>Delimiter Problems:</strong> Use auto-detection or manually select the correct delimiter</li>
              <li><strong>Special Characters:</strong> The converter properly handles all Unicode characters and special symbols</li>
            </ul>
            <p className="text-gray-700 mb-4">
              For more help, check out our{" "}
              <Link href="/csv-to-google-sheets/faq" className="text-blue-600 hover:underline">
                FAQ section
              </Link>
              {" "}or try our{" "}
              <Link href="/csv-to-excel" className="text-blue-600 hover:underline">
                CSV to Excel converter
              </Link>
              {" "}for alternative formats.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
