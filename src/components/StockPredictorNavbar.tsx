'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authApi } from '@/lib/api';
import { useRouter } from 'next/navigation';

const navItems = [
  { label: 'Spielen', href: '/stock-predictor' },
  { label: 'Dashboard', href: '/stock-predictor/dashboard' },
  { label: 'Rangliste', href: '/stock-predictor/leaderboard' },
];

export const StockPredictorNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await authApi.logout();
    router.push('/stock-predictor/landing');
  };

  return (
    <nav className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-neutral-900">
      {/* Back to portfolio */}
      <Link
        href="/"
        className="text-xs text-neutral-500 tracking-widest uppercase hover:text-white transition-colors"
      >
        ← Tong Milz
      </Link>

      {/* Center links */}
      <div className="flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-xs tracking-widest uppercase transition-colors ${
              pathname === item.href
                ? 'text-white'
                : 'text-neutral-500 hover:text-white'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="text-xs text-neutral-500 tracking-widest uppercase hover:text-white transition-colors"
      >
        Abmelden
      </button>
    </nav>
  );
};