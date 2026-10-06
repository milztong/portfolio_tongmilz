import { PageTransition } from "@/components/PageTransition";
import { ProjectVisual } from "@/components/ProjectVisual";
import { getAllProjects } from "@/lib/mdx";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const shortTitles: Record<string, string> = {
  GenerativeAI: "Generative AI für Unfallsimulationen",
  Praktikumsformular: "Digitales Praktikumsformular",
  Fitnessapp: "Fitness-App Prototyp",
  VR_Swingman: "VR Swingman",
};

const categories: Record<string, string> = {
  Jinodo: "Event-driven Platform",
  StockPrediction: "Full-Stack",
  GenerativeAI: "AI Research",
  Fitnessapp: "Mobile UX",
  Praktikumsformular: "Web Application",
  VR_Swingman: "Virtual Reality",
};

export default async function ProjectsPage() {
  const priority = ["Jinodo", "StockPrediction", "GenerativeAI", "Fitnessapp", "VR_Swingman", "Praktikumsformular"];
  const projects = (await getAllProjects()).sort((a, b) => priority.indexOf(a.slug) - priority.indexOf(b.slug));

  return (
    <PageTransition>
      <main className="site-container pb-28 pt-36 md:pt-44">
        <header className="mb-14 max-w-4xl md:mb-20">
          <p className="eyebrow mb-5">Selected engineering work</p>
          <h1 className="text-balance text-5xl font-black leading-[0.96] tracking-tightest text-white sm:text-6xl md:text-8xl">
            Projekte, die mehr als eine Demo sind.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted md:text-xl">
            Von modularen, Event-getriebenen Backends bis Generative AI: ausgewählte Arbeiten mit Architektur, Entscheidungen und Ergebnissen.
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`focus-ring group overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface ${index === 0 ? "md:col-span-2 md:grid md:grid-cols-2" : ""}`}
            >
              <div className={`${index === 0 ? "min-h-80 md:min-h-[28rem]" : "h-72"} overflow-hidden border-b border-white/8 md:border-b-0`}>
                <ProjectVisual slug={project.slug} compact={index !== 0} />
              </div>
              <div className={`flex flex-col p-6 sm:p-8 ${index === 0 ? "justify-between" : ""}`}>
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-brand">
                      {categories[project.slug] || "Software Project"}
                    </span>
                    <span className="font-mono text-xs text-muted">{project.meta.date?.slice(0, 4)}</span>
                  </div>
                  <h2 className={`mt-4 font-black tracking-tight text-white ${index === 0 ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}>
                    {shortTitles[project.slug] || project.meta.title}
                  </h2>
                  {project.meta.description && (
                    <p className="mt-4 line-clamp-3 text-pretty leading-7 text-muted">{project.meta.description}</p>
                  )}
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-white/8 pt-5 text-sm font-bold text-white">
                  Case Study öffnen
                  <ArrowUpRight size={18} className="transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand" aria-hidden="true" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </PageTransition>
  );
}
