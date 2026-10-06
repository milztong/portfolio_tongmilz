import { PageTransition } from "@/components/PageTransition";
import { ProjectVisual } from "@/components/ProjectVisual";
import type { Metadata } from "next";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Software Developer",
  description:
    "Tong Milz is a software developer focused on robust backend systems, modern web products and applied AI.",
  alternates: {
    canonical: "/en",
    languages: { "de-DE": "/", "en-US": "/en" },
  },
  openGraph: {
    locale: "en_US",
    title: "Tong Milz — Software Developer",
    description:
      "Robust backend systems, modern web products and applied AI — from Spring Boot and Kafka to React Native.",
    url: "/en",
  },
};

const stack = ["Java 21", "Spring Boot", "Kafka", "Redis", "PostgreSQL", "React", "TypeScript", "React Native"];

export default function EnglishHomePage() {
  return (
    <PageTransition>
      <main className="pb-24 md:pb-32">
        <section className="site-container grid min-h-[min(860px,100svh)] items-center gap-14 pb-20 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:pt-36">
          <div className="flex flex-col items-start">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-medium text-brand">
              <span className="animate-status h-2 w-2 rounded-full bg-brand" />
              Open to new opportunities
            </div>
            <p className="eyebrow mb-5">Backend · Full Stack · AI</p>
            <h1 className="max-w-3xl text-balance text-[clamp(3.35rem,8.2vw,7rem)] font-black leading-[0.91] tracking-tightest text-white">
              Systems with
              <span className="block text-brand">substance.</span>
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-muted md:text-xl">
              I&apos;m Tong Milz, a software developer with an M.Sc. in Computer Science. I combine robust backend architecture with clear product interfaces — from modular Spring Boot systems to React Native.
            </p>
            <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a href="#projects" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-extrabold text-page transition-all hover:-translate-y-0.5 hover:bg-brand-strong">
                Explore projects <ArrowDownRight size={17} aria-hidden="true" />
              </a>
              <a href="mailto:milzto261@gmail.com" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06]">
                Contact me <Mail size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold">
              <Social href="https://github.com/milztong" label="GitHub" icon={<Github size={17} />} />
              <Social href="https://www.linkedin.com/in/tong-milz-1539953a6" label="LinkedIn" icon={<Linkedin size={17} />} />
            </div>
            <dl className="mt-12 grid w-full max-w-xl grid-cols-3 border-t border-white/10 pt-6">
              <Proof value="4" label="Backend modules" />
              <Proof value="2" label="Web + mobile" />
              <Proof value="M.Sc." label="Computer Science" />
            </dl>
          </div>

          <div className="panel relative overflow-hidden rounded-[2rem] p-6">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-brand">Engineering profile</p>
            <h2 className="mt-5 text-4xl font-black tracking-tighter text-white">Backend depth.<br />Product perspective.</h2>
            <p className="mt-5 leading-7 text-muted">I build complete systems: APIs, asynchronous events, authentication, data persistence, automated tests, deployment pipelines and the interfaces people actually use.</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {stack.map((item) => <span key={item} className="rounded-lg border border-white/8 bg-white/[0.035] px-3 py-2 font-mono text-xs text-muted">{item}</span>)}
            </div>
            <div className="mt-9 rounded-2xl border border-brand/20 bg-brand/[0.06] p-5">
              <p className="text-sm font-black text-white">Current flagship: Jinodo</p>
              <p className="mt-2 text-sm leading-6 text-muted">An event-driven news and collaboration platform for web and Android.</p>
              <a href="https://jinodo.tongmilz.com" target="_blank" rel="noreferrer" className="focus-ring mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand hover:text-white">Open live application <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>

        <section id="about" className="site-container scroll-mt-28 border-y border-white/8 py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr] md:gap-20">
            <div><p className="eyebrow">About</p></div>
            <div>
              <h2 className="text-balance text-4xl font-black tracking-tighter text-white md:text-5xl">Engineering decisions that serve the product.</h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">My background combines Computer Science with Business Information Systems. I enjoy systems where technical depth and a comprehensible user experience belong together — including testing, CI/CD and production operations.</p>
            </div>
          </div>
        </section>

        <section id="projects" className="site-container scroll-mt-28 py-20 md:py-28">
          <p className="eyebrow mb-4">Selected work</p>
          <h2 className="max-w-3xl text-balance text-4xl font-black tracking-tighter text-white sm:text-5xl md:text-6xl">Built, tested and deployed.</h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <EnglishProject
              slug="Jinodo"
              title="Jinodo"
              label="Event-driven platform"
              description="A modular Spring Boot platform that combines automated technology feeds, real-time chat, analytics and an Android client. Kafka, Redis and WebSockets connect the core workflows."
              href="/projects/Jinodo"
              liveUrl="https://jinodo.tongmilz.com"
            />
            <EnglishProject
              slug="StockPrediction"
              title="Stock Prediction Game"
              label="Full-stack product"
              description="A daily game built around anonymized market data, price and direction predictions, transparent scoring, automated resolution and a public leaderboard."
              href="/projects/StockPrediction"
            />
            <EnglishProject
              slug="GenerativeAI"
              title="Generative AI for Accident Simulation"
              label="Master's thesis"
              description="A comparison of VAE, GAN and diffusion models for generating realistic multi-agent vehicle collision trajectories from a limited real-world dataset."
              href="/projects/GenerativeAI"
            />
            <article className="panel flex min-h-72 flex-col justify-between rounded-[1.75rem] p-7 sm:p-9">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-brand">Quality & delivery</p>
                <h3 className="mt-5 text-3xl font-black text-white">Production-minded development</h3>
                <p className="mt-4 leading-7 text-muted">More than 50 automated tests across the main products, GitHub Actions pipelines, coverage reporting, structured logging, health checks and automated cloud deployments.</p>
              </div>
              <a href="https://github.com/milztong" target="_blank" rel="noreferrer" className="focus-ring mt-8 inline-flex items-center gap-2 text-sm font-bold text-brand hover:text-white">View GitHub profile <ArrowUpRight size={16} /></a>
            </article>
          </div>
        </section>

        <section id="experience" className="site-container scroll-mt-28 py-20 md:py-28">
          <div className="grid gap-12 border-y border-white/8 py-16 md:grid-cols-[0.75fr_1.25fr] md:gap-20 md:py-20">
            <div>
              <p className="eyebrow mb-5">Experience</p>
              <h2 className="text-balance text-4xl font-black tracking-tighter text-white md:text-5xl">Technology in an enterprise context.</h2>
              <p className="mt-5 max-w-md leading-7 text-muted">An M.Sc. in Computer Science, a B.Sc. in Business Information Systems and practical experience in established technology organizations.</p>
            </div>
            <div>
              <Experience company="DATEV eG" role="Monitoring of virtual workplace systems" period="2021 — 2022" />
              <Experience company="Kontron Europe GmbH" role="Systems and software engineering" period="2020 — 2021" />
              <Experience company="Landshut University of Applied Sciences" role="M.Sc. Computer Science" period="2023 — 2025" last />
            </div>
          </div>
        </section>

        <section className="site-container pt-12">
          <div className="rounded-[2rem] border border-brand/25 bg-brand px-6 py-14 text-page sm:px-10 md:px-14 md:py-20">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em]">Let&apos;s talk</p>
            <h2 className="mt-5 max-w-3xl text-balance text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl">Looking for a developer who thinks in systems and products?</h2>
            <a href="mailto:milzto261@gmail.com" className="focus-ring mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-page px-5 py-3 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5">Start a conversation <ArrowUpRight size={17} /></a>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}

function Social({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-lg py-2 text-muted transition-colors hover:text-brand">{icon}{label}</a>;
}

function Proof({ value, label }: { value: string; label: string }) {
  return <div className="border-l border-white/10 px-3 first:border-l-0 first:pl-0 sm:px-4"><dt className="text-xs leading-4 text-muted sm:text-sm">{label}</dt><dd className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">{value}</dd></div>;
}

function EnglishProject({ slug, title, label, description, href, liveUrl }: { slug: string; title: string; label: string; description: string; href: string; liveUrl?: string }) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface">
      <div className="h-72 border-b border-white/8"><ProjectVisual slug={slug} /></div>
      <div className="p-6 sm:p-8">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-brand">{label}</p>
        <h3 className="mt-3 text-3xl font-black text-white">{title}</h3>
        <p className="mt-4 leading-7 text-muted">{description}</p>
        <div className="mt-7 flex flex-wrap gap-4 text-sm font-bold">
          <Link href={href} className="focus-ring inline-flex items-center gap-2 text-brand hover:text-white">Case study <ArrowUpRight size={16} /></Link>
          {liveUrl && <a href={liveUrl} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 text-muted hover:text-white">Live application <ArrowUpRight size={16} /></a>}
        </div>
      </div>
    </article>
  );
}

function Experience({ company, role, period, last = false }: { company: string; role: string; period: string; last?: boolean }) {
  return <div className={`grid gap-3 py-6 sm:grid-cols-[1fr_auto] sm:items-start ${last ? "" : "border-b border-white/8"}`}><div><h3 className="text-xl font-black text-white">{company}</h3><p className="mt-1 text-sm leading-6 text-muted sm:text-base">{role}</p></div><span className="font-mono text-xs font-bold uppercase tracking-wider text-brand">{period}</span></div>;
}
