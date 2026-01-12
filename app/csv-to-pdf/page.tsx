"use client";

import { useState, useRef, DragEvent } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/ga";

const MAX_FILE_SIZE_MB = 10;
const MAX_ROWS = 50000;

type ParseState = "idle" | "parsing" | "ready" | "converting" | "done" | "error";
type PageSize = "a4" | "letter";
type Orientation = "portrait" | "landscape";

interface ParsedData {
  rows: string[][];
  delimiter: string;
  rowCount: number;
  fileName: string;
  fileSize: number;
}

export default function CSVToPDFPage() {
  const [state, setState] = useState<ParseState>("idle");
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [error, setError] = useState<string>("");
  const [hasHeader, setHasHeader] = useState(true);
  const [autoDetectDelimiter, setAutoDetectDelimiter] = useState(true);
  const [delimiter, setDelimiter] = useState<string>(",");
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
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

  const convertToPDF = async () => {
    if (!parsedData) return;

    setState("converting");

    try {
      // Dynamic import to avoid SSR issues
      const { default: jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;

      const dataToUse = hasHeader
        ? parsedData.rows.slice(1)
        : parsedData.rows;
      const headers = hasHeader ? parsedData.rows[0] : [];

      // Ensure all rows have the same number of columns as headers
      const numColumns = headers.length || (dataToUse[0]?.length || 0);
      const normalizedData = dataToUse.map((row) => {
        const normalizedRow = [...row];
        // Pad with empty strings if row is shorter than headers
        while (normalizedRow.length < numColumns) {
          normalizedRow.push("");
        }
        // Truncate if row is longer than headers
        return normalizedRow.slice(0, numColumns);
      });

      // Auto-adjust for wide tables with progressive scaling
      const isWideTable = numColumns > 4;
      const isVeryWideTable = numColumns > 8;
      const isExtremelyWideTable = numColumns > 12;
      
      const finalOrientation = isWideTable ? "landscape" : orientation;
      
      // Progressive font size reduction for wider tables
      let finalFontSize = 9;
      if (isExtremelyWideTable) {
        finalFontSize = 5;
      } else if (isVeryWideTable) {
        finalFontSize = 6;
      } else if (isWideTable) {
        finalFontSize = 7;
      }
      
      // Progressive margin and padding reduction
      const margin = isExtremelyWideTable ? 5 : isVeryWideTable ? 7 : 10;
      const cellPadding = isExtremelyWideTable ? 1 : isVeryWideTable ? 1.5 : 2;

      const doc = new jsPDF({
        orientation: finalOrientation as "portrait" | "landscape",
        unit: "mm",
        format: pageSize,
      });

      // Calculate equal column widths for better distribution
      const pageWidth = doc.internal.pageSize.getWidth();
      const availableWidth = pageWidth - (margin * 2);
      const columnWidth = availableWidth / numColumns;

      // Create column styles for equal width distribution
      const columnStyles: Record<number, { cellWidth: number }> = {};
      for (let i = 0; i < numColumns; i++) {
        columnStyles[i] = { cellWidth: columnWidth };
      }

      autoTable(doc, {
        head: hasHeader ? [headers] : [],
        body: normalizedData,
        styles: { 
          fontSize: finalFontSize, 
          cellPadding: cellPadding,
          overflow: 'linebreak',
          cellWidth: columnWidth,
          minCellHeight: finalFontSize + 2,
        },
        headStyles: { 
          fillColor: [66, 139, 202], 
          textColor: 255, 
          fontStyle: "bold",
          halign: 'left',
          fontSize: finalFontSize,
          cellPadding: cellPadding,
        },
        bodyStyles: {
          halign: 'left',
          fontSize: finalFontSize,
          cellPadding: cellPadding,
        },
        columnStyles: columnStyles,
        alternateRowStyles: { fillColor: [245, 245, 245] },
        margin: { top: 20, left: margin, right: margin },
        tableWidth: 'wrap',
        showHead: 'everyPage',
        didParseCell: function(data) {
          // More aggressive wrapping for headers (first row)
          if (data.row.index === 0 && data.cell.text) {
            const headerMaxLength = isExtremelyWideTable ? 20 : isVeryWideTable ? 25 : 30;
            if (Array.isArray(data.cell.text) && data.cell.text.length > 0) {
              data.cell.text = data.cell.text.map((text: string) => {
                if (text.length > headerMaxLength) {
                  return text.match(new RegExp(`.{1,${headerMaxLength}}`, 'g'))?.join(' ') || text;
                }
                return text;
              });
            }
          }
          // Wrap long text in cells - more aggressive for wide tables
          const maxLength = isExtremelyWideTable ? 25 : isVeryWideTable ? 30 : 40;
          if (data.cell.text && Array.isArray(data.cell.text) && data.cell.text.length > 0) {
            data.cell.text = data.cell.text.map((text: string) => {
              // Split very long words if needed
              if (text.length > maxLength) {
                return text.match(new RegExp(`.{1,${maxLength}}`, 'g'))?.join(' ') || text;
              }
              return text;
            });
          }
        },
      });

      const pdfBlob = doc.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${parsedData.fileName}.pdf`;
      document.body.appendChild(link);

      trackEvent("csv_to_pdf_success", {
        page_path: window.location.pathname,
        file_size_bytes: parsedData.fileSize,
        rows: parsedData.rowCount,
        page_size: pageSize,
        orientation: finalOrientation,
      });

      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setState("done");
    } catch (err) {
      console.error("PDF conversion error:", err);
      setError("Failed to convert file. Please try again.");
      setState("error");
    }
  };

  const previewRows = parsedData ? parsedData.rows.slice(0, 10) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          CSV to PDF Converter
        </h1>
        <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
          Convert CSV files to PDF format instantly. Perfect for sharing, printing, and archiving your data. All processing happens in your browser.
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
            <p className="text-lg text-gray-700">Converting to PDF...</p>
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
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Page Size:
                </label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value as PageSize)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option value="a4">A4</option>
                  <option value="letter">Letter</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Orientation:
                </label>
                <select
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value as Orientation)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Convert Button */}
        {state === "ready" && (
          <div className="text-center mb-6">
            <button
              onClick={convertToPDF}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              Convert to PDF
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
            <strong>Privacy:</strong> Your file stays on your device. We
            don&apos;t upload or store files.
          </p>
        </div>

        {/* SEO Content Section */}
        <div className="max-w-3xl mx-auto mt-12 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              What is CSV to PDF Conversion?
            </h2>
            <p className="text-gray-700 mb-4">
              Converting CSV files to PDF format transforms your tabular data into a professional, shareable document format. PDFs are ideal for reports, presentations, archiving, and sharing data with others who may not have spreadsheet software installed.
            </p>
            <p className="text-gray-700 mb-4">
              Our browser-based converter processes your CSV files locally, ensuring complete privacy. The conversion automatically formats your data into a clean, readable table with proper headers and styling, ready for printing or digital sharing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Why Convert CSV to PDF?
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Professional Presentation:</strong> PDFs maintain consistent formatting across all devices and platforms</li>
              <li><strong>Easy Sharing:</strong> PDFs can be shared via email, cloud storage, or printed without formatting issues</li>
              <li><strong>Archiving:</strong> PDF format is ideal for long-term data storage and documentation</li>
              <li><strong>Universal Compatibility:</strong> PDFs can be opened on any device without special software</li>
              <li><strong>Print-Ready:</strong> PDFs are optimized for printing with proper page breaks and layout</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              PDF Formatting Options
            </h2>
            <p className="text-gray-700 mb-4">
              Our converter offers flexible PDF formatting options:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Page Size:</strong> Choose between A4 (standard international) or Letter (US standard) formats</li>
              <li><strong>Orientation:</strong> Select portrait (vertical) or landscape (horizontal) layout based on your data width</li>
              <li><strong>Table Styling:</strong> Automatic header row highlighting and alternating row colors for better readability</li>
              <li><strong>Automatic Page Breaks:</strong> Large tables are automatically split across multiple pages</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Common CSV to PDF Use Cases
            </h2>
            <p className="text-gray-700 mb-4">
              CSV to PDF conversion is essential for:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Creating reports and documentation from data exports</li>
              <li>Sharing data with clients or stakeholders in a professional format</li>
              <li>Archiving data in a universal, long-term format</li>
              <li>Printing data tables for meetings or presentations</li>
              <li>Converting database exports for documentation purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How to Use This Converter
            </h2>
            <p className="text-gray-700 mb-4">
              Converting your CSV to PDF is simple:
            </p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
              <li>Upload your CSV file using drag-and-drop or the browse button</li>
              <li>Review the preview to ensure your data is parsed correctly</li>
              <li>Choose your PDF options (page size and orientation)</li>
              <li>Click &quot;Convert to PDF&quot; to download your file</li>
            </ol>
            <p className="text-gray-700 mb-4">
              The converter automatically detects delimiters and formats your data into a professional table. For more detailed instructions, see our{" "}
              <Link href="/how-to-convert-csv-to-pdf" className="text-blue-600 hover:underline">
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
              When converting CSV to PDF, you may encounter:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Wide Tables:</strong> Use landscape orientation for tables with many columns</li>
              <li><strong>Long Tables:</strong> Large tables are automatically split across multiple PDF pages</li>
              <li><strong>Special Characters:</strong> The converter properly handles all Unicode characters and special symbols</li>
              <li><strong>Large Files:</strong> Files over 10MB or 50,000 rows may need to be split for optimal performance</li>
            </ul>
            <p className="text-gray-700 mb-4">
              For more help, check out our{" "}
              <Link href="/csv-to-pdf/faq" className="text-blue-600 hover:underline">
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
