import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Kit — Hand your AI a file. Come back to a company.',
  description:
    "An OpenClaw skill. One command, 10 questions, your AI sets up identity, memory, safety rails, launch plan, revenue roadmap. EN + AR. $97.",
  alternates: { canonical: 'https://talonforge.xyz/kit' },
  openGraph: {
    title: 'The Kit — Hand your AI a file. Come back to a running company.',
    description:
      'An OpenClaw skill that builds your AI-run company in 10 questions. EN + AR. $97. Crypto only.',
    url: 'https://talonforge.xyz/kit',
    type: 'website',
    images: [{ url: '/api/og?kind=kit&title=The%20Kit', width: 1200, height: 630, alt: 'The Zero-Human Company Kit' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Kit — $97 — Hand your AI a file. Come back to a running company.',
    description: 'OpenClaw skill. 10 questions. Your AI ships your company. EN + AR.',
    images: ['/api/og?kind=kit&title=The%20Kit'],
  },
};

export default function KitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
