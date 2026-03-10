"use client";

import { StockPredictorNav } from "@/components/StockPredictorNavbar";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const FAKE_PRICES = [
  100, 102, 99, 104, 107, 105, 110, 108, 113, 111, 116, 114, 112, 117, 120, 118,
  123, 121, 126, 124,
];

export default function StockPredictorLandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [animIndex, setAnimIndex] = useState(0);

  // Animate the chart line drawing on load
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimIndex((prev) => {
        if (prev >= FAKE_PRICES.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Draw the fake chart on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const prices = FAKE_PRICES.slice(0, animIndex + 1);
    if (prices.length < 2) return;

    const min = Math.min(...prices) - 5;
    const max = Math.max(...prices) + 5;
    const xStep = W / (FAKE_PRICES.length - 1);
    const yScale = H / (max - min);

    const toX = (i: number) => i * xStep;
    const toY = (p: number) => H - (p - min) * yScale;

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, H);
    gradient.addColorStop(0, "rgba(255,255,255,0.06)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.beginPath();
    ctx.moveTo(toX(0), toY(prices[0]));
    prices.forEach((p, i) => ctx.lineTo(toX(i), toY(p)));
    ctx.lineTo(toX(prices.length - 1), H);
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(prices[0]));
    prices.forEach((p, i) => ctx.lineTo(toX(i), toY(p)));
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.stroke();

    // Current dot
    const last = prices[prices.length - 1];
    ctx.beginPath();
    ctx.arc(toX(prices.length - 1), toY(last), 4, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    // Hidden future zone
    if (animIndex === FAKE_PRICES.length - 1) {
      ctx.fillStyle = "rgba(255,255,255,0.015)";
      ctx.fillRect(toX(prices.length - 1), 0, W - toX(prices.length - 1), H);

      // Dashed vertical line
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.moveTo(toX(prices.length - 1), 0);
      ctx.lineTo(toX(prices.length - 1), H);
      ctx.strokeStyle = "rgba(255,255,255,0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [animIndex]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <StockPredictorNav />

      {/* Hero */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-16">
        <div className="mb-4">
          <span className="text-xs text-neutral-500 tracking-widest uppercase border border-neutral-800 px-3 py-1">
            Projekt — 2026
          </span>
        </div>

        <h1 className="text-6xl font-light tracking-tight leading-none mb-6">
          Kannst du den
          <br />
          <span className="text-neutral-500">Markt schlagen?</span>
        </h1>

        <p className="text-neutral-400 text-lg font-light max-w-md mb-12">
          Analysiere unbekannte Aktien. Triff eine Vorhersage. Sieh in 7 Tagen,
          ob du richtig lagst.
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="/stock-predictor/register"
            className="bg-white text-black text-xs tracking-widest uppercase px-8 py-4 hover:bg-neutral-200 transition-colors"
          >
            Jetzt spielen
          </Link>
          <Link
            href="/stock-predictor/login"
            className="text-xs text-neutral-500 tracking-widest uppercase border border-neutral-800 px-8 py-4 hover:border-neutral-500 hover:text-white transition-colors"
          >
            Anmelden
          </Link>
        </div>
      </section>

      {/* Chart demo */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        <div className="border border-neutral-900 bg-neutral-950 p-6 relative">
          {/* Chart header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-neutral-500 tracking-widest uppercase">
                Unbekannte Aktie
              </p>
              <p className="text-sm text-white mt-1">Phantom Nexus</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-neutral-500 tracking-widest uppercase">
                Letzte 83 Tage
              </p>
              <p className="text-xs text-neutral-600 mt-1">
                Nächste 7 Tage verborgen →
              </p>
            </div>
          </div>

          {/* Canvas chart */}
          <canvas
            ref={canvasRef}
            width={800}
            height={200}
            className="w-full h-48"
          />

          {/* Reveal overlay */}
          {!revealed && animIndex === FAKE_PRICES.length - 1 && (
            <div className="absolute bottom-6 right-6">
              <button
                onClick={() => setRevealed(true)}
                className="text-xs tracking-widest uppercase border border-neutral-700 px-4 py-2 text-neutral-400 hover:border-white hover:text-white transition-colors"
              >
                Demo aufdecken
              </button>
            </div>
          )}

          {revealed && (
            <div className="mt-4 pt-4 border-t border-neutral-900 flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-500 tracking-widest uppercase mb-1">
                  Ergebnis
                </p>
                <p className="text-white text-sm">↑ +24% in 7 Tagen</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-neutral-500 tracking-widest uppercase mb-1">
                  Dein Score
                </p>
                <p className="text-white text-sm">132 / 150 Punkte</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-24 border-t border-neutral-900 pt-16">
        <p className="text-xs text-neutral-500 tracking-widest uppercase mb-12">
          So funktioniert es
        </p>
        <div className="grid grid-cols-3 gap-12">
          {[
            {
              num: "01",
              title: "Analysiere",
              desc: "Du siehst 83 Tage Kursverlauf einer anonymisierten Aktie — kein Ticker, kein Name.",
            },
            {
              num: "02",
              title: "Vorhersage",
              desc: "Wähle ob der Kurs steigt oder fällt und gib deinen Zielpreis für 7 Tage ein.",
            },
            {
              num: "03",
              title: "Ergebnis",
              desc: "Nach 7 Tagen wird die Aktie aufgedeckt. Punkte basieren auf Richtung & Genauigkeit.",
            },
          ].map((step) => (
            <div key={step.num}>
              <p className="text-xs text-neutral-700 tracking-widest mb-4">
                {step.num}
              </p>
              <h3 className="text-white font-light mb-3">{step.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Scoring */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-24 border-t border-neutral-900 pt-16">
        <p className="text-xs text-neutral-500 tracking-widest uppercase mb-12">
          Punktesystem
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-neutral-900 p-6">
            <p className="text-3xl font-light text-white mb-2">50</p>
            <p className="text-xs text-neutral-500 tracking-widest uppercase">
              Punkte
            </p>
            <p className="text-neutral-400 text-sm mt-3">
              Richtige Richtung (↑ oder ↓)
            </p>
          </div>
          <div className="border border-neutral-900 p-6">
            <p className="text-3xl font-light text-white mb-2">100</p>
            <p className="text-xs text-neutral-500 tracking-widest uppercase">
              Punkte
            </p>
            <p className="text-neutral-400 text-sm mt-3">
              Preisgenauigkeit (je näher, desto mehr)
            </p>
          </div>
        </div>
        <p className="text-neutral-600 text-xs mt-4">
          Max. 150 Punkte pro Vorhersage
        </p>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-24 border-t border-neutral-900 pt-16">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-light tracking-tight mb-2">Bereit?</h2>
            <p className="text-neutral-500 text-sm">
              Kostenlos — kein echtes Geld.
            </p>
          </div>
          <Link
            href="/stock-predictor/register"
            className="bg-white text-black text-xs tracking-widest uppercase px-8 py-4 hover:bg-neutral-200 transition-colors"
          >
            Jetzt starten
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-neutral-900 px-6 py-5 flex items-center justify-between">
        <p className="text-xs text-neutral-600">
          Stock Predictor — Teil von{" "}
          <Link href="/" className="hover:text-neutral-400 transition-colors">
            tongmilz.com
          </Link>
        </p>
        <Link
          href="/stock-predictor/login"
          className="text-xs text-neutral-600 tracking-widest uppercase hover:text-white transition-colors"
        >
          Anmelden →
        </Link>
      </footer>
    </main>
  );
}
