export default function UsernameGeneratorContent() {
  return (
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
        <div>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              What is a username generator?
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              A username generator creates unique, memorable handles for social media profiles, gaming accounts, developer platforms, and online communities. It combines curated word lists — adjectives, nouns, and verbs — into creative combinations that are easy to remember and type.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
              This generator offers four distinct style presets: a casual fun style for social media, a professional style for LinkedIn and portfolios, a <strong style={{ color: 'var(--ink)' }}>gamer style</strong> for Discord, Twitch, and Xbox — where compact gamertags without separators are preferred — and a minimal style for platforms with strict character limits.
            </p>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              How to generate a username
            </h2>
            <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { n: '1', title: 'Select a style', desc: 'Fun uses underscores and numbers (wild_apex_392). Professional uses PascalCase without separators (BoldNova). Gamer removes all separators for gaming platforms (swiftnova847). Minimal keeps it short and clean (calmweb).' },
                { n: '2', title: 'Browse the suggestions', desc: '8 username suggestions are generated at once. Click any username to copy it immediately.' },
                { n: '3', title: 'Regenerate until you find the right one', desc: 'Click Generate new for a completely fresh set. The word pool is large enough that you\'ll rarely see repeats.' },
                { n: '4', title: 'Check availability before registering', desc: 'This tool generates the username — it doesn\'t check platform availability. Always verify your chosen handle is available on the target platform before committing.' },
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
              Tips for choosing a good username
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
              {[
                { tip: 'Keep it short',           desc: 'Under 15 characters is ideal. Short usernames are easier to remember, type, and tag.' },
                { tip: 'Make it pronounceable',   desc: 'Names that can be said out loud are easier to recommend and share verbally.' },
                { tip: 'Avoid numbers at the end',desc: 'Username123 looks like a taken name with a workaround. If you must add numbers, put them in the middle.' },
                { tip: 'Be consistent',           desc: 'Use the same username across platforms when possible. It builds a recognizable personal brand.' },
                { tip: 'Skip special characters', desc: 'Underscores are fine; dashes and dots cause issues on some platforms and are easy to confuse.' },
                { tip: 'Check all platforms first',desc: 'Before settling on a username, check availability on the platforms that matter to you.' },
              ].map(({ tip, desc }) => (
                  <div key={tip} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{tip}</div>
                    <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55 }}>{desc}</div>
                  </div>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Platform-specific username rules
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
              Each platform enforces its own rules for what constitutes a valid username. Knowing these constraints before you commit to a handle prevents the frustration of choosing a name you cannot actually register:
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                  {['Platform', 'Max length', 'Allowed characters', 'Notes'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                  ))}
                </tr>
                </thead>
                <tbody>
                {[
                  ['GitHub',     '39',  'Letters, digits, hyphens',     'Cannot start or end with hyphen; no consecutive hyphens'],
                  ['Twitter / X','15',  'Letters, digits, underscores',  'Case-insensitive; unique globally'],
                  ['Instagram',  '30',  'Letters, digits, underscores, periods', 'Cannot start/end with period; no consecutive periods'],
                  ['Discord',    '32',  'Most characters',               'Display name; separate from discriminator (deprecated) or numeric ID'],
                  ['LinkedIn',   '100', 'Letters, digits, hyphens',      'Public profile URL slug; shown in search results'],
                  ['TikTok',     '24',  'Letters, digits, underscores, periods', 'Must be at least 2 characters'],
                  ['Reddit',     '20',  'Letters, digits, hyphens, underscores', 'Case-insensitive; cannot be changed after creation'],
                  ['npm',        '214', 'Lowercase letters, digits, hyphens, underscores, periods', 'Scoped packages use @username/package format'],
                ].map(([platform, max, chars, notes], i) => (
                    <tr key={platform} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{platform}</td>
                      <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--green)', fontWeight: 600 }}>{max}</td>
                      <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{chars}</td>
                      <td style={{ padding: '10px 14px', color: 'var(--ink-3)', fontSize: 13 }}>{notes}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Building a consistent personal brand online
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              For developers, content creators, and professionals building an online presence, username consistency across platforms is a significant strategic advantage. When your GitHub handle, Twitter username, npm package scope, and personal domain all use the same name, you become dramatically easier to find, reference, and link to.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              Before committing to a username, do a systematic availability check across the platforms that matter to your audience. Tools like Namecheckr and Knowem let you search a username across dozens of platforms simultaneously. Prioritise availability on platforms where your target audience actually is: a game developer should prioritise Discord, Twitch, and itch.io; a web developer should prioritise GitHub, npm, and dev.to.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
              If your preferred username is taken on a high-priority platform but available elsewhere, consider slight variations that still feel consistent: adding a craft-specific suffix (devname, namedev), using your full name in a compact format (firstlast or first_last), or registering your personal domain at the chosen name and redirecting from there. The key is to choose a variation you can live with long-term, since changing handles after you have built an audience is disruptive and causes link rot.
            </p>
          </section>


          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Username security and account recovery
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              Your username is public by design, but it creates security implications worth understanding. On platforms that use your username as a login identifier (rather than your email), an attacker who knows your username has completed half of the credential pair. For these platforms, treat your username with slightly more discretion than your public display name.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              <strong style={{ color: 'var(--ink)' }}>Username squatting</strong> is the practice of registering a desirable username before the intended user does. On major platforms this is increasingly prohibited, but it still happens. If you are building a brand, register your chosen username on all relevant platforms as soon as you decide on it — even if you are not ready to use them all immediately. A placeholder account is better than losing the name.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              <strong style={{ color: 'var(--ink)' }}>Account recovery</strong> is the vulnerability most people overlook. If you lose access to the email address associated with an account, recovering that account becomes very difficult or impossible on some platforms. Always register accounts with an email address you own long-term (preferably a custom domain rather than a free provider you may abandon). Keep your recovery email and phone number updated.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
              <strong style={{ color: 'var(--ink)' }}>Impersonation and variations.</strong> Once you establish a username, search periodically for similar usernames that could be used for impersonation — your_name_, _yourname, yourname0. On high-visibility platforms, register the most obvious variations yourself to prevent impersonators. Report any accounts impersonating you using the platform's official reporting flow.
            </p>
          </section>

          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              The psychology of a memorable username
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
              Memorable usernames share patterns with memorable brand names: they are short, pronounceable, distinctive, and ideally carry some connotation relevant to the person or brand. The best usernames feel like a natural extension of the owner's identity — not a random string with numbers appended to make it available.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { principle: 'Pronounceable', why: 'Names that can be said aloud are shared more easily in conversation. "Find me at swiftnova" is more effective word-of-mouth than "find me at sw1ft_n0va_84".' },
                { principle: 'Distinctive without being bizarre', why: 'Mildly unusual is memorable. Extremely unusual is hard to recall and spell. Aim for a name that makes someone say "oh that is clever" rather than "how do you spell that?".' },
                { principle: 'Consistent with your domain', why: 'A username that relates to your craft or personality creates immediate context. A developer named "nullbytes", a designer named "pixelframe", a writer named "inkwell" — each signals expertise at a glance.' },
                { principle: 'Forward-compatible', why: 'Avoid names that will feel wrong in 5 years — references to current trends, age-specific tags (born_2001), or company-specific names if you might change jobs. Pick something you can grow into.' },
              ].map(({ principle, why }, i) => (
                <div key={principle} style={{ padding: '12px 16px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{principle}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{why}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
  );
}