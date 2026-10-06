import "./globals.css";
import type { Metadata } from "next";
import { Background } from "@/components/Background";
import { Navbar } from "@/components/Navbar";
import { GlobalCursor } from "@/components/GlowingCursor";
import { PortfolioAssistant } from "@/components/PortfolioAssistant";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tongmilz.com"),
  title: {
    default: "Tong Milz — Softwareentwickler",
    template: "%s — Tong Milz",
  },
  description:
    "Portfolio von Tong Milz — Softwareentwickler für robuste Backend-Systeme, moderne Webanwendungen und AI-Projekte.",
  authors: [{ name: "Tong Milz", url: "https://www.tongmilz.com" }],
  creator: "Tong Milz",
  alternates: {
    canonical: "/",
    languages: {
      "de-DE": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    alternateLocale: "en_US",
    url: "/",
    siteName: "Tong Milz — Portfolio",
    title: "Tong Milz — Softwareentwickler",
    description:
      "Backend-Systeme, moderne Webanwendungen und AI-Projekte — von Spring Boot und Kafka bis React Native.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tong Milz — Softwareentwickler",
    description:
      "Backend-Systeme, moderne Webanwendungen und AI-Projekte — von Spring Boot und Kafka bis React Native.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tong Milz",
    url: "https://www.tongmilz.com",
    image: "https://www.tongmilz.com/Profilbild_TongMilz.jpeg",
    jobTitle: "Softwareentwickler",
    address: {
      "@type": "PostalAddress",
      addressLocality: "München",
      addressCountry: "DE",
    },
    sameAs: [
      "https://github.com/milztong",
      "https://www.linkedin.com/in/tong-milz-1539953a6",
    ],
    knowsAbout: [
      "Java",
      "Spring Boot",
      "React",
      "TypeScript",
      "Apache Kafka",
      "PostgreSQL",
      "Generative AI",
    ],
  };

  return (
    <html lang="de" className="scroll-smooth">
      <body className="bg-page text-white antialiased selection:bg-brand/30 selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Background />
        <GlobalCursor />
        <Navbar />
        <PortfolioAssistant />

        <main className="relative z-10 flex min-h-screen flex-col">
          <div className="w-full flex-1">{children}</div>
          
          <Footer />
        </main>
      </body>
    </html>
  );
}
