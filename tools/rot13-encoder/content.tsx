const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
    {children}
  </h2>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>{children}</p>
);

const pairs = [
  ['A','N'],['B','O'],['C','P'],['D','Q'],['E','R'],['F','S'],['G','T'],
  ['H','U'],['I','V'],['J','W'],['K','X'],['L','Y'],['M','Z'],
];

export default function Rot13EncoderContent() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>

      {/* ── What is ROT13 ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>What is ROT13 and how does it work?</H2>
        <P>
          ROT13 — short for "rotate by 13" — is a simple letter substitution cipher that replaces each
          letter of the Latin alphabet with the letter 13 positions after it, wrapping around at the end.
          A becomes N, B becomes O, C becomes P, and so on until M becomes Z. Then N wraps back to A,
          O becomes B, and the pattern continues so that Z becomes M. The name of the cipher describes
          its operation exactly: each letter is rotated 13 positions forward in the 26-letter alphabet.
        </P>
        <P>
          The mathematical elegance of ROT13 comes from the fact that the Latin alphabet has exactly
          26 letters — twice 13. This means that applying the rotation twice returns you to the original
          letter. If A becomes N after one rotation, then N becomes A after a second rotation. This
          property holds for every letter without exception, making ROT13 a self-inverse function: the
          same operation both encodes and decodes. There is no separate "decrypt" mode needed. You apply
          ROT13 to encode. You apply ROT13 again to decode. One button does everything.
        </P>
        <P>
          Non-letter characters pass through ROT13 completely unchanged. Digits, spaces, punctuation,
          emoji, and all non-Latin Unicode characters are returned as-is. The rotation applies only to
          the 26 standard unaccented Latin letters in both uppercase and lowercase. Lowercase letters
          stay lowercase after rotation and uppercase letters stay uppercase — the case is preserved
          throughout. So "Hello World!" becomes "Uryyb Jbeyq!" after ROT13, and applying ROT13 again
          recovers the original "Hello World!" exactly.
        </P>
      </section>

      {/* ── Letter pair map ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>The 13 letter pairs</H2>
        <P>
          ROT13 creates exactly 13 symmetric pairs. Every letter maps to exactly one partner, and the
          partnership is bidirectional — each letter in a pair encodes to the other and decodes from it.
          Lowercase follows the same pattern: a encodes to n, b to o, c to p, and so on.
        </P>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {pairs.map(([a, b]) => (
            <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-m)', boxShadow: 'var(--sh-xs)' }}>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 18, color: 'var(--green)' }}>{a}</span>
              <span style={{ fontSize: 13, color: 'var(--ink-4)' }}>↔</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 18, color: 'var(--ink)' }}>{b}</span>
            </div>
          ))}
        </div>
        <P>
          Memorizing even a few of these pairs helps you quickly spot ROT13-encoded text without a tool.
          The pairs A-N, E-R, and H-U are worth knowing because they involve very common English letters.
          Seeing a text where every E has become R and every H has become U is a recognizable pattern
          once you know to look for it.
        </P>
      </section>

      {/* ── How to use ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>How to use the ROT13 encoder and decoder</H2>
        <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            {
              n: '1',
              title: 'Type or paste your text',
              desc: 'Enter any text into the input field. You can encode plain text or decode ROT13-encoded text — the same input field handles both directions because ROT13 is self-inverse.',
            },
            {
              n: '2',
              title: 'Read the output',
              desc: 'The ROT13 result appears instantly. Each letter is replaced by its partner. Numbers, spaces, and all other characters remain unchanged. The output updates in real time as you type.',
            },
            {
              n: '3',
              title: 'Apply again to decode',
              desc: 'If you paste ROT13-encoded text into the input, the output is the decoded original. If you then paste that output back in, you get the encoded version again. This is the self-inverse property in action.',
            },
            {
              n: '4',
              title: 'Copy the result',
              desc: 'Click Copy to send the output to your clipboard. Paste it wherever you need — a forum post, a chat message, a puzzle answer, or a code comment that you want to make non-immediately-readable.',
            },
          ].map(({ n, title, desc }) => (
            <li key={n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--bg-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{n}</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{title}</div>
                <P>{desc}</P>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── ROT13 vs real encryption ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>ROT13 vs. real encryption — what is the difference?</H2>
        <P>
          ROT13 is not encryption. It provides no cryptographic security and can be reversed by anyone
          who knows the scheme — or anyone who simply tries all 25 possible Caesar cipher shifts until
          they get readable English text. Real encryption algorithms are designed to be computationally
          infeasible to reverse without the correct key, even for an attacker with significant computing
          resources and full knowledge of the algorithm.
        </P>
        <div style={{ overflowX: 'auto', marginBottom: 16 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['Cipher / Algorithm', 'Key', 'Security level', 'Use case'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['ROT13',    'None (fixed 13)',  'None',      'Obfuscation, spoilers, puzzle layers'],
                ['Caesar-3', 'Shift of 3',       'None',      'Historical curiosity only'],
                ['Vigenere', 'Keyword string',   'Minimal',   'Historical cipher puzzles'],
                ['AES-128',  '128-bit key',      'Strong',    'General encryption'],
                ['AES-256',  '256-bit key',      'Very high', 'Sensitive data, TLS, file encryption'],
                ['bcrypt',   'Work factor + salt','Very high', 'Password hashing'],
              ].map(([cipher, key, sec, use], i) => (
                <tr key={cipher} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{cipher}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', wordBreak: 'break-all' }}>{key}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{sec}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-3)', fontSize: 13 }}>{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <P>
          The key difference is that ROT13 has no key. Every person who applies ROT13 uses the same
          fixed shift of 13. There is nothing secret about the operation. In contrast, AES-256 uses
          a 256-bit random key that must remain secret for the encryption to be meaningful — the
          algorithm itself is public, but without the key, decryption is computationally impossible
          with current technology. Never use ROT13 to protect any information that must remain
          confidential. Use it only for casual, voluntary obfuscation.
        </P>
      </section>

      {/* ── History and culture ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>ROT13 in internet culture and history</H2>
        <P>
          ROT13 has a peculiar place in the history of internet culture. Its origins lie in Usenet — the
          precursor to modern internet forums — where it became a community convention in the 1980s for
          encoding joke punchlines, puzzle answers, and content that readers might find offensive or
          spoiler-like. The idea was elegant in its social design: the content was accessible to anyone
          willing to make the small effort of decoding it, but it would not appear in your face accidentally.
          This created a form of voluntary content filtering that predated algorithmic content moderation
          by decades.
        </P>
        <P>
          The Usenet convention encoded an implicit social contract: "I am sharing this information,
          but I am signaling that you should actively choose to read it rather than encounter it
          passively." This is philosophically interesting as a community-driven norm rather than a
          platform-enforced rule. Modern equivalents include Reddit spoiler tags and collapsed content
          warnings, but ROT13 achieved the same effect through pure convention with no technical
          enforcement.
        </P>
        <P>
          ROT13 appears in Eric S. Raymond's "The Jargon File" — a famous compendium of hacker culture
          and slang — as a defining piece of technical community culture. It is often the first cipher
          taught in introductory cybersecurity courses because it illustrates several core cryptographic
          concepts in a form simple enough to reason about entirely by hand: substitution ciphers, the
          lack of a key as a fundamental weakness, frequency analysis as a decryption technique, and
          the difference between obfuscation and genuine security.
        </P>
      </section>

      {/* ── Common uses ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>Common uses of ROT13 today</H2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              title: 'Forum spoilers and puzzle answers',
              body: 'The original and still most common use: encoding a movie spoiler, a book plot point, or the answer to a riddle so that readers who want to avoid it can scroll past without accidentally reading it. Tech-oriented communities use ROT13 for this purpose because their users are comfortable decoding it. When someone posts "ROT13:" followed by scrambled text in a forum, readers know exactly what it means and how to decode it without needing any explanation.',
            },
            {
              title: 'CTF and puzzle competitions',
              body: 'Capture-the-flag security competitions and online puzzle hunts frequently include ROT13 as one layer of a multi-step encoding challenge. Recognizing ROT13-encoded text — or recognizing its output pattern — is a basic skill for CTF participants. The tool is useful for quickly testing whether a suspicious string is ROT13-encoded: paste it in and see if the output looks like readable text. ROT13 is often combined with Base64, hex encoding, or other transformations to create multi-layer puzzles.',
            },
            {
              title: 'Joke delivery',
              body: 'ROT13 is the classic delivery mechanism for long-form jokes where the punchline should not be visible to people who have not read the setup. The joke body is posted in plain text, and the punchline is posted in ROT13 immediately after. Readers who finish the setup can choose to decode; readers who skipped to the bottom do not see the punchline spoiled. This use case gave ROT13 much of its cultural cachet in early internet communities.',
            },
            {
              title: 'Educational cryptography examples',
              body: 'ROT13 is ideal for teaching fundamental cryptography concepts because students can verify every step by hand. The substitution is simple enough to apply manually with a letter frequency table, making it possible to explain brute-force attacks (try all 25 shifts), frequency analysis (the most common ciphertext letter is probably E), and the relationship between key space and security (ROT13 has key space of 1) without any mathematics beyond basic counting.',
            },
          ].map(({ title, body }) => (
            <div key={title} style={{ padding: '18px 20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>{title}</div>
              <P>{body}</P>
            </div>
          ))}
        </div>
      </section>

      {/* ── Implementation reference ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>Implementing ROT13 in code</H2>
        <P>
          ROT13 is a common beginner programming exercise because the logic is simple to implement
          correctly and serves as a practical introduction to string manipulation and modular arithmetic.
        </P>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            {
              lang: 'JavaScript',
              code: `str.replace(/[a-zA-Z]/g, c => {\n  const b = c <= 'Z' ? 65 : 97;\n  return String.fromCharCode((c.charCodeAt(0) - b + 13) % 26 + b);\n});`,
            },
            {
              lang: 'Python',
              code: `import codecs\ncodecs.encode("Hello, World!", "rot_13")  # "Uryyb, Jbeyq!"`,
            },
            {
              lang: 'Unix shell (tr)',
              code: `echo "Hello" | tr A-Za-z N-ZA-Mn-za-m`,
            },
            {
              lang: 'Ruby',
              code: `"Hello, World!".tr("A-Za-z", "N-ZA-Mn-za-m")`,
            },
          ].map(({ lang, code }) => (
            <div key={lang} style={{ background: 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-m)', overflow: 'hidden' }}>
              <div style={{ padding: '6px 12px', background: 'var(--border)', fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{lang}</div>
              <pre style={{ margin: 0, padding: '12px', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--green)', overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{code}</pre>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tips ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>Tips for using the ROT13 encoder</H2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
          {[
            { tip: 'One button encodes and decodes', desc: 'Because ROT13 is self-inverse, you do not need a separate decode button. Paste encoded text in and the output is decoded. Paste decoded text in and the output is encoded.' },
            { tip: 'Check for readable output', desc: 'When testing whether a suspicious string is ROT13, paste it in and see if the output contains recognizable English words. If it does, the input was likely ROT13-encoded.' },
            { tip: 'Numbers do not change', desc: 'ROT13 only affects the 26 Latin letters. Digits, spaces, punctuation, and all other characters pass through unchanged. "Hello123" becomes "Uryyb123."' },
            { tip: 'Accented letters are unchanged', desc: 'Extended Latin characters like é, ü, ñ, and ç are not rotated. ROT13 is defined only for the 26 standard unaccented ASCII letters.' },
            { tip: 'Use for spoilers', desc: 'Post ROT13-encoded text on forums and puzzle threads to give readers a choice about whether to see the answer. Prefix it with "ROT13:" so readers know how to decode it.' },
            { tip: 'Never for real security', desc: 'ROT13 has zero cryptographic strength. Use it only for casual obfuscation. For passwords, tokens, or private data, use AES-256 or bcrypt as appropriate.' },
          ].map(({ tip, desc }) => (
            <div key={tip} style={{ padding: '14px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 6 }}>{tip}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
