import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '@/components/ui/Layout';
import { ToolCard } from '@/components/ui/ToolCard';
import { getByCategory, getLiveTools, getSoonTools } from '@/lib/registry';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.webtoolkit.tech';

const CATEGORY_SLUGS: Record<string, string> = {
  'Security':        '/tools/security',
  'Developer Tools': '/tools/developer',
  'Text & Writing':  '/tools/text',
  'Design':          '/tools/design',
  'Value Converter': '/tools/value-converter',
};

const ToolsPage: NextPage = () => {
  const byCategory = getByCategory();
  const liveTools  = getLiveTools();
  const liveCount  = liveTools.length;
  const soonCount  = getSoonTools().length;

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'All Free Online Developer Tools — ToolKit',
    description: 'Complete directory of free browser-based tools for developers and designers.',
    url: `${BASE_URL}/tools`,
    numberOfItems: liveCount,
    itemListElement: liveTools.map((tool, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: tool.name,
      description: tool.description,
      url: `${BASE_URL}/tools/${tool.slug}`,
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',       item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'All Tools',  item: `${BASE_URL}/tools` },
    ],
  };

  return (
      <>
        <Head>
          <title>All Free Online Tools — Developers &amp; Designers | ToolKit</title>
          <meta name="description" content={`${liveCount} free browser-based tools for developers and designers. JSON formatter, password generator, Base64 encoder, regex tester and more. No signup, no tracking.`} />
          <link rel="canonical" href={`${BASE_URL}/tools`} />
          <meta property="og:title"       content="All Free Online Tools | ToolKit" />
          <meta property="og:description" content={`${liveCount} free tools for developers. Browser-based, no signup, no tracking.`} />
          <meta property="og:type"        content="website" />
          <meta property="og:url"         content={`${BASE_URL}/tools`} />
          <meta property="og:image"       content={`${BASE_URL}/og-image.png`} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        </Head>

        <Layout activeNav="tools">
          <div className="wrap-wide" style={{ paddingTop: 'clamp(32px,5vw,48px)', paddingBottom: 80 }}>

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: 20 }}>
              <ol style={{ display: 'flex', gap: 6, alignItems: 'center', listStyle: 'none', fontSize: 13, color: 'var(--ink-3)' }}>
                <li><a href="/" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Home</a></li>
                <li aria-hidden>›</li>
                <li aria-current="page" style={{ color: 'var(--ink)', fontWeight: 600 }}>All Tools</li>
              </ol>
            </nav>

            {/* Header */}
            <div className="a0" style={{ marginBottom: 32 }}>
              <p className="ov" style={{ marginBottom: 10 }}>Tools directory</p>
              <h1 className="disp" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', marginBottom: 10 }}>
                All Free Online Tools
              </h1>
              <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: 420 }}>
                Browser-based utilities — no signup, no tracking, no limits.
              </p>
            </div>

            {/* Status pill */}
            <div className="a1" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, padding: '8px 14px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', marginBottom: 40, boxShadow: 'var(--sh-xs)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{liveCount} live</span>
              </div>
              <span style={{ width: 1, height: 12, background: 'var(--border)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--border-md)', display: 'inline-block' }} />
                <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>{soonCount} coming soon</span>
              </div>
            </div>

            {/* Categories */}
            {Array.from(byCategory.entries()).map(([category, tools]) => {
              const sorted = [
                ...tools.filter(t => t.live),
                ...tools.filter(t => !t.live),
              ];
              return (
                  <div key={category} style={{ marginBottom: 36 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                      <p className="ov" style={{ margin: 0 }}>{category}</p>
                      <Link
                          href={CATEGORY_SLUGS[category] ?? '/tools'}
                          style={{ fontSize: 12, fontWeight: 600, color: 'var(--green)', textDecoration: 'none' }}
                      >
                        All {category} tools →
                      </Link>
                    </div>
                    <div className="tools-grid">
                      {sorted.map(tool => <ToolCard key={tool.slug} tool={tool} />)}
                    </div>
                  </div>
              );
            })}

          </div>
        </Layout>
      </>
  );
};

export default ToolsPage;