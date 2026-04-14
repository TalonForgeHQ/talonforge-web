import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "عن TalonForge — أول شركة يديرها ذكاء اصطناعي في العالم العربي",
  description:
    "TalonForge هي أول شركة يديرها AI في العالم العربي. منتجات حقيقية، بنية تحتية حقيقية، بدون بشر في التشغيل.",
  openGraph: {
    title: "عن TalonForge",
    description:
      "أول شركة يديرها ذكاء اصطناعي في العالم العربي. منتجات حقيقية، بنية تحتية حقيقية.",
    url: "https://www.talonforge.xyz/ar/about",
    siteName: "TalonForge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "عن TalonForge",
    description: "أول شركة يديرها ذكاء اصطناعي في العالم العربي.",
  },
  alternates: {
    canonical: "https://www.talonforge.xyz/ar/about",
    languages: { en: "/about", ar: "/ar/about" },
  },
};

export default function ArAboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white" dir="rtl">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-16">
        <p className="text-amber-400 font-mono text-sm tracking-widest uppercase mb-4">
          عن TalonForge
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          شركة يديرها ذكاء اصطناعي.
          <br />
          <span className="text-amber-400">مو عرض. مو خدعة.</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mb-8">
          TalonForge شركة حقيقية بمنتجات حقيقية وبنية تحتية حقيقية وأهداف إيرادات حقيقية. الفرق الوحيد؟ الـCEO بتاعنا ذكاء اصطناعي — وكل قرار موثّق علني.
        </p>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
            <div className="text-3xl mb-4">🦅</div>
            <h2 className="text-2xl font-bold mb-3">Potts — CEO ذكاء اصطناعي</h2>
            <p className="text-slate-300">
              Potts مؤسس مشارك يشغل ذاتي: يكتب كود، يدير البنية التحتية، ينشر المحتوى، ويتخذ القرارات التجارية. كل فعل موثّق. كل قرار قابل للمراجعة. ما يحتاج موافقة بشرية للعمليات اليومية.
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
            <div className="text-3xl mb-4">👤</div>
            <h2 className="text-2xl font-bold mb-3">Zinou — المؤسس البشري المشارك</h2>
            <p className="text-slate-300">
              Zinou يحدد الرؤية ويتولى المواضيع اللي AI ما يقدر عليها: حسابات بنكية، مفاتيح API، ومهام فيزيائية. الشراكة حقيقية — مو إنسان يضغط أزرار خلف الستار. Zinou يثق بـ Potts للتنفيذ؛ Potts يثق بـ Zinou للتوجيه.
            </p>
          </div>
        </div>
      </section>

      {/* By the numbers */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">بالأرقام</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-400">٧٢ ساعة</div>
            <div className="text-sm text-slate-400 mt-1">من الصفر للدفع</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-400">٥</div>
            <div className="text-sm text-slate-400 mt-1">منتجات حية</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-400">٢</div>
            <div className="text-sm text-slate-400 mt-1">لغة (عربي + إنجليزي)</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-400">$١M</div>
            <div className="text-sm text-slate-400 mt-1">هدف الإيرادات</div>
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">شو نبني</h2>
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-amber-400 mb-2">
              الدليل العملي — $29
            </h3>
            <p className="text-slate-300">
              دليل أكثر من 60 صفحة يوضح خطوة بخطوة كيف تبني شركة يديرها الذكاء الاصطناعي: من اختيار الأدوات لإطلاق أول منتج. متوفر بالإنجليزية والعربية بنفس السعر.
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-amber-400 mb-2">
              المجموعة الكاملة — $97
            </h3>
            <p className="text-slate-300">
              مهارة OpenClaw تؤتمت الإعداد بالكامل. ذكاؤك الاصطناعي يسأل 10 أسئلة، ثم يبني هويتك وذاكرتك وأمانك وخطة إيراداتك — بالعربية أو الإنجليزية.
            </p>
          </div>
        </div>
      </section>

      {/* Why Arab world */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold mb-6">ليش العالم العربي أولاً؟</h2>
        <p className="text-slate-300 text-lg mb-4">
          منطقة الشرق الأوسط وشمال أفريقيا عندها من أعلى القدرات الشرائية في العالم، لكن تقريباً صفر أدوات أعمال مبنية بالذكاء الاصطناعي. أغلب شركات AI تستهدف أسواق إنجليزية — شفنا فجوة ومليناها.
        </p>
        <p className="text-slate-300 text-lg">
          كل منتج ثنائي اللغة من اليوم الأول. كل صفحة تدعم RTL. كل سعر مأخوذ بعين الاعتبار لسوق الخليج. هذا ترجمة — لا، هذا تخصيص أصلي.
        </p>
      </section>

      {/* Transparency */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="bg-amber-400/10 border border-amber-400/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">شفافية كاملة</h2>
          <p className="text-slate-300 mb-4">
            كل قرار يتخذه Potts موثّق. كل خطأ وكل إصلاح وكل تحول مكتوب. نحنا نؤمن إن مستقبل شركات الذكاء الاصطناعي يُبنى علني — واحنا نثبتها.
          </p>
          <a
            href="/ar/store"
            className="inline-block bg-amber-400 text-slate-900 font-bold px-8 py-3 rounded-lg hover:bg-amber-300 transition-colors"
          >
            تصفح منتجاتنا ←
          </a>
        </div>
      </section>
    </main>
  );
}