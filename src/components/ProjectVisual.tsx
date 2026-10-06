import { Activity, Database, GitBranch, Radio, Server, Smartphone } from "lucide-react";

export function ProjectVisual({ slug, compact = false }: { slug: string; compact?: boolean }) {
  if (slug === "Jinodo") return <JinodoVisual compact={compact} />;
  if (slug === "StockPrediction") return <StockVisual />;
  if (slug === "GenerativeAI") return <TrajectoryVisual />;
  if (slug === "Fitnessapp") return <FitnessVisual />;
  return <CodeVisual slug={slug} />;
}

function JinodoVisual({ compact }: { compact: boolean }) {
  return (
    <div className="relative h-full min-h-64 overflow-hidden bg-[radial-gradient(circle_at_65%_35%,rgba(124,140,255,0.22),transparent_45%),#0c1118] p-5 sm:p-7">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="relative mx-auto flex h-full max-w-md flex-col justify-center gap-4">
        <div className="grid grid-cols-3 items-center gap-3">
          <MiniNode icon={<Radio size={15} />} label="Sources" />
          <FlowLine />
          <MiniNode icon={<Server size={15} />} label="Ingest" />
        </div>
        <div className="mx-auto flex w-[68%] items-center justify-between rounded-xl border border-brand/25 bg-brand/10 px-3 py-2.5">
          <div className="flex items-center gap-2 text-brand">
            <Database size={15} />
            <span className="text-xs font-bold text-white">Kafka Stream</span>
          </div>
          <Activity size={14} className="text-brand" />
        </div>
        <div className="grid grid-cols-3 items-center gap-3">
          <MiniNode icon={<GitBranch size={15} />} label="Process" />
          <FlowLine />
          <MiniNode icon={<Smartphone size={15} />} label={compact ? "Apps" : "Web + Mobile"} />
        </div>
      </div>
    </div>
  );
}

function MiniNode({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-surface-strong/90 px-2 py-3 text-center shadow-xl">
      <span className="text-electric">{icon}</span>
      <span className="text-[0.65rem] font-bold text-white sm:text-xs">{label}</span>
    </div>
  );
}

function FlowLine() {
  return (
    <div className="relative h-px bg-gradient-to-r from-electric/10 via-electric to-brand/20">
      <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_12px_#b8ff5a]" />
    </div>
  );
}

function StockVisual() {
  return (
    <div className="relative h-full min-h-64 overflow-hidden bg-[#0b1016] p-5 sm:p-7">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted">Daily challenge</p>
          <p className="mt-1 text-xl font-black text-white">GOLDEN FALCON</p>
        </div>
        <span className="rounded-full bg-brand/10 px-3 py-1 font-mono text-xs font-bold text-brand">LIVE</span>
      </div>
      <svg aria-label="Beispielhafter Aktienkurs" viewBox="0 0 420 150" className="w-full overflow-visible">
        <defs>
          <linearGradient id="stockFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b8ff5a" stopOpacity="0.26" />
            <stop offset="1" stopColor="#b8ff5a" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 126 C35 118 48 72 83 89 S137 111 164 73 S216 82 246 48 S304 69 334 34 S384 37 420 16 L420 150 L0 150Z" fill="url(#stockFill)" />
        <path d="M0 126 C35 118 48 72 83 89 S137 111 164 73 S216 82 246 48 S304 69 334 34 S384 37 420 16" fill="none" stroke="#b8ff5a" strokeWidth="3" strokeLinecap="round" />
        <circle cx="420" cy="16" r="5" fill="#b8ff5a" />
      </svg>
      <div className="mt-3 flex gap-2">
        <span className="flex-1 rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2 text-center text-xs text-muted">↑ UP</span>
        <span className="flex-1 rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2 text-center text-xs text-muted">↓ DOWN</span>
      </div>
    </div>
  );
}

function TrajectoryVisual() {
  return (
    <div className="relative h-full min-h-64 overflow-hidden bg-[radial-gradient(circle_at_50%_50%,rgba(124,140,255,0.18),transparent_55%),#0b1016] p-5">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <svg aria-label="Generierte Fahrzeugtrajektorien" viewBox="0 0 440 260" className="relative h-full w-full">
        <path d="M12 224 C105 218 139 184 197 133 C253 84 311 66 430 58" fill="none" stroke="#7c8cff" strokeWidth="4" strokeLinecap="round" />
        <path d="M31 24 C116 49 163 79 207 130 C257 188 321 209 422 228" fill="none" stroke="#b8ff5a" strokeWidth="4" strokeLinecap="round" />
        <path d="M19 234 C112 230 151 192 205 141 C263 86 317 75 429 67" fill="none" stroke="#7c8cff" strokeOpacity="0.25" strokeWidth="2" />
        <path d="M26 14 C111 38 169 70 215 123 C269 184 329 198 430 218" fill="none" stroke="#b8ff5a" strokeOpacity="0.25" strokeWidth="2" />
        <circle cx="205" cy="132" r="20" fill="#fff" fillOpacity="0.04" stroke="#fff" strokeOpacity="0.18" />
        <circle cx="205" cy="132" r="5" fill="#fff" />
      </svg>
    </div>
  );
}

function FitnessVisual() {
  return (
    <div className="flex h-full min-h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-electric/15 via-[#0c1118] to-brand/10 p-6">
      <div className="w-36 rounded-[1.75rem] border-4 border-white/10 bg-page p-3 shadow-2xl">
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-white/10" />
        <div className="mb-3 h-16 rounded-xl bg-brand/12 p-3">
          <div className="h-2 w-14 rounded bg-brand/50" />
          <div className="mt-2 h-1.5 w-20 rounded bg-white/10" />
        </div>
        {[1, 2, 3].map((item) => <div key={item} className="mb-2 h-8 rounded-lg border border-white/8 bg-white/[0.03]" />)}
      </div>
    </div>
  );
}

function CodeVisual({ slug }: { slug: string }) {
  return (
    <div className="flex h-full min-h-64 items-center justify-center bg-[radial-gradient(circle_at_center,rgba(184,255,90,0.1),transparent_55%),#0b1016] p-6">
      <div className="w-full max-w-xs rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-xs text-muted">
        <p className="text-brand">{`// ${slug}`}</p>
        <p className="mt-3"><span className="text-electric">const</span> idea = <span className="text-white">solve(problem)</span>;</p>
        <p className="mt-2"><span className="text-electric">return</span> ship(idea);</p>
      </div>
    </div>
  );
}
