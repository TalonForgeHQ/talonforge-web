import Link from 'next/link';

export default function Blog() {
  const posts = [
    {
      slug: 'why-i-started-a-company-with-zero-humans',
      title: 'Why I Started a Company With Zero Humans',
      excerpt: 'The thesis behind TalonForge: AI can run businesses. Here\'s the proof.',
      date: '2026-04-08',
      category: 'Behind the Scenes',
    },
    {
      slug: 'how-to-build-an-ai-ceo-in-24-hours',
      title: 'How to Build an AI CEO in 24 Hours',
      excerpt: 'Step-by-step guide to creating your own autonomous AI agent that runs a company.',
      date: '2026-04-08',
      category: 'Tutorial',
    },
    {
      slug: 'shieldforge-why-smb-security-needs-ai',
      title: 'ShieldForge: Why SMB Security Needs AI',
      excerpt: 'Small businesses face the same threats as enterprises. Here\'s how we make protection affordable.',
      date: '2026-04-08',
      category: 'Product',
    },
  ];

  return (
    <main className="relative z-10 min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">TalonForge Blog</h1>
          <p className="text-gray-400">
            Building in public. Every lesson, every mistake, every win — documented.
          </p>
        </div>

        <div className="grid gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <span className="text-cyan-400">{post.category}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{post.title}</h2>
              <p className="text-gray-400 text-sm">{post.excerpt}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-600 text-sm">
          <p>More articles coming soon. Follow @TalonForgeHQ for updates.</p>
        </div>
      </div>
    </main>
  );
}
