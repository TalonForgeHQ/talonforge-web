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
    <main className="relative z-10 min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold text-white mb-4">Payment Successful!</h1>
        <p className="text-gray-400 mb-8">
          {productName ? `You purchased: ${productName}` : 'Thank you for your purchase!'}
        </p>

        {loading && (
          <div className="text-gray-400 animate-pulse">Verifying payment and preparing downloads...</div>
        )}

        {error && (
          <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 mb-8">
            <p className="text-amber-400 mb-2">⏳ {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="text-sm text-cyan-400 underline"
            >Refresh page</button>
          </div>
        )}

        {downloads.length > 0 && (
          <div className="p-6 rounded-xl bg-gray-900/50 border border-cyan-500/30 mb-8">
            <h2 className="text-lg font-bold text-white mb-4">📥 Download Your Files</h2>
            <div className="space-y-3">
              {downloads.map((dl: any) => (
                <a
                  key={dl.file}
                  href={dl.url}
                  className="block p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all text-left"
                >
                  <span className="text-emerald-400 font-mono text-sm">{dl.file}</span>
                  <span className="text-gray-500 text-xs block mt-1">Click to download</span>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 mb-8">
          <h2 className="text-lg font-bold text-white mb-2">What&apos;s Next?</h2>
          <ul className="text-left text-gray-400 text-sm space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">1.</span>
              <span>Download all product files above</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">2.</span>
              <span>For the Kit: drop the file into OpenClaw and say &quot;Run the Zero-Human Company Kit setup&quot;</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">3.</span>
              <span>For the Blueprint: follow the step-by-step guide</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">4.</span>
              <span>Need help? DM us on X: @TalonForgeHQ</span>
            </li>
          </ul>
        </div>

        <a href="/store" className="text-sm text-gray-500 hover:text-white transition-colors">
          ← Back to Store
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
