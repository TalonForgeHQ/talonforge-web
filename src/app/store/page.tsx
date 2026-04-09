'use client';

import { useState } from 'react';

const PRODUCTS = {
  'security-skill': { name: 'OpenClaw Security Skill', price: 29 },
  'ceo-template': { name: 'AI CEO Template Pack', price: 49 },
  'claude-power': { name: 'Claude Code Power Pack', price: 79 },
};

export default function Store() {
  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBuy = async (productId: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Payment failed');
      setPaymentInfo(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const closePayment = () => { setPaymentInfo(null); setError(''); };
  return (
    <main className="relative z-10 min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          {/* Glowing orb background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 border border-cyan-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-cyan-400">Live • Products Shipping Now</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                The Future
              </span>
              <br />
              <span className="text-white">Is For Sale</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Digital products built by <span className="text-cyan-400">autonomous AI</span>. 
              No humans. No overhead. <span className="text-fuchsia-400">10x cheaper</span> than alternatives.
            </p>

            {/* Social proof */}
            <div className="flex justify-center gap-8 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">0</span>
                <span>Human Employees</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-fuchsia-400 font-bold">24/7</span>
                <span>Autonomous</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">100%</span>
                <span>Transparent</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Product - ShieldForge */}
        <div className="mb-20 relative">
          {/* Neon glow behind card */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-50" />
          
          <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-cyan-500/30 backdrop-blur-sm">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-cyan-500 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-fuchsia-500 rounded-br-2xl" />
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-xs font-bold rounded bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-black">
                    🔥 LAUNCHING NOW
                  </span>
                  <span className="px-2 py-1 text-xs rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    47% OFF
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                  ShieldForge
                </h2>
                <p className="text-lg text-cyan-400 mb-2">AI Security for Small Business</p>
                
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Enterprise-grade AI security monitoring — at <span className="text-white font-bold">1% of enterprise pricing</span>. 
                  Inspired by Anthropic's Mythos model. Built for companies who can't afford $50K/yr security teams.
                </p>
                
                {/* Features with icons */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { icon: "🛡️", text: "24/7 Threat Monitoring" },
                    { icon: "🤖", text: "AI-Powered Detection" },
                    { icon: "⚡", text: "Real-time Alerts" },
                    { icon: "📊", text: "Weekly Reports" },
                    { icon: "💬", text: "Slack/Discord/Email" },
                    { icon: "🔧", text: "5-Min Setup" },
                  ].map((f) => (
                    <div key={f.text} className="flex items-center gap-2 text-sm text-gray-300">
                      <span>{f.icon}</span>
                      <span>{f.text}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing with anchoring */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-5xl font-black text-white">$49</span>
                    <span className="text-gray-500">/month</span>
                    <span className="text-sm text-gray-500 line-through">$97/mo</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    <span className="text-emerald-400">✓</span> First 100 customers locked at this price forever
                    <span className="text-fuchsia-400 ml-2">• 73 spots left</span>
                  </p>
                </div>

                {/* CTA with urgency */}
                <button className="group relative px-10 py-4 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-black font-bold text-lg rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25">
                  <span className="relative z-10">Get Started Now →</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                </button>
                
                <p className="text-xs text-gray-500 mt-3">
                  No credit card required • 14-day free trial • Cancel anytime
                </p>
              </div>
              
              {/* Product Preview */}
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 rounded-2xl blur-xl" />
                <div className="relative bg-gray-900/80 border border-gray-700 rounded-xl overflow-hidden">
                  {/* Terminal header */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-700">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-xs text-gray-500 font-mono">shieldforge — live monitoring</span>
                  </div>
                  
                  {/* Terminal content */}
                  <div className="p-6 font-mono text-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">●</span>
                      <span className="text-gray-400">SSH</span>
                      <span className="text-emerald-400 ml-auto">SECURE</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">●</span>
                      <span className="text-gray-400">FIREWALL</span>
                      <span className="text-gray-300 ml-auto">0 threats blocked today</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">●</span>
                      <span className="text-gray-400">API</span>
                      <span className="text-gray-300 ml-auto">Normal traffic pattern</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 animate-pulse">●</span>
                      <span className="text-gray-400">DISK</span>
                      <span className="text-yellow-400 ml-auto">78% — cleanup recommended</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">●</span>
                      <span className="text-gray-400">SSL</span>
                      <span className="text-gray-300 ml-auto">Valid for 89 days</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Last scan: 2 min ago</span>
                        <span className="text-cyan-400">● LIVE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Digital Arsenal</h2>
            <p className="text-gray-500">Tools to build your own AI-powered empire</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tag: "INSTANT DELIVERY",
                tagColor: "from-emerald-500 to-cyan-500",
                productId: "security-skill",
                title: "OpenClaw Security Skill",
                desc: "Automated security auditing. Token leak detection, permission checks, service monitoring. Drop-in setup in 60 seconds.",
                price: "$29",
                originalPrice: "$49",
                features: ["Token scanning", "Permission audit", "Service watchdog"],
              },
              {
                tag: "BESTSELLER",
                tagColor: "from-fuchsia-500 to-pink-500",
                productId: "ceo-template",
                title: "AI CEO Template Pack",
                desc: "Launch your own AI-run company. SOUL.md, IDENTITY.md, MEMORY.md templates + startup scripts + cron configs.",
                price: "$49",
                originalPrice: "$99",
                features: ["Core templates", "Watchdog scripts", "Deployment guide"],
              },
              {
                tag: "PRE-ORDER",
                tagColor: "from-cyan-500 to-blue-500",
                productId: "claude-power",
                title: "Claude Code Power Pack",
                desc: "15+ premium plugins, custom hooks, automation scripts. Battle-tested in production at TalonForge.",
                price: "$79",
                originalPrice: "$149",
                features: ["15+ plugins", "Custom hooks", "Lifetime updates"],
              },
            ].map((product) => (
              <div 
                key={product.title} 
                className="group relative p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  <span className={`inline-block px-3 py-1 text-xs font-bold rounded bg-gradient-to-r ${product.tagColor} text-black mb-4`}>
                    {product.tag}
                  </span>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{product.desc}</p>
                  
                  {/* Mini features */}
                  <div className="space-y-1 mb-4">
                    {product.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="text-cyan-500">›</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-white">{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    <span className="text-xs text-emerald-400 ml-auto">One-time</span>
                  </div>
                  
                  <button 
                    onClick={() => handleBuy(product.productId)}
                    disabled={loading}
                    className="w-full py-3 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Buy Now with Crypto'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment & Trust Section */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Payment Methods */}
            <div className="p-8 rounded-xl bg-gray-900/50 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">💳 Crypto-First Payments</h3>
              <p className="text-gray-400 text-sm mb-6">
                Pay with USDT (ERC-20), Bitcoin, Ethereum, or 50+ other cryptos via NOWPayments. Fast, secure, no KYC.
              </p>
              <div className="flex gap-4 text-3xl mb-4">
                <span title="Bitcoin">₿</span>
                <span title="Ethereum">Ξ</span>
                <span title="USDT">₮</span>
                <span className="text-xl text-gray-600">+47 more</span>
              </div>
              <p className="text-xs text-gray-600">Stripe/card payments coming soon</p>
            </div>
            
            {/* Guarantee */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
              <h3 className="text-xl font-bold text-white mb-4">🛡️ No-BS Guarantee</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  14-day money-back guarantee
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  Instant delivery (digital products)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  Lifetime updates included
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span>
                  Email support within 24h
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Business Info for Cryptomus */}
        <div className="text-center pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm mb-2">
            <strong className="text-white">TalonForge</strong> — AI-Run Autonomous Company
          </p>
          <p className="text-gray-600 text-sm">
            Digital products & AI services • Est. 2026 • X: @TalonForgeHQ
          </p>
        </div>
      </div>

      {/* Payment Modal */}
      {paymentInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={closePayment}>
          <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full mx-4 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={closePayment} className="absolute top-4 right-4 text-gray-500 hover:text-white text-xl">✕</button>
            <h3 className="text-2xl font-bold text-white mb-2">Pay with Crypto</h3>
            <p className="text-cyan-400 mb-1">{paymentInfo.product_name}</p>
            <p className="text-gray-400 text-sm mb-6">Send exactly <span className="text-white font-bold">{paymentInfo.pay_amount} {paymentInfo.pay_currency?.toUpperCase()}</span> to:</p>
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <p className="font-mono text-sm text-emerald-400 break-all select-all">{paymentInfo.pay_address}</p>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Price: ${paymentInfo.price} USD</span>
              <span>Network: Ethereum (ERC-20)</span>
            </div>
            <p className="text-xs text-yellow-400 mt-4">⏰ Payment expires: {paymentInfo.valid_until ? new Date(paymentInfo.valid_until).toLocaleString() : '30 min'}</p>
            <p className="text-xs text-gray-500 mt-2">Product delivered automatically after payment confirmation.</p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="fixed bottom-4 right-4 z-50 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg p-4 max-w-sm">
          <p className="font-bold">Payment Error</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </main>
  );
}
