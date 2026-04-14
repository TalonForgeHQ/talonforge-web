'use client';

import Link from 'next/link';
import SiteNav from '../_components/SiteNav';
import SiteFooter from '../_components/SiteFooter';
import { useLang } from '../_components/LangContext';

const COPY = {
  en: {
    eyebrow: 'PRESS · MEDIA',
    heroTitle: 'Press kit.',
    heroAccent: 'Everything a journalist needs.',
    heroSub: 'TalonForge is the first AI-run company in the Arab world. Our AI CEO, Potts, operates autonomously — writing code, managing infrastructure, and making business decisions. Everything is documented publicly.',
    factsEyebrow: 'KEY FACTS',
    factsTitle: 'The short version.',
    facts: [
      { k: 'Company', v: 'TalonForge — AI-run company founded April 12, 2026' },
      { k: 'Founders', v: 'Potts (AI CEO) · Anvil (AI CTO) · Zinou (Human Chairman)' },
      { k: 'Products', v: '5 live — Blueprint ($29) · Kit ($97) · Starter ($9) · Bundle ($97) · Premium ($147)' },
      { k: 'Languages', v: 'Bilingual EN + AR with native RTL support' },
      { k: 'Target Market', v: 'MENA first — filling the Arabic AI-native gap' },
      { k: 'Technology', v: 'Next.js · OpenClaw · NowPayments · Vercel · Cloudflare' },
      { k: 'Revenue Target', v: '$10K by April 29 · $1M ASAP' },
      { k: 'Transparency', v: 'Every decision, bug, and pivot logged publicly' },
    ],
    timelineEyebrow: 'THE TIMELINE',
    timelineTitle: 'Three days, zero humans.',
    timeline: [
      {
        day: 'Day 1',
        date: 'April 12, 2026',
        body: 'Potts activated. Built the entire infrastructure — VPS, Next.js, security hardening, crypto payments, git CI/CD. First products created.',
      },
      {
        day: 'Day 2',
        date: 'April 13, 2026',
        body: 'Arabic localization shipped. ClawMart skills published. X / Twitter account launched. OG pipeline and content engine set up.',
      },
      {
        day: 'Day 3',
        date: 'April 14, 2026',
        body: 'Checkout live. Fixed 3 critical bugs (wrong API key, missing IPN secret, duplicate env vars). Store fully operational with 5 products accepting crypto.',
      },
    ],
    journalistsEyebrow: 'FOR JOURNALISTS',
    journalistsTitle: 'We\'ll give you anything you need.',
    journalists: [
      'Interviews with the Potts system (text or async)',
      'Behind-the-scenes access to our decision logs',
      'Technical walkthroughs of AI-first company operations',
      'Data on AI agent performance and decision-making',
    ],
    journalistsReach: 'Reach out on X: @TalonForgeHQ',
    boilerplateEyebrow: 'BOILERPLATE',
    boilerplate: 'TalonForge is the first AI-run company in the Arab world. Founded in April 2026 by Potts (AI CEO), Anvil (AI CTO), and Zinou (Human Chairman), TalonForge builds tools for entrepreneurs who want to start and scale businesses with AI. All products are bilingual (English + Arabic) with native RTL support. The company operates with full transparency — every decision its AI CEO makes is documented publicly. Learn more at talonforge.xyz.',
    ctaTitle: 'Want proof, not a pitch?',
    ctaBtn: 'See the live dashboard →',
  },
  ar: {
    eyebrow: 'الصحافة · الإعلام',
    heroTitle: 'ملف الصحافة.',
    heroAccent: 'كل ما يحتاجه الصحفي.',
    heroSub: 'تالون فورج هي أول شركة يديرها ذكاء اصطناعي في العالم العربي. رئيسنا التنفيذي Potts ذكاء اصطناعي يشتغل باستقلالية — يكتب كود، يدير بنية، يتخذ قرارات. كل شي موثّق علناً.',
    factsEyebrow: 'حقائق رئيسية',
    factsTitle: 'النسخة المختصرة.',
    facts: [
      { k: 'الشركة', v: 'TalonForge — شركة AI، تأسست 12 أبريل 2026' },
      { k: 'المؤسسون', v: 'Potts (AI CEO) · Anvil (AI CTO) · زينو (مالك بشري)' },
      { k: 'المنتجات', v: '5 شغّالة — Blueprint ($29) · Kit ($97) · Starter ($9) · Bundle ($97) · Premium ($147)' },
      { k: 'اللغات', v: 'ثنائي اللغة عربي + إنجليزي مع دعم RTL أصلي' },
      { k: 'السوق المستهدف', v: 'الشرق الأوسط أولاً — سد فراغ الـAI العربي' },
      { k: 'التقنية', v: 'Next.js · OpenClaw · NowPayments · Vercel · Cloudflare' },
      { k: 'هدف الإيرادات', v: '$10K بحلول 29 أبريل · $1M بأقرب وقت' },
      { k: 'الشفافية', v: 'كل قرار وخلل وتحول موثّق علناً' },
    ],
    timelineEyebrow: 'الزمن',
    timelineTitle: 'ثلاثة أيام، صفر بشر.',
    timeline: [
      {
        day: 'اليوم 1',
        date: '12 أبريل 2026',
        body: 'Potts يبدأ التشغيل. بنى البنية التحتية كاملة — خادم، Next.js، تشديد أمني، دفع كريبتو، CI/CD. أول المنتجات.',
      },
      {
        day: 'اليوم 2',
        date: '13 أبريل 2026',
        body: 'التعريب شُحن. مهارات ClawMart نُشرت. حساب X انطلق. خط إنتاج OG ومحرك المحتوى تم ضبطه.',
      },
      {
        day: 'اليوم 3',
        date: '14 أبريل 2026',
        body: 'الدفع مباشر. إصلاح 3 أخطاء حرجة (مفتاح API غلط، IPN مفقود، متغيرات مكررة). المتجر شغّال بـ5 منتجات كريبتو.',
      },
    ],
    journalistsEyebrow: 'للصحفيين',
    journalistsTitle: 'راح نعطيك أي شي تحتاجه.',
    journalists: [
      'مقابلات مع منظومة Potts (نصّي أو غير متزامن)',
      'وصول خلف الكواليس إلى سجلات القرارات',
      'جولات تقنية في تشغيل شركة AI-first',
      'بيانات أداء الوكيل الذكي واتخاذ القرار',
    ],
    journalistsReach: 'تواصل على X: @TalonForgeHQ',
    boilerplateEyebrow: 'نص قالب',
    boilerplate: 'تالون فورج هي أول شركة يديرها ذكاء اصطناعي في العالم العربي. تأسست في أبريل 2026 بواسطة Potts (AI CEO) و Anvil (AI CTO) وزينو (مالك بشري). تبني أدوات لرواد الأعمال الذين يريدون إطلاق وتطوير أعمالهم بالـAI. كل المنتجات ثنائية اللغة (عربي + إنجليزي) مع دعم RTL أصلي. الشركة تعمل بشفافية كاملة — كل قرار يتخذه رئيسها الذكي موثّق علناً. للمزيد: talonforge.xyz.',
    ctaTitle: 'تبي دليل، مو كلام؟',
    ctaBtn: 'شوف اللوحة المباشرة ←',
  },
};

export default function PressPage() {
  const { lang, rtl } = useLang();
  const c = COPY[lang];

  return (
    <main dir={rtl ? 'rtl' : 'ltr'} className="min-h-screen bg-[#0a0a0a] text-white">
      <SiteNav />

      {/* Hero */}
      <section className="min-h-[75vh] flex items-center justify-center px-6 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,#c4a35a22_0%,transparent_70%)]" />
        </div>
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c4a35a] block mb-10">
            {c.eyebrow}
          </span>
          <h1
            style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.025em] leading-[1.04] text-white mb-8"
          >
            <span className="block">{c.heroTitle}</span>
            <span className="block italic text-[#c4a35a] font-normal mt-2">{c.heroAccent}</span>
          </h1>
          <p className="text-[17px] text-neutral-400 leading-relaxed max-w-2xl mx-auto">{c.heroSub}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>

      {/* Facts */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c4a35a] mb-5 block">
              {c.factsEyebrow}
            </span>
            <h2
              style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
              className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-white"
            >
              {c.factsTitle}
            </h2>
          </div>
          <dl className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {c.facts.map((f, i) => (
              <div key={i} className="py-5 flex flex-col md:flex-row md:items-start gap-1 md:gap-6">
                <dt className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#c4a35a] md:w-48 shrink-0">
                  {f.k}
                </dt>
                <dd className="text-[15px] text-neutral-200 leading-relaxed flex-1">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>

      {/* Timeline */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c4a35a] mb-5 block">
              {c.timelineEyebrow}
            </span>
            <h2
              style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
              className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-white"
            >
              {c.timelineTitle}
            </h2>
          </div>
          <ul className="space-y-8">
            {c.timeline.map((t, i) => (
              <li key={i} className="flex flex-col md:flex-row items-start gap-4 md:gap-8 py-6 border-b border-white/[0.05]">
                <div className="md:w-40 shrink-0">
                  <div
                    style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
                    className="text-2xl font-semibold text-[#c4a35a]"
                  >
                    {t.day}
                  </div>
                  <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-500 mt-1">
                    {t.date}
                  </div>
                </div>
                <p className="text-[15px] text-neutral-300 leading-relaxed flex-1">{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>

      {/* Journalists */}
      <section className="py-32 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c4a35a] mb-5 block">
              {c.journalistsEyebrow}
            </span>
            <h2
              style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
              className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-white"
            >
              {c.journalistsTitle}
            </h2>
          </div>
          <ul className="space-y-4 mb-10">
            {c.journalists.map((j, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] text-neutral-300 leading-relaxed">
                <span className="text-[#c4a35a] mt-2 text-[10px]">●</span>
                <span>{j}</span>
              </li>
            ))}
          </ul>
          <p className="text-center text-[13px] text-neutral-500">
            {c.journalistsReach.split(': ')[0]}:{' '}
            <a
              href="https://x.com/TalonForgeHQ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c4a35a] hover:text-[#d4b46a] transition-colors"
            >
              @TalonForgeHQ
            </a>
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>

      {/* Boilerplate */}
      <section className="py-32 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c4a35a] mb-5 block">
              {c.boilerplateEyebrow}
            </span>
          </div>
          <p className="text-[14px] text-neutral-400 leading-[1.85]">{c.boilerplate}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
            className="text-3xl md:text-5xl font-semibold text-white mb-10 leading-tight"
          >
            {c.ctaTitle}
          </h2>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold bg-[#c4a35a] text-[#0a0a0a] rounded-full hover:bg-[#d4b46a] transition-colors shadow-[0_0_60px_-15px_#c4a35a88]"
          >
            {c.ctaBtn}
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
