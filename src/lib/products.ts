// Product catalog. Source of truth:
//   1. Notion DB (when NOTION_TOKEN + NOTION_PRODUCTS_DATABASE_ID are set)
//   2. data/products.json (committed fallback, always current)
//
// At build time or ISR revalidation, Next calls `getProducts()`. The Notion
// sync fetches fresh rows, maps them to the Product shape, and caches them.
// The committed JSON is what ships when Notion is unreachable or unconfigured.

import { Client } from '@notionhq/client';
import fs from 'fs';
import path from 'path';

export type Product = {
  slug: string;
  name: { en: string; ar: string };
  tagline: { en: string; ar: string };
  description: { en: string; ar: string };
  price: number; // USD
  oldPrice?: number;
  status: 'live' | 'soon' | 'later';
  cover?: string; // /products/slug.png
  files?: string[]; // post-purchase delivery
  order: number; // display order
};

// Fallback catalog committed to the repo. Mirrors today's hardcoded list.
const FALLBACK: Product[] = [
  {
    slug: 'starter',
    name: { en: 'The Starter Pack', ar: 'باقة المبتدئ' },
    tagline: { en: '100 X-post templates. Copy, paste, post.', ar: '100 قالب نشر X. انسخ والصق وانشر.' },
    description: { en: 'Plug-and-play X post templates across 10 categories.', ar: 'قوالب نشر X جاهزة في 10 فئات.' },
    price: 9,
    oldPrice: 29,
    status: 'live',
    cover: '/products/starter.png',
    order: 1,
  },
  {
    slug: 'blueprint',
    name: { en: 'The Blueprint', ar: 'المخطط' },
    tagline: { en: 'The playbook that started TalonForge.', ar: 'الدليل الذي بدأ تالون فورج.' },
    description: { en: '60+ page playbook for building an AI-run company.', ar: 'دليل 60 صفحة لبناء شركة يديرها الذكاء الاصطناعي.' },
    price: 29,
    oldPrice: 97,
    status: 'live',
    cover: '/products/blueprint.png',
    order: 2,
  },
  {
    slug: 'kit',
    name: { en: 'The Kit', ar: 'المجموعة' },
    tagline: { en: 'Give it to your AI. It builds your company.', ar: 'أعطها للـAI. يبني شركتك.' },
    description: { en: 'OpenClaw skill file that automates the entire setup.', ar: 'ملف مهارة OpenClaw يؤتمت كل الإعداد.' },
    price: 97,
    oldPrice: 197,
    status: 'live',
    cover: '/products/kit.png',
    order: 3,
  },
  {
    slug: 'toolbox',
    name: { en: 'Launch Stack', ar: 'حزمة الإطلاق' },
    tagline: { en: '12 free AI tools wired into a working company.', ar: '12 أداة AI مجانية موصولة بشركة شغّالة.' },
    description: { en: 'Curated ClawHub skills + Apify workflows + browser automation.', ar: 'مهارات ClawHub مختارة + سير Apify + أتمتة متصفح.' },
    price: 49,
    oldPrice: 149,
    status: 'live',
    cover: '/products/toolbox.png',
    order: 4,
  },
  {
    slug: 'bundle',
    name: { en: 'Everything Bundle', ar: 'الحزمة الكاملة' },
    tagline: { en: 'All products. One price. One AI.', ar: 'كل المنتجات. سعر واحد. AI واحد.' },
    description: { en: 'Blueprint + Kit + Starter + Launch Stack. Save $35.', ar: 'المخطط + المجموعة + المبتدئ + حزمة الإطلاق. وفّر 35$.' },
    price: 97,
    status: 'live',
    cover: '/products/bundle.png',
    order: 5,
  },
  {
    slug: 'premium',
    name: { en: 'AI Company in a Box', ar: 'شركة AI في صندوق' },
    tagline: { en: 'Everything + priority support from TalonForge.', ar: 'كل شي + دعم من تالون فورج.' },
    description: { en: 'The full bundle plus a 1:1 onboarding call with Potts.', ar: 'الحزمة الكاملة بالإضافة إلى مكالمة مع Potts.' },
    price: 147,
    status: 'live',
    cover: '/products/premium.png',
    order: 6,
  },
];

// ---- Notion sync ----------------------------------------------------------

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DB = process.env.NOTION_PRODUCTS_DATABASE_ID;
const notionEnabled = Boolean(NOTION_TOKEN && NOTION_DB);
const notion = notionEnabled ? new Client({ auth: NOTION_TOKEN }) : null;

type NotionProp = { rich_text?: Array<{ plain_text: string }>; title?: Array<{ plain_text: string }>; number?: number; select?: { name: string }; url?: string };

function richText(prop: NotionProp | undefined): string {
  if (!prop) return '';
  if (prop.rich_text?.length) return prop.rich_text.map((t) => t.plain_text).join('');
  if (prop.title?.length) return prop.title.map((t) => t.plain_text).join('');
  return '';
}

async function fetchFromNotion(): Promise<Product[] | null> {
  if (!notion || !NOTION_DB) return null;
  try {
    // @notionhq/client ≥5 uses dataSources (databases no longer queryable).
    // NOTION_PRODUCTS_DATABASE_ID should actually be the data-source id.
    const res = await notion.dataSources.query({
      data_source_id: NOTION_DB,
      sorts: [{ property: 'Order', direction: 'ascending' }],
    });
    const rows = (res as { results: Array<{ properties: Record<string, NotionProp> }> }).results;
    const products: Product[] = rows.map((row) => {
      const p = row.properties;
      return {
        slug: richText(p.Slug),
        name: { en: richText(p['Name EN']), ar: richText(p['Name AR']) },
        tagline: { en: richText(p['Tagline EN']), ar: richText(p['Tagline AR']) },
        description: { en: richText(p['Desc EN']), ar: richText(p['Desc AR']) },
        price: p.Price?.number ?? 0,
        oldPrice: p['Old Price']?.number,
        status: (p.Status?.select?.name?.toLowerCase() as Product['status']) || 'live',
        cover: p.Cover?.url || undefined,
        order: p.Order?.number ?? 999,
      };
    }).filter((p) => p.slug && p.name.en);
    return products.length ? products : null;
  } catch (e) {
    console.error('[products] Notion fetch failed, falling back to JSON:', e);
    return null;
  }
}

// ---- Committed JSON fallback ----------------------------------------------

function readCommittedJson(): Product[] | null {
  try {
    const p = path.join(process.cwd(), 'data', 'products.json');
    if (!fs.existsSync(p)) return null;
    const raw = fs.readFileSync(p, 'utf-8');
    const parsed = JSON.parse(raw) as Product[];
    return Array.isArray(parsed) && parsed.length ? parsed : null;
  } catch {
    return null;
  }
}

// ---- Public API -----------------------------------------------------------

let cache: { ts: number; products: Product[] } | null = null;
const CACHE_MS = 5 * 60 * 1000; // 5 minutes

export async function getProducts(): Promise<Product[]> {
  if (cache && Date.now() - cache.ts < CACHE_MS) return cache.products;

  const fromNotion = await fetchFromNotion();
  const products = fromNotion || readCommittedJson() || FALLBACK;
  cache = { ts: Date.now(), products };
  return products;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug);
}
