'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/kit', label: 'The Kit' },
  { href: '/store', label: 'Catalog' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/about', label: 'About' },
];

export default function SiteNav({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const path = usePathname();
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/[0.05]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight"
          style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
        >
          <span className="text-white">Talon</span>
          <span className="text-[#c4a35a] italic">Forge</span>
        </Link>
        <div className="hidden md:flex items-center gap-7 text-[13px]">
          {links.map((l) => {
            const active = path === l.href || (l.href !== '/' && path?.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`transition-colors ${active ? 'text-[#c4a35a]' : 'text-neutral-400 hover:text-white'}`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
