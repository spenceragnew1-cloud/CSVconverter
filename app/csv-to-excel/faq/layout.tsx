import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://yourdomain.com/csv-to-excel/faq",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
