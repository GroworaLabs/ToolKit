export default function Base64Content() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
      <div>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            What is Base64 encoding?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            Base64 is an encoding scheme that converts binary data into a string of 64 printable ASCII characters: A–Z, a–z, 0–9, <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>+</code> and <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>/</code>. It is defined in <a href="https://www.rfc-editor.org/rfc/rfc4648" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'underline' }}>RFC 4648</a>.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            Base64 is <strong style={{ color: 'var(--ink)' }}>not encryption</strong> — it is a reversible encoding. Anyone can decode a Base64 string instantly. Its purpose is to safely transmit binary data through text-only channels that can't handle raw bytes — like email (MIME), HTML attributes, or JSON payloads.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            The encoded output is approximately <strong style={{ color: 'var(--ink)' }}>33% larger</strong> than the original input, because every 3 bytes of binary become 4 Base64 characters.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            How to encode and decode Base64
          </h2>
          <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { n: '1', title: 'Select Encode or Decode', desc: 'Choose Encode to convert plain text into a Base64 string. Choose Decode to convert a Base64 string back to plain text.' },
              { n: '2', title: 'Enter your input', desc: 'Paste or type your text in the input field. The tool supports UTF-8 text including accented characters, emoji, and non-Latin scripts.' },
              { n: '3', title: 'Use Swap to chain operations', desc: 'Click Swap to instantly flip the mode and move the output to the input. Useful when you want to encode, check the result, then decode it back.' },
              { n: '4', title: 'Copy the output', desc: 'Click Copy to grab the result. Everything runs locally — your text never leaves the browser.' },
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
            Common uses of Base64
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
            {[
              { title: 'Data URIs in CSS/HTML',    desc: 'Embed images directly in stylesheets or HTML without a separate file: background: url("data:image/png;base64,...")' },
              { title: 'JWT tokens',                desc: 'JSON Web Tokens use Base64url encoding for the header and payload sections.' },
              { title: 'Email attachments (MIME)',  desc: 'SMTP transfers binary attachments as Base64-encoded text to avoid issues with non-ASCII characters.' },
              { title: 'API authentication',        desc: 'HTTP Basic Auth sends credentials as Base64-encoded "username:password" in the Authorization header.' },
              { title: 'Storing binary in JSON',    desc: 'JSON is text-only. Base64 lets you embed binary data like images or files in a JSON field.' },
              { title: 'Environment variables',     desc: 'Encoding certificates or keys in Base64 allows storing multi-line secrets as single-line env vars.' },
            ].map(({ title, desc }) => (
              <div key={title} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55 }}>{desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <div style={{ padding: '20px 24px', background: 'var(--amber-lt)', border: '1px solid rgba(217,119,6,.25)', borderRadius: 'var(--r-l)' }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--ink)', marginBottom: 8 }}>
              ⚠️ Base64 is not encryption
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-2)', margin: 0 }}>
              Never use Base64 to "hide" sensitive data. It provides zero security — anyone can decode it in seconds. For sensitive values, use proper encryption: AES-256 for symmetric encryption, or RSA/ECDSA for asymmetric. Base64 is purely a data transport encoding.
            </p>
          </div>
        </section>

        {/* ── How Base64 works ────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            How Base64 encoding works
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            Base64 works by taking 3 bytes of binary input (24 bits) and splitting them into four 6-bit groups. Each 6-bit group maps to one of 64 characters in the Base64 alphabet. Because 3 input bytes produce 4 output characters, the encoded output is always exactly 33% larger than the original.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            When the input length is not a multiple of 3, padding characters (<code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>=</code>) are appended to make the output length a multiple of 4. One byte of remainder adds two characters plus <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>==</code>; two bytes of remainder add three characters plus <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>=</code>.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            This tool handles <strong style={{ color: 'var(--ink)' }}>UTF-8 text</strong> correctly — multi-byte characters like accented letters, Chinese characters, or emoji are first encoded to their UTF-8 byte sequence, then Base64-encoded. This is the correct behavior for web applications and matches how <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>btoa(unescape(encodeURIComponent(str)))</code> works in JavaScript.
          </p>
        </section>

        {/* ── Base64 variants ─────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Base64 variants — Standard, URL-safe, and MIME
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
            Not all Base64 is identical. Different contexts require different alphabets and line-break rules:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { name: 'Standard Base64 (RFC 4648 §4)', chars: 'A–Z a–z 0–9 + /', padding: 'Yes (=)', note: 'Default encoding. Used in MIME email, data URIs, and most general contexts.' },
              { name: 'URL-safe Base64 (RFC 4648 §5)', chars: 'A–Z a–z 0–9 - _', padding: 'No or optional', note: 'Replaces + with - and / with _ so the result is safe in URLs and filenames without percent-encoding. Used in JWT tokens and OAuth 2.0.' },
              { name: 'MIME Base64', chars: 'Same as standard', padding: 'Yes (=)', note: 'Identical alphabet to standard, but inserts a CRLF line break every 76 characters. Required by email protocols (RFC 2045).' },
            ].map(({ name, chars, padding, note }) => (
              <div key={name} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{name}</div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--ink-3)' }}><strong>Alphabet:</strong> <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, background: 'var(--border)', padding: '1px 4px', borderRadius: 3 }}>{chars}</code></span>
                  <span style={{ fontSize: 12, color: 'var(--ink-3)' }}><strong>Padding:</strong> {padding}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>{note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Base64 in web development ───────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Base64 in web development — practical examples
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
            These are the most common patterns you will encounter as a web developer:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              {
                label: 'HTTP Basic Authentication header',
                code: `// Encode "username:password" in Base64\nconst credentials = btoa('user:password');\nfetch(url, { headers: { Authorization: \`Basic \${credentials}\` } });`,
                note: 'The Authorization header value is Base64-encoded — never encrypted. Use HTTPS to protect it in transit.',
              },
              {
                label: 'Embed a small image as a data URI in CSS',
                code: `/* In your stylesheet */\n.icon { background-image: url("data:image/png;base64,iVBORw0KGgo..."); }`,
                note: 'Good for icons under 5 KB. Above that, a separate file with HTTP caching is more efficient.',
              },
              {
                label: 'Decode a JWT payload',
                code: `// JWT header.payload.signature — split on '.' and decode the middle part\nconst payload = JSON.parse(atob(token.split('.')[1]));\nconsole.log(payload.sub, payload.exp);`,
                note: 'JWT uses URL-safe Base64 without padding. atob() handles standard Base64; add padding if needed.',
              },
            ].map(({ label, code, note }) => (
              <div key={label} style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>{label}</div>
                <pre style={{ margin: '0 0 10px', padding: '12px 14px', background: 'var(--page-bg)', borderRadius: 'var(--r-m)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', overflowX: 'auto', lineHeight: 1.7 }}>{code}</pre>
                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>{note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Base64 in web development ─────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Base64 in web development — data URIs and email
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            Base64 encoding appears in several specific contexts in web development. Understanding each one helps you use it correctly and avoid common mistakes:
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            <strong style={{ color: 'var(--ink)' }}>Data URIs for inline assets.</strong> A data URI embeds file content directly in a URL string: <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>data:image/png;base64,iVBORw0KGgo...</code>. This lets you embed small images, fonts, or SVGs directly in CSS or HTML without an extra HTTP request. The tradeoff is file size: Base64 increases the asset size by ~33%, and data URIs cannot be cached separately by the browser. Use them only for very small assets (icons under 1 KB) where the saved HTTP request outweighs the size penalty.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            <strong style={{ color: 'var(--ink)' }}>Email attachments and MIME encoding.</strong> SMTP (email) was originally designed for ASCII-only text. To send binary files (images, PDFs, documents) over email, MIME encodes them as Base64 within a multipart message body. The Content-Transfer-Encoding: base64 header signals this encoding. Email libraries like Nodemailer, SendGrid, and Mailgun handle this automatically — you rarely need to encode attachments yourself.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            <strong style={{ color: 'var(--ink)' }}>HTTP Basic Authentication.</strong> The HTTP Authorization header for Basic Auth carries credentials as Base64: <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>Authorization: Basic dXNlcjpwYXNzd29yZA==</code>. This is the Base64 encoding of <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>user:password</code>. This provides no security beyond HTTPS — anyone can decode it. Always use Basic Auth over HTTPS only, and prefer token-based authentication for production APIs.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            <strong style={{ color: 'var(--ink)' }}>JSON Web Tokens (JWT) headers and payloads.</strong> Both the header and payload sections of a JWT are Base64url-encoded JSON objects (URL-safe Base64 without padding). This means the contents are readable by anyone — paste the token on jwt.io to decode it instantly. The security comes entirely from the signature section, not from the encoding. Never put sensitive data (passwords, SSNs, payment info) in a JWT payload.
          </p>
        </section>

        {/* ── Base64 at the command line ─────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Base64 encoding at the command line
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
            Most operating systems include a built-in Base64 utility. These commands are useful for quick encoding in scripts, CI/CD pipelines, and server-side tasks:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { os: 'macOS / Linux (encode)', cmd: 'echo -n "hello world" | base64' },
              { os: 'macOS / Linux (decode)', cmd: 'echo "aGVsbG8gd29ybGQ=" | base64 --decode' },
              { os: 'macOS / Linux (encode file)', cmd: 'base64 -i image.png -o image.b64' },
              { os: 'Windows PowerShell (encode)', cmd: '[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("hello"))' },
              { os: 'Windows PowerShell (decode)', cmd: '[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String("aGVsbG8="))' },
              { os: 'Node.js (encode)', cmd: 'Buffer.from("hello world").toString("base64")' },
              { os: 'Node.js (decode)', cmd: 'Buffer.from("aGVsbG8gd29ybGQ=", "base64").toString("utf-8")' },
              { os: 'Python 3 (encode)', cmd: 'import base64; base64.b64encode(b"hello world").decode()' },
            ].map(({ os, cmd }, i) => (
              <div key={os} style={{ display: 'flex', gap: 0, border: '1px solid var(--border)', borderRadius: 'var(--r-l)', overflow: 'hidden' }}>
                <div style={{ padding: '10px 14px', fontSize: 13, fontWeight: 600, color: 'var(--ink)', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', minWidth: 200, flexShrink: 0 }}>{os}</div>
                <div style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', background: 'var(--green-lt)', flex: 1, borderLeft: '1px solid var(--border)', wordBreak: 'break-all' }}>{cmd}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-3)', marginTop: 12 }}>
            Note: the <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>-n</code> flag in the <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>echo</code> command prevents a trailing newline from being included in the encoded output. Without it, the result will include the newline character and produce unexpected padding.
          </p>
        </section>


      </div>
    </div>
  );
}
