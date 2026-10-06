import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/projects/PulseStack",
        destination: "/projects/Jinodo",
        permanent: true,
      },
      {
        source: "/downloads/pulsestack-android-v1.0.1.apk",
        destination: "/downloads/jinodo-android-v1.0.1.apk",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    // Auth läuft über das zentrale Jinodo-Backend, nicht mehr
    // über das StockPredictor-Backend selbst (dessen /api/auth/** gibt 410 Gone zurück).
    const jinodoUrl =
      process.env.NEXT_PUBLIC_JINODO_URL || "https://api.tongmilz.com";
    return [
      {
        source: "/auth-backend/:path*",
        destination: `${jinodoUrl}/api/v1/auth/:path*`,
      },
      {
        source: "/backend/:path*",
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
