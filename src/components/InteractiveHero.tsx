"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Database, Github, Linkedin, Radio, Server, Smartphone } from "lucide-react";
import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

const proofPoints = [
  { value: "4", label: "Backend-Module" },
  { value: "2", label: "Web + Mobile" },
  { value: "M.Sc.", label: "Informatik" },
];

export const InteractiveHero = () => {
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 24 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 24 });
  const rotateX = useTransform(smoothY, [0, 1], [3, -3]);
  const rotateY = useTransform(smoothX, [0, 1], [-4, 4]);

  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  };

  return (
    <section
      onMouseMove={handlePointerMove}
      className="site-container grid min-h-[min(860px,100svh)] items-center gap-14 pb-20 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:pt-36"
    >
      <div className="flex flex-col items-start">
        <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-medium text-brand">
          <span className="animate-status h-2 w-2 rounded-full bg-brand" />
          Offen für neue Herausforderungen
        </div>

        <p className="eyebrow mb-5">Backend · Full Stack · AI</p>
        <h1 className="max-w-3xl text-balance text-[clamp(3.35rem,8.2vw,7rem)] font-black leading-[0.91] tracking-tightest text-white">
          Systeme mit
          <span className="block text-brand">Substanz.</span>
        </h1>
        <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-muted md:text-xl">
          Ich bin Tong Milz, Softwareentwickler mit M.Sc. Informatik. Ich verbinde robuste Backend-Architektur mit klaren Interfaces – von modularen Spring-Boot-Systemen bis React Native.
        </p>

        <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href="#selected-work"
            className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-extrabold text-page transition-all hover:-translate-y-0.5 hover:bg-brand-strong"
          >
            Projekte entdecken
            <ArrowDownRight size={17} aria-hidden="true" />
          </Link>
          <Link
            href="/about"
            className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06]"
          >
            Profil ansehen
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold">
          <a
            href="https://github.com/milztong"
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-lg py-2 text-muted transition-colors hover:text-brand"
          >
            <Github size={17} aria-hidden="true" /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/tong-milz-1539953a6"
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-lg py-2 text-muted transition-colors hover:text-brand"
          >
            <Linkedin size={17} aria-hidden="true" /> LinkedIn
          </a>
        </div>

        <dl className="mt-12 grid w-full max-w-xl grid-cols-3 border-t border-white/10 pt-6">
          {proofPoints.map((item) => (
            <div key={item.label} className="border-l border-white/10 px-3 first:border-l-0 first:pl-0 sm:px-4">
              <dt className="text-xs leading-4 text-muted sm:text-sm">{item.label}</dt>
              <dd className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="relative mx-auto w-full max-w-[34rem]"
      >
        <div className="absolute -inset-8 rounded-[3rem] bg-electric/10 blur-3xl" />
        <div className="panel relative overflow-hidden rounded-[2rem] p-4 sm:p-6">
          <div className="flex items-center justify-between border-b border-white/8 pb-4">
            <div>
              <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-brand">Live architecture</p>
              <p className="mt-1 text-sm font-semibold text-white">Jinodo event flow</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="h-2 w-2 rounded-full bg-brand" />
              operational
            </div>
          </div>

          <div className="relative mt-5 grid min-h-[25rem] grid-cols-2 content-between gap-x-5 gap-y-12 overflow-hidden rounded-2xl border border-white/6 bg-black/20 p-4 sm:p-6">
            <div className="absolute left-1/2 top-[14%] h-[72%] w-px -translate-x-1/2 bg-gradient-to-b from-electric/0 via-electric/70 to-brand/0" />
            <div className="absolute left-[20%] right-[20%] top-1/2 h-px bg-gradient-to-r from-brand/0 via-white/30 to-brand/0" />

            <SystemNode icon={<Radio size={18} />} label="Sources" detail="GitHub · News · YouTube" tone="electric" />
            <SystemNode icon={<Server size={18} />} label="Ingestion" detail="Spring Boot" />
            <div className="col-span-2 mx-auto -my-4 flex w-[72%] items-center justify-between rounded-2xl border border-brand/25 bg-brand/8 px-4 py-3 shadow-[0_0_40px_rgba(184,255,90,0.08)]">
              <div className="flex items-center gap-3">
                <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-page">
                  <Database size={18} />
                  <span className="absolute -right-1 -top-1 h-2.5 w-2.5 animate-ping rounded-full bg-brand" />
                </span>
                <div>
                  <p className="text-sm font-bold text-white">Kafka</p>
                  <p className="text-xs text-muted">event backbone</p>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-brand">event-driven</span>
            </div>
            <SystemNode icon={<Database size={18} />} label="Processing" detail="Persist · Broadcast" />
            <SystemNode icon={<Smartphone size={18} />} label="Clients" detail="Web · Android" tone="electric" />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center font-mono text-[0.66rem] uppercase tracking-wider text-muted">
            <span className="rounded-lg bg-white/[0.035] px-2 py-2">Kafka</span>
            <span className="rounded-lg bg-white/[0.035] px-2 py-2">Redis</span>
            <span className="rounded-lg bg-white/[0.035] px-2 py-2">WebSocket</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

function SystemNode({ icon, label, detail, tone = "brand" }: { icon: ReactNode; label: string; detail: string; tone?: "brand" | "electric" }) {
  return (
    <div className="relative z-10 rounded-2xl border border-white/8 bg-surface-strong/90 p-4">
      <div className={`mb-5 flex h-9 w-9 items-center justify-center rounded-xl ${tone === "brand" ? "bg-brand/12 text-brand" : "bg-electric/12 text-electric"}`}>
        {icon}
      </div>
      <p className="text-sm font-bold text-white">{label}</p>
      <p className="mt-1 text-xs leading-5 text-muted">{detail}</p>
    </div>
  );
}
