import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to PDF FAQ – Convert Safely & Fix Common Issues",
  description:
    "Learn how to convert CSV to PDF, choose page settings, and troubleshoot common conversion issues. Private in-browser conversion.",
  openGraph: {
    title: "CSV to PDF FAQ – Convert Safely & Fix Common Issues",
    description:
      "Learn how to convert CSV to PDF, choose page settings, and troubleshoot common conversion issues. Private in-browser conversion.",
    type: "website",
    url: "https://formatmyfiles.com/csv-to-pdf/faq",
  },
  twitter: {
    card: "summary",
    title: "CSV to PDF FAQ – Convert Safely & Fix Common Issues",
    description:
      "Learn how to convert CSV to PDF, choose page settings, and troubleshoot common conversion issues. Private in-browser conversion.",
  },
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          CSV to PDF FAQ
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              How do I convert CSV to PDF?
            </h2>
            <p className="text-gray-700">
              Using our converter is simple:
            </p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 mt-2">
              <li>Go to our <Link href="/csv-to-pdf" className="text-blue-600 hover:underline">CSV to PDF converter</Link></li>
              <li>Upload your CSV file (drag and drop or browse)</li>
              <li>Review the preview and adjust options if needed</li>
              <li>Choose page size (A4 or Letter) and orientation (Portrait or Landscape)</li>
              <li>Click &quot;Convert to PDF&quot; to download your file</li>
            </ol>
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
              Which page size should I choose?
            </h2>
            <p className="text-gray-700">
              <strong>A4:</strong> Standard international paper size (210mm × 297mm). Use this if you&apos;re outside North America or need international compatibility.
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Letter:</strong> Standard US paper size (8.5&quot; × 11&quot;). Use this if you&apos;re in the United States or Canada.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              When should I use Landscape orientation?
            </h2>
            <p className="text-gray-700">
              Use landscape (horizontal) orientation when your CSV has many columns. Landscape provides more horizontal space, allowing more columns to fit on each page without being cut off or compressed too much. Portrait (vertical) is better for tables with fewer columns but many rows.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              How are large tables handled?
            </h2>
            <p className="text-gray-700">
              Large tables are automatically split across multiple PDF pages. The converter maintains table headers on each page for better readability. Page breaks are inserted automatically to ensure no data is cut off.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Can I customize the PDF styling?
            </h2>
            <p className="text-gray-700">
              The converter automatically applies professional styling including header row highlighting, alternating row colors, and proper spacing. Custom styling options may be added in future updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              What if my CSV has special characters?
            </h2>
            <p className="text-gray-700">
              The converter properly handles all Unicode characters, special symbols, and international text. All characters are preserved correctly in the PDF output, ensuring your data displays accurately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Can I convert PDF back to CSV?
            </h2>
            <p className="text-gray-700">
              While we don&apos;t currently offer PDF to CSV conversion on this tool, you can use our{" "}
              <Link href="/pdf-to-csv" className="text-blue-600 hover:underline">
                PDF to CSV converter
              </Link>
              {" "}for that purpose. For CSV-related tasks, try our{" "}
              <Link href="/csv-to-excel" className="text-blue-600 hover:underline">
                CSV to Excel converter
              </Link>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-700 mb-4">
            <Link href="/csv-to-pdf" className="text-blue-600 hover:underline">
              ← Back to CSV to PDF Converter
            </Link>
          </p>
          <p className="text-gray-600 text-sm">
            Check out our other converters:{" "}
            <Link href="/csv-to-excel" className="text-blue-600 hover:underline">
              CSV to Excel
            </Link>
            ,{" "}
            <Link href="/csv-to-json" className="text-blue-600 hover:underline">
              CSV to JSON
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
