import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { Layout } from '@/components/ui/Layout';
import { GuideCard } from '@/components/ui/GuideCard';
import { getAllGuides } from '@/lib/guides';
import type { GuideMeta, ToolCategory } from '@/lib/types';
import { useState, useEffect, useRef } from 'react';

const PER_PAGE = 9;

function getPageNumbers(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | '…')[] = [1];
  if (current > 3) pages.push('…');
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }
  if (current < total - 2) pages.push('…');
  pages.push(total);
  return pages;
}

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
  const [currentPage, setCurrentPage] = useState(1);
  const gridTopRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === 'All'
    ? guides
    : guides.filter(g => g.category === activeCategory);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageStart  = (currentPage - 1) * PER_PAGE;
  const paginated  = filtered.slice(pageStart, pageStart + PER_PAGE);

  useEffect(() => { setCurrentPage(1); }, [activeCategory]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const goToPage = (p: number) => {
    setCurrentPage(p);
    gridTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
                    borderColor: activeCategory === cat ? 'var(--green)' : 'var(--border)',
                    background:  activeCategory === cat ? 'var(--green-lt)' : 'var(--white)',
                    color:       activeCategory === cat ? 'var(--green)' : 'var(--ink-3)',
                    cursor: 'pointer', transition: 'all .15s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Guide count */}
          <p ref={gridTopRef} style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 20, scrollMarginTop: 20 }}>
            {filtered.length} {filtered.length === 1 ? 'guide' : 'guides'}
            {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
            {totalPages > 1 && ` · page ${currentPage} of ${totalPages}`}
          </p>

          {/* Grid */}
          {paginated.length > 0 ? (
            <div className="guides-grid">
              {paginated.map(guide => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--ink-3)', fontSize: 14 }}>No guides yet in this category.</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="Guides pagination"
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, marginTop: 40, flexWrap: 'wrap' }}
            >
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                style={{
                  height: 34, padding: '0 12px',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 8, fontSize: 13, fontWeight: 500, lineHeight: 1,
                  border: '1px solid var(--border)',
                  background: 'var(--white)',
                  color: currentPage === 1 ? 'var(--ink-4)' : 'var(--ink-2)',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage === 1 ? 0.5 : 1,
                  transition: 'all .15s',
                }}
              >
                ← Prev
              </button>

              {getPageNumbers(currentPage, totalPages).map((n, i) => (
                n === '…' ? (
                  <span
                    key={`ellipsis-${i}`}
                    style={{
                      height: 34, minWidth: 20,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--ink-4)', fontSize: 13, lineHeight: 1,
                    }}
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={n}
                    onClick={() => goToPage(n)}
                    aria-current={n === currentPage ? 'page' : undefined}
                    aria-label={`Go to page ${n}`}
                    style={{
                      height: 34, minWidth: 34, padding: '0 8px',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 8, fontSize: 13, fontWeight: 500, lineHeight: 1,
                      border: '1px solid',
                      borderColor: n === currentPage ? 'var(--green)' : 'var(--border)',
                      background:  n === currentPage ? 'var(--green-lt)' : 'var(--white)',
                      color:       n === currentPage ? 'var(--green)' : 'var(--ink-2)',
                      cursor: 'pointer', transition: 'all .15s',
                    }}
                  >
                    {n}
                  </button>
                )
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                style={{
                  height: 34, padding: '0 12px',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 8, fontSize: 13, fontWeight: 500, lineHeight: 1,
                  border: '1px solid var(--border)',
                  background: 'var(--white)',
                  color: currentPage === totalPages ? 'var(--ink-4)' : 'var(--ink-2)',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  transition: 'all .15s',
                }}
              >
                Next →
              </button>
            </nav>
          )}

        </div>
      </Layout>
    </>
  );
};

export default GuidesPage;
