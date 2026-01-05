import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://yourdomain.com/pdf-to-csv",
  },
};

export default function PDFToCSVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
