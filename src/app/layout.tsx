import "./globals.css";
import type { Metadata } from "next";
import { Background } from "@/components/Background";
import { Navbar } from "@/components/Navbar";
import { GlobalCursor } from "@/components/GlowingCursor";
import { PortfolioAssistant } from "@/components/PortfolioAssistant";

export const metadata: Metadata = {
  title: {
    default: "Tong Milz — Softwareentwickler",
    template: "%s — Tong Milz",
  },
  description:
    "Portfolio von Tong Milz — Softwareentwickler für robuste Backend-Systeme, moderne Webanwendungen und AI-Projekte.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className="bg-page text-white antialiased selection:bg-brand/30 selection:text-white">
        <Background />
        <GlobalCursor />
        <Navbar />
        <PortfolioAssistant />

        <main className="relative z-10 flex min-h-screen flex-col">
          <div className="w-full flex-1">{children}</div>
          
          <footer className="site-container mt-auto flex flex-col gap-2 border-t border-white/8 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Tong Milz</span>
            <span>Entwickelt mit Next.js · München</span>
          </footer>
        </main>
      </body>
    </html>
  );
}
