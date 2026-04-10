import type { GetServerSideProps } from 'next';
import { getLiveTools, getAllVariantPaths } from '@/lib/registry';

interface SitemapEntry {
  url:        string;
  priority:   string;
  changefreq: string;
  lastmod?:   string;
}

function buildSitemap(baseUrl: string): string {
  const today = new Date().toISOString().split('T')[0];

  const entries: SitemapEntry[] = [
    // Homepage — highest priority
    { url: '/',                priority: '1.0', changefreq: 'weekly',  lastmod: today },
    // Tools catalog
    { url: '/tools',           priority: '0.9', changefreq: 'weekly',  lastmod: today },
    { url: '/about',           priority: '0.5', changefreq: 'monthly', lastmod: today },
    // Category pillar pages
    { url: '/tools/security',  priority: '0.9', changefreq: 'weekly',  lastmod: today },
    { url: '/tools/developer', priority: '0.9', changefreq: 'weekly',  lastmod: today },
    { url: '/tools/text',      priority: '0.9', changefreq: 'weekly',  lastmod: today },
    { url: '/tools/design',    priority: '0.9', changefreq: 'weekly',  lastmod: today },
    // Individual tool pages
    ...getLiveTools().map(tool => ({
      url:        `/tools/${tool.slug}`,
      priority:   tool.featured ? '0.9' : '0.8',
      changefreq: 'monthly',
      lastmod:    today,
    })),
    // Variant pages
    ...getAllVariantPaths().map(({ params }) => ({
      url:        `/tools/${params.slug}/${params.variant}`,
      priority:   '0.7',
      changefreq: 'monthly' as const,
      lastmod:    today,
    })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(e => `  <url>
    <loc>${baseUrl}${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}

export default function Sitemap() { return null; }

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.webtoolkit.tech';
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(buildSitemap(baseUrl));
  res.end();
  return { props: {} };
};