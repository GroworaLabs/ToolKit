export default function UuidGeneratorContent() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
      <div>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            What is a UUID?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            A UUID (Universally Unique Identifier) is a 128-bit label used to uniquely identify objects in computer systems without requiring a central authority to assign them. The standard format is 32 hexadecimal digits displayed in five groups separated by hyphens: <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</code>. The specification is defined in <a href="https://www.rfc-editor.org/rfc/rfc4122" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'underline' }}>RFC 4122</a>.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            This tool generates <strong style={{ color: 'var(--ink)' }}>Version 4 UUIDs</strong> — randomly generated using <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>window.crypto.randomUUID()</code>, the same Web Crypto API your browser uses for secure operations. With 122 bits of entropy, the probability of generating two identical UUIDs is approximately 1 in 5.3 × 10³⁶.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            How to generate UUIDs
          </h2>
          <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { n: '1', title: 'Set the count', desc: 'Use the count input to generate between 1 and 50 UUIDs at once. Useful for seeding databases or generating test fixtures.' },
              { n: '2', title: 'Toggle uppercase if needed', desc: 'Some systems require uppercase UUIDs. Click the UPPERCASE toggle to switch between formats — the value is identical either way.' },
              { n: '3', title: 'Click Generate', desc: 'A new set of cryptographically random UUIDs is generated immediately. Each click produces a completely new set.' },
              { n: '4', title: 'Copy individually or all at once', desc: 'Click the copy icon next to any UUID to copy it, or use Copy All when you need multiple UUIDs as a newline-separated list.' },
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
            When to use UUIDs
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
            {[
              { title: 'Database primary keys',   desc: 'UUIDs allow distributed systems to generate IDs independently without coordination. Preferred over auto-increment when merging databases.' },
              { title: 'API resource identifiers', desc: 'Expose UUIDs in REST API endpoints instead of sequential integers to avoid leaking record counts and prevent enumeration attacks.' },
              { title: 'Session tokens',           desc: 'Use UUIDs as session, request, or correlation IDs for tracing requests across microservices.' },
              { title: 'File names',               desc: 'Generate UUID-based file names when storing uploads to avoid collisions and prevent predictable paths.' },
              { title: 'Idempotency keys',         desc: 'Send a UUID with each API request as an idempotency key to safely retry requests without duplicate operations.' },
              { title: 'Test data generation',     desc: 'Generate bulk UUIDs to seed test databases, mock fixtures, or populate staging environments.' },
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
            UUID versions compared
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
            The UUID specification defines eight versions (v1 through v8), each using a different algorithm to generate the identifier. Version 4 (random) is by far the most widely used, but the other versions each solve specific problems:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { ver: 'v1 — Time-based', algo: 'Combines the current timestamp with the MAC address of the generating machine', pros: 'Monotonically increasing within a node; sortable by creation time', cons: 'Exposes MAC address (privacy risk); not suitable for distributed systems where time can skew' },
              { ver: 'v3 — Name-based (MD5)', algo: 'MD5 hash of a namespace UUID and a name string', pros: 'Deterministic — same namespace + name always produces the same UUID', cons: 'MD5 is cryptographically broken; prefer v5 for new applications' },
              { ver: 'v4 — Random', algo: '122 bits of cryptographically secure random data', pros: 'No privacy leakage; no coordination needed; universally supported', cons: 'Not sortable; not deterministic; marginally higher collision risk than time-based versions (still negligible in practice)' },
              { ver: 'v5 — Name-based (SHA-1)', algo: 'SHA-1 hash of a namespace UUID and a name string', pros: 'Deterministic like v3 but uses SHA-1 instead of MD5; useful for content-addressable IDs', cons: 'SHA-1 is deprecated for cryptographic use, though acceptable here since UUID generation is not a security operation' },
              { ver: 'v6 — Reordered time', algo: 'Time-based like v1 but with the time bits reordered for lexicographic sortability', pros: 'Sortable by creation time while maintaining compatibility with the UUID format', cons: 'Still exposes node (MAC) data; less adoption than v7' },
              { ver: 'v7 — Unix timestamp + random', algo: 'Unix millisecond timestamp in the high bits, random bits in the low bits', pros: 'Lexicographically sortable by creation time; no MAC address exposure; excellent for database primary keys', cons: 'Newer standard (RFC 9562, 2024); library support still catching up' },
            ].map(({ ver, algo, pros, cons }) => (
              <div key={ver} style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>{ver}</div>
                <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: 6 }}><strong>Algorithm:</strong> {algo}</p>
                <p style={{ fontSize: 13, color: 'var(--green)', lineHeight: 1.55, marginBottom: 4 }}><strong>Pros:</strong> {pros}</p>
                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55, margin: 0 }}><strong>Cons:</strong> {cons}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            UUID vs alternatives — ULID, NanoID, CUID
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
            UUID v4 is the default choice but is not always optimal. Several alternatives have emerged to address specific shortcomings:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
            {[
              { name: 'ULID', example: '01ARZ3NDEKTSV4RRFFQ69G5FAV', desc: 'Universally Unique Lexicographically Sortable Identifier. Encodes a 48-bit millisecond timestamp + 80 random bits in 26 Crockford Base32 characters. URL-safe, case-insensitive, and lexicographically sortable. Excellent for database keys where insertion order should match sort order.' },
              { name: 'NanoID', example: 'V1StGXR8_Z5jdHi6B-myT', desc: 'A tiny, secure, URL-safe unique string ID generator. 21 characters by default, configurable length and alphabet. Smaller output than UUID, no hyphens, works in all environments. The go-to choice for URL slugs, session IDs, and short identifiers in Node.js/browser apps.' },
              { name: 'CUID2', example: 'clh3y4z9z0000q1n7lk7b3k8m', desc: 'Collision-resistant unique ID. Designed for horizontal scaling and safe exposure in URLs. Lowercase, starts with a letter (unlike UUIDs which can start with a digit), fingerprint-based to reduce collision risk across machines.' },
              { name: 'UUID v7', example: '018e2ce9-4aef-7b9c-8190-4d0a4b35d9e0', desc: 'The modern UUID standard (RFC 9562, 2024). Embeds a Unix millisecond timestamp in the first 48 bits, making UUIDs sortable by creation time — a huge benefit for database performance. Best of both worlds: UUID compatibility + ULID-like sortability.' },
            ].map(({ name, example, desc }) => (
              <div key={name} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{name}</div>
                <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--green)', background: 'var(--green-lt)', padding: '2px 6px', borderRadius: 3, display: 'block', marginBottom: 8, wordBreak: 'break-all' }}>{example}</code>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.55 }}>{desc}</div>
              </div>
            ))}
          </div>
        </section>


        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            UUID best practices for backend developers
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
            Using UUIDs effectively in production systems requires understanding the performance tradeoffs and common pitfalls. Here are the patterns that experienced engineers follow:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { title: 'Prefer UUID v7 for database primary keys', body: 'UUID v4 is fully random — B-tree index pages split constantly as new rows land at random positions. UUID v7 embeds a millisecond timestamp so new rows cluster near the end of the index, dramatically reducing write amplification and fragmentation at scale.' },
              { title: 'Store as BINARY(16), not CHAR(36)', body: 'The hyphenated string wastes 20 bytes versus the 16-byte binary form. MySQL: use BINARY(16) with UNHEX(REPLACE(uuid,"-","")). PostgreSQL has a native UUID type that stores 16 bytes automatically.' },
              { title: 'Never expose sequential IDs publicly', body: 'Auto-increment IDs reveal your record count and enable enumeration attacks. Replace public-facing IDs with UUIDs. Keep integer primary keys internal for foreign keys and joins.' },
              { title: 'Validate at the API boundary', body: 'Before using a UUID from user input in a query, validate the 8-4-4-4-12 hex format. An invalid UUID may cause silent type coercion in some databases.' },
              { title: 'Add expiry for token use cases', body: 'UUID v4 cannot be guessed by brute force — great for password reset links. But always store a creation time server-side and mark the token used after redemption. UUID alone does not expire.' },
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
            UUID collision probability and security
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            UUID v4's 122 bits of randomness make it statistically impossible to guess a valid identifier by brute force. This makes UUIDs an excellent choice for public-facing resource identifiers — shareable document URLs, order confirmation links, file upload paths. An attacker cannot enumerate resources: guessing the next valid UUID requires trying approximately 5.3 × 10³⁶ possibilities.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            Collision probability is similarly negligible. To have a 1% chance of generating a duplicate within your system, you would need to have already generated approximately 2.6 × 10¹⁷ UUIDs. At one million per second, reaching that number would take over 8,000 years.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            The one caveat is random number generator quality. Use only CSPRNG-backed generators: the browser's crypto.randomUUID(), Python's uuid.uuid4(), or PostgreSQL's gen_random_uuid(). Avoid any library that seeds from a timestamp or weak random source — those UUIDs are predictable and defeat the purpose entirely.
          </p>
        </section>

      </div>
    </div>
  );
}
