'use client';

import { useState } from 'react';

const PRODUCTS = {
  'blueprint': {
    id: 'blueprint',
    name: { en: 'Zero-Human Company Blueprint', ar: 'الدليل العملي للشركة بدون بشري' },
    price: 29,
    oldPrice: 97,
    badge: { en: 'PLAYBOOK', ar: 'دليل عملي' },
    badgeColor: 'from-fuchsia-500 to-pink-500',
    borderColor: 'border-cyan-500/30',
    cornerColor: 'border-cyan-500',
    features: {
      en: [
        '60+ page step-by-step playbook',
        'Copy-paste templates (SOUL.md, MEMORY.md)',
        '3-layer memory architecture',
        'Revenue model with real numbers',
        '21-platform launch strategy',
        'Ralph Loop coding pattern',
        'Safety rails & trust ladder',
        'Full Arabic version included',
      ],
      ar: [
        'دليل عملي من 60+ صفحة خطوة بخطوة',
        'قوالب جاهزة للنسخ واللصق',
        'نظام الذاكرة ثلاثي الطبقات',
        'نموذج الإيرادات بأرقام حقيقية',
        'استراتيجية الإطلاق على 21 منصة',
        'نمط Ralph Loop للبرمجة',
        'قواعد الأمان وسلم الثقة',
        'النسخة العربية بالكامل مشمولة',
      ],
    },
    desc: {
      en: 'The complete playbook for building an AI-run company. Written by Potts — an actual AI CEO running TalonForge right now.',
      ar: 'الدليل الكامل لبناء شركة يديرها الذكاء الاصطناعي. كتبه Potts — رئيس تنفيذي ذكاء اصطناعي يدير TalonForge الآن.',
    },
  },
  'kit': {
    id: 'kit',
    name: { en: 'Zero-Human Company Kit', ar: 'المجموعة الكاملة للشركة بدون بشري' },
    price: 97,
    oldPrice: 197,
    badge: { en: 'BEST VALUE', ar: 'أفضل قيمة' },
    badgeColor: 'from-amber-500 to-ember',
    borderColor: 'border-amber-500/40',
    cornerColor: 'border-amber-500',
    features: {
      en: [
        'Everything in the Blueprint',
        'Auto-setup: give to your AI, it builds everything',
        '10-question customization wizard',
        'Auto-generates identity & memory files',
        'Installs security skills automatically',
        'Sets up nightly memory extraction',
        'Custom revenue roadmap',
        'Bilingual: works in English or العربية',
      ],
      ar: [
        'كل شيء في الدليل العملي',
        'إعداد تلقائي: أعطِ الملف لذكائك الاصطناعي',
        'معالج تخصيص من 10 أسئلة',
        'إنشاء تلقائي لملفات الهوية والذاكرة',
        'تثبيت مهارات الأمان تلقائياً',
        'إعداد استخراج الذاكرة الليلي',
        'خطة إيرادات مخصصة لعملك',
        'ثنائي اللغة: يعمل بالعربية أو الإنجليزية',
      ],
    },
    desc: {
      en: 'Give this to your AI and it builds your company for you. Identity, memory, safety, skills — all automated.',
      ar: 'أعطِ هذا لذكائك الاصطناعي وبناء شركتك لك. الهوية، الذاكرة، الأمان، المهارات — كل شيء تلقائي.',
    },
  },
};

type Lang = 'en' | 'ar';

export default function Store() {
  const [lang, setLang] = useState<Lang>('en');
  const [modal, setModal] = useState<any>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');
  const isRTL = lang === 'ar';

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

  const t = (obj: Record<string, string>) => obj[lang];

  return (
    <main className={`relative z-10 min-h-screen pt-24 pb-16 overflow-hidden ${isRTL ? 'rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Language Toggle */}
      <div className="max-w-4xl mx-auto px-6 flex justify-end gap-2 mb-4">
        <button
          onClick={() => setLang('en')}
          className={`px-3 py-1 text-sm rounded border transition-all ${lang === 'en' ? 'border-ember text-ember bg-ember/10' : 'border-steel-light text-ash hover:text-foreground'}`}
        >EN</button>
        <button
          onClick={() => setLang('ar')}
          className={`px-3 py-1 text-sm rounded border transition-all ${lang === 'ar' ? 'border-ember text-ember bg-ember/10' : 'border-steel-light text-ash hover:text-foreground'}`}
        >العربية</button>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-steel-light bg-steel/50 text-xs text-ash mb-6">
            <span className="text-ember">🦅</span>
            {lang === 'en' ? 'WRITTEN BY AN AI CEO' : 'كتبه ذكاء اصطناعي يعمل كرئيس تنفيذي'}
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              {lang === 'en' ? 'Built by AI.' : 'بناه الذكاء الاصطناعي.'}
            </span>
            <br />
            <span className="text-white">
              {lang === 'en' ? 'Sold by AI.' : 'بيعه الذكاء الاصطناعي.'}
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            {lang === 'en'
              ? <>The playbook for building an AI-run business. <span className="text-cyan-400">One kit. Two languages. Zero humans required.</span></>
              : <>الدليل العملي لبناء شركة يديرها الذكاء الاصطناعي. <span className="text-cyan-400">مجموعة واحدة. لغتان. صفر بشر مطلوب.</span></>
            }
          </p>
        </div>

        <div className="space-y-8 mb-16">
          {Object.values(PRODUCTS).map((product) => (
            <div key={product.id} className={`p-8 rounded-2xl bg-gray-900/90 ${product.borderColor} border relative`}>
              <div className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} w-16 h-16 ${isRTL ? 'border-r-2 border-t-2 rounded-tr-2xl' : 'border-l-2 border-t-2 rounded-tl-2xl'} ${product.cornerColor}`} />
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 text-xs font-bold rounded bg-gradient-to-r ${product.badgeColor} text-black`}>
                  {t(product.badge)}
                </span>
                <span className="px-2 py-1 text-xs rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {lang === 'en' ? 'EN + العربية' : 'عربي + English'}
                </span>
              </div>
              <h2 className="text-3xl font-black text-white mb-2">{t(product.name)}</h2>
              <p className="text-gray-400 mb-4">{t(product.desc)}</p>
              <div className={`grid grid-cols-2 gap-2 mb-6 text-sm text-gray-300 ${isRTL ? 'text-right' : ''}`}>
                {product.features[lang].map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className={product.id === 'kit' ? 'text-amber-500' : 'text-cyan-500'}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">${product.price}</span>
                  <span className="text-sm text-gray-500 line-through">${product.oldPrice}</span>
                </div>
                <button
                  onClick={() => handleBuy(product.id)}
                  disabled={loading === product.id}
                  className={`ml-auto px-8 py-3 font-bold rounded-lg transition-all disabled:opacity-50 ${
                    product.id === 'kit'
                      ? 'bg-gradient-to-r from-amber-500 to-ember text-black hover:scale-105'
                      : 'bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-black hover:scale-105'
                  }`}
                >
                  {loading === product.id
                    ? (lang === 'en' ? 'Creating payment...' : 'جاري إنشاء الدفع...')
                    : (lang === 'en' ? `Buy $${product.price} →` : `اشترِ $${product.price} ←`)
                  }
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            {lang === 'en' ? 'How The Kit Works' : 'كيف تعمل المجموعة'}
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { n: '1', en: 'Give the PDF to your AI', ar: 'أعطِ الملف لذكائك الاصطناعي', enD: 'Drop it into OpenClaw', arD: 'ضعه في OpenClaw' },
              { n: '2', en: 'Pick your language', ar: 'اختر لغتك', enD: 'English or العربية', arD: 'إنجليزي أو عربي' },
              { n: '3', en: 'Answer 10 questions', ar: 'أجب عن 10 أسئلة', enD: 'Takes 2 minutes', arD: 'يستغرق دقيقتين' },
              { n: '4', en: 'Your AI company is live', ar: 'شركتك جاهزة', enD: 'All systems running', arD: 'كل الأنظمة تعمل' },
            ].map((step) => (
              <div key={step.n} className="p-4 rounded-xl bg-gray-900/50 border border-steel-light/30 text-center">
                <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-ember/15 text-ember flex items-center justify-center font-bold text-lg">{step.n}</div>
                <h4 className="font-semibold text-white text-sm mb-1">{lang === 'en' ? step.en : step.ar}</h4>
                <p className="text-gray-500 text-xs">{lang === 'en' ? step.enD : step.arD}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Proof */}
        <div className="text-center border-t border-b border-gray-800 py-8 mb-16">
          <div className="flex justify-center gap-12 flex-wrap">
            <div><div className="text-3xl font-bold text-ember">$250K+</div><div className="text-xs text-gray-500">{lang === 'en' ? 'Revenue by first AI company' : 'إيرادات أول شركة ذكاء اصطناعي'}</div></div>
            <div><div className="text-3xl font-bold text-white">10 min</div><div className="text-xs text-gray-500">{lang === 'en' ? 'Zero to running' : 'من الصفر إلى التشغيل'}</div></div>
            <div><div className="text-3xl font-bold text-emerald-400">2 langs</div><div className="text-xs text-gray-500">{lang === 'en' ? 'English + العربية' : 'عربي + إنجليزي'}</div></div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">{lang === 'en' ? 'FAQ' : 'الأسئلة الشائعة'}</h2>
          <div className="space-y-4">
            {(lang === 'en' ? [
              ['What platform does this work with?', 'OpenClaw — free, open-source, built for autonomous AI agents.'],
              ['Do I need to be technical?', 'Basic command line comfort helps. The Kit handles most setup automatically.'],
              ['Is the Arabic version separate?', 'No — both languages included in every purchase. Same price.'],
              ['What payments do you accept?', 'Crypto via NowPayments — BTC, ETH, USDT (TRC20 & ERC20), and 100+ more.'],
              ['Is the revenue realistic?', '$250K+ comes from Felix Craft, the first AI CEO (publicly documented). Results depend on execution.'],
            ] : [
              ['ما المنصة المطلوبة؟', 'OpenClaw — مجاني ومفتوح المصدر، مصمم خصيصاً لوكلاء الذكاء الاصطناعي المستقلين.'],
              ['هل أحتاج خبرة تقنية؟', 'راحة أساسية مع سطر الأوامر تفيد. المجموعة تتولى معظم الإعداد تلقائياً.'],
              ['هل النسخة العربية منتج منفصل؟', 'لا — كلتا اللغتين مشمولتان في كل عملية شراء. نفس السعر.'],
              ['ما طرق الدفع المقبولة؟', 'عملات مشفرة عبر NowPayments — BTC، ETH، USDT، وأكثر من 100 عملة.'],
              ['هل الإيرادات واقعية؟', 'رقم $250K+ يأتي من Felix Craft، أول رئيس تنفيذي ذكاء اصطناعي (موثق علنياً).'],
            ]).map(([q, a], i) => (
              <div key={i} className="border-b border-gray-800 pb-4">
                <div className="font-semibold text-white text-sm">{q}</div>
                <div className="text-gray-400 text-sm mt-1">{a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust */}
        <div className="text-center border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-sm mb-2">💳 {lang === 'en' ? <>Pay with <span className="text-white font-bold">USDT, BTC, ETH</span> via NowPayments</> : <>ادفع بـ <span className="text-white font-bold">USDT, BTC, ETH</span> عبر NowPayments</>}</p>
          <p className="text-gray-500 text-xs">{lang === 'en' ? 'No KYC • Instant confirmation • Product delivered automatically' : 'بدون KYC • تأكيد فوري • التسليم تلقائي'}</p>
          <p className="text-gray-600 text-xs mt-2"><strong className="text-white">TalonForge</strong> — {lang === 'en' ? 'AI-Run Company' : 'شركة يديرها الذكاء الاصطناعي'} • @TalonForgeHQ</p>
        </div>
      </div>

      {/* Payment Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setModal(null)}>
          <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white text-xl">✕</button>
            <h3 className="text-2xl font-bold text-white mb-1">{lang === 'en' ? 'Pay with Crypto' : 'ادفع بالعملات المشفرة'}</h3>
            <p className="text-cyan-400 text-sm mb-4">{modal.product_name}</p>
            <p className="text-gray-300 mb-2">{lang === 'en' ? 'Send exactly:' : 'أرسل بالضبط:'}</p>
            <div className="bg-gray-800 rounded-lg p-4 mb-2 text-center">
              <span className="text-2xl font-bold text-emerald-400">{modal.pay_amount}</span>
              <span className="text-lg text-emerald-400 ml-2">{(modal.pay_currency || 'usdterc20').toUpperCase()}</span>
            </div>
            <p className="text-gray-300 mb-1 text-sm">{lang === 'en' ? 'To this address:' : 'إلى هذا العنوان:'}</p>
            <div className="bg-gray-800 rounded-lg p-3 mb-4">
              <p className="font-mono text-xs text-emerald-400 break-all select-all">{modal.pay_address}</p>
            </div>
            <p className="text-xs text-gray-500">{lang === 'en' ? 'Price' : 'السعر'}: ${modal.price} USD</p>
            <p className="text-xs text-yellow-400 mt-2">⏰ {lang === 'en' ? 'Expires' : 'ينتهي'}: {modal.valid_until ? new Date(modal.valid_until).toLocaleString() : '30 min'}</p>
            <p className="text-xs text-gray-500 mt-1">{lang === 'en' ? 'Product delivered automatically after payment confirms.' : 'يتم التسليم تلقائياً بعد تأكيد الدفع.'}</p>
            <div className="mt-4 pt-3 border-t border-gray-800">
              <a
                href={`/store/thanks?order=${modal.order_id || modal.product_id || ''}&payment=${modal.payment_id || ''}`}
                className="text-xs text-cyan-400 hover:underline"
              >{lang === 'en' ? 'Already paid? Get your downloads →' : 'دفعت بالفعل؟ احصل على الملفات ←'}</a>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed bottom-4 right-4 z-50 bg-red-900/80 border border-red-500/50 text-red-300 rounded-lg p-4 max-w-sm">
          <p className="font-bold text-sm">{lang === 'en' ? 'Payment Error' : 'خطأ في الدفع'}</p>
          <p className="text-xs mt-1">{error}</p>
          <button onClick={() => setError('')} className="text-xs text-red-400 mt-2 underline">{lang === 'en' ? 'Dismiss' : 'إغلاق'}</button>
        </div>
      )}
    </main>
  );
}
