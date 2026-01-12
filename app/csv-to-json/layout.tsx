import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to JSON Converter – Fast & Private",
  description:
    "Convert CSV files to JSON format instantly in your browser. No uploads. Perfect for APIs, web applications, and data processing. Free and private.",
  alternates: {
    canonical: "https://formatmyfiles.com/csv-to-json",
  },
  openGraph: {
    title: "CSV to JSON Converter – Fast & Private",
    description:
      "Convert CSV files to JSON format instantly in your browser. No uploads. Perfect for APIs, web applications, and data processing.",
    type: "website",
    url: "https://formatmyfiles.com/csv-to-json",
  },
  twitter: {
    card: "summary",
    title: "CSV to JSON Converter – Fast & Private",
    description:
      "Convert CSV files to JSON format instantly in your browser. No uploads. Perfect for APIs, web applications, and data processing.",
  },
};

export default function CSVToJSONLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
