'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  const [open, setOpen] = useState(false);
  const links = LINKS[lang];

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    if (open && typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    } else if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
    return () => {
      if (typeof document !== 'undefined') document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
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

          {/* mobile: hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'close menu' : 'open menu'}
            className="md:hidden flex flex-col gap-[5px] items-center justify-center w-9 h-9 -me-2"
          >
            <span
              className={`block w-5 h-[2px] bg-white transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`}
            />
            <span className={`block w-5 h-[2px] bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span
              className={`block w-5 h-[2px] bg-white transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </nav>

      {/* mobile menu drawer */}
      <div
        dir={rtl ? 'rtl' : 'ltr'}
        className={`md:hidden fixed inset-0 z-40 bg-[#0a0a0a]/98 backdrop-blur-xl transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen px-6 gap-1">
          {links.map((l, i) => {
            const active = path === l.href || (l.href !== '/' && path?.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: 'var(--font-serif), ui-serif, Georgia, serif',
                  transitionDelay: `${i * 40}ms`,
                }}
                className={`text-3xl py-3 transition-all ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                } ${active ? 'text-[#c4a35a]' : 'text-white hover:text-[#c4a35a]'}`}
              >
                {l.label}
              </Link>
            );
          })}

          <button
            onClick={() => {
              toggle();
              setOpen(false);
            }}
            className="mt-12 text-[12px] font-mono uppercase tracking-widest text-neutral-400 hover:text-[#c4a35a] border border-white/15 rounded-full px-5 py-2"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
      </div>
    </>
  );
}
