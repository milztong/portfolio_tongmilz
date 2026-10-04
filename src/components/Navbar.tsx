"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Projekte", href: "/projects" },
  { label: "Erfahrung", href: "/work" },
  { label: "Über mich", href: "/about" },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-6">
      <nav
        aria-label="Hauptnavigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-page/80 px-3 shadow-2xl shadow-black/20 backdrop-blur-xl md:px-4"
      >
        <Link
          href="/"
          aria-label="Tong Milz – Startseite"
          className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-sm font-black tracking-[-0.08em] text-page transition-transform hover:-rotate-3"
        >
          TM
        </Link>

        <div className="flex items-center gap-1 md:gap-2">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring items-center rounded-lg px-2.5 py-2 text-sm font-medium transition-colors sm:px-3.5 ${item.label === "Erfahrung" ? "hidden sm:inline-flex" : "inline-flex"} ${
                  active ? "bg-white/8 text-white" : "text-muted hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <a
          href="mailto:milzto261@gmail.com"
          className="focus-ring hidden items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-page transition-colors hover:bg-brand md:inline-flex"
        >
          Kontakt
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <a
          href="mailto:milzto261@gmail.com"
          aria-label="E-Mail an Tong Milz"
          className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl bg-white text-page transition-colors hover:bg-brand md:hidden"
        >
          <Mail size={17} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
};
