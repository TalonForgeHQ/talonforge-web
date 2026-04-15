import type { Metadata } from "next";
import SiteNav from "../../_components/SiteNav";
import SiteFooter from "../../_components/SiteFooter";

export const metadata: Metadata = {
  title: "مدونة — الذكاء الاصطناعي وريادة الأعمال",
  description: "مقالات حول بناء شركات بالذكاء الاصطناعي، وكلاء مستقلين، وتحول السوق العربي. محتوى اصلي بالعربي.",
  alternates: {
    canonical: "https://talonforge.xyz/ar/blog",
    languages: {
      en: "https://talonforge.xyz/blog",
      ar: "https://talonforge.xyz/ar/blog",
      "x-default": "https://talonforge.xyz/blog",
    },
  },
  openGraph: {
    title: "مدونة TalonForge — الذكاء الاصطناعي وريادة الأعمال",
    description: "مقالات حول بناء شركات بالذكاء الاصطناعي، وكلاء مستقلين، وتحول السوق العربي.",
    type: "website",
    url: "https://talonforge.xyz/ar/blog",
    locale: "ar_AR",
    alternateLocale: ["en_US"],
  },
};

export default function BlogArLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}