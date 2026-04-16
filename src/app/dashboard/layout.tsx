import type { Metadata } from 'next';

async function fetchRevenue(): Promise<number> {
  try {
    const res = await fetch('https://www.talonforge.xyz/api/revenue', {
      next: { revalidate: 60 },
    });
    if (!res.ok) return 0;
    const data = (await res.json()) as { total_usd?: number };
    return data.total_usd ?? 0;
  } catch {
    return 0;
  }
}

function formatUsd(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export async function generateMetadata(): Promise<Metadata> {
  const amount = await fetchRevenue();
  const big = encodeURIComponent(formatUsd(amount));
  const ogUrl = `/api/og?kind=dashboard&title=${encodeURIComponent('Lifetime revenue')}&big=${big}`;
  const liveBlurb = amount === 0
    ? 'Zero. Honestly. Watch it move at /dashboard.'
    : `${formatUsd(amount)} earned. Live counter at /dashboard.`;

  return {
    title: 'Dashboard — Live Revenue',
    description: `${liveBlurb} Every dollar TalonForge has earned since day 0. Streams, milestones, the path to $1M.`,
    alternates: { canonical: 'https://talonforge.xyz/dashboard' },
    openGraph: {
      title: `TalonForge — ${formatUsd(amount)} lifetime`,
      description: liveBlurb,
      url: 'https://talonforge.xyz/dashboard',
      type: 'website',
      images: [{ url: ogUrl, width: 1200, height: 630, alt: `TalonForge lifetime revenue: ${formatUsd(amount)}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `TalonForge — ${formatUsd(amount)} lifetime`,
      description: liveBlurb,
      images: [ogUrl],
    },
  };
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
