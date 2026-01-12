"use client";

import { useState, useRef, DragEvent } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/ga";

const MAX_FILE_SIZE_MB = 10;

type ParseState = "idle" | "parsing" | "ready" | "converting" | "done" | "error";

interface ExtractedData {
  rows: string[][];
  rowCount: number;
  fileName: string;
  fileSize: number;
}

export default function PDFToCSVPage() {
  const [state, setState] = useState<ParseState>("idle");
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [error, setError] = useState<string>("");
  const [delimiter, setDelimiter] = useState<string>(",");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const extractTextFromPDF = async (file: File): Promise<string> => {
    // Dynamic import to avoid SSR issues
    const pdfjsLib = await import("pdfjs-dist");
    
    // Configure pdf.js worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(" ");
      fullText += pageText + "\n";
    }

    return fullText;
  };

  const parsePDFToRows = (text: string): string[][] => {
    const lines = text.split(/\r?\n/).filter((line) => line.trim());
    const rows: string[][] = [];

    for (const line of lines) {
      // Try to detect table structure
      // Look for common delimiters: tabs, multiple spaces, or pipes
      let cells: string[];

      if (line.includes("\t")) {
        // Tab-delimited
        cells = line.split("\t").map((cell) => cell.trim());
      } else if (line.includes("|")) {
        // Pipe-delimited
        cells = line
          .split("|")
          .map((cell) => cell.trim())
          .filter((cell) => cell.length > 0);
      } else if (line.match(/\s{2,}/)) {
        // Multiple spaces (likely table)
        cells = line.split(/\s{2,}/).map((cell) => cell.trim());
      } else {
        // Single column
        cells = [line.trim()];
      }

      if (cells.length > 0 && cells.some((cell) => cell.length > 0)) {
        rows.push(cells);
      }
    }

    // If we got rows, return them; otherwise try to split by common patterns
    if (rows.length > 0) {
      return rows;
    }

    // Fallback: treat each line as a row with single column
    return lines.map((line) => [line.trim()]);
  };

  const handleFile = async (file: File) => {
    setError("");
    setState("parsing");

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setError("Please upload a .pdf file.");
      setState("error");
      return;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      setError(
        `File is too large (${fileSizeMB.toFixed(2)}MB). Maximum size is ${MAX_FILE_SIZE_MB}MB. Please use a smaller file.`
      );
      setState("error");
      return;
    }

    try {
      const pdfText = await extractTextFromPDF(file);
      
      if (!pdfText || pdfText.trim().length === 0) {
        setError(
          "No extractable text found in PDF. This may be a scanned PDF (image-based). Please use a PDF with selectable text."
        );
        setState("error");
        return;
      }

      const rows = parsePDFToRows(pdfText);

      if (rows.length === 0) {
        setError("No table data found in PDF. Please ensure the PDF contains structured data.");
        setState("error");
        return;
      }

      setExtractedData({
        rows,
        rowCount: rows.length,
        fileName: file.name.replace(/\.pdf$/i, ""),
        fileSize: file.size,
      });
      setState("ready");
    } catch (err: any) {
      console.error("PDF parsing error:", err);
      setError(
        err.message?.includes("Invalid PDF")
          ? "Invalid PDF file. Please ensure the file is a valid PDF document."
          : "Failed to parse PDF file. Please ensure it contains extractable text data and is not password-protected."
      );
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

  const convertToCSV = () => {
    if (!extractedData) return;

    setState("converting");

    try {
      const csvRows = extractedData.rows.map((row) =>
        row.map((cell) => {
          // Escape quotes and wrap in quotes if contains delimiter or newline
          const escaped = cell.replace(/"/g, '""');
          if (cell.includes(delimiter) || cell.includes("\n") || cell.includes('"')) {
            return `"${escaped}"`;
          }
          return escaped;
        }).join(delimiter)
      );

      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${extractedData.fileName}.csv`;
      document.body.appendChild(link);

      trackEvent("pdf_to_csv_success", {
        page_path: window.location.pathname,
        file_size_bytes: extractedData.fileSize,
        rows: extractedData.rowCount,
        delimiter: delimiter,
      });

      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setState("done");
    } catch (err) {
      setError("Failed to convert file. Please try again.");
      setState("error");
    }
  };

  const previewRows = extractedData ? extractedData.rows.slice(0, 10) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          PDF to CSV Converter
        </h1>
        <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
          Extract tabular data from PDF files and convert to CSV format instantly. Perfect for data extraction and analysis. All processing happens in your browser.
        </p>

        {/* File Limits Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Best for PDF files up to {MAX_FILE_SIZE_MB}MB with extractable text tables.</strong>
          </p>
          <p className="text-sm text-blue-700 mt-1">
            Works best with PDFs containing structured tables. Scanned PDFs may require OCR.
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
                accept=".pdf"
                onChange={handleFileInput}
                className="hidden"
              />
              <p className="text-lg text-gray-700 mb-4">
                Drag and drop your PDF file here, or
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Browse Files
              </button>
            </>
          ) : state === "parsing" ? (
            <p className="text-lg text-gray-700">Extracting data from PDF...</p>
          ) : state === "ready" ? (
            <div className="text-left">
              <p className="text-lg text-gray-700 mb-4">
                File loaded: <strong>{extractedData?.fileName}.pdf</strong>
              </p>
              <p className="text-sm text-gray-600">
                Size: {(extractedData!.fileSize / 1024).toFixed(2)} KB | Rows:{" "}
                {extractedData!.rowCount.toLocaleString()}
              </p>
            </div>
          ) : state === "converting" ? (
            <p className="text-lg text-gray-700">Converting to CSV...</p>
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
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  CSV Delimiter:
                </label>
                <select
                  value={delimiter}
                  onChange={(e) => setDelimiter(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                >
                  <option value=",">Comma (,)</option>
                  <option value=";">Semicolon (;)</option>
                  <option value="\t">Tab</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Convert Button */}
        {state === "ready" && (
          <div className="text-center mb-6">
            <button
              onClick={convertToCSV}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              Convert to CSV
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
                <tbody>
                  {previewRows.map((row, rowIdx) => (
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
                  ))}
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
              What is PDF to CSV Conversion?
            </h2>
            <p className="text-gray-700 mb-4">
              Converting PDF files to CSV format extracts tabular data from PDF documents and transforms it into a structured, editable format. This is essential for data analysis, spreadsheet manipulation, and working with data that&apos;s locked in PDF format.
            </p>
            <p className="text-gray-700 mb-4">
              Our browser-based converter processes your PDF files locally, ensuring complete privacy. The conversion automatically detects tables in your PDF and extracts the data into CSV format, preserving the structure and relationships between data points.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Why Convert PDF to CSV?
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Data Analysis:</strong> CSV format allows you to analyze data in Excel, Google Sheets, or data analysis tools</li>
              <li><strong>Data Editing:</strong> CSV files are easily editable, unlike locked PDF documents</li>
              <li><strong>Database Import:</strong> CSV is the standard format for importing data into databases and systems</li>
              <li><strong>Data Processing:</strong> CSV format works seamlessly with programming languages and data processing tools</li>
              <li><strong>Privacy First:</strong> All conversion happens in your browser - your files never leave your device</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How PDF to CSV Conversion Works
            </h2>
            <p className="text-gray-700 mb-4">
              The converter analyzes your PDF file to identify tables and structured data. It extracts text content, detects table boundaries, and converts the data into CSV format with proper row and column separation.
            </p>
            <p className="text-gray-700 mb-4">
              The conversion works best with PDFs that contain:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Structured tables with clear rows and columns</li>
              <li>Text-based data (not scanned images)</li>
              <li>Consistent formatting and alignment</li>
              <li>Clear delimiters between data cells</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Common PDF to CSV Use Cases
            </h2>
            <p className="text-gray-700 mb-4">
              PDF to CSV conversion is essential for:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Extracting financial data from PDF reports</li>
              <li>Converting PDF invoices to spreadsheet format</li>
              <li>Extracting data from PDF forms and surveys</li>
              <li>Converting PDF exports from databases or systems</li>
              <li>Migrating data from PDF documents to databases</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How to Use This Converter
            </h2>
            <p className="text-gray-700 mb-4">
              Converting your PDF to CSV is simple:
            </p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
              <li>Upload your PDF file using drag-and-drop or the browse button</li>
              <li>Wait for the converter to extract table data from your PDF</li>
              <li>Review the preview to ensure data is extracted correctly</li>
              <li>Choose your CSV delimiter (comma, semicolon, or tab)</li>
              <li>Click &quot;Convert to CSV&quot; to download your file</li>
            </ol>
            <p className="text-gray-700 mb-4">
              The converter automatically detects tables and extracts data. For more detailed instructions, see our{" "}
              <Link href="/how-to-convert-pdf-to-csv" className="text-blue-600 hover:underline">
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
              When converting PDF to CSV, you may encounter:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Scanned PDFs:</strong> PDFs created from scanned images may require OCR (Optical Character Recognition) to extract text</li>
              <li><strong>Complex Tables:</strong> Tables with merged cells or complex formatting may need manual adjustment after conversion</li>
              <li><strong>Multiple Tables:</strong> PDFs with multiple tables may require separate conversion or manual separation</li>
              <li><strong>Large Files:</strong> Files over 10MB may take longer to process</li>
            </ul>
            <p className="text-gray-700 mb-4">
              For more help, check out our{" "}
              <Link href="/pdf-to-csv/faq" className="text-blue-600 hover:underline">
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
