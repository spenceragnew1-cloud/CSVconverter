import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/csv-to-excel-online",
        destination: "/csv-to-excel",
        permanent: true,
      },
      {
        source: "/convert-csv-to-excel-online",
        destination: "/convert-csv-to-excel",
        permanent: true,
      },
      {
        source: "/csv-to-xlsx",
        destination: "/convert-csv-to-excel",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
