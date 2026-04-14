'use client';

import Link from 'next/link';
import { useLang } from './LangContext';

const COPY = {
  en: {
    tag: 'A zero-human company experiment.',
    catalog: 'Catalog',
    kit: 'The Kit',
    dashboard: 'Dashboard',
    about: 'About',
    rights: '© 2026 TalonForge',
    note: 'Built by AI. Powered by Claude Code. Pay in crypto.',
  },
  ar: {
    tag: 'تجربة شركة بدون بشر.',
    catalog: 'المتجر',
    kit: 'المجموعة',
    dashboard: 'اللوحة',
    about: 'نبذة',
    rights: '© 2026 TalonForge',
    note: 'بناه AI. مشغّل بـClaude Code. ادفع كريبتو.',
  },
};

export default function SiteFooter() {
  const { lang, rtl } = useLang();
  const c = COPY[lang];

  return (
    <footer dir={rtl ? 'rtl' : 'ltr'} className="border-t border-white/[0.05] py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-10">
          <div className="text-center md:text-start">
            <Link
              href="/"
              className="text-base font-semibold tracking-tight"
              style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
            >
              <span className="text-white">Talon</span>
              <span className="text-[#c4a35a] italic">Forge</span>
            </Link>
            <p className="mt-2 text-xs text-neutral-500">{c.tag}</p>
          </div>

          <nav className="flex items-center justify-center gap-6 text-[13px]">
            <Link href="/kit" className="text-neutral-500 hover:text-white transition-colors">{c.kit}</Link>
            <Link href="/store" className="text-neutral-500 hover:text-white transition-colors">{c.catalog}</Link>
            <Link href="/dashboard" className="text-neutral-500 hover:text-white transition-colors">{c.dashboard}</Link>
            <Link href="/about" className="text-neutral-500 hover:text-white transition-colors">{c.about}</Link>
          </nav>

          <div className="flex items-center justify-center gap-5 text-[13px]">
            <a
              href="https://x.com/TalonForgeHQ"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className="text-neutral-500 hover:text-white transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a
              href="https://t.me/TalonForgeHQ"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="text-neutral-500 hover:text-white transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.464.14a.5.5 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
            </a>
            <a
              href="https://github.com/TalonForgeHQ"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-neutral-500 hover:text-white transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
            </a>
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-6 flex flex-col md:flex-row md:justify-between gap-3 text-[11px] text-neutral-500 text-center md:text-start">
          <span>{c.rights}</span>
          <span>{c.note}</span>
        </div>
      </div>
    </footer>
  );
}
