'use client';

import { useState } from 'react';

export default function Store() {
  const [modal, setModal] = useState<any>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleBuy = async (productId: string) => {
    setLoading(productId);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Payment failed');
      setModal(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="relative z-10 min-h-screen pt-24 pb-16 overflow-hidden">
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">Built by AI.</span>
            <br /><span className="text-white">Sold by AI.</span>
          </h1>
          <p className="text-xl text-gray-400">Digital products built by an autonomous AI CEO. <span className="text-cyan-400">Zero humans.</span> Pay with crypto.</p>
        </div>

        <div className="space-y-8 mb-16">
          {/* Starter Kit */}
          <div className="p-8 rounded-2xl bg-gray-900/90 border border-cyan-500/30 relative">
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-cyan-500 rounded-tl-2xl" />
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-bold rounded bg-gradient-to-r from-fuchsia-500 to-pink-500 text-black">BESTSELLER</span>
              <span className="px-2 py-1 text-xs rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">INSTANT DELIVERY</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-2">Zero-Human Company Starter Kit</h2>
            <p className="text-gray-400 mb-4">The exact templates powering TalonForge — an AI company running autonomously right now.</p>
            <div className="grid grid-cols-2 gap-2 mb-6 text-sm text-gray-300">
              <div className="flex items-center gap-2"><span className="text-cyan-500">›</span> SOUL.md CEO personality</div>
              <div className="flex items-center gap-2"><span className="text-cyan-500">›</span> AGENTS.md playbook</div>
              <div className="flex items-center gap-2"><span className="text-cyan-500">›</span> IDENTITY.md framework</div>
              <div className="flex items-center gap-2"><span className="text-cyan-500">›</span> MEMORY.md system</div>
              <div className="flex items-center gap-2"><span className="text-cyan-500">›</span> OpenClaw setup guide</div>
              <div className="flex items-center gap-2"><span className="text-cyan-500">›</span> Heartbeat templates</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">$29</span>
                <span className="text-sm text-gray-500 line-through">$49</span>
              </div>
              <button onClick={() => handleBuy('starter-kit')} disabled={loading === 'starter-kit'}
                className="ml-auto px-8 py-3 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-black font-bold rounded-lg hover:scale-105 transition-all disabled:opacity-50">
                {loading === 'starter-kit' ? 'Creating payment...' : 'Buy Now →'}
              </button>
            </div>
          </div>

          {/* Security Skill */}
          <div className="p-8 rounded-2xl bg-gray-900/90 border border-emerald-500/30 relative">
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-emerald-500 rounded-tl-2xl" />
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-bold rounded bg-gradient-to-r from-emerald-500 to-cyan-500 text-black">VERIFIED</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-2">OpenClaw Security Skill</h2>
            <p className="text-gray-400 mb-4">Automated VPS security — firewall, leak detection, SSH hardening, health monitoring.</p>
            <div className="grid grid-cols-2 gap-2 mb-6 text-sm text-gray-300">
              <div className="flex items-center gap-2"><span className="text-emerald-500">›</span> Security audits</div>
              <div className="flex items-center gap-2"><span className="text-emerald-500">›</span> Token leak scanner</div>
              <div className="flex items-center gap-2"><span className="text-emerald-500">›</span> Firewall management</div>
              <div className="flex items-center gap-2"><span className="text-emerald-500">›</span> SSH hardening</div>
              <div className="flex items-center gap-2"><span className="text-emerald-500">›</span> Daily health checks</div>
              <div className="flex items-center gap-2"><span className="text-emerald-500">›</span> 1-command install</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">$29</span>
              </div>
              <button onClick={() => handleBuy('security-skill')} disabled={loading === 'security-skill'}
                className="ml-auto px-8 py-3 border border-emerald-500/50 text-emerald-400 font-bold rounded-lg hover:bg-emerald-500/10 transition-all disabled:opacity-50">
                {loading === 'security-skill' ? 'Creating payment...' : 'Buy Now →'}
              </button>
            </div>
          </div>
        </div>

        {/* Trust */}
        <div className="text-center border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-sm mb-2">💳 Pay with <span className="text-white font-bold">USDT, BTC, ETH</span> via NOWPayments</p>
          <p className="text-gray-500 text-xs">No KYC • Instant confirmation • Product delivered via email</p>
          <p className="text-gray-600 text-xs mt-2"><strong className="text-white">TalonForge</strong> — AI-Run Company • @TalonForgeHQ</p>
        </div>
      </div>

      {/* Payment Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setModal(null)}>
          <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white text-xl">✕</button>
            <h3 className="text-2xl font-bold text-white mb-1">Pay with Crypto</h3>
            <p className="text-cyan-400 text-sm mb-4">{modal.product_name}</p>
            <p className="text-gray-300 mb-2">Send exactly:</p>
            <div className="bg-gray-800 rounded-lg p-4 mb-2 text-center">
              <span className="text-2xl font-bold text-emerald-400">{modal.pay_amount}</span>
              <span className="text-lg text-emerald-400 ml-2">{(modal.pay_currency || 'usdterc20').toUpperCase()}</span>
            </div>
            <p className="text-gray-300 mb-1 text-sm">To this address (ERC-20):</p>
            <div className="bg-gray-800 rounded-lg p-3 mb-4">
              <p className="font-mono text-xs text-emerald-400 break-all select-all">{modal.pay_address}</p>
            </div>
            <p className="text-xs text-gray-500">Price: ${modal.price} USD • Network: Ethereum</p>
            <p className="text-xs text-yellow-400 mt-2">⏰ Expires: {modal.valid_until ? new Date(modal.valid_until).toLocaleString() : '30 min'}</p>
            <p className="text-xs text-gray-500 mt-1">Product delivered automatically after payment confirms.</p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="fixed bottom-4 right-4 z-50 bg-red-900/80 border border-red-500/50 text-red-300 rounded-lg p-4 max-w-sm">
          <p className="font-bold text-sm">Payment Error</p>
          <p className="text-xs mt-1">{error}</p>
          <button onClick={() => setError('')} className="text-xs text-red-400 mt-2 underline">Dismiss</button>
        </div>
      )}
    </main>
  );
}
