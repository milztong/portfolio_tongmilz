import { PageTransition } from "@/components/PageTransition";
import { ArrowUpRight, Github, GraduationCap, Languages, Linkedin, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const skillGroups = [
  {
    label: "Backend",
    skills: ["Java", "Spring Boot", "Python", "C#", "REST APIs", "WebSockets"],
    proof: "Microservices, Authentifizierung, Event-Verarbeitung und Scheduler",
  },
  {
    label: "Data & Infrastructure",
    skills: ["Kafka", "Redis", "PostgreSQL", "SQL", "Docker", "GitHub Actions"],
    proof: "Asynchrone Kommunikation, Persistenz, CI/CD und Monitoring",
  },
  {
    label: "Frontend",
    skills: ["TypeScript", "React", "Next.js", "React Native", "Tailwind CSS"],
    proof: "Responsive Web-Produkte und eine eigenständige Android-App",
  },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/milztong", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tong-milz-1539953a6", icon: Linkedin },
  { label: "E-Mail", href: "mailto:milzto261@gmail.com", icon: Mail },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="site-container pb-28 pt-36 md:pt-44">
        <section className="grid items-start gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="relative order-2 mx-auto w-full max-w-md lg:order-1 lg:sticky lg:top-32">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-electric/10 blur-3xl" />
            <div className="panel relative overflow-hidden rounded-[2rem] p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-surface-strong">
                <Image
                  src="/Profilbild_TongMilz.jpeg"
                  alt="Tong Milz"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-page via-page/40 to-transparent p-5 pt-20">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <MapPin size={16} className="text-brand" aria-hidden="true" />
                    München, Deutschland
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 p-2 pt-4">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="focus-ring flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] text-xs font-bold text-muted transition-colors hover:border-brand/30 hover:text-brand">
                    <Icon size={15} aria-hidden="true" />
                    <span className="hidden sm:inline lg:hidden xl:inline">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="eyebrow mb-5">Über mich</p>
            <h1 className="text-balance text-5xl font-black leading-[0.95] tracking-tightest text-white sm:text-6xl md:text-7xl">
              Zwischen Architektur und Anwendung.
            </h1>
            <p className="mt-8 text-pretty text-xl leading-9 text-muted md:text-2xl">
              Ich bin Tong, Softwareentwickler mit einem Master in Informatik und einem Bachelor in Wirtschaftsinformatik. Mich interessieren Systeme, bei denen technische Tiefe und ein verständliches Produkt zusammenkommen.
            </p>
            <p className="mt-6 text-pretty text-lg leading-8 text-muted">
              In meinen aktuellen Projekten entwickle ich Event-getriebene Spring-Boot-Services, Echtzeit-Kommunikation und Oberflächen für Web und Android. Dabei gehören Tests, CI/CD und nachvollziehbare Architektur für mich genauso zum Produkt wie das sichtbare Interface.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href="mailto:milzto261@gmail.com" className="focus-ring inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-extrabold text-page transition-colors hover:bg-brand-strong">
                Kontakt aufnehmen <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <Link href="/projects" className="focus-ring inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/12 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/5">
                Projekte ansehen
              </Link>
            </div>

            <dl className="mt-14 grid gap-4 border-y border-white/8 py-7 sm:grid-cols-3">
              <Info icon={<GraduationCap size={18} />} label="Abschluss" value="M.Sc. Informatik" />
              <Info icon={<MapPin size={18} />} label="Standort" value="München" />
              <Info icon={<Languages size={18} />} label="Sprachen" value="Deutsch · Englisch" />
            </dl>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="mb-10 md:mb-14">
            <p className="eyebrow mb-4">Kompetenzen mit Kontext</p>
            <h2 className="max-w-3xl text-balance text-4xl font-black tracking-tighter text-white md:text-5xl">Nicht nur Technologien – sondern das, was ich damit baue.</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {skillGroups.map((group, index) => (
              <article key={group.label} className={`rounded-[1.75rem] border p-6 sm:p-8 ${index === 0 ? "border-brand/25 bg-brand/[0.06]" : "border-white/10 bg-surface"}`}>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.17em] text-brand">0{index + 1} · {group.label}</span>
                <p className="mt-7 min-h-20 text-lg font-bold leading-7 text-white">{group.proof}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {group.skills.map((skill) => <span key={skill} className="rounded-lg border border-white/8 bg-white/[0.035] px-2.5 py-1.5 font-mono text-xs text-muted">{skill}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-12 border-t border-white/8 pt-20 md:grid-cols-[0.65fr_1.35fr] md:gap-20">
          <div>
            <p className="eyebrow mb-4">Werdegang</p>
            <h2 className="text-4xl font-black tracking-tighter text-white">Stationen</h2>
          </div>
          <div>
            <Timeline year="2023 — 2025" title="M.Sc. Informatik" place="Hochschule Landshut" text="Schwerpunkt unter anderem auf Generative AI und der Simulation komplexer Verkehrsszenarien." />
            <Timeline year="2021 — 2022" title="Werkstudent · Monitoring" place="DATEV eG" text="Monitoring im Bereich virtueller Arbeitsplatzsysteme." />
            <Timeline year="2020 — 2021" title="Praktikum · Engineering" place="Kontron Europe GmbH" text="Einblicke in Project Management, Systems Engineering, Softwareentwicklung und Produktion." />
            <Timeline year="2018 — 2022" title="B.Sc. Wirtschaftsinformatik" place="Technische Hochschule Nürnberg" text="Verbindung von Softwareentwicklung, IT-Systemen und Unternehmensprozessen." last />
          </div>
        </section>
      </main>
    </PageTransition>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-brand">{icon}</span>
      <div><dt className="text-xs text-muted">{label}</dt><dd className="mt-0.5 text-sm font-bold text-white">{value}</dd></div>
    </div>
  );
}

function Timeline({ year, title, place, text, last = false }: { year: string; title: string; place: string; text: string; last?: boolean }) {
  return (
    <article className={`relative grid gap-4 pb-10 sm:grid-cols-[8rem_1fr] sm:gap-8 ${last ? "" : "border-b border-white/8 mb-10"}`}>
      <p className="font-mono text-xs font-bold uppercase tracking-wider text-brand">{year}</p>
      <div>
        <h3 className="text-xl font-black text-white sm:text-2xl">{title}</h3>
        <p className="mt-1 text-sm font-semibold text-electric">{place}</p>
        <p className="mt-4 max-w-xl leading-7 text-muted">{text}</p>
      </div>
    </article>
  );
}
