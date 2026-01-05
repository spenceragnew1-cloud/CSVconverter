import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://formatmyfiles.com/csv-to-pdf",
  },
};

export default function CSVToPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
