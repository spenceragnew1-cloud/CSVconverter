import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            CSV to Excel Converter
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Convert CSV to XLSX instantly. Files never leave your browser.
          </p>
          <Link
            href="/csv-to-excel"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
          >
            Convert CSV to Excel
          </Link>
        </div>

        {/* Secondary Links */}
        <div className="text-center mb-16">
          <Link
            href="/csv-to-excel"
            className="text-blue-600 hover:underline mr-6"
          >
            Converter Tool
          </Link>
          <Link
            href="/csv-to-excel/faq"
            className="text-blue-600 hover:underline"
          >
            FAQ
          </Link>
        </div>

        {/* All Converters Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            All File Converters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/csv-to-excel"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                CSV to Excel
              </h3>
              <p className="text-gray-600">Convert CSV files to Excel (.xlsx) format</p>
            </Link>
            <Link
              href="/csv-to-json"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                CSV to JSON
              </h3>
              <p className="text-gray-600">Convert CSV data to JSON format for APIs</p>
            </Link>
            <Link
              href="/csv-to-pdf"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                CSV to PDF
              </h3>
              <p className="text-gray-600">Convert CSV files to PDF format</p>
            </Link>
            <Link
              href="/pdf-to-csv"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                PDF to CSV
              </h3>
              <p className="text-gray-600">Extract data from PDF to CSV</p>
            </Link>
            <Link
              href="/csv-to-google-sheets"
              className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                CSV to Google Sheets
              </h3>
              <p className="text-gray-600">Import CSV into Google Sheets</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
