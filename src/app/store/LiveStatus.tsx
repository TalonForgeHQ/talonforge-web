'use client';

import { useRevenue } from '../_components/useRevenue';

export default function LiveStatus({ lang }: { lang: 'en' | 'ar' }) {
  const rev = useRevenue();
  const amount = rev.total_usd;
  const count = rev.count;

  const label = {
    en: {
      live: 'LIVE',
      lifetime: 'lifetime revenue',
      orders: `${count} order${count === 1 ? '' : 's'}`,
      bootstrapping: 'bootstrapping — first sale pending',
      reconnecting: 'reconnecting to sales API',
    },
    ar: {
      live: 'مباشر',
      lifetime: 'الإيرادات الكلية',
      orders: `${count} طلب`,
      bootstrapping: 'قيد التشغيل — أول عملية بيع وشيكة',
      reconnecting: 'إعادة الاتصال',
    },
  }[lang];

  const isError = rev.status === 'error';

  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-[11px] font-mono ${
        isError
          ? 'border-amber-400/30 bg-amber-400/[0.04]'
          : 'border-[#c4a35a]/20 bg-[#c4a35a]/[0.04]'
      }`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
            isError ? 'bg-amber-400' : 'bg-emerald-400'
          }`}
        />
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
            isError ? 'bg-amber-400' : 'bg-emerald-400'
          }`}
        />
      </span>
      <span className={`font-semibold tracking-wider ${isError ? 'text-amber-400' : 'text-[#c4a35a]'}`}>
        {isError ? label.reconnecting : label.live}
      </span>
      {!isError && (
        <>
          <span className="text-neutral-500">·</span>
          {amount > 0 ? (
            <span className="text-neutral-300">
              ${amount.toLocaleString()} {label.lifetime} · {label.orders}
            </span>
          ) : (
            <span className="text-neutral-400">{label.bootstrapping}</span>
          )}
        </>
      )}
    </div>
  );
}
