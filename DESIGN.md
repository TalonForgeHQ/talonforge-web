# TalonForge Design System

**Read this before building a new page.** The whole site shares one visual language. Every page should look like it was made by the same hand. Today the hand is Potts + Anvil; tomorrow it might be a third agent. Consistency is load-bearing for the brand.

## Palette

| Token | Hex | Use |
|---|---|---|
| Background | `#0a0a0a` | Every `<main>`. Never gradients like `from-slate-950`. |
| Text primary | `white` / `#e8e4df` | Hero titles, important body |
| Text secondary | `neutral-300` / `neutral-400` | Long-form paragraphs |
| Text tertiary | `neutral-500` / `neutral-600` | Eyebrows, metadata, timestamps |
| Gold accent | `#c4a35a` | Italic accents, CTAs, brand mark, eyebrows, dividers |
| Gold hover | `#d4b46a` | CTA hover state |
| Gold glow | `#c4a35a22` / `#c4a35a88` | Radial glows behind heroes, button shadows |
| Hairline | `white/[0.05]` to `white/[0.08]` | Borders, dividers, card edges |
| Surface | `white/[0.02]` to `white/[0.04]` | Card backgrounds |

**Never use `text-amber-400`, `bg-slate-900`, `from-slate-950`, or any Tailwind preset color that isn't neutral/white.** The one exception is semantic error/warning (`text-amber-400` for error messages only).

## Typography

| Role | Font | Weight | Tracking |
|---|---|---|---|
| Display / hero titles | `var(--font-serif)` (Fraunces) | 600 semibold | `-0.025em` |
| Italic accent line | Fraunces italic | 400 | `-0.02em` |
| Body | Geist Sans (default) | 400 | normal |
| Eyebrow / label | Geist Mono | 400 | `0.28em` uppercase |
| Numbers / prices | Fraunces + `tabular-nums` | 600 | `-0.04em` |

Pattern for every hero:

```tsx
<span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c4a35a] block mb-10">
  EYEBROW LABEL
</span>
<h1 style={{ fontFamily: 'var(--font-serif), ui-serif, Georgia, serif' }}
    className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.025em] leading-[1.04] text-white mb-8">
  <span className="block">Main title line.</span>
  <span className="block italic text-[#c4a35a] font-normal mt-2">Italic accent line.</span>
</h1>
<p className="text-[17px] text-neutral-400 leading-relaxed max-w-2xl mx-auto">
  Short sub-paragraph.
</p>
```

## Spacing

- Sections: `py-32 px-6` (minimum)
- Hero: `min-h-[75vh]` to `min-h-[92vh]` · `flex items-center justify-center`
- Section headers have `mb-16` or `mb-20` before their content
- Inner grids and lists: `gap-6` to `gap-12`
- Never use `pt-4`, `pt-12`, `pb-6` between top-level sections. They cram content.

### Section divider

Between every major section, add a hairline:

```tsx
<div className="max-w-6xl mx-auto px-6"><div className="border-t border-white/[0.08]" /></div>
```

## Layout widths

| Context | Max width |
|---|---|
| Long-form text (thesis, note) | `max-w-2xl` |
| Hero column | `max-w-3xl` |
| Cards grid / facts list | `max-w-4xl` or `max-w-5xl` |
| Site-wide container | `max-w-6xl` |

All containers are `mx-auto`.

## Shared components

Import and reuse — never inline the nav or footer:

```tsx
import SiteNav from '@/app/_components/SiteNav';
import SiteFooter from '@/app/_components/SiteFooter';
import { useLang } from '@/app/_components/LangContext';
```

Every full-page render:

```tsx
<main dir={rtl ? 'rtl' : 'ltr'} className="min-h-screen bg-[#0a0a0a] text-white">
  <SiteNav />
  {/* hero */}
  {/* divider */}
  {/* sections with py-32 and dividers between */}
  <SiteFooter />
</main>
```

## Bilingual pages

All consumer-facing pages are client components using `useLang()`:

```tsx
'use client';
const { lang, rtl } = useLang();
const c = COPY[lang];
```

COPY object holds `en` and `ar` keyed content side-by-side. See `src/app/kit/page.tsx` or `src/app/about/page.tsx` for the pattern.

**Arabic deep-link routes** (e.g. `/ar/about`, `/ar/store`) wrap the main page with `setLang('ar')` in a useEffect, then render the same component. See `src/app/ar/about/page.tsx`.

## CTAs

Primary (gold pill):

```tsx
<Link href="/kit"
      className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold
                 bg-[#c4a35a] text-[#0a0a0a] rounded-full hover:bg-[#d4b46a]
                 transition-colors shadow-[0_0_60px_-15px_#c4a35a88]">
  Get The Kit — $97 →
</Link>
```

Secondary (ghost text link):

```tsx
<Link href="/dashboard"
      className="inline-flex items-center justify-center px-5 py-4 text-sm
                 text-neutral-400 hover:text-white transition-colors">
  See the counter →
</Link>
```

## Buttons with data

For tabular numbers (prices, revenue, counts), always:
- `tabular-nums` class
- Fraunces serif
- `tracking-[-0.04em]` for the giant hero counter, `-0.02em` for smaller

## Metadata

Every route gets a `layout.tsx` with `generateMetadata()` or static `metadata`. Use `/api/og?kind=<slug>&title=<url-encoded>` for the OG image URL — never point at `/og-image.png` except as a last-resort fallback.

`kind` values supported: `home | kit | dashboard | about | press | store`. Adding a new one requires editing `src/app/api/og/route.tsx`.

## What "off-theme" looks like (avoid)

- `bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950` → use `bg-[#0a0a0a]`
- `text-amber-400` (for decoration) → use `text-[#c4a35a]`
- `bg-slate-800` cards → use `bg-white/[0.02] border border-white/[0.05]`
- `text-gray-400` / `text-slate-300` → use `text-neutral-400` / `text-neutral-300`
- Sans-serif hero titles → use Fraunces via `var(--font-serif)`

## When in doubt

Open `src/app/kit/page.tsx` and `src/app/about/page.tsx`. They're the reference pages. New work should look like those.
