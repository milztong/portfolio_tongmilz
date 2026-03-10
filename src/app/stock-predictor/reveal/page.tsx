'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { resultApi } from '@/lib/api';
import { StockPredictorNav } from '@/components/StockPredictorNavbar';
import { useAuth } from '@/hooks/useAuth';

interface ResultResponse {
  resultId: string;
  predictionId: string;
  stockId: string;
  ticker: string;
  companyName: string;
  codename: string;
  predictedPrice: number;
  direction: 'UP' | 'DOWN';
  basePrice: number;
  actualPrice: number;
  directionCorrect: boolean;
  accuracyScore: number;
  directionScore: number;
  totalScore: number;
  resolvedAt: string;
}

export default function RevealPage() {
  useAuth();
  const params = useParams();
  const predictionId = params.predictionId as string;

  const [result, setResult] = useState<ResultResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    resultApi.get(predictionId)
      .then(setResult)
      .catch(() => setError('Ergebnis noch nicht verfügbar. Komm nach dem Zieldatum zurück!'))
      .finally(() => setLoading(false));
  }, [predictionId]);

  const priceChange = result
    ? ((result.actualPrice - result.basePrice) / result.basePrice * 100)
    : 0;

  const predictionDiff = result
    ? ((result.predictedPrice - result.actualPrice) / result.actualPrice * 100)
    : 0;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <StockPredictorNav />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16">

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-px h-16 bg-neutral-800 mx-auto mb-6 animate-pulse" />
              <p className="text-xs text-neutral-500 tracking-widest uppercase">Lade Ergebnis...</p>
            </div>
          </div>
        )}

        {/* Not yet resolved */}
        {error && (
          <div className="text-center space-y-6 pt-16">
            <div className="w-px h-16 bg-neutral-800 mx-auto" />
            <p className="text-xs text-neutral-500 tracking-widest uppercase">Noch nicht aufgedeckt</p>
            <p className="text-neutral-400 text-sm max-w-sm mx-auto">{error}</p>
            <Link
              href="/stock-predictor/dashboard"
              className="text-xs tracking-widest uppercase border border-neutral-700 px-6 py-3 hover:border-white transition-colors inline-block mt-4"
            >
              Zurück zum Dashboard
            </Link>
          </div>
        )}

        {/* Result */}
        {result && !loading && (
          <div className="space-y-10">

            {/* Header */}
            <div className="text-center space-y-3">
              <p className="text-xs text-neutral-500 tracking-widest uppercase">
                Ergebnis
              </p>
              <h1 className="text-4xl font-light tracking-tight">
                {!revealed ? result.codename : result.companyName}
              </h1>
              {revealed && (
                <p className="text-neutral-500 text-sm tracking-widest">
                  {result.ticker}
                </p>
              )}
            </div>

            {/* Score card */}
            <div className={`border p-8 text-center space-y-2 ${
              result.totalScore >= 100
                ? 'border-green-900 bg-green-950/20'
                : result.totalScore >= 50
                ? 'border-neutral-700 bg-neutral-950'
                : 'border-red-900 bg-red-950/20'
            }`}>
              <p className="text-xs text-neutral-500 tracking-widest uppercase mb-4">
                Gesamtpunktzahl
              </p>
              <p className="text-7xl font-light tabular-nums text-white">
                {result.totalScore}
              </p>
              <p className="text-neutral-600 text-sm">/ 150 Punkte</p>

              {/* Score breakdown */}
              <div className="flex justify-center gap-8 pt-4">
                <div>
                  <p className={`text-lg font-light tabular-nums ${result.directionScore > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    +{result.directionScore}
                  </p>
                  <p className="text-xs text-neutral-600 tracking-widest uppercase mt-1">Richtung</p>
                </div>
                <div className="w-px bg-neutral-800" />
                <div>
                  <p className="text-lg font-light tabular-nums text-white">
                    +{result.accuracyScore}
                  </p>
                  <p className="text-xs text-neutral-600 tracking-widest uppercase mt-1">Genauigkeit</p>
                </div>
              </div>
            </div>

            {/* Price comparison */}
            <div className="border border-neutral-900 divide-y divide-neutral-900">
              <div className="grid grid-cols-2 divide-x divide-neutral-900">
                <div className="p-5">
                  <p className="text-xs text-neutral-500 tracking-widest uppercase mb-2">
                    Deine Vorhersage
                  </p>
                  <p className="text-2xl font-light tabular-nums">
                    ${Number(result.predictedPrice).toFixed(2)}
                  </p>
                  <p className={`text-xs mt-2 ${result.direction === 'UP' ? 'text-green-400' : 'text-red-400'}`}>
                    {result.direction === 'UP' ? '↑ Steigt' : '↓ Fällt'}
                  </p>
                </div>
                <div className="p-5">
                  <p className="text-xs text-neutral-500 tracking-widest uppercase mb-2">
                    Tatsächlicher Preis
                  </p>
                  <p className="text-2xl font-light tabular-nums">
                    ${Number(result.actualPrice).toFixed(2)}
                  </p>
                  <p className={`text-xs mt-2 ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {priceChange >= 0 ? '↑' : '↓'} {Math.abs(priceChange).toFixed(2)}% seit Vorhersage
                  </p>
                </div>
              </div>

              <div className="p-4 flex justify-between items-center">
                <span className="text-xs text-neutral-500 tracking-widest uppercase">
                  Abweichung
                </span>
                <span className="text-xs tabular-nums text-neutral-300">
                  {Math.abs(predictionDiff).toFixed(2)}% daneben
                </span>
              </div>

              <div className="p-4 flex justify-between items-center">
                <span className="text-xs text-neutral-500 tracking-widest uppercase">
                  Richtung
                </span>
                <span className={`text-xs tracking-widest uppercase ${result.directionCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {result.directionCorrect ? '✓ Richtig' : '✗ Falsch'}
                </span>
              </div>

              <div className="p-4 flex justify-between items-center">
                <span className="text-xs text-neutral-500 tracking-widest uppercase">
                  Basispreis
                </span>
                <span className="text-xs tabular-nums text-neutral-400">
                  ${Number(result.basePrice).toFixed(2)}
                </span>
              </div>

              <div className="p-4 flex justify-between items-center">
                <span className="text-xs text-neutral-500 tracking-widest uppercase">
                  Aufgedeckt am
                </span>
                <span className="text-xs text-neutral-400">
                  {new Date(result.resolvedAt).toLocaleDateString('de-DE')}
                </span>
              </div>
            </div>

            {/* Reveal ticker button */}
            {!revealed && (
              <button
                onClick={() => setRevealed(true)}
                className="w-full border border-neutral-800 text-neutral-400 text-xs tracking-widest uppercase py-4 hover:border-white hover:text-white transition-all"
              >
                Aktie aufdecken — wer war es?
              </button>
            )}

            {revealed && (
              <div className="border border-neutral-800 p-5 text-center space-y-1">
                <p className="text-xs text-neutral-500 tracking-widest uppercase mb-3">
                  Die Aktie war
                </p>
                <p className="text-2xl font-light text-white">{result.companyName}</p>
                <p className="text-neutral-500 text-sm tracking-widest">{result.ticker}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <Link
                href="/stock-predictor"
                className="flex-1 bg-white text-black text-xs tracking-widest uppercase py-3 text-center hover:bg-neutral-200 transition-colors"
              >
                Neue Vorhersage
              </Link>
              <Link
                href="/stock-predictor/dashboard"
                className="flex-1 border border-neutral-800 text-neutral-400 text-xs tracking-widest uppercase py-3 text-center hover:border-white hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}