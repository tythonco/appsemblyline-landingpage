import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/sponsor-preroll",
        destination: "https://appsemblyline.captivate.fm/preroll",
        permanent: true,
      },
      {
        source: "/sponsor-midroll-a",
        destination: "https://appsemblyline.captivate.fm/midroll-a",
        permanent: true,
      },
      {
        source: "/sponsor-midroll-b",
        destination: "https://appsemblyline.captivate.fm/midroll-b",
        permanent: true,
      },
      {
        source: "/sponsor-postroll",
        destination: "https://appsemblyline.captivate.fm/postroll",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
