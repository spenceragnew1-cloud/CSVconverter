import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF to CSV Converter – Free Online, No Signup",
  description:
    "Extract tables from PDF and convert to CSV in seconds. Upload a PDF, preview rows, and download CSV. Free, online, and private.",
  alternates: {
    canonical: "https://formatmyfiles.com/pdf-to-csv",
  },
  openGraph: {
    title: "PDF to CSV Converter – Free Online, No Signup",
    description:
      "Extract tables from PDF and convert to CSV in seconds. Upload a PDF, preview rows, and download CSV.",
    type: "website",
    url: "https://formatmyfiles.com/pdf-to-csv",
  },
  twitter: {
    card: "summary",
    title: "PDF to CSV Converter – Free Online, No Signup",
    description:
      "Extract tables from PDF and convert to CSV in seconds. Upload a PDF, preview rows, and download CSV.",
  },
};

export default function PDFToCSVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
