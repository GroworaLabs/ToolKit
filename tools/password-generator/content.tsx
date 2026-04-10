export default function PasswordGeneratorContent() {
    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
            <div>

                {/* ── What is ─────────────────────────────────── */}
                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        What is a password generator?
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        A password generator is a tool that creates random, unpredictable passwords using a cryptographically secure algorithm. Unlike passwords you create yourself — which tend to follow patterns, use dictionary words, or reuse elements you can remember — a generated password has no structure that an attacker can exploit.
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        This tool uses the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Web Crypto API</a> — the same source of randomness that your operating system and browser use for cryptographic operations. Every password is generated locally in your browser. Nothing is transmitted to any server, stored in logs, or accessible to anyone other than you.
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
                        The <a href="https://www.nist.gov/publications/digital-identity-guidelines" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'underline' }}>NIST Digital Identity Guidelines</a> recommend passwords of at least 15 characters for general use. Our generator supports lengths up to 64 characters with full control over character sets — uppercase letters, lowercase letters, numbers, and symbols.
                    </p>
                </section>

                {/* ── How to use ──────────────────────────────── */}
                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        How to use the password generator
                    </h2>
                    <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {[
                            { n: '1', title: 'Set your password length', desc: 'Use the length slider to choose between 8 and 64 characters. For most accounts, 16–20 characters provides an excellent balance of security and usability. For critical accounts like email or banking, use 24 or more.' },
                            { n: '2', title: 'Choose your character types', desc: 'Enable uppercase letters (A–Z), lowercase letters (a–z), numbers (0–9), and symbols (!@#$...). Using all four character types maximises entropy — the measure of randomness in your password.' },
                            { n: '3', title: 'Generate and copy', desc: 'Click Generate or press the refresh button. Your new password appears instantly. Click the copy icon to copy it to your clipboard — it stays there for 30 seconds before being cleared for security.' },
                            { n: '4', title: 'Save it in a password manager', desc: 'Paste the password directly into your password manager (Bitwarden, 1Password, Dashlane) before using it anywhere else. Never store passwords in plain text files or browser notes.' },
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

                {/* ── What makes strong ───────────────────────── */}
                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        What makes a password strong?
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        Password strength is measured in <strong style={{ color: 'var(--ink)' }}>entropy</strong> — the number of bits of randomness. A password with 80+ bits of entropy is considered strong by modern standards. Every additional character and character type exponentially increases entropy, making brute-force attacks exponentially harder.
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        Contrary to popular belief, <strong style={{ color: 'var(--ink)' }}>length matters more than complexity</strong>. A 20-character lowercase password is significantly harder to crack than an 8-character password with symbols. That said, combining length with character variety gives you the best protection against brute-force attacks and dictionary attacks.
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
                        An alternative to random passwords is a <strong style={{ color: 'var(--ink)' }}>passphrase</strong> — a sequence of 4-6 random words like "correct-horse-battery-staple". Passphrases are long, high-entropy, and easier to remember. For accounts where you need to type the password manually, a passphrase is often the better choice.
                    </p>

                    {/* Strength comparison table */}
                    <div style={{ overflowX: 'auto', marginBottom: 14 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                            <thead>
                            <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                                {['Password', 'Length', 'Entropy', 'Time to crack'].map(h => (
                                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {[
                                { pwd: 'password123',         len: '11', entropy: '~37 bits', time: 'Instant',           bg: '#fef2f2' },
                                { pwd: 'P@ssw0rd!',           len: '9',  entropy: '~45 bits', time: 'Minutes',           bg: '#fef2f2' },
                                { pwd: 'xK9#mP2qL',           len: '9',  entropy: '~59 bits', time: 'Days',              bg: '#fffbeb' },
                                { pwd: 'xK9#mP2qLvR4!nW8s',  len: '18', entropy: '~118 bits',time: 'Billions of years',  bg: '#f0fdf4' },
                            ].map(({ pwd, len, entropy, time, bg }) => (
                                <tr key={pwd} style={{ background: bg, borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>{pwd}</td>
                                    <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{len}</td>
                                    <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{entropy}</td>
                                    <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{time}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--ink-4)', fontStyle: 'italic' }}>
                        Estimates based on 10 billion attempts per second (modern GPU brute-force).
                    </p>
                </section>

                {/* ── When to use ─────────────────────────────── */}
                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        When to use a password generator
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
                        You should use a password generator for every new account you create. Here are the most important use cases:
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))', gap: 10 }}>
                        {[
                            { title: 'New account registration',  desc: 'Never invent a password manually. Generate one and save it immediately.' },
                            { title: 'Password reset',             desc: 'When forced to update a password, use a fresh generated one — never increment (password1 → password2).' },
                            { title: 'WiFi passwords',             desc: 'Router passwords should be 20+ characters. Use all character types.' },
                            { title: 'API keys & secrets',         desc: 'For development, generate long random strings as secrets and tokens.' },
                            { title: 'Database passwords',         desc: 'Service accounts and database users need the strongest passwords.' },
                            { title: 'Testing & staging',          desc: 'Populate test accounts with realistic strong passwords, not "test123".' },
                        ].map(({ title, desc }) => (
                            <div key={title} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                                <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55 }}>{desc}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Common mistakes ─────────────────────────── */}
                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Common password mistakes to avoid
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
                        Even security-conscious users make these mistakes. A password generator eliminates most of them automatically — but understanding why they're dangerous helps you make better decisions overall.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                            {
                                mistake: 'Using personal information',
                                why: 'Names, birthdays, pet names, and favorite sports teams are the first things attackers try. Social engineering and data breaches make this information easy to find. A generated password contains none of it.',
                            },
                            {
                                mistake: 'Reusing passwords across sites',
                                why: 'When one site is breached, attackers use credential stuffing — automatically trying the same username/password on hundreds of other services. One reused password can compromise dozens of accounts.',
                            },
                            {
                                mistake: 'Incrementing passwords (Password1 → Password2)',
                                why: 'Predictable variations are trivially guessed. Attackers who have your old password will try obvious increments first.',
                            },
                            {
                                mistake: 'Storing passwords in browsers without a master password',
                                why: 'Browser-saved passwords are accessible to anyone with physical access to your unlocked device. A dedicated password manager encrypts the vault with a master password.',
                            },
                            {
                                mistake: 'Using short passwords with "complex" characters',
                                why: '"P@ss!" is 6 characters with symbols — still crackable in seconds. Length is what creates real security. 16 lowercase characters is safer than 8 "complex" ones.',
                            },
                            {
                                mistake: 'Sharing passwords via email or chat',
                                why: 'Emails and chat logs are often stored indefinitely. Use a password manager\'s sharing feature which encrypts the value in transit and can set an expiration.',
                            },
                        ].map(({ mistake, why }) => (
                            <div key={mistake} style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0, marginTop: 2 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </span>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', lineHeight: 1.4 }}>
                    {mistake}
                  </span>
                                </div>
                                <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.65, margin: 0 }}>{why}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Password vs Passphrase ───────────────────── */}
                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Random password vs passphrase — which is better?
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
                        Both are strong if done correctly. The right choice depends on how the password will be used.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 14, marginBottom: 20 }}>
                        <div style={{ padding: '20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none"/><circle cx="16" cy="8" r="1.5" fill="currentColor" stroke="none"/><circle cx="8" cy="16" r="1.5" fill="currentColor" stroke="none"/><circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/></svg>
                                Random password</div>
                            <div style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.75 }}>
                                <div style={{ marginBottom: 6 }}><strong>Example:</strong> <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, background: 'var(--border)', padding: '2px 6px', borderRadius: 3 }}>xK9#mP2qLvR4!nW8</code></div>
                                {[
                                    { ok: true,  t: 'Maximum entropy per character' },
                                    { ok: true,  t: 'Ideal for password managers' },
                                    { ok: true,  t: 'Impossible to guess or predict' },
                                    { ok: false, t: 'Impossible to memorize' },
                                    { ok: false, t: 'Hard to type on mobile or TV' },
                                ].map(({ ok, t }) => (
                                    <div key={t} style={{ marginBottom: 5, display: 'flex', alignItems: 'center', gap: 7 }}>
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ok ? 'var(--green)' : 'var(--red)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            {ok ? <polyline points="20 6 9 17 4 12"/> : <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>}
                                        </svg>
                                        <span style={{ color: ok ? 'var(--ink-2)' : 'var(--ink-3)' }}>{t}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ padding: '20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                                Passphrase</div>
                            <div style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.75 }}>
                                <div style={{ marginBottom: 6 }}><strong>Example:</strong> <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, background: 'var(--border)', padding: '2px 6px', borderRadius: 3 }}>correct-horse-battery-staple</code></div>
                                {[
                                    { ok: true,  t: 'Long = high entropy (28+ chars)' },
                                    { ok: true,  t: 'Can be memorized' },
                                    { ok: true,  t: 'Easy to type anywhere' },
                                    { ok: false, t: 'Requires truly random words' },
                                    { ok: false, t: 'Slightly lower entropy per character' },
                                ].map(({ ok, t }) => (
                                    <div key={t} style={{ marginBottom: 5, display: 'flex', alignItems: 'center', gap: 7 }}>
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ok ? 'var(--green)' : 'var(--red)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            {ok ? <polyline points="20 6 9 17 4 12"/> : <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>}
                                        </svg>
                                        <span style={{ color: ok ? 'var(--ink-2)' : 'var(--ink-3)' }}>{t}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div style={{ padding: '16px 20px', background: 'var(--green-lt)', border: '1px solid var(--green-mid)', borderRadius: 'var(--r-l)' }}>
                        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-2)', margin: 0 }}>
                            <strong style={{ color: 'var(--ink)' }}>Rule of thumb:</strong> Use a random password for every site stored in your password manager. Use a passphrase only for the few passwords you need to type manually — like your device login, email account, or password manager master password.
                        </p>
                    </div>
                </section>

                {/* ── Security checklist ──────────────────────── */}
                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Password security checklist
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
                        Run through this checklist to assess your current password security posture. If you check all boxes, your accounts are well-protected against the vast majority of attacks.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {[
                            { done: true,  item: 'Every account has a unique password — no reuse across sites' },
                            { done: true,  item: 'All passwords are at least 16 characters long' },
                            { done: true,  item: 'Passwords contain uppercase, lowercase, numbers, and symbols' },
                            { done: true,  item: 'All passwords are stored in a dedicated password manager' },
                            { done: false, item: 'Two-factor authentication (2FA) enabled on email and banking accounts' },
                            { done: false, item: 'Password manager itself is protected with a strong master passphrase' },
                            { done: false, item: 'Passwords for high-value accounts are 24+ characters' },
                            { done: false, item: 'Old and weak passwords have been updated in the last 12 months' },
                            { done: false, item: 'Email address has never appeared in a known data breach (check haveibeenpwned.com)' },
                        ].map(({ done, item }) => (
                            <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', background: done ? 'var(--green-lt)' : 'var(--white)', border: `1px solid ${done ? 'var(--green-mid)' : 'var(--border)'}`, borderRadius: 'var(--r-l)' }}>
                <span style={{ flexShrink: 0, marginTop: 1, display: 'flex', alignItems: 'center' }}>
                  {done
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--border-md)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/></svg>
                  }
                </span>
                                <span style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6 }}>{item}</span>
                            </div>
                        ))}
                    </div>
                </section>


                {/* ── Password managers tip ───────────────────── */}
                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Where to store your generated passwords
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
                        A strong password you can't remember is only useful if you store it securely. A dedicated password manager encrypts your vault locally, syncs across devices, and auto-fills logins — so you only need to remember one master password.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: 12 }}>
                        {[
                            {
                                name: 'NordPass',
                                badge: 'Best Free Plan',
                                badgeColor: 'var(--green)',
                                badgeBg: 'var(--green-lt)',
                                desc: 'From the makers of NordVPN. End-to-end encrypted, free plan available, zero-knowledge architecture. Works on all platforms.',
                                // TODO: Replace with your affiliate link after registering at https://nordpass.com/affiliate/ (30% commission, 30-day cookie)
                                href: 'https://nordpass.com',
                                cta: 'Try NordPass free',
                            },
                            {
                                name: '1Password',
                                badge: 'Best for Teams',
                                badgeColor: 'var(--blue)',
                                badgeBg: 'var(--blue-lt)',
                                desc: 'Polished apps on all platforms, travel mode, Watchtower breach alerts. $2.99/month for personal use.',
                                // TODO: Replace with your affiliate link after registering at https://1password.com/affiliate/ via Commission Junction (25% commission, 45-day cookie)
                                href: 'https://1password.com',
                                cta: 'Try 1Password',
                            },
                            {
                                name: 'Dashlane',
                                badge: 'Best UI',
                                badgeColor: 'var(--amber)',
                                badgeBg: 'var(--amber-lt)',
                                desc: 'Clean interface, built-in VPN on premium, dark web monitoring. Free plan available.',
                                // TODO: Replace with your affiliate link after registering at https://www.dashlane.com/partnerships/affiliates (25% commission, 45-day cookie)
                                href: 'https://www.dashlane.com',
                                cta: 'Try Dashlane',
                            },
                        ].map(({ name, badge, badgeColor, badgeBg, desc, href, cta }) => (
                            <div key={name} style={{ padding: '18px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{name}</span>
                                    <span style={{ fontSize: 11, fontWeight: 600, color: badgeColor, background: badgeBg, padding: '2px 8px', borderRadius: 99, whiteSpace: 'nowrap' }}>{badge}</span>
                                </div>
                                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0, flex: 1 }}>{desc}</p>
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ display: 'block', padding: '8px 14px', background: 'var(--ink)', color: '#fff', borderRadius: 'var(--r-m)', fontSize: 13, fontWeight: 600, textDecoration: 'none', textAlign: 'center', transition: 'background .13s' }}
                                >
                                    {cta} →
                                </a>
                            </div>
                        ))}
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--ink-4)', marginTop: 10, fontStyle: 'italic' }}>
                        * Some links are affiliate links. We may earn a commission if you purchase — at no extra cost to you.
                    </p>
                </section>

                {/* ── Two-factor authentication ────────────────── */}
                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Two-factor authentication — the essential companion to strong passwords
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        A strong, unique password protects you from password guessing and credential stuffing attacks. But if your password is exposed in a data breach — and breaches happen to even the most security-conscious services — your account is still vulnerable. Two-factor authentication (2FA) is the layer that protects you when your password alone is no longer enough.
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        2FA requires a second form of verification in addition to your password. The most common forms are SMS codes (convenient but vulnerable to SIM-swapping attacks), authenticator app codes (TOTP — time-based one-time passwords via Google Authenticator, Authy, or 1Password's built-in TOTP), and hardware security keys (FIDO2/WebAuthn — the most secure option, used by Google, Cloudflare, and government agencies). For important accounts, always use an authenticator app or hardware key rather than SMS.
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        The hierarchy of account security is: unique strong password + 2FA + secure email account. Your email is the master key — nearly every other account can be reset via email. Securing your email account with a strong generated password and hardware key 2FA is the single highest-impact security action most people can take.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(210px, 100%), 1fr))', gap: 10 }}>
                        {[
                            { method: 'SMS codes', security: 'Low', note: 'Vulnerable to SIM-swapping. Use only if no other option is available.' },
                            { method: 'Authenticator app (TOTP)', security: 'Good', note: 'Google Authenticator, Authy, 1Password. Offline, not interceptable by phone number hijacking.' },
                            { method: 'Hardware key (FIDO2)', security: 'Best', note: 'YubiKey, Google Titan. Phishing-resistant. Strongly recommended for email and financial accounts.' },
                            { method: 'Passkeys', security: 'Best', note: 'The modern replacement for passwords. Biometric + device-bound key. No password required at all.' },
                        ].map(({ method, security, note }) => (
                            <div key={method} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{method}</div>
                                <div style={{ fontSize: 11, fontWeight: 600, color: security === 'Best' ? 'var(--green)' : security === 'Good' ? 'var(--blue)' : 'var(--amber)', marginBottom: 6 }}>Security: {security}</div>
                                <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.55 }}>{note}</div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}