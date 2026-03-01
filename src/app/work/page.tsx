import { getAllWork } from "@/lib/mdx";
import { PageTransition } from "@/components/PageTransition";
import { Slideshow } from "@/components/Slideshow";
import Link from "next/link";

export default async function WorkPage() {
  const workHistory = await getAllWork();

  return (
    <PageTransition>
      <div className="flex flex-col gap-24 pb-24">
        <header className="flex flex-col gap-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tightest">
            Unternehmen
          </h1>
          <p className="text-neutral-400 text-lg max-w-xl">
            Alle Stopps in der Berufswelt und die entsprechenden Verantwortungen
          </p>
        </header>

        <div className="flex flex-col gap-32">
          {workHistory.map((job) => (
            <section key={job.slug} className="flex flex-col gap-12">
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-4">
                  <Link href={`/work/${job.slug}`} className="group">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight group-hover:text-brand transition-colors">
                      {job.meta.company}
                    </h2>
                  </Link>
                  <span className="text-sm font-mono text-white uppercase tracking-widest shrink-0">
                    {job.meta.year || job.meta.duration}
                  </span>
                </div>

                <p className="text-xl text-neutral-500 italic">
                  {job.meta.role}
                </p>
              </div>
              <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed">
                {job.meta.description}
              </p>

              {job.meta.images && <Slideshow images={job.meta.images} />}
            </section>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
