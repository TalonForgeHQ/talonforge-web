'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ThanksContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order');
  const paymentId = searchParams.get('payment');
  const [downloads, setDownloads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [productName, setProductName] = useState('');

  useEffect(() => {
    if (!orderId || !paymentId) {
      setError('Missing order information. Please return to the store and try again.');
      setLoading(false);
      return;
    }

    fetch(`/api/deliver?order=${orderId}&payment=${paymentId}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error === 'Payment not confirmed' 
            ? 'Payment is still being confirmed. Please refresh in a minute.' 
            : data.error);
        } else {
          setDownloads(data.downloads || []);
          setProductName(data.product || '');
        }
      })
      .catch(() => setError('Failed to verify payment'))
      .finally(() => setLoading(false));
  }, [orderId, paymentId]);

  return (
    <main className="relative z-10 min-h-screen pt-24 pb-16 bg-[#0a0a0a]">
      {/* gold glow backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[radial-gradient(ellipse,#c4a35a33_0%,transparent_70%)]"></div>
      </div>
      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-400/[0.05] px-3.5 py-1.5 text-[11px] font-mono mb-8">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          </span>
          <span className="text-emerald-400 font-semibold tracking-wider">CONFIRMED</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }} className="text-4xl md:text-5xl font-semibold text-white mb-3 tracking-tight">
          Welcome to TalonForge.
        </h1>
        <p className="text-neutral-400 mb-10">
          {productName ? `Your ${productName} is ready below.` : 'Your files are ready below.'}
        </p>

        {loading && (
          <div className="text-neutral-500 animate-pulse mb-8">Verifying payment · preparing downloads...</div>
        )}

        {error && (
          <div className="p-6 rounded-xl bg-white/[0.02] border border-amber-500/30 mb-8">
            <p className="text-amber-400 mb-2">⏳ {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-sm text-[#c4a35a] underline hover:text-[#d4b46a]"
            >Refresh page</button>
          </div>
        )}

        {downloads.length > 0 && (
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#c4a35a]/[0.06] to-transparent border border-[#c4a35a]/30 mb-8 shadow-[0_0_80px_-20px_#c4a35a33]">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#c4a35a]">▼</span>
              <h2 className="text-sm font-semibold text-[#c4a35a] tracking-widest uppercase">Your Files</h2>
            </div>
            <div className="space-y-2">
              {downloads.map((dl: any) => (
                <a
                  key={dl.file}
                  href={dl.url}
                  className="block p-4 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-[#c4a35a]/30 transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-mono text-sm">{dl.file}</span>
                    <span className="text-[#c4a35a] group-hover:translate-x-1 transition-transform">↓</span>
                  </div>
                  <span className="text-neutral-600 text-xs block mt-1">Link valid 24h</span>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-8 text-left">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-neutral-500 mb-4">What&apos;s next</h2>
          <ul className="text-neutral-300 text-sm space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[#c4a35a] font-mono mt-0.5">01</span>
              <span>Download your files above (links expire in 24h — save them locally)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c4a35a] font-mono mt-0.5">02</span>
              <span>For the Kit: drop into OpenClaw, say &quot;Run the Zero-Human Company Kit setup&quot;</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c4a35a] font-mono mt-0.5">03</span>
              <span>For the Blueprint: follow the step-by-step guide front to back</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c4a35a] font-mono mt-0.5">04</span>
              <span>Need a hand? DM <a href="https://x.com/TalonForgeHQ" className="text-[#c4a35a] hover:text-[#d4b46a] underline">@TalonForgeHQ</a> on X or <a href="https://t.me/TalonForgeHQ" className="text-[#c4a35a] hover:text-[#d4b46a] underline">t.me/TalonForgeHQ</a></span>
            </li>
          </ul>
        </div>

        <a href="/store" className="text-sm text-neutral-600 hover:text-[#c4a35a] transition-colors">
          ← back to store
        </a>
      </div>
    </main>
  );
}

export default function Thanks() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>}>
      <ThanksContent />
    </Suspense>
  );
}
