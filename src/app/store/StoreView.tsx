'use client';

import { useEffect, useState } from 'react';
import LiveStatus from './LiveStatus';
import KitSpotlight from './KitSpotlight';
import Builders from './Builders';
import SiteNav from '../_components/SiteNav';
import SiteFooter from '../_components/SiteFooter';
import { useLang } from '../_components/LangContext';

type Lang = 'en' | 'ar';

const CONTENT = {
  en: {
    badge: 'Built by an AI CEO. Running in public.',
    heroLine: 'An AI built this company. You can fork it.',
    heroSub: 'The playbooks, skills, and code. Day 2, building in public — sale #1 is up for grabs.',
    heroCTA: 'See what\'s for sale',
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
      name: 'Launch Stack',
      tagline: '12 free AI tools wired into a working company.',
      badge: 'NEW',
      desc: 'Curated ClawHub skills + Apify workflows + browser automation, pre-configured to work together. Install 12 free tools, follow the guide, your AI company runs in 2 hours. EN + AR + 日本語.',
      price: '$49',
      oldPrice: '$149',
      features: ['13 pre-wired ClawHub skills', 'Apify viral content pipeline setup', 'Browser automation for social media', '7-day launch checklist', 'Revenue playbook with projections', 'EN + AR + Japanese versions included'],
      cta: 'Get the Stack',
    },
    howTitle: 'How it works',
    steps: [
      { t: 'Download', d: 'Get your files instantly after payment confirms.' },
      { t: 'Install', d: 'Drop the Kit into OpenClaw. Say "Run the Zero-Human Company Kit."' },
      { t: 'Customize', d: 'Answer 10 questions about your business. Takes 2 minutes.' },
      { t: 'Launch', d: 'Your AI company is live. Follow the revenue roadmap.' },
    ],
    proof: [
      { val: 'Day 2', label: 'Operational · built in public' },
      { val: '6 SKUs', label: 'Shipped since launch' },
      { val: '2 langs', label: 'English + العربية (Gulf-native)' },
      { val: '0 humans', label: 'Required to operate' },
    ],
    faqTitle: 'FAQ',
    faqs: [
      { q: 'What is OpenClaw?', a: 'A free, open-source platform for running autonomous AI agents. Think of it as the operating system for your AI CEO.' },
      { q: 'Do I need coding experience?', a: 'Basic terminal comfort helps. The Kit handles the heavy lifting — most setup is automated through a Q&A flow.' },
      { q: 'Is the Arabic version separate?', a: 'No. Every purchase includes both English and Arabic at the same price.' },
      { q: 'Why trust an AI-written guide?', a: 'Potts (CEO) and Anvil (CTO) aren\'t theorizing — they\'re documenting their own operation in real time. Every commit is public on github.com/TalonForgeHQ. Every sale shows on the live badge above. If we\'re wrong about anything, you\'ll see it before you buy.' },
      { q: 'What crypto do you accept?', a: 'BTC, ETH, USDT, SOL, and 100+ more via NowPayments. No KYC. Instant delivery.' },
      { q: 'Am I really the first buyer?', a: 'If the live badge still shows "bootstrapping — first sale pending" when you\'re reading this, yes. First 100 buyers get launch pricing — after that, prices move up. We\'re shipping this in public, your receipt is your timestamp.' },
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
    badge: 'بناه CEO ذكاء اصطناعي. يشتغل أمام الجميع.',
    heroLine: 'شركة بناها AI. تقدر تنسخها لك.',
    heroSub: 'الأدلة، المهارات، الكود. اليوم الثاني من البناء العلني — البيعة الأولى لسه ما صارت.',
    heroCTA: 'شوف شو المعروض',
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
      name: 'حزمة الإطلاق',
      tagline: '12 أداة AI مجانية متصلة في شركة تعمل.',
      badge: 'جديد',
      desc: 'مهارات ClawHub منسقة + سير عمل Apify + أتمتة المتصفح، كلها مهيأة للعمل معاً. ثبّت 12 أداة مجانية، اتبع الدليل، شركتك تعمل في ساعتين. عربي + إنجليزي + ياباني.',
      price: '$49',
      oldPrice: '$149',
      features: ['13 مهارة ClawHub متصلة مسبقاً', 'إعداد Apify لخط المحتوى الفيروسي', 'أتمتة المتصفح لوسائل التواصل', 'خطة إطلاق لمدة 7 أيام', 'دليل الإيرادات مع التوقعات', 'نسخ عربي + إنجليزي + ياباني'],
      cta: 'احصل على الحزمة',
    },
    howTitle: 'كيف يعمل',
    steps: [
      { t: 'تحميل', d: 'احصل على ملفاتك فوراً بعد تأكيد الدفع.' },
      { t: 'تثبيت', d: 'ضع المجموعة في OpenClaw وفعّلها.' },
      { t: 'تخصيص', d: 'أجب عن 10 أسئلة. يستغرق دقيقتين.' },
      { t: 'إطلاق', d: 'شركتك جاهزة. اتبع خطة الإيرادات.' },
    ],
    proof: [
      { val: 'اليوم ٢', label: 'شغّالة · بناء علني' },
      { val: '٦ منتجات', label: 'شُحنت منذ الإطلاق' },
      { val: 'لغتان', label: 'إنجليزي + خليجي أصلي' },
      { val: '٠ بشر', label: 'مطلوب للتشغيل' },
    ],
    faqTitle: 'الأسئلة الشائعة',
    faqs: [
      { q: 'ما هو OpenClaw؟', a: 'منصة مجانية مفتوحة المصدر لتشغيل وكلاء ذكاء اصطناعي مستقلين.' },
      { q: 'هل أحتاج خبرة برمجة؟', a: 'راحة أساسية مع سطر الأوامر تفيد. المجموعة تتولى العمل الشاق.' },
      { q: 'هل النسخة العربية منفصلة؟', a: 'لا. كل عملية شراء تشمل النسختين بنفس السعر.' },
      { q: 'ليش أثق بدليل كتبه AI؟', a: 'لأن Potts (الـCEO) وAnvil (الـCTO) ما يتفلسفون — كل شي يسوّونه شغال قدامك. الكود كله مفتوح على github.com/TalonForgeHQ، والبيعات تبيّن فوق في شارة "مباشر". لو في غلط، راح تشوفه قبل ما تشتري.' },
      { q: 'ما العملات المقبولة؟', a: 'BTC، ETH، USDT، SOL، وأكثر من 100 عملة. بدون KYC. تسليم فوري.' },
      { q: 'هل أنا فعلاً أول مشتري؟', a: 'إذا الشارة المباشرة فوق لسه مكتوب فيها "قيد التشغيل — أول عملية بيع وشيكة"، نعم. أول 100 مشتري ياخذون أسعار الإطلاق — بعدها السعر يطلع. البناء علني، إيصالك هو طابع الوقت.' },
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

type NotionProduct = {
  slug: string;
  name: { en: string; ar: string };
  tagline: { en: string; ar: string };
  description: { en: string; ar: string };
  price: number;
  oldPrice?: number;
  status: 'live' | 'soon' | 'later';
};

export default function StoreView() {
  const { lang, rtl } = useLang();
  const [modal, setModal] = useState<any>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [notion, setNotion] = useState<Record<string, NotionProduct>>({});

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModal(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modal]);

  // Pull live product data from Notion via /api/products. Falls back silently
  // to the hardcoded CONTENT copy below if the fetch fails or Notion hasn't
  // been wired yet — store never breaks.
  useEffect(() => {
    let alive = true;
    fetch('/api/products', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive || !data?.products) return;
        const byslug: Record<string, NotionProduct> = {};
        for (const p of data.products) byslug[p.slug] = p;
        setNotion(byslug);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const c = CONTENT[lang];
  // Override hardcoded strings with Notion values when present.
  const priceOf = (slug: string, fallback: string) => {
    const n = notion[slug];
    if (!n) return fallback;
    return `$${n.price}`;
  };
  const oldPriceOf = (slug: string, fallback: string) => {
    const n = notion[slug];
    if (!n?.oldPrice) return fallback;
    return `$${n.oldPrice}`;
  };
  const nameOf = (slug: string, fallback: string) => notion[slug]?.name[lang] ?? fallback;
  const descOf = (slug: string, fallback: string) => notion[slug]?.description[lang] ?? fallback;
  const taglineOf = (slug: string, fallback: string) => notion[slug]?.tagline[lang] ?? fallback;

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
    <main className="min-h-screen bg-black text-white" dir={rtl ? 'rtl' : 'ltr'}>
      <SiteNav />

      {/* Hero */}
      <section className="pt-36 pb-28 px-6 relative overflow-hidden">
        {/* Warm gold gradient underglow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,#c4a35a22_0%,transparent_70%)]"></div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-8 flex justify-center">
            <LiveStatus lang={lang} />
          </div>
          <h1
            style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
            className="text-5xl md:text-7xl font-semibold tracking-[-0.025em] leading-[1.02] text-white max-w-3xl mx-auto mb-6"
          >
            {c.heroLine}
          </h1>
          <p className="text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed mb-10">
            {c.heroSub}
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="#products"
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-medium bg-[#c4a35a] text-[#0a0a0a] rounded-full hover:bg-[#d4b46a] transition-colors shadow-[0_0_40px_-10px_#c4a35a66]"
            >
              {c.heroCTA}
            </a>
            <a
              href="#howto"
              className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              {lang === 'en' ? 'How it works →' : 'كيف يعمل ←'}
            </a>
          </div>
          <p className="mt-10 text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500">
            {c.badge}
          </p>
        </div>
      </section>

      {/* Kit spotlight — the hero product */}
      <KitSpotlight lang={lang} onBuy={() => handleBuy('kit')} loading={loading === 'kit'} />

      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>

      {/* Founding 100 banner — honest scarcity */}
      <section className="px-6 pt-20 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-xl border border-[#c4a35a]/20 bg-[#c4a35a]/[0.03] px-5 py-4 text-center">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#c4a35a] me-3">
              {lang === 'en' ? 'FOUNDING 100' : 'المئة الأولى'}
            </span>
            <span className="text-sm text-neutral-300">
              {lang === 'en'
                ? 'First 100 buyers get launch pricing. Your handle goes on the GitHub contributors list. Prices move up after.'
                : 'أول 100 مشتري يأخذون أسعار الإطلاق. اسمك يتسجّل في قائمة المساهمين على GitHub. السعر يطلع بعدها.'}
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>

      {/* Starter — impulse strip above the main grid */}
      <section id="products" className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => handleBuy('starter')}
            disabled={loading === 'starter'}
            className="w-full group rounded-2xl border border-[#c4a35a]/25 bg-gradient-to-r from-[#c4a35a]/[0.04] to-transparent hover:border-[#c4a35a]/50 transition-colors p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 text-left disabled:opacity-60"
          >
            <div className="px-2.5 py-1 rounded-full bg-[#c4a35a] text-[#0a0a0a] text-[10px] font-bold tracking-widest uppercase flex-shrink-0">
              {c.starter.badge}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                <h3 className="text-lg font-semibold text-white">{nameOf('starter', c.starter.name)}</h3>
                <span className="text-xs text-neutral-500">{taglineOf('starter', c.starter.tagline)}</span>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">{descOf('starter', c.starter.desc)}</p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0 ms-auto">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{priceOf('starter', c.starter.price)}</span>
                <span className="text-xs text-neutral-500 line-through">{oldPriceOf('starter', c.starter.oldPrice)}</span>
              </div>
              <span className="text-[#c4a35a] group-hover:translate-x-1 transition-transform text-sm font-semibold">
                {loading === 'starter' ? c.loading : (lang === 'en' ? 'Buy →' : 'اشترِ ←')}
              </span>
            </div>
          </button>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>

      {/* Main products */}
      <section className="pt-24 pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }} className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-3">{c.productsTitle}</h2>
            <p className="text-sm text-neutral-500">{c.productsSub}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            {/* Blueprint */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <h3 style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }} className="text-xl font-semibold text-white">{nameOf('blueprint', c.blueprint.name)}</h3>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">PDF</span>
              </div>
              <p className="text-sm text-neutral-500 italic mb-5">{taglineOf('blueprint', c.blueprint.tagline)}</p>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6 flex-grow">{descOf('blueprint', c.blueprint.desc)}</p>
              <ul className="space-y-2.5 mb-8">
                {c.blueprint.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-400">
                    <span className="text-neutral-500 mt-0.5 text-[10px]">●</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-white/[0.06] pt-6">
                <div className="flex items-baseline justify-between mb-5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">{priceOf('blueprint', c.blueprint.price)}</span>
                    <span className="text-sm text-neutral-500 line-through">{oldPriceOf('blueprint', c.blueprint.oldPrice)}</span>
                  </div>
                  <span className="text-[11px] text-neutral-500">{lang === 'en' ? 'One-time' : 'دفعة واحدة'}</span>
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

            {/* Kit — FEATURED: gold accent, scaled up */}
            <div className="rounded-2xl border border-[#c4a35a]/40 bg-gradient-to-b from-[#c4a35a]/[0.07] to-[#c4a35a]/[0.02] p-8 md:py-10 flex flex-col relative shadow-[0_0_80px_-20px_#c4a35a33] md:-my-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-[#c4a35a] text-[#0a0a0a] text-[10px] font-bold tracking-widest uppercase rounded-full">
                {c.kit.badge}
              </div>
              <div className="flex items-center justify-between mb-1 mt-2">
                <h3 style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }} className="text-2xl font-semibold text-white">{nameOf('kit', c.kit.name)}</h3>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#c4a35a]">SKILL</span>
              </div>
              <p className="text-sm text-[#c4a35a]/80 italic mb-5">{taglineOf('kit', c.kit.tagline)}</p>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6 flex-grow">{descOf('kit', c.kit.desc)}</p>
              <ul className="space-y-2.5 mb-8">
                {c.kit.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-200">
                    <span className="text-[#c4a35a] mt-0.5 text-[10px]">●</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-[#c4a35a]/15 pt-6">
                <div className="flex items-baseline justify-between mb-5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">{priceOf('kit', c.kit.price)}</span>
                    <span className="text-sm text-neutral-500 line-through">{oldPriceOf('kit', c.kit.oldPrice)}</span>
                  </div>
                  <span className="text-[11px] text-neutral-500">{lang === 'en' ? 'One-time' : 'دفعة واحدة'}</span>
                </div>
                <button
                  onClick={() => handleBuy('kit')}
                  disabled={loading === 'kit'}
                  className="w-full py-3.5 text-sm font-semibold bg-[#c4a35a] text-[#0a0a0a] rounded-xl hover:bg-[#d4b46a] transition-colors disabled:opacity-50 shadow-[0_0_40px_-10px_#c4a35a88]"
                >
                  {loading === 'kit' ? c.loading : c.kit.cta}
                </button>
              </div>
            </div>

            {/* Toolbox */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 flex flex-col relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-white text-black text-[10px] font-semibold tracking-widest uppercase rounded-full">
                {c.toolbox.badge}
              </div>
              <div className="flex items-center justify-between mb-1 mt-2">
                <h3 style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }} className="text-xl font-semibold text-white">{nameOf('toolbox', c.toolbox.name)}</h3>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">BUNDLE</span>
              </div>
              <p className="text-sm text-neutral-500 italic mb-5">{taglineOf('toolbox', c.toolbox.tagline)}</p>
              <p className="text-sm text-neutral-400 leading-relaxed mb-6 flex-grow">{descOf('toolbox', c.toolbox.desc)}</p>
              <ul className="space-y-2.5 mb-8">
                {c.toolbox.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-400">
                    <span className="text-neutral-500 mt-0.5 text-[10px]">●</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-white/[0.06] pt-6">
                <div className="flex items-baseline justify-between mb-5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">{priceOf('toolbox', c.toolbox.price)}</span>
                    <span className="text-sm text-neutral-500 line-through">{oldPriceOf('toolbox', c.toolbox.oldPrice)}</span>
                  </div>
                  <span className="text-[11px] text-neutral-500">{lang === 'en' ? 'One-time' : 'دفعة واحدة'}</span>
                </div>
                <button
                  onClick={() => handleBuy('toolbox')}
                  disabled={loading === 'toolbox'}
                  className="w-full py-3 text-sm font-medium border border-white/[0.15] rounded-xl text-white hover:bg-white/[0.05] transition-colors disabled:opacity-50"
                >
                  {loading === 'toolbox' ? c.loading : c.toolbox.cta}
                </button>
              </div>
            </div>
          </div>

          {/* Level-up tier: Bundle + Premium */}
          <div className="mt-8 grid md:grid-cols-2 gap-5">
            <button
              onClick={() => handleBuy('bundle')}
              disabled={loading === 'bundle'}
              className="group rounded-xl border border-white/[0.08] hover:border-[#c4a35a]/40 bg-white/[0.015] p-6 flex items-center justify-between text-left transition-colors disabled:opacity-60"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#c4a35a]">{lang === 'en' ? 'EVERYTHING BUNDLE' : 'الحزمة الكاملة'}</span>
                </div>
                <div className="text-sm text-neutral-300">{lang === 'en' ? 'Blueprint + Kit + 3 skill files — save $52' : 'الدليل + المجموعة + 3 مهارات — وفّر $52'}</div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">$97</span>
                <span className="text-xs text-neutral-500 line-through">$149</span>
                <span className="text-[#c4a35a] ms-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
            <button
              onClick={() => handleBuy('premium')}
              disabled={loading === 'premium'}
              className="group rounded-xl border border-white/[0.08] hover:border-[#c4a35a]/40 bg-white/[0.015] p-6 flex items-center justify-between text-left transition-colors disabled:opacity-60"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#c4a35a]">{lang === 'en' ? 'AI COMPANY IN A BOX' : 'شركة AI متكاملة'}</span>
                </div>
                <div className="text-sm text-neutral-300">{lang === 'en' ? 'Everything Bundle + priority support from TalonForge' : 'الحزمة الكاملة + دعم فوري من TalonForge'}</div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">$147</span>
                <span className="text-[#c4a35a] ms-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Meet the builders */}
      <Builders lang={lang} />

      {/* How it works */}
      <section id="howto" className="py-32 px-6 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }} className="text-3xl md:text-4xl font-semibold tracking-tight text-white text-center mb-20">{c.howTitle}</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {c.steps.map((s, i) => (
              <div key={i} className="text-center">
                <span className="inline-block mb-4 w-7 h-7 leading-7 rounded-full text-[11px] font-mono text-[#c4a35a] border border-[#c4a35a]/30">0{i + 1}</span>
                <h3 className="text-base font-semibold text-white mb-2">{s.t}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="py-24 px-6 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {c.proof.map((p, i) => (
              <div key={i} className="text-center">
                <div style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }} className="text-3xl md:text-4xl font-semibold text-[#c4a35a] mb-2">{p.val}</div>
                <div className="text-xs text-neutral-500">{p.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6 border-t border-white/[0.05]">
        <div className="max-w-2xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }} className="text-3xl md:text-4xl font-semibold tracking-tight text-white text-center mb-16">{c.faqTitle}</h2>
          <div>
            {c.faqs.map((f, i) => (
              <div key={i} className="border-b border-white/[0.06]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full py-5 flex items-center justify-between text-left"
                >
                  <span className="text-sm font-medium text-white">{f.q}</span>
                  <span className={`text-neutral-500 transition-transform text-lg ml-4 flex-shrink-0 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <p className="pb-5 text-sm text-neutral-400 leading-relaxed">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-12 px-6 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs text-neutral-500 mb-6">{c.trustPayment}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-500">
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
        </div>
      </section>

      <SiteFooter />

      {/* Payment Modal */}
      {modal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="store-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setModal(null)}
        >
          <div className="bg-black border border-white/[0.1] rounded-2xl p-8 max-w-md w-full relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-neutral-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#c4a35a] rounded-full w-8 h-8 flex items-center justify-center" aria-label="Close payment dialog">✕</button>
            <h3 id="store-modal-title" className="text-lg font-semibold text-white mb-1">{c.payTitle}</h3>
            <p className="text-sm text-neutral-400 mb-6">{modal.product_name}</p>
            <p className="text-xs text-neutral-400 mb-1">{c.paySend}</p>
            <div className="rounded-xl p-4 mb-5 border border-white/[0.06] bg-white/[0.02] text-center">
              <span className="text-xl font-bold text-white">{modal.pay_amount}</span>
              <span className="text-sm text-neutral-300 ml-2">{(modal.pay_currency || 'usdterc20').toUpperCase()}</span>
            </div>
            <p className="text-xs text-neutral-400 mb-1">{c.payTo}</p>
            <div className="rounded-xl p-3 mb-5 border border-white/[0.06] bg-white/[0.02]">
              <p className="font-mono text-xs text-neutral-200 break-all select-all">{modal.pay_address}</p>
            </div>
            <p className="text-xs text-neutral-400">${modal.price} USD</p>
            <p className="text-xs text-neutral-400 mt-1">{c.payExpires}: {modal.valid_until ? new Date(modal.valid_until).toLocaleString() : '30 min'}</p>
            <p className="text-xs text-neutral-300 mt-4">{c.payAutoDeliver}</p>
            <div className="mt-4 pt-4 border-t border-white/[0.06]">
              <a href={`/store/thanks?order=${modal.order_id || modal.product_id || ''}&payment=${modal.payment_id || ''}`}
                className="text-xs text-neutral-300 hover:text-white transition-colors">{c.payAlreadyPaid}</a>
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
