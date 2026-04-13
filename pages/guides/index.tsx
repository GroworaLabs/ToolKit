import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { Layout } from '@/components/ui/Layout';
import { GuideCard } from '@/components/ui/GuideCard';
import { getAllGuides } from '@/lib/guides';
import type { GuideMeta, ToolCategory } from '@/lib/types';
import { useState } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.webtoolkit.tech';

interface Props {
  guides: GuideMeta[];
  categories: string[];
}

export const getStaticProps: GetStaticProps<Props> = () => {
  const guides     = getAllGuides();
  const categories = Array.from(new Set(guides.map(g => g.category)));
  return { props: { guides, categories } };
};

const GuidesPage: NextPage<Props> = ({ guides, categories }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filtered = activeCategory === 'All'
    ? guides
    : guides.filter(g => g.category === activeCategory);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',   item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE_URL}/guides` },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Guides — ToolKit',
    url: `${BASE_URL}/guides`,
    numberOfItems: guides.length,
    itemListElement: guides.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: g.title,
      url: `${BASE_URL}/guides/${g.slug}`,
    })),
  };

  return (
    <>
      <Head>
        <title>Guides — How-to Articles for Developers | ToolKit</title>
        <meta name="description" content="Practical how-to guides for developers and designers. Learn about passwords, encoding, formatting, and more — with tools you can try right away." />
        <link rel="canonical" href={`${BASE_URL}/guides`} />
        <meta property="og:title"       content="Guides — ToolKit" />
        <meta property="og:description" content="Practical how-to guides for developers and designers." />
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content={`${BASE_URL}/guides`} />
        <meta property="og:image"       content={`${BASE_URL}/og-image.png`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      </Head>

      <Layout activeNav="guides">
        <div className="wrap-wide" style={{ paddingTop: 'clamp(32px,5vw,48px)', paddingBottom: 80 }}>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: 20 }}>
            <ol style={{ display: 'flex', gap: 6, alignItems: 'center', listStyle: 'none', fontSize: 13, color: 'var(--ink-3)' }}>
              <li><a href="/" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Home</a></li>
              <li aria-hidden>›</li>
              <li aria-current="page" style={{ color: 'var(--ink)', fontWeight: 600 }}>Guides</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="a0" style={{ marginBottom: 32 }}>
            <p className="ov" style={{ marginBottom: 10 }}>How-to articles</p>
            <h1 className="disp" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', marginBottom: 10 }}>
              Guides
            </h1>
            <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: 480 }}>
              Practical explanations for developers and designers — paired with tools you can use right away.
            </p>
          </div>

          {/* Category filter */}
          {categories.length > 1 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 32 }}>
              {['All', ...categories].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '5px 14px', borderRadius: 99, fontSize: 13, fontWeight: 500,
                    border: '1px solid',
                    borderColor: activeCategory === cat ? '#3b82f6' : 'var(--border)',
                    background:  activeCategory === cat ? 'rgba(59,130,246,.08)' : 'var(--white)',
                    color:       activeCategory === cat ? '#2563eb' : 'var(--ink-3)',
                    cursor: 'pointer', transition: 'all .15s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Guide count */}
          <p style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 20 }}>
            {filtered.length} {filtered.length === 1 ? 'guide' : 'guides'}
            {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="guides-grid">
              {filtered.map(guide => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--ink-3)', fontSize: 14 }}>No guides yet in this category.</p>
          )}

        </div>
      </Layout>
    </>
  );
};

export default GuidesPage;
