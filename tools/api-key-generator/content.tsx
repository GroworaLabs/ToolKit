export default function ApiKeyGeneratorContent() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
      <div>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            What is an API key?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            An API key is a secret credential that identifies and authenticates a client making requests to an API. Unlike passwords (which authenticate humans), API keys authenticate applications, services, and automated systems. They are the most common authentication mechanism for REST APIs because they are simple to implement, easy to include in request headers, and straightforward to rotate.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            This generator creates cryptographically secure API keys using the <strong style={{ color: 'var(--ink)' }}>Web Crypto API</strong> — the same entropy source used for TLS keys. Keys generated here are safe for production use as API secrets, webhook secrets, and access tokens.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            All generation happens locally in your browser. No key is ever sent to any server. You can use this tool offline with the same results.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            API key formats compared
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
            Different API key formats have different trade-offs for readability, security scanning, and compatibility:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                fmt: 'Prefixed (sk_a1b2c3…)',
                entropy: '192 bits',
                chars: '48 hex chars after prefix',
                pros: 'Immediately identifiable; scannable by secret scanning tools (GitHub, GitLab); distinguishes test vs live keys; Stripe, Supabase, and most modern APIs use this format.',
                cons: 'Slightly longer; prefix must be kept consistent.',
                when: 'New APIs where developer experience matters; public SDKs; anywhere you want automatic secret scanning.',
              },
              {
                fmt: 'UUID v4',
                entropy: '122 bits',
                chars: '36 chars with hyphens',
                pros: 'Universally recognised format; compatible with UUID columns in databases; human-readable groupings; widely supported in frameworks.',
                cons: 'Not all characters are random (4 version bits and 2 variant bits are fixed); not prefixed so harder to identify in code.',
                when: 'Systems already using UUIDs for IDs; simple internal APIs; rapid prototyping.',
              },
              {
                fmt: 'Hex 32 (128-bit)',
                entropy: '128 bits',
                chars: '32 hex chars',
                pros: 'Compact; universally safe in URLs, headers, and JSON; easy to store; exactly 128 bits of entropy.',
                cons: 'Shorter — 128 bits is secure but some high-security applications prefer 256 bits.',
                when: 'CSRF tokens; short-lived session identifiers; any context where compactness matters.',
              },
              {
                fmt: 'Hex 64 (256-bit)',
                entropy: '256 bits',
                chars: '64 hex chars',
                pros: 'Maximum entropy from this tool; 256 bits is the standard for cryptographic keys; future-proof.',
                cons: 'Longer string to store and transmit; visual inspection is impractical.',
                when: 'Signing secrets; HMAC keys; JWT secrets; root API secrets for administrative operations.',
              },
              {
                fmt: 'Base64url',
                entropy: '256 bits',
                chars: '~43 chars (no padding)',
                pros: 'Same entropy as Hex 64 in fewer characters; URL-safe; used in JWTs; no padding characters.',
                cons: 'Slightly less readable than hex; not universally understood by developers.',
                when: 'JWT secrets; OAuth tokens; situations where URL-safety and compact size both matter.',
              },
            ].map(({ fmt, entropy, chars, pros, cons, when: whenUse }, i) => (
              <div key={fmt} style={{ padding: '16px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', fontFamily: 'JetBrains Mono, monospace' }}>{fmt}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--green)', background: 'var(--green-lt)', padding: '2px 8px', borderRadius: 99 }}>{entropy}</span>
                  <span style={{ fontSize: 11, color: 'var(--ink-4)' }}>{chars}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: 4 }}><strong>Pros:</strong> {pros}</p>
                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, marginBottom: 4 }}><strong>Cons:</strong> {cons}</p>
                <p style={{ fontSize: 13, color: 'var(--green)', lineHeight: 1.6, margin: 0 }}><strong>Best for:</strong> {whenUse}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Implementing API key authentication
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
            A secure API key system has seven components:
          </p>
          <ol style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { n: '1', title: 'Key generation',     desc: 'Generate 32+ bytes from a CSPRNG. Use this tool or crypto.randomBytes(32) in Node.js, secrets.token_hex(32) in Python.' },
              { n: '2', title: 'Show once',           desc: 'Display the full key to the user exactly once at creation. Prompt them explicitly to save it — it will never be shown again. This is the GitHub and Stripe model.' },
              { n: '3', title: 'Hash before storage', desc: 'Store SHA-256(key) in the database. Never store the plaintext key. On authentication, hash the incoming key and compare to the stored hash.' },
              { n: '4', title: 'Accept in headers',   desc: 'Use the Authorization: Bearer <key> header (standard OAuth 2.0 format) or a custom X-API-Key header. Never accept keys in URL query parameters — they appear in server logs and browser history.' },
              { n: '5', title: 'Rate limiting',       desc: 'Apply per-key rate limits to prevent abuse. Redis is ideal for sliding window rate limiting — store request counts keyed by the hashed API key.' },
              { n: '6', title: 'Audit logging',       desc: 'Log every API request with the key ID (not the key itself), timestamp, IP address, endpoint, and response code. This enables security auditing and anomaly detection.' },
              { n: '7', title: 'Rotation support',    desc: 'Allow users to generate new keys and set an expiry date for old ones. Implement a grace period where both old and new keys work, then automatically revoke the old key.' },
            ].map(({ n, title, desc }) => (
              <li key={n} style={{ display: 'flex', gap: 14, padding: '12px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{n}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{title}</div>
                  <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            API key vs JWT vs OAuth — when to use each
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: 10 }}>
            {[
              { auth: 'API key',   when: 'Server-to-server communication, developer APIs, simple integrations. Best when the client is a server (not a browser) and you control both sides.', limit: 'No built-in expiry; no standard user identity claims; harder to scope granularly.' },
              { auth: 'JWT',       when: 'Stateless user authentication, microservices, mobile apps. Best when servers need to verify tokens independently without a database lookup.', limit: 'Cannot be revoked without infrastructure; payload is readable (not encrypted by default).' },
              { auth: 'OAuth 2.0', when: 'Third-party access delegation ("Login with Google"), when users grant an app access to their data on another service.', limit: 'Complex to implement correctly; requires an authorization server; more moving parts.' },
              { auth: 'Session cookies', when: 'Traditional web applications where the server controls all state. Simplest to implement correctly; trivial to revoke; no JWT pitfalls.', limit: 'Requires server-side session store; stateful; CSRF protection needed.' },
            ].map(({ auth, when, limit }) => (
              <div key={auth} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 8, fontFamily: 'JetBrains Mono, monospace' }}>{auth}</div>
                <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 6 }}><strong>Use when:</strong> {when}</p>
                <p style={{ fontSize: 13, color: 'var(--ink-4)', lineHeight: 1.55, margin: 0 }}><strong>Limitation:</strong> {limit}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            API key security best practices
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { title: 'Never commit API keys to version control', body: 'Use environment variables and .env files. Add .env to .gitignore before your first commit. Use tools like gitleaks, truffleHog, or GitHub\'s built-in secret scanning to detect accidentally committed keys. If a key is committed, rotate it immediately — treat it as compromised even if the repo is private.' },
              { title: 'Use secret scanning in your CI/CD pipeline', body: 'Enable GitHub\'s secret scanning (free for public repos) or install gitleaks as a pre-commit hook. Many formats — including the prefixed format generated by this tool — can be automatically detected and alerted on before they reach production.' },
              { title: 'Use prefixed keys for automatic detection', body: 'Keys with recognisable prefixes (sk_, pk_, api_) can be automatically detected by secret scanning tools. Stripe pioneered this approach and GitHub natively scans for Stripe key patterns. When you design your key format, choose a prefix and register it with GitHub\'s secret scanning partner program.' },
              { title: 'Scope keys to minimum required permissions', body: 'API keys should have the minimum permissions needed for their use case. A key used only to read data should not be able to write or delete. Implement permission scopes at the key level, not just the user level, so a compromised key has limited blast radius.' },
              { title: 'Monitor for anomalous usage patterns',       body: 'Set up alerts for: sudden spikes in request volume, requests from unusual geographies, requests to endpoints a key has never hit before, and authentication failures. Automatic key suspension on anomaly detection can contain a breach before it becomes serious.' },
            ].map(({ title, body }, i) => (
              <div key={title} style={{ padding: '14px 16px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginTop: 16 }}>
            For generating the underlying random bytes for your key system, use the <a href="/tools/random-token-generator" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Random Token Generator</a>. For signing API requests with HMAC, use the <a href="/tools/hmac-generator" style={{ color: 'var(--green)', textDecoration: 'underline' }}>HMAC Generator</a>. For UUID-based identifiers, see the <a href="/tools/uuid-generator" style={{ color: 'var(--green)', textDecoration: 'underline' }}>UUID Generator</a>.
          </p>
        </section>

      </div>
    </div>
  );
}
