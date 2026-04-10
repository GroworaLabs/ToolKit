export default function QrCodeGeneratorContent() {
  return (
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
        <div>

          {/* ── What is ─────────────────────────────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              What is a QR code?
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              A QR code (Quick Response code) is a two-dimensional barcode that stores data as a pattern of black and white squares arranged in a grid. Invented by Denso Wave in 1994 for tracking automotive parts, QR codes became ubiquitous after smartphone cameras gained the ability to read them natively — no app required. Today they are the standard way to bridge physical and digital content.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              Unlike a traditional barcode which stores data only horizontally, a QR code stores data in both dimensions — which is why it can hold significantly more information. A standard QR code can store up to <strong style={{ color: 'var(--ink)' }}>7,089 numeric characters</strong>, <strong style={{ color: 'var(--ink)' }}>4,296 alphanumeric characters</strong>, or <strong style={{ color: 'var(--ink)' }}>2,953 bytes</strong> of binary data (enough for a URL plus metadata).
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
              This generator creates <strong style={{ color: 'var(--ink)' }}>static QR codes</strong> — the data is encoded directly into the pattern. No server, no redirect, no account required. The code is generated locally in your browser using the <a href="https://www.npmjs.com/package/qrcode" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'underline' }}>qrcode</a> library and the HTML Canvas API.
            </p>
          </section>


          {/* ── What to encode ──────────────────────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              What can you encode in a QR code?
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
              Any text can be encoded — but using the correct format ensures smartphones handle it correctly:
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                  {['Content type', 'Format example', 'What it does'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                  ))}
                </tr>
                </thead>
                <tbody>
                {[
                  ['Website URL',    'https://example.com',                         'Opens in browser'],
                  ['Email',          'mailto:hello@example.com',                    'Opens email app with address pre-filled'],
                  ['Email + subject','mailto:hello@example.com?subject=Hello',       'Pre-fills address and subject line'],
                  ['Phone call',     'tel:+12345678900',                            'Prompts a phone call'],
                  ['SMS',            'sms:+12345678900?body=Hello',                 'Opens SMS app with number and message'],
                  ['WiFi (WPA)',     'WIFI:T:WPA;S:NetworkName;P:Password;;',        'Connects to WiFi automatically on iOS/Android'],
                  ['WiFi (open)',    'WIFI:T:nopass;S:NetworkName;;',               'Connects to open WiFi network'],
                  ['Plain text',     'Any plain text here',                         'Displays text after scanning'],
                  ['vCard contact',  'BEGIN:VCARD\\nVERSION:3.0\\nFN:Name\\nEND:VCARD', 'Adds contact to phone book'],
                  ['Location',       'geo:48.8566,2.3522',                          'Opens maps app at coordinates'],
                ].map(([type, fmt, action], i) => (
                    <tr key={type} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{type}</td>
                      <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)' }}>{fmt}</td>
                      <td style={{ padding: '10px 14px', color: 'var(--ink-3)' }}>{action}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Error correction ────────────────────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Error correction levels explained
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
              QR codes use <strong style={{ color: 'var(--ink)' }}>Reed-Solomon error correction</strong> — the same algorithm used in CDs and DVDs. This allows the code to be read even when partially damaged, dirty, or covered. Higher correction means more redundant data, which makes the QR code larger but more resilient.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
              {[
                { level: 'L — 7%',  use: 'Clean digital displays, screens, low-risk environments', color: 'var(--green)',  bg: 'var(--green-lt)' },
                { level: 'M — 15%', use: 'General purpose — the recommended default for most uses', color: 'var(--blue)',   bg: 'var(--blue-lt)' },
                { level: 'Q — 25%', use: 'When adding a logo overlay on top of the QR code',       color: 'var(--amber)',  bg: 'var(--amber-lt)' },
                { level: 'H — 30%', use: 'Outdoor, industrial, or high-damage risk environments',   color: 'var(--red)',    bg: '#fef2f2' },
              ].map(({ level, use, color, bg }) => (
                  <div key={level} style={{ padding: '14px 16px', background: bg, border: `1px solid ${color}33`, borderRadius: 'var(--r-l)' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color, marginBottom: 6 }}>{level}</div>
                    <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.55 }}>{use}</div>
                  </div>
              ))}
            </div>
          </section>

          {/* ── QR code size guide ──────────────────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              QR code size guide for print and digital
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
              The right size depends on where and how the QR code will be scanned. The general rule: <strong style={{ color: 'var(--ink)' }}>scanning distance ÷ 10 = minimum QR code size</strong>. At 50cm scanning distance, the minimum size is 5cm.
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                  {['Use case', 'Min print size', 'Recommended download', 'Notes'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                  ))}
                </tr>
                </thead>
                <tbody>
                {[
                  ['Website / email display', '—',           '256px PNG',  'Screen pixels — size in px is what matters'],
                  ['Business card',           '2.5 × 2.5cm', '512px SVG',  'Use SVG for crisp print at any DPI'],
                  ['Flyer / brochure',        '3 × 3cm',     '512px SVG',  'Scanning from ~30cm distance'],
                  ['Product label',           '2 × 2cm',     '384px SVG',  'Minimum readable size for product packaging'],
                  ['Billboard / large print', '10 × 10cm+',  'SVG',        'SVG scales infinitely — no pixel limit'],
                ].map(([use, size, dl, note], i) => (
                    <tr key={use} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 500, color: 'var(--ink)' }}>{use}</td>
                      <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--green)', fontWeight: 600 }}>{size}</td>
                      <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{dl}</td>
                      <td style={{ padding: '10px 14px', color: 'var(--ink-3)', fontSize: 13 }}>{note}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </section>

          
          {/* ── Dynamic vs static ──────────────────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Static vs dynamic QR codes — which do you need?
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              There are two fundamentally different types of QR codes, and the distinction matters far more than most people realise when choosing a tool to generate them.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 12, marginBottom: 16 }}>
              {[
                {
                  type: 'Static QR codes',
                  tag: 'Generated by this tool',
                  pros: ['No third-party dependency — works forever', 'No ongoing cost — generate once, use indefinitely', 'No tracking — suitable for privacy-sensitive contexts', 'Works offline — no redirect server needed'],
                  cons: ['Cannot be updated after printing', 'No scan analytics or tracking', 'Longer URLs produce denser, harder-to-scan codes'],
                  ideal: 'Ideal for: personal use, one-time campaigns, developer testing, WiFi sharing, vCards, technical use cases',
                },
                {
                  type: 'Dynamic QR codes',
                  tag: 'Provided by QR services',
                  pros: ['Update destination URL without reprinting', 'Scan count analytics and geographic data', 'Shorter codes (redirect URL is short)', 'A/B testing and time-based redirects'],
                  cons: ['Monthly fee from QR service provider', 'Code stops working if the service shuts down', 'All scans route through a third-party server', 'Creates tracking dependency'],
                  ideal: 'Ideal for: print marketing, restaurant menus, event materials, campaigns requiring post-print edits',
                },
              ].map(({ type, tag, pros, cons, ideal }) => (
                <div key={type} style={{ padding: '18px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{type}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--green)', background: 'var(--green-lt)', padding: '2px 8px', borderRadius: 99, display: 'inline-block', marginBottom: 12 }}>{tag}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>Advantages</div>
                  <ul style={{ paddingLeft: 16, margin: '0 0 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {pros.map(p => <li key={p} style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.55 }}>{p}</li>)}
                  </ul>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>Limitations</div>
                  <ul style={{ paddingLeft: 16, margin: '0 0 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {cons.map(c => <li key={c} style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55 }}>{c}</li>)}
                  </ul>
                  <div style={{ fontSize: 12, color: 'var(--ink-4)', lineHeight: 1.5, fontStyle: 'italic' }}>{ideal}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
              For most developer and personal use cases, static QR codes are the correct choice. The only time you need a dynamic QR code is when the destination may change after the code has already been printed at scale — for example, a poster run of 10,000 copies where the campaign landing page URL is not yet finalised.
            </p>
          </section>

          {/* ── QR design best practices ─────────────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              QR code design best practices
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
              A QR code that looks good but fails to scan is worse than an ugly code that works. These guidelines balance aesthetics with reliable scannability:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                {
                  title: 'Always keep a quiet zone',
                  desc: 'The quiet zone is the blank white border surrounding the QR code. The specification requires a minimum of 4 modules (cells) of clear space on all sides. Cropping into the quiet zone is the most common reason a QR code fails to scan. When placing a QR code in a design, ensure at least 4mm of clear space around it at print size.',
                },
                {
                  title: 'Maintain sufficient contrast',
                  desc: 'The dark modules must contrast sharply against the light background. Black on white is optimal. Dark navy on pale cream works. Dark brown on medium orange does not — the contrast is too low for the camera sensor to reliably distinguish modules. Avoid reversing the colors (white modules on dark background) unless you verify scanning with multiple devices.',
                },
                {
                  title: 'Use H error correction when adding a logo',
                  desc: 'Adding a logo in the center of a QR code intentionally covers some modules. This works because of the error correction system — but only if error correction level H (30%) is selected. Level H allows up to 30% of the code to be obscured and still be recoverable. Keep your logo to a maximum of 20–25% of the total code area. The three corner squares (finder patterns) must never be covered.',
                },
                {
                  title: 'Test before you print — on real devices',
                  desc: 'Do not rely solely on your phone to verify scannability. Different camera hardware and QR scanning apps have different tolerances. Test on at least an iPhone and an Android device, scanning at the expected real-world distance. If the code is for print, test a physical printout — screen rendering and print rendering can differ significantly.',
                },
                {
                  title: 'Download as SVG for print, PNG for web',
                  desc: 'SVG is a vector format that scales to any size without pixelation — essential for print materials. A 300px SVG will look sharp on a billboard. A 300px PNG will look blurry. For web use (emails, websites, apps), PNG is fine and more universally supported. Set your PNG export size to at least 2× the display size to ensure crispness on high-DPI screens.',
                },
              ].map(({ title, desc }, i) => (
                <div key={title} style={{ padding: '14px 16px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </section>

{/* ── Related tools ───────────────────────────── */}
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 12 }}>
              Related tools
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
              Need to encode data for API requests? Try the <a href="/tools/base64" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Base64 Encoder</a> or <a href="/tools/url-encoder" style={{ color: 'var(--green)', textDecoration: 'underline' }}>URL Encoder</a>. For secure sharing of credentials via a link, consider a self-destructing note service. To generate a password to encode in your QR code, use the <a href="/tools/password-generator" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Password Generator</a>.
            </p>
          </section>


        </div>
      </div>
  );
}