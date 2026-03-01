"use client";
import { motion } from "framer-motion";

interface ProjectProps {
  title: string;
  category: string;
  index: number; 
}

export const ProjectCard = ({ title, category, index }: ProjectProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer rounded-3xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-500 hover:bg-white/[0.05] hover:border-white/20"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        <div className="absolute inset-0 rounded-2xl border border-white/0 transition-colors duration-500 group-hover:border-white/10" />
      </div>

      <div className="mt-6 flex items-end justify-between px-2 pb-2">
        <div>
          <p className="mb-1 text-xs uppercase tracking-widest text-neutral-500 transition-colors group-hover:text-brand">
            {category}
          </p>
          <h3 className="text-xl font-medium tracking-tight text-white">{title}</h3>
        </div>
        
        <div className="rounded-full border border-white/5 p-2 text-neutral-500 transition-all duration-300 group-hover:-rotate-45 group-hover:border-white/20 group-hover:text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </div>
    </motion.div>
  );
};