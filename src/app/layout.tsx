import "./globals.css";
import { Inter } from "next/font/google";
import { Background } from "@/components/Background";
import { Navbar } from "@/components/Navbar";
import { GlobalCursor } from "@/components/GlowingCursor";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', 
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} scroll-smooth`}>
      <body className="bg-page text-white antialiased selection:bg-brand/30 selection:text-white">
        <Background />
        <GlobalCursor />
        <Navbar />

        <main className="relative z-10 flex flex-col min-h-screen">
          <div className="mx-auto w-full max-w-5xl px-6 pt-32 pb-24">
            {children}
          </div>
          
          <footer className="mt-auto py-12 text-center text-sm text-neutral-500 border-t border-white/5">
            © {new Date().getFullYear()} — Erstellt mit Next.js & Tailwind v4
          </footer>
        </main>
      </body>
    </html>
  );
}
