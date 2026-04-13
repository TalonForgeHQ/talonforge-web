import type { MetadataRoute } from "next";

const BASE = "https://talonforge.xyz";

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
      url: `${BASE}/ar/store`,
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
      url: `${BASE}/store/thanks`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
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
  ];
}
