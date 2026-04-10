export default function JwtDecoderContent() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
      <div>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            What is a JSON Web Token?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            A JSON Web Token (JWT) is an open standard (<a href="https://www.rfc-editor.org/rfc/rfc7519" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'underline' }}>RFC 7519</a>) for securely transmitting information between parties as a compact, self-contained string. JWTs are the dominant format for modern API authentication — used by Auth0, Firebase Auth, AWS Cognito, and virtually every OAuth 2.0 implementation.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            The key property that makes JWTs useful is that they are <strong style={{ color: 'var(--ink)' }}>self-contained</strong>: the token carries all the information needed to verify its validity and identify the user, without requiring the server to query a session database on every request. A server can validate a JWT by checking its cryptographic signature alone.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            This tool decodes the header and payload sections of any JWT so you can inspect the claims, check the algorithm, and verify expiry times during development and debugging. It does not perform signature verification — that requires your secret key and must be done in your application code.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            JWT structure: three parts explained
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
            Every JWT is a string of three Base64url-encoded sections joined by dots: <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>header.payload.signature</code>. Base64url is a URL-safe variant of Base64 that replaces <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, background: 'var(--border)', padding: '1px 4px', borderRadius: 3 }}>+</code> with <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, background: 'var(--border)', padding: '1px 4px', borderRadius: 3 }}>-</code> and <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, background: 'var(--border)', padding: '1px 4px', borderRadius: 3 }}>/</code> with <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, background: 'var(--border)', padding: '1px 4px', borderRadius: 3 }}>_</code>, with no padding characters.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              {
                part: 'Header',
                color: '#7c3aed',
                bg: '#f5f3ff',
                desc: 'A JSON object declaring the token type and signing algorithm. Example: {"alg":"HS256","typ":"JWT"}. The "alg" field is critical — it tells the verification library which algorithm to use. Always validate that "alg" matches what your application expects. Never accept tokens with "alg":"none".',
                fields: [
                  { k: 'alg', v: 'Signing algorithm: HS256, RS256, ES256, etc.' },
                  { k: 'typ', v: 'Token type — always "JWT"' },
                  { k: 'kid', v: 'Key ID — identifies which key to use for verification (optional)' },
                ],
              },
              {
                part: 'Payload',
                color: 'var(--green)',
                bg: 'var(--green-lt)',
                desc: 'A JSON object containing claims — statements about the user and metadata about the token. Claims are divided into registered (standard, like exp and sub), public (well-known names), and private (application-specific). The payload is encoded, not encrypted — anyone can decode and read it.',
                fields: [
                  { k: 'sub', v: 'Subject — who the token refers to (user ID)' },
                  { k: 'iss', v: 'Issuer — who issued the token (your auth server URL)' },
                  { k: 'aud', v: 'Audience — who the token is intended for (your API)' },
                  { k: 'exp', v: 'Expiration time — Unix timestamp after which token is invalid' },
                  { k: 'iat', v: 'Issued at — Unix timestamp when the token was created' },
                  { k: 'nbf', v: 'Not before — Unix timestamp before which token is not valid' },
                  { k: 'jti', v: 'JWT ID — unique identifier for this token (for revocation)' },
                ],
              },
              {
                part: 'Signature',
                color: '#2563eb',
                bg: '#eff6ff',
                desc: 'The cryptographic proof that the header and payload were not altered. Computed as: HMAC-SHA256(base64url(header) + "." + base64url(payload), secret) for HS256, or an RSA/ECDSA signature for asymmetric algorithms. Only the signature section is secret — the header and payload are just encoded.',
                fields: [],
              },
            ].map(({ part, color, bg, desc, fields }) => (
              <div key={part} style={{ padding: '16px 20px', background: bg, border: `1px solid ${color}33`, borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{part}</div>
                <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: fields.length ? 10 : 0 }}>{desc}</p>
                {fields.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {fields.map(({ k, v }) => (
                      <div key={k} style={{ display: 'flex', gap: 10, fontSize: 13 }}>
                        <code style={{ fontFamily: 'JetBrains Mono, monospace', color, fontWeight: 700, flexShrink: 0 }}>{k}</code>
                        <span style={{ color: 'var(--ink-3)' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            JWT signing algorithms compared
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
            The algorithm in the JWT header determines how the signature is created and verified. Choosing the wrong algorithm for your architecture is one of the most common JWT security mistakes:
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                  {['Algorithm', 'Type', 'Key', 'Best for'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['HS256 / HS512', 'Symmetric (HMAC)', 'Same secret signs and verifies', 'Single-server apps where only one party needs to verify'],
                  ['RS256 / RS512', 'Asymmetric (RSA)',  'Private key signs, public key verifies', 'Multiple services need to verify — share public key only'],
                  ['ES256 / ES512', 'Asymmetric (ECDSA)', 'Private key signs, public key verifies', 'Like RS256 but smaller signatures, better for mobile'],
                  ['PS256 / PS512', 'Asymmetric (RSA-PSS)', 'Private key signs, public key verifies', 'High-security scenarios; FIPS-compliant'],
                ].map(([alg, type, key, use], i) => (
                  <tr key={alg} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 700, color: 'var(--green)', whiteSpace: 'nowrap' }}>{alg}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{type}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-3)', fontSize: 13 }}>{key}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-3)', fontSize: 13 }}>{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            JWT security best practices
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { title: 'Always validate the algorithm',         body: 'Never let the client choose the algorithm. Hardcode the expected algorithm in your verification code. The "alg:none" attack exploits libraries that accept tokens without a signature if the header declares "none" as the algorithm. Explicitly reject tokens with unexpected algorithms.' },
              { title: 'Keep access tokens short-lived',        body: 'Access tokens should expire in 15 minutes to 1 hour. Use refresh tokens for longer sessions. Short expiry limits the window of exploitation if a token is stolen from a log, a cache, or a compromised client.' },
              { title: 'Store tokens securely on the client',   body: 'For browser apps: store access tokens in memory (a JavaScript variable), not localStorage. Use HttpOnly, Secure, SameSite=Strict cookies for refresh tokens — they are inaccessible to JavaScript and immune to XSS. localStorage and sessionStorage are readable by any script on the page.' },
              { title: 'Never put sensitive data in the payload', body: 'JWT payloads are encoded, not encrypted. Anyone with the token can decode and read the payload. Store only non-sensitive identifiers (user ID, role, email). Never put passwords, payment details, or PII that does not need to be in the token.' },
              { title: 'Implement token revocation for critical operations', body: 'Stateless JWTs cannot be revoked before expiry by default. For logout, password change, and account takeover recovery, maintain a token deny-list (Redis is ideal) keyed on jti (JWT ID). Check the deny-list on every request for sensitive operations. Use short expiry as a fallback for less critical tokens.' },
              { title: 'Validate all standard claims',          body: 'Always verify: exp (reject expired tokens), nbf (reject tokens used before their valid period), iss (reject tokens from unknown issuers), and aud (reject tokens not intended for your service). Missing these checks makes the signature verification insufficient — a valid signature does not mean a token is currently usable.' },
            ].map(({ title, body }, i) => (
              <div key={title} style={{ padding: '14px 16px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            JWT vs session tokens — when to use each
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            JWTs and server-side sessions each have clear use cases. The "JWTs are always better" narrative is incorrect — the right choice depends on your architecture.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 12 }}>
            {[
              { title: 'Use JWTs when…', items: ['You have multiple services that need to verify the token independently', 'You want stateless servers with no shared session store', 'Your tokens are short-lived (15–60 minutes)', 'You are building a public API consumed by third-party clients', 'You use OAuth 2.0 or OpenID Connect'] },
              { title: 'Use sessions when…', items: ['You need immediate token revocation (logout, suspicious activity)', 'Your application is a traditional server-rendered web app', 'You want simpler security model — server controls all session state', 'Token size is a concern (session IDs are much smaller than JWTs)', 'You are storing sensitive data that should never leave the server'] },
            ].map(({ title, items }) => (
              <div key={title} style={{ padding: '16px 20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>{title}</div>
                <ul style={{ paddingLeft: 16, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {items.map(item => <li key={item} style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.55 }}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Related security tools
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
            When working with JWTs, you often need these companion tools:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: 10 }}>
            {[
              { href: '/tools/hmac-generator',       title: 'HMAC Generator',          desc: 'Generate HMAC-SHA256 signatures to verify JWT HS256 tokens manually or sign webhook payloads.' },
              { href: '/tools/random-token-generator', title: 'Random Token Generator', desc: 'Generate cryptographically secure HS256 signing secrets and API keys.' },
              { href: '/tools/base64',               title: 'Base64 Encoder',           desc: 'Encode or decode individual JWT parts manually for low-level debugging.' },
              { href: '/tools/hash-generator',       title: 'Hash Generator',           desc: 'Compute SHA-256 and other hashes for token integrity checks.' },
            ].map(({ href, title, desc }) => (
              <a key={href} href={href} style={{ display: 'block', padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)', textDecoration: 'none' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55 }}>{desc}</div>
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
