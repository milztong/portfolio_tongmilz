// src/app/projects/page.tsx
import { getAllProjects } from "@/lib/mdx";
import Link from "next/link";
import { PageTransition } from "@/components/PageTransition";
import Image from "next/image";

export default async function ProjectsLogPage() {
  const allPosts = await getAllProjects();
  const featuredPosts = allPosts.slice(0, 3);
  const earlierPosts = allPosts.slice(3);

  return (
    <PageTransition>
      <div className="flex flex-col gap-24 max-w-5xl mx-auto">
        <header className="flex flex-col gap-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tightest">
            Projekte
          </h1>
          <p className="text-neutral-400 text-lg max-w-xl">
            Eine chronologische Auflistung aller Projekte
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post) => {
            const thumbnail = 
              (typeof post.meta.image === "string" && post.meta.image.trim() !== "") 
              ? post.meta.image 
              : post.meta.images?.[0];

            return (
              <Link
                key={post.slug}
                href={`/projects/${post.slug}`}
                className="group flex flex-col gap-4"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent transition-opacity group-hover:opacity-50" />
                  
                  {thumbnail ? (
                    <Image
                      src={thumbnail}
                      alt={post.meta.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white/5 text-xs text-neutral-600">
                      Kein Bild
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1 px-1">
                  <span className="text-xs text-neutral-500 tabular-nums">
                    {post.meta.date}
                  </span>
                  <h2 className="text-xl font-medium group-hover:text-brand transition-colors">
                    {post.meta.title}
                  </h2>
                </div>
              </Link>
            );
          })}
        </section>

        {earlierPosts.length > 0 && (
          <section className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-600 shrink-0">
                Weitere Projekte
              </h3>
              <div className="h-px w-full bg-white/5" />
            </div>

            <div className="flex flex-col">
              {earlierPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/projects/${post.slug}`}
                  className="group flex justify-between items-baseline py-6 border-b border-white/5 transition-colors hover:bg-white/[0.01]"
                >
                  <h4 className="text-lg text-neutral-400 group-hover:text-white transition-colors">
                    {post.meta.title}
                  </h4>
                  <span className="text-sm tabular-nums text-neutral-600">
                    {post.meta.date}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
}
