'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Lang = 'en' | 'ar';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  rtl: boolean;
};

const LangCtx = createContext<Ctx | null>(null);

// `initialLang` is set by the root layout based on the request pathname
// (via middleware + headers()). This makes /ar/* routes render in Arabic
// from the first byte of SSR — no LTR flash, no dir="ltr" leaking into
// components on the server.
export function LangProvider({ children, initialLang = 'en' }: { children: ReactNode; initialLang?: Lang }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tf_lang') as Lang | null;
      if (saved === 'en' || saved === 'ar') setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('tf_lang', l);
    } catch {}
    if (typeof document !== 'undefined') {
      document.documentElement.lang = l;
      document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  }, [lang]);

  return (
    <LangCtx.Provider value={{ lang, setLang, toggle: () => setLang(lang === 'en' ? 'ar' : 'en'), rtl: lang === 'ar' }}>
      {children}
    </LangCtx.Provider>
  );
}

export function useLang(): Ctx {
  const v = useContext(LangCtx);
  if (!v) {
    return {
      lang: 'en',
      setLang: () => {},
      toggle: () => {},
      rtl: false,
    };
  }
  return v;
}
