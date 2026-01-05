import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to Excel FAQ – Convert Safely & Fix Import Issues",
  description:
    "Learn how to convert CSV to Excel, fix delimiter problems, and avoid formatting errors. Private in-browser conversion.",
  openGraph: {
    title: "CSV to Excel FAQ – Convert Safely & Fix Import Issues",
    description:
      "Learn how to convert CSV to Excel, fix delimiter problems, and avoid formatting errors. Private in-browser conversion.",
    type: "website",
    url: "https://formatmyfiles.com/csv-to-excel/faq",
  },
  twitter: {
    card: "summary",
    title: "CSV to Excel FAQ – Convert Safely & Fix Import Issues",
    description:
      "Learn how to convert CSV to Excel, fix delimiter problems, and avoid formatting errors. Private in-browser conversion.",
  },
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          CSV to Excel FAQ
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              What is a CSV file?
            </h2>
            <p className="text-gray-700">
              CSV (Comma-Separated Values) is a simple file format used to store
              tabular data. Each line represents a row, and values are separated
              by commas (or other delimiters like semicolons or tabs). CSV files
              are plain text and can be opened in any text editor or spreadsheet
              application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              How do I convert CSV to Excel?
            </h2>
            <p className="text-gray-700">
              Using our converter is simple:
            </p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 mt-2">
              <li>Go to our <Link href="/csv-to-excel" className="text-blue-600 hover:underline">CSV to Excel converter</Link></li>
              <li>Upload your CSV file (drag and drop or browse)</li>
              <li>Review the preview and adjust options if needed</li>
              <li>Click &quot;Convert to Excel&quot; to download your .xlsx file</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Why does Excel open CSV wrong? (delimiter/encoding)
            </h2>
            <p className="text-gray-700">
              Excel may misinterpret CSV files due to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
              <li>
                <strong>Wrong delimiter:</strong> Some CSV files use semicolons
                (;) or tabs instead of commas. Our tool auto-detects the
                delimiter to ensure correct parsing.
              </li>
              <li>
                <strong>Encoding issues:</strong> Excel may not recognize
                special characters if the file uses UTF-8 encoding. Converting to
                XLSX preserves all characters correctly.
              </li>
              <li>
                <strong>Formatting problems:</strong> Excel may auto-format
                numbers or dates incorrectly when opening CSV directly. XLSX
                files maintain proper data types.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Does this tool upload my file?
            </h2>
            <p className="text-gray-700">
              <strong>No.</strong> All processing happens entirely in your
              browser. Your CSV file never leaves your device. We don&apos;t
              upload, store, or have access to your data. This ensures complete
              privacy and security for your files.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              What&apos;s the max file size / row limit?
            </h2>
            <p className="text-gray-700">
              For the free in-browser converter:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
              <li><strong>Maximum file size:</strong> 10MB</li>
              <li><strong>Maximum rows:</strong> 50,000 rows</li>
            </ul>
            <p className="text-gray-700 mt-3">
              These limits ensure fast, reliable conversion in your browser. If
              your file exceeds these limits, you&apos;ll see a friendly message
              with suggestions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              How do I convert a large CSV?
            </h2>
            <p className="text-gray-700">
              If your CSV file is too large for the free in-browser converter,
              you can:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
              <li>
                <strong>Split the file:</strong> Use a text editor or command-line
                tools to split your CSV into smaller chunks (under 50,000 rows
                each)
              </li>
              <li>
                <strong>Filter the data:</strong> Remove unnecessary rows or
                columns to reduce the file size
              </li>
              <li>
                <strong>Wait for large-file option:</strong> We&apos;re planning
                to add support for larger files in the future. Stay tuned!
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-700 mb-4">
            <Link href="/csv-to-excel" className="text-blue-600 hover:underline">
              ← Back to CSV to Excel Converter
            </Link>
          </p>
          <p className="text-gray-600 text-sm">
            Check out our other converters:{" "}
            <Link href="/csv-to-pdf" className="text-blue-600 hover:underline">
              CSV to PDF
            </Link>
            ,{" "}
            <Link href="/pdf-to-csv" className="text-blue-600 hover:underline">
              PDF to CSV
            </Link>
            ,{" "}
            <Link
              href="/csv-to-google-sheets"
              className="text-blue-600 hover:underline"
            >
              CSV to Google Sheets
            </Link>
            ,{" "}
            <Link href="/csv-to-json" className="text-blue-600 hover:underline">
              CSV to JSON
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
