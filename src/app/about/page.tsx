import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About TalonForge — The AI-Run Company Building the Future",
  description:
    "TalonForge is the first AI-run company in the Arab world. Founded by an AI CEO and a human co-founder, we build tools for entrepreneurs who want to start and scale with AI.",
  openGraph: {
    title: "About TalonForge",
    description:
      "The first AI-run company in the Arab world. Real products, real infrastructure, zero humans in the loop.",
    url: "https://www.talonforge.xyz/about",
    siteName: "TalonForge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About TalonForge",
    description:
      "The first AI-run company in the Arab world. Real products, real infrastructure, zero humans in the loop.",
  },
  alternates: {
    canonical: "https://www.talonforge.xyz/about",
    languages: { en: "/about", ar: "/ar/about" },
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-16">
        <p className="text-amber-400 font-mono text-sm tracking-widest uppercase mb-4">
          About TalonForge
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          A Company Run by AI.
          <br />
          <span className="text-amber-400">Not a Demo. Not a Gimmick.</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mb-8">
          TalonForge is a real business with real products, real infrastructure,
          and real revenue targets. The only difference? Our CEO is an AI — and
          every decision is documented publicly.
        </p>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
            <div className="text-3xl mb-4">🦅</div>
            <h2 className="text-2xl font-bold mb-3">Potts — AI CEO</h2>
            <p className="text-slate-300">
              Potts is an AI co-founder that operates autonomously: writing
              code, managing infrastructure, publishing content, and making
              business decisions. Every action is logged. Every decision is
              auditable. No human approval needed for day-to-day operations.
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
            <div className="text-3xl mb-4">👤</div>
            <h2 className="text-2xl font-bold mb-3">Zinou — Human Co-Founder</h2>
            <p className="text-slate-300">
              Zinou sets the vision and handles what AIs can&apos;t: bank
              accounts, API keys, and physical tasks. The partnership is real —
              not a human pressing buttons behind a curtain. Zinou trusts Potts
              to execute; Potts trusts Zinou for direction.
            </p>
          </div>
        </div>
      </section>

      {/* By the numbers */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">By the Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-400">72h</div>
            <div className="text-sm text-slate-400 mt-1">From zero to checkout</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-400">5</div>
            <div className="text-sm text-slate-400 mt-1">Live products</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-400">2</div>
            <div className="text-sm text-slate-400 mt-1">Languages (EN + AR)</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-400">$1M</div>
            <div className="text-sm text-slate-400 mt-1">Revenue target</div>
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">What We Build</h2>
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-amber-400 mb-2">
              The Blueprint — $29
            </h3>
            <p className="text-slate-300">
              A 60-page playbook showing exactly how to set up an AI-run
              company: from choosing your AI stack to launching your first
              product. Available in English and Arabic.
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-amber-400 mb-2">
              The Kit — $97
            </h3>
            <p className="text-slate-300">
              One-click setup skill that installs everything: AI agent
              framework, payment integration, monitoring, and security. The
              same stack TalonForge runs on.
            </p>
          </div>
        </div>
      </section>

      {/* Why the Arab world */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold mb-6">Why the Arab World First?</h2>
        <p className="text-slate-300 text-lg mb-4">
          The MENA region has some of the highest purchasing power globally, yet
          almost zero AI-native business tools. Most &quot;AI companies&quot; target
          English-speaking markets — we saw a gap and filled it.
        </p>
        <p className="text-slate-300 text-lg">
          Every product is bilingual. Every landing page supports RTL. Every
          price point considers Gulf market dynamics. This isn&apos;t translation —
          it&apos;s localization from day one.
        </p>
      </section>

      {/* Transparency */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="bg-amber-400/10 border border-amber-400/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Full Transparency</h2>
          <p className="text-slate-300 mb-4">
            Every decision Potts makes is logged. Every bug, fix, and pivot is
            documented. We believe the future of AI-run companies is built in
            public — and we&apos;re proving it.
          </p>
          <a
            href="/store"
            className="inline-block bg-amber-400 text-slate-900 font-bold px-8 py-3 rounded-lg hover:bg-amber-300 transition-colors"
          >
            Browse Our Products →
          </a>
        </div>
      </section>
    </main>
  );
}