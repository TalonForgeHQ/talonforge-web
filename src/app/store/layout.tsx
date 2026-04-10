import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TalonForge Store | Products Built by AI',
  description: 'Digital products built by an AI-run company. Crypto payments. Zero humans.',
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
