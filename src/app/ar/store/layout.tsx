import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "متجر تالون فورج — منتجات الذكاء الاصطناعي",
  description:
    "المخطط الكامل لبناء شركة يديرها الذكاء الاصطناعي ($29) والمجموعة الكاملة للإعداد التلقائي ($97). باللغتين العربية والإنجليزية. دفع بالعملات الرقمية عبر NowPayments.",
  keywords: [
    "ذكاء اصطناعي",
    "شركة بدون بشري",
    "ريادة أعمال",
    "أدوات ذكاء اصطناعي",
    "عملات رقمية",
    "OpenClaw",
    "Potts",
    "TalonForge",
    "AI company",
    "AI CEO",
    "Arabic AI",
  ],
  alternates: {
    canonical: "https://talonforge.xyz/ar/store",
    languages: {
      en: "https://talonforge.xyz/store",
      ar: "https://talonforge.xyz/ar/store",
      "x-default": "https://talonforge.xyz/store",
    },
  },
  openGraph: {
    title: "متجر تالون فورج — منتجات الذكاء الاصطناعي",
    description:
      "المخطط الكامل للشركة بدون بشري ($29) والمجموعة الكاملة للإعداد التلقائي ($97). ثنائية اللغة. دفع بالعملات الرقمية.",
    type: "website",
    url: "https://talonforge.xyz/ar/store",
    locale: "ar_AR",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "متجر تالون فورج",
    description: "المخطط والمجموعة لبناء شركة يديرها الذكاء الاصطناعي. دفع بالعملات الرقمية.",
  },
};

const STORE_PRODUCTS_AR_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "متجر تالون فورج — منتجات الشركة بدون بشري",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Product",
        name: "مخطط الشركة بدون بشري",
        description:
          "دليل شامل من 60+ صفحة باللغتين العربية والإنجليزية يوثق كيف يبني ويدير المدير التنفيذي الذكي شركة حقيقية من الصفر.",
        image: "https://talonforge.xyz/og-image.png",
        brand: { "@type": "Brand", name: "TalonForge" },
        url: "https://talonforge.xyz/ar/store",
        inLanguage: ["ar", "en"],
        offers: {
          "@type": "Offer",
          price: "29",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://talonforge.xyz/ar/store",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Product",
        name: "مجموعة الشركة بدون بشري",
        description:
          "مهارة إعداد تلقائي للذكاء الاصطناعي. أجب عن 10 أسئلة وسيبني ذكاؤك الاصطناعي شركة كاملة في أقل من 10 دقائق.",
        image: "https://talonforge.xyz/og-image.png",
        brand: { "@type": "Brand", name: "TalonForge" },
        url: "https://talonforge.xyz/ar/store",
        inLanguage: ["ar", "en"],
        offers: {
          "@type": "Offer",
          price: "97",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://talonforge.xyz/ar/store",
        },
      },
    },
  ],
};

export default function StoreArLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STORE_PRODUCTS_AR_JSONLD) }}
      />
      {children}
    </>
  );
}
