import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to PDF Converter – Free Online, No Signup",
  description:
    "Convert CSV to PDF instantly in your browser. Choose page size and orientation, preview rows, and download a clean PDF. Free and private.",
  alternates: {
    canonical: "https://formatmyfiles.com/csv-to-pdf",
  },
  openGraph: {
    title: "CSV to PDF Converter – Free Online, No Signup",
    description:
      "Convert CSV to PDF instantly in your browser. Choose page size and orientation, preview rows, and download a clean PDF.",
    type: "website",
    url: "https://formatmyfiles.com/csv-to-pdf",
  },
  twitter: {
    card: "summary",
    title: "CSV to PDF Converter – Free Online, No Signup",
    description:
      "Convert CSV to PDF instantly in your browser. Choose page size and orientation, preview rows, and download a clean PDF.",
  },
};

export default function CSVToPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
