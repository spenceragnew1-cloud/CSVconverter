import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "CSV to Google Sheets Converter – Fast & Private",
  description:
    "Import CSV files directly into Google Sheets instantly. No uploads. Perfect for collaboration and analysis. Free and private.",
  alternates: {
    canonical: "https://formatmyfiles.com/csv-to-google-sheets",
  },
  openGraph: {
    title: "CSV to Google Sheets Converter – Fast & Private",
    description:
      "Import CSV files directly into Google Sheets instantly. No uploads. Perfect for collaboration and analysis.",
    type: "website",
    url: "https://formatmyfiles.com/csv-to-google-sheets",
  },
  twitter: {
    card: "summary",
    title: "CSV to Google Sheets Converter – Fast & Private",
    description:
      "Import CSV files directly into Google Sheets instantly. No uploads. Perfect for collaboration and analysis.",
  },
};

export default function CSVToGoogleSheetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
