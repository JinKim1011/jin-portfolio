import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "secure.notion-static.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.notion.so",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
