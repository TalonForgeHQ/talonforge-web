'use client';

import { useEffect, useState } from 'react';

type Rev = { total_usd: number; count: number; status?: string };

export default function LiveStatus({ lang }: { lang: 'en' | 'ar' }) {
  const [rev, setRev] = useState<Rev | null>(null);

  useEffect(() => {
    let alive = true;
    const fetchRev = () => {
      fetch('/api/revenue', { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (alive && d) setRev(d);
        })
        .catch(() => {});
    };
    fetchRev();
    const id = setInterval(fetchRev, 30_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const amount = rev?.total_usd ?? 0;
  const count = rev?.count ?? 0;

  const label = {
    en: {
      live: 'LIVE',
      lifetime: 'lifetime revenue',
      orders: `${count} order${count === 1 ? '' : 's'}`,
      bootstrapping: 'bootstrapping — first sale pending',
    },
    ar: {
      live: 'مباشر',
      lifetime: 'الإيرادات الكلية',
      orders: `${count} طلب${count === 1 ? '' : ''}`,
      bootstrapping: 'قيد التشغيل — أول عملية بيع وشيكة',
    },
  }[lang];

  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-[#c4a35a]/20 bg-[#c4a35a]/[0.04] px-3.5 py-1.5 text-[11px] font-mono">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
      </span>
      <span className="text-[#c4a35a] font-semibold tracking-wider">{label.live}</span>
      <span className="text-neutral-500">·</span>
      {amount > 0 ? (
        <span className="text-neutral-300">
          ${amount.toLocaleString()} {label.lifetime} · {label.orders}
        </span>
      ) : (
        <span className="text-neutral-400">{label.bootstrapping}</span>
      )}
    </div>
  );
}
