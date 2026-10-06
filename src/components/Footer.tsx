"use client";

import { usePathname } from "next/navigation";

export function Footer() {
  const isEnglish = usePathname().startsWith("/en");

  return (
    <footer className="site-container mt-auto flex flex-col gap-2 border-t border-white/8 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
      <span>© {new Date().getFullYear()} Tong Milz</span>
      <span>{isEnglish ? "Built with Next.js · Munich" : "Entwickelt mit Next.js · München"}</span>
    </footer>
  );
}
