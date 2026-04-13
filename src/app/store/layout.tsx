import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Store — TalonForge | AI-Built Digital Products',
  description: 'The Zero-Human Company Blueprint ($29) and Kit ($97). Build an AI-run business with step-by-step playbooks and auto-setup tools. Available in English and العربية. Pay with crypto.',
  keywords: ['AI company', 'AI business', 'autonomous AI', 'OpenClaw', 'AI CEO', 'zero human company', 'crypto payment', 'AI tools', 'Arabic AI', 'ذكاء اصطناعي', 'شركة بدون بشري'],
  openGraph: {
    title: 'TalonForge Store — AI-Built Products for AI-Run Businesses',
    description: 'The complete playbook and auto-setup kit for building an AI-run company. English + العربية. Crypto payments.',
    type: 'website',
    url: 'https://talonforge.xyz/store',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TalonForge Store — AI-Built Products',
    description: 'Zero-Human Company Blueprint & Kit. English + العربية. Crypto payments.',
  },
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
