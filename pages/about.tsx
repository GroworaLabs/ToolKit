import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '@/components/ui/Layout';
import { getLiveTools, getSoonTools } from '@/lib/registry';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.webtoolkit.tech';

const AboutPage: NextPage = () => {
  const liveCount = getLiveTools().length;
  const soonCount = getSoonTools().length;

  return (
      <>
        <Head>
          <title>About ToolKit — Free Browser-Based Tools for Developers</title>
          <meta name="description" content="ToolKit is a free collection of browser-based utilities for developers and designers. No signup, no tracking, no data collection. Built to respect your privacy." />
          <link rel="canonical" href={`${BASE_URL}/about`} />
          <meta property="og:title"       content="About ToolKit" />
          <meta property="og:description" content="Free browser-based tools for developers and designers. No signup, no tracking, 100% client-side." />
          <meta property="og:type"        content="website" />
          <meta property="og:url"         content={`${BASE_URL}/about`} />
          <meta property="og:image"       content={`${BASE_URL}/og-image.png`} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AboutPage',
              name: 'About ToolKit',
              url: `${BASE_URL}/about`,
              description: 'Free browser-based tools for developers and designers.',
              publisher: {
                '@type': 'Organization',
                '@id': `${BASE_URL}/#organization`,
                name: 'ToolKit',
                url: BASE_URL,
              },
            }),
          }} />
        </Head>

        <Layout>
          <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(40px,6vw,72px) 16px 80px' }}>

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: 24 }}>
              <ol style={{ display: 'flex', gap: 6, alignItems: 'center', listStyle: 'none', fontSize: 13, color: 'var(--ink-3)' }}>
                <li><Link href="/" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Home</Link></li>
                <li aria-hidden>›</li>
                <li aria-current="page" style={{ color: 'var(--ink)', fontWeight: 600 }}>About</li>
              </ol>
            </nav>

            <p className="ov" style={{ marginBottom: 10 }}>About</p>
            <h1 className="disp" style={{ fontSize: 'clamp(28px, 5vw, 42px)', marginBottom: 20 }}>
              Built for developers.<br />Designed for privacy.
            </h1>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 28, marginBottom: 40, flexWrap: 'wrap' }}>
              {[
                { value: `${liveCount}+`, label: 'Tools live'    },
                { value: `${soonCount}+`, label: 'Coming soon'   },
                { value: '0',             label: 'Data collected' },
                { value: '100%',          label: 'Client-side'   },
              ].map(({ value, label }) => (
                  <div key={label}>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-4)', marginTop: 4, fontWeight: 500 }}>{label}</div>
                  </div>
              ))}
            </div>

            <div className="rule" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 36, marginTop: 36 }}>

              <section>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 20, color: 'var(--ink)', marginBottom: 12, letterSpacing: '-0.01em' }}>What is ToolKit?</h2>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 12 }}>
                  ToolKit is a free collection of browser-based utilities for developers, designers, and anyone who works with text, code, or data. Every tool runs entirely in your browser — no server receives your input, no database stores your data, no third party is involved.
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
                  The project started from a simple frustration: too many online tools are slow, ad-heavy, require account creation, or quietly log your inputs. ToolKit is the opposite — fast, clean, private, and free.
                </p>
              </section>

              <section>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 20, color: 'var(--ink)', marginBottom: 12, letterSpacing: '-0.01em' }}>How it works</h2>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 12 }}>
                  Every tool uses native browser APIs — the Web Crypto API for password and hash generation, <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>JSON.parse()</code> and <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>JSON.stringify()</code> for the JSON Formatter, <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>crypto.randomUUID()</code> for UUIDs. No external libraries handle core tool logic.
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
                  You can verify this yourself — open your browser's Network tab while using any tool. You'll see no outbound requests for the tool computation itself.
                </p>
              </section>

              <section>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 20, color: 'var(--ink)', marginBottom: 12, letterSpacing: '-0.01em' }}>What we collect</h2>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 12 }}>
                  We use Google Analytics to understand which tools are most useful, how users navigate the site, and where to focus development. Analytics data is anonymized and aggregated — we see page views and session counts, not individual user content.
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
                  We do not collect, store, or transmit any content you enter into the tools. Your passwords, code, text, and other inputs never leave your browser. Read the full <Link href="/privacy" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Privacy Policy</Link>.
                </p>
              </section>

              <section>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 20, color: 'var(--ink)', marginBottom: 12, letterSpacing: '-0.01em' }}>What's coming next</h2>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
                  We're actively building more tools — QR code generator, timestamp converter, text diff checker, color converter, CSS gradient generator, and more. All {soonCount}+ planned tools are listed in the <Link href="/tools" style={{ color: 'var(--green)', textDecoration: 'underline' }}>tools directory</Link> as coming soon.
                </p>
              </section>

              <section>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 20, color: 'var(--ink)', marginBottom: 12, letterSpacing: '-0.01em' }}>Tech stack</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['Next.js 14', 'TypeScript', 'Web Crypto API', 'Vercel', 'Static Site Generation'].map(tag => (
                      <span key={tag} style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-2)', background: 'var(--white)', border: '1px solid var(--border)', padding: '4px 10px', borderRadius: 'var(--r-s)' }}>
                    {tag}
                  </span>
                  ))}
                </div>
              </section>

            </div>

            <div className="rule" style={{ marginTop: 48 }} />

            <div style={{ marginTop: 32, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/tools" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '11px 20px', background: 'var(--ink)', color: '#fff', borderRadius: 'var(--r-l)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                Browse all tools →
              </Link>
              <Link href="/privacy" style={{ display: 'inline-flex', alignItems: 'center', padding: '11px 20px', background: 'var(--white)', color: 'var(--ink-2)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-l)', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
                Privacy Policy
              </Link>
            </div>

          </div>
        </Layout>
      </>
  );
};

export default AboutPage;