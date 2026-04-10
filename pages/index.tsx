import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '@/components/ui/Layout';
import { ToolCard } from '@/components/ui/ToolCard';
import { getByCategory, getLiveTools, getSoonTools } from '@/lib/registry';
import { IcoShield, IcoCode, IcoCount, IcoZap, IcoKey } from '@/components/icons';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.webtoolkit.tech';

const FEATURES = [
  { Icon: IcoZap,    color: 'var(--green)', bg: 'var(--green-lt)', title: '100% browser-based',   desc: 'Every tool runs entirely in your browser. Nothing is sent to a server — ever.' },
  { Icon: IcoShield, color: 'var(--blue)',  bg: 'var(--blue-lt)',  title: 'Private by design',    desc: 'No accounts, no tracking, no data collection. Open the tool and use it.' },
  { Icon: IcoCode,   color: 'var(--amber)', bg: 'var(--amber-lt)', title: 'Built for developers', desc: 'camelCase, snake_case, JSON formatting, Base64, hashes — the tools you actually need.' },
  { Icon: IcoCount,  color: 'var(--ink-2)', bg: 'var(--border)',   title: 'Free forever',         desc: 'All tools are free with no rate limits, no paywalls, no upgrade prompts.' },
];

const CATEGORY_SLUGS: Record<string, string> = {
  'Security':        '/tools/security',
  'Developer Tools': '/tools/developer',
  'Text & Writing':  '/tools/text',
  'Design':          '/tools/design',
};

const HomePage: NextPage = () => {
  const byCategory = getByCategory();
  const liveTools  = getLiveTools();
  const soonTools  = getSoonTools();

  /* ── Schema blocks ─────────────────────────────────────── */
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'ToolKit',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.svg`,
    description: 'Free browser-based online tools for developers and designers. No signup, no tracking, 100% client-side.',
    sameAs: [
      // fill in after Product Hunt / GitHub / Twitter registration:
      // 'https://github.com/your-org',
      // 'https://twitter.com/yourhandle',
      // 'https://www.producthunt.com/products/toolkit',
    ],
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
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/tools?q={search_term_string}`,
      },
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

          {/* Organization — entity declaration */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
          {/* WebSite — SearchAction */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
          {/* ItemList — top-level tool directory */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
        </Head>

        <Layout activeNav="home">

          {/* ── Hero ───────────────────────────────── */}
          <section style={{ padding: 'clamp(40px, 8vw, 80px) 0 0' }}>
            <div className="wrap-wide">
              <div className="a0" style={{ marginBottom: 12 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'var(--green)', background: 'var(--green-lt)', border: '1px solid var(--green-mid)', borderRadius: 99, padding: '4px 12px' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
                {liveTools.length} tools live · {soonTools.length} coming soon
              </span>
              </div>

              <h1 className="disp a1" style={{ fontSize: 'clamp(32px, 6vw, 60px)', marginBottom: 20, maxWidth: 720 }}>
                Free online tools for developers&nbsp;&amp; designers
              </h1>

              <p className="a2" style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'var(--ink-2)', lineHeight: 1.65, maxWidth: 560, marginBottom: 32 }}>
                Password generators, text utilities, color palettes, JSON formatters and more.
                Every tool runs in your browser — no signup, no tracking, nothing stored.
              </p>

              <div className="a3" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link href="/tools" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '12px 22px', background: 'var(--ink)', color: '#fff', borderRadius: 'var(--r-l)', fontSize: 15, fontWeight: 600, textDecoration: 'none', transition: 'background .13s' }}>
                  Browse all tools →
                </Link>
                <Link href="/tools/password-generator" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '12px 22px', background: 'var(--white)', color: 'var(--ink)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-l)', fontSize: 15, fontWeight: 600, textDecoration: 'none', transition: 'border-color .13s' }}>
                  <IcoKey size={14} /> Password Generator
                </Link>
              </div>
            </div>
          </section>

          {/* ── Stats ──────────────────────────────── */}
          <section style={{ padding: '48px 0 0' }}>
            <div className="wrap-wide">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
                {[
                  { value: liveTools.length + '+', label: 'Tools available', color: 'var(--green)' },
                  { value: '0',                    label: 'Data collected',   color: 'var(--red)'   },
                  { value: '100%',                 label: 'Client-side',      color: 'var(--blue)'  },
                  { value: 'Free',                 label: 'Always',           color: 'var(--ink)'   },
                ].map(s => (
                    <div key={s.label} style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
                      <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 700, color: s.color, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.value}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 5, fontWeight: 500 }}>{s.label}</div>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Why ToolKit ────────────────────────── */}
          <section style={{ padding: '64px 0 0' }}>
            <div className="wrap-wide">
              <div style={{ marginBottom: 28 }}>
                <p className="ov" style={{ marginBottom: 10 }}>Why ToolKit</p>
                <h2 className="hdg" style={{ fontSize: 'clamp(20px, 3vw, 28px)' }}>
                  Designed to respect your time and privacy
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
                {FEATURES.map(({ Icon, color, bg, title, desc }) => (
                    <div key={title} style={{ padding: '20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 9, background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                        <Icon size={16} />
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                      <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6 }}>{desc}</div>
                    </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Tool directory ─────────────────────── */}
          <section style={{ padding: '64px 0 0' }}>
            <div className="wrap-wide">
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <p className="ov" style={{ marginBottom: 10 }}>Tools</p>
                  <h2 className="hdg" style={{ fontSize: 'clamp(20px, 3vw, 28px)' }}>All {liveTools.length} tools, right now</h2>
                </div>
                <Link href="/tools" style={{ fontSize: 13, fontWeight: 600, color: 'var(--green)', textDecoration: 'none' }}>
                  View full directory →
                </Link>
              </div>
              {Array.from(byCategory.entries()).map(([category, tools]) => {
                // Live first, then soon — max 4 per category on homepage
                const sorted = [
                  ...tools.filter(t => t.live),
                  ...tools.filter(t => !t.live),
                ].slice(0, 4);
                return (
                    <div key={category} style={{ marginBottom: 32 }}>
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
          </section>

          {/* ── Bottom CTA ─────────────────────────── */}
          <section style={{ padding: '64px 0 0' }}>
            <div className="wrap-wide">
              <div style={{ padding: 'clamp(28px, 5vw, 48px)', background: 'var(--ink)', borderRadius: 'var(--r-xl)', textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(20px, 3vw, 28px)', color: '#fff', marginBottom: 12, letterSpacing: '-0.02em' }}>
                  Everything you need, nothing you don't
                </h2>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', marginBottom: 24, maxWidth: 420, margin: '0 auto 24px' }}>
                  No accounts. No ads. No data collection. Just tools that work.
                </p>
                <Link href="/tools" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '12px 24px', background: 'var(--green)', color: '#fff', borderRadius: 'var(--r-l)', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
                  Browse all tools →
                </Link>
              </div>
            </div>
          </section>

        </Layout>
      </>
  );
};

export default HomePage;