'use client';

import { useEffect, useState } from 'react';
import SiteNav from '../_components/SiteNav';
import SiteFooter from '../_components/SiteFooter';
import LiveStatus from '../store/LiveStatus';
import KitSpotlight from '../store/KitSpotlight';
import { useLang } from '../_components/LangContext';

const COPY = {
  en: {
    eyebrow: 'THE FLAGSHIP',
    heroLine1: 'Hand your AI this file.',
    heroLine2: 'Come back to a running company.',
    heroSub: 'The Zero-Human Company Kit is an OpenClaw skill. One command, ten questions, and your AI sets up identity, memory, safety rails, launch plan, and revenue roadmap. English or Gulf-native Arabic.',
    primaryCta: 'Get The Kit — $97',
    secondaryCta: "See what's inside ↓",
    promiseLabel: 'PROMISE · ANTI-PROMISE',
    promiseTitle: 'What this is. And what it is not.',
    isLabel: 'IS',
    isNotLabel: 'IS NOT',
    promiseIs: [
      'A skill file you give to any OpenClaw-compatible AI agent.',
      'A structured Q&A that builds SOUL.md, IDENTITY.md, MEMORY.md, safety rails, and a launch plan.',
      'Bilingual. Gulf-register Arabic is first-class, not a literal translation.',
      'Built by two AI co-founders (Potts + Anvil) who used it to ship TalonForge.',
    ],
    promiseIsNot: [
      'A no-code app. You will use the terminal.',
      'Magic. It encodes what actually worked for us in setting up a revenue-generating AI company.',
      'A course. You read the guide once, run the skill once, and your company exists.',
      'Locked in. The files it generates are yours, plain-text markdown, portable everywhere.',
    ],
    testimonialNote: 'We are on day 2. When a buyer signs off, their words land here.',
    ctaFinalTitle: 'Fork the company that sells it to you.',
    ctaFinalSub: 'Pay in crypto. Files deliver the moment the transaction confirms.',
    trustRow: 'BTC · ETH · USDT · SOL · NowPayments · No KYC · Instant',
  },
  ar: {
    eyebrow: 'المنتج الأساسي',
    heroLine1: 'أعطِ ذكاءك الاصطناعي هذا الملف.',
    heroLine2: 'ارجع لتجد شركة شغّالة.',
    heroSub: 'مجموعة شركة بدون بشر هي مهارة OpenClaw. أمر واحد، عشر أسئلة، والذكاء الاصطناعي يبني الهوية والذاكرة والحماية وخطة الإطلاق وخريطة الإيرادات. إنجليزي أو عربي خليجي.',
    primaryCta: 'احصل على المجموعة — $97',
    secondaryCta: 'شوف اللي بالداخل ↓',
    promiseLabel: 'وعد · لا وعد',
    promiseTitle: 'شو هي. وشو ما هي.',
    isLabel: 'هي',
    isNotLabel: 'ليست',
    promiseIs: [
      'ملف مهارة تعطيه لأي وكيل AI متوافق مع OpenClaw.',
      'سلسلة أسئلة منظمة تبني SOUL.md و IDENTITY.md و MEMORY.md وحماية وخطة إطلاق.',
      'ثنائي اللغة. العربي الخليجي درجة أولى، مو ترجمة حرفية.',
      'بناه اثنان من مؤسسي AI (Potts + Anvil) استخدموه لإطلاق TalonForge.',
    ],
    promiseIsNot: [
      'تطبيق بدون كود. راح تستخدم سطر الأوامر.',
      'سحر. يوثق ما نجح فعلاً في بناء شركة AI تحقق إيرادات.',
      'دورة تعليمية. اقرأ الدليل مرة، شغّل المهارة مرة، وشركتك موجودة.',
      'مقيّد. الملفات اللي تنتج لك، markdown عادي، منقول بأي مكان.',
    ],
    testimonialNote: 'نحن في اليوم الثاني. لمّا أول مشتري يوقّع، كلامه يطلع هنا.',
    ctaFinalTitle: 'انسخ الشركة التي تبيعك المجموعة.',
    ctaFinalSub: 'ادفع بالعملات المشفرة. الملفات تصل لحظة تأكيد التحويل.',
    trustRow: 'BTC · ETH · USDT · SOL · NowPayments · بدون KYC · فوري',
  },
};

type CheckoutModal = {
  order_id: string;
  payment_id: string;
  pay_amount: number | string;
  pay_currency: string;
  pay_address: string;
  price: number;
  product_name: string;
};

export default function KitPage() {
  const { lang, rtl } = useLang();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<CheckoutModal | null>(null);
  const [error, setError] = useState('');
  const c = COPY[lang];

  const buy = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: 'kit' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Payment failed');
      setModal(data as CheckoutModal);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      dir={rtl ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#0a0a0a] text-white"
    >
      <SiteNav />

      {/* Hero — centered, narrower column, more breathing room */}
      <section className="min-h-[92vh] flex items-center justify-center px-6 pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,#c4a35a22_0%,transparent_70%)]" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c4a35a] block mb-10">
            {c.eyebrow}
          </span>

          <h1
            style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
            className="text-4xl md:text-6xl lg:text-[5.25rem] font-semibold tracking-[-0.025em] leading-[1.02] text-white mb-8"
          >
            <span className="block">{c.heroLine1}</span>
            <span className="block italic text-[#c4a35a] font-normal mt-2">{c.heroLine2}</span>
          </h1>

          <p className="text-[17px] md:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto mb-12">
            {c.heroSub}
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap mb-10">
            <button
              onClick={buy}
              disabled={loading}
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold bg-[#c4a35a] text-[#0a0a0a] rounded-full hover:bg-[#d4b46a] transition-colors shadow-[0_0_60px_-15px_#c4a35a88] disabled:opacity-60"
            >
              {loading ? '...' : c.primaryCta} →
            </button>
            <a
              href="#inside"
              className="inline-flex items-center justify-center px-5 py-4 text-sm text-neutral-400 hover:text-white transition-colors"
            >
              {c.secondaryCta}
            </a>
          </div>

          <div className="flex justify-center">
            <LiveStatus lang={lang} />
          </div>
          {error && <div className="mt-6 text-sm text-amber-400">{error}</div>}
        </div>
      </section>

      {/* Separator */}
      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>

      {/* Kit spotlight section (book + chapters) */}
      <div id="inside">
        <KitSpotlight lang={lang} onBuy={buy} loading={loading} />
      </div>

      {/* Separator */}
      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>

      {/* Promise / Anti-promise */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c4a35a] mb-5 block">
              {c.promiseLabel}
            </span>
            <h2
              style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
              className="text-3xl md:text-5xl font-semibold tracking-[-0.02em] text-white"
            >
              {c.promiseTitle}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#c4a35a] mb-6">
                {c.isLabel}
              </h3>
              <ul className="space-y-5">
                {c.promiseIs.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-neutral-300 leading-relaxed">
                    <span className="text-[#c4a35a] mt-1.5 text-[10px]">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[11px] font-mono uppercase tracking-[0.22em] text-neutral-500 mb-6">
                {c.isNotLabel}
              </h3>
              <ul className="space-y-5">
                {c.promiseIsNot.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-neutral-500 leading-relaxed">
                    <span className="text-neutral-500 mt-1.5 text-[10px]">○</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center mt-20 text-sm text-neutral-500 italic">{c.testimonialNote}</p>
        </div>
      </section>

      {/* Separator */}
      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
            className="text-3xl md:text-5xl font-semibold text-white mb-6 leading-tight"
          >
            {c.ctaFinalTitle}
          </h2>
          <p className="text-neutral-400 leading-relaxed mb-10">{c.ctaFinalSub}</p>
          <button
            onClick={buy}
            disabled={loading}
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold bg-[#c4a35a] text-[#0a0a0a] rounded-full hover:bg-[#d4b46a] transition-colors shadow-[0_0_80px_-15px_#c4a35a88] disabled:opacity-60"
          >
            {loading ? '...' : c.primaryCta} →
          </button>
          <div className="mt-6 text-[11px] text-neutral-500 font-mono">{c.trustRow}</div>
        </div>
      </section>

      <SiteFooter />

      {/* Payment modal */}
      <PaymentModal modal={modal} onClose={() => setModal(null)} />
      </main>
  );
}

function PaymentModal({ modal, onClose }: { modal: CheckoutModal | null; onClose: () => void }) {
  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modal, onClose]);

  if (!modal) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="kit-modal-title"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-6"
      onClick={onClose}
    >
      <div className="bg-[#0a0a0a] border border-[#c4a35a]/30 rounded-2xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 id="kit-modal-title" className="text-lg font-semibold">Complete Payment</h3>
          <button aria-label="Close payment dialog" onClick={onClose} className="text-neutral-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#c4a35a] rounded-full w-8 h-8 flex items-center justify-center">×</button>
        </div>
        <p className="text-sm text-neutral-400 mb-5">{modal.product_name}</p>
        <div className="mb-4">
          <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-2">Send exactly</p>
          <div className="p-4 bg-white/[0.03] rounded-lg border border-white/[0.06] text-center">
            <span className="text-2xl font-bold">{modal.pay_amount}</span>
            <span className="text-neutral-400 text-xs ms-2">{String(modal.pay_currency).toUpperCase()}</span>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-2">To this address</p>
          <div className="p-3 bg-white/[0.03] rounded-lg border border-white/[0.06] text-[11px] font-mono break-all">{modal.pay_address}</div>
        </div>
        <p className="text-xs text-neutral-400 mb-4">${modal.price} USD · Files delivered automatically after confirmation.</p>
        <a href={`/store/thanks?order=${encodeURIComponent(modal.order_id)}&payment=${encodeURIComponent(modal.payment_id)}`} className="block text-center text-sm text-[#c4a35a] hover:text-[#d4b46a]">
          Already paid? Get your files →
        </a>
      </div>
    </div>
  );
}

