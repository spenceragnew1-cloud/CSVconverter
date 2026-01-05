import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to XLSX Converter – Convert CSV Files to Excel Format",
  description:
    "Convert CSV files to XLSX format for Excel. Fix formatting issues and download a clean spreadsheet instantly.",
  alternates: {
    canonical: "https://formatmyfiles.com/csv-to-xlsx",
  },
  openGraph: {
    title: "CSV to XLSX Converter – Convert CSV Files to Excel Format",
    description:
      "Convert CSV files to XLSX format for Excel. Fix formatting issues and download a clean spreadsheet instantly.",
    type: "website",
    url: "https://formatmyfiles.com/csv-to-xlsx",
  },
  twitter: {
    card: "summary",
    title: "CSV to XLSX Converter – Convert CSV Files to Excel Format",
    description:
      "Convert CSV files to XLSX format for Excel. Fix formatting issues and download a clean spreadsheet instantly.",
  },
};

export default function CSVToXLSXPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          CSV to XLSX Converter
        </h1>

        <div className="bg-blue-600 text-white rounded-lg p-6 mb-8 text-center">
          <p className="text-lg font-semibold mb-4">
            Convert your CSV file to XLSX format
          </p>
          <Link
            href="/csv-to-excel"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Convert CSV to Excel
          </Link>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-4">
            XLSX is the modern Excel file format that replaced the older XLS
            format. Converting CSV files to XLSX ensures compatibility with
            current versions of Microsoft Excel, Google Sheets, and other
            spreadsheet applications. Unlike CSV files, which are plain text,
            XLSX files are structured documents that preserve formatting, data
            types, and metadata.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Understanding CSV vs XLSX Format
          </h2>

          <p className="text-gray-700 mb-4">
            CSV files are simple text files where each line represents a row
            and values are separated by delimiters. While they&apos;re
            lightweight and widely supported, CSV files lack the structure
            needed for complex spreadsheets. XLSX files, on the other hand, are
            XML-based archives that can store multiple sheets, formulas,
            formatting, charts, and more. This makes XLSX the preferred format
            for professional spreadsheet work.
          </p>

          <p className="text-gray-700 mb-4">
            When you convert CSV to XLSX, you&apos;re transforming a basic data
            file into a fully-featured spreadsheet. This conversion preserves
            your data while adding the structure Excel needs to handle it
            properly. Numbers stay as numbers, dates remain formatted
            correctly, and text doesn&apos;t get accidentally converted to
            formulas or other data types.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Benefits of Converting CSV to XLSX
          </h2>

          <p className="text-gray-700 mb-4">
            Converting to XLSX format solves many common data import problems.
            Excel opens XLSX files with the correct delimiter detection, proper
            encoding handling, and appropriate data type recognition. You won&apos;t
            see numbers converted to text, dates displayed incorrectly, or
            special characters appearing as question marks or boxes.
          </p>

          <p className="text-gray-700 mb-4">
            XLSX files also support features that CSV files cannot. You can add
            multiple worksheets, apply conditional formatting, create charts,
            and use Excel&apos;s full feature set. The conversion process
            creates a clean foundation that you can then enhance with formulas,
            pivot tables, and other Excel capabilities.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            How CSV to XLSX Conversion Works
          </h2>

          <p className="text-gray-700 mb-4">
            Our converter reads your CSV file and intelligently parses the data.
            It automatically detects the delimiter used (comma, semicolon, or
            tab) and correctly handles quoted values and special characters. The
            converter then creates a properly structured XLSX file with your data
            organized into rows and columns, ready for use in Excel or other
            spreadsheet applications.
          </p>

          <p className="text-gray-700 mb-4">
            The entire conversion happens in your browser, ensuring your data
            remains private and secure. There&apos;s no upload to external servers,
            no waiting for file processing, and no risk of data exposure. You
            can preview your data before conversion to verify everything looks
            correct, then download your XLSX file instantly.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8 text-center">
            <p className="text-lg font-semibold text-gray-900 mb-4">
              Convert Your CSV File to XLSX Now
            </p>
            <Link
              href="/csv-to-excel"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Convert CSV to Excel
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Learn more about{" "}
              <Link
                href="/csv-to-excel/faq"
                className="text-blue-600 hover:underline"
              >
                CSV conversion
              </Link>{" "}
              or use our{" "}
              <Link
                href="/csv-to-excel"
                className="text-blue-600 hover:underline"
              >
                CSV to Excel converter
              </Link>{" "}
              to get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
