import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '@/components/ui/Layout';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.webtoolkit.tech';
const UPDATED  = '2026-04-14';

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

const code: React.CSSProperties = { fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 };

const CookiesPage: NextPage = () => (
    <>
      <Head>
        <title>Cookie Policy — ToolKit</title>
        <meta name="description" content="ToolKit Cookie Policy. What cookies we use, why we use them, and how to control them." />
        <link rel="canonical" href={`${BASE_URL}/cookies`} />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <Layout>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(40px,6vw,72px) 16px 80px' }}>

          <nav aria-label="Breadcrumb" style={{ marginBottom: 24 }}>
            <ol style={{ display: 'flex', gap: 6, alignItems: 'center', listStyle: 'none', fontSize: 13, color: 'var(--ink-3)' }}>
              <li><Link href="/" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Home</Link></li>
              <li aria-hidden>›</li>
              <li aria-current="page" style={{ color: 'var(--ink)', fontWeight: 600 }}>Cookie Policy</li>
            </ol>
          </nav>

          <p className="ov" style={{ marginBottom: 10 }}>Legal</p>
          <h1 className="disp" style={{ fontSize: 'clamp(26px, 4vw, 38px)', marginBottom: 12 }}>Cookie Policy</h1>
          <p style={{ fontSize: 13, color: 'var(--ink-4)', marginBottom: 36 }}>Last updated: {UPDATED}</p>

          <div className="rule" />

          {/* TL;DR */}
          <div style={{ margin: '32px 0', padding: '20px 24px', background: 'var(--green-lt)', border: '1px solid var(--green-mid)', borderRadius: 'var(--r-l)' }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>TL;DR</p>
            <ul style={{ paddingLeft: 18, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.9, margin: 0 }}>
              <li>We store a small <strong>localStorage</strong> entry for your cookie-consent choice</li>
              <li>We use <strong>no marketing or tracking cookies</strong> unless you consent</li>
              <li>You can change your choice any time via <strong>Cookie preferences</strong> in the footer</li>
            </ul>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

            <Section title="1. What are cookies?">
              <p>Cookies are small text files websites place on your device to remember information between visits. &ldquo;Similar technologies&rdquo; like <code style={code}>localStorage</code> and <code style={code}>sessionStorage</code> serve similar purposes and are covered by this policy.</p>
            </Section>

            <Section title="2. Categories of cookies we use">
              <p style={{ marginBottom: 16 }}>We categorize storage into three groups. Only the first is required; you control the rest through our consent banner.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                <div style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 'var(--r-m)', background: 'var(--white)' }}>
                  <p style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>Strictly necessary <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--green)' }}>(always on)</span></p>
                  <p style={{ marginBottom: 8 }}>Required for the website to function. No tracking.</p>
                  <ul style={{ paddingLeft: 18, fontSize: 14, lineHeight: 1.8, margin: 0 }}>
                    <li><code style={code}>tk_consent</code> — your consent choice (localStorage, no expiry until cleared)</li>
                  </ul>
                </div>

                <div style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 'var(--r-m)', background: 'var(--white)' }}>
                  <p style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>Analytics <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink-3)' }}>(optional)</span></p>
                  <p style={{ marginBottom: 8 }}>Anonymous, aggregated usage statistics. Helps us understand which tools are used most. Set only if you accept analytics in the consent banner.</p>
                  <ul style={{ paddingLeft: 18, fontSize: 14, lineHeight: 1.8, margin: 0 }}>
                    <li>None currently active. This category is reserved for future privacy-first analytics (Plausible or similar — cookieless).</li>
                  </ul>
                </div>

                <div style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 'var(--r-m)', background: 'var(--white)' }}>
                  <p style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>Marketing <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink-3)' }}>(optional)</span></p>
                  <p style={{ marginBottom: 8 }}>Third-party cookies for advertising and affiliate tracking. Set only if you accept marketing in the consent banner.</p>
                  <ul style={{ paddingLeft: 18, fontSize: 14, lineHeight: 1.8, margin: 0 }}>
                    <li>None currently active. This category is reserved for future ad networks (only on guide pages) and affiliate tracking.</li>
                  </ul>
                </div>

              </div>
            </Section>

            <Section title="3. How to control cookies">
              <p style={{ marginBottom: 12 }}>On your first visit, a consent banner asks for your preferences. You can change them any time by clicking <strong>Cookie preferences</strong> in the site footer.</p>
              <p>You can also block or delete cookies through your browser settings. Doing so will not affect core tool functionality — all tools run locally in your browser and do not depend on cookies.</p>
            </Section>

            <Section title="4. Third-party cookies">
              <p>When third-party services (analytics, ads, affiliate) are enabled via your consent, those providers may set their own cookies governed by their respective privacy policies. We will list each active provider here before enabling it.</p>
            </Section>

            <Section title="5. Changes to this policy">
              <p>We may update this Cookie Policy to reflect changes in services or regulations. The &ldquo;Last updated&rdquo; date at the top reflects the most recent revision.</p>
            </Section>

            <Section title="6. Contact">
              <p>Questions? Visit our <Link href="/contact" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Contact page</Link> or read the <Link href="/privacy" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Privacy Policy</Link>.</p>
            </Section>

          </div>

          <div className="rule" style={{ marginTop: 48 }} />
          <div style={{ marginTop: 28, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <Link href="/"        style={{ fontSize: 14, color: 'var(--ink-3)', textDecoration: 'none' }}>← Back to home</Link>
            <Link href="/privacy" style={{ fontSize: 14, color: 'var(--ink-3)', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/terms"   style={{ fontSize: 14, color: 'var(--ink-3)', textDecoration: 'none' }}>Terms of Service</Link>
          </div>

        </div>
      </Layout>
    </>
);

export default CookiesPage;
