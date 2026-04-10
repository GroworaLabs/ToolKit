export default function FaviconContent() {

    const h2Style: React.CSSProperties = {
        fontFamily: 'Outfit, sans-serif',
        fontWeight: 700,
        fontSize: 'clamp(18px, 2.5vw, 24px)',
        color: 'var(--ink)',
        letterSpacing: '-0.02em',
        marginBottom: 16,
    };

    const pStyle: React.CSSProperties = {
        fontSize: 15,
        lineHeight: 1.75,
        color: 'var(--ink-2)',
        marginBottom: 14,
    };

    const codeStyle: React.CSSProperties = {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 13,
        background: 'var(--border)',
        padding: '1px 5px',
        borderRadius: 3,
    };

    const sectionStyle: React.CSSProperties = { marginBottom: 48 };

    const cardStyle: React.CSSProperties = {
        padding: '14px 16px',
        background: 'var(--white)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-l)',
        boxShadow: 'var(--sh-xs)',
    };

    const thStyle: React.CSSProperties = {
        padding: '10px 14px',
        textAlign: 'left',
        fontFamily: 'Outfit, sans-serif',
        fontWeight: 600,
    };

    const tdStyle: React.CSSProperties = {
        padding: '10px 14px',
        color: 'var(--ink-2)',
        fontSize: 14,
        verticalAlign: 'top',
    };

    const codeBlockStyle: React.CSSProperties = {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 13,
        background: 'var(--page-bg)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-l)',
        padding: '16px 20px',
        overflowX: 'auto',
        lineHeight: 1.7,
        color: 'var(--ink-2)',
        marginBottom: 14,
        display: 'block',
        whiteSpace: 'pre',
    };

    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
            <div>

                {/* ── What is a favicon ───────────────────────── */}
                <section style={sectionStyle}>
                    <h2 style={h2Style}>What is a favicon and why does every website need one?</h2>
                    <p style={pStyle}>
                        A favicon (short for "favourite icon") is the small image that represents your website across the browser interface. You see it in the <strong style={{ color: 'var(--ink)' }}>browser tab</strong> next to the page title, in the <strong style={{ color: 'var(--ink)' }}>address bar</strong> of some browsers, in the <strong style={{ color: 'var(--ink)' }}>bookmarks list</strong> or favourites panel, in the <strong style={{ color: 'var(--ink)' }}>browser history</strong>, and in the <strong style={{ color: 'var(--ink)' }}>recently visited sites</strong> grid on new-tab pages. On mobile devices, it becomes the icon that appears when a user saves your site to their home screen, and it powers the <strong style={{ color: 'var(--ink)' }}>Apple touch icon</strong> used by iOS Safari.
                    </p>
                    <p style={pStyle}>
                        For Progressive Web Applications (PWAs), favicons are not optional — they are a core requirement. PWA icons appear on the home screen, in the app switcher, on the splash screen at launch, and in the operating system's list of installed apps. A missing or low-quality PWA icon degrades the perceived quality of your application and can cause your app to fail lighthouse audits.
                    </p>
                    <p style={pStyle}>
                        Beyond technical function, favicons carry real <strong style={{ color: 'var(--ink)' }}>psychological weight</strong>. Research in UX and branding consistently shows that visual consistency — a recognisable icon appearing the same way across tabs, bookmarks, and home screens — builds trust. Users with many tabs open navigate by icon, not by title text. A missing favicon (which defaults to a generic browser icon) signals an unfinished or unpolished product, while a clear, high-contrast favicon communicates attention to detail. For developer tools, SaaS products, and any site targeting a professional audience, an absent favicon is a credibility gap that costs you nothing to close.
                    </p>
                    <p style={pStyle}>
                        The original favicon format — a <code style={codeStyle}>.ico</code> file in the site root — has been supplemented over the years by a range of PNG sizes and an SVG format for modern browsers. Getting the full suite of sizes right across all platforms requires generating multiple files and the correct HTML declarations. This tool handles all of that for you.
                    </p>
                </section>

                {/* ── Favicon formats and sizes ────────────────── */}
                <section style={sectionStyle}>
                    <h2 style={h2Style}>Favicon formats and sizes: the complete guide</h2>
                    <p style={pStyle}>
                        Different browsers and operating systems request different favicon sizes and formats. Providing the full set ensures your icon looks sharp in every context, from a 16-pixel browser tab to a 512-pixel PWA splash screen.
                    </p>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                                    {['Size', 'Format', 'Used for'].map(h => (
                                        <th key={h} style={thStyle}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { size: '16×16',   fmt: 'ICO / PNG', use: 'Browser tab icon, the smallest and most universally rendered size. Every browser requests this as its fallback.' },
                                    { size: '32×32',   fmt: 'ICO / PNG', use: 'Taskbar pinned sites in Windows, higher-DPI browser tabs in some configurations, and Retina displays on macOS at 1× logical size.' },
                                    { size: '48×48',   fmt: 'ICO',       use: 'Windows site icons in the Start menu and desktop shortcuts when a site is pinned via Internet Explorer or legacy Edge.' },
                                    { size: '96×96',   fmt: 'PNG',       use: 'Google TV and some Android system contexts. Also used by older versions of Chrome on desktop as the high-resolution tab icon.' },
                                    { size: '180×180', fmt: 'PNG',       use: 'Apple touch icon for iOS Safari. When a user adds your site to their home screen on iPhone or iPad, this is the icon displayed.' },
                                    { size: '192×192', fmt: 'PNG',       use: 'Android home screen shortcut icon and the standard icon size declared in Web App Manifest for Android Chrome.' },
                                    { size: '512×512', fmt: 'PNG',       use: 'PWA splash screen on Android, high-resolution icon in Chrome Web Store, and the source image for any system that needs to down-sample.' },
                                ].map(({ size, fmt, use }, i) => (
                                    <tr key={size} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{size}</td>
                                        <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>{fmt}</td>
                                        <td style={tdStyle}>{use}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p style={{ ...pStyle, marginTop: 14 }}>
                        The <code style={codeStyle}>.ico</code> format is a container that can bundle multiple image sizes in a single file — commonly 16×16, 32×32, and 48×48 together. When a browser requests <code style={codeStyle}>favicon.ico</code>, it selects the most appropriate size from the bundle for its display context. This is why the ICO format persists despite PNG being universally supported: a single <code style={codeStyle}>favicon.ico</code> in the site root satisfies the default favicon request of every browser without any HTML declaration required.
                    </p>
                </section>

                {/* ── How to add a favicon ─────────────────────── */}
                <section style={sectionStyle}>
                    <h2 style={h2Style}>How to add a favicon to your website</h2>
                    <p style={pStyle}>
                        Adding a complete favicon set to a website involves generating the files, placing them correctly, and declaring them in your HTML. Follow these steps for a full cross-platform implementation.
                    </p>
                    <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {[
                            {
                                n: '1',
                                title: 'Generate and download your favicon files',
                                desc: 'Use the generator above to produce all required sizes from a single source image or emoji. Download the package, which will contain favicon.ico, PNG files at each required size, and a manifest.json snippet.',
                            },
                            {
                                n: '2',
                                title: 'Upload files to your public root directory',
                                desc: 'Place favicon.ico and all PNG files in the root of your public directory — /public in Next.js, /static in Gatsby, /public in Create React App, or the web root in a traditional server setup. The favicon.ico must be accessible at https://yourdomain.com/favicon.ico for browsers to find it automatically.',
                            },
                            {
                                n: '3',
                                title: 'Add HTML link tags to your <head>',
                                desc: 'Declare each icon size explicitly in your HTML head. This ensures all browsers and devices request the correct file rather than relying on auto-discovery:',
                            },
                            {
                                n: '4',
                                title: 'Add icon entries to manifest.json for PWAs',
                                desc: 'If your site is a Progressive Web App, declare the 192×192 and 512×512 icons in your Web App Manifest. Without these, your PWA will fail the installability criteria and show a generic icon on home screens.',
                            },
                            {
                                n: '5',
                                title: 'Verify with browser DevTools',
                                desc: 'Open DevTools → Network tab, filter by "Img" or search "favicon", then hard-reload (Ctrl+Shift+R / Cmd+Shift+R). Confirm each favicon request returns a 200 status. Also check the Application tab → Manifest to verify the PWA icons are parsed correctly.',
                            },
                        ].map(({ n, title, desc }) => (
                            <li key={n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{n}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                                    <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-3)', margin: 0, marginBottom: n === '3' ? 10 : 0 }}>{desc}</p>
                                    {n === '3' && (
                                        <code style={codeBlockStyle}>{`<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />`}</code>
                                    )}
                                    {n === '4' && (
                                        <code style={{ ...codeBlockStyle, marginTop: 10 }}>{`{
  "name": "My App",
  "short_name": "App",
  "icons": [
    { "src": "/icon-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512x512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}`}</code>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                {/* ── Emoji favicons ───────────────────────────── */}
                <section style={sectionStyle}>
                    <h2 style={h2Style}>Emoji favicons: the modern approach</h2>
                    <p style={pStyle}>
                        Over the past few years, a new approach to favicons has gained traction in the developer tooling community: using a single emoji as the site icon. The technique was popularised when prominent developer tools — including <strong style={{ color: 'var(--ink)' }}>Linear</strong> (the project management tool) and several Vercel-hosted applications — demonstrated that a carefully chosen emoji could be more recognisable and more memorable than a traditional logo icon at small sizes.
                    </p>
                    <p style={pStyle}>
                        The implementation is remarkably simple. Instead of a PNG or ICO file, you declare an inline SVG data URI containing the emoji directly in the <code style={codeStyle}>{"<link>"}</code> tag:
                    </p>
                    <code style={codeBlockStyle}>{`<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛠️</text></svg>" />`}</code>
                    <p style={pStyle}>
                        This approach requires zero file downloads and no build step. It works in all modern browsers (Chrome 80+, Firefox 75+, Safari 14+). The emoji is rendered by the operating system's emoji font, which means it automatically looks correct on every platform without any image export.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: 10, marginBottom: 14 }}>
                        <div style={cardStyle}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 6 }}>Advantages</div>
                            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.7 }}>
                                <li>Zero additional HTTP requests</li>
                                <li>No image files to maintain or regenerate</li>
                                <li>Renders crisply at all resolutions via OS emoji font</li>
                                <li>Can be changed with a single character swap</li>
                                <li>Works without any build tooling</li>
                            </ul>
                        </div>
                        <div style={cardStyle}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 6 }}>Limitations</div>
                            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.7 }}>
                                <li>Emoji rendering varies across OS and browser (Apple vs Google vs Windows style)</li>
                                <li>No Apple touch icon support — home screen icon on iOS still needs a PNG</li>
                                <li>Not suitable for brands that require a specific, consistent icon treatment</li>
                                <li>May look unprofessional in conservative enterprise contexts</li>
                            </ul>
                        </div>
                    </div>
                    <p style={pStyle}>
                        The emoji favicon approach is ideal for developer tools, personal sites, open-source project documentation, and side projects where speed of setup matters more than pixel-perfect brand control. For production SaaS products and consumer applications, complement it with a full PNG icon set for home screen and PWA contexts.
                    </p>
                </section>

                {/* ── Design tips ──────────────────────────────── */}
                <section style={sectionStyle}>
                    <h2 style={h2Style}>Design tips for readable favicons</h2>
                    <p style={pStyle}>
                        A favicon is one of the most constrained design formats in existence. At 16×16 pixels, you have just 256 pixels to work with — fewer than many individual letters in a standard logo. Most design decisions that work at larger sizes fail catastrophically at favicon scale.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                            {
                                title: 'Abandon your full logo at 16×16',
                                desc: 'A horizontal wordmark, a complex icon with thin lines, or a logo with multiple elements becomes an unreadable blur at favicon size. Do not try to shrink your full brand mark — instead, extract the single most recognisable element from it, usually a letterform or a simplified shape.',
                            },
                            {
                                title: 'Use a single initial or simple letterform',
                                desc: 'The most effective favicons for text-based brands are a single letter — the brand initial — set in a bold weight on a solid background. GitHub\'s Octocat, Figma\'s stylised "F", and Notion\'s "N" are all variations of this approach. A single letter at high contrast reads instantly even at 16 pixels.',
                            },
                            {
                                title: 'Maximise contrast',
                                desc: 'Browser tabs and bookmark bars have light or dark backgrounds depending on the user\'s system theme and browser skin. Your favicon needs to be legible against both. Avoid low-contrast combinations (light grey on white, dark blue on black) and prefer a solid, vibrant background colour with a white or very light foreground, or vice versa.',
                            },
                            {
                                title: 'Design for dark mode with SVG favicons',
                                desc: 'Modern browsers (Firefox 60+, Chrome 100+) support SVG favicons, and SVG supports CSS media queries including prefers-color-scheme. This means you can provide a light-mode and a dark-mode version of your favicon within a single SVG file, ensuring your icon is always readable regardless of the user\'s system theme.',
                            },
                            {
                                title: 'Test on both light and dark browser themes before shipping',
                                desc: 'Open your site in Chrome with both a light theme and a dark theme (Settings → Appearance). Switch Firefox to Dark theme. Check that your favicon is clearly distinguishable in both contexts. Many designers test only in light mode and discover that their dark favicon disappears against a dark browser chrome only after launch.',
                            },
                        ].map(({ title, desc }) => (
                            <div key={title} style={{ ...cardStyle, display: 'flex', gap: 14 }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', flexShrink: 0, marginTop: 6 }} />
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                                    <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>


                {/* ── Favicon checklist ────────────────────────── */}
                <section style={sectionStyle}>
                    <h2 style={h2Style}>Favicon checklist before going live</h2>
                    <p style={pStyle}>
                        Run through this checklist before deploying any new site or after making changes to your branding. Each item corresponds to a specific browser, platform, or context where your favicon will be displayed.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {[
                            { label: 'favicon.ico present in site root', detail: 'Accessible at https://yourdomain.com/favicon.ico with a 200 response. This is the universal fallback that every browser requests automatically, with or without a <link> declaration.' },
                            { label: '32×32 PNG declared in <head>', detail: 'Add <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" /> for modern browsers, Retina displays, and Windows taskbar pinned sites.' },
                            { label: 'Apple touch icon 180×180 present', detail: 'Add <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" /> for iOS Safari home screen icons. Without this, iOS will screenshot your page as the icon, which looks poor.' },
                            { label: 'manifest.json includes 192×192 and 512×512', detail: 'Both sizes must be declared in your Web App Manifest for full PWA compliance. The 512×512 is required to pass the PWA installability check in Chrome and Lighthouse.' },
                            { label: 'Tested in Chrome, Firefox, and Safari tabs', detail: 'Open your site in all three browsers and verify the favicon appears correctly in the tab. Chrome and Firefox use the declared PNG sizes; Safari on macOS has its own rendering quirks and sometimes falls back to ICO.' },
                            { label: 'Tested in bookmarks bar', detail: 'Bookmark your page in Chrome and Firefox and confirm the favicon appears next to the bookmark title. Some browsers cache favicons aggressively — test in a fresh profile or incognito window if you recently changed your icon.' },
                            { label: 'Tested on mobile home screen', detail: 'On an iPhone, use Safari to save your site to the home screen and verify the Apple touch icon looks correct. On Android, use Chrome\'s "Add to Home Screen" option and check the 192×192 icon from the manifest.' },
                        ].map(({ label, detail }, i) => (
                            <div key={i} style={{ ...cardStyle, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                                <div style={{ width: 20, height: 20, borderRadius: 4, border: '2px solid var(--green)', flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--green)' }} />
                                </div>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{label}</div>
                                    <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.65, margin: 0 }}>{detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
