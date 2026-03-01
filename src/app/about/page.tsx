"use client";

import { DiscordStatus } from "@/components/DiscordStatus";
import { PageTransition } from "@/components/PageTransition";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";

export default function AboutPage() {
  const experiences = [
    { company: "Datev eG", role: "Werkstudent: Monitoring im Bereich Virtuelle Arbeitsplatzsysteme", year: "10.2021 - 09.2022" },
    { company: "Kontron Europe GmbH", role: "Praktikant: Project Management CPM, Systems Engineering, Software-Engineering, Produktion, Service & Repair", year: "09.2020 — 02.2021" },
  ];

  const education = [
    { school: "Hochschule Landshut", degree: "Informatik (M. Sc.)", year: "10.2023 — 09.2025" },
    { school: "Techschnische Hochschule Nürnberg", degree: "Wirtschaftsinformatik (B. Sc.)", year: "10.2018 — 09.2022" },
  ];

  const skills = [
    { name: "C#" },
    { name: "Python" },
    { name: "JavaScript/Typescript" },
    { name: "Java" },
    { name: "PHP" },
    { name: "SQL" },
  ];

  const socials = [
    { name: "GitHub", href: "https://github.com/milztong", icon: <Github size={14} />, handle: "github.com/milztong" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/tong-milz-1539953a6", icon: <Linkedin size={14} />, handle: "linkedin.com/in/tong-milz" },
    { name: "Instagram", href: "https://www.instagram.com/_milzto_/", icon: <Instagram size={14} />, handle: "_milzto_" },
    { name: "Email", href: "mailto:milzto261@gmail.com", icon: <Mail size={14} />, handle: "milzto261@gmail.com" },
  ];

  return (
    <PageTransition>
      <div className="flex flex-col gap-24 pb-24 max-w-6xl mx-auto">
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start pt-12">
          <div className="md:col-span-4 flex flex-col gap-8">
            <div className="relative h-56 w-56 overflow-hidden rounded-full border-2 border-white/5 shadow-2xl">
              <Image 
                src="/Profilbild_TongMilz.jpeg" 
                alt="Profile Picture"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2 text-neutral-400">
                <span className="text-sm font-medium">Deutschland/München</span>
              </div>
              
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-neutral-400">Deutsch</span>
                <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-neutral-400">Englisch</span>
              </div>

              <DiscordStatus />
            </div>
          </div>

          <div className="md:col-span-8 flex flex-col gap-8">
            <div className="flex flex-col gap-6">

              <div className="flex flex-col gap-2">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tightest text-white">
                  Tong Milz
                </h1>
                <p className="text-2xl md:text-4xl text-neutral-500 font-light">
                  Master Absolvent in Informatik
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {socials.map((social) => (
                  <Link 
                    key={social.name}
                    href={social.href}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-neutral-300 hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    {social.icon}
                    {social.name}
                  </Link>
                ))}
              </div>
            </div>

            <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed max-w-3xl">
              Hi, ich bin Tong Milz. Als Master-Absolvent in Informatik brenne ich dafür, abstrakte Probleme in skalierbare Systeme zu verwandeln. Aktuell verbessere ich meine Fähigkeiten in Leetcode und programmiere mehrere kleine Projekte.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-y-8 border-t border-white/5 pt-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-white">Berufserfahrung</h2>
          </div>
          <div className="md:col-span-8 flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <div key={i} className="flex justify-between items-start group">
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl font-medium text-white group-hover:text-cyan-400 transition-colors">
                    {exp.company}
                  </h3>
                  <p className="text-lg text-neutral-500">{exp.role}</p>
                </div>
                <span className="text-sm font-mono text-white pt-2 tracking-tighter">
                  {exp.year}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-y-8 border-t border-white/5 pt-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-white">Ausbildung</h2>
          </div>
          <div className="md:col-span-8 flex flex-col gap-12">
            {education.map((edu, i) => (
              <div key={i} className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl font-medium text-white">{edu.school}</h3>
                  <p className="text-lg text-neutral-500">{edu.degree}</p>
                </div>
                <span className="text-sm font-mono text-white pt-2 tracking-tighter">
                  {edu.year}
                </span>
              </div>
            ))}
          </div>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-12 gap-y-8 border-t border-white/5 pt-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-white">Skills</h2>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skills.map((skill, i) => (
              <div key={i} className="group flex flex-col gap-2 border border-white/5 rounded-3xl p-8 hover:bg-white/[0.02] transition-all hover:border-white/10">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-white">{skill.name}</span>
                  <span className="text-lg font-medium text-neutral-300 group-hover:text-white transition-colors">
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-y-8 border-t border-white/5 pt-16">
          <div className="md:col-span-4">
            <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-white">Online</h2>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {socials.map((social, i) => (
              <Link 
                key={i} 
                href={social.href} 
                className="group flex flex-col gap-2 border border-white/5 rounded-3xl p-8 hover:bg-white/[0.02] transition-all hover:border-white/10"
              >
                <div className="text-white group-hover:text-cyan-400 transition-colors">
                  {social.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-600">{social.name}</span>
                  <span className="text-lg font-medium text-neutral-300 group-hover:text-white transition-colors">
                    {social.handle}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </PageTransition>
  );
}