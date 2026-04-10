import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '@/components/ui/Layout';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.webtoolkit.tech';
const UPDATED  = '2026-03-26';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
      <section>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 18, color: 'var(--ink)', marginBottom: 12, letterSpacing: '-0.01em' }}>
          {title}
        </h2>
        <div style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
          {children}
        </div>
      </section>
  );
}

const PrivacyPage: NextPage = () => (
    <>
      <Head>
        <title>Privacy Policy — ToolKit</title>
        <meta name="description" content="ToolKit privacy policy. We don't collect or store any data you enter into our tools. All processing happens locally in your browser." />
        <link rel="canonical" href={`${BASE_URL}/privacy`} />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <Layout>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(40px,6vw,72px) 16px 80px' }}>

          <nav aria-label="Breadcrumb" style={{ marginBottom: 24 }}>
            <ol style={{ display: 'flex', gap: 6, alignItems: 'center', listStyle: 'none', fontSize: 13, color: 'var(--ink-3)' }}>
              <li><Link href="/" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Home</Link></li>
              <li aria-hidden>›</li>
              <li aria-current="page" style={{ color: 'var(--ink)', fontWeight: 600 }}>Privacy Policy</li>
            </ol>
          </nav>

          <p className="ov" style={{ marginBottom: 10 }}>Legal</p>
          <h1 className="disp" style={{ fontSize: 'clamp(26px, 4vw, 38px)', marginBottom: 12 }}>Privacy Policy</h1>
          <p style={{ fontSize: 13, color: 'var(--ink-4)', marginBottom: 36 }}>Last updated: {UPDATED}</p>

          <div className="rule" />

          {/* TL;DR */}
          <div style={{ margin: '32px 0', padding: '20px 24px', background: 'var(--green-lt)', border: '1px solid var(--green-mid)', borderRadius: 'var(--r-l)' }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>TL;DR</p>
            <ul style={{ paddingLeft: 18, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.9, margin: 0 }}>
              <li>We <strong>never see</strong> any data you enter into our tools</li>
              <li>All tool processing happens <strong>locally in your browser</strong></li>
              <li>We use Google Analytics for <strong>anonymized</strong> page-view statistics only</li>
              <li>We use <strong>no advertising trackers</strong> or third-party data brokers</li>
              <li>We store <strong>no cookies</strong> beyond what Google Analytics sets</li>
            </ul>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

            <Section title="1. Who we are">
              <p>ToolKit (<strong>www.webtoolkit.tech</strong>) is a free collection of browser-based utilities for developers and designers. References to "we", "us", or "our" in this policy refer to the ToolKit website operator.</p>
            </Section>

            <Section title="2. Data you enter into tools">
              <p style={{ marginBottom: 12 }}>All tools on ToolKit operate entirely within your browser using JavaScript and native browser APIs. <strong>No data you enter into any tool is transmitted to our servers or any third-party server.</strong></p>
              <p>This applies to: passwords, text content, JSON data, hash inputs, Base64 strings, URLs, regular expressions, Markdown content, and all other inputs. We have no technical ability to access this data because it never leaves your device.</p>
            </Section>

            <Section title="3. Analytics">
              <p style={{ marginBottom: 12 }}>We use <strong>Google Analytics 4</strong> to collect anonymized usage statistics including: pages visited, time on page, browser type, device type, and general geographic region (country level). We do not enable features that collect personally identifiable information.</p>
              <p style={{ marginBottom: 12 }}>You can opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Google Analytics Opt-out Browser Add-on</a>.</p>
              <p>We do not use any other analytics services, advertising networks, or tracking pixels.</p>
            </Section>

            <Section title="4. Cookies">
              <p>We do not set any cookies ourselves. Google Analytics sets the following first-party cookies: <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>_ga</code> (2 years) and <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>_ga_*</code> (2 years). These contain a randomly generated identifier used solely to distinguish returning visitors for statistical purposes.</p>
            </Section>

            <Section title="5. Affiliate links">
              <p>Some pages contain affiliate links to third-party products (such as password managers). If you click an affiliate link and make a purchase, we may receive a commission at no additional cost to you. We do not share any personal data with affiliate partners.</p>
            </Section>

            <Section title="6. Third-party services">
              <p style={{ marginBottom: 12 }}>ToolKit is hosted on <strong>Vercel</strong>, which may collect standard server access logs (IP address, timestamp, URL). These are governed by <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Vercel's Privacy Policy</a>.</p>
              <p>Fonts are loaded from Google Fonts. See <a href="https://developers.google.com/fonts/faq/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Google Fonts Privacy FAQ</a>.</p>
            </Section>

            <Section title="7. Children's privacy">
              <p>ToolKit is not directed at children under 13. We do not knowingly collect personal information from children.</p>
            </Section>

            <Section title="8. Changes to this policy">
              <p>We may update this Privacy Policy from time to time. The "Last updated" date at the top reflects the most recent revision. Continued use of ToolKit after changes constitutes acceptance of the updated policy.</p>
            </Section>

            <Section title="9. Contact">
              <p>Questions about this Privacy Policy? Visit our <Link href="/about" style={{ color: 'var(--green)', textDecoration: 'underline' }}>About page</Link> for contact information.</p>
            </Section>

          </div>

          <div className="rule" style={{ marginTop: 48 }} />
          <div style={{ marginTop: 28, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <Link href="/"      style={{ fontSize: 14, color: 'var(--ink-3)', textDecoration: 'none' }}>← Back to home</Link>
            <Link href="/about" style={{ fontSize: 14, color: 'var(--ink-3)', textDecoration: 'none' }}>About ToolKit</Link>
          </div>

        </div>
      </Layout>
    </>
);

export default PrivacyPage;