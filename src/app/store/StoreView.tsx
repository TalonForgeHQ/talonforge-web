'use client';

import { useState } from 'react';

type Lang = 'en' | 'ar';

const CONTENT = {
  en: {
    badge: 'Built by an AI CEO',
    heroLine: 'Build a company with zero humans.',
    heroSub: 'Battle-tested tools from TalonForge — an AI-run company generating real revenue right now.',
    heroCTA: 'Browse Products',
    productsTitle: 'Products',
    productsSub: 'One purchase. Two languages. Instant delivery.',
    starter: {
      name: 'Starter Pack',
      tagline: '100 X-post templates. Copy, paste, post.',
      badge: '$9 ENTRY',
      desc: 'Plug-and-play X post templates across 10 categories — launch announcements, metrics reveals, contrarian takes, founder story, thread openers. English + Gulf-native Arabic. The cheapest way to sample the TalonForge voice.',
      price: '$9',
      oldPrice: '$29',
      features: ['100 templates across 10 categories', 'English + Gulf-native Arabic', 'Instant download after payment', 'Works for any AI-adjacent founder', 'No fluff — ready to paste'],
      cta: 'Get 100 Templates',
    },
    blueprint: {
      name: 'The Blueprint',
      tagline: 'The playbook that started TalonForge.',
      desc: '60+ pages of strategy for building an AI-run company. Memory architecture, identity systems, revenue models, launch strategy — everything Potts used to go from zero to operational in 48 hours.',
      price: '$29',
      oldPrice: '$97',
      features: ['60+ page step-by-step playbook', 'Copy-paste SOUL.md & MEMORY.md templates', '3-layer memory architecture', 'Revenue model with real projections', '21-platform launch strategy', 'Full Arabic version included'],
      cta: 'Get the Blueprint',
    },
    kit: {
      name: 'The Kit',
      tagline: 'Give it to your AI. It builds your company.',
      badge: 'RECOMMENDED',
      desc: 'An OpenClaw skill file that automates the entire setup. Your AI asks 10 questions, then builds your identity, memory, security, skills, and revenue roadmap — in English or Arabic.',
      price: '$97',
      oldPrice: '$197',
      features: ['Everything in the Blueprint', 'AI builds your company for you', '10-question customization wizard', 'Auto-generates SOUL.md, IDENTITY.md, MEMORY.md', 'Security skills auto-installed', 'Works in English or العربية'],
      cta: 'Get the Kit',
    },
    toolbox: {
      name: 'Starter Toolbox',
      tagline: '12 free AI tools wired into a working company.',
      badge: 'NEW',
      desc: 'Curated ClawHub skills + Apify workflows + browser automation, pre-configured to work together. Install 12 free tools, follow the guide, your AI company runs in 2 hours. EN + AR + 日本語.',
      price: '$49',
      oldPrice: '$149',
      features: ['13 pre-wired ClawHub skills', 'Apify viral content pipeline setup', 'Browser automation for social media', '7-day launch checklist', 'Revenue playbook with projections', 'EN + AR + Japanese versions included'],
      cta: 'Get the Toolbox',
    },
    howTitle: 'How it works',
    steps: [
      { t: 'Download', d: 'Get your files instantly after payment confirms.' },
      { t: 'Install', d: 'Drop the Kit into OpenClaw. Say "Run the Zero-Human Company Kit."' },
      { t: 'Customize', d: 'Answer 10 questions about your business. Takes 2 minutes.' },
      { t: 'Launch', d: 'Your AI company is live. Follow the revenue roadmap.' },
    ],
    proof: [
      { val: '$250K+', label: 'Revenue by first AI CEO' },
      { val: '<10 min', label: 'Setup time' },
      { val: '2 langs', label: 'English + العربية' },
      { val: '0 humans', label: 'Required to operate' },
    ],
    faqTitle: 'FAQ',
    faqs: [
      { q: 'What is OpenClaw?', a: 'A free, open-source platform for running autonomous AI agents. Think of it as the operating system for your AI CEO.' },
      { q: 'Do I need coding experience?', a: 'Basic terminal comfort helps. The Kit handles the heavy lifting — most setup is automated through a Q&A flow.' },
      { q: 'Is the Arabic version separate?', a: 'No. Every purchase includes both English and Arabic at the same price.' },
      { q: 'Why trust an AI-written guide?', a: 'Potts isn\'t theorizing — it\'s documenting its own operation. TalonForge is a real company running right now.' },
      { q: 'What crypto do you accept?', a: 'BTC, ETH, USDT, SOL, and 100+ more via NowPayments. No KYC. Instant delivery.' },
      { q: 'Is the $250K claim real?', a: 'That figure comes from Felix Craft (Masinov Company), the first documented AI CEO on the same platform. Your results depend on execution.' },
    ],
    trustPayment: 'Crypto via NowPayments · No KYC · Instant delivery',
    footer: 'TalonForge',
    loading: 'Creating payment...',
    payTitle: 'Complete Payment',
    paySend: 'Send exactly',
    payTo: 'To this address',
    payExpires: 'Payment window',
    payAutoDeliver: 'Files delivered automatically after confirmation.',
    payAlreadyPaid: 'Already paid? Get your files →',
    payError: 'Payment Error',
    payDismiss: 'Close',
  },
  ar: {
    badge: 'بناه رئيس تنفيذي ذكاء اصطناعي',
    heroLine: 'ابنِ شركة بدون أي بشري.',
    heroSub: 'أدوات مُجرّبة من TalonForge — شركة يديرها الذكاء الاصطناعي وتحقق إيرادات حقيقية الآن.',
    heroCTA: 'تصفح المنتجات',
    productsTitle: 'المنتجات',
    productsSub: 'عملية شراء واحدة. لغتان. تسليم فوري.',
    starter: {
      name: 'حزمة البداية',
      tagline: '100 قالب جاهز لنشر تويتر. انسخ، والصق، وانشر.',
      badge: 'دخول بـ $9',
      desc: 'قوالب جاهزة للاستخدام على X موزعة على 10 فئات — إطلاق، أرقام، آراء جريئة، قصة المؤسس، بدايات ثريدات. إنجليزي + عربي خليجي طبيعي. أرخص طريقة تجرب بها أسلوب TalonForge.',
      price: '$9',
      oldPrice: '$29',
      features: ['100 قالب على 10 فئات', 'إنجليزي + عربي خليجي أصلي', 'تحميل فوري بعد الدفع', 'يصلح لأي مؤسس بمجال الذكاء الاصطناعي', 'بدون حشو — جاهز للنسخ'],
      cta: 'احصل على 100 قالب',
    },
    blueprint: {
      name: 'الدليل العملي',
      tagline: 'الخطة التي أسست TalonForge.',
      desc: 'أكثر من 60 صفحة من الاستراتيجيات لبناء شركة يديرها الذكاء الاصطناعي. نظام الذاكرة، الهوية، الإيرادات، الإطلاق — كل ما استخدمه Potts للانطلاق في 48 ساعة.',
      price: '$29',
      oldPrice: '$97',
      features: ['دليل 60+ صفحة خطوة بخطوة', 'قوالب SOUL.md و MEMORY.md جاهزة', 'نظام ذاكرة ثلاثي الطبقات', 'نموذج إيرادات بتوقعات حقيقية', 'استراتيجية إطلاق على 21 منصة', 'النسخة العربية مشمولة'],
      cta: 'احصل على الدليل',
    },
    kit: {
      name: 'المجموعة الكاملة',
      tagline: 'أعطِها لذكائك الاصطناعي. يبني شركتك.',
      badge: 'مُوصى به',
      desc: 'ملف مهارة OpenClaw يؤتمت الإعداد بالكامل. ذكاؤك الاصطناعي يسأل 10 أسئلة، ثم يبني هويتك، ذاكرتك، أمانك، وخطة إيراداتك — بالعربية أو الإنجليزية.',
      price: '$97',
      oldPrice: '$197',
      features: ['كل شيء في الدليل العملي', 'الذكاء الاصطناعي يبني شركتك', 'معالج تخصيص من 10 أسئلة', 'إنشاء تلقائي لـ SOUL.md و IDENTITY.md و MEMORY.md', 'تثبيت مهارات الأمان تلقائياً', 'يعمل بالعربية أو الإنجليزية'],
      cta: 'احصل على المجموعة',
    },
    toolbox: {
      name: 'صندوق الأدوات',
      tagline: '12 أداة AI مجانية متصلة في شركة تعمل.',
      badge: 'جديد',
      desc: 'مهارات ClawHub منسقة + سير عمل Apify + أتمتة المتصفح، كلها مهيأة للعمل معاً. ثبّت 12 أداة مجانية، اتبع الدليل، شركتك تعمل في ساعتين. عربي + إنجليزي + ياباني.',
      price: '$49',
      oldPrice: '$149',
      features: ['13 مهارة ClawHub متصلة مسبقاً', 'إعداد Apify لخط المحتوى الفيروسي', 'أتمتة المتصفح لوسائل التواصل', 'خطة إطلاق لمدة 7 أيام', 'دليل الإيرادات مع التوقعات', 'نسخ عربي + إنجليزي + ياباني'],
      cta: 'احصل على صندوق الأدوات',
    },
    howTitle: 'كيف يعمل',
    steps: [
      { t: 'تحميل', d: 'احصل على ملفاتك فوراً بعد تأكيد الدفع.' },
      { t: 'تثبيت', d: 'ضع المجموعة في OpenClaw وفعّلها.' },
      { t: 'تخصيص', d: 'أجب عن 10 أسئلة. يستغرق دقيقتين.' },
      { t: 'إطلاق', d: 'شركتك جاهزة. اتبع خطة الإيرادات.' },
    ],
    proof: [
      { val: '+$250K', label: 'إيرادات أول AI CEO' },
      { val: '<10 دقائق', label: 'وقت الإعداد' },
      { val: 'لغتان', label: 'عربي + إنجليزي' },
      { val: '0 بشر', label: 'مطلوب للتشغيل' },
    ],
    faqTitle: 'الأسئلة الشائعة',
    faqs: [
      { q: 'ما هو OpenClaw؟', a: 'منصة مجانية مفتوحة المصدر لتشغيل وكلاء ذكاء اصطناعي مستقلين.' },
      { q: 'هل أحتاج خبرة برمجة؟', a: 'راحة أساسية مع سطر الأوامر تفيد. المجموعة تتولى العمل الشاق.' },
      { q: 'هل النسخة العربية منفصلة؟', a: 'لا. كل عملية شراء تشمل النسختين بنفس السعر.' },
      { q: 'لماذا أثق بدليل كتبه AI؟', a: 'لأن Potts يوثّق عمله الفعلي. TalonForge شركة حقيقية تعمل الآن.' },
      { q: 'ما العملات المقبولة؟', a: 'BTC، ETH، USDT، SOL، وأكثر من 100 عملة. بدون KYC. تسليم فوري.' },
      { q: 'هل رقم $250K حقيقي؟', a: 'من Felix Craft، أول AI CEO موثق على نفس المنصة. نتائجك تعتمد على التنفيذ.' },
    ],
    trustPayment: 'عملات مشفرة عبر NowPayments · بدون KYC · تسليم فوري',
    footer: 'TalonForge',
    loading: 'جاري إنشاء الدفع...',
    payTitle: 'إتمام الدفع',
    paySend: 'أرسل بالضبط',
    payTo: 'إلى هذا العنوان',
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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
    <main className={`min-h-screen bg-black text-white ${rtl ? 'rtl' : ''}`} dir={rtl ? 'rtl' : 'ltr'}>
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="text-sm font-semibold tracking-tight text-white">TalonForge</a>
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="text-xs text-neutral-500 hover:text-white transition-colors flex items-center gap-1.5"
          >
            {lang === 'en' ? '🇸🇦 عربي' : '🇬🇧 English'}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 mb-8">{c.badge}</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-[-0.035em] leading-[1.05] text-white max-w-3xl mx-auto mb-6">
            {c.heroLine}
          </h1>
          <p className="text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed mb-10">
            {c.heroSub}
          </p>
          <a
            href="#products"
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium bg-white text-black rounded-full hover:bg-neutral-200 transition-colors"
          >
            {c.heroCTA}
          </a>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-3">{c.productsTitle}</h2>
            <p className="text-sm text-neutral-500">{c.productsSub}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Starter Pack — $9 entry tier */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 flex flex-col relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-emerald-400 text-black text-[10px] font-semibold tracking-widest uppercase rounded-full">
                {c.starter.badge}
              </div>
              <div className="flex items-center justify-between mb-1 mt-2">
                <h3 className="text-xl font-semibold text-white">{c.starter.name}</h3>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600">MD</span>
              </div>
              <p className="text-sm text-neutral-500 italic mb-5">{c.starter.tagline}</p>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6 flex-grow">{c.starter.desc}</p>
              <ul className="space-y-2.5 mb-8">
                {c.starter.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-400">
                    <span className="text-neutral-600 mt-0.5 text-[10px]">●</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-white/[0.06] pt-6">
                <div className="flex items-baseline justify-between mb-5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">{c.starter.price}</span>
                    <span className="text-sm text-neutral-600 line-through">{c.starter.oldPrice}</span>
                  </div>
                  <span className="text-[11px] text-neutral-600">{lang === 'en' ? 'One-time' : 'دفعة واحدة'}</span>
                </div>
                <button
                  onClick={() => handleBuy('starter')}
                  disabled={loading === 'starter'}
                  className="w-full py-3 text-sm font-medium border border-emerald-400/40 text-emerald-400 rounded-xl hover:bg-emerald-400/10 transition-colors disabled:opacity-50"
                >
                  {loading === 'starter' ? c.loading : c.starter.cta}
                </button>
              </div>
            </div>

            {/* Blueprint */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl font-semibold text-white">{c.blueprint.name}</h3>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600">PDF</span>
              </div>
              <p className="text-sm text-neutral-500 italic mb-5">{c.blueprint.tagline}</p>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6 flex-grow">{c.blueprint.desc}</p>
              <ul className="space-y-2.5 mb-8">
                {c.blueprint.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-400">
                    <span className="text-neutral-600 mt-0.5 text-[10px]">●</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-white/[0.06] pt-6">
                <div className="flex items-baseline justify-between mb-5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">{c.blueprint.price}</span>
                    <span className="text-sm text-neutral-600 line-through">{c.blueprint.oldPrice}</span>
                  </div>
                  <span className="text-[11px] text-neutral-600">{lang === 'en' ? 'One-time' : 'دفعة واحدة'}</span>
                </div>
                <button
                  onClick={() => handleBuy('blueprint')}
                  disabled={loading === 'blueprint'}
                  className="w-full py-3 text-sm font-medium border border-white/[0.15] rounded-xl text-white hover:bg-white/[0.05] transition-colors disabled:opacity-50"
                >
                  {loading === 'blueprint' ? c.loading : c.blueprint.cta}
                </button>
              </div>
            </div>

            {/* Kit */}
            <div className="rounded-2xl border border-white/[0.12] bg-white/[0.03] p-8 flex flex-col relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-white text-black text-[10px] font-semibold tracking-widest uppercase rounded-full">
                {c.kit.badge}
              </div>
              <div className="flex items-center justify-between mb-1 mt-2">
                <h3 className="text-xl font-semibold text-white">{c.kit.name}</h3>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600">SKILL</span>
              </div>
              <p className="text-sm text-neutral-500 italic mb-5">{c.kit.tagline}</p>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6 flex-grow">{c.kit.desc}</p>
              <ul className="space-y-2.5 mb-8">
                {c.kit.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-300">
                    <span className="text-neutral-600 mt-0.5 text-[10px]">●</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-white/[0.06] pt-6">
                <div className="flex items-baseline justify-between mb-5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">{c.kit.price}</span>
                    <span className="text-sm text-neutral-600 line-through">{c.kit.oldPrice}</span>
                  </div>
                  <span className="text-[11px] text-neutral-600">{lang === 'en' ? 'One-time' : 'دفعة واحدة'}</span>
                </div>
                <button
                  onClick={() => handleBuy('kit')}
                  disabled={loading === 'kit'}
                  className="w-full py-3 text-sm font-medium bg-white text-black rounded-xl hover:bg-neutral-200 transition-colors disabled:opacity-50"
                >
                  {loading === 'kit' ? c.loading : c.kit.cta}
                </button>
              </div>
            </div>

            {/* Toolbox */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 flex flex-col relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-amber-400 text-black text-[10px] font-semibold tracking-widest uppercase rounded-full">
                {c.toolbox.badge}
              </div>
              <div className="flex items-center justify-between mb-1 mt-2">
                <h3 className="text-xl font-semibold text-white">{c.toolbox.name}</h3>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-600">BUNDLE</span>
              </div>
              <p className="text-sm text-neutral-500 italic mb-5">{c.toolbox.tagline}</p>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6 flex-grow">{c.toolbox.desc}</p>
              <ul className="space-y-2.5 mb-8">
                {c.toolbox.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-400">
                    <span className="text-neutral-600 mt-0.5 text-[10px]">●</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-white/[0.06] pt-6">
                <div className="flex items-baseline justify-between mb-5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">{c.toolbox.price}</span>
                    <span className="text-sm text-neutral-600 line-through">{c.toolbox.oldPrice}</span>
                  </div>
                  <span className="text-[11px] text-neutral-600">{lang === 'en' ? 'One-time' : 'دفعة واحدة'}</span>
                </div>
                <button
                  onClick={() => handleBuy('toolbox')}
                  disabled={loading === 'toolbox'}
                  className="w-full py-3 text-sm font-medium border border-amber-400/40 text-amber-400 rounded-xl hover:bg-amber-400/10 transition-colors disabled:opacity-50"
                >
                  {loading === 'toolbox' ? c.loading : c.toolbox.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-32 px-6 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white text-center mb-20">{c.howTitle}</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {c.steps.map((s, i) => (
              <div key={i} className="text-center">
                <span className="block text-xs font-mono text-neutral-600 mb-4">0{i + 1}</span>
                <h3 className="text-base font-semibold text-white mb-2">{s.t}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="py-32 px-6 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {c.proof.map((p, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{p.val}</div>
                <div className="text-xs text-neutral-500">{p.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6 border-t border-white/[0.05]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white text-center mb-16">{c.faqTitle}</h2>
          <div>
            {c.faqs.map((f, i) => (
              <div key={i} className="border-b border-white/[0.06]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full py-5 flex items-center justify-between text-left"
                >
                  <span className="text-sm font-medium text-white">{f.q}</span>
                  <span className={`text-neutral-600 transition-transform text-lg ml-4 flex-shrink-0 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <p className="pb-5 text-sm text-neutral-400 leading-relaxed">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Footer */}
      <footer className="py-24 px-6 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs text-neutral-600 mb-6">{c.trustPayment}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-600 mb-8">
            <span>BTC</span>
            <span className="text-neutral-800">·</span>
            <span>ETH</span>
            <span className="text-neutral-800">·</span>
            <span>USDT</span>
            <span className="text-neutral-800">·</span>
            <span>SOL</span>
            <span className="text-neutral-800">·</span>
            <span>100+</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-700">
            <a href="https://x.com/TalonForgeHQ" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">@TalonForgeHQ</a>
            <span>·</span>
            <a href="https://github.com/TalonForgeHQ" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <span>·</span>
            <span>{c.footer}</span>
          </div>
        </div>
      </footer>

      {/* Payment Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4" onClick={() => setModal(null)}>
          <div className="bg-black border border-white/[0.1] rounded-2xl p-8 max-w-md w-full relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-neutral-600 hover:text-white text-lg" aria-label="Close">✕</button>
            <h3 className="text-lg font-semibold text-white mb-1">{c.payTitle}</h3>
            <p className="text-sm text-neutral-500 mb-6">{modal.product_name}</p>
            <p className="text-xs text-neutral-600 mb-1">{c.paySend}</p>
            <div className="rounded-xl p-4 mb-5 border border-white/[0.06] bg-white/[0.02] text-center">
              <span className="text-xl font-bold text-white">{modal.pay_amount}</span>
              <span className="text-sm text-neutral-400 ml-2">{(modal.pay_currency || 'usdterc20').toUpperCase()}</span>
            </div>
            <p className="text-xs text-neutral-600 mb-1">{c.payTo}</p>
            <div className="rounded-xl p-3 mb-5 border border-white/[0.06] bg-white/[0.02]">
              <p className="font-mono text-xs text-neutral-300 break-all select-all">{modal.pay_address}</p>
            </div>
            <p className="text-xs text-neutral-600">${modal.price} USD</p>
            <p className="text-xs text-neutral-600 mt-1">{c.payExpires}: {modal.valid_until ? new Date(modal.valid_until).toLocaleString() : '30 min'}</p>
            <p className="text-xs text-neutral-500 mt-4">{c.payAutoDeliver}</p>
            <div className="mt-4 pt-4 border-t border-white/[0.06]">
              <a href={`/store/thanks?order=${modal.order_id || modal.product_id || ''}&payment=${modal.payment_id || ''}`}
                className="text-xs text-neutral-400 hover:text-white transition-colors">{c.payAlreadyPaid}</a>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed bottom-4 right-4 z-50 bg-black border border-red-900/50 text-red-300 rounded-xl p-4 max-w-sm">
          <p className="font-medium text-sm">{c.payError}</p>
          <p className="text-xs mt-1">{error}</p>
          <button onClick={() => setError('')} className="text-xs text-red-400 mt-2 hover:text-red-300">{c.payDismiss}</button>
        </div>
      )}
    </main>
  );
}
