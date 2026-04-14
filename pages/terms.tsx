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

const TermsPage: NextPage = () => (
    <>
      <Head>
        <title>Terms of Service — ToolKit</title>
        <meta name="description" content="ToolKit Terms of Service. The rules and conditions for using our free browser-based tools." />
        <link rel="canonical" href={`${BASE_URL}/terms`} />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <Layout>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(40px,6vw,72px) 16px 80px' }}>

          <nav aria-label="Breadcrumb" style={{ marginBottom: 24 }}>
            <ol style={{ display: 'flex', gap: 6, alignItems: 'center', listStyle: 'none', fontSize: 13, color: 'var(--ink-3)' }}>
              <li><Link href="/" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Home</Link></li>
              <li aria-hidden>›</li>
              <li aria-current="page" style={{ color: 'var(--ink)', fontWeight: 600 }}>Terms of Service</li>
            </ol>
          </nav>

          <p className="ov" style={{ marginBottom: 10 }}>Legal</p>
          <h1 className="disp" style={{ fontSize: 'clamp(26px, 4vw, 38px)', marginBottom: 12 }}>Terms of Service</h1>
          <p style={{ fontSize: 13, color: 'var(--ink-4)', marginBottom: 36 }}>Last updated: {UPDATED}</p>

          <div className="rule" />

          {/* TL;DR */}
          <div style={{ margin: '32px 0', padding: '20px 24px', background: 'var(--blue-lt)', border: '1px solid rgba(59,130,246,.2)', borderRadius: 'var(--r-l)' }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>TL;DR</p>
            <ul style={{ paddingLeft: 18, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.9, margin: 0 }}>
              <li>ToolKit is <strong>free to use</strong>, no account required</li>
              <li>Tools are provided <strong>as-is</strong> — verify output for critical use</li>
              <li>Don't use ToolKit for illegal activity or to harm others</li>
              <li>We can change these terms — continued use means acceptance</li>
            </ul>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

            <Section title="1. Acceptance of Terms">
              <p>By accessing or using <strong>www.webtoolkit.tech</strong> ("ToolKit", "we", "us"), you agree to be bound by these Terms of Service. If you do not agree, do not use the website.</p>
            </Section>

            <Section title="2. Description of Service">
              <p style={{ marginBottom: 12 }}>ToolKit is a free collection of browser-based utilities for developers and designers. All tools run entirely within your browser — we do not receive, store, or process the data you enter into our tools.</p>
              <p>We provide the service on a best-effort basis. Availability, features, and tool behavior may change without notice.</p>
            </Section>

            <Section title="3. Acceptable Use">
              <p style={{ marginBottom: 12 }}>You agree not to:</p>
              <ul style={{ paddingLeft: 22, lineHeight: 1.9 }}>
                <li>Use ToolKit for any illegal purpose or in violation of any local, state, national, or international law</li>
                <li>Attempt to disrupt, reverse-engineer, or gain unauthorized access to the website or its infrastructure</li>
                <li>Use automated scripts, scrapers, or crawlers to abuse the service or generate excessive load</li>
                <li>Use the tools to harm, harass, defame, or violate the rights of others</li>
                <li>Use cryptographic tools (password generators, hashes, encoding) to facilitate fraud, credential theft, or unauthorized access to systems you do not own</li>
              </ul>
            </Section>

            <Section title="4. No Warranty — Tools Provided &ldquo;As Is&rdquo;">
              <p style={{ marginBottom: 12 }}>The tools on ToolKit are provided <strong>&ldquo;as is&rdquo; and &ldquo;as available&rdquo;</strong> without warranty of any kind, whether express or implied, including but not limited to merchantability, fitness for a particular purpose, or non-infringement.</p>
              <p>We make no guarantee that tool output is correct, complete, or suitable for any particular use. <strong>You are responsible for verifying output before relying on it</strong> — especially for security-sensitive contexts (passwords, hashes, tokens, encoding).</p>
            </Section>

            <Section title="5. Limitation of Liability">
              <p>To the maximum extent permitted by law, ToolKit and its operators shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the website or its tools, including but not limited to data loss, security breaches, financial loss, or business interruption — even if we have been advised of the possibility of such damages.</p>
            </Section>

            <Section title="6. Intellectual Property">
              <p style={{ marginBottom: 12 }}>The ToolKit name, logo, design, and written content (including guides and documentation) are the property of the website operator and protected by applicable copyright and trademark law.</p>
              <p>Data you enter into tools remains entirely yours — we have no claim on it and no technical ability to access it.</p>
            </Section>

            <Section title="7. Third-Party Links and Services">
              <p>ToolKit may contain links to third-party websites (including affiliate partners) or load third-party resources (fonts, analytics). We are not responsible for the content, privacy practices, or availability of third-party services. Your interactions with third parties are governed by their own terms.</p>
            </Section>

            <Section title="8. Affiliate Disclosure">
              <p>Some links on ToolKit are affiliate links. If you click an affiliate link and make a purchase, we may receive a commission at no additional cost to you. This does not affect our recommendations — we only link to products we consider genuinely useful.</p>
            </Section>

            <Section title="9. Indemnification">
              <p>You agree to indemnify and hold ToolKit harmless from any claims, damages, or expenses (including reasonable attorneys' fees) arising from your violation of these Terms or your misuse of the service.</p>
            </Section>

            <Section title="10. Changes to These Terms">
              <p>We may update these Terms of Service from time to time. The &ldquo;Last updated&rdquo; date at the top reflects the most recent revision. Material changes will be communicated by updating the date. Continued use of ToolKit after changes constitutes acceptance.</p>
            </Section>

            <Section title="11. Termination">
              <p>We reserve the right to restrict access to ToolKit at our discretion, without notice, for any reason including suspected violation of these Terms.</p>
            </Section>

            <Section title="12. Governing Law">
              <p>These Terms are governed by the laws of the jurisdiction in which the website operator resides, without regard to conflict-of-law principles. Any disputes arising from use of ToolKit shall be resolved in the courts of that jurisdiction.</p>
            </Section>

            <Section title="13. Contact">
              <p>Questions about these Terms? Visit our <Link href="/contact" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Contact page</Link>.</p>
            </Section>

          </div>

          <div className="rule" style={{ marginTop: 48 }} />
          <div style={{ marginTop: 28, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <Link href="/"        style={{ fontSize: 14, color: 'var(--ink-3)', textDecoration: 'none' }}>← Back to home</Link>
            <Link href="/privacy" style={{ fontSize: 14, color: 'var(--ink-3)', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/cookies" style={{ fontSize: 14, color: 'var(--ink-3)', textDecoration: 'none' }}>Cookie Policy</Link>
          </div>

        </div>
      </Layout>
    </>
);

export default TermsPage;
