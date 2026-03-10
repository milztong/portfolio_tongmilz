"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authApi } from "@/lib/api";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const publicRoutes = [
      "/stock-predictor/login",
      "/stock-predictor/register",
      "/stock-predictor/landing",
    ];

    const check = async () => {
      const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

      if (isPublic) {
        setLoading(false);
        return;
      }

      try {
        await authApi.me();
        setLoading(false);
      } catch {
        router.replace("/stock-predictor/login");
      }
    };

    check();
  }, [pathname, router]);

  return { loading };
}
