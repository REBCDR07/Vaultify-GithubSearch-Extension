import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: [
    "*.spock.replit.dev",
    "*.replit.dev",
  ],
};

export default nextConfig;
