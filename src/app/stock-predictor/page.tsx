"use client";

import { useAuth } from "@/hooks/useAuth";
import { StockPredictorNav } from "@/components/StockPredictorNavbar";
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { stockApi, predictionApi } from "@/lib/api";
import { StockResponse, PredictionResponse } from "@/lib/types";

const StockChart = dynamic(() => import("@/components/StockChart"), {
  ssr: false,
});

type Step = "loading" | "predict" | "submitted" | "error";

export default function StockPredictorPage() {
  const { loading: authLoading } = useAuth();
  const [step, setStep] = useState<Step>("loading");
  const [stock, setStock] = useState<StockResponse | null>(null);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [predictedPrice, setPredictedPrice] = useState("");
  const [direction, setDirection] = useState<"UP" | "DOWN" | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadStock = useCallback(async () => {
    setStep("loading");
    setError("");
    try {
      const data = await stockApi.getDaily();
      setStock(data);
      setStep("predict");
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes("401")) {
        setError("Du musst angemeldet sein.");
      } else {
        setError("Fehler beim Laden der Aktie.");
      }
      setStep("error");
    }
  }, []);

  useEffect(() => {
    loadStock();
  }, [loadStock]);

  const handleSubmit = async () => {
    if (!stock || !direction || !predictedPrice) return;
    const price = parseFloat(predictedPrice);
    if (isNaN(price) || price <= 0) {
      setError("Bitte gib einen gültigen Preis ein.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const result = await predictionApi.submit({
        stockId: stock.stockId,
        predictedPrice: price,
        direction,
      });
      setPrediction(result);
      setStep("submitted");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Fehler beim Speichern.");
    } finally {
      setSubmitting(false);
    }
  };

  const lastPrice = stock?.prices?.[stock.prices.length - 1]?.close;
  if (authLoading) return null;
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
        {/* Loading */}
        {step === "loading" && (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-px h-16 bg-neutral-800 mx-auto mb-6 animate-pulse" />
              <p className="text-xs text-neutral-500 tracking-widest uppercase">
                Lade Aktie...
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {step === "error" && (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <p className="text-red-400 text-sm mb-6">{error}</p>
              {error.includes("angemeldet") ? (
                <Link
                  href="/stock-predictor/login"
                  className="text-xs tracking-widest uppercase border border-neutral-700 px-6 py-3 hover:border-white transition-colors"
                >
                  Anmelden
                </Link>
              ) : (
                <button
                  onClick={loadStock}
                  className="text-xs tracking-widest uppercase border border-neutral-700 px-6 py-3 hover:border-white transition-colors"
                >
                  Erneut versuchen
                </button>
              )}
            </div>
          </div>
        )}

        {/* Predict step */}
        {step === "predict" && stock && (
          <div className="space-y-10">
            {/* Stock header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-neutral-500 tracking-widest uppercase mb-1">
                  Unbekannte Aktie
                </p>
                <h1 className="text-2xl font-light tracking-tight">
                  {stock.codename}
                </h1>
              </div>
              <div className="text-right">
                <p className="text-xs text-neutral-500 tracking-widest uppercase mb-1">
                  Letzter Kurs
                </p>
                <p className="text-2xl font-light tabular-nums">
                  ${lastPrice?.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Chart */}
            <div className="border border-neutral-900 bg-neutral-950 h-72 p-4">
              <StockChart
                prices={stock.prices.map((p) => ({
                  date: p.date,
                  close: p.close,
                }))}
              />
            </div>

            {/* Info bar */}
            <div className="flex items-center gap-8 text-xs text-neutral-500 border-t border-neutral-900 pt-4">
              <div>
                <span className="tracking-widest uppercase">Zeitraum</span>
                <span className="ml-3 text-neutral-400">
                  {stock.prices[0]?.date} →{" "}
                  {stock.prices[stock.prices.length - 1]?.date}
                </span>
              </div>
              <div>
                <span className="tracking-widest uppercase">Zieldatum</span>
                <span className="ml-3 text-neutral-400">
                  {stock.targetDate}
                </span>
              </div>
              <div>
                <span className="tracking-widest uppercase">Datenpunkte</span>
                <span className="ml-3 text-neutral-400">
                  {stock.prices.length}
                </span>
              </div>
            </div>

            {/* Prediction form */}
            <div className="border border-neutral-900 p-6 space-y-6">
              <p className="text-xs text-neutral-500 tracking-widest uppercase">
                Deine Vorhersage für {stock.targetDate}
              </p>

              {/* Direction buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDirection("UP")}
                  className={`py-4 text-xs tracking-widest uppercase border transition-all ${
                    direction === "UP"
                      ? "border-green-500 text-green-400 bg-green-500/5"
                      : "border-neutral-800 text-neutral-500 hover:border-neutral-600"
                  }`}
                >
                  ↑ Steigt
                </button>
                <button
                  onClick={() => setDirection("DOWN")}
                  className={`py-4 text-xs tracking-widest uppercase border transition-all ${
                    direction === "DOWN"
                      ? "border-red-500 text-red-400 bg-red-500/5"
                      : "border-neutral-800 text-neutral-500 hover:border-neutral-600"
                  }`}
                >
                  ↓ Fällt
                </button>
              </div>

              {/* Price input */}
              <div>
                <label className="block text-xs text-neutral-500 tracking-widest uppercase mb-2">
                  Zielpreis ($)
                </label>
                <div className="flex items-center border border-neutral-800 focus-within:border-neutral-500 transition-colors">
                  <span className="px-4 text-neutral-600 text-sm">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={predictedPrice}
                    onChange={(e) => setPredictedPrice(e.target.value)}
                    className="flex-1 bg-transparent text-white px-2 py-3 text-sm outline-none placeholder:text-neutral-700"
                    placeholder={lastPrice?.toFixed(2)}
                  />
                </div>
                {lastPrice && predictedPrice && (
                  <p className="text-xs text-neutral-600 mt-2">
                    {(
                      ((parseFloat(predictedPrice) - lastPrice) / lastPrice) *
                      100
                    ).toFixed(2)}
                    % gegenüber aktuellem Kurs
                  </p>
                )}
              </div>

              {error && (
                <p className="text-red-400 text-xs tracking-wide">{error}</p>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={submitting || !direction || !predictedPrice}
                className="w-full bg-white text-black text-xs tracking-widest uppercase py-3 hover:bg-neutral-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {submitting ? "Wird gespeichert..." : "Vorhersage abgeben"}
              </button>
            </div>
          </div>
        )}

        {/* Submitted step */}
        {step === "submitted" && prediction && (
          <div className="max-w-sm mx-auto text-center space-y-8 pt-16">
            <div>
              <div className="w-px h-16 bg-neutral-700 mx-auto mb-8" />
              <p className="text-xs text-neutral-500 tracking-widest uppercase mb-3">
                Vorhersage gespeichert
              </p>
              <h1 className="text-3xl font-light tracking-tight mb-1">
                {prediction.direction === "UP" ? "↑ Steigt" : "↓ Fällt"}
              </h1>
              <p className="text-4xl font-light tabular-nums text-white mt-4">
                ${Number(prediction.predictedPrice).toFixed(2)}
              </p>
            </div>

            <div className="border border-neutral-900 divide-y divide-neutral-900 text-left">
              <div className="flex justify-between px-4 py-3">
                <span className="text-xs text-neutral-500 tracking-widest uppercase">
                  Aktie
                </span>
                <span className="text-xs text-neutral-300">
                  {prediction.stockCodename}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3">
                <span className="text-xs text-neutral-500 tracking-widest uppercase">
                  Basispreis
                </span>
                <span className="text-xs text-neutral-300 tabular-nums">
                  ${Number(prediction.basePrice).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3">
                <span className="text-xs text-neutral-500 tracking-widest uppercase">
                  Zieldatum
                </span>
                <span className="text-xs text-neutral-300">
                  {prediction.targetDate}
                </span>
              </div>
              <div className="flex justify-between px-4 py-3">
                <span className="text-xs text-neutral-500 tracking-widest uppercase">
                  Status
                </span>
                <span className="text-xs text-yellow-500 tracking-widest uppercase">
                  Ausstehend
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-600">
              Das Ergebnis wird am {prediction.targetDate} aufgedeckt.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setStock(null);
                  setPrediction(null);
                  setPredictedPrice("");
                  setDirection(null);
                  loadStock();
                }}
                className="flex-1 border border-neutral-800 text-neutral-400 text-xs tracking-widest uppercase py-3 hover:border-neutral-500 hover:text-white transition-colors"
              >
                Neue Aktie
              </button>
              <Link
                href="/stock-predictor/dashboard"
                className="flex-1 bg-white text-black text-xs tracking-widest uppercase py-3 text-center hover:bg-neutral-200 transition-colors"
              >
                Meine Vorhersagen
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
