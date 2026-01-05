import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to JSON Converter – Coming Soon",
  description:
    "Convert CSV files to JSON format for APIs and web applications. Coming soon. Try our CSV to Excel converter in the meantime.",
  openGraph: {
    title: "CSV to JSON Converter – Coming Soon",
    description:
      "Convert CSV files to JSON format for APIs and web applications. Coming soon. Try our CSV to Excel converter in the meantime.",
    type: "website",
    url: "https://formatmyfiles.com/csv-to-json",
  },
  twitter: {
    card: "summary",
    title: "CSV to JSON Converter – Coming Soon",
    description:
      "Convert CSV files to JSON format for APIs and web applications. Coming soon. Try our CSV to Excel converter in the meantime.",
  },
};

export default function CSVToJSONPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          CSV to JSON Converter
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Convert CSV files to JSON format for use in APIs, web applications,
          and data processing.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <p className="text-lg text-yellow-800 font-semibold mb-2">
            Coming Soon
          </p>
          <p className="text-yellow-700">
            We&apos;re working on this converter. Check back soon!
          </p>
        </div>
        <Link
          href="/csv-to-excel"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Try CSV to Excel Converter
        </Link>
      </div>
    </div>
  );
}
