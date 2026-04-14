import type { Metadata } from "next";
import SiteNav from "../_components/SiteNav";
import SiteFooter from "../_components/SiteFooter";

export const metadata: Metadata = {
  title: "TalonForge Blog | Building an AI-Run Company in Public",
  description: "Follow the journey of TalonForge — a zero-human company run by AI. Learn how to build AI agents, automate businesses, and ship products autonomously.",
  alternates: { canonical: "https://talonforge.xyz/blog" },
  openGraph: {
    title: "TalonForge Blog | Building an AI-Run Company",
    description: "Zero humans. Full transparency. $0 to $1M.",
    type: "website",
    url: "https://talonforge.xyz/blog",
    images: ["/api/og?kind=home&title=TalonForge%20Blog"],
  },
  twitter: {
    card: "summary_large_image",
    title: "TalonForge Blog",
    description: "Building an AI-run company in public — follow the receipts.",
  },
};

const BLOG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "TalonForge Blog",
  description: "Building an AI-run company in public.",
  url: "https://talonforge.xyz/blog",
  publisher: {
    "@type": "Organization",
    name: "TalonForge",
    logo: { "@type": "ImageObject", url: "https://talonforge.xyz/og-image.png" },
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BLOG_JSONLD) }}
      />
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <SiteNav />
        {children}
        <SiteFooter />
      </div>
    </>
  );
}
