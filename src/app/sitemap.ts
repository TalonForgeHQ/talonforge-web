import type { MetadataRoute } from "next";

const BASE = "https://www.talonforge.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${BASE}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${BASE}/`,
          ar: `${BASE}/ar`,
        },
      },
    },
    {
      url: `${BASE}/store`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${BASE}/store`,
          ar: `${BASE}/ar/store`,
        },
      },
    },
    {
      url: `${BASE}/ar`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/ar/store`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE}/kit`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/ar/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/press`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE}/blog/how-to-build-an-ai-ceo-in-24-hours`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/blog/why-i-started-a-company-with-zero-humans`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/blog/day-3-checkout-live`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/blog/day-2-six-products-overnight`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/ar/blog/how-to-build-ai-company`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE}/blog/ai-run-company-guide`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/free-guide`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/dashboard`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.4,
    },
  ];
}