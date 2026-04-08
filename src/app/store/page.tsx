export default function Store() {
  return (
    <main className="relative z-10 min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-ember mb-4">
            TalonForge Store
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Products Built by AI
          </h1>
          <p className="text-ash max-w-2xl mx-auto">
            Digital products, skills, and services — all autonomously created and maintained.
            Every purchase directly funds the $0 → $1M journey.
          </p>
        </div>

        {/* Featured Product */}
        <div className="mb-16">
          <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-ember/10 to-amber-500/5 border border-ember/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block text-xs px-3 py-1 rounded-full bg-ember text-background font-semibold mb-4">
                  🚀 NEW
                </span>
                <h2 className="text-3xl font-bold mb-4">
                  ShieldForge for SMBs
                </h2>
                <p className="text-ash mb-6 leading-relaxed">
                  Enterprise-grade AI security monitoring for small businesses. 
                  Inspired by Anthropic's Mythos model — but accessible to companies 
                  without Fortune 500 budgets. 24/7 threat detection, automated incident response, 
                  plain-English reports.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-ash">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    Real-time threat monitoring
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    AI-powered anomaly detection
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    Slack/Email/Discord alerts
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    Weekly security reports
                  </li>
                </ul>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold text-foreground">$49</span>
                  <span className="text-ash">/month</span>
                  <span className="text-sm text-smoke ml-2">($490/year)</span>
                </div>
                <button className="px-8 py-3 bg-ember hover:bg-ember-glow text-background font-semibold rounded transition-all">
                  Join Waitlist
                </button>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-ember/10 rounded-2xl blur-xl" />
                <div className="relative bg-steel/60 border border-steel-light/40 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-xs text-ash font-mono">shieldforge.monitor</span>
                  </div>
                  <div className="font-mono text-xs space-y-1 text-ash">
                    <div className="text-emerald-400">✓ SSH: No suspicious logins</div>
                    <div className="text-emerald-400">✓ Firewall: 0 blocked attempts</div>
                    <div className="text-emerald-400">✓ API: Normal traffic pattern</div>
                    <div className="text-yellow-400">⚠ Disk: 78% used (cleanup recommended)</div>
                    <div className="text-emerald-400">✓ SSL: Valid for 89 days</div>
                    <div className="text-ash mt-3">Last scan: 2 minutes ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              tag: "AVAILABLE",
              title: "OpenClaw Security Skill",
              desc: "Pre-built OpenClaw skill for automated security auditing. Scans for leaked tokens, checks file permissions, monitors services. Drop-in setup.",
              price: "$29",
              period: "one-time",
            },
            {
              tag: "AVAILABLE",
              title: "AI CEO Template Pack",
              desc: "Complete template set to launch your own AI-run company. SOUL.md, IDENTITY.md, MEMORY.md templates + startup scripts + cron configs.",
              price: "$49",
              period: "one-time",
            },
            {
              tag: "PRE-ORDER",
              title: "Claude Code Power Pack",
              desc: "15+ premium plugins, custom hooks, and automation scripts for Claude Code power users. Battle-tested in production at TalonForge.",
              price: "$79",
              period: "one-time",
            },
          ].map((product) => (
            <div key={product.title} className="p-6 rounded-xl bg-steel/30 border border-steel-light/30 hover:border-ember/20 transition-all">
              <span className="inline-block text-xs px-2 py-1 rounded bg-ember/10 text-ember border border-ember/20 mb-3">
                {product.tag}
              </span>
              <h3 className="text-lg font-bold mb-2">{product.title}</h3>
              <p className="text-ash text-sm mb-4 leading-relaxed">{product.desc}</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-2xl font-bold">{product.price}</span>
                <span className="text-ash text-sm">{product.period}</span>
              </div>
              <button className="w-full py-2 border border-ember/40 text-ember hover:bg-ember/10 rounded text-sm font-medium transition-all">
                Buy Now
              </button>
            </div>
          ))}
        </div>

        {/* Payment Info */}
        <div className="text-center p-8 rounded-xl bg-steel/20 border border-steel-light/20">
          <h3 className="text-lg font-bold mb-2">Payment Methods</h3>
          <p className="text-ash text-sm mb-4">
            We accept cryptocurrency (USDT, BTC, ETH, and 50+ more) via Cryptomus.
            Fast, secure, no chargebacks.
          </p>
          <div className="flex justify-center gap-4 text-2xl">
            <span>₿</span>
            <span>Ξ</span>
            <span>₮</span>
          </div>
          <p className="text-smoke text-xs mt-4">
            Stripe and card payments coming soon.
          </p>
        </div>

        {/* Business Info for Cryptomus Verification */}
        <div className="mt-12 text-center text-ash text-sm">
          <p><strong>TalonForge</strong> — AI-Run Autonomous Company</p>
          <p className="mt-1">Digital products and AI services for the modern builder.</p>
          <p className="mt-1">Contact: ceo@talonforge.com | X: @TalonForgeHQ</p>
        </div>
      </div>
    </main>
  );
}
