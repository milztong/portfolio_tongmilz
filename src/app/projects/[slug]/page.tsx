import { getProjectBySlug, getNextProject } from "@/lib/mdx";
import { PageTransition } from "@/components/PageTransition";
import { NextProject } from "@/components/NextProject";
import { ProjectGallery } from "@/components/DetailedView";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Download, Smartphone } from "lucide-react";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const { meta, content } = await getProjectBySlug(slug);
  const next = await getNextProject(slug);

  return (
    <PageTransition>
      <div className="flex flex-col gap-12 pb-24">
        <Link
          href="/projects"
          className="group flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            ←
          </span>{" "}
          Zurück zu den Projekten
        </Link>

        <header className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-sm text-brand font-medium tracking-widest uppercase">
              {meta.date}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tightest leading-tight">
              {meta.title}
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
              {meta.description}
            </p>
            {meta.downloadUrl && (
              <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center">
                <a
                  href={meta.downloadUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_12px_40px_rgba(0,112,243,0.3)]"
                >
                  <Download aria-hidden="true" size={18} />
                  {meta.downloadLabel || "Herunterladen"}
                </a>
                {meta.downloadNote && (
                  <span className="inline-flex items-center gap-2 text-sm text-neutral-500">
                    <Smartphone aria-hidden="true" size={16} />
                    {meta.downloadNote}
                  </span>
                )}
              </div>
            )}
          </div>

          {meta.images && meta.images.length > 0 ? (
            <div className="w-full -mx-6 md:mx-0">
              <ProjectGallery images={meta.images} />
            </div>
          ) : meta.image ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
            </div>
          ) : null}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <section className="md:col-span-8 prose prose-invert prose-neutral max-w-none prose-p:text-neutral-400 prose-p:leading-relaxed prose-headings:text-white prose-strong:text-brand">
            <MDXRemote source={content} />
          </section>

          <aside className="md:col-span-4 flex flex-col gap-8">
            <div className="h-px w-full bg-white/5 md:hidden" />
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-widest text-neutral-600">
                Status
              </span>
              <span className="text-sm font-medium text-neutral-300">
                {meta.status || "Completed"}
              </span>
            </div>
          </aside>
        </div>

        <div className="mt-20">
          <NextProject title={next.title} slug={next.slug} />
        </div>
      </div>
    </PageTransition>
  );
}
