import { getAllWork, getAllProjects } from "@/lib/mdx";
import { InteractiveHero } from "@/components/InteractiveHero";
import { PageTransition } from "@/components/PageTransition";
import { Slideshow } from "@/components/Slideshow";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const allWork = await getAllWork();
  const allProjects = await getAllProjects();

  const featuredWork = allWork.slice(0, 2);
  const recentProjects = allProjects.slice(0, 3);

  return (
    <PageTransition>
      <main className="flex flex-col gap-32 pb-24">
        <InteractiveHero />
        <section className="max-w-5xl mx-auto w-full px-6">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Letzte Arbeitsstellen</h2>
            <Link href="/work" className="text-neutral-500 hover:text-white transition-colors">
              Alle Arbeitsstellen anzeigen →
            </Link>
          </div>
          
          <div className="flex flex-col gap-24">
            {featuredWork.map((job) => (
              <div key={job.slug} className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-2xl font-semibold">{job.meta.company}</h3>
                    <span className="font-mono text-sm text-neutral-600 uppercase">
                      {job.meta.year || job.meta.date}
                    </span>
                  </div>
                  <p className="text-xl text-neutral-500 italic">{job.meta.title}</p>
                </div>
                {job.meta.images && job.meta.images.length > 0 && (
                  <Slideshow images={job.meta.images} />
                )}
                
                <p className="text-neutral-400 max-w-2xl leading-relaxed">
                  {job.meta.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="max-w-5xl mx-auto w-full px-6">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Kürzliche Projekte</h2>
            <Link href="/projects" className="text-neutral-500 hover:text-white transition-colors">
              Protokoll durchsuchen →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentProjects.map((project) => {
              const thumbnail = project.meta.image || project.meta.images?.[0];
              
              return (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="group flex flex-col gap-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent transition-opacity group-hover:opacity-50" />
                    {thumbnail ? (
                      <Image
                        src={thumbnail}
                        alt={project.meta.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-white/5 text-xs text-neutral-600 uppercase tracking-widest">
                        Kein Bild
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 px-1">
                    <span className="text-xs text-neutral-600 tabular-nums">{project.meta.date}</span>
                    <h4 className="text-lg font-medium group-hover:text-brand transition-colors">{project.meta.title}</h4>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
        <section className="max-w-5xl mx-auto w-full px-6 py-24 border-t border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-sm font-mono text-brand uppercase tracking-widest mb-4">Back-end</h3>
                    <p className="text-neutral-400">Architektur robuster Systeme mit Java, Python, C# und PHP.</p>
                </div>
                <div>
                    <h3 className="text-sm font-mono text-brand uppercase tracking-widest mb-4">Front-end</h3>
                    <p className="text-neutral-400">Entwicklung immersiver Interfaces mit Next.js, TypeScript und Framer Motion.</p>
                </div>
            </div>
        </section>
      </main>
    </PageTransition>
  );
}
