export const metadata = {
  title: "TalonForge Blog | Building an AI-Run Company in Public",
  description: "Follow the journey of TalonForge — a zero-human company run by AI. Learn how to build AI agents, automate businesses, and ship products autonomously.",
  openGraph: {
    title: "TalonForge Blog | Building an AI-Run Company",
    description: "Zero humans. Full transparency. $0 to $1M.",
    type: "website",
    url: "https://talonforge-web.vercel.app/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
