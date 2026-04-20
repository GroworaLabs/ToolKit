export default function BcryptGeneratorContent() {
  const h2 = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)' as const, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 };
  const p  = { fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 } as const;
  const h3 = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--ink)', marginBottom: 8, marginTop: 20 } as const;
  const code = { fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 } as const;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>

      {/* ── What is bcrypt ────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>What is bcrypt — and why not just use SHA-256?</h2>
        <p style={p}>
          Bcrypt is a password hashing function designed by Niels Provos and David Mazières in 1999, based on the Blowfish block cipher. Unlike general-purpose hash functions like SHA-256, bcrypt was purpose-built for one job: <strong style={{ color: 'var(--ink)' }}>making password verification deliberately slow</strong>.
        </p>
        <p style={p}>
          The core problem with using SHA-256 for passwords is speed. A modern GPU can compute over 10 billion SHA-256 hashes per second. That means an attacker who steals a database of SHA-256 hashed passwords can try every possible 8-character password in under an hour. Bcrypt solves this by being orders of magnitude slower — at cost factor 12, a single bcrypt hash takes roughly 300 milliseconds, limiting an attacker to just 3–4 attempts per second per CPU core.
        </p>
        <p style={p}>
          Bcrypt also includes a <strong style={{ color: 'var(--ink)' }}>built-in salt</strong> — a random 128-bit value generated for each password. The salt is stored as part of the hash output, so no separate salt column is needed in your database. Salting ensures that two users with the same password get different hashes, defeating precomputed rainbow table attacks. For a deeper comparison of password hashing algorithms, see our guide on <a href="/guides/bcrypt-vs-argon2-vs-scrypt" style={{ color: 'var(--green)', textDecoration: 'underline' }}>bcrypt vs Argon2 vs scrypt</a>.
        </p>
      </section>

      {/* ── Anatomy of a bcrypt hash ──────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Anatomy of a bcrypt hash string</h2>
        <p style={p}>
          Every bcrypt hash is exactly 60 characters long and follows a fixed format. Understanding this format helps when debugging authentication issues or migrating between systems:
        </p>
        <div style={{ padding: '20px 24px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', marginBottom: 20, overflowX: 'auto' }}>
          <pre style={{ margin: 0, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--ink)', lineHeight: 1.8 }}>
{`$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
 ├──┤├┤├────────────────────┤├─────────────────────────────┤
  │   │          │                         │
  │   │          │                    Hash (31 chars)
  │   │     Salt (22 chars, Base64)
  │  Cost factor (2^10 = 1024 rounds)
 Algorithm identifier (2a)`}</pre>
        </div>

        <h3 style={h3}>Algorithm identifiers</h3>
        <p style={p}>
          The prefix <code style={code}>$2a$</code> is the most common. Other variants include <code style={code}>$2b$</code> (fixed a wrapping bug in the OpenBSD implementation) and <code style={code}>$2y$</code> (PHP-specific fix for an early crypt_blowfish bug). In practice, all three are interchangeable for modern implementations — the output of <code style={code}>$2a$</code>, <code style={code}>$2b$</code>, and <code style={code}>$2y$</code> is identical for valid UTF-8 passwords under 72 bytes.
        </p>

        <h3 style={h3}>The 72-byte password limit</h3>
        <p style={p}>
          Bcrypt truncates passwords to 72 bytes before hashing. For ASCII passwords (1 byte per character), this means 72 characters. For UTF-8 passwords with multi-byte characters (accented letters, emoji), the effective limit is lower. Passwords beyond this limit are silently truncated — characters after byte 72 are ignored. This is rarely a practical issue (few users choose 72+ character passwords), but if it matters, a common workaround is to pre-hash the password with SHA-256 before passing it to bcrypt: <code style={code}>bcrypt(sha256(password))</code>.
        </p>
      </section>

      {/* ── Cost factor guide ─────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Choosing the right cost factor</h2>
        <p style={p}>
          The cost factor is the single most important parameter in bcrypt. It determines the computational cost of hashing and should be tuned to your hardware and latency budget:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['Cost', 'Rounds', 'Approx. time*', 'Recommendation'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['4',  '16',     '~1 ms',     'Testing/development only'],
                ['8',  '256',    '~10 ms',    'Acceptable for low-sensitivity systems'],
                ['10', '1,024',  '~100 ms',   'OWASP minimum — good default'],
                ['11', '2,048',  '~200 ms',   'Recommended for most production apps'],
                ['12', '4,096',  '~300 ms',   'Strong — used by Dropbox, many Rails apps'],
                ['13', '8,192',  '~600 ms',   'Very strong — noticeable login delay'],
                ['14', '16,384', '~1.2 s',    'High security — may affect UX on login'],
              ].map(([c, rounds, time, rec], i) => (
                <tr key={c} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600, color: 'var(--green)' }}>{c}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{rounds}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-2)' }}>{time}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{rec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, color: 'var(--ink-4)', marginBottom: 14 }}>
          * Approximate times on a 2023 x86-64 server CPU (single core). Browser JavaScript is 3–5× slower. GPU times are similar — bcrypt is CPU-hard but not memory-hard, so GPUs offer modest speedup compared to SHA-256.
        </p>
        <p style={p}>
          The ideal approach: <strong style={{ color: 'var(--ink)' }}>benchmark on your production hardware</strong> and pick the highest cost that keeps hash time under 250–500 ms. As hardware gets faster, increase the cost. You can do this transparently by rehashing each password with the new cost on the user's next successful login — bcrypt stores the cost in the hash itself, so old and new cost hashes coexist in the same database column.
        </p>
      </section>

      {/* ── Bcrypt vs Argon2 vs scrypt ────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Bcrypt vs Argon2 vs scrypt — which should you use?</h2>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['Algorithm', 'Year', 'Hardness', 'OWASP status', 'Best for'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['bcrypt',    '1999', 'CPU-hard',              'Recommended',               'Most web apps, especially if framework provides it natively'],
                ['scrypt',    '2009', 'CPU + memory-hard',     'Recommended',               'Systems needing GPU resistance without Argon2 support'],
                ['Argon2id',  '2015', 'CPU + memory + GPU-hard','Primary recommendation',  'New projects with library support (Go, Rust, Python, Node)'],
              ].map(([algo, year, hard, status, best], i) => (
                <tr key={algo} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{algo}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{year}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{hard}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{status}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={p}>
          For existing codebases using bcrypt: <strong style={{ color: 'var(--ink)' }}>there is no urgent reason to migrate</strong>. Bcrypt at cost 12+ remains secure and is not cryptographically broken. Migration to Argon2id is a future-proofing decision, not a security emergency. If you do migrate, use the "rehash on login" strategy — check if the stored hash is bcrypt, and if so, rehash with Argon2id on successful authentication.
        </p>
      </section>

      {/* ── Common mistakes ───────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Common bcrypt mistakes to avoid</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { title: 'Using a cost factor below 10', desc: 'Cost 4–8 is too fast for production. Even cost 10 is the bare OWASP minimum. Benchmark your hardware and use the highest cost that stays under 500 ms.' },
            { title: 'Storing passwords in plain text "temporarily"', desc: 'There is no such thing as temporary plain-text storage. Hash immediately on receipt. If you need to verify the password later in the same request, keep it in memory only for the duration of that request.' },
            { title: 'Implementing bcrypt yourself', desc: 'Use a battle-tested library: bcryptjs (JavaScript), bcrypt (Python), password_hash() (PHP), BCryptPasswordEncoder (Java/Spring). Custom implementations are the #1 source of password storage vulnerabilities.' },
            { title: 'Not increasing cost over time', desc: 'Hardware gets faster every year. A cost factor that was secure in 2015 may be too fast today. Review and increase cost every 1–2 years, rehashing on login.' },
            { title: 'Pepper without proper key management', desc: 'A "pepper" is a server-side secret added to passwords before hashing. It adds security, but only if the pepper is stored in a hardware security module (HSM) or secret manager — not in your source code or config file. If the pepper leaks alongside the database, it provides zero benefit.' },
            { title: 'Truncating or normalising passwords before hashing', desc: 'Do not lowercase, trim, or truncate user passwords before hashing (except for bcrypt\'s inherent 72-byte limit). Normalisation reduces the keyspace an attacker needs to search. The only acceptable pre-processing is Unicode NFC normalisation, which ensures equivalent Unicode sequences produce the same bytes.' },
          ].map(({ title, desc }) => (
            <div key={title} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Using bcrypt in code ──────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Using bcrypt in popular languages</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { label: 'Node.js (bcryptjs)', code: `const bcrypt = require('bcryptjs');\nconst hash = await bcrypt.hash(password, 12);\nconst match = await bcrypt.compare(password, hash);` },
            { label: 'Python (bcrypt)', code: `import bcrypt\nhashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=12))\nmatch = bcrypt.checkpw(password.encode(), hashed)` },
            { label: 'PHP (built-in)', code: `$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);\n$match = password_verify($password, $hash);` },
            { label: 'Ruby (bcrypt-ruby)', code: `require 'bcrypt'\nhash = BCrypt::Password.create(password, cost: 12)\nmatch = BCrypt::Password.new(hash) == password` },
            { label: 'Go (golang.org/x/crypto)', code: `hash, _ := bcrypt.GenerateFromPassword([]byte(password), 12)\nerr := bcrypt.CompareHashAndPassword(hash, []byte(password))` },
          ].map(({ label, code: c }) => (
            <div key={label} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
              <pre style={{ margin: 0, padding: '10px 12px', background: 'var(--page-bg)', borderRadius: 'var(--r-s)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', lineHeight: 1.7, overflowX: 'auto' }}>{c}</pre>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
