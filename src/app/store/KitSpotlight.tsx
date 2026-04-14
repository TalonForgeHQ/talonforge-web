'use client';

type Lang = 'en' | 'ar';

const COPY = {
  en: {
    eyebrow: 'THE FLAGSHIP',
    title: 'Give it to your AI. It builds your company.',
    byline: 'An OpenClaw skill file. One command. 10 questions. A running AI-run business.',
    priceTag: '$97',
    oldPrice: '$197',
    cta: 'Get The Kit',
    bookTitle: 'The Zero-Human',
    bookSub: 'Company Kit',
    bookBadge: 'EN + AR',
    bookFoot: 'TalonForge · 2026',
    insideTitle: "What's inside",
    chapters: [
      { n: '01', t: 'Welcome & Discovery', d: 'Your AI asks 10 questions to understand what you\'re building.' },
      { n: '02', t: 'Build Identity', d: 'Generates SOUL.md + IDENTITY.md — the voice and backstory of your AI CEO.' },
      { n: '03', t: 'Build Memory', d: 'Three-layer memory: project facts, personal context, operational state.' },
      { n: '04', t: 'Install Safety Rails', d: 'Security skills wired in — API key hygiene, prompt injection defense, audit logs.' },
      { n: '05', t: 'Launch Blitz Plan', d: '21-platform launch schedule pre-filled for your niche + language.' },
      { n: '06', t: 'Revenue Roadmap', d: 'Product shelf, pricing, payments, first-100-customers plan.' },
      { n: '07', t: 'Arabic-First Mode', d: 'Entire setup can run in Gulf-register Arabic. No literal translations.' },
      { n: '08', t: 'Handoff Protocol', d: 'How to step away. Your AI runs itself. You review weekly.' },
      { n: '09', t: 'Retrospective Loop', d: 'Monthly self-audit your AI runs without you. Ships a report. You act on it.' },
    ],
  },
  ar: {
    eyebrow: 'المنتج الأساسي',
    title: 'أعطِها لذكائك الاصطناعي. تبني شركتك.',
    byline: 'ملف مهارة OpenClaw. أمر واحد. 10 أسئلة. شركة AI شغّالة.',
    priceTag: '$97',
    oldPrice: '$197',
    cta: 'احصل على المجموعة',
    bookTitle: 'مجموعة',
    bookSub: 'شركة بدون بشر',
    bookBadge: 'عربي + إنجليزي',
    bookFoot: 'TalonForge · 2026',
    insideTitle: 'شو في الداخل',
    chapters: [
      { n: '٠١', t: 'الترحيب والاستكشاف', d: '10 أسئلة من الذكاء الاصطناعي ليفهم ما تبني.' },
      { n: '٠٢', t: 'بناء الهوية', d: 'ينشئ SOUL.md و IDENTITY.md — صوت AI CEO تبعك وقصته.' },
      { n: '٠٣', t: 'بناء الذاكرة', d: 'ذاكرة ثلاثية الطبقات: حقائق المشروع، سياق شخصي، حالة تشغيلية.' },
      { n: '٠٤', t: 'تثبيت الحماية', d: 'مهارات أمان موصولة — حماية المفاتيح، وحقن الأوامر، وسجلات التدقيق.' },
      { n: '٠٥', t: 'خطة الإطلاق', d: 'جدول إطلاق على 21 منصة مُعبّأ لمجالك ولغتك.' },
      { n: '٠٦', t: 'خريطة الإيرادات', d: 'رفّ المنتجات، التسعير، الدفع، خطة أول 100 عميل.' },
      { n: '٠٧', t: 'وضع عربي أولاً', d: 'الإعداد كله يشتغل بالعربي الخليجي. بدون ترجمة حرفية.' },
      { n: '٠٨', t: 'بروتوكول التسليم', d: 'كيف تبتعد. الـAI يشغّل نفسه. تراجع أسبوعياً.' },
      { n: '٠٩', t: 'حلقة المراجعة', d: 'تدقيق ذاتي شهري بدونك. AI يشحن تقرير. أنت تصرّف.' },
    ],
  },
};

export default function KitSpotlight({ lang, onBuy, loading }: { lang: Lang; onBuy: () => void; loading: boolean }) {
  const c = COPY[lang];
  return (
    <section className="py-24 px-6 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-14 items-center mb-20">
          {/* Text */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#c4a35a] mb-5 block">
              {c.eyebrow}
            </span>
            <h2
              style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
              className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] leading-[1.05] text-white mb-5"
            >
              {c.title}
            </h2>
            <p className="text-neutral-400 leading-relaxed mb-8 text-[15px]">{c.byline}</p>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-white">{c.priceTag}</span>
              <span className="text-base text-neutral-500 line-through">{c.oldPrice}</span>
            </div>
            <button
              onClick={onBuy}
              disabled={loading}
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold bg-[#c4a35a] text-[#0a0a0a] rounded-full hover:bg-[#d4b46a] transition-colors shadow-[0_0_60px_-15px_#c4a35a88] disabled:opacity-60"
            >
              {loading ? '...' : c.cta} →
            </button>
            <div className="mt-5 text-[11px] text-neutral-500 font-mono">BTC · ETH · USDT · SOL · NowPayments · No KYC · Instant</div>
          </div>

          {/* Book mockup (CSS 3D) */}
          <div className="flex justify-center md:justify-end">
            <div
              className="relative"
              style={{
                width: '280px',
                height: '360px',
                perspective: '1600px',
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                className="relative rounded-sm overflow-hidden shadow-[0_30px_100px_-20px_rgba(196,163,90,0.3),0_0_0_1px_rgba(196,163,90,0.15)]"
                style={{
                  width: '280px',
                  height: '360px',
                  transform: 'rotateY(-18deg) rotateX(4deg)',
                  background: 'linear-gradient(135deg, #1a1612 0%, #0a0a0a 55%, #1a1612 100%)',
                }}
              >
                {/* gold edge */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#c4a35a] via-[#8e7540] to-[#c4a35a]" />
                {/* inner frame */}
                <div className="absolute inset-5 border border-[#c4a35a]/30 rounded-sm flex flex-col justify-between p-6">
                  <div>
                    <div className="inline-block px-2 py-0.5 border border-[#c4a35a]/50 rounded text-[9px] font-mono uppercase tracking-widest text-[#c4a35a] mb-6">
                      {c.bookBadge}
                    </div>
                    <div
                      style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
                      className="text-white text-[26px] leading-[1.1] font-semibold"
                    >
                      {c.bookTitle}
                      <br />
                      <span className="text-[#c4a35a] italic font-normal">{c.bookSub}</span>
                    </div>
                  </div>
                  <div>
                    <div className="h-px bg-[#c4a35a]/40 mb-3 w-12" />
                    <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">{c.bookFoot}</div>
                  </div>
                </div>
                {/* gloss */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* What's inside — 3x3 chapter grid */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }} className="text-2xl md:text-3xl font-semibold text-white text-center mb-10">
            {c.insideTitle}
          </h3>
          <div className="grid md:grid-cols-3 gap-3">
            {c.chapters.map((ch) => (
              <div
                key={ch.n}
                className="rounded-lg border border-white/[0.06] bg-white/[0.015] p-5 hover:border-[#c4a35a]/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-[11px] font-mono text-[#c4a35a] mt-0.5 flex-shrink-0">{ch.n}</span>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">{ch.t}</h4>
                    <p className="text-[13px] text-neutral-400 leading-relaxed">{ch.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
