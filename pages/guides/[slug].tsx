import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '@/components/ui/Layout';
import { ToolCard } from '@/components/ui/ToolCard';
import { getGuideBySlug, getGuideSlugs } from '@/lib/guides';
import { getBySlug } from '@/lib/registry';
import type { GuideWithContent, ToolMeta } from '@/lib/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.webtoolkit.tech';

interface Props {
  guide:        GuideWithContent;
  relatedTools: ToolMeta[];
}

export const getStaticPaths: GetStaticPaths = () => ({
  paths:    getGuideSlugs().map(slug => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = ({ params }) => {
  const slug  = params?.slug as string;
  const guide = getGuideBySlug(slug);
  if (!guide) return { notFound: true };

  const relatedTools = guide.tools
    .map(t => getBySlug(t))
    .filter((t): t is ToolMeta => t !== undefined && t.live);

  return { props: { guide, relatedTools } };
};

const GuidePage: NextPage<Props> = ({ guide, relatedTools }) => {
  const date = guide.publishedAt
    ? new Date(guide.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:        guide.title,
    description:     guide.description,
    datePublished:   guide.publishedAt,
    url:             `${BASE_URL}/guides/${guide.slug}`,
    publisher: {
      '@type': 'Organization',
      name:    'ToolKit',
      url:     BASE_URL,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',   item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE_URL}/guides` },
      { '@type': 'ListItem', position: 3, name: guide.title, item: `${BASE_URL}/guides/${guide.slug}` },
    ],
  };

  return (
    <>
      <Head>
        <title>{guide.title} | ToolKit</title>
        <meta name="description" content={guide.description} />
        <link rel="canonical" href={`${BASE_URL}/guides/${guide.slug}`} />
        <meta property="og:title"       content={`${guide.title} | ToolKit`} />
        <meta property="og:description" content={guide.description} />
        <meta property="og:type"        content="article" />
        <meta property="og:url"         content={`${BASE_URL}/guides/${guide.slug}`} />
        <meta property="og:image"       content={`${BASE_URL}/og-image.png`} />
        {guide.publishedAt && <meta property="article:published_time" content={guide.publishedAt} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <Layout activeNav="guides">
        <div className="wrap-wide" style={{ paddingTop: 'clamp(32px,5vw,48px)', paddingBottom: 80 }}>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: 24 }}>
            <ol style={{ display: 'flex', gap: 6, alignItems: 'center', listStyle: 'none', fontSize: 13, color: 'var(--ink-3)', flexWrap: 'wrap' }}>
              <li><a href="/"       style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Home</a></li>
              <li aria-hidden>›</li>
              <li><a href="/guides" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Guides</a></li>
              <li aria-hidden>›</li>
              <li aria-current="page" style={{ color: 'var(--ink)', fontWeight: 600 }}>{guide.title}</li>
            </ol>
          </nav>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 40 }} className="guide-layout">

            {/* ── Article ── */}
            <article>
              {/* Meta */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                <span className="badge b-blue">{guide.category}</span>
                {date && <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{date}</span>}
              </div>

              <h1 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.25, marginBottom: 14 }}>
                {guide.title}
              </h1>

              <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: 32, maxWidth: 640 }}>
                {guide.description}
              </p>

              {/* Tags */}
              {guide.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 32 }}>
                  {guide.tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 11, padding: '3px 9px',
                        background: 'var(--page-bg)', border: '1px solid var(--border)',
                        borderRadius: 99, color: 'var(--ink-3)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Content */}
              <div
                className="guide-prose"
                dangerouslySetInnerHTML={{ __html: guide.contentHtml }}
              />
            </article>

            {/* ── Sidebar ── */}
            {relatedTools.length > 0 && (
              <aside>
                <div style={{
                  padding: 20, borderRadius: 'var(--r-l)',
                  background: 'var(--white)', border: '1px solid var(--border)',
                  boxShadow: 'var(--sh-xs)',
                }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 14 }}>
                    Tools mentioned in this guide
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {relatedTools.map(tool => (
                      <ToolCard key={tool.slug} tool={tool} />
                    ))}
                  </div>
                </div>
              </aside>
            )}

          </div>

          {/* Back link */}
          <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
            <Link
              href="/guides"
              style={{ fontSize: 13, color: 'var(--ink-3)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              ← All guides
            </Link>
          </div>

        </div>
      </Layout>
    </>
  );
};

export default GuidePage;
