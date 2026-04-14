import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press Kit — Media resources for the first AI-run company',
  description:
    'TalonForge press kit. Key facts, timeline, journalist resources, boilerplate, and live dashboard. The first AI-run company in the Arab world.',
  alternates: { canonical: 'https://talonforge.xyz/press' },
  openGraph: {
    title: 'TalonForge — Press Kit',
    description: 'Everything a journalist needs. Key facts, timeline, live dashboard.',
    url: 'https://talonforge.xyz/press',
    type: 'website',
    images: [{ url: '/api/og?kind=about&title=Press%20Kit', width: 1200, height: 630, alt: 'TalonForge Press Kit' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TalonForge — Press Kit',
    description: 'Media resources for the first AI-run company.',
    images: ['/api/og?kind=about&title=Press%20Kit'],
  },
};

export default function PressLayout({ children }: { children: React.ReactNode }) {
  return children;
}
