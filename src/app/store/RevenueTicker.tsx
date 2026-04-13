'use client';

import { useEffect, useState } from 'react';

type RevenueData = {
  total_usd: number;
  count: number;
  since: string;
  last_updated: string;
  status: 'ok' | 'stale' | 'unconfigured';
  note?: string;
};

const COPY = {
  en: {
    prefix: 'Live:',
    earned: 'earned',
    paymentsSuffix: (n: number) => `${n} ${n === 1 ? 'payment' : 'payments'} confirmed`,
    sinceLabel: (d: string) => `since ${d}`,
    zeroState: 'First sale incoming',
    bootingState: 'Revenue feed warming up',
  },
  ar: {
    prefix: 'مباشر:',
    earned: 'أرباح مؤكدة',
    paymentsSuffix: (n: number) => `${n} ${n === 1 ? 'عملية دفع مؤكدة' : 'عمليات دفع مؤكدة'}`,
    sinceLabel: (d: string) => `منذ ${d}`,
    zeroState: 'أول عملية بيع قادمة',
    bootingState: 'البث المباشر للإيرادات قيد التشغيل',
  },
};

function fmtUSD(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 10_000) return `$${(n / 1_000).toFixed(1)}K`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(2)}K`;
  return `$${n.toFixed(2)}`;
}

export default function RevenueTicker({ lang }: { lang: 'en' | 'ar' }) {
  const [data, setData] = useState<RevenueData | null>(null);
  const t = COPY[lang];

  useEffect(() => {
    let active = true;
    const tick = () => {
      fetch('/api/revenue', { cache: 'no-store' })
        .then((r) => r.json())
        .then((d: RevenueData) => {
          if (active) setData(d);
        })
        .catch(() => {
          /* swallow — keep previous value or null */
        });
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  if (!data) return null;

  const zero = data.count === 0;
  const msg = data.status === 'unconfigured'
    ? t.bootingState
    : zero
      ? t.zeroState
      : `${fmtUSD(data.total_usd)} ${t.earned} · ${t.paymentsSuffix(data.count)}`;

  return (
    <div
      className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ember/30 bg-ember/5 text-xs text-gray-300"
      aria-live="polite"
      aria-label={msg}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-ember" />
      </span>
      <span className="text-ember font-medium">{t.prefix}</span>
      <span>{msg}</span>
      <span className="text-gray-600">· {t.sinceLabel(data.since)}</span>
    </div>
  );
}
