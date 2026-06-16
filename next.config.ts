import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    // Auth läuft seit PulseStack-Migration über den zentralen auth-service, nicht mehr
    // über das StockPredictor-Backend selbst (dessen /api/auth/** gibt 410 Gone zurück).
    const pulsestackAuthUrl =
      process.env.NEXT_PUBLIC_PULSESTACK_AUTH_URL || "http://localhost:8084";
    return [
      {
        source: "/auth-backend/:path*",
        destination: `${pulsestackAuthUrl}/api/v1/auth/:path*`,
      },
      {
        source: "/backend/:path*",
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
