"use client"; 
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const pathname = usePathname(); 

  const navItems = [
    { label: 'Start', href: '/' },
    { label: 'Über mich', href: '/about' },
    { label: 'Arbeit', href: '/work' },
    { label: 'Projekte', href: '/projects' }, 
    { label: 'Stock Predictor', href: '/stock-predictor' }, 
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
      <div className="flex h-12 items-center gap-8 rounded-full border border-white/10 bg-white/[0.03] px-8 backdrop-blur-md">
        {navItems.map((item) => (
          <Link 
            key={item.label} 
            href={item.href} 
            className={`text-sm font-medium transition-colors hover:text-white ${
              pathname === item.href ? 'text-white' : 'text-neutral-500'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};