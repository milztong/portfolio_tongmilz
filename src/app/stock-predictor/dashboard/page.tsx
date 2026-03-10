'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { predictionApi, resultApi, authApi } from '@/lib/api';
import { PredictionResponse } from '@/lib/types';

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

interface PredictionWithResult extends PredictionResponse {
  result?: ResultResponse;
}

export default function DashboardPage() {
  const [predictions, setPredictions] = useState<PredictionWithResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'RESOLVED'>('ALL');

  useEffect(() => {
    const load = async () => {
      try {
        // Load user info + predictions in parallel
        const [me, preds] = await Promise.all([
          authApi.me(),
          predictionApi.getMy(),
        ]);
        setUsername(me.username);

        // For resolved predictions, also fetch results
        const withResults = await Promise.all(
          preds.map(async (p: PredictionResponse) => {
            if (p.status === 'RESOLVED') {
              try {
                const result = await resultApi.get(p.id);
                return { ...p, result };
              } catch {
                return p;
              }
            }
            return p;
          })
        );
        setPredictions(withResults);
      } catch {
        setError('Bitte melde dich an.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = predictions.filter((p) => {
    const matchesFilter = filter === 'ALL' || p.status === filter;
    const matchesSearch =
      search === '' ||
      p.stockCodename.toLowerCase().includes(search.toLowerCase()) ||
      (p.result?.ticker ?? '').toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalScore = predictions
    .filter((p) => p.result)
    .reduce((sum, p) => sum + (p.result?.totalScore ?? 0), 0);

  const resolved = predictions.filter((p) => p.status === 'RESOLVED').length;
  const pending = predictions.filter((p) => p.status === 'PENDING').length;

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

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-neutral-900">
        <Link
          href="/"
          className="text-xs text-neutral-500 tracking-widest uppercase hover:text-white transition-colors"
        >
          ← Tong Milz
        </Link>
        <span className="text-xs text-neutral-500 tracking-widest uppercase">
          Stock Predictor
        </span>
        <Link
          href="/stock-predictor"
          className="text-xs bg-white text-black tracking-widest uppercase px-4 py-2 hover:bg-neutral-200 transition-colors"
        >
          Neue Vorhersage
        </Link>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-px h-16 bg-neutral-800 mx-auto mb-6 animate-pulse" />
              <p className="text-xs text-neutral-500 tracking-widest uppercase">Lade...</p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center space-y-4">
              <p className="text-red-400 text-sm">{error}</p>
              <Link
                href="/stock-predictor/login"
                className="text-xs tracking-widest uppercase border border-neutral-700 px-6 py-3 hover:border-white transition-colors block"
              >
                Anmelden
              </Link>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Header */}
            <div className="flex items-start justify-between mb-12">
              <div>
                <p className="text-xs text-neutral-500 tracking-widest uppercase mb-2">
                  Dashboard
                </p>
                <h1 className="text-3xl font-light tracking-tight">
                  {username}
                </h1>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-12">
              <div className="border border-neutral-900 p-5">
                <p className="text-3xl font-light tabular-nums">{totalScore}</p>
                <p className="text-xs text-neutral-500 tracking-widest uppercase mt-2">
                  Gesamtpunkte
                </p>
              </div>
              <div className="border border-neutral-900 p-5">
                <p className="text-3xl font-light tabular-nums">{resolved}</p>
                <p className="text-xs text-neutral-500 tracking-widest uppercase mt-2">
                  Abgeschlossen
                </p>
              </div>
              <div className="border border-neutral-900 p-5">
                <p className="text-3xl font-light tabular-nums">{pending}</p>
                <p className="text-xs text-neutral-500 tracking-widest uppercase mt-2">
                  Ausstehend
                </p>
              </div>
            </div>

            {/* Search + Filter */}
            <div className="flex items-center gap-3 mb-6">
              <input
                type="text"
                placeholder="Aktie suchen..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent border border-neutral-800 text-white px-4 py-2 text-sm outline-none focus:border-neutral-500 transition-colors placeholder:text-neutral-700"
              />
              {(['ALL', 'PENDING', 'RESOLVED'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-xs tracking-widest uppercase px-4 py-2 border transition-colors ${
                    filter === f
                      ? 'border-white text-white'
                      : 'border-neutral-800 text-neutral-500 hover:border-neutral-600'
                  }`}
                >
                  {f === 'ALL' ? 'Alle' : f === 'PENDING' ? 'Ausstehend' : 'Abgeschlossen'}
                </button>
              ))}
            </div>

            {/* Predictions table */}
            {filtered.length === 0 ? (
              <div className="border border-neutral-900 p-12 text-center">
                <p className="text-neutral-500 text-sm mb-6">
                  {predictions.length === 0
                    ? 'Noch keine Vorhersagen. Starte jetzt!'
                    : 'Keine Ergebnisse gefunden.'}
                </p>
                {predictions.length === 0 && (
                  <Link
                    href="/stock-predictor"
                    className="text-xs tracking-widest uppercase border border-neutral-700 px-6 py-3 hover:border-white transition-colors"
                  >
                    Erste Vorhersage abgeben
                  </Link>
                )}
              </div>
            ) : (
              <div className="border border-neutral-900 divide-y divide-neutral-900">
                {/* Table header */}
                <div className="grid grid-cols-6 px-4 py-3 text-xs text-neutral-600 tracking-widest uppercase">
                  <span className="col-span-2">Aktie</span>
                  <span>Richtung</span>
                  <span>Zielpreis</span>
                  <span>Zieldatum</span>
                  <span className="text-right">Score</span>
                </div>

                {/* Rows — resolved rows link to reveal page */}
                {filtered.map((p) => {
                  const rowContent = (
                    <>
                      {/* Stock name */}
                      <div className="col-span-2">
                        <p className="text-white text-xs">
                          {p.result ? p.result.ticker : p.stockCodename}
                        </p>
                        <p className="text-neutral-600 text-xs mt-0.5">
                          {p.result ? p.result.companyName : 'Wird aufgedeckt am ' + p.targetDate}
                        </p>
                      </div>

                      {/* Direction */}
                      <div>
                        <span className={`text-xs tracking-widest ${p.direction === 'UP' ? 'text-green-400' : 'text-red-400'}`}>
                          {p.direction === 'UP' ? '↑ Steigt' : '↓ Fällt'}
                        </span>
                        {p.result && (
                          <p className="text-xs mt-0.5">
                            {p.result.directionCorrect ? (
                              <span className="text-green-600">✓ Richtig</span>
                            ) : (
                              <span className="text-red-600">✗ Falsch</span>
                            )}
                          </p>
                        )}
                      </div>

                      {/* Predicted price */}
                      <div>
                        <p className="text-neutral-300 tabular-nums text-xs">
                          ${Number(p.predictedPrice).toFixed(2)}
                        </p>
                        {p.result && (
                          <p className="text-neutral-600 text-xs mt-0.5 tabular-nums">
                            Ist: ${Number(p.result.actualPrice).toFixed(2)}
                          </p>
                        )}
                      </div>

                      {/* Target date */}
                      <div>
                        <p className="text-neutral-400 text-xs">{p.targetDate}</p>
                        <p className={`text-xs mt-0.5 tracking-widest uppercase ${p.status === 'PENDING' ? 'text-yellow-600' : 'text-neutral-600'}`}>
                          {p.status === 'PENDING' ? 'Ausstehend' : 'Abgeschlossen'}
                        </p>
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        {p.result ? (
                          <div>
                            <p className="text-white font-light tabular-nums">
                              {p.result.totalScore}
                              <span className="text-neutral-600 text-xs"> / 150</span>
                            </p>
                            <p className="text-neutral-600 text-xs mt-0.5">
                              {p.result.directionScore}+{p.result.accuracyScore}
                            </p>
                          </div>
                        ) : (
                          <span className="text-neutral-700 text-xs">—</span>
                        )}
                      </div>
                    </>
                  );

                  if (p.status === 'RESOLVED') {
                    return (
                      <Link
                        key={p.id}
                        href={`/stock-predictor/reveal/${p.id}`}
                        className="grid grid-cols-6 px-4 py-4 text-sm items-center hover:bg-neutral-900 transition-colors cursor-pointer"
                      >
                        {rowContent}
                      </Link>
                    );
                  }

                  return (
                    <div
                      key={p.id}
                      className="grid grid-cols-6 px-4 py-4 text-sm items-center hover:bg-neutral-950 transition-colors"
                    >
                      {rowContent}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Leaderboard link */}
            <div className="mt-8 pt-8 border-t border-neutral-900 flex justify-between items-center">
              <p className="text-xs text-neutral-600">
                {predictions.length} Vorhersage{predictions.length !== 1 ? 'n' : ''} gesamt
              </p>
              <Link
                href="/stock-predictor/leaderboard"
                className="text-xs text-neutral-500 tracking-widest uppercase hover:text-white transition-colors"
              >
                Rangliste ansehen →
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
