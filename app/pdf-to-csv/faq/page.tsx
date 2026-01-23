import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF to CSV FAQ – Extract Data Safely & Fix Common Issues",
  description:
    "Learn how to extract data from PDFs and convert to CSV, troubleshoot extraction issues, and handle different PDF types. Private in-browser conversion.",
  openGraph: {
    title: "PDF to CSV FAQ – Extract Data Safely & Fix Common Issues",
    description:
      "Learn how to extract data from PDFs and convert to CSV, troubleshoot extraction issues, and handle different PDF types. Private in-browser conversion.",
    type: "website",
    url: "https://formatmyfiles.com/pdf-to-csv/faq",
  },
  twitter: {
    card: "summary",
    title: "PDF to CSV FAQ – Extract Data Safely & Fix Common Issues",
    description:
      "Learn how to extract data from PDFs and convert to CSV, troubleshoot extraction issues, and handle different PDF types. Private in-browser conversion.",
  },
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          PDF to CSV FAQ
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              How do I convert PDF to CSV?
            </h2>
            <p className="text-gray-700">
              Using our converter is simple:
            </p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 mt-2">
              <li>Go to our <Link href="/pdf-to-csv" className="text-blue-600 hover:underline">PDF to CSV converter</Link></li>
              <li>Upload your PDF file (drag and drop or browse)</li>
              <li>Wait for the converter to extract table data</li>
              <li>Review the preview to verify extracted data</li>
              <li>Choose your CSV delimiter and click &quot;Convert to CSV&quot;</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Does this tool upload my file?
            </h2>
            <p className="text-gray-700">
              <strong>No.</strong> All processing happens entirely in your browser. Your PDF file never leaves your device. We don&apos;t upload, store, or have access to your data. This ensures complete privacy and security for your files.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              What types of PDFs work best?
            </h2>
            <p className="text-gray-700">
              The converter works best with PDFs that contain:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
              <li>Structured tables with clear rows and columns</li>
              <li>Text-based data (not scanned images)</li>
              <li>Consistent formatting and alignment</li>
              <li>Clear boundaries between data cells</li>
            </ul>
            <p className="text-gray-700 mt-3">
              Scanned PDFs (images) may require OCR (Optical Character Recognition) to extract text, which is not currently supported.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              What&apos;s the max file size?
            </h2>
            <p className="text-gray-700">
              For the free in-browser converter:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
              <li><strong>Maximum file size:</strong> 10MB</li>
            </ul>
            <p className="text-gray-700 mt-3">
              Larger files may take longer to process. If your file exceeds this limit, consider splitting it or using a smaller file.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Can I extract data from scanned PDFs?
            </h2>
            <p className="text-gray-700">
              Currently, the converter works best with text-based PDFs. Scanned PDFs (images) require OCR (Optical Character Recognition) technology to extract text, which is not currently supported. For best results, use PDFs that contain selectable text.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              What if my PDF has multiple tables?
            </h2>
            <p className="text-gray-700">
              If your PDF contains multiple tables, the converter will attempt to extract all table data. You may need to manually separate the data after conversion, or convert each table separately if they&apos;re on different pages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              How accurate is the extraction?
            </h2>
            <p className="text-gray-700">
              Extraction accuracy depends on the PDF structure. Well-formatted tables with clear boundaries typically extract with high accuracy. Complex tables with merged cells, irregular formatting, or nested structures may require manual adjustment after conversion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Can I choose the CSV delimiter?
            </h2>
            <p className="text-gray-700">
              Yes! You can choose between comma, semicolon, or tab as your CSV delimiter. This is useful for compatibility with different systems or regional preferences (some regions use semicolons instead of commas).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              What if the extraction doesn&apos;t work?
            </h2>
            <p className="text-gray-700">
              If extraction fails, it may be because:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
              <li>The PDF is a scanned image (not text-based)</li>
              <li>The table structure is too complex or irregular</li>
              <li>The PDF is password-protected or encrypted</li>
              <li>The file is corrupted or in an unsupported format</li>
            </ul>
            <p className="text-gray-700 mt-3">
              Try using a text-based PDF with clear table structure for best results.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-700 mb-4">
            <Link href="/pdf-to-csv" className="text-blue-600 hover:underline">
              ← Back to PDF to CSV Converter
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
            <Link
              href="/csv-to-google-sheets"
              className="text-blue-600 hover:underline"
            >
              CSV to Google Sheets
            </Link>
          </p>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How do I convert PDF to CSV?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Open the converter, upload your PDF, review the preview, choose a delimiter, and click convert to download CSV.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What types of PDFs work best?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Text-based PDFs with clear tables and consistent formatting provide the best results. Scanned PDFs may require OCR.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I extract data from scanned PDFs?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Scanned PDFs typically do not have selectable text. Use a text-based PDF for reliable extraction.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does this tool upload my file?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. Processing happens in your browser and files are not uploaded or stored.",
                  },
                },
              ],
            }),
          }}
        />
      </div>
    </div>
  );
}
