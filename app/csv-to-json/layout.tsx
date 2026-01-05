import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://yourdomain.com/csv-to-json",
  },
};

export default function CSVToJSONLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
