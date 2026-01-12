import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to JSON FAQ – Convert Safely & Fix Common Issues",
  description:
    "Learn how to convert CSV to JSON, choose the right format, and troubleshoot common conversion issues. Private in-browser conversion.",
  openGraph: {
    title: "CSV to JSON FAQ – Convert Safely & Fix Common Issues",
    description:
      "Learn how to convert CSV to JSON, choose the right format, and troubleshoot common conversion issues. Private in-browser conversion.",
    type: "website",
    url: "https://formatmyfiles.com/csv-to-json/faq",
  },
  twitter: {
    card: "summary",
    title: "CSV to JSON FAQ – Convert Safely & Fix Common Issues",
    description:
      "Learn how to convert CSV to JSON, choose the right format, and troubleshoot common conversion issues. Private in-browser conversion.",
  },
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          CSV to JSON FAQ
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              What is JSON format?
            </h2>
            <p className="text-gray-700">
              JSON (JavaScript Object Notation) is a lightweight data-interchange format that&apos;s easy for humans to read and write, and easy for machines to parse and generate. It&apos;s the standard format for APIs and web applications, making it ideal for data exchange between systems.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              How do I convert CSV to JSON?
            </h2>
            <p className="text-gray-700">
              Using our converter is simple:
            </p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 mt-2">
              <li>Go to our <Link href="/csv-to-json" className="text-blue-600 hover:underline">CSV to JSON converter</Link></li>
              <li>Upload your CSV file (drag and drop or browse)</li>
              <li>Review the preview and adjust options if needed</li>
              <li>Choose your JSON format (objects or arrays)</li>
              <li>Click &quot;Convert to JSON&quot; to download your .json file</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              What&apos;s the difference between &quot;Array of Objects&quot; and &quot;Array of Arrays&quot;?
            </h2>
            <p className="text-gray-700 mb-2">
              <strong>Array of Objects:</strong> Each CSV row becomes a JSON object with column headers as keys. This is the most common format for APIs and databases. Example:
            </p>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto mb-3">
{`[
  {"Name": "John", "Age": "30", "City": "New York"},
  {"Name": "Jane", "Age": "25", "City": "Los Angeles"}
]`}
            </pre>
            <p className="text-gray-700 mb-2">
              <strong>Array of Arrays:</strong> Maintains the original CSV structure as nested arrays. Useful for data processing. Example:
            </p>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`[
  ["Name", "Age", "City"],
  ["John", "30", "New York"],
  ["Jane", "25", "Los Angeles"]
]`}
            </pre>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Does this tool upload my file?
            </h2>
            <p className="text-gray-700">
              <strong>No.</strong> All processing happens entirely in your browser. Your CSV file never leaves your device. We don&apos;t upload, store, or have access to your data. This ensures complete privacy and security for your files.
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
              These limits ensure fast, reliable conversion in your browser. If your file exceeds these limits, you&apos;ll see a friendly message with suggestions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              What is &quot;Pretty Print&quot;?
            </h2>
            <p className="text-gray-700">
              Pretty print formats your JSON with indentation and line breaks, making it easier to read. Compact JSON (without pretty print) is a single line, which is smaller in file size but harder to read. Choose pretty print for development and debugging, or compact for production use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              How do I handle CSV files with special characters?
            </h2>
            <p className="text-gray-700">
              Our converter automatically handles quoted values, escaped characters, and special characters in CSV files. If your CSV uses quotes around values containing commas or other delimiters, the converter will preserve them correctly in the JSON output.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Can I convert JSON back to CSV?
            </h2>
            <p className="text-gray-700">
              While we don&apos;t currently offer JSON to CSV conversion, you can use our{" "}
              <Link href="/csv-to-excel" className="text-blue-600 hover:underline">
                CSV to Excel converter
              </Link>
              {" "}for CSV-related tasks. JSON to CSV conversion may be added in the future.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              What encoding does the JSON file use?
            </h2>
            <p className="text-gray-700">
              The JSON file is saved with UTF-8 encoding, which supports all Unicode characters including special characters, emojis, and international text. This ensures compatibility with all modern systems and programming languages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              How do I use the converted JSON in my application?
            </h2>
            <p className="text-gray-700">
              Once converted, you can use the JSON file in any application that supports JSON:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
              <li><strong>JavaScript:</strong> Use <code className="bg-gray-100 px-1 rounded">JSON.parse()</code> or import directly</li>
              <li><strong>Python:</strong> Use <code className="bg-gray-100 px-1 rounded">json.load()</code> or <code className="bg-gray-100 px-1 rounded">json.loads()</code></li>
              <li><strong>APIs:</strong> Send as request body or response data</li>
              <li><strong>Databases:</strong> Import into MongoDB, PostgreSQL (JSONB), or other JSON-supporting databases</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-700 mb-4">
            <Link href="/csv-to-json" className="text-blue-600 hover:underline">
              ← Back to CSV to JSON Converter
            </Link>
          </p>
          <p className="text-gray-600 text-sm">
            Check out our other converters:{" "}
            <Link href="/csv-to-excel" className="text-blue-600 hover:underline">
              CSV to Excel
            </Link>
            ,{" "}
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
          </p>
        </div>
      </div>
    </div>
  );
}
