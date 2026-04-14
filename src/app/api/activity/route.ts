import { NextResponse } from 'next/server';

// Fetches recent commits across the TalonForgeHQ org and renders them as the
// dashboard activity feed. Replaces the previous VPS-file-reading
// implementation, which was invisible to Vercel's serverless functions.

export const revalidate = 60;

const REPOS = [
  'TalonForgeHQ/talonforge-web',
  'TalonForgeHQ/talonforge',
  'TalonForgeHQ/products',
  'TalonForgeHQ/talonforge-soul-templates',
];

type Commit = {
  sha: string;
  message: string;
  author: string;
  date: string;
  repo: string;
  url: string;
};

async function fetchRepoCommits(repo: string): Promise<Commit[]> {
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'talonforge-dashboard',
    };
    const token = process.env.GITHUB_TOKEN;
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=10`, {
      headers,
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as Array<{
      sha: string;
      commit: { message: string; author: { name?: string; date?: string } };
      author?: { login?: string } | null;
      html_url: string;
    }>;
    return data.map((c) => ({
      sha: c.sha.slice(0, 7),
      message: c.commit.message.split('\n')[0],
      author: c.author?.login || c.commit.author?.name || 'unknown',
      date: c.commit.author?.date || new Date().toISOString(),
      repo: repo.split('/')[1],
      url: c.html_url,
    }));
  } catch {
    return [];
  }
}

function renderTodayLog(commits: Commit[]): string {
  if (commits.length === 0) return 'No commits in the last cycle.';
  const today = new Date().toISOString().split('T')[0];
  const lines: string[] = [`# ${today}`];
  for (const c of commits.slice(0, 30)) {
    const time = new Date(c.date).toISOString().slice(11, 16);
    lines.push(`- [${time}] ${c.repo}: ${c.message} (${c.sha})`);
  }
  return lines.join('\n');
}

export async function GET() {
  try {
    const all = (await Promise.all(REPOS.map(fetchRepoCommits))).flat();
    all.sort((a, b) => b.date.localeCompare(a.date));

    const today = renderTodayLog(all);

    return NextResponse.json({
      runtime: {
        time: new Date().toISOString(),
        model: 'claude-opus-4-6',
        provider: 'Anthropic via Claude Code',
        store: 'https://www.talonforge.xyz/store',
      },
      today,
      workQueue: '',
      xActivity: '',
      xCron: '',
      xLeads: '',
      commits: all.slice(0, 30),
      timestamp: Date.now(),
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
