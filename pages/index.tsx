import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Layout } from '@/components/ui/Layout';
import { ToolCard } from '@/components/ui/ToolCard';
import { GuideCard } from '@/components/ui/GuideCard';
import { getLiveTools, getSoonTools, getFeaturedTools, getByCategory, CATEGORY_SLUGS } from '@/lib/registry';
import { CATEGORIES } from '@/lib/categories';
import { getAllGuides } from '@/lib/guides';
import type { ToolMeta, GuideMeta } from '@/lib/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.webtoolkit.tech';

const CAT_ICONS: Record<string, React.ReactNode> = {
  'Security': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  'Code & Dev': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  'Network & Web': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  'Data & Format': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  'Text & Writing': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  'Design & Media': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/>
      <circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
  'Value Converter': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
      <polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  ),
  'AI': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3"/>
      <path d="M9 9h.01M15 9h.01M9 15h6"/>
    </svg>
  ),
  'QA & Testing': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4"/>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  ),
};

interface CategoryCard {
  slug:  string;
  name:  string;
  href:  string;
  desc:  string;
  count: number;
}

interface Props {
  featuredTools: ToolMeta[];
  categoryCards: CategoryCard[];
  latestGuides:  GuideMeta[];
  guideCount:    number;
}

export const getStaticProps: GetStaticProps<Props> = () => {
  const byCategory = getByCategory();

  const categoryCards: CategoryCard[] = CATEGORIES
    .map(cat => ({
      slug:  cat.slug,
      name:  cat.name,
      href:  CATEGORY_SLUGS[cat.registryKey] ?? '/tools',
      desc:  cat.contentH2,
      count: (byCategory.get(cat.registryKey) ?? []).filter(t => t.live).length,
    }))
    .filter(c => c.count > 0);

  const allGuides = getAllGuides();
  return {
    props: {
      featuredTools: getFeaturedTools(),
      categoryCards,
      latestGuides:  allGuides.slice(0, 6),
      guideCount:    allGuides.length,
    },
  };
};

const HomePage: NextPage<Props> = ({ featuredTools, categoryCards, latestGuides, guideCount }) => {
  const liveTools = getLiveTools();
  const soonTools = getSoonTools();
  const [query, setQuery]   = useState('');
  const [open, setOpen]     = useState(false);
  const [activeTab, setActiveTab] = useState<'tools' | 'variants'>('tools');
  const [isMobile, setIsMobile]   = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();

  const allToolHits = q
    ? [
        ...liveTools.filter(t => t.name.toLowerCase().includes(q)),
        ...liveTools.filter(t => !t.name.toLowerCase().includes(q) && (
          t.tagline.toLowerCase().includes(q) || t.categories[0].toLowerCase().includes(q)
        )),
      ]
    : [];

  interface VariantHit { variantName: string; toolName: string; href: string }
  const allVariantHits: VariantHit[] = q
    ? liveTools.flatMap(t =>
        (t.variants ?? [])
          .filter(v => v.seoH1.toLowerCase().includes(q))
          .map(v => ({ variantName: v.seoH1, toolName: t.name, href: `/tools/${t.slug}/${v.slug}` }))
      )
    : [];

  const hasResults = allToolHits.length > 0 || allVariantHits.length > 0;

  useEffect(() => {
    if (allToolHits.length > 0) setActiveTab('tools');
    else if (allVariantHits.length > 0) setActiveTab('variants');
  }, [q]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'ToolKit',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.svg`,
    description: 'Free browser-based online tools for developers and designers. No signup, no tracking, 100% client-side.',
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: 'ToolKit',
    url: BASE_URL,
    description: 'Free browser-based online tools for developers and designers.',
    publisher: { '@id': `${BASE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/tools?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free Online Developer Tools',
    description: 'Browser-based utilities for developers and designers — no signup, no tracking.',
    url: `${BASE_URL}/tools`,
    numberOfItems: liveTools.length,
    itemListElement: liveTools.map((tool, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: tool.name,
      description: tool.description,
      url: `${BASE_URL}/tools/${tool.slug}`,
    })),
  };

  return (
    <>
      <Head>
        <title>ToolKit — Free Online Tools for Developers &amp; Designers</title>
        <meta name="description" content="Free browser-based tools for developers and designers. Password generators, word counter, JSON formatter, Base64 encoder, color palette generator and more. No signup, no tracking." />
        <meta name="keywords" content="free online tools, developer tools, password generator, word counter, json formatter, base64 encoder, color palette generator, text tools" />
        <link rel="canonical" href={`${BASE_URL}/`} />
        <meta property="og:title"       content="ToolKit — Free Online Tools for Developers & Designers" />
        <meta property="og:description" content="Browser-based tools for developers and designers. No signup, no tracking, always free." />
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content={`${BASE_URL}/`} />
        <meta property="og:image"       content={`${BASE_URL}/og-image.png`} />
        <meta property="og:site_name"   content="ToolKit" />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content="ToolKit — Free Online Tools" />
        <meta name="twitter:description" content="Browser-based tools for developers and designers. Free, no signup." />
        <meta name="twitter:image"       content={`${BASE_URL}/og-image.png`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      </Head>

      <Layout activeNav="home">

        {/* ── Hero ──────────────────────────────────────────── */}
        <section style={{ padding: 'clamp(40px, 8vw, 80px) 0 0' }}>
          <div className="wrap-wide">
            <div className="hero-grid">

            {/* Left column */}
            <div>
            <div className="a0" style={{ marginBottom: 12 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'var(--green)', background: 'var(--green-lt)', border: '1px solid var(--green-mid)', borderRadius: 99, padding: '4px 12px' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
                {liveTools.length} tools live · {soonTools.length} coming soon
              </span>
            </div>

            <h1 className="disp a1" style={{ fontSize: 'clamp(28px, 4vw, 52px)', marginBottom: 16, lineHeight: 1.15 }}>
              Free online tools for developers&nbsp;&amp; designers
            </h1>

            <p className="a2" style={{ fontSize: 'clamp(14px, 1.8vw, 17px)', color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: 28 }}>
              Password generators, text utilities, color palettes, JSON formatters and more.
              Every tool runs in your browser — no signup, no tracking, nothing stored.
            </p>

            {/* Search */}
            <div className="a3" style={{ marginBottom: 24, position: 'relative', zIndex: 10 }} ref={searchRef}>
              <div style={{ position: 'relative' }}>
                <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', pointerEvents: 'none' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="search"
                  value={query}
                  onChange={e => { setQuery(e.target.value); setOpen(true); }}
                  placeholder="Search 70+ tools…"
                  style={{ width: '100%', padding: '13px 16px 13px 42px', fontSize: 15, border: `1.5px solid ${open && q ? 'var(--ink-3)' : 'var(--border)'}`, borderRadius: open && q ? '12px 12px 0 0' : '12px', background: 'var(--white)', color: 'var(--ink)', outline: 'none', boxSizing: 'border-box', transition: 'border-color .15s, border-radius .1s' }}
                  onFocus={e => { setOpen(true); e.currentTarget.style.borderColor = 'var(--ink-3)'; }}
                  onBlur={e => { if (!(open && q)) e.currentTarget.style.borderColor = 'var(--border)'; }}
                  autoComplete="off"
                />

                {open && q && (
                  <div style={{ position: 'absolute', top: 'calc(100% - 1px)', left: 0, right: 0, background: 'var(--white)', border: '1.5px solid var(--ink-3)', borderTop: 'none', borderRadius: '0 0 12px 12px', boxShadow: '0 12px 32px rgba(0,0,0,.12)', zIndex: 1000, overflow: 'hidden' }}>
                    {!hasResults ? (
                      <div style={{ padding: '14px 16px', fontSize: 13, color: 'var(--ink-3)' }}>
                        Nothing found for "<strong style={{ color: 'var(--ink)' }}>{query}</strong>"
                      </div>
                    ) : isMobile ? (
                      <>
                        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--surface, #f9f9f9)' }}>
                          {(['tools', 'variants'] as const).map(tab => {
                            const count = tab === 'tools' ? allToolHits.length : allVariantHits.length;
                            const isActive = activeTab === tab;
                            return (
                              <button key={tab} disabled={!count} onClick={() => setActiveTab(tab)}
                                style={{ flex: 1, padding: '10px 12px', fontSize: 13, fontWeight: isActive ? 700 : 500, color: !count ? 'var(--ink-3)' : isActive ? 'var(--ink)' : 'var(--ink-2)', background: 'transparent', border: 'none', borderBottom: isActive ? '2px solid var(--ink)' : '2px solid transparent', cursor: count ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: -1 }}>
                                {tab === 'tools' ? 'Tools' : 'Presets'}
                                {!!count && <span style={{ fontSize: 11, color: isActive ? 'var(--ink-2)' : 'var(--ink-3)', background: isActive ? 'var(--border)' : 'transparent', borderRadius: 99, padding: '1px 6px' }}>{count}</span>}
                              </button>
                            );
                          })}
                        </div>
                        <div style={{ overflowY: 'auto', maxHeight: 260 }}>
                          {activeTab === 'tools' && allToolHits.map(tool => (
                            <Link key={tool.slug} href={`/tools/${tool.slug}`} onClick={() => { setOpen(false); setQuery(''); }}
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '10px 14px', textDecoration: 'none', borderBottom: '1px solid var(--border)', background: 'var(--white)' }}
                              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface, #f7f7f7)')}
                              onMouseLeave={e => (e.currentTarget.style.background = 'var(--white)')}>
                              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{tool.name}</span>
                              <span style={{ fontSize: 12, color: 'var(--ink-3)', flexShrink: 0 }}>{tool.categories[0]}</span>
                            </Link>
                          ))}
                          {activeTab === 'variants' && allVariantHits.map(v => (
                            <Link key={v.href} href={v.href} onClick={() => { setOpen(false); setQuery(''); }}
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '10px 14px', textDecoration: 'none', borderBottom: '1px solid var(--border)', background: 'var(--white)' }}
                              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface, #f7f7f7)')}
                              onMouseLeave={e => (e.currentTarget.style.background = 'var(--white)')}>
                              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{v.variantName}</span>
                              <span style={{ fontSize: 12, color: 'var(--ink-3)', flexShrink: 0 }}>{v.toolName}</span>
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div style={{ display: 'grid', gridTemplateColumns: allToolHits.length > 0 && allVariantHits.length > 0 ? '1fr 1fr' : '1fr' }}>
                        {allToolHits.length > 0 && (
                          <div style={{ borderRight: allVariantHits.length > 0 ? '1px solid var(--border)' : 'none' }}>
                            <div style={{ padding: '7px 14px 6px', fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink-3)', background: 'var(--surface, #f9f9f9)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                              <span>Tools</span><span style={{ fontWeight: 500, letterSpacing: 0, textTransform: 'none', fontSize: 11 }}>{allToolHits.length}</span>
                            </div>
                            <div style={{ overflowY: 'auto', maxHeight: 280 }}>
                              {allToolHits.map(tool => (
                                <Link key={tool.slug} href={`/tools/${tool.slug}`} onClick={() => { setOpen(false); setQuery(''); }}
                                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '7px 14px', textDecoration: 'none', borderBottom: '1px solid var(--border)', background: 'var(--white)' }}
                                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface, #f7f7f7)')}
                                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--white)')}>
                                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{tool.name}</span>
                                  <span style={{ fontSize: 11, color: 'var(--ink-3)', flexShrink: 0 }}>{tool.categories[0]}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                        {allVariantHits.length > 0 && (
                          <div>
                            <div style={{ padding: '7px 14px 6px', fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink-3)', background: 'var(--surface, #f9f9f9)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                              <span>Presets</span><span style={{ fontWeight: 500, letterSpacing: 0, textTransform: 'none', fontSize: 11 }}>{allVariantHits.length}</span>
                            </div>
                            <div style={{ overflowY: 'auto', maxHeight: 280 }}>
                              {allVariantHits.map(v => (
                                <Link key={v.href} href={v.href} onClick={() => { setOpen(false); setQuery(''); }}
                                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '7px 14px', textDecoration: 'none', borderBottom: '1px solid var(--border)', background: 'var(--white)' }}
                                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface, #f7f7f7)')}
                                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--white)')}>
                                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{v.variantName}</span>
                                  <span style={{ fontSize: 11, color: 'var(--ink-3)', flexShrink: 0 }}>{v.toolName}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="a3" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href="/tools" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '12px 22px', background: '#1c1a14', color: '#fff', borderRadius: 'var(--r-l)', fontSize: 15, fontWeight: 600, textDecoration: 'none' }} className="dark-panel">
                Browse all tools →
              </Link>
              <Link href="/guides" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '12px 22px', background: 'var(--white)', color: 'var(--ink)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-l)', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
                Read guides
              </Link>
            </div>
            </div>{/* /left column */}

            {/* Right column — latest guides */}
            <div className="hero-grid-right">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {latestGuides.slice(0, 2).map(guide => {
                  const date = guide.publishedAt
                    ? new Date(guide.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                    : null;
                  return (
                    <Link key={guide.slug} href={`/guides/${guide.slug}`} style={{ textDecoration: 'none' }}>
                      <div style={{ padding: '20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)', transition: 'border-color .15s, box-shadow .15s', display: 'flex', flexDirection: 'column', gap: 8 }}
                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--green)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(5,150,105,.1)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--sh-xs)'; }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                          <span className="badge b-green">{guide.category}</span>
                          {date && <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{date}</span>}
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.35 }}>{guide.title}</div>
                        <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.55 }}>{guide.description}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 12, textAlign: 'center' }}>
                Latest guides · <Link href="/guides" style={{ color: 'var(--green)', textDecoration: 'none', fontWeight: 600 }}>read all {guideCount} →</Link>
              </p>
            </div>

            </div>{/* /hero-grid */}
          </div>
        </section>

        {/* ── Popular tools ─────────────────────────────────── */}
        <section style={{ padding: '64px 0 0' }}>
          <div className="wrap-wide">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <p className="ov" style={{ marginBottom: 8 }}>Popular tools</p>
                <h2 className="hdg" style={{ fontSize: 'clamp(20px, 3vw, 26px)' }}>Most used by developers</h2>
              </div>
              <Link href="/tools" style={{ fontSize: 13, fontWeight: 600, color: 'var(--green)', textDecoration: 'none' }}>
                View all {liveTools.length} tools →
              </Link>
            </div>
            <div className="tools-grid">
              {featuredTools.map(tool => <ToolCard key={tool.slug} tool={tool} />)}
            </div>
          </div>
        </section>

        {/* ── Browse by category ────────────────────────────── */}
        <section style={{ padding: '64px 0 0' }}>
          <div className="wrap-wide">
            <div style={{ marginBottom: 24 }}>
              <p className="ov" style={{ marginBottom: 8 }}>Categories</p>
              <h2 className="hdg" style={{ fontSize: 'clamp(20px, 3vw, 26px)' }}>Browse by category</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
              {categoryCards.map(cat => (
                <Link key={cat.slug} href={cat.href} style={{ textDecoration: 'none' }}>
                  <div style={{ padding: '18px 20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)', transition: 'border-color .15s, box-shadow .15s', display: 'flex', flexDirection: 'column', gap: 10, height: '100%', boxSizing: 'border-box' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--green)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(5,150,105,.1)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--sh-xs)'; }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--green-lt)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {CAT_ICONS[cat.name] ?? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/></svg>
                        )}
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', background: 'var(--border)', borderRadius: 99, padding: '3px 8px' }}>
                        {cat.count} tools
                      </span>
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{cat.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>{cat.desc}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Guides ────────────────────────────────────────── */}
        {latestGuides.length > 0 && (
          <section style={{ padding: '64px 0 0' }}>
            <div className="wrap-wide">
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <p className="ov" style={{ marginBottom: 8 }}>Guides & reviews</p>
                  <h2 className="hdg" style={{ fontSize: 'clamp(20px, 3vw, 26px)' }}>Practical reads for developers</h2>
                </div>
                <Link href="/guides" style={{ fontSize: 13, fontWeight: 600, color: 'var(--green)', textDecoration: 'none' }}>
                  All {guideCount} guides →
                </Link>
              </div>
              <div className="guides-grid">
                {latestGuides.map(guide => <GuideCard key={guide.slug} guide={guide} />)}
              </div>
            </div>
          </section>
        )}

        {/* ── Bottom CTA ────────────────────────────────────── */}
        <section style={{ padding: '64px 0 0' }}>
          <div className="wrap-wide">
            <div className="dark-panel" style={{ padding: 'clamp(28px, 5vw, 48px)', background: '#1c1a14', borderRadius: 'var(--r-xl)', textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(20px, 3vw, 28px)', color: '#fff', marginBottom: 12, letterSpacing: '-0.02em' }}>
                Everything you need, nothing you don't
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', margin: '0 auto 24px', maxWidth: 420 }}>
                No accounts. No ads. No data collection. Just tools that work.
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/tools" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '12px 24px', background: 'var(--green)', color: '#fff', borderRadius: 'var(--r-l)', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
                  Browse all tools →
                </Link>
                <Link href="/guides" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '12px 24px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--r-l)', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
                  Read the guides
                </Link>
              </div>
            </div>
          </div>
        </section>

      </Layout>
    </>
  );
};

export default HomePage;
