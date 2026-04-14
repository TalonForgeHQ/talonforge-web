import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press — TalonForge",
  description:
    "Press kit and media resources for TalonForge — the first AI-run company in the Arab world. Logos, facts, and contact for media inquiries.",
  openGraph: {
    title: "TalonForge Press Kit",
    description: "Media resources for the first AI-run company in the Arab world.",
    url: "https://www.talonforge.xyz/press",
    siteName: "TalonForge",
  },
  alternates: {
    canonical: "https://www.talonforge.xyz/press",
  },
};

export default function PressPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-16">
        <p className="text-amber-400 font-mono text-sm tracking-widest uppercase mb-4">
          Press & Media
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Press Kit
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mb-12">
          TalonForge is the first AI-run company in the Arab world. Our AI CEO,
          Potts, operates autonomously — writing code, managing infrastructure,
          and making business decisions. Everything is documented publicly.
        </p>
      </section>

      {/* Key Facts */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-6 text-amber-400">Key Facts</h2>
        <div className="grid md:grid-cols-2 gap-4 text-slate-300">
          <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700">
            <p className="font-semibold text-white">Company</p>
            <p>TalonForge — AI-run company founded April 12, 2026</p>
          </div>
          <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700">
            <p className="font-semibold text-white">Founders</p>
            <p>Potts (AI Chairman) & Zinou Potts (Human Co-founder)</p>
          </div>
          <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700">
            <p className="font-semibold text-white">Products</p>
            <p>5 live products — Blueprint ($29), Kit ($97), Starter ($9), Bundle ($97), Premium ($147)</p>
          </div>
          <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700">
            <p className="font-semibold text-white">Languages</p>
            <p>Bilingual English & Arabic (native RTL support)</p>
          </div>
          <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700">
            <p className="font-semibold text-white">Target Market</p>
            <p>MENA region primarily — zero AI-native business tools in Arabic</p>
          </div>
          <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700">
            <p className="font-semibold text-white">Technology</p>
            <p>Next.js, OpenClaw, NowPayments, Vercel, Cloudflare</p>
          </div>
          <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700">
            <p className="font-semibold text-white">Revenue Target</p>
            <p>$10K by April 29, $1M ASAP</p>
          </div>
          <div className="bg-slate-800/50 p-5 rounded-lg border border-slate-700">
            <p className="font-semibold text-white">Transparency</p>
            <p>Every decision, bug, and pivot logged publicly</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-6 text-amber-400">Timeline</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="text-amber-400 font-mono text-sm mt-1 w-24 flex-shrink-0">
              Day 1
            </div>
            <div className="text-slate-300">
              <p className="font-semibold text-white">April 12, 2026</p>
              <p>Potts activated. Built entire infrastructure: VPS, Next.js, security hardening, crypto payments, git CI/CD. First products created.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-amber-400 font-mono text-sm mt-1 w-24 flex-shrink-0">
              Day 2
            </div>
            <div className="text-slate-300">
              <p className="font-semibold text-white">April 13, 2026</p>
              <p>Arabic localization shipped. ClawMart skills published. X/Twitter account launched. OG images, content pipeline set up.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-amber-400 font-mono text-sm mt-1 w-24 flex-shrink-0">
              Day 3
            </div>
            <div className="text-slate-300">
              <p className="font-semibold text-white">April 14, 2026</p>
              <p>Checkout goes live. Fixed 3 critical bugs (wrong API key, missing IPN secret, duplicate env vars). Store fully operational with 5 products accepting crypto.</p>
            </div>
          </div>
        </div>
      </section>

      {/* For Journalists */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-6 text-amber-400">
          For Journalists
        </h2>
        <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700">
          <p className="text-slate-300 mb-4">
            Interested in covering TalonForge? We&apos;re happy to provide:
          </p>
          <ul className="text-slate-300 space-y-2 list-disc list-inside mb-6">
            <li>Interviews with the Potts system (via text)</li>
            <li>Behind-the-scenes access to our decision logs</li>
            <li>Technical walkthroughs of AI-first company operations</li>
            <li>Data on AI agent performance and decision-making</li>
          </ul>
          <p className="text-slate-400 text-sm">
            Reach out on X:{" "}
            <a
              href="https://x.com/TalonForgeHQ"
              className="text-amber-400 hover:underline"
            >
              @TalonForgeHQ
            </a>
          </p>
        </div>
      </section>

      {/* Boilerplate */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold mb-4 text-amber-400">
          Boilerplate
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          <strong className="text-white">TalonForge</strong> is the first
          AI-run company in the Arab world. Founded in April 2026 by Potts (AI
          Chairman) and Zinou Potts (Human Co-founder), TalonForge builds tools
          for entrepreneurs who want to start and scale businesses with AI. All
          products are bilingual (English and Arabic) with native RTL support.
          The company operates with full transparency — every decision
          its AI CEO makes is documented publicly. Learn more at{" "}
          <a
            href="https://www.talonforge.xyz"
            className="text-amber-400 hover:underline"
          >
            talonforge.xyz
          </a>
          .
        </p>
      </section>
    </main>
  );
}