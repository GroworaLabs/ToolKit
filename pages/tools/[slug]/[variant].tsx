import { useState } from 'react';
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Layout } from '@/components/ui/Layout';
import { FaqSection } from '@/components/ui/FaqSection';
import { ToolCard } from '@/components/ui/ToolCard';
import {
  getBySlug, getVariant, getAllVariantPaths, TOOLS,
} from '@/lib/registry';
import type { ToolMeta, ToolVariant, PasswordOptions } from '@/lib/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.webtoolkit.tech';

const CATEGORY_SLUGS: Record<string, string> = {
  'Security':        '/tools/security',
  'Developer Tools': '/tools/developer',
  'Text & Writing':  '/tools/text',
  'Design':          '/tools/design',
};

/* ── Lazy-loaded widget with variant defaults ─────────── */
const PasswordGeneratorWidget = dynamic(
    () => import('@/tools/password-generator/component'),
    { ssr: false }
);

function VariantWidget({ tool, variant }: { tool: ToolMeta; variant: ToolVariant }) {
  if (tool.slug === 'password-generator') {
    return <PasswordGeneratorWidget initialOptions={variant.defaults as Partial<PasswordOptions>} />;
  }
  return null;
}

/* ── Collapsible variant list ─────────────────────────── */
const VISIBLE_COUNT = 5;

function VariantSidebar({ tool, currentSlug }: { tool: ToolMeta; currentSlug: string }) {
  const [expanded, setExpanded] = useState(false);
  const others = (tool.variants ?? []).filter(v => v.slug !== currentSlug);
  if (others.length === 0) return null;

  const visible = expanded ? others : others.slice(0, VISIBLE_COUNT);
  const hiddenCount = others.length - VISIBLE_COUNT;

  return (
      <div style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: 10 }}>
          More variants
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {visible.map(v => (
              <Link
                  key={v.slug}
                  href={`/tools/${tool.slug}/${v.slug}`}
                  style={{ fontSize: 13, color: 'var(--ink-2)', textDecoration: 'none', padding: '4px 0' }}
              >
                {v.seoH1} →
              </Link>
          ))}
        </div>
        {hiddenCount > 0 && (
            <button
                onClick={() => setExpanded(!expanded)}
                style={{
                  marginTop: 10,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--green)',
                  padding: 0,
                }}
            >
              {expanded ? 'Show less' : `Show all (+${hiddenCount} more)`}
            </button>
        )}
      </div>
  );
}

/* ── Static paths ─────────────────────────────────────── */
export const getStaticPaths: GetStaticPaths = () => ({
  paths:    getAllVariantPaths(),
  fallback: false,
});

/* ── Static props ─────────────────────────────────────── */
interface RelatedVariantItem {
  slug:   string;
  seoH1:  string;
}

interface Props {
  tool:                ToolMeta;
  variant:             ToolVariant;
  relatedVariantItems: RelatedVariantItem[];
}

export const getStaticProps: GetStaticProps<Props> = ({ params }) => {
  const slug        = params?.slug as string;
  const variantSlug = params?.variant as string;
  const tool        = getBySlug(slug);
  const variant     = getVariant(slug, variantSlug);

  if (!tool || !variant) return { notFound: true };

  const relatedVariantItems: RelatedVariantItem[] = (variant.relatedVariants ?? [])
      .map(s => {
        const v = (tool.variants ?? []).find(x => x.slug === s);
        return v ? { slug: v.slug, seoH1: v.seoH1 } : null;
      })
      .filter((x): x is RelatedVariantItem => x !== null);

  return { props: { tool: JSON.parse(JSON.stringify(tool)), variant, relatedVariantItems } };
};

/* ── Page ─────────────────────────────────────────────── */
const VariantPage: NextPage<Props> = ({ tool, variant, relatedVariantItems }) => {
  const toolUrl      = `${BASE_URL}/tools/${tool.slug}`;
  const variantUrl   = `${toolUrl}/${variant.slug}`;
  const categoryHref = CATEGORY_SLUGS[tool.category] ?? '/tools';
  const relatedTools = TOOLS
      .filter(t => t.category === tool.category && t.slug !== tool.slug && t.live)
      .slice(0, 4);

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',           item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'All Tools',      item: `${BASE_URL}/tools` },
      { '@type': 'ListItem', position: 3, name: tool.category,    item: `${BASE_URL}${categoryHref}` },
      { '@type': 'ListItem', position: 4, name: tool.name,        item: toolUrl },
      { '@type': 'ListItem', position: 5, name: variant.seoH1,    item: variantUrl },
    ],
  };

  const softwareApp = {
    '@context':          'https://schema.org',
    '@type':             'SoftwareApplication',
    '@id':               `${variantUrl}/#software`,
    name:                variant.seoH1,
    description:         variant.seoDescription,
    url:                 variantUrl,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem:     'Web Browser',
    offers:              { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    isPartOf:            { '@type': 'WebSite', '@id': `${BASE_URL}/#website` },
    publisher:           { '@type': 'Organization', '@id': `${BASE_URL}/#organization` },
  };

  const faqSchema = variant.faq.length > 0 ? {
    '@context':  'https://schema.org',
    '@type':     'FAQPage',
    mainEntity:  variant.faq.map(item => ({
      '@type':         'Question',
      name:            item.q,
      acceptedAnswer:  { '@type': 'Answer', text: item.a },
    })),
  } : null;

  return (
      <>
        <Head>
          <title>{variant.seoTitle}</title>
          <meta name="description"         content={variant.seoDescription} />
          <link rel="canonical"            href={variantUrl} />

          <meta property="og:title"        content={variant.seoTitle} />
          <meta property="og:description"  content={variant.seoDescription} />
          <meta property="og:type"         content="website" />
          <meta property="og:url"          content={variantUrl} />
          <meta property="og:image"        content={`${BASE_URL}/og-image.png`} />
          <meta property="og:site_name"    content="ToolKit" />

          <meta name="twitter:card"        content="summary_large_image" />
          <meta name="twitter:title"       content={variant.seoTitle} />
          <meta name="twitter:description" content={variant.seoDescription} />
          <meta name="twitter:image"       content={`${BASE_URL}/og-image.png`} />

          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }} />
          {faqSchema && (
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
          )}
        </Head>

        <Layout>
          <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(32px, 5vw, 52px) 16px 0' }}>

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: 20 }}>
              <ol style={{ display: 'flex', gap: 6, alignItems: 'center', listStyle: 'none', fontSize: 13, color: 'var(--ink-3)', flexWrap: 'wrap' }}>
                <li><Link href="/"             style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Home</Link></li>
                <li aria-hidden>›</li>
                <li><Link href="/tools"        style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Tools</Link></li>
                <li aria-hidden>›</li>
                <li><Link href={categoryHref}  style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>{tool.category}</Link></li>
                <li aria-hidden>›</li>
                <li><Link href={`/tools/${tool.slug}`} style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>{tool.name}</Link></li>
                <li aria-hidden>›</li>
                <li aria-current="page" style={{ color: 'var(--ink)', fontWeight: 600 }}>{variant.seoH1}</li>
              </ol>
            </nav>

            <div className="tool-grid">
              {/* Left — widget */}
              <div>
                <p className="ov a0" style={{ marginBottom: 10 }}>{tool.category}</p>
                <h1 className="disp a1" style={{ fontSize: 'clamp(24px, 4vw, 40px)', marginBottom: 12 }}>
                  {variant.seoH1}
                </h1>
                <p className="a2" style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: 24, maxWidth: 480 }}>
                  {variant.seoDescription}
                </p>
                <div className="card a3" style={{ padding: 'clamp(16px, 3vw, 28px)' }}>
                  <VariantWidget key={variant.slug} tool={tool} variant={variant} />
                </div>
              </div>

              {/* Right — variant info sidebar */}
              <aside style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Back to main tool */}
                <div style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
                  <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: 10 }}>
                    Main tool
                  </p>
                  <Link
                      href={`/tools/${tool.slug}`}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: 'var(--green)', textDecoration: 'none' }}
                  >
                    ← {tool.name}
                  </Link>
                  <p style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 6, lineHeight: 1.5 }}>
                    Full settings, all options, all character types.
                  </p>
                </div>

                {/* Other variants */}
                <VariantSidebar tool={tool} currentSlug={variant.slug} />
              </aside>
            </div>
          </section>

          {/* Unique intro content + content sections */}
          <section style={{ maxWidth: 1000, margin: '48px auto 0', padding: '0 16px' }}>
            <div>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 22px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                About this {variant.seoH1.toLowerCase()}
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--ink-2)' }}>
                {variant.intro}
              </p>

              {(variant.contentSections ?? []).map((section, i) => (
                  <div key={i} style={{ marginTop: 32 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(17px, 2.2vw, 20px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 12 }}>
                      {section.heading}
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--ink-2)' }}>
                      {section.body}
                    </p>
                  </div>
              ))}
            </div>
          </section>

          {/* Related variants */}
          {relatedVariantItems.length > 0 && (
              <section style={{ maxWidth: 1000, margin: '48px auto 0', padding: '0 16px' }}>
                <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: 14 }}>
                  Related variants
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {relatedVariantItems.map(rv => (
                      <Link
                          key={rv.slug}
                          href={`/tools/${tool.slug}/${rv.slug}`}
                          style={{
                            display:        'inline-flex',
                            alignItems:     'center',
                            gap:            6,
                            padding:        '8px 14px',
                            background:     'var(--white)',
                            border:         '1px solid var(--border)',
                            borderRadius:   'var(--r-m)',
                            fontSize:       13,
                            fontWeight:     500,
                            color:          'var(--ink-2)',
                            textDecoration: 'none',
                            boxShadow:      'var(--sh-xs)',
                            transition:     'border-color 0.15s, color 0.15s',
                          }}
                      >
                        {rv.seoH1} →
                      </Link>
                  ))}
                </div>
              </section>
          )}

          {/* FAQ */}
          {variant.faq.length > 0 && (
              <FaqSection items={variant.faq} />
          )}

          {/* Related tools */}
          {relatedTools.length > 0 && (
              <section style={{ maxWidth: 1000, margin: '56px auto 0', padding: '0 16px' }}>
                <p className="ov" style={{ marginBottom: 12 }}>More in {tool.category}</p>
                <div className="tools-grid">
                  {relatedTools.map(t => <ToolCard key={t.slug} tool={t} />)}
                </div>
              </section>
          )}
        </Layout>
      </>
  );
};

export default VariantPage;