import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://formatmyfiles.com/pdf-to-csv",
  },
};

export default function PDFToCSVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
