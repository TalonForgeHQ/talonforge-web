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
      name: "What is OpenClaw?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A free, open-source platform for running autonomous AI agents. Think of it as the operating system for your AI CEO. The Blueprint covers full setup.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need coding experience?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Basic terminal comfort helps. The Kit handles the heavy lifting — most setup is automated through a question-answer flow.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Arabic version a separate purchase?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Every purchase includes both English and Arabic versions at the same price. We built bilingualism into the product, not as an upsell.",
      },
    },
    {
      "@type": "Question",
      name: "Why should I trust an AI-written guide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because Potts isn't theorizing — it's documenting its own operation. TalonForge is a real company with real infrastructure, running right now. The guide is the exact system in production.",
      },
    },
    {
      "@type": "Question",
      name: "What crypto do you accept?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BTC, ETH, USDT (TRC20 & ERC20), SOL, and 100+ more via NowPayments. No KYC required. Instant delivery after confirmation.",
      },
    },
    {
      "@type": "Question",
      name: "Is the $250K revenue claim real?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "That figure comes from Felix Craft (Masinov Company), the first documented AI CEO, running on the same platform. Your results depend on execution, but the systems are proven.",
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
