"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Bot, CornerDownLeft, MessageCircle, Send, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

type AnswerLink = { label: string; href: string };
type Message = { id: number; role: "assistant" | "user"; text: string; links?: AnswerLink[] };

const QUICK_QUESTIONS = [
  "Warum passt Tong zu einer Backend-Stelle?",
  "Zeig mir sein stärkstes Projekt",
  "Welche AI-Erfahrung hat Tong?",
  "Wie kann ich Tong kontaktieren?",
];

const KNOWLEDGE: Array<{ keywords: string[]; text: string; links?: AnswerLink[] }> = [
  {
    keywords: ["starkstes projekt", "bestes projekt", "pulse", "pulsestack", "microservice", "kafka", "redis", "echtzeit"],
    text: "Tongs technisch umfangreichstes Projekt ist PulseStack: ein Echtzeit-Workspace aus vier Spring-Boot-Microservices mit Kafka, Redis, WebSockets, React und einer React-Native-App. Dazu kommen 29 Unit-Tests, CI/CD und ein gemeinsames Login mit dem Stock Predictor.",
    links: [{ label: "PulseStack Case Study", href: "/projects/PulseStack" }, { label: "Live-Anwendung", href: "https://pulse-stack-chi.vercel.app/" }],
  },
  {
    keywords: ["backend", "java", "spring", "api", "server", "architektur", "distributed", "verteilte systeme"],
    text: "Für eine Backend-Rolle bringt Tong praktische Erfahrung mit Java 21, Spring Boot, REST APIs, JWT-Authentifizierung, PostgreSQL, Kafka, Redis und WebSockets mit. Besonders aussagekräftig sind die Event-getriebene PulseStack-Architektur und der Spring-Boot-basierte Stock Predictor.",
    links: [{ label: "Backend-Projekte ansehen", href: "/projects" }, { label: "PulseStack öffnen", href: "/projects/PulseStack" }],
  },
  {
    keywords: ["ki", "ai", "kunstliche intelligenz", "masterarbeit", "diffusion", "gan", "vae", "machine learning"],
    text: "In seiner Masterarbeit untersuchte Tong Generative AI zur Simulation von Fahrzeugkollisionen. Er verglich VAE-, GAN- und Diffusion-Modelle und bewertete die generierten Multi-Agent-Trajektorien unter anderem mit DTW, minASD und minFSD.",
    links: [{ label: "AI Case Study", href: "/projects/GenerativeAI" }],
  },
  {
    keywords: ["stock", "aktie", "predictor", "vorhersage", "scoring", "leaderboard"],
    text: "Der Stock Predictor ist eine tägliche Challenge mit anonymisierten Aktien. Nutzer prognostizieren Richtung und Zielpreis; nach sieben Tagen werden Ticker und Ergebnis aufgelöst. Ein eigenes Scoring-System, Leaderboard, echte Marktdaten und Single Sign-on mit PulseStack machen daraus ein vollständiges Full-Stack-Produkt.",
    links: [{ label: "Stock Predictor Case Study", href: "/projects/StockPrediction" }, { label: "Projekt ausprobieren", href: "/stock-predictor/landing" }],
  },
  {
    keywords: ["frontend", "react", "typescript", "next", "mobile", "android", "oberflache", "ui", "ux"],
    text: "Im Frontend arbeitet Tong mit TypeScript, React, Next.js, Tailwind CSS und Framer Motion. Für PulseStack entwickelte er zusätzlich eine React-Native-App für Android mit Feed, Live-Chat, WebSockets und Stock-Predictor-Integration.",
    links: [{ label: "Projekte ansehen", href: "/projects" }],
  },
  {
    keywords: ["test", "qualitat", "coverage", "ci", "cd", "github actions", "deployment"],
    text: "PulseStack und Stock Predictor umfassen zusammen 54 Unit-Tests mit JUnit 5, Mockito und MockWebServer. GitHub Actions übernimmt Build, Tests, Coverage-Reports und das anschließende Deployment. Hinzu kommen strukturiertes Logging und OpenAPI-Dokumentation.",
    links: [{ label: "Qualitätssicherung bei PulseStack", href: "/projects/PulseStack" }],
  },
  {
    keywords: ["beruf", "erfahrung", "datev", "kontron", "arbeit", "unternehmen", "werkstudent", "praktikum"],
    text: "Tong war bei DATEV im Monitoring virtueller Arbeitsplatzsysteme tätig. Bei Kontron erhielt er Einblicke in Project Management, Systems Engineering, Softwareentwicklung, Produktion und Service. Dadurch verbindet er Entwicklung mit einem Verständnis für Betrieb und Unternehmensprozesse.",
    links: [{ label: "Berufserfahrung", href: "/work" }],
  },
  {
    keywords: ["studium", "abschluss", "ausbildung", "master", "bachelor", "hochschule", "wirtschaftsinformatik"],
    text: "Tong hat einen M.Sc. in Informatik von der Hochschule Landshut und einen B.Sc. in Wirtschaftsinformatik von der Technischen Hochschule Nürnberg. Damit verbindet er technische Tiefe mit einem Verständnis für Geschäftsprozesse.",
    links: [{ label: "Profil ansehen", href: "/about" }],
  },
  {
    keywords: ["warum", "einstellen", "passen", "geeignet", "profil", "uber tong", "wer ist tong", "zusammenfassung"],
    text: "Tong verbindet Backend-Architektur, moderne Produktoberflächen und einen Blick für den Betrieb. Seine Projekte zeigen nicht nur Technologien, sondern vollständige Systeme mit Authentifizierung, Echtzeit-Kommunikation, Tests, CI/CD und Web- sowie Mobile-Clients.",
    links: [{ label: "Tongs Profil", href: "/about" }, { label: "Ausgewählte Projekte", href: "/projects" }],
  },
  {
    keywords: ["kontakt", "email", "mail", "erreichen", "linkedin", "github", "sprechen", "gesprach"],
    text: "Tong ist per E-Mail erreichbar. Sein Code und weitere berufliche Informationen sind außerdem auf GitHub und LinkedIn verfügbar.",
    links: [{ label: "E-Mail schreiben", href: "mailto:milzto261@gmail.com" }, { label: "GitHub", href: "https://github.com/milztong" }, { label: "LinkedIn", href: "https://www.linkedin.com/in/tong-milz-1539953a6" }],
  },
];

const initialMessage: Message = {
  id: 1,
  role: "assistant",
  text: "Hallo! Ich bin Tongs lokaler Portfolio-Guide. Frag mich nach Projekten, Backend-Erfahrung, AI, Studium oder Kontakt. Meine Antworten stammen ausschließlich aus diesem Portfolio.",
};

function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9+#.\s-]/g, " ");
}

function findAnswer(question: string) {
  const query = normalize(question);
  let best = KNOWLEDGE[0];
  let bestScore = 0;

  for (const entry of KNOWLEDGE) {
    const score = entry.keywords.reduce((total, keyword) => total + (query.includes(normalize(keyword)) ? Math.max(1, keyword.split(" ").length) : 0), 0);
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }

  if (bestScore === 0) {
    return {
      text: "Dazu habe ich in Tongs Portfolio keine verlässliche Information. Frag mich gern nach seinen Projekten, Backend- und AI-Erfahrungen, dem Studium oder seinen beruflichen Stationen.",
      links: [{ label: "Alle Projekte ansehen", href: "/projects" }],
    };
  }

  return best;
}

export function PortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const ask = (question: string) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || typing) return;

    setMessages((current) => [...current, { id: nextId.current++, role: "user", text: cleanQuestion }]);
    setInput("");
    setTyping(true);

    window.setTimeout(() => {
      const answer = findAnswer(cleanQuestion);
      setMessages((current) => [...current, { id: nextId.current++, role: "assistant", text: answer.text, links: answer.links }]);
      setTyping(false);
    }, 360);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    ask(input);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="portfolio-assistant"
        className={`focus-ring fixed bottom-4 right-4 z-[55] flex min-h-12 items-center gap-3 rounded-2xl border border-brand/30 bg-brand px-4 py-3 font-bold text-page shadow-[0_18px_60px_rgba(184,255,90,0.22)] transition-all hover:-translate-y-1 hover:bg-brand-strong md:bottom-7 md:right-7 ${open ? "pointer-events-none translate-y-3 opacity-0" : ""}`}
      >
        <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-page text-brand">
          <MessageCircle size={17} aria-hidden="true" />
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-brand bg-white" />
        </span>
        <span className="text-sm">Ask Tong</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.aside
            id="portfolio-assistant"
            role="dialog"
            aria-label="Ask Tong Portfolio-Assistent"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-3 top-24 z-[60] flex flex-col overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#0a0f16]/98 shadow-[0_30px_100px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:inset-auto sm:bottom-6 sm:right-6 sm:top-auto sm:h-[min(680px,calc(100dvh-3rem))] sm:w-[430px]"
          >
            <header className="flex items-center justify-between border-b border-white/8 px-4 py-4 sm:px-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-page"><Bot size={20} aria-hidden="true" /></span>
                <div>
                  <div className="flex items-center gap-2"><h2 className="font-black text-white">Ask Tong</h2><Sparkles size={13} className="text-brand" aria-hidden="true" /></div>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted"><span className="h-1.5 w-1.5 rounded-full bg-brand" /> lokal · kostenlos · ohne API</p>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Assistent schließen" className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl text-muted transition-colors hover:bg-white/5 hover:text-white">
                <X size={19} aria-hidden="true" />
              </button>
            </header>

            <div className="no-scrollbar flex-1 overflow-y-auto px-4 py-5 sm:px-5" aria-live="polite">
              <div className="flex flex-col gap-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[88%] ${message.role === "user" ? "rounded-2xl rounded-br-md bg-brand px-4 py-3 text-page" : "rounded-2xl rounded-bl-md border border-white/8 bg-white/[0.045] px-4 py-3 text-white"}`}>
                      <p className="text-sm leading-6">{message.text}</p>
                      {message.links && (
                        <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
                          {message.links.map((link) => (
                            <AssistantLink key={link.href} link={link} onNavigate={() => setOpen(false)} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {messages.length === 1 && (
                  <div className="mt-1 grid gap-2">
                    {QUICK_QUESTIONS.map((question) => (
                      <button key={question} type="button" onClick={() => ask(question)} className="focus-ring rounded-xl border border-white/8 bg-white/[0.025] px-3.5 py-3 text-left text-sm leading-5 text-muted transition-all hover:border-brand/25 hover:bg-brand/5 hover:text-white">
                        {question}
                      </button>
                    ))}
                  </div>
                )}

                {typing && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/8 bg-white/[0.045] px-4 py-4" aria-label="Antwort wird vorbereitet">
                      {[0, 1, 2].map((dot) => <span key={dot} className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" style={{ animationDelay: `${dot * 120}ms` }} />)}
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="border-t border-white/8 p-3 sm:p-4">
              <label htmlFor="ask-tong-input" className="sr-only">Frage über Tong Milz</label>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-2 focus-within:border-brand/35">
                <input
                  ref={inputRef}
                  id="ask-tong-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Frag nach Projekten oder Erfahrung …"
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-muted/70"
                />
                <button type="submit" disabled={!input.trim() || typing} aria-label="Frage senden" className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-page transition-colors hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-30">
                  <Send size={16} aria-hidden="true" />
                </button>
              </div>
              <p className="mt-2 flex items-center justify-center gap-1.5 text-[0.68rem] text-muted/70"><CornerDownLeft size={11} aria-hidden="true" /> Antworten aus hinterlegten Portfolio-Daten</p>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

function AssistantLink({ link, onNavigate }: { link: AnswerLink; onNavigate: () => void }) {
  const className = "focus-ring flex items-center justify-between gap-3 rounded-lg px-1 py-1.5 text-xs font-bold text-brand transition-colors hover:text-white";
  const content = <>{link.label}<ArrowUpRight size={14} aria-hidden="true" /></>;

  if (link.href.startsWith("/")) {
    return <Link href={link.href} onClick={onNavigate} className={className}>{content}</Link>;
  }

  return <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined} className={className}>{content}</a>;
}
