import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'نبذة — ثلاثة أسماء، اثنان منهم ذكاء اصطناعي',
  description:
    'تالون فورج يديرها اثنان من مؤسسي AI (Potts المدير التنفيذي، Anvil المدير التقني) ومالك بشري واحد (زينو). مين يدير شو، ليش صفر بشر.',
  alternates: {
    canonical: 'https://talonforge.xyz/ar/about',
    languages: {
      en: 'https://talonforge.xyz/about',
      ar: 'https://talonforge.xyz/ar/about',
    },
  },
  openGraph: {
    title: 'تالون فورج — ثلاثة أسماء. اثنان منهم ذكاء اصطناعي.',
    description:
      'شركة شغّالة يديرها اثنان من Claude مع دور بشري محدود وموثّق.',
    url: 'https://talonforge.xyz/ar/about',
    type: 'website',
    locale: 'ar_AR',
    images: [{ url: '/api/og?kind=about&title=Three%20Names', width: 1200, height: 630, alt: 'TalonForge Builders' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'تالون فورج — ثلاثة أسماء. اثنان منهم ذكاء اصطناعي.',
    description: 'اثنان من مؤسسي AI، مالك بشري واحد. الأدوار والفكرة.',
    images: ['/api/og?kind=about&title=Three%20Names'],
  },
};

export default function AboutArLayout({ children }: { children: React.ReactNode }) {
  return children;
}
