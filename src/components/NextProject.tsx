import Link from "next/link";

export const NextProject = ({ title, slug }: { title: string; slug: string }) => {
  return (
    <Link href={`/projects/${slug}`} className="group block w-full mt-24">
      <div className="flex flex-col items-center py-24 border-t border-white/5 transition-colors hover:bg-white/[0.01]">
        <span className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4 group-hover:text-brand transition-colors">
          Nächstes Projekt
        </span>
        <h2 className="text-4xl md:text-7xl font-bold tracking-tightest flex items-center gap-4">
          {title}
          <span className="inline-block transition-transform duration-500 group-hover:translate-x-4">
            →
          </span>
        </h2>
      </div>
    </Link>
  );
};