import { PageTransition } from "@/components/PageTransition";
import { getAllWork } from "@/lib/mdx";
import { ArrowUpRight, Building2, MonitorCheck, Workflow } from "lucide-react";
import Link from "next/link";

const details: Record<string, { summary: string; points: string[]; icon: typeof Building2 }> = {
  Datev: {
    summary: "Monitoring im Bereich virtueller Arbeitsplatzsysteme in einer gewachsenen Unternehmensumgebung.",
    points: ["Virtuelle Arbeitsplätze", "Monitoring", "ControlUp · VMware"],
    icon: MonitorCheck,
  },
  Kontron: {
    summary: "Interdisziplinärer Einblick in den gesamten Weg technischer Produkte – von Planung und Engineering bis Produktion und Service.",
    points: ["Systems Engineering", "Software Engineering", "Project Management"],
    icon: Workflow,
  },
};

export default async function WorkPage() {
  const workHistory = await getAllWork();

  return (
    <PageTransition>
      <main className="site-container pb-28 pt-36 md:pt-44">
        <header className="max-w-4xl">
          <p className="eyebrow mb-5">Berufserfahrung</p>
          <h1 className="text-balance text-5xl font-black leading-[0.96] tracking-tightest text-white sm:text-6xl md:text-8xl">
            Software im echten Unternehmenskontext.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted md:text-xl">
            Zwei Stationen, die meine Perspektive auf zuverlässige Systeme, technische Zusammenarbeit und den Lebenszyklus von Produkten geprägt haben.
          </p>
        </header>

        <div className="mt-16 grid gap-5 md:mt-24">
          {workHistory.map((job, index) => {
            const content = details[job.slug] || {
              summary: job.meta.description || "Praktische Erfahrung in einem Technologieunternehmen.",
              points: [],
              icon: Building2,
            };
            const Icon = content.icon;
            return (
              <Link key={job.slug} href={`/work/${job.slug}`} className="focus-ring group grid overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface md:grid-cols-[0.8fr_1.2fr]">
                <div className={`relative flex min-h-64 flex-col justify-between overflow-hidden p-7 sm:p-9 ${index === 0 ? "bg-brand text-page" : "bg-electric text-white"}`}>
                  <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border-[34px] border-current opacity-[0.06]" />
                  <Icon size={34} aria-hidden="true" />
                  <div className="relative">
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] opacity-65">{job.meta.duration}</p>
                    <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{job.meta.company}</h2>
                  </div>
                </div>
                <div className="flex flex-col justify-between p-7 sm:p-9">
                  <div>
                    <div className="flex items-start justify-between gap-5">
                      <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-brand">{job.meta.role}</p>
                      <ArrowUpRight className="shrink-0 text-muted transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand" aria-hidden="true" />
                    </div>
                    <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{content.summary}</p>
                  </div>
                  <div className="mt-10 flex flex-wrap gap-2">
                    {content.points.map((point) => <span key={point} className="rounded-lg border border-white/8 bg-white/[0.035] px-3 py-2 text-xs font-semibold text-muted">{point}</span>)}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </PageTransition>
  );
}
