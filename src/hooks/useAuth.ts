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

    const isPublic = publicRoutes.some((route) => pathname.startsWith(route));

    if (isPublic) {
      setLoading(false);
      return;
    }

    authApi.me()
      .then(() => setLoading(false))
      .catch(() => {
        router.replace("/stock-predictor/login");
      });
  }, [pathname, router]);

  return { loading };
}
