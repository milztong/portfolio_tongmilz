import { InteractiveHero } from "@/components/InteractiveHero";
import { PageTransition } from "@/components/PageTransition";
import { ProjectVisual } from "@/components/ProjectVisual";
import { ArrowRight, ArrowUpRight, CheckCircle2, Code2, Network, Sparkles } from "lucide-react";
import Link from "next/link";

const stack = ["Java 21", "Spring Boot", "Kafka", "Redis", "React", "TypeScript", "React Native"];

export default function HomePage() {
  return (
    <PageTransition>
      <main className="pb-24 md:pb-32">
        <InteractiveHero />

        <section id="selected-work" className="site-container scroll-mt-28 py-20 md:py-28">
          <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-4">Ausgewählte Projekte</p>
              <h2 className="max-w-3xl text-balance text-4xl font-black tracking-tighter text-white sm:text-5xl md:text-6xl">
                Gebaut, getestet und tatsächlich einsetzbar.
              </h2>
            </div>
            <Link href="/projects" className="focus-ring inline-flex w-fit items-center gap-2 rounded-lg py-2 text-sm font-bold text-brand hover:text-white">
              Alle Projekte <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-12">
            <Link
              href="/projects/Jinodo"
              className="focus-ring group overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface lg:col-span-8"
            >
              <div className="min-h-80 border-b border-white/8 sm:min-h-96">
                <ProjectVisual slug="Jinodo" />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      <Badge>Flagship Project</Badge>
                      <Badge>Web + Android</Badge>
                    </div>
                    <h3 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Jinodo</h3>
                    <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-muted sm:text-lg">
                      Echtzeit-Workspace mit automatisierten Trend-Feeds und Live-Chat – als modularer Spring-Boot-Service mit Kafka, Redis und WebSockets.
                    </p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-white transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-brand group-hover:text-brand">
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-7 flex flex-wrap gap-2">
                  {stack.map((item) => <Tech key={item}>{item}</Tech>)}
                </div>
              </div>
            </Link>

            <div className="grid gap-5 lg:col-span-4">
              <article className="overflow-hidden rounded-[1.75rem] border border-brand/20 bg-brand p-6 text-page sm:p-8">
                <CheckCircle2 size={28} aria-hidden="true" />
                <p className="mt-14 text-6xl font-black tracking-tight">50+</p>
                <p className="mt-1 text-xl font-black">Automatisierte Tests</p>
                <p className="mt-4 text-sm leading-6 text-page/70">JUnit 5, Mockito und Coverage-Reports für die kritischen Abläufe beider Produkte.</p>
              </article>
              <article className="panel rounded-[1.75rem] p-6 sm:p-8">
                <Network size={26} className="text-electric" aria-hidden="true" />
                <h3 className="mt-10 text-2xl font-black text-white">Systemdenken</h3>
                <p className="mt-3 leading-7 text-muted">APIs, Events, Daten und Interfaces als ein zusammenhängendes Produkt gedacht.</p>
              </article>
            </div>

            <Link href="/projects/StockPrediction" className="focus-ring group overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface lg:col-span-6">
              <div className="h-72 border-b border-white/8"><ProjectVisual slug="StockPrediction" /></div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-brand">Full-Stack Produkt</p>
                    <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">Stock Predictor</h3>
                  </div>
                  <ArrowUpRight className="text-muted transition-colors group-hover:text-brand" aria-hidden="true" />
                </div>
                <p className="mt-4 leading-7 text-muted">Tägliche anonymisierte Aktien-Challenge mit eigener Scoring-Logik, Leaderboard und SSO zu Jinodo.</p>
              </div>
            </Link>

            <Link href="/projects/GenerativeAI" className="focus-ring group overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface lg:col-span-6">
              <div className="h-72 border-b border-white/8"><ProjectVisual slug="GenerativeAI" /></div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-electric">Masterarbeit · Generative AI</p>
                    <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">Unfallszenarien simulieren</h3>
                  </div>
                  <ArrowUpRight className="text-muted transition-colors group-hover:text-brand" aria-hidden="true" />
                </div>
                <p className="mt-4 leading-7 text-muted">VAE, GAN und Diffusion Models zur Erzeugung realistischer Multi-Agent-Fahrzeugtrajektorien.</p>
              </div>
            </Link>
          </div>
        </section>

        <section className="site-container py-20 md:py-28">
          <div className="grid gap-12 border-y border-white/8 py-16 md:grid-cols-[0.75fr_1.25fr] md:gap-20 md:py-20">
            <div>
              <p className="eyebrow mb-5">Erfahrung</p>
              <h2 className="text-balance text-4xl font-black tracking-tighter text-white md:text-5xl">Technik im Unternehmenskontext.</h2>
              <p className="mt-5 max-w-md leading-7 text-muted">Wirtschaftsinformatik im Bachelor, Informatik im Master und praktische Einblicke in etablierte Technologieunternehmen.</p>
              <Link href="/work" className="focus-ring mt-7 inline-flex items-center gap-2 rounded-lg py-2 text-sm font-bold text-brand hover:text-white">
                Erfahrung im Detail <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="flex flex-col">
              <Experience company="DATEV eG" role="Monitoring virtueller Arbeitsplatzsysteme" period="2021 — 2022" />
              <Experience company="Kontron Europe GmbH" role="Systems- und Software-Engineering" period="2020 — 2021" />
              <Experience company="Hochschule Landshut" role="Master Informatik" period="2023 — 2025" last />
            </div>
          </div>
        </section>

        <section className="site-container pt-12">
          <div className="relative overflow-hidden rounded-[2rem] border border-brand/25 bg-brand px-6 py-14 text-page sm:px-10 md:px-14 md:py-20">
            <Sparkles className="absolute right-8 top-8 opacity-30" size={44} aria-hidden="true" />
            <Code2 className="mb-8" size={30} aria-hidden="true" />
            <h2 className="max-w-3xl text-balance text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl">Sie suchen einen Entwickler, der Systeme als Produkt denkt?</h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="mailto:milzto261@gmail.com" className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-page px-5 py-3 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5">
                Gespräch starten <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <Link href="/about" className="focus-ring inline-flex min-h-12 items-center justify-center rounded-xl border border-page/20 px-5 py-3 text-sm font-extrabold transition-colors hover:bg-page/10">
                Mehr über mich
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[0.68rem] font-bold uppercase tracking-wider text-muted">{children}</span>;
}

function Tech({ children }: { children: React.ReactNode }) {
  return <span className="rounded-lg bg-white/[0.045] px-2.5 py-1.5 font-mono text-xs text-muted">{children}</span>;
}

function Experience({ company, role, period, last = false }: { company: string; role: string; period: string; last?: boolean }) {
  return (
    <div className={`grid gap-3 py-6 sm:grid-cols-[1fr_auto] sm:items-start ${last ? "" : "border-b border-white/8"}`}>
      <div>
        <h3 className="text-xl font-black text-white">{company}</h3>
        <p className="mt-1 text-sm leading-6 text-muted sm:text-base">{role}</p>
      </div>
      <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand">{period}</span>
    </div>
  );
}
