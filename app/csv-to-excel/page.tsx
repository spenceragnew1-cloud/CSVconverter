"use client";

import { useState, useRef, DragEvent } from "react";
import * as XLSX from "xlsx";

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

export default function CSVToExcelPage() {
  const [state, setState] = useState<ParseState>("idle");
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [error, setError] = useState<string>("");
  const [hasHeader, setHasHeader] = useState(true);
  const [autoDetectDelimiter, setAutoDetectDelimiter] = useState(true);
  const [delimiter, setDelimiter] = useState<string>(",");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    // Validate file type
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please upload a .csv file.");
      setState("error");
      return;
    }

    // Validate file size
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

      // Estimate row count
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

  const convertToExcel = () => {
    if (!parsedData) return;

    setState("converting");

    try {
      const workbook = XLSX.utils.book_new();
      const dataToUse = hasHeader
        ? parsedData.rows.slice(1)
        : parsedData.rows;
      const headers = hasHeader ? parsedData.rows[0] : [];

      const worksheetData = hasHeader
        ? [headers, ...dataToUse]
        : dataToUse;

      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      const excelBuffer = XLSX.write(workbook, {
        type: "array",
        bookType: "xlsx",
      });

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${parsedData.fileName}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setState("done");
    } catch (err) {
      setError("Failed to convert file. Please try again.");
      setState("error");
    }
  };

  const previewRows = parsedData
    ? parsedData.rows.slice(0, 10)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          CSV to Excel Converter
        </h1>

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
            <p className="text-lg text-gray-700">Converting to Excel...</p>
          ) : (
            <p className="text-lg text-green-700">Conversion complete!</p>
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
            </div>
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

        {/* Convert Button */}
        {state === "ready" && (
          <div className="text-center mb-6">
            <button
              onClick={convertToExcel}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              Convert to Excel
            </button>
          </div>
        )}

        {/* Privacy Notice */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <strong>Privacy:</strong> Your file stays on your device. We
            don&apos;t upload or store files.
          </p>
        </div>
      </div>
    </div>
  );
}
