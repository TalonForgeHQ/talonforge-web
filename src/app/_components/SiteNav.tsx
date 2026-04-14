'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang } from './LangContext';

const LINKS = {
  en: [
    { href: '/kit', label: 'The Kit' },
    { href: '/store', label: 'Catalog' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/about', label: 'About' },
  ],
  ar: [
    { href: '/kit', label: 'المجموعة' },
    { href: '/store', label: 'المتجر' },
    { href: '/dashboard', label: 'اللوحة' },
    { href: '/about', label: 'نبذة' },
  ],
};

export default function SiteNav() {
  const path = usePathname();
  const { lang, toggle, rtl } = useLang();
  const links = LINKS[lang];

  return (
    <nav
      dir={rtl ? 'rtl' : 'ltr'}
      className="fixed top-0 inset-x-0 z-50 bg-[#0a0a0a]/85 backdrop-blur-md border-b border-white/[0.05]"
    >
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
          <button
            onClick={toggle}
            aria-label="toggle language"
            className="ms-2 text-[11px] font-mono uppercase tracking-widest text-neutral-500 hover:text-[#c4a35a] transition-colors border border-white/10 rounded-full px-3 py-1"
          >
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>
        </div>

        <button
          onClick={toggle}
          className="md:hidden text-[11px] font-mono uppercase tracking-widest text-neutral-500 hover:text-[#c4a35a] border border-white/10 rounded-full px-3 py-1"
        >
          {lang === 'en' ? 'عربي' : 'EN'}
        </button>
      </div>
    </nav>
  );
}
