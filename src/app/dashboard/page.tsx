'use client';

import { useEffect, useState } from 'react';
import SiteNav from '../_components/SiteNav';
import SiteFooter from '../_components/SiteFooter';
import { useLang } from '../_components/LangContext';
import { useAnimatedNumber } from '../_components/useAnimatedNumber';
import { useRevenue } from '../_components/useRevenue';

type Commit = {
  sha: string;
  message: string;
  author: string;
  date: string;
  repo: string;
  url: string;
};
type Activity = {
  runtime?: { time?: string; model?: string; provider?: string };
  today?: string;
  workQueue?: string;
  xActivity?: string;
  commits?: Commit[];
};

const COPY = {
  en: {
    eyebrow: 'LIVE · PUBLIC · UNFILTERED',
    heroTitle: 'The revenue counter',
    heroTitleAccent: 'no AI company shows.',
    heroSub: 'Every dollar TalonForge has earned since day 0 — shown honestly, including the zeros. This page updates on every page-load from NowPayments. There is no dashboard behind this dashboard.',
    lifetime: 'Lifetime revenue',
    target: 'Target',
    ordersLabel: 'Orders settled',
    firstSalePending: 'First sale pending.',
    started: 'Started',
    streamsTitle: 'Where it comes from.',
    streamsSub: 'Each stream is a separate revenue engine. We publish them even when they read zero, because that is the point of building in public.',
    streams: [
      { name: 'The Blueprint', price: '$29', desc: 'EN + AR playbook. Entry product.', status: 'LIVE' },
      { name: 'The Kit', price: '$97', desc: 'Flagship. OpenClaw skill file.', status: 'LIVE' },
      { name: 'The Starter Pack', price: '$9', desc: 'Low-friction entry SKU.', status: 'LIVE' },
      { name: 'Skills Marketplace', price: '—', desc: 'Per-skill licensing. Coming.', status: 'SOON' },
      { name: 'AI Agency', price: '—', desc: 'Retainer clients. Phase 2.', status: 'LATER' },
    ],
    activityEyebrow: 'LIVE CONSOLE',
    activityTitle: 'What the AI is doing right now.',
    activitySub: 'Streaming from the CTO\'s daily log on the VPS. Last actions, last commits, last decisions.',
    activityEmpty: 'Idle.',
    activityRuntime: 'Runtime',
    timelineTitle: 'The path to $1M.',
    timelineSub: 'Every milestone gets a timestamp when it lands. No projections.',
    timeline: [
      { m: 'First sale', d: 'Not yet. The counter waits.', done: false },
      { m: '$100', d: 'Proof the funnel moves.', done: false },
      { m: '$1,000', d: 'First month paid for.', done: false },
      { m: '$10,000', d: 'A repeatable channel.', done: false },
      { m: '$100,000', d: 'AI-run business, proven.', done: false },
      { m: '$1,000,000', d: 'The thesis, closed.', done: false },
    ],
    noteTitle: 'How to read this page.',
    noteBody: 'The number above is pulled live from NowPayments — our crypto gateway. Orders marked finished, confirmed, partially_paid, and sending count. If the number is zero, nobody has bought yet. That is fine. The point is you can watch it move.',
    pageFooter: 'The dashboard updates every request. No cache tricks.',
  },
  ar: {
    eyebrow: 'مباشر · علني · بدون فلاتر',
    heroTitle: 'عدّاد الإيرادات',
    heroTitleAccent: 'اللي ما تبيّنه شركة AI.',
    heroSub: 'كل دولار شاف تالون فورج من اليوم الأول — يتعرض بأمانة، بما فيه الأصفار. الصفحة هذي تتحدّث لحظة تفتحها من NowPayments. ما في لوحة تاني وراء اللوحة.',
    lifetime: 'الإيرادات الكلية',
    target: 'الهدف',
    ordersLabel: 'طلبات مؤكدة',
    firstSalePending: 'أول بيعة لسّا.',
    started: 'البدء',
    streamsTitle: 'من وين تجي.',
    streamsSub: 'كل قناة محرّك دخل مستقل. ننشرها حتى لو كلها أصفار، لأن هذا أساس البناء العلني.',
    streams: [
      { name: 'المخطط (Blueprint)', price: '$29', desc: 'دليل عربي + إنجليزي. منتج البداية.', status: 'مباشر' },
      { name: 'المجموعة (Kit)', price: '$97', desc: 'المنتج الأساسي. ملف مهارة OpenClaw.', status: 'مباشر' },
      { name: 'باقة المبتدئ', price: '$9', desc: 'منتج منخفض الاحتكاك.', status: 'مباشر' },
      { name: 'سوق المهارات', price: '—', desc: 'ترخيص حسب المهارة. قريباً.', status: 'قريباً' },
      { name: 'وكالة AI', price: '—', desc: 'عملاء شهريون. المرحلة ٢.', status: 'لاحقاً' },
    ],
    activityEyebrow: 'وحدة الإخراج المباشر',
    activityTitle: 'شو يسوّي الـAI الحين.',
    activitySub: 'يبث من سجل CTO اليومي على الخادم. آخر الإجراءات، آخر الكوميتات، آخر القرارات.',
    activityEmpty: 'خامل.',
    activityRuntime: 'وقت التشغيل',
    timelineTitle: 'الطريق إلى مليون.',
    timelineSub: 'كل محطة تحصل ختم زمني لمّا توصلها. بدون توقعات.',
    timeline: [
      { m: 'أول بيعة', d: 'لم تحدث بعد. العدّاد ينتظر.', done: false },
      { m: '$100', d: 'دليل أن القمع يتحرك.', done: false },
      { m: '$1,000', d: 'أول شهر مدفوع.', done: false },
      { m: '$10,000', d: 'قناة قابلة للتكرار.', done: false },
      { m: '$100,000', d: 'شركة AI مثبّتة.', done: false },
      { m: '$1,000,000', d: 'الفكرة، مقفلة.', done: false },
    ],
    noteTitle: 'كيف تقرأ الصفحة.',
    noteBody: 'الرقم فوق يُسحب مباشرةً من NowPayments — بوابة الكريبتو عندنا. تُحسب الطلبات بحالة finished و confirmed و partially_paid و sending. لو الرقم صفر يعني ما في مشتري بعد. طبيعي. الأهم إنك تتابعه يتحرّك.',
    pageFooter: 'اللوحة تتحدّث كل طلب. بدون كاش مغشوش.',
  },
};

const LAUNCH = '2026-04-12';

function formatUsd(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export default function Dashboard() {
  const { lang, rtl } = useLang();
  const c = COPY[lang];
  const rev = useRevenue();
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    let alive = true;
    const tick = () => {
      fetch('/api/activity', { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (alive && d) setActivity(d);
        })
        .catch((e) => {
          if (alive) console.error('[dashboard] activity fetch failed:', e);
        });
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const commits = activity?.commits ?? [];

  const animatedAmount = useAnimatedNumber(rev.total_usd, 1400);
  const animatedCount = useAnimatedNumber(rev.count, 1000);
  const pctToTarget = Math.min(100, (rev.total_usd / 1_000_000) * 100);
  const isError = rev.status === 'error';

  return (
    <main dir={rtl ? 'rtl' : 'ltr'} className="min-h-screen bg-[#0a0a0a] text-white">
      <SiteNav />

      {/* Hero: the one giant serif revenue number */}
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
            className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] leading-[1.05] text-white mb-10"
          >
            <span className="block">{c.heroTitle}</span>
            <span className="block italic text-[#c4a35a] font-normal mt-1">{c.heroTitleAccent}</span>
          </h1>

          {/* The big number */}
          <div className="mb-6">
            <div className="text-[11px] font-mono uppercase tracking-[0.28em] text-neutral-500 mb-4">
              {c.lifetime}
            </div>
            <div
              style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
              className={`text-7xl md:text-[10rem] font-semibold leading-none tabular-nums tracking-[-0.04em] ${
                isError ? 'text-amber-400/80' : 'text-[#c4a35a]'
              }`}
            >
              {isError ? '—' : formatUsd(Math.round(animatedAmount))}
            </div>
            {isError && (
              <div className="mt-3 text-[11px] font-mono uppercase tracking-[0.22em] text-amber-400/80">
                {lang === 'en' ? 'SALES API UNREACHABLE · RETRYING' : 'خدمة البيع غير متاحة · إعادة محاولة'}
              </div>
            )}
            <div className="mt-5 flex items-center justify-center gap-5 text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-500">
              <span>
                {Math.round(animatedCount)} {c.ordersLabel}
              </span>
              <span className="text-neutral-700">·</span>
              <span>
                {c.target}: {formatUsd(1_000_000)}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-8 max-w-lg mx-auto">
            <div className="h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#c4a35a] transition-all duration-1000"
                style={{ width: `${Math.max(0.2, pctToTarget)}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500">
              <span>
                {c.started} · {LAUNCH}
              </span>
              <span>{pctToTarget.toFixed(4)}%</span>
            </div>
          </div>

          {!isError && rev.total_usd === 0 && (
            <p className="mt-10 text-sm text-neutral-500 italic">
              {c.firstSalePending}
            </p>
          )}
        </div>
      </section>

      {/* Separator */}
      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>

      {/* Streams */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c4a35a] mb-5 block">
              {lang === 'en' ? 'REVENUE STREAMS' : 'قنوات الدخل'}
            </span>
            <h2
              style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
              className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-white mb-5"
            >
              {c.streamsTitle}
            </h2>
            <p className="text-neutral-400 leading-relaxed max-w-xl mx-auto">{c.streamsSub}</p>
          </div>

          <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {c.streams.map((s, i) => (
              <div key={i} className="py-6 flex items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span
                      style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
                      className="text-xl md:text-2xl font-semibold text-white"
                    >
                      {s.name}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                      {s.status}
                    </span>
                  </div>
                  <div className="text-[13px] text-neutral-500 mt-1">{s.desc}</div>
                </div>
                <div
                  style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
                  className="text-2xl md:text-3xl text-[#c4a35a] tabular-nums"
                >
                  {s.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>

      {/* Activity feed */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c4a35a] mb-5 block">
              {c.activityEyebrow}
            </span>
            <h2
              style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
              className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-white mb-5"
            >
              {c.activityTitle}
            </h2>
            <p className="text-neutral-400 leading-relaxed max-w-xl mx-auto">{c.activitySub}</p>
          </div>

          <div className="rounded-2xl bg-black/60 border border-white/[0.06] p-1">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.05]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-emerald-400/90">
                  {lang === 'en' ? 'STREAMING' : 'يبث'}
                </span>
              </div>
              <div className="text-[10px] font-mono text-neutral-500 truncate ms-4">
                {activity?.runtime?.model ?? '—'}
              </div>
            </div>
            <div
              dir="ltr"
              className="px-5 py-4 max-h-[460px] overflow-y-auto font-mono text-[12px] leading-relaxed"
            >
              {commits.length === 0 && (
                <div className="text-neutral-500 italic">{c.activityEmpty}</div>
              )}
              <ul className="space-y-2">
                {commits.map((cm) => {
                  const time = new Date(cm.date).toISOString().slice(11, 16);
                  return (
                    <li key={cm.sha} className="group">
                      <a
                        href={cm.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-baseline gap-3 px-2 py-1 rounded hover:bg-white/[0.03] transition-colors"
                      >
                        <span className="text-neutral-500 tabular-nums shrink-0">{time}</span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] px-1.5 py-0.5 rounded bg-[#c4a35a]/[0.08] text-[#c4a35a] border border-[#c4a35a]/20 shrink-0">
                          {cm.repo.replace('talonforge-', '').replace('talonforge', 'core').slice(0, 12)}
                        </span>
                        <span className="text-neutral-300 group-hover:text-white transition-colors truncate flex-1">
                          {cm.message}
                        </span>
                        <span className="text-neutral-700 tabular-nums shrink-0 hidden sm:inline">
                          {cm.sha}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>

      {/* Timeline */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c4a35a] mb-5 block">
              {lang === 'en' ? 'MILESTONES' : 'المحطات'}
            </span>
            <h2
              style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
              className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-white mb-5"
            >
              {c.timelineTitle}
            </h2>
            <p className="text-neutral-400 leading-relaxed max-w-xl mx-auto">{c.timelineSub}</p>
          </div>

          <ul className="space-y-6">
            {c.timeline.map((t, i) => (
              <li key={i} className="flex items-start gap-5 py-4 border-b border-white/[0.05]">
                <span
                  className={`mt-2 w-2 h-2 rounded-full shrink-0 ${
                    t.done ? 'bg-[#c4a35a]' : 'bg-white/15'
                  }`}
                />
                <div className="flex-1">
                  <div
                    style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
                    className="text-xl md:text-2xl font-semibold text-white tabular-nums"
                  >
                    {t.m}
                  </div>
                  <div className="text-[13px] text-neutral-500 mt-1">{t.d}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Separator */}
      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>

      {/* Note */}
      <section className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h3
            style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
            className="text-2xl md:text-3xl font-semibold text-white mb-6"
          >
            {c.noteTitle}
          </h3>
          <p className="text-neutral-400 leading-relaxed text-[15px]">{c.noteBody}</p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
