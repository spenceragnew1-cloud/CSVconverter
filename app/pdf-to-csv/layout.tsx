import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF to CSV Converter – Fast & Private",
  description:
    "Extract tabular data from PDF files and convert to CSV format instantly in your browser. No uploads. Perfect for data extraction and analysis. Free and private.",
  alternates: {
    canonical: "https://formatmyfiles.com/pdf-to-csv",
  },
  openGraph: {
    title: "PDF to CSV Converter – Fast & Private",
    description:
      "Extract tabular data from PDF files and convert to CSV format instantly in your browser. No uploads. Perfect for data extraction and analysis.",
    type: "website",
    url: "https://formatmyfiles.com/pdf-to-csv",
  },
  twitter: {
    card: "summary",
    title: "PDF to CSV Converter – Fast & Private",
    description:
      "Extract tabular data from PDF files and convert to CSV format instantly in your browser. No uploads. Perfect for data extraction and analysis.",
  },
};

export default function PDFToCSVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
