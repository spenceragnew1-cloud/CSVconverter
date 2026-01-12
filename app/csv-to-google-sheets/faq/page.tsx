import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to Google Sheets FAQ – Import Safely & Fix Common Issues",
  description:
    "Learn how to import CSV files to Google Sheets, authorize connections, and troubleshoot common import issues. Private in-browser conversion.",
  openGraph: {
    title: "CSV to Google Sheets FAQ – Import Safely & Fix Common Issues",
    description:
      "Learn how to import CSV files to Google Sheets, authorize connections, and troubleshoot common import issues. Private in-browser conversion.",
    type: "website",
    url: "https://formatmyfiles.com/csv-to-google-sheets/faq",
  },
  twitter: {
    card: "summary",
    title: "CSV to Google Sheets FAQ – Import Safely & Fix Common Issues",
    description:
      "Learn how to import CSV files to Google Sheets, authorize connections, and troubleshoot common import issues. Private in-browser conversion.",
  },
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          CSV to Google Sheets FAQ
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              How do I import CSV to Google Sheets?
            </h2>
            <p className="text-gray-700">
              Using our converter is simple:
            </p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 mt-2">
              <li>Go to our <Link href="/csv-to-google-sheets" className="text-blue-600 hover:underline">CSV to Google Sheets converter</Link></li>
              <li>Upload your CSV file (drag and drop or browse)</li>
              <li>Review the preview and adjust options if needed</li>
              <li>Authorize the connection to your Google account</li>
              <li>Click &quot;Upload to Google Sheets&quot; to create your spreadsheet</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Is my data secure?
            </h2>
            <p className="text-gray-700">
              <strong>Yes.</strong> Your CSV file is processed entirely in your browser before upload. We don&apos;t store or have access to your data. The data is only sent to Google Sheets after you explicitly authorize the connection. All communication with Google uses secure OAuth protocols.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              What permissions are required?
            </h2>
            <p className="text-gray-700">
              The converter requires permission to create and edit Google Sheets in your Google account. This allows it to create a new spreadsheet with your CSV data. You can revoke these permissions at any time through your Google account settings.
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
              Google Sheets itself supports up to 10 million cells, but our converter limits are set to ensure fast, reliable processing in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Can I add data to an existing Google Sheet?
            </h2>
            <p className="text-gray-700">
              Currently, the converter creates a new Google Sheet with your CSV data. Support for appending to existing sheets may be added in future updates. For now, you can manually copy data from the new sheet to an existing one if needed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              What happens to my CSV file after upload?
            </h2>
            <p className="text-gray-700">
              Your CSV file is processed in your browser and never stored on our servers. The data is uploaded directly to Google Sheets in your Google account. You can delete the CSV file from your device after successful upload - your data is safely stored in Google Sheets.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Can I share the Google Sheet after import?
            </h2>
            <p className="text-gray-700">
              Yes! Once your CSV is imported to Google Sheets, you can share the spreadsheet just like any other Google Sheet. Use the Share button in Google Sheets to grant access to specific people or make it publicly accessible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              What if the upload fails?
            </h2>
            <p className="text-gray-700">
              If upload fails, it may be due to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
              <li>Network connectivity issues</li>
              <li>Google account authorization problems</li>
              <li>File size exceeding limits</li>
              <li>Google Sheets API rate limits</li>
            </ul>
            <p className="text-gray-700 mt-3">
              Try again after checking your internet connection and Google account access. If problems persist, try our{" "}
              <Link href="/csv-to-excel" className="text-blue-600 hover:underline">
                CSV to Excel converter
              </Link>
              {" "}as an alternative.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Do I need a Google account?
            </h2>
            <p className="text-gray-700">
              Yes, you need a Google account to use this converter. The account is used to create and store the Google Sheet with your CSV data. If you don&apos;t have a Google account, you can create one for free at accounts.google.com.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-700 mb-4">
            <Link href="/csv-to-google-sheets" className="text-blue-600 hover:underline">
              ← Back to CSV to Google Sheets Converter
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
            <Link href="/csv-to-pdf" className="text-blue-600 hover:underline">
              CSV to PDF
            </Link>
            ,{" "}
            <Link href="/pdf-to-csv" className="text-blue-600 hover:underline">
              PDF to CSV
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
