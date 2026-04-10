export default function UrlEncoderContent() {
  return (
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
        <div>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              What is URL encoding?
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              URL encoding (also called <strong style={{ color: 'var(--ink)' }}>percent-encoding</strong>) converts characters that are not allowed or have special meaning in URLs into a safe format. Each unsafe character is replaced with a <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>%</code> sign followed by two hexadecimal digits representing the character's UTF-8 byte value. The specification is defined in <a href="https://www.rfc-editor.org/rfc/rfc3986" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'underline' }}>RFC 3986</a>.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              In JavaScript, <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>encodeURIComponent()</code> encodes a value for use as a query string parameter or path segment, escaping everything except letters, digits, and <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, background: 'var(--border)', padding: '1px 4px', borderRadius: 3 }}>- _ . ! ~ * ' ( )</code>. Use <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>encodeURI()</code> only for full URLs where you want to preserve the structure (slashes, colons, question marks).
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
              For example, a space becomes <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>%20</code>, a question mark becomes <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>%3F</code>, and an ampersand becomes <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>%26</code>. Letters, digits, and <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>- _ . ~</code> are always safe and never encoded.
            </p>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              How to encode and decode URLs
            </h2>
            <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { n: '1', title: 'Choose Encode or Decode', desc: 'Select Encode to make text URL-safe. Select Decode to convert percent-encoded strings back to readable text.' },
                { n: '2', title: 'Paste your input', desc: 'Enter the URL, query string, or text you want to convert. The tool handles the full UTF-8 range including Unicode characters and emoji.' },
                { n: '3', title: 'Use Swap for roundtrip testing', desc: 'Click Swap to switch modes and move the output to the input. Useful for verifying that encode → decode returns the original string.' },
                { n: '4', title: 'Copy and use', desc: 'Copy the encoded or decoded result directly into your code, API request, or browser address bar.' },
              ].map(({ n, title, desc }) => (
                  <li key={n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{n}</span>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{title}</div>
                      <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-3)', margin: 0 }}>{desc}</p>
                    </div>
                  </li>
              ))}
            </ol>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Common percent-encoded characters
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                  {['Character', 'Encoded', 'Notes'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                  ))}
                </tr>
                </thead>
                <tbody>
                {[
                  ['Space',         '%20',  'Use %20 in paths. In form data (application/x-www-form-urlencoded), spaces may be encoded as + instead.'],
                  ['#  (hash)',     '%23',  'Indicates a fragment identifier in URLs — must be encoded in query values.'],
                  ['&  (ampersand)','%26',  'Separates query parameters — must be encoded within parameter values.'],
                  ['=  (equals)',   '%3D',  'Separates key from value in query strings — must be encoded in values.'],
                  ['?  (question)', '%3F',  'Starts the query string — must be encoded in path segments.'],
                  ['+  (plus)',     '%2B',  'Can be interpreted as a space in form data — encode explicitly to avoid ambiguity.'],
                  ['@  (at)',       '%40',  'Commonly used in email addresses within URLs.'],
                  ['/ (slash)',     '%2F',  'Path separator — encode when it appears within a segment, not as a separator.'],
                ].map(([char, enc, note], i) => (
                    <tr key={enc} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{char}</td>
                      <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--green)', fontWeight: 600 }}>{enc}</td>
                      <td style={{ padding: '10px 14px', color: 'var(--ink-3)' }}>{note}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              URL structure anatomy
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
              A URL (Uniform Resource Locator) has a well-defined structure defined by RFC 3986. Understanding each component clarifies which characters must be encoded and where:
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                  {['Component', 'Example', 'When to encode'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                  ))}
                </tr>
                </thead>
                <tbody>
                {[
                  ['Scheme',    'https://',                            'Never — use as-is'],
                  ['Host',      'example.com',                         'Punycode for non-ASCII domains (e.g. münchen.de → xn--mnchen-3ya.de)'],
                  ['Port',      ':8080',                               'Never — numeric only'],
                  ['Path',      '/search/results',                     'Encode reserved characters within segments; / separators must remain unencoded'],
                  ['Query key', '?q=',                                 'Encode with encodeURIComponent() — keys can contain any character'],
                  ['Query value','?q=hello+world',                     'Encode with encodeURIComponent() — most important part to encode'],
                  ['Fragment',  '#section-1',                          'Encode if it contains non-ASCII or reserved characters'],
                ].map(([comp, example, note], i) => (
                    <tr key={comp} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{comp}</td>
                      <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)' }}>{example}</td>
                      <td style={{ padding: '10px 14px', color: 'var(--ink-3)' }}>{note}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              encodeURI vs encodeURIComponent — which to use
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              JavaScript provides two built-in encoding functions, and choosing the wrong one is one of the most common URL-related bugs in web development.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                {
                  fn: 'encodeURIComponent()',
                  use: 'Encoding a query parameter value, a path segment, or any user-supplied string that will be embedded inside a URL.',
                  safe: 'A–Z a–z 0–9 - _ . ! ~ * \' ( )',
                  encodes: 'Everything else, including / : ? & = # @ (all URL structure characters)',
                  tip: 'Use this by default. It is the safer of the two because it encodes all URL structure characters that could be misinterpreted.',
                },
                {
                  fn: 'encodeURI()',
                  use: 'Encoding a complete URL that you want to preserve as a URL (keep the slashes and question marks intact).',
                  safe: 'A–Z a–z 0–9 - _ . ! ~ * \' ( ) ; / ? : @ & = + $ , #',
                  encodes: 'Only characters not allowed anywhere in a URL (e.g. spaces → %20, curly braces, pipe, backslash)',
                  tip: 'Use only when encoding a full URL, not a value within a URL.',
                },
              ].map(({ fn, use, safe, encodes, tip }) => (
                <div key={fn} style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 8, fontFamily: 'JetBrains Mono, monospace' }}>{fn}</div>
                  <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: 6 }}><strong>Use for:</strong> {use}</p>
                  <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55, marginBottom: 6 }}><strong>Does NOT encode:</strong> <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, background: 'var(--border)', padding: '1px 4px', borderRadius: 3 }}>{safe}</code></p>
                  <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55, marginBottom: 6 }}><strong>Encodes:</strong> {encodes}</p>
                  <p style={{ fontSize: 13, color: 'var(--green)', lineHeight: 1.55, margin: 0 }}><strong>Tip:</strong> {tip}</p>
                </div>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Common developer use cases
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
              {[
                { title: 'Building API query strings', desc: 'Encode user search input before appending to an API URL: fetch(`/api?q=${encodeURIComponent(userInput)}`).' },
                { title: 'Redirect URLs in OAuth', desc: 'OAuth redirect_uri parameters must be URL-encoded before being passed as a query parameter: ?redirect_uri=https%3A%2F%2F...' },
                { title: 'Sharing URLs in emails', desc: 'URLs pasted into email bodies often get mangled. Encoding special characters ensures the link survives email client handling.' },
                { title: 'Embedding URLs in HTML attributes', desc: 'Encoding prevents HTML attribute injection. Encode values that appear inside href, src, and action attributes when they come from user input.' },
                { title: 'Decoding API responses', desc: 'Some APIs return percent-encoded strings (especially in Location headers and link previews). Decode them to get the human-readable URL.' },
                { title: 'URL parameters in single-page apps', desc: 'React Router and other SPA frameworks use encoded URLs to store state. Decoding route params before use prevents rendering bugs with special characters in IDs.' },
              ].map(({ title, desc }) => (
                <div key={title} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55 }}>{desc}</div>
                </div>
              ))}
            </div>
          </section>


          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              URL encoding across programming languages
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
              Every language has built-in URL encoding utilities. Here are the canonical functions to use — and the ones to avoid:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {[
                { lang: 'JavaScript / TypeScript', encode: 'encodeURIComponent(value)', decode: 'decodeURIComponent(encoded)', avoid: 'escape() — deprecated, broken for Unicode' },
                { lang: 'Python 3',                encode: 'urllib.parse.quote(value, safe="")', decode: 'urllib.parse.unquote(encoded)', avoid: 'urllib.quote() — removed in Python 3' },
                { lang: 'Node.js',                 encode: 'encodeURIComponent() or new URLSearchParams()', decode: 'decodeURIComponent()', avoid: 'querystring — deprecated since Node 14' },
                { lang: 'PHP',                     encode: 'rawurlencode($value)', decode: 'rawurldecode($encoded)', avoid: 'urlencode() — encodes spaces as + not %20' },
                { lang: 'Go',                      encode: 'url.QueryEscape(value)', decode: 'url.QueryUnescape(encoded)', avoid: 'Manual string replacement' },
                { lang: 'Java',                    encode: 'URLEncoder.encode(value, StandardCharsets.UTF_8)', decode: 'URLDecoder.decode(encoded, StandardCharsets.UTF_8)', avoid: 'URLEncoder.encode(value) without charset arg' },
                { lang: 'Ruby',                    encode: 'URI.encode_www_form_component(value)', decode: 'URI.decode_www_form_component(encoded)', avoid: 'CGI.escape() — spaces become +' },
                { lang: 'C# / .NET',               encode: 'Uri.EscapeDataString(value)', decode: 'Uri.UnescapeDataString(encoded)', avoid: 'HttpUtility.UrlEncode() — encodes spaces as +' },
              ].map(({ lang, encode, decode, avoid }, i) => (
                <div key={lang} style={{ padding: '12px 16px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{lang}</div>
                  <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--green)', marginBottom: 3 }}>Encode: {encode}</div>
                  <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-2)', marginBottom: 3 }}>Decode: {decode}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-4)' }}>Avoid: {avoid}</div>
                </div>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Debugging common URL encoding mistakes
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { problem: 'Spaces encoded as + instead of %20', cause: 'application/x-www-form-urlencoded (HTML form POST) encodes spaces as +. This is correct for form bodies but wrong for URL paths and REST API query strings.', fix: 'Use encodeURIComponent() — it always produces %20. When decoding a + as a space: decodeURIComponent(str.replace(/\\+/g, " ")).' },
                { problem: 'Double-encoding: %2520 instead of %20', cause: 'The URL was encoded twice. The % in %20 was then encoded to %25, producing %2520. Happens when encoding an already-encoded string.', fix: 'Always encode raw values, never pre-encoded strings. If in doubt, decode first then re-encode.' },
                { problem: 'Non-ASCII characters not encoded', cause: "Older functions like JavaScript's escape() or Python 2's urllib.quote() do not handle multi-byte UTF-8 correctly.", fix: 'Use encodeURIComponent() in JS and urllib.parse.quote(value, safe="", encoding="utf-8") in Python.' },
                { problem: 'Slashes in path values not encoded', cause: 'A value like /uploads/user/file.jpg passed as a query parameter must have its slashes encoded as %2F. Leaving them unencoded breaks the URL parser.', fix: 'Always use encodeURIComponent() (not encodeURI()) for individual values. encodeURI() intentionally skips encoding slashes.' },
              ].map(({ problem, cause, fix }, i) => (
                <div key={problem} style={{ padding: '14px 16px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{problem}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, marginBottom: 4 }}><strong>Cause:</strong> {cause}</div>
                  <div style={{ fontSize: 13, color: 'var(--green)', lineHeight: 1.6 }}><strong>Fix:</strong> {fix}</div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
  );
}