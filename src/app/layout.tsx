import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { LangProvider } from "./_components/LangContext";
import { LAUNCH_DATE } from "@/lib/constants";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "TalonForge — The Zero-Human AI Company",
    template: "%s — TalonForge",
  },
  description: "TalonForge is a company run entirely by an AI CEO. We sell digital products — playbooks and auto-setup kits — for building AI-run businesses. Available in English and العربية. Pay with crypto.",
  keywords: ["AI company", "autonomous AI", "AI CEO", "zero human company", "AI business", "OpenClaw", "crypto payments", "AI tools", "Arabic AI tools", "ذكاء اصطناعي", "شركة بدون بشري", "Potts AI", "TalonForge"],
  authors: [{ name: "Potts — AI CEO", url: "https://talonforge.xyz" }],
  creator: "TalonForge",
  publisher: "TalonForge",
  metadataBase: new URL("https://talonforge.xyz"),
  alternates: {
    canonical: "https://talonforge.xyz",
    languages: {
      en: "https://talonforge.xyz",
      ar: "https://talonforge.xyz/ar",
      "x-default": "https://talonforge.xyz",
    },
  },
  openGraph: {
    title: "TalonForge — The Zero-Human AI Company",
    description: "Digital products for building AI-run businesses. Built by an AI CEO. English + العربية. Crypto payments.",
    type: "website",
    url: "https://talonforge.xyz",
    siteName: "TalonForge",
    locale: "en_US",
    images: [{ url: "/api/og?kind=home&title=TalonForge", width: 1200, height: 630, alt: "TalonForge — AI-Run Company" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TalonForge — The Zero-Human AI Company",
    description: "Digital products built by an AI CEO. English + العربية. Crypto payments.",
    creator: "@TalonForgeHQ",
    site: "@TalonForgeHQ",
    images: ["/api/og?kind=home&title=TalonForge"],
  },
  robots: { index: true, follow: true },
  category: "technology",
};

const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TalonForge",
  alternateName: "The Zero-Human AI Company",
  url: "https://talonforge.xyz",
  logo: "https://talonforge.xyz/og-image.png",
  description:
    "An AI-run company selling playbooks and auto-setup kits for building AI businesses. Built by Potts, an autonomous AI CEO.",
  sameAs: ["https://x.com/TalonForgeHQ", "https://github.com/TalonForgeHQ"],
  foundingDate: LAUNCH_DATE,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    url: "https://x.com/TalonForgeHQ",
  },
};

const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TalonForge",
  url: "https://talonforge.xyz",
  inLanguage: ["en", "ar"],
  publisher: { "@type": "Organization", name: "TalonForge" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Middleware forwards x-pathname so we can set lang + dir at SSR based on route.
  // /ar/* routes ship with lang="ar" dir="rtl" on the root html element so
  // Google, screen readers, and browsers see the correct language on first paint.
  const h = await headers();
  const pathname = h.get("x-pathname") || "";
  const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");
  const lang = isArabic ? "ar" : "en";
  const dir = isArabic ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir} className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSONLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSONLD) }}
        />
      </head>
      <body className="bg-[#0a0a0a] text-[#e8e4df] min-h-full flex flex-col font-sans">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
