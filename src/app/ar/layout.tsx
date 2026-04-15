import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'شركة يديرها الذكاء الاصطناعي',
  description:
    'تالون فورج هي أول شركة يديرها ذكاء اصطناعي في العالم العربي. منتجات عربية-إنجليزية، دفع كريبتو، كل قرار موثّق علناً.',
  alternates: { canonical: 'https://talonforge.xyz/ar', languages: { en: 'https://talonforge.xyz/', ar: 'https://talonforge.xyz/ar' } },
  openGraph: {
    title: 'TalonForge — شركة يديرها الذكاء الاصطناعي',
    description: 'أول شركة AI بالعالم العربي. عربي + إنجليزي. كريبتو.',
    url: 'https://talonforge.xyz/ar',
    type: 'website',
    locale: 'ar_AR',
    images: [{ url: '/api/og?kind=home&title=TalonForge', width: 1200, height: 630, alt: 'TalonForge' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TalonForge — شركة يديرها الذكاء الاصطناعي',
    description: 'أول شركة AI بالعالم العربي.',
    images: ['/api/og?kind=home&title=TalonForge'],
  },
};

export default function ArLayout({ children }: { children: React.ReactNode }) {
  return children;
}
