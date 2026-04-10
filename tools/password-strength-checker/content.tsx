export default function PasswordStrengthCheckerContent() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
      <div>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            What is password entropy?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            Password entropy is a mathematical measure of how unpredictable — and therefore how difficult to guess — a password is. It is expressed in bits and calculated as: <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>entropy = log₂(charset_size) × length</code>. Higher entropy means more possible combinations an attacker must try before finding the correct password.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            The charset size depends on what character types are used: lowercase letters contribute 26 possibilities per position, uppercase adds another 26, digits add 10, and symbols add approximately 32. A password using all four types draws from a charset of ~94 characters. Each additional character in the password multiplies the search space by 94 — so length growth is exponential.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(180px, 100%), 1fr))', gap: 8 }}>
            {[
              { label: 'Lowercase only',      size: '26',  example: 'helloworld' },
              { label: '+ Uppercase',         size: '52',  example: 'HelloWorld' },
              { label: '+ Numbers',           size: '62',  example: 'HelloWorld9' },
              { label: '+ Symbols',           size: '~94', example: 'Hello@World9!' },
            ].map(({ label, size, example }) => (
              <div key={label} style={{ padding: '12px 14px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', color: 'var(--green)', marginBottom: 4 }}>{size}</div>
                <code style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-3)' }}>{example}</code>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            How password attacks work
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
            Understanding attack methods clarifies why specific password properties matter. Attackers do not try every possible combination at random — they use optimised strategies:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { attack: 'Dictionary attack', desc: 'The attacker tries words from dictionaries, known passwords from breach databases (rockyou.txt), and common variations (password1, P@ssw0rd). This defeats any password that resembles a real word or common pattern, regardless of length.' },
              { attack: 'Brute-force attack', desc: 'Every possible combination of characters is tried systematically. Modern GPUs can attempt billions of hashes per second against fast hash algorithms (MD5, SHA-1). Bcrypt and Argon2 are designed to be slow — reducing brute-force speed to thousands of attempts per second.' },
              { attack: 'Credential stuffing', desc: 'Username/password pairs from previous data breaches are tried against other services. If you reuse a password across sites, a breach of any one site compromises all others. This is why password uniqueness is as important as password strength.' },
              { attack: 'Rule-based attacks', desc: 'Common transformations are applied to dictionary words: capitalise the first letter, append a number, replace letters with symbols (a→@, e→3). Passwords like "Football1!" are trivially broken by rule-based tools like Hashcat.' },
              { attack: 'Rainbow table attack', desc: 'Precomputed hash-to-password lookup tables allow instant cracking of unhashed or unsalted passwords. Modern password hashing (bcrypt, Argon2) uses random salts to defeat rainbow tables — each password hash is unique even if two users have the same password.' },
            ].map(({ attack, desc }, i) => (
              <div key={attack} style={{ padding: '14px 16px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{attack}</div>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Entropy benchmarks — what is actually strong?
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                  {['Password example', 'Length', 'Charset', 'Entropy', 'Verdict'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['password',          '8',  '26',  '37.6 bits',  'Very weak — dictionary word'],
                  ['Password1',         '9',  '62',  '53.6 bits',  'Weak — rule-based trivial'],
                  ['P@ssw0rd!',         '9',  '94',  '59.2 bits',  'Weak — too predictable'],
                  ['correct horse staple', '21', '27', '99.0 bits', 'Strong — passphrase'],
                  ['Xk9#mL2$vQ8n',      '13', '94',  '85.6 bits',  'Strong'],
                  ['dF7!kL9@mN2#pQ4$',  '17', '94',  '111.9 bits', 'Very strong'],
                  ['64-char random',    '64', '94',  '~420 bits',  'Uncrackable (overkill)'],
                ].map(([pw, len, cs, ent, verdict], i) => (
                  <tr key={pw} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink)' }}>{pw}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-2)' }}>{len}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-2)' }}>{cs}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, color: 'var(--green)' }}>{ent}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-3)', fontSize: 13 }}>{verdict}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Password best practices for users
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: 10 }}>
            {[
              { title: 'Use a password manager',      desc: 'Bitwarden (free, open-source), 1Password, or Dashlane generate and store unique, random passwords for every site. You only need to remember one strong master password.' },
              { title: 'Use a unique password per site', desc: 'Credential stuffing attacks make password reuse catastrophic. One breached site exposes every account sharing that password.' },
              { title: 'Enable two-factor authentication', desc: 'Even a weak password becomes much harder to exploit with 2FA enabled. Use an authenticator app (TOTP) rather than SMS — SMS is vulnerable to SIM-swapping attacks.' },
              { title: 'Prefer passphrases',           desc: '4–6 random words are long, easy to type, and have excellent entropy. "correct-horse-battery-staple" has ~51 bits of entropy from 4 words of a 7,776-word list.' },
              { title: 'Check breach databases',       desc: 'Use Have I Been Pwned (haveibeenpwned.com) to check if your email or passwords have appeared in data breaches. Change any compromised credentials immediately.' },
              { title: 'Never share or write passwords down', desc: 'Sharing via email, Slack, or SMS exposes passwords in logs and message history. Use a password manager\'s secure sharing feature instead.' },
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
            Password hashing for developers
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            If you are building an application that stores user passwords, the strength of user passwords matters — but so does how you store them. Never store plaintext passwords or use fast hashes (MD5, SHA-1, SHA-256) for password storage. Use a dedicated password hashing algorithm:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { name: 'Argon2id', rec: 'NIST recommended (2022)', desc: 'Memory-hard algorithm that is resistant to GPU and ASIC attacks. The current best choice for new applications. Use Argon2id with minimum 19 MB memory, 2 iterations, 1 parallelism for interactive logins.' },
              { name: 'bcrypt',   rec: 'Widely supported',        desc: 'Industry standard for over 25 years. Use cost factor 12 (2024 recommendation). Slightly slower than Argon2 for attackers due to memory requirements, but less than Argon2id. Widely available in every language.' },
              { name: 'scrypt',   rec: 'Memory-hard',             desc: 'Memory-hard like Argon2. Used by some cryptocurrency implementations. Less common in web applications than bcrypt or Argon2 but secure when properly configured.' },
            ].map(({ name, rec, desc }, i) => (
              <div key={name} style={{ padding: '14px 16px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', flexWrap: 'wrap', marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', fontFamily: 'JetBrains Mono, monospace' }}>{name}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--green)', background: 'var(--green-lt)', padding: '2px 8px', borderRadius: 99 }}>{rec}</span>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginTop: 16 }}>
            To generate strong passwords to test with this tool, use the <a href="/tools/password-generator" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Password Generator</a>. For generating secure random tokens and API secrets, use the <a href="/tools/random-token-generator" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Random Token Generator</a>.
          </p>
        </section>

      </div>
    </div>
  );
}
