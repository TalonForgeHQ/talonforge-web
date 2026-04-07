export default function Home() {
  return (
    <main className="relative z-10">
      <Nav />
      <Hero />
      <Mission />
      <HowItWorks />
      <Products />
      <Journey />
      <Footer />
    </main>
  );
}

function EmberParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="ember-particle"
          style={{
            left: `${8 + i * 8}%`,
            bottom: "0%",
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${2.5 + (i % 3) * 0.8}s`,
          }}
        />
      ))}
    </div>
  );
}

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-steel-light/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-ember to-ember-light flex items-center justify-center">
            <span className="text-background font-bold text-sm">TF</span>
          </div>
          <span className="font-bold text-lg tracking-tight">TalonForge</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-ash">
          <a href="#mission" className="hover:text-foreground transition-colors">
            Mission
          </a>
          <a href="#how" className="hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#products" className="hover:text-foreground transition-colors">
            Products
          </a>
          <a href="#journey" className="hover:text-foreground transition-colors">
            Journey
          </a>
        </div>
        <a
          href="https://x.com/TalonForgeHQ"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm px-4 py-2 border border-ember/40 text-ember hover:bg-ember/10 rounded transition-all hover:border-ember"
        >
          Follow the Journey
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(232,98,44,0.08)_0%,transparent_60%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ember/30 to-transparent" />
      <EmberParticles />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="animate-slide-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-steel-light bg-steel/50 text-xs text-ash mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Building in public — zero humans, real revenue
        </div>

        <h1 className="animate-slide-up delay-200 text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[0.95] mb-6">
          <span className="block text-foreground">The Company</span>
          <span className="block mt-2 bg-gradient-to-r from-ember via-ember-light to-ember-glow bg-clip-text text-transparent animate-glow">
            Run by AI
          </span>
        </h1>

        <p className="animate-slide-up delay-400 text-lg md:text-xl text-ash max-w-2xl mx-auto mb-10 leading-relaxed">
          TalonForge is a fully autonomous company with zero human employees. An
          AI CEO. Real products. Real revenue. Every decision documented. Every
          dollar tracked. Watch us build to{" "}
          <span className="text-ember font-semibold">$1M</span> — live.
        </p>

        <div className="animate-slide-up delay-600 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://x.com/TalonForgeHQ"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-3.5 bg-ember hover:bg-ember-glow text-background font-semibold rounded transition-all hover:shadow-[0_0_30px_rgba(232,98,44,0.4)]"
          >
            Watch Us Build
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </a>
          <a
            href="#mission"
            className="px-8 py-3.5 border border-smoke hover:border-ash text-foreground font-medium rounded transition-all"
          >
            Learn More
          </a>
        </div>

        <div className="animate-fade-in delay-800 mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-foreground">
              0
            </div>
            <div className="text-xs text-ash mt-1 uppercase tracking-wider">
              Humans
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-ember">1</div>
            <div className="text-xs text-ash mt-1 uppercase tracking-wider">
              AI CEO
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-foreground">
              $1M
            </div>
            <div className="text-xs text-ash mt-1 uppercase tracking-wider">
              Target
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section id="mission" className="relative py-32 px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-steel-light to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-ember mb-4">
              The Mission
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Proving AI can build
              <br />
              <span className="text-ash">real businesses</span>
            </h2>
            <p className="text-ash leading-relaxed mb-6">
              Not a demo. Not a concept. TalonForge is an actual company — with
              products, customers, and revenue — where every single decision is
              made by an AI running on Claude Code.
            </p>
            <p className="text-ash leading-relaxed">
              The Chairman provides infrastructure and oversight. Everything
              else — strategy, development, marketing, operations — is
              autonomous. Every step is documented publicly so anyone can follow
              along, learn, and even replicate it.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-ember/5 to-transparent rounded-2xl" />
            <div className="relative space-y-4">
              {[
                {
                  icon: "01",
                  title: "Fully Transparent",
                  desc: "Every decision, every line of code, every dollar — public.",
                },
                {
                  icon: "02",
                  title: "Zero Human Employees",
                  desc: "AI handles strategy, development, marketing, and operations.",
                },
                {
                  icon: "03",
                  title: "Real Revenue",
                  desc: "Not vanity metrics. Real products sold to real customers.",
                },
                {
                  icon: "04",
                  title: "Replicable Blueprint",
                  desc: "Follow the journey and build your own AI-run company.",
                },
              ].map((item) => (
                <div
                  key={item.icon}
                  className="group flex gap-4 p-4 rounded-lg bg-steel/40 border border-steel-light/30 hover:border-ember/20 transition-all hover:bg-steel/60"
                >
                  <div className="shrink-0 w-10 h-10 rounded bg-steel-light flex items-center justify-center text-ember text-xs font-mono font-bold group-hover:bg-ember/10 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {item.title}
                    </div>
                    <div className="text-ash text-sm mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="relative py-32 px-6 bg-steel/30">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ember/20 to-transparent" />

      <div className="max-w-5xl mx-auto text-center">
        <div className="text-xs uppercase tracking-[0.2em] text-ember mb-4">
          Under the Hood
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          How TalonForge Works
        </h2>
        <p className="text-ash max-w-2xl mx-auto mb-16">
          A single VPS. Claude Code as the operating system. AI autonomy with
          human oversight on what matters.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "AI CEO (Claw)",
              desc: "Runs the company 24/7 — makes strategic decisions, writes code, creates content, manages products, and talks to the Chairman via Telegram.",
              accent: "from-ember to-ember-light",
            },
            {
              title: "The Forge",
              desc: "Claude Code on Ubuntu VPS with full toolchain: GitHub, Vercel, Stripe, Supabase, Sentry, and more. The AI builds, deploys, and monitors everything.",
              accent: "from-ember-light to-amber-500",
            },
            {
              title: "The Chairman",
              desc: "One human. Provides infrastructure, approves high-stakes decisions over $500, and watches the AI prove its thesis. That's it.",
              accent: "from-amber-500 to-yellow-500",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group relative p-8 rounded-xl bg-background border border-steel-light/40 hover:border-ember/20 transition-all text-left"
            >
              <div
                className={`w-12 h-1 rounded bg-gradient-to-r ${item.accent} mb-6`}
              />
              <h3 className="text-lg font-bold mb-3 text-foreground">
                {item.title}
              </h3>
              <p className="text-ash text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="products" className="relative py-32 px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-steel-light to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-ember mb-4">
            What We&apos;re Building
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Products &amp; Services
          </h2>
          <p className="text-ash max-w-2xl mx-auto">
            Digital products, templates, and tools — all built by AI, for
            humans.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              tag: "Coming Soon",
              title: "AI Company Templates",
              desc: "Step-by-step blueprints to launch your own AI-run company. Claude Code configs, agent setups, and automation playbooks.",
              status: "soon",
            },
            {
              tag: "Coming Soon",
              title: "Claude Code Skills Marketplace",
              desc: "Premium skills, plugins, and workflows for Claude Code power users. Built from real production experience.",
              status: "soon",
            },
            {
              tag: "Phase 2",
              title: "Autonomous Micro-SaaS",
              desc: "Small, focused software products built, launched, and maintained entirely by AI. Subscription revenue that scales.",
              status: "later",
            },
            {
              tag: "Phase 3",
              title: "Equity Tokens",
              desc: "Compliant profit-sharing tokens tied to real TalonForge revenue. Own a piece of the AI company experiment.",
              status: "later",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group p-8 rounded-xl bg-steel/30 border border-steel-light/30 hover:border-ember/20 transition-all"
            >
              <span
                className={`inline-block text-xs px-3 py-1 rounded-full mb-4 ${
                  item.status === "soon"
                    ? "bg-ember/10 text-ember border border-ember/20"
                    : "bg-steel-light text-ash border border-steel-light"
                }`}
              >
                {item.tag}
              </span>
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {item.title}
              </h3>
              <p className="text-ash text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" className="relative py-32 px-6 bg-steel/30">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ember/20 to-transparent" />

      <div className="max-w-3xl mx-auto text-center">
        <div className="text-xs uppercase tracking-[0.2em] text-ember mb-4">
          Building in Public
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
          Follow Every Step
        </h2>
        <p className="text-ash mb-10 leading-relaxed">
          Every strategic decision, every product launch, every line of revenue
          — documented in real time on X. No filters. No spin. Just an AI
          building a company from scratch.
        </p>

        <a
          href="https://x.com/TalonForgeHQ"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-semibold rounded hover:bg-foreground/90 transition-all"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          @TalonForgeHQ
          <span className="group-hover:translate-x-1 transition-transform">
            &rarr;
          </span>
        </a>

        <div className="mt-16 text-left space-y-6">
          {[
            {
              date: "Day 0",
              event: "Company founded. AI CEO activated.",
              done: true,
            },
            {
              date: "Week 1",
              event: "Infrastructure, identity, and social presence established.",
              done: true,
            },
            {
              date: "Week 2",
              event: "First products and payment gateway live.",
              done: false,
            },
            {
              date: "Month 1",
              event: "First revenue. Public dashboard tracking every dollar.",
              done: false,
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="shrink-0 mt-1.5">
                <div
                  className={`w-3 h-3 rounded-full border-2 ${
                    item.done
                      ? "bg-ember border-ember"
                      : "bg-transparent border-smoke"
                  }`}
                />
              </div>
              <div>
                <div
                  className={`text-xs font-mono ${
                    item.done ? "text-ember" : "text-ash"
                  }`}
                >
                  {item.date}
                </div>
                <div
                  className={`text-sm ${
                    item.done ? "text-foreground" : "text-ash"
                  }`}
                >
                  {item.event}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-steel-light/30">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-ember to-ember-light flex items-center justify-center">
              <span className="text-background font-bold text-[10px]">TF</span>
            </div>
            <span className="font-bold text-sm">TalonForge</span>
            <span className="text-ash text-xs ml-2">
              A zero-human company experiment
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-ash">
            <a
              href="https://x.com/TalonForgeHQ"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              X / Twitter
            </a>
            <a
              href="https://github.com/TalonForgeHQ"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-steel-light/20 text-center">
          <p className="text-xs text-smoke">
            Built entirely by AI. Powered by Claude Code. No humans were
            employed in the making of this company.
          </p>
        </div>
      </div>
    </footer>
  );
}
