'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authApi } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authApi.register(form);
      // Auto-redirect to login after successful registration
      router.push('/stock-predictor/login?registered=true');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registrierung fehlgeschlagen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="w-full max-w-sm relative">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="text-xs text-neutral-500 tracking-widest uppercase hover:text-white transition-colors mb-8 block"
          >
            ← Zurück
          </Link>
          <p className="text-xs text-neutral-500 tracking-widest uppercase mb-2">
            Stock Predictor
          </p>
          <h1 className="text-3xl font-light text-white tracking-tight">
            Registrieren
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-neutral-500 tracking-widest uppercase mb-2">
              Benutzername
            </label>
            <input
              type="text"
              required
              minLength={3}
              maxLength={50}
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full bg-transparent border border-neutral-800 text-white px-4 py-3 text-sm outline-none focus:border-neutral-500 transition-colors placeholder:text-neutral-700"
              placeholder="deinname"
            />
          </div>

          <div>
            <label className="block text-xs text-neutral-500 tracking-widest uppercase mb-2">
              E-Mail
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-transparent border border-neutral-800 text-white px-4 py-3 text-sm outline-none focus:border-neutral-500 transition-colors placeholder:text-neutral-700"
              placeholder="deine@email.com"
            />
          </div>

          <div>
            <label className="block text-xs text-neutral-500 tracking-widest uppercase mb-2">
              Passwort
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-transparent border border-neutral-800 text-white px-4 py-3 text-sm outline-none focus:border-neutral-500 transition-colors placeholder:text-neutral-700"
              placeholder="Min. 8 Zeichen"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs tracking-wide">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black text-xs tracking-widest uppercase py-3 hover:bg-neutral-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Wird erstellt...' : 'Konto erstellen'}
          </button>
        </form>

        
        <p className="text-neutral-600 text-xs mt-8 text-center">
          Bereits registriert?{' '}
          <Link
            href="/stock-predictor/login"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            Anmelden
          </Link>
        </p>

        <p className="text-neutral-600 text-xs mt-4 text-center">
          Bitte keine echte E-Mail-Adresse verwenden, da keine Bestätigungsmails versendet werden. Die Registrierung dient nur zur Demonstration der Funktionalität.
        </p>
      </div>
    </main>
  );
}