"use client"; 
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Komponente, die eine Navigationsleiste mit Links zu verschiedenen Seiten der Portfolio-Website erstellt, wobei der aktuelle Pfad hervorgehoben wird, um die Navigation zu erleichtern und die Benutzererfahrung zu verbessern
export const Navbar = () => {
  const pathname = usePathname(); 

  const navItems = [
    { label: 'Start', href: '/' },
    { label: 'Über mich', href: '/about' },
    { label: 'Arbeit', href: '/work' },
    { label: 'Projekte', href: '/projects' },
    { label: 'PulseStack', href: '/projects/PulseStack' },
    { label: 'Stock Predictor', href: '/stock-predictor' },
  ];

  return (
    <nav className="no-scrollbar fixed top-0 left-0 right-0 z-50 overflow-x-auto px-4 py-6">
      <div className="mx-auto flex h-12 w-max items-center gap-4 rounded-full border border-white/10 bg-white/[0.03] px-5 backdrop-blur-md md:gap-8 md:px-8">
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
