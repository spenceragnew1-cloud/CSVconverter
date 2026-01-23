import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "CSV to Google Sheets Converter (Free, Online, No Signup)",
  description:
    "Convert CSV to Google Sheets in seconds. Upload a CSV, authorize Sheets, and import instantly. Free, online, and files stay in your browser.",
  alternates: {
    canonical: "https://formatmyfiles.com/csv-to-google-sheets",
  },
  openGraph: {
    title: "CSV to Google Sheets Converter (Free, Online, No Signup)",
    description:
      "Convert CSV to Google Sheets in seconds. Upload a CSV, authorize Sheets, and import instantly. Free and online.",
    type: "website",
    url: "https://formatmyfiles.com/csv-to-google-sheets",
  },
  twitter: {
    card: "summary",
    title: "CSV to Google Sheets Converter (Free, Online, No Signup)",
    description:
      "Convert CSV to Google Sheets in seconds. Upload a CSV, authorize Sheets, and import instantly. Free and online.",
  },
};

export default function CSVToGoogleSheetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
