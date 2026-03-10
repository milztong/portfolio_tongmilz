"use client";

import { StockPredictorNav } from "@/components/StockPredictorNavbar";
import { useState, useEffect } from "react";
import Link from "next/link";
import { apiFetch, authApi } from "@/lib/api";

interface LeaderboardEntry {
  rank: number;
  username: string;
  totalScore: number;
  predictionsResolved: number;
  avgScore: number;
}

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [board, me] = await Promise.all([
          apiFetch("/api/leaderboard"),
          authApi.me().catch(() => null),
        ]);
        setEntries(board);
        if (me) setCurrentUser(me.username);
      } catch {
        setError("Fehler beim Laden der Rangliste.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = entries.filter(
    (e) =>
      search === "" || e.username.toLowerCase().includes(search.toLowerCase()),
  );

  const currentUserEntry = entries.find((e) => e.username === currentUser);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
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

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs text-neutral-500 tracking-widest uppercase mb-2">
            Stock Predictor
          </p>
          <h1 className="text-3xl font-light tracking-tight">Rangliste</h1>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-px h-16 bg-neutral-800 mx-auto mb-6 animate-pulse" />
              <p className="text-xs text-neutral-500 tracking-widest uppercase">
                Lade...
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && <p className="text-red-400 text-sm">{error}</p>}

        {!loading && !error && (
          <>
            {/* Current user highlight */}
            {currentUserEntry && (
              <div className="border border-neutral-700 p-5 mb-8 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <span className="text-xs text-neutral-500 tracking-widest uppercase w-8">
                    #{currentUserEntry.rank}
                  </span>
                  <div>
                    <p className="text-white text-sm">
                      {currentUserEntry.username}
                    </p>
                    <p className="text-neutral-500 text-xs mt-0.5">Dein Rang</p>
                  </div>
                </div>
                <div className="flex items-center gap-12 text-right">
                  <div>
                    <p className="text-white tabular-nums">
                      {currentUserEntry.totalScore}
                    </p>
                    <p className="text-xs text-neutral-600 tracking-widest uppercase mt-0.5">
                      Punkte
                    </p>
                  </div>
                  <div>
                    <p className="text-white tabular-nums">
                      {currentUserEntry.avgScore.toFixed(0)}
                    </p>
                    <p className="text-xs text-neutral-600 tracking-widest uppercase mt-0.5">
                      Ø Score
                    </p>
                  </div>
                  <div>
                    <p className="text-white tabular-nums">
                      {currentUserEntry.predictionsResolved}
                    </p>
                    <p className="text-xs text-neutral-600 tracking-widest uppercase mt-0.5">
                      Spiele
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Spieler suchen..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border border-neutral-800 text-white px-4 py-2 text-sm outline-none focus:border-neutral-500 transition-colors placeholder:text-neutral-700"
              />
            </div>

            {/* Top 3 podium */}
            {search === "" && filtered.length >= 3 && (
              <div className="grid grid-cols-3 gap-3 mb-8">
                {/* 2nd place */}
                <div className="border border-neutral-900 p-5 text-center mt-4">
                  <p className="text-2xl text-neutral-500 font-light mb-3">2</p>
                  <p className="text-white text-sm truncate">
                    {filtered[1]?.username}
                  </p>
                  <p className="text-neutral-400 tabular-nums text-lg font-light mt-2">
                    {filtered[1]?.totalScore}
                  </p>
                  <p className="text-xs text-neutral-600 tracking-widest uppercase mt-1">
                    Punkte
                  </p>
                </div>

                {/* 1st place */}
                <div className="border border-neutral-700 p-5 text-center bg-neutral-950">
                  <p className="text-2xl text-white font-light mb-3">1</p>
                  <p className="text-white text-sm truncate">
                    {filtered[0]?.username}
                  </p>
                  <p className="text-white tabular-nums text-lg font-light mt-2">
                    {filtered[0]?.totalScore}
                  </p>
                  <p className="text-xs text-neutral-600 tracking-widest uppercase mt-1">
                    Punkte
                  </p>
                </div>

                {/* 3rd place */}
                <div className="border border-neutral-900 p-5 text-center mt-8">
                  <p className="text-2xl text-neutral-600 font-light mb-3">3</p>
                  <p className="text-white text-sm truncate">
                    {filtered[2]?.username}
                  </p>
                  <p className="text-neutral-400 tabular-nums text-lg font-light mt-2">
                    {filtered[2]?.totalScore}
                  </p>
                  <p className="text-xs text-neutral-600 tracking-widest uppercase mt-1">
                    Punkte
                  </p>
                </div>
              </div>
            )}

            {/* Full table */}
            {filtered.length === 0 ? (
              <div className="border border-neutral-900 p-12 text-center">
                <p className="text-neutral-500 text-sm">
                  Keine Spieler gefunden.
                </p>
              </div>
            ) : (
              <div className="border border-neutral-900 divide-y divide-neutral-900">
                {/* Header */}
                <div className="grid grid-cols-5 px-4 py-3 text-xs text-neutral-600 tracking-widest uppercase">
                  <span>#</span>
                  <span className="col-span-2">Spieler</span>
                  <span className="text-right">Ø Score</span>
                  <span className="text-right">Punkte</span>
                </div>

                {/* Rows */}
                {filtered.map((entry) => {
                  const isMe = entry.username === currentUser;
                  return (
                    <div
                      key={entry.rank}
                      className={`grid grid-cols-5 px-4 py-4 text-sm items-center transition-colors ${
                        isMe
                          ? "bg-neutral-950 text-white"
                          : "hover:bg-neutral-950 text-neutral-300"
                      }`}
                    >
                      {/* Rank */}
                      <span
                        className={`text-xs tabular-nums ${
                          entry.rank === 1
                            ? "text-white"
                            : entry.rank === 2
                              ? "text-neutral-400"
                              : entry.rank === 3
                                ? "text-neutral-500"
                                : "text-neutral-700"
                        }`}
                      >
                        {entry.rank}
                      </span>

                      {/* Username */}
                      <div className="col-span-2 flex items-center gap-2">
                        <span className="text-sm">{entry.username}</span>
                        {isMe && (
                          <span className="text-xs text-neutral-600 tracking-widest uppercase">
                            (Du)
                          </span>
                        )}
                      </div>

                      {/* Avg score */}
                      <span className="text-right text-xs text-neutral-500 tabular-nums">
                        {entry.avgScore.toFixed(0)}
                        <span className="text-neutral-700"> / 150</span>
                      </span>

                      {/* Total score */}
                      <span
                        className={`text-right tabular-nums ${isMe ? "text-white" : ""}`}
                      >
                        {entry.totalScore}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-8 border-t border-neutral-900 flex justify-between items-center">
              <p className="text-xs text-neutral-600">
                {entries.length} Spieler gesamt
              </p>
              <Link
                href="/stock-predictor/dashboard"
                className="text-xs text-neutral-500 tracking-widest uppercase hover:text-white transition-colors"
              >
                Mein Dashboard →
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
