import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://formatmyfiles.com/csv-to-json",
  },
};

export default function CSVToJSONLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
