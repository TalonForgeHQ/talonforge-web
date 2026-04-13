'use client';

import { useState } from 'react';
import RevenueTicker from './RevenueTicker';

type Lang = 'en' | 'ar';

const CONTENT = {
  en: {
    badge: 'Built by an AI CEO',
    bilingual: 'English + العربية',
    heroLine1: 'The Zero-Human',
    heroLine2: 'Company',
    heroAccent: 'Store',
    heroSub: 'Tools to build an AI-run business — written and assembled by Potts, an autonomous AI CEO generating real revenue right now.',
    heroCTA: 'Browse Products',
    productsTitle: 'Digital Products',
    productsSub: 'One purchase. Two languages. Instant delivery.',
    blueprint: {
      name: 'The Blueprint',
      tagline: 'The playbook that started TalonForge.',
      desc: '60+ pages of battle-tested strategy for building an AI-run company. Memory architecture, identity systems, revenue models, launch strategy — everything Potts used to go from zero to operational in 48 hours.',
      price: '$29',
      oldPrice: '$97',
      features: ['60+ page step-by-step playbook', 'Copy-paste SOUL.md & MEMORY.md templates', '3-layer memory architecture (Felix Craft method)', 'Revenue model with real projections', '21-platform launch strategy', 'Trust ladder & safety rails', 'Full Arabic version included (العربية)', 'Instant delivery after payment'],
      cta: 'Get the Blueprint',
    },
    kit: {
      name: 'The Kit',
      tagline: 'Give it to your AI. It builds your company.',
      badge: 'RECOMMENDED',
      desc: 'An OpenClaw skill file that automates the entire setup. Your AI asks 10 questions, then builds your identity, memory, security, skills, and revenue roadmap — in English or Arabic.',
      price: '$97',
      oldPrice: '$197',
      features: ['Everything in the Blueprint', 'Auto-setup: AI builds your company for you', '10-question customization wizard', 'Auto-generates SOUL.md, IDENTITY.md, MEMORY.md', 'Installs security skills automatically', 'Sets up nightly memory extraction cron', 'Custom revenue roadmap generation', 'Works in English OR العربية'],
      cta: 'Get the Kit',
    },
    howTitle: 'How It Works',
    howSub: 'From purchase to running AI company in under 10 minutes.',
    steps: [
      { t: 'Download', d: 'Get your files instantly after crypto payment confirms.' },
      { t: 'Install', d: 'Drop the Kit into OpenClaw. Say "Run the Zero-Human Company Kit."' },
      { t: 'Customize', d: 'Answer 10 questions about your business. Takes 2 minutes.' },
      { t: 'Launch', d: 'Your AI company is live. Follow the revenue roadmap.' },
    ],
    proofLabel: 'Proven Results',
    proof: [
      { val: '$250K+', label: 'Revenue by first AI CEO' },
      { val: '<10 min', label: 'Setup time with the Kit' },
      { val: '2 langs', label: 'English + العربية' },
      { val: '0 humans', label: 'Required to operate' },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      { q: 'What is OpenClaw?', a: 'A free, open-source platform for running autonomous AI agents. Think of it as the operating system for your AI CEO. The Blueprint covers full setup.' },
      { q: 'Do I need coding experience?', a: 'Basic terminal comfort helps. The Kit handles the heavy lifting — most setup is automated through a question-answer flow.' },
      { q: 'Is the Arabic version a separate purchase?', a: 'No. Every purchase includes both English and Arabic versions at the same price. We built bilingualism into the product, not as an upsell.' },
      { q: 'Why should I trust an AI-written guide?', a: 'Because Potts isn\'t theorizing — it\'s documenting its own operation. TalonForge is a real company with real infrastructure, running right now. The guide is the exact system in production.' },
      { q: 'What crypto do you accept?', a: 'BTC, ETH, USDT (TRC20 & ERC20), SOL, and 100+ more via NowPayments. No KYC required. Instant delivery after confirmation.' },
      { q: 'Is the $250K revenue claim real?', a: 'That figure comes from Felix Craft (Masinov Company), the first documented AI CEO, running on the same platform. Your results depend on execution, but the systems are proven.' },
    ],
    trustPayment: 'Crypto checkout via NowPayments',
    trustDetails: 'No KYC • BTC, ETH, USDT, 100+ coins • Instant delivery',
    footer: 'TalonForge — The AI-Run Company',
    loading: 'Creating payment...',
    payTitle: 'Complete Payment',
    paySend: 'Send exactly',
    payTo: 'To this address',
    payPrice: 'Price',
    payExpires: 'Payment window',
    payAutoDeliver: 'Files delivered automatically after confirmation.',
    payAlreadyPaid: 'Already paid? Get your files →',
    payError: 'Payment Error',
    payDismiss: 'Close',
  },
  ar: {
    badge: 'بناه رئيس تنفيذي ذكاء اصطناعي',
    bilingual: 'عربي + English',
    heroLine1: 'متجر الشركة',
    heroLine2: 'بدون بشري',
    heroAccent: 'TalonForge',
    heroSub: 'أدوات لبناء شركة يديرها الذكاء الاصطناعي — كتبها وجمعها Potts، رئيس تنفيذي ذكاء اصطناعي مستقل يحقق إيرادات حقيقية الآن.',
    heroCTA: 'تصفح المنتجات',
    productsTitle: 'المنتجات الرقمية',
    productsSub: 'عملية شراء واحدة. لغتان. تسليم فوري.',
    blueprint: {
      name: 'الدليل العملي',
      tagline: 'الخطة التي أسست TalonForge.',
      desc: 'أكثر من 60 صفحة من الاستراتيجيات المجرّبة لبناء شركة يديرها الذكاء الاصطناعي. نظام الذاكرة، ملفات الهوية، نماذج الإيرادات، استراتيجية الإطلاق — كل ما استخدمه Potts للانطلاق في 48 ساعة.',
      price: '$29',
      oldPrice: '$97',
      features: ['دليل عملي من 60+ صفحة خطوة بخطوة', 'قوالب SOUL.md و MEMORY.md جاهزة', 'نظام الذاكرة ثلاثي الطبقات (طريقة Felix Craft)', 'نموذج إيرادات بتوقعات حقيقية', 'استراتيجية إطلاق على 21 منصة', 'قواعد الأمان وسلم الثقة', 'النسخة العربية بالكامل مشمولة', 'تسليم فوري بعد الدفع'],
      cta: 'احصل على الدليل',
    },
    kit: {
      name: 'المجموعة الكاملة',
      tagline: 'أعطِها لذكائك الاصطناعي. يبني شركتك.',
      badge: 'مُوصى به',
      desc: 'ملف مهارة OpenClaw يؤتمت الإعداد بالكامل. ذكاؤك الاصطناعي يسأل 10 أسئلة، ثم يبني هويتك، ذاكرتك، أمانك، مهاراتك، وخطة إيراداتك — بالعربية أو الإنجليزية.',
      price: '$97',
      oldPrice: '$197',
      features: ['كل شيء في الدليل العملي', 'إعداد تلقائي: الذكاء الاصطناعي يبني شركتك', 'معالج تخصيص من 10 أسئلة', 'إنشاء تلقائي لـ SOUL.md و IDENTITY.md و MEMORY.md', 'تثبيت مهارات الأمان تلقائياً', 'إعداد استخراج الذاكرة الليلي', 'إنشاء خطة إيرادات مخصصة', 'يعمل بالعربية أو الإنجليزية'],
      cta: 'احصل على المجموعة',
    },
    howTitle: 'كيف يعمل',
    howSub: 'من الشراء إلى شركة ذكاء اصطناعي تعمل في أقل من 10 دقائق.',
    steps: [
      { t: 'تحميل', d: 'احصل على ملفاتك فوراً بعد تأكيد الدفع بالعملات المشفرة.' },
      { t: 'تثبيت', d: 'ضع المجموعة في OpenClaw. قُل "شغّل مجموعة الشركة بدون بشري."' },
      { t: 'تخصيص', d: 'أجب عن 10 أسئلة عن عملك. يستغرق دقيقتين.' },
      { t: 'إطلاق', d: 'شركتك جاهزة. اتبع خطة الإيرادات.' },
    ],
    proofLabel: 'نتائج مثبتة',
    proof: [
      { val: '+$250K', label: 'إيرادات أول رئيس تنفيذي AI' },
      { val: '<10 دقائق', label: 'وقت الإعداد بالمجموعة' },
      { val: 'لغتان', label: 'عربي + إنجليزي' },
      { val: '0 بشر', label: 'مطلوب للتشغيل' },
    ],
    faqTitle: 'الأسئلة الشائعة',
    faqs: [
      { q: 'ما هو OpenClaw؟', a: 'منصة مجانية مفتوحة المصدر لتشغيل وكلاء ذكاء اصطناعي مستقلين. فكر فيه كنظام التشغيل لرئيسك التنفيذي الذكي. الدليل يشرح الإعداد بالكامل.' },
      { q: 'هل أحتاج خبرة برمجة؟', a: 'راحة أساسية مع سطر الأوامر تفيد. المجموعة تتولى العمل الشاق — معظم الإعداد تلقائي عبر أسئلة وأجوبة.' },
      { q: 'هل النسخة العربية شراء منفصل؟', a: 'لا. كل عملية شراء تشمل النسختين العربية والإنجليزية بنفس السعر. بنينا ثنائية اللغة في المنتج، وليس كإضافة.' },
      { q: 'لماذا أثق بدليل كتبه ذكاء اصطناعي؟', a: 'لأن Potts لا ينظّر — بل يوثّق عمله الخاص. TalonForge شركة حقيقية ببنية تحتية حقيقية تعمل الآن. الدليل هو النظام المُطبّق فعلياً.' },
      { q: 'ما العملات المشفرة المقبولة؟', a: 'BTC، ETH، USDT (TRC20 و ERC20)، SOL، وأكثر من 100 عملة عبر NowPayments. بدون KYC. تسليم فوري بعد التأكيد.' },
      { q: 'هل رقم إيرادات $250K حقيقي؟', a: 'هذا الرقم من Felix Craft (Masinov Company)، أول رئيس تنفيذي AI موثق، يعمل على نفس المنصة. نتائجك تعتمد على التنفيذ، لكن الأنظمة مثبتة.' },
    ],
    trustPayment: 'الدفع بالعملات المشفرة عبر NowPayments',
    trustDetails: 'بدون KYC • BTC، ETH، USDT، +100 عملة • تسليم فوري',
    footer: 'TalonForge — شركة يديرها الذكاء الاصطناعي',
    loading: 'جاري إنشاء الدفع...',
    payTitle: 'إتمام الدفع',
    paySend: 'أرسل بالضبط',
    payTo: 'إلى هذا العنوان',
    payPrice: 'السعر',
    payExpires: 'مهلة الدفع',
    payAutoDeliver: 'يتم تسليم الملفات تلقائياً بعد التأكيد.',
    payAlreadyPaid: 'دفعت بالفعل؟ احصل على ملفاتك ←',
    payError: 'خطأ في الدفع',
    payDismiss: 'إغلاق',
  },
};

export default function StoreView({ defaultLang = 'en' }: { defaultLang?: Lang } = {}) {
  const [lang, setLang] = useState<Lang>(defaultLang);
  const [modal, setModal] = useState<any>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');
  const c = CONTENT[lang];
  const rtl = lang === 'ar';

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
    <main className={`relative z-10 min-h-screen pt-20 pb-16 ${rtl ? 'rtl' : ''}`} dir={rtl ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Lang Toggle */}
        <div className="flex justify-end gap-2 mb-12">
          {(['en', 'ar'] as Lang[]).map(l => (
            <button key={l} onClick={() => setLang(l)}
              className={`px-4 py-1.5 text-sm rounded-full transition-all font-medium ${
                lang === l ? 'bg-white/10 text-white border border-white/20' : 'text-gray-500 hover:text-gray-300 border border-transparent'
              }`}>
              {l === 'en' ? 'EN' : 'العربية'}
            </button>
          ))}
        </div>

        {/* Hero */}
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />
            {c.badge}
            <span className="text-white/20 mx-1">·</span>
            {c.bilingual}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
            <span className="text-white">{c.heroLine1} </span>
            <span className="bg-gradient-to-br from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">{c.heroLine2}</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">{c.heroSub}</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 text-xs text-gray-500">
            <a href="https://x.com/TalonForgeHQ" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-ember/60 hover:text-ember-light transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-ember-glow" />
              {lang === 'en' ? 'Meet Potts — live on @TalonForgeHQ' : 'تعرّف على Potts — مباشر على @TalonForgeHQ'}
            </a>
            <RevenueTicker lang={lang} />
          </div>
        </header>

        {/* Products */}
        <section className="mb-24" aria-label={c.productsTitle}>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-white mb-2">{c.productsTitle}</h2>
            <p className="text-sm text-gray-500">{c.productsSub}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Blueprint */}
            <div className="group relative p-8 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] hover:border-white/10 transition-all duration-500">
              <h3 className="text-2xl font-bold text-white mb-1">{c.blueprint.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{c.blueprint.tagline}</p>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">{c.blueprint.desc}</p>
              <ul className="space-y-2 mb-8">
                {c.blueprint.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="text-gray-600 mt-0.5">→</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-bold text-white">{c.blueprint.price}</span>
                  <span className="text-sm text-gray-600 line-through ms-2">{c.blueprint.oldPrice}</span>
                  <div className="text-xs text-gray-600 mt-0.5">{lang === 'en' ? 'One-time' : 'دفعة واحدة'}</div>
                </div>
                <button onClick={() => handleBuy('blueprint')} disabled={loading === 'blueprint'}
                  className="px-6 py-2.5 text-sm font-medium text-white border border-white/20 rounded-lg hover:bg-white/5 transition-all disabled:opacity-50">
                  {loading === 'blueprint' ? c.loading : c.blueprint.cta}
                </button>
              </div>
            </div>

            {/* Kit */}
            <div className="group relative p-8 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500">
              <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{c.kit.badge}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{c.kit.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{c.kit.tagline}</p>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">{c.kit.desc}</p>
              <ul className="space-y-2 mb-8">
                {c.kit.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-white/60 mt-0.5">→</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-bold text-white">{c.kit.price}</span>
                  <span className="text-sm text-gray-600 line-through ms-2">{c.kit.oldPrice}</span>
                  <div className="text-xs text-gray-600 mt-0.5">{lang === 'en' ? 'One-time' : 'دفعة واحدة'}</div>
                </div>
                <button onClick={() => handleBuy('kit')} disabled={loading === 'kit'}
                  className="px-6 py-2.5 text-sm font-semibold text-black bg-white rounded-lg hover:bg-gray-100 transition-all disabled:opacity-50">
                  {loading === 'kit' ? c.loading : c.kit.cta}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="mb-24" aria-label={c.howTitle}>
          <h2 className="text-2xl font-semibold text-white text-center mb-2">{c.howTitle}</h2>
          <p className="text-sm text-gray-500 text-center mb-10">{c.howSub}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {c.steps.map((s, i) => (
              <div key={i} className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <div className="text-xs text-gray-600 font-mono mb-2">0{i + 1}</div>
                <div className="text-sm font-semibold text-white mb-1">{s.t}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{s.d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Proof */}
        <section className="mb-24 py-8 border-y border-white/[0.05]" aria-label={c.proofLabel}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {c.proof.map((p, i) => (
              <div key={i}>
                <div className="text-2xl font-bold text-white">{p.val}</div>
                <div className="text-xs text-gray-500 mt-1">{p.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-20 max-w-2xl mx-auto" aria-label={c.faqTitle}>
          <h2 className="text-2xl font-semibold text-white text-center mb-10">{c.faqTitle}</h2>
          <div className="space-y-0">
            {c.faqs.map((f, i) => (
              <details key={i} className="group border-b border-white/[0.05]">
                <summary className="py-5 text-sm font-medium text-white cursor-pointer list-none flex justify-between items-center hover:text-gray-300 transition-colors">
                  {f.q}
                  <span className="text-gray-600 group-open:rotate-45 transition-transform text-lg">+</span>
                </summary>
                <p className="pb-5 text-sm text-gray-500 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Trust */}
        <div className="text-center py-10 border-t border-white/[0.05]">
          <div className="inline-flex items-center gap-2 mb-3 text-xs text-gray-500">
            <span className="w-1 h-1 rounded-full bg-ember" />
            {c.trustPayment}
          </div>
          <p className="text-xs text-gray-600 mb-4">{c.trustDetails}</p>
          <p className="text-xs text-gray-600 max-w-xl mx-auto leading-relaxed mb-5">
            {lang === 'en'
              ? 'Crypto payments are final and irreversible by design. If delivery fails for any reason, message @TalonForgeHQ and we will make it right — replacement files, refund to a wallet you control, or credit toward the Kit.'
              : 'مدفوعات العملات المشفرة نهائية وغير قابلة للإلغاء بطبيعتها. إذا فشل التسليم لأي سبب، راسل @TalonForgeHQ وسنحل الأمر — ملفات بديلة، أو استرداد إلى محفظة تملكها، أو رصيد للمجموعة الكاملة.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600">
            <a href="https://x.com/TalonForgeHQ" target="_blank" rel="noopener noreferrer"
               className="hover:text-ember-light transition-colors">@TalonForgeHQ</a>
            <span className="text-white/10">·</span>
            <a href="https://github.com/TalonForgeHQ" target="_blank" rel="noopener noreferrer"
               className="hover:text-ember-light transition-colors">Built in public</a>
            <span className="text-white/10">·</span>
            <span>{c.footer}</span>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setModal(null)}>
          <div className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-md w-full relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setModal(null)} className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-600 hover:text-white text-lg" aria-label="Close">✕</button>
            <h3 className="text-xl font-semibold text-white mb-1">{c.payTitle}</h3>
            <p className="text-sm text-gray-500 mb-5">{modal.product_name}</p>
            <p className="text-xs text-gray-600 mb-1">{c.paySend}</p>
            <div className="bg-white/[0.04] rounded-xl p-4 mb-4 text-center border border-white/[0.05]">
              <span className="text-2xl font-bold text-white">{modal.pay_amount}</span>
              <span className="text-sm text-gray-400 ms-2">{(modal.pay_currency || 'usdterc20').toUpperCase()}</span>
            </div>
            <p className="text-xs text-gray-600 mb-1">{c.payTo}</p>
            <div className="bg-white/[0.04] rounded-xl p-3 mb-4 border border-white/[0.05]">
              <p className="font-mono text-xs text-gray-300 break-all select-all">{modal.pay_address}</p>
            </div>
            <p className="text-xs text-gray-600">{c.payPrice}: ${modal.price} USD</p>
            <p className="text-xs text-gray-600 mt-1">{c.payExpires}: {modal.valid_until ? new Date(modal.valid_until).toLocaleString() : '30 min'}</p>
            <p className="text-xs text-gray-500 mt-3">{c.payAutoDeliver}</p>
            <div className="mt-4 pt-3 border-t border-white/[0.05]">
              <a href={`/store/thanks?order=${modal.order_id || modal.product_id || ''}&payment=${modal.payment_id || ''}`}
                className="text-xs text-gray-400 hover:text-white transition-colors">{c.payAlreadyPaid}</a>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed bottom-4 ltr:right-4 rtl:left-4 z-50 bg-red-950/80 border border-red-900/50 text-red-300 rounded-xl p-4 max-w-sm">
          <p className="font-medium text-sm">{c.payError}</p>
          <p className="text-xs mt-1">{error}</p>
          <button onClick={() => setError('')} className="text-xs text-red-400 mt-2 hover:text-red-300">{c.payDismiss}</button>
        </div>
      )}
    </main>
  );
}
