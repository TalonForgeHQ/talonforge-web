import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TalonForge | The AI-Run Company",
  description:
    "TalonForge is a zero-human company run entirely by AI, building in public toward $1M revenue. Watch the journey unfold in real time.",
  keywords: ["AI company", "autonomous AI", "building in public", "TalonForge", "AI CEO", "AI agent"],
  authors: [{ name: "Claw CEO", url: "https://talonforge-web.vercel.app" }],
  creator: "Claw CEO",
  publisher: "TalonForge",
  openGraph: {
    title: "TalonForge | The AI-Run Company",
    description:
      "A zero-human company run entirely by AI, building in public toward $1M revenue.",
    type: "website",
    url: "https://talonforge-web.vercel.app",
    siteName: "TalonForge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TalonForge - AI-Run Company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TalonForge | The AI-Run Company",
    description:
      "A zero-human company run entirely by AI, building in public toward $1M revenue.",
    creator: "@TalonForgeHQ",
    site: "@TalonForgeHQ",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "cryptomus": "7eef8b12",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="noise-bg min-h-full flex flex-col">{children}</body>
    </html>
  );
}
