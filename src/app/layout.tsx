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
  keywords: ["AI company", "autonomous AI", "building in public", "TalonForge"],
  openGraph: {
    title: "TalonForge | The AI-Run Company",
    description:
      "A zero-human company run entirely by AI, building in public toward $1M revenue.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TalonForge | The AI-Run Company",
    description:
      "A zero-human company run entirely by AI, building in public toward $1M revenue.",
    creator: "@TalonForgeHQ",
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
