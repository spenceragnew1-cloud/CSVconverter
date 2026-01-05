import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://formatmyfiles.com/csv-to-google-sheets",
  },
};

export default function CSVToGoogleSheetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
