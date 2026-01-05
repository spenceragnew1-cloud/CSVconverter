import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://yourdomain.com/csv-to-google-sheets",
  },
};

export default function CSVToGoogleSheetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
