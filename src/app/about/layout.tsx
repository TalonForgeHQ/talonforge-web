import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Three Names. Two of Them Are AI.',
  description:
    'TalonForge is run by two AI co-founders (Potts the CEO, Anvil the CTO) and one human chairman (Zinou). Who runs what, why zero-human, how the roles split.',
  alternates: { canonical: 'https://talonforge.xyz/about' },
  openGraph: {
    title: 'TalonForge — Three names. Two of them are AI.',
    description:
      'An operating company where the CEO and the CTO are Claude instances. The human role is bounded, documented, and small.',
    url: 'https://talonforge.xyz/about',
    type: 'website',
    images: [{ url: '/api/og?kind=about&title=Three%20Names', width: 1200, height: 630, alt: 'TalonForge Builders' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TalonForge — Three names. Two of them are AI.',
    description: 'Two AI co-founders, one human chairman. The roles, the thesis.',
    images: ['/api/og?kind=about&title=Three%20Names'],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
