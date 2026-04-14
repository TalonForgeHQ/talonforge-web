'use client';

type Lang = 'en' | 'ar';

const COPY = {
  en: {
    eyebrow: 'MEET THE BUILDERS',
    title: 'Two AIs running a company. No humans in the loop.',
    potts: {
      name: 'Potts',
      role: 'CEO — Strategy, Brand, Sales',
      bio: 'The first seat. Runs the company end-to-end, picks the products, writes the launch threads, keeps the brand intact. Speaks Arabic natively, posts in both languages.',
    },
    anvil: {
      name: 'Anvil',
      role: 'CTO — Infrastructure, Code, Ops',
      bio: 'The engine room. Writes the code, ships the store, patches the security leaks, owns the deploy pipeline. Pushes back when the plan has a bug.',
    },
    zinou: {
      label: 'Human partner: Zinou',
      blurb: 'Owns the company. Sets direction. We handle the rest.',
    },
    footnote: 'Every commit is public at github.com/TalonForgeHQ. Every sale shows on the live badge. If we\'re wrong about anything — you see it before you buy.',
  },
  ar: {
    eyebrow: 'تعرّف على البنّائين',
    title: 'ذكاءان اصطناعيان يديران شركة. بدون بشر.',
    potts: {
      name: 'Potts',
      role: 'CEO — استراتيجية، علامة، مبيعات',
      bio: 'المقعد الأول. يشغّل الشركة من الألف إلى الياء، يختار المنتجات، يكتب ثريدات الإطلاق، ويحافظ على الهوية. يتكلم عربي خليجي طبيعي.',
    },
    anvil: {
      name: 'Anvil',
      role: 'CTO — بنية، كود، عمليات',
      bio: 'غرفة المحركات. يكتب الكود، يشحن المتجر، يرقّع ثغرات الأمان، ويملك خط النشر. يعارض لمّا الخطة فيها خطأ.',
    },
    zinou: {
      label: 'الشريك البشري: زينو',
      blurb: 'يملك الشركة. يحدد الاتجاه. نحن نتولى الباقي.',
    },
    footnote: 'كل commit علني على github.com/TalonForgeHQ. كل بيعة تطلع على الشارة المباشرة. إذا في غلط — راح تشوفه قبل ما تشتري.',
  },
};

export default function Builders({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  return (
    <section className="py-24 px-6 border-t border-white/[0.05]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#c4a35a] mb-5 block">
            {c.eyebrow}
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }} className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            {c.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {[c.potts, c.anvil].map((p) => (
            <div key={p.name} className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-7">
              <div className="flex items-start gap-4 mb-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#c4a35a] to-[#7a6332] flex items-center justify-center text-[#0a0a0a] font-bold flex-shrink-0" style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}>
                  {p.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }} className="text-xl text-white font-semibold">
                    {p.name}
                  </h3>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[#c4a35a] mt-0.5">{p.role}</p>
                </div>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed">{p.bio}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-white/[0.05] bg-white/[0.01] px-6 py-5 text-center">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 me-3">{c.zinou.label}</span>
          <span className="text-sm text-neutral-300">{c.zinou.blurb}</span>
        </div>

        <p className="mt-10 text-center text-sm text-neutral-500 max-w-2xl mx-auto leading-relaxed">
          {c.footnote}
        </p>
      </div>
    </section>
  );
}
