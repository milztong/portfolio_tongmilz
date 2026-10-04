import { getWorkBySlug } from "@/lib/mdx";
import { PageTransition } from "@/components/PageTransition";
import { Slideshow } from "@/components/Slideshow"; 
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

export default async function WorkDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const { meta, content } = await getWorkBySlug(resolvedParams.slug);

  return (
    <PageTransition>
      <article className="site-container flex flex-col gap-12 pb-28 pt-36 md:pt-44">
        <Link href="/work" className="text-sm text-muted hover:text-white transition-colors">
          ← Zurück
        </Link>
        
        <header className="flex flex-col gap-6">
          <p className="eyebrow">Berufserfahrung</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tightest">
            {meta.company}
          </h1>
          <p className="max-w-2xl text-xl leading-8 text-muted">{meta.role}</p>

          {meta.images && meta.images.length > 0 && (
            <div className="mt-4 -mx-6 md:mx-0">
              <Slideshow images={meta.images} />
            </div>
          )}

          <div className="flex flex-wrap gap-8 border-y border-white/8 py-6 text-sm text-muted">
             <div>
               <p className="mb-1 text-xs uppercase text-muted">Unternehmen</p>
               {meta.company}
             </div>
             <div>
               <p className="mb-1 text-xs uppercase text-muted">Dauer</p>
               {meta.duration}
             </div>
          </div>
        </header>

        <section className="prose prose-invert max-w-none prose-p:text-muted prose-headings:text-white">
          <MDXRemote source={content} />
        </section>
      </article>
    </PageTransition>
  );
}
