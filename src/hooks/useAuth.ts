"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authApi } from "@/lib/api";

// Custom Hook zur Verwaltung der Authentifizierung und Weiterleitung basierend auf dem Authentifizierungsstatus
export function useAuth() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Überprüfe bei jeder Änderung des Pfads, ob der Benutzer authentifiziert ist oder ob die Route öffentlich zugänglich ist
  useEffect(() => {
    const publicRoutes = [
      "/stock-predictor/login",
      "/stock-predictor/register",
      "/stock-predictor/landing",
    ];

    // Funktion zur Überprüfung der Authentifizierung und Weiterleitung
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
