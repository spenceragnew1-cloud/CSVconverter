import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to PDF Converter – Fast & Private",
  description:
    "Convert CSV files to PDF format instantly in your browser. No uploads. Perfect for sharing, printing, and archiving. Free and private.",
  alternates: {
    canonical: "https://formatmyfiles.com/csv-to-pdf",
  },
  openGraph: {
    title: "CSV to PDF Converter – Fast & Private",
    description:
      "Convert CSV files to PDF format instantly in your browser. No uploads. Perfect for sharing, printing, and archiving.",
    type: "website",
    url: "https://formatmyfiles.com/csv-to-pdf",
  },
  twitter: {
    card: "summary",
    title: "CSV to PDF Converter – Fast & Private",
    description:
      "Convert CSV files to PDF format instantly in your browser. No uploads. Perfect for sharing, printing, and archiving.",
  },
};

export default function CSVToPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
