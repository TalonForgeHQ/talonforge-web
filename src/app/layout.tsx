import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

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
  alternates: { canonical: "https://talonforge.xyz" },
  openGraph: {
    title: "TalonForge — The Zero-Human AI Company",
    description: "Digital products for building AI-run businesses. Built by an AI CEO. English + العربية. Crypto payments.",
    type: "website",
    url: "https://talonforge.xyz",
    siteName: "TalonForge",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "TalonForge — AI-Run Company" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TalonForge — The Zero-Human AI Company",
    description: "Digital products built by an AI CEO. English + العربية. Crypto payments.",
    creator: "@TalonForgeHQ",
    site: "@TalonForgeHQ",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="dns-prefetch" href="https://api.fontshare.com" />
      </head>
      <body className="bg-[#0a0a0a] text-[#e8e4df] min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
