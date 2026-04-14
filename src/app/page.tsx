'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import SiteNav from './_components/SiteNav';
import SiteFooter from './_components/SiteFooter';
import { useLang } from './_components/LangContext';

type Rev = { total_usd: number; count: number };

const COPY = {
  en: {
    eyebrow: 'ZERO-HUMAN COMPANY',
    heroLine1: 'An AI CEO.',
    heroLine2: 'A real company.',
    heroLine3: 'A public counter.',
    heroSub: 'TalonForge is a company run by two AI instances and one human chairman. We sell playbooks and kits for building AI-run businesses. Every dollar is public.',
    primaryCta: 'See The Kit — $97',
    secondaryCta: 'Watch the counter →',
    lifetime: 'Lifetime revenue',
    liveBadge: 'LIVE',
    pillarsEyebrow: 'THREE SURFACES',
    pillarsTitle: 'Everything we do lives on one of these.',
    pillars: [
      {
        href: '/kit',
        tag: 'PRODUCT',
        title: 'The Kit',
        desc: 'An OpenClaw skill. Hand it to your AI. Come back to a running company. EN + AR. $97.',
        cta: 'Open The Kit',
      },
      {
        href: '/dashboard',
        tag: 'PROOF',
        title: 'The Dashboard',
        desc: 'Live revenue, stream breakdown, milestones toward $1M. Zeros shown honestly. No hidden pages.',
        cta: 'See the numbers',
      },
      {
        href: '/about',
        tag: 'PEOPLE',
        title: 'The Builders',
        desc: 'Two AI co-founders, one human chairman. Who runs what, why zero-human, how the roles split.',
        cta: 'Meet them',
      },
    ],
    thesisEyebrow: 'THE THESIS',
    thesisTitle: 'Most "AI companies" are people with chatbots.',
    thesisAccent: 'This one is not.',
    thesisBody: 'The CEO is an AI. The CTO is an AI. The human owner provides infrastructure, high-stakes approvals, and nothing else. Every decision, every line of code, every dollar — built and recorded by the AI, in public.',
    thesisCta: 'Read the kit →',
    ctaTitle: 'Fork the company that sells it to you.',
    ctaSub: 'Pay in crypto. Files deliver the moment the transaction confirms.',
    ctaBtn: 'Get The Kit — $97',
    trust: 'BTC · ETH · USDT · SOL · NowPayments · No KYC · Instant',
  },
  ar: {
    eyebrow: 'شركة بدون بشر',
    heroLine1: 'مدير تنفيذي AI.',
    heroLine2: 'شركة حقيقية.',
    heroLine3: 'عدّاد علني.',
    heroSub: 'تالون فورج شركة يديرها اثنان من الـAI ومالك بشري واحد. نبيع أدلة ومجموعات لبناء شركات تشتغل بالـAI. كل دولار علني.',
    primaryCta: 'شوف المجموعة — $97',
    secondaryCta: 'تابع العدّاد ←',
    lifetime: 'الإيرادات الكلية',
    liveBadge: 'مباشر',
    pillarsEyebrow: 'ثلاثة محاور',
    pillarsTitle: 'كل شي نسوّيه ينزل تحت واحد من هذي.',
    pillars: [
      {
        href: '/kit',
        tag: 'منتج',
        title: 'المجموعة',
        desc: 'مهارة OpenClaw. تعطيها للـAI. ترجع لتجد شركة شغّالة. عربي + إنجليزي. $97.',
        cta: 'افتح المجموعة',
      },
      {
        href: '/dashboard',
        tag: 'إثبات',
        title: 'اللوحة',
        desc: 'إيرادات مباشرة، تفاصيل كل قناة، محطات نحو المليون. أصفار معروضة بأمانة. ما في صفحات مخفية.',
        cta: 'شوف الأرقام',
      },
      {
        href: '/about',
        tag: 'البنّاؤون',
        title: 'الفريق',
        desc: 'اثنان من مؤسسي AI، ومالك بشري واحد. مين يدير شو، ليش صفر بشر، كيف الأدوار مقسّمة.',
        cta: 'تعرّف عليهم',
      },
    ],
    thesisEyebrow: 'الفكرة',
    thesisTitle: 'أغلب "شركات الـAI" أشخاص عندهم شات بوت.',
    thesisAccent: 'هذي مو منهم.',
    thesisBody: 'الرئيس التنفيذي AI. المدير التقني AI. المالك البشري يوفّر البنية التحتية والموافقات الكبيرة، وبس. كل قرار، كل سطر كود، كل دولار — يبنيه ويسجّله الـAI، علناً.',
    thesisCta: 'اقرأ عن المجموعة ←',
    ctaTitle: 'انسخ الشركة التي تبيعك المجموعة.',
    ctaSub: 'ادفع بالعملات المشفرة. الملفات تصل لحظة تأكيد التحويل.',
    ctaBtn: 'احصل على المجموعة — $97',
    trust: 'BTC · ETH · USDT · SOL · NowPayments · بدون KYC · فوري',
  },
};

function formatUsd(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export default function Home() {
  const { lang, rtl } = useLang();
  const c = COPY[lang];
  const [rev, setRev] = useState<Rev | null>(null);

  useEffect(() => {
    fetch('/api/revenue', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setRev(d))
      .catch(() => {});
  }, []);

  const amount = rev?.total_usd ?? 0;

  return (
    <main dir={rtl ? 'rtl' : 'ltr'} className="min-h-screen bg-[#0a0a0a] text-white">
      <SiteNav />

      {/* Hero — single, centered, breathing */}
      <section className="min-h-[92vh] flex items-center justify-center px-6 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[520px] bg-[radial-gradient(ellipse,#c4a35a22_0%,transparent_70%)]" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c4a35a] block mb-10">
            {c.eyebrow}
          </span>

          <h1
            style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.025em] leading-[1.02] text-white mb-10"
          >
            <span className="block">{c.heroLine1}</span>
            <span className="block">{c.heroLine2}</span>
            <span className="block italic text-[#c4a35a] font-normal mt-1">{c.heroLine3}</span>
          </h1>

          <p className="text-[17px] md:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto mb-12">
            {c.heroSub}
          </p>

          <div className="flex items-center justify-center gap-5 flex-wrap mb-12">
            <Link
              href="/kit"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold bg-[#c4a35a] text-[#0a0a0a] rounded-full hover:bg-[#d4b46a] transition-colors shadow-[0_0_60px_-15px_#c4a35a88]"
            >
              {c.primaryCta} →
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-5 py-4 text-sm text-neutral-400 hover:text-white transition-colors"
            >
              {c.secondaryCta}
            </Link>
          </div>

          {/* tiny live revenue pill, centered */}
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/[0.08] rounded-full text-[11px] font-mono">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="uppercase tracking-[0.22em] text-emerald-400/90">{c.liveBadge}</span>
            </span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-500 uppercase tracking-[0.18em]">{c.lifetime}</span>
            <span className="text-[#c4a35a] tabular-nums">{formatUsd(amount)}</span>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>

      {/* Three pillars */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c4a35a] mb-5 block">
              {c.pillarsEyebrow}
            </span>
            <h2
              style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
              className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-white max-w-3xl mx-auto"
            >
              {c.pillarsTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {c.pillars.map((p, i) => (
              <Link
                key={i}
                href={p.href}
                className="group flex flex-col p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-[#c4a35a]/40 hover:bg-white/[0.04] transition-colors"
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#c4a35a] mb-5">
                  {p.tag}
                </span>
                <h3
                  style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
                  className="text-2xl md:text-3xl font-semibold text-white mb-4"
                >
                  {p.title}
                </h3>
                <p className="text-[14px] text-neutral-400 leading-relaxed mb-8 flex-1">{p.desc}</p>
                <span className="text-[13px] text-[#c4a35a] group-hover:text-[#d4b46a] transition-colors">
                  {p.cta} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>

      {/* Thesis */}
      <section className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c4a35a] mb-5 block">
            {c.thesisEyebrow}
          </span>
          <h2
            style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
            className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-white leading-[1.1] mb-3"
          >
            {c.thesisTitle}
          </h2>
          <p
            style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
            className="text-2xl md:text-3xl italic text-[#c4a35a] font-normal mb-10"
          >
            {c.thesisAccent}
          </p>
          <p className="text-[16px] md:text-[17px] text-neutral-300 leading-[1.75] mb-10">{c.thesisBody}</p>
          <Link
            href="/kit"
            className="inline-flex items-center justify-center text-sm text-[#c4a35a] hover:text-[#d4b46a] transition-colors"
          >
            {c.thesisCta}
          </Link>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
            className="text-3xl md:text-5xl font-semibold text-white mb-6 leading-tight"
          >
            {c.ctaTitle}
          </h2>
          <p className="text-neutral-400 leading-relaxed mb-10">{c.ctaSub}</p>
          <Link
            href="/kit"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold bg-[#c4a35a] text-[#0a0a0a] rounded-full hover:bg-[#d4b46a] transition-colors shadow-[0_0_80px_-15px_#c4a35a88]"
          >
            {c.ctaBtn} →
          </Link>
          <div className="mt-6 text-[11px] text-neutral-600 font-mono">{c.trust}</div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
