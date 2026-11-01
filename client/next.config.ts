import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  distDir: process.env.PLAYWRIGHT === "true" ? ".next-e2e" : ".next",
  experimental: {
    agentUpgrade: "security",
  },
  cacheComponents: false,
  partialPrefetching: false,
};

export default nextConfig;
