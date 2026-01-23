import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to Excel Converter (XLSX) – Free Online, No Signup",
  description:
    "Convert CSV to Excel (.xlsx) instantly in your browser. Preview rows, detect delimiters, and download a clean XLSX. Free and private.",
  alternates: {
    canonical: "https://formatmyfiles.com/csv-to-excel",
  },
  openGraph: {
    title: "CSV to Excel Converter (XLSX) – Free Online, No Signup",
    description:
      "Convert CSV to Excel (.xlsx) instantly in your browser. Preview rows, detect delimiters, and download a clean XLSX.",
    type: "website",
    url: "https://formatmyfiles.com/csv-to-excel",
  },
  twitter: {
    card: "summary",
    title: "CSV to Excel Converter (XLSX) – Free Online, No Signup",
    description:
      "Convert CSV to Excel (.xlsx) instantly in your browser. Preview rows, detect delimiters, and download a clean XLSX.",
  },
};

export default function CSVToExcelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
