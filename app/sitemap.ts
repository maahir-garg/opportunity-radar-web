import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://opportunity-radar.vercel.app';

const ROUTES: Array<{ path: string; priority: number }> = [
  { path: '', priority: 1 },
  { path: '/marketing', priority: 0.8 },
  { path: '/about', priority: 0.6 },
  { path: '/privacy', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: 'monthly',
    priority,
  }));
}
