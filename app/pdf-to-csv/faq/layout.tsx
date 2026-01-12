import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://formatmyfiles.com/pdf-to-csv/faq",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
