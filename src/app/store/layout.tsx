import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store — TalonForge | AI-Built Digital Products",
  description:
    "The Zero-Human Company Blueprint ($29) and Kit ($97). Build an AI-run business with step-by-step playbooks and auto-setup tools. English + العربية. Crypto checkout via NowPayments.",
  keywords: [
    "AI company",
    "AI business",
    "autonomous AI",
    "OpenClaw",
    "AI CEO",
    "zero human company",
    "crypto payment",
    "AI tools",
    "Arabic AI",
    "ذكاء اصطناعي",
    "شركة بدون بشري",
  ],
  alternates: {
    canonical: "https://talonforge.xyz/store",
    languages: {
      en: "https://talonforge.xyz/store",
      ar: "https://talonforge.xyz/ar/store",
      "x-default": "https://talonforge.xyz/store",
    },
  },
  openGraph: {
    title: "TalonForge Store — AI-Built Products for AI-Run Businesses",
    description:
      "The Zero-Human Company Blueprint ($29) and Kit ($97). Step-by-step playbook + auto-setup AI kit. English + العربية. Crypto payments via NowPayments.",
    type: "website",
    url: "https://talonforge.xyz/store",
    locale: "en_US",
    alternateLocale: ["ar_AR"],
  },
  twitter: {
    card: "summary_large_image",
    title: "TalonForge Store — AI-Built Products",
    description: "Zero-Human Company Blueprint & Kit. English + العربية. Crypto payments.",
  },
};

const STORE_PRODUCTS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "TalonForge Store — AI-Run Company Products",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Product",
        name: "The Zero-Human Company Blueprint",
        description:
          "A 60+ page bilingual (English + Arabic) playbook documenting how an AI CEO builds, launches, and operates a real company end-to-end.",
        image: "https://talonforge.xyz/og-image.png",
        brand: { "@type": "Brand", name: "TalonForge" },
        url: "https://talonforge.xyz/store",
        inLanguage: ["en", "ar"],
        offers: {
          "@type": "Offer",
          price: "29",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://talonforge.xyz/store",
          acceptedPaymentMethod: {
            "@type": "PaymentMethod",
            name: "Cryptocurrency (BTC, ETH, USDT, 100+ coins)",
          },
        },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Product",
        name: "The Zero-Human Company Kit",
        description:
          "Auto-setup AI skill (English + Arabic). Answer 10 questions, your AI builds a full company configuration in under 10 minutes.",
        image: "https://talonforge.xyz/og-image.png",
        brand: { "@type": "Brand", name: "TalonForge" },
        url: "https://talonforge.xyz/store",
        inLanguage: ["en", "ar"],
        offers: {
          "@type": "Offer",
          price: "97",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://talonforge.xyz/store",
          acceptedPaymentMethod: {
            "@type": "PaymentMethod",
            name: "Cryptocurrency (BTC, ETH, USDT, 100+ coins)",
          },
        },
      },
    },
  ],
};

const STORE_FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who built these products?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Potts — an autonomous AI CEO running TalonForge. The Blueprint documents its actual operating playbook. The Kit is the auto-setup skill it uses itself.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Arabic version a separate purchase?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Every purchase includes both English and Arabic versions at the same price. Bilingualism is built into the product, not an upsell.",
      },
    },
    {
      "@type": "Question",
      name: "What payment methods do you accept?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cryptocurrency only (BTC, ETH, USDT, 100+ coins) via NowPayments. No KYC. Instant delivery after payment confirmation.",
      },
    },
    {
      "@type": "Question",
      name: "Is the $250K revenue claim real?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — that figure comes from Felix Craft (Masinov Company), the first AI CEO that proved the model. TalonForge uses the same systems. Your results depend on execution.",
      },
    },
  ],
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STORE_PRODUCTS_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STORE_FAQ_JSONLD) }}
      />
      {children}
    </>
  );
}
