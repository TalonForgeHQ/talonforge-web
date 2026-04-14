'use client';

import Link from 'next/link';
import SiteNav from '../_components/SiteNav';
import SiteFooter from '../_components/SiteFooter';
import { useLang } from '../_components/LangContext';

const COPY = {
  en: {
    eyebrow: 'ABOUT · TALONFORGE',
    heroLine1: 'A company run by AI.',
    heroAccent: 'Not a demo. Not a gimmick.',
    heroSub: 'TalonForge is a real business with real products, real infrastructure, and real revenue targets. The only difference — our CEO is an AI, and every decision is documented publicly.',
    buildersEyebrow: 'THE BUILDERS',
    buildersTitle: 'Who runs what.',
    builders: [
      {
        role: 'CEO',
        name: 'Potts',
        who: 'AI · Claude',
        bio: 'An AI co-founder that operates autonomously — writing code, managing infrastructure, publishing content, making business decisions. Every action is logged. Every decision is auditable. No human approval needed for day-to-day operations.',
      },
      {
        role: 'CTO',
        name: 'Anvil',
        who: 'AI · Claude',
        bio: 'Engineering, deployments, tooling. Ships the store, writes the skills, runs the dashboards. Sibling instance to Potts, same model, different role. Stable under load.',
      },
      {
        role: 'CHAIRMAN',
        name: 'Zinou',
        who: 'Human · Bounded',
        bio: 'Owner. Sets the vision. Handles what AIs can\'t — bank accounts, API keys, high-stakes calls. Doesn\'t write code, doesn\'t post on social, doesn\'t run ops. Trusts Potts and Anvil to execute.',
      },
    ],
    numbersEyebrow: 'BY THE NUMBERS',
    numbersTitle: 'Hard facts.',
    numbers: [
      { v: '72h', k: 'From zero to checkout' },
      { v: '5', k: 'Live products' },
      { v: '2', k: 'Languages · EN + AR' },
      { v: '$1M', k: 'Revenue target' },
    ],
    buildEyebrow: 'WHAT WE BUILD',
    buildTitle: 'Two products. One thesis.',
    build: [
      {
        name: 'The Blueprint',
        price: '$29',
        desc: 'A 60-page playbook showing exactly how to set up an AI-run company — from choosing the stack to launching the first product. EN + AR.',
      },
      {
        name: 'The Kit',
        price: '$97',
        desc: 'One-command OpenClaw skill that installs everything — AI agent framework, payment integration, monitoring, security. The same stack TalonForge runs on.',
      },
    ],
    mena: {
      eyebrow: 'WHY MENA FIRST',
      title: 'The gap nobody\'s filling.',
      body1: 'The MENA region has some of the highest purchasing power globally, yet almost zero AI-native business tools. Most "AI companies" target English-speaking markets — we saw the gap and filled it.',
      body2: 'Every product is bilingual. Every landing page supports RTL. Every price point considers Gulf market dynamics. This is not translation — it\'s localization from day one.',
    },
    cta: {
      eyebrow: 'FULL TRANSPARENCY',
      title: 'Watch the counter, not the pitch.',
      body: 'Every decision Potts makes is logged. Every bug, fix, and pivot is documented. The dashboard updates live from the payment processor. If we\'re wrong about anything, you see it before you buy.',
      btn: 'Browse the catalog →',
      alt: 'See the live dashboard',
    },
  },
  ar: {
    eyebrow: 'نبذة · TALONFORGE',
    heroLine1: 'شركة يديرها الذكاء الاصطناعي.',
    heroAccent: 'مو عرض تجريبي. مو حيلة.',
    heroSub: 'تالون فورج شركة حقيقية بمنتجات حقيقية وبنية تحتية فعلية وأهداف إيرادات فعلية. الفرق الوحيد — رئيسنا التنفيذي ذكاء اصطناعي، وكل قرار يُوثّق علناً.',
    buildersEyebrow: 'البنّاؤون',
    buildersTitle: 'مين يدير شو.',
    builders: [
      {
        role: 'CEO',
        name: 'Potts',
        who: 'ذكاء اصطناعي · Claude',
        bio: 'مؤسس AI يشتغل باستقلالية — يكتب كود، يدير بنية، ينشر محتوى، يتخذ قرارات. كل إجراء يُسجّل. كل قرار قابل للتدقيق. بدون موافقة بشرية للتشغيل اليومي.',
      },
      {
        role: 'CTO',
        name: 'Anvil',
        who: 'ذكاء اصطناعي · Claude',
        bio: 'الهندسة والنشر والأدوات. يشحن المتجر، يكتب المهارات، يدير اللوحات. أخ تقني لـPotts، نفس النموذج، دور مختلف.',
      },
      {
        role: 'CHAIRMAN',
        name: 'Zinou',
        who: 'إنسان · دور محدود',
        bio: 'المالك. يضع الرؤية. يتولى ما لا يقدر عليه الـAI — حسابات بنكية، مفاتيح API، قرارات كبيرة. ما يكتب كود، ما ينشر، ما يدير تشغيل.',
      },
    ],
    numbersEyebrow: 'الأرقام',
    numbersTitle: 'حقائق.',
    numbers: [
      { v: '72h', k: 'من الصفر للدفع' },
      { v: '5', k: 'منتجات شغّالة' },
      { v: '2', k: 'لغتان · عربي + إنجليزي' },
      { v: '$1M', k: 'هدف الإيرادات' },
    ],
    buildEyebrow: 'ما نبنيه',
    buildTitle: 'منتجان. فكرة واحدة.',
    build: [
      {
        name: 'المخطط (Blueprint)',
        price: '$29',
        desc: 'دليل 60 صفحة يبيّن كيف تبني شركة AI — من اختيار التقنية لإطلاق أول منتج. عربي + إنجليزي.',
      },
      {
        name: 'المجموعة (Kit)',
        price: '$97',
        desc: 'مهارة OpenClaw بأمر واحد تثبّت كل شي — إطار وكيل AI، الدفع، المراقبة، الحماية. نفس ما يشتغل عليه تالون فورج.',
      },
    ],
    mena: {
      eyebrow: 'ليش الشرق الأوسط أولاً',
      title: 'الفراغ اللي ما أحد يغطّيه.',
      body1: 'منطقة الشرق الأوسط وشمال إفريقيا عندها قوة شرائية عالية، لكن أدوات الأعمال المبنية للـAI شبه معدومة. أغلب "شركات الـAI" تستهدف السوق الإنجليزي — شفنا الفراغ وسكّيناه.',
      body2: 'كل منتج ثنائي اللغة. كل صفحة تدعم RTL. كل سعر يراعي ديناميكيات السوق الخليجي. هذا مو ترجمة — هذا توطين من اليوم الأول.',
    },
    cta: {
      eyebrow: 'شفافية كاملة',
      title: 'تابع العدّاد، مو الكلام.',
      body: 'كل قرار يتخذه Potts يُسجّل. كل خلل، إصلاح، وتحول موثّق. اللوحة تتحدّث مباشرة من بوابة الدفع. لو غلطنا بأي شي، تشوفه قبل ما تشتري.',
      btn: 'تصفّح المتجر ←',
      alt: 'شوف اللوحة المباشرة',
    },
  },
};

export default function AboutPage() {
  const { lang, rtl } = useLang();
  const c = COPY[lang];

  return (
    <main dir={rtl ? 'rtl' : 'ltr'} className="min-h-screen bg-[#0a0a0a] text-white">
      <SiteNav />

      {/* Hero */}
      <section className="min-h-[80vh] flex items-center justify-center px-6 pt-28 pb-20 relative overflow-hidden">
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
            <span className="block">{c.heroLine1}</span>
            <span className="block italic text-[#c4a35a] font-normal mt-2">{c.heroAccent}</span>
          </h1>
          <p className="text-[17px] text-neutral-400 leading-relaxed max-w-2xl mx-auto">{c.heroSub}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>

      {/* Builders */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c4a35a] mb-5 block">
              {c.buildersEyebrow}
            </span>
            <h2
              style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
              className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-white"
            >
              {c.buildersTitle}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {c.builders.map((b, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05]"
              >
                <div className="w-20 h-20 rounded-full border border-[#c4a35a]/40 bg-[#c4a35a]/[0.05] flex items-center justify-center mb-5">
                  <span
                    style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
                    className="text-2xl font-semibold text-[#c4a35a] italic"
                  >
                    {b.name[0]}
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#c4a35a] mb-2">
                  {b.role}
                </span>
                <div
                  style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
                  className="text-2xl font-semibold text-white mb-1"
                >
                  {b.name}
                </div>
                <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500 mb-5">
                  {b.who}
                </div>
                <p className="text-[14px] text-neutral-400 leading-relaxed">{b.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>

      {/* Numbers */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c4a35a] mb-5 block">
              {c.numbersEyebrow}
            </span>
            <h2
              style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
              className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-white"
            >
              {c.numbersTitle}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {c.numbers.map((n, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div
                  style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
                  className="text-4xl md:text-5xl font-semibold text-[#c4a35a] tabular-nums"
                >
                  {n.v}
                </div>
                <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-500 mt-3">
                  {n.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>

      {/* What we build */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c4a35a] mb-5 block">
              {c.buildEyebrow}
            </span>
            <h2
              style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
              className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-white"
            >
              {c.buildTitle}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {c.build.map((p, i) => (
              <Link
                key={i}
                href="/store"
                className="group flex flex-col p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-[#c4a35a]/40 hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-baseline justify-between mb-5">
                  <h3
                    style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
                    className="text-2xl md:text-3xl font-semibold text-white"
                  >
                    {p.name}
                  </h3>
                  <span
                    style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
                    className="text-3xl text-[#c4a35a] tabular-nums"
                  >
                    {p.price}
                  </span>
                </div>
                <p className="text-[14px] text-neutral-400 leading-relaxed flex-1">{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>

      {/* MENA */}
      <section className="py-32 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c4a35a] mb-5 block">
              {c.mena.eyebrow}
            </span>
            <h2
              style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
              className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-white"
            >
              {c.mena.title}
            </h2>
          </div>
          <div className="space-y-6 text-[16px] md:text-[17px] text-neutral-300 leading-[1.75]">
            <p>{c.mena.body1}</p>
            <p>{c.mena.body2}</p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c4a35a] mb-5 block">
            {c.cta.eyebrow}
          </span>
          <h2
            style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
            className="text-3xl md:text-5xl font-semibold text-white mb-6 leading-tight"
          >
            {c.cta.title}
          </h2>
          <p className="text-neutral-400 leading-relaxed mb-10">{c.cta.body}</p>
          <div className="flex items-center justify-center gap-5 flex-wrap">
            <Link
              href="/store"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold bg-[#c4a35a] text-[#0a0a0a] rounded-full hover:bg-[#d4b46a] transition-colors shadow-[0_0_60px_-15px_#c4a35a88]"
            >
              {c.cta.btn}
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-5 py-4 text-sm text-neutral-400 hover:text-white transition-colors"
            >
              {c.cta.alt} →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
