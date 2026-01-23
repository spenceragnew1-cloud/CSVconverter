import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to JSON Converter – Free Online, No Signup",
  description:
    "Convert CSV to JSON instantly in your browser. Choose array or objects, preview rows, and download JSON fast. Free and private.",
  alternates: {
    canonical: "https://formatmyfiles.com/csv-to-json",
  },
  openGraph: {
    title: "CSV to JSON Converter – Free Online, No Signup",
    description:
      "Convert CSV to JSON instantly in your browser. Choose array or objects, preview rows, and download JSON fast.",
    type: "website",
    url: "https://formatmyfiles.com/csv-to-json",
  },
  twitter: {
    card: "summary",
    title: "CSV to JSON Converter – Free Online, No Signup",
    description:
      "Convert CSV to JSON instantly in your browser. Choose array or objects, preview rows, and download JSON fast.",
  },
};

export default function CSVToJSONLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
