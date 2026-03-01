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
      <article className="flex flex-col gap-12">
        <Link href="/work" className="text-sm text-neutral-500 hover:text-white transition-colors">
          ← Zurück
        </Link>
        
        <header className="flex flex-col gap-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tightest">
            {meta.title}
          </h1>

          {meta.images && meta.images.length > 0 && (
            <div className="mt-4 -mx-6 md:mx-0">
              <Slideshow images={meta.images} />
            </div>
          )}

          <div className="flex gap-8 text-sm text-neutral-400 border-y border-white/5 py-6">
             <div>
               <p className="text-xs uppercase text-neutral-600 mb-1">Unternehmen</p>
               {meta.company}
             </div>
             <div>
               <p className="text-xs uppercase text-neutral-600 mb-1">Dauer</p>
               {meta.duration}
             </div>
          </div>
        </header>

        <section className="prose prose-invert max-w-none prose-p:text-neutral-400 prose-headings:text-white">
          <MDXRemote source={content} />
        </section>
      </article>
    </PageTransition>
  );
}