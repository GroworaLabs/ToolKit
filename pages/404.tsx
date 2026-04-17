import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Layout } from '@/components/ui/Layout';
import { ToolCard } from '@/components/ui/ToolCard';
import { getLiveTools } from '@/lib/registry';
import { getAllGuides } from '@/lib/guides';
import type { ToolMeta, GuideMeta } from '@/lib/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.webtoolkit.tech';

interface ToolHit {
  slug:     string;
  name:     string;
  category: string;
}

interface VariantHit {
  variantName: string;
  toolName:    string;
  href:        string;
}

interface GuideHit {
  slug:     string;
  title:    string;
  category: string;
}

interface Props {
  tools:    ToolMeta[];
  guides:   GuideMeta[];
  popular:  ToolMeta[];
}

const NotFoundPage: NextPage<Props> = ({ tools, guides, popular }) => {
  const [query, setQuery]   = useState('');
  const [attempted, setAttempted] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAttempted(window.location.pathname);
    }
  }, []);

  // Seed initial query from the attempted URL (last non-empty segment)
  useEffect(() => {
    if (!attempted) return;
    const last = attempted.split('/').filter(Boolean).pop() ?? '';
    const seed = last.replace(/[-_]+/g, ' ').trim();
    if (seed && seed.length <= 40) setQuery(seed);
  }, [attempted]);

  const q = query.trim().toLowerCase();

  const { toolHits, variantHits, guideHits } = useMemo(() => {
    if (!q) return { toolHits: [] as ToolHit[], variantHits: [] as VariantHit[], guideHits: [] as GuideHit[] };

    const tMatches: ToolHit[] = [
      ...tools.filter(t => t.name.toLowerCase().includes(q)),
      ...tools.filter(t => !t.name.toLowerCase().includes(q) && (
        t.tagline.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        (t.keywords ?? []).some(k => k.toLowerCase().includes(q))
      )),
    ].map(t => ({ slug: t.slug, name: t.name, category: t.category }));

    const vMatches: VariantHit[] = tools.flatMap(t =>
      (t.variants ?? [])
        .filter(v => v.seoH1.toLowerCase().includes(q))
        .map(v => ({ variantName: v.seoH1, toolName: t.name, href: `/tools/${t.slug}/${v.slug}` }))
    );

    const gMatches: GuideHit[] = guides
      .filter(g =>
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        (g.tags ?? []).some(tag => tag.toLowerCase().includes(q))
      )
      .map(g => ({ slug: g.slug, title: g.title, category: g.category }));

    return { toolHits: tMatches, variantHits: vMatches, guideHits: gMatches };
  }, [q, tools, guides]);

  const hasQuery   = q.length > 0;
  const hasResults = toolHits.length > 0 || variantHits.length > 0 || guideHits.length > 0;

  return (
    <>
      <Head>
        <title>Page not found — ToolKit</title>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`${BASE_URL}/404`} />
      </Head>

      <Layout>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) 16px 80px' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(72px, 14vw, 128px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 8 }}>
              404
            </div>
            <h1 className="disp" style={{ fontSize: 'clamp(22px, 4vw, 32px)', marginBottom: 14 }}>
              Page not found
            </h1>
            <p style={{ fontSize: 15, color: 'var(--ink-3)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
              {attempted ? (
                <>
                  We couldn't find <code style={{ fontSize: 13, padding: '2px 6px', background: 'var(--border)', borderRadius: 4, color: 'var(--ink-2)', wordBreak: 'break-all' }}>{attempted}</code>.
                  Try searching for what you need below.
                </>
              ) : (
                <>The page you're looking for doesn't exist. Try searching below.</>
              )}
            </p>
          </div>

          {/* Search */}
          <div style={{ marginBottom: 32, position: 'relative' }}>
            <svg style={{ position: 'absolute', left: 14, top: 18, color: 'var(--ink-3)', pointerEvents: 'none' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search tools, presets, guides…"
              autoFocus
              style={{
                width: '100%',
                padding: '14px 16px 14px 42px',
                fontSize: 15,
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--r-l)',
                background: 'var(--white)',
                color: 'var(--ink)',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color .15s',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--ink-3)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
            />
          </div>

          {/* Results */}
          {hasQuery && (
            <div style={{ marginBottom: 48 }}>
              {!hasResults ? (
                <div style={{ padding: '32px 20px', textAlign: 'center', background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                  <p style={{ fontSize: 14, color: 'var(--ink-3)', marginBottom: 14 }}>
                    Nothing matches "<strong style={{ color: 'var(--ink)', fontWeight: 600 }}>{query}</strong>".
                  </p>
                  <Link href="/contact" style={{ fontSize: 13, fontWeight: 600, color: 'var(--green)', textDecoration: 'none' }}>
                    Suggest a tool →
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                  {toolHits.length > 0 && (
                    <ResultSection label="Tools" count={toolHits.length}>
                      {toolHits.slice(0, 8).map(t => (
                        <ResultRow
                          key={t.slug}
                          href={`/tools/${t.slug}`}
                          primary={t.name}
                          secondary={t.category}
                        />
                      ))}
                    </ResultSection>
                  )}

                  {variantHits.length > 0 && (
                    <ResultSection label="Presets" count={variantHits.length}>
                      {variantHits.slice(0, 8).map(v => (
                        <ResultRow
                          key={v.href}
                          href={v.href}
                          primary={v.variantName}
                          secondary={v.toolName}
                        />
                      ))}
                    </ResultSection>
                  )}

                  {guideHits.length > 0 && (
                    <ResultSection label="Guides" count={guideHits.length}>
                      {guideHits.slice(0, 8).map(g => (
                        <ResultRow
                          key={g.slug}
                          href={`/guides/${g.slug}`}
                          primary={g.title}
                          secondary={g.category}
                        />
                      ))}
                    </ResultSection>
                  )}

                </div>
              )}
            </div>
          )}

          {/* Popular tools (shown when no query) */}
          {!hasQuery && (
            <div style={{ marginBottom: 48 }}>
              <p className="ov" style={{ marginBottom: 14, textAlign: 'center' }}>Popular tools</p>
              <div className="tools-grid">
                {popular.map(tool => <ToolCard key={tool.slug} tool={tool} />)}
              </div>
            </div>
          )}

          {/* Quick links */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 20px', background: 'var(--bg-accent)', color: '#fff', borderRadius: 'var(--r-l)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              ← Back to home
            </Link>
            <Link href="/tools" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 20px', background: 'var(--white)', color: 'var(--ink)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-l)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              All tools
            </Link>
            <Link href="/guides" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 20px', background: 'var(--white)', color: 'var(--ink)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-l)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              Guides
            </Link>
            <button
              onClick={() => router.back()}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 20px', background: 'transparent', color: 'var(--ink-2)', border: '1.5px solid transparent', borderRadius: 'var(--r-l)', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Go back
            </button>
          </div>

        </div>
      </Layout>
    </>
  );
};

function ResultSection({ label, count, children }: { label: string; count: number; children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', overflow: 'hidden' }}>
      <div style={{ padding: '10px 16px', fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink-3)', background: 'var(--surface, #f9f9f9)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{label}</span>
        <span style={{ fontWeight: 500, letterSpacing: 0, textTransform: 'none', fontSize: 12 }}>{count}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}

function ResultRow({ href, primary, secondary }: { href: string; primary: string; secondary: string }) {
  return (
    <Link
      href={href}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 16px', textDecoration: 'none', borderBottom: '1px solid var(--border)', background: 'var(--white)', transition: 'background .1s' }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface, #f7f7f7)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'var(--white)')}
    >
      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{primary}</span>
      <span style={{ fontSize: 12, color: 'var(--ink-3)', flexShrink: 0, whiteSpace: 'nowrap' }}>{secondary}</span>
    </Link>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const tools   = getLiveTools();
  const guides  = getAllGuides();
  const featured = tools.find(t => t.featured);
  const popular = [
    ...(featured ? [featured] : []),
    ...tools.filter(t => t.slug !== featured?.slug),
  ].slice(0, 6);

  return {
    props: {
      tools:   tools.map(t => ({ ...t, variants: t.variants ?? [] })),
      guides,
      popular,
    },
  };
};

export default NotFoundPage;
