import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://formatmyfiles.com"),
  title: "CSV to Excel Converter – Fast & Private",
  description: "Convert CSV to Excel (.xlsx) instantly in your browser. No uploads. Free and private.",
  alternates: {
    canonical: "https://formatmyfiles.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
