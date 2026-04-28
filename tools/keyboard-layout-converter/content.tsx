export default function KeyboardLayoutConverterContent() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
      <div>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            What is a keyboard layout converter?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            A keyboard layout converter fixes text that was typed with the wrong keyboard layout active. If you meant to write in Ukrainian or Russian but your system was still set to English — or vice versa — the result is gibberish like &quot;ghbdsn&quot; instead of &quot;привіт&quot;. This tool converts each character to what the same physical key would produce in the correct layout.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            Unlike transliteration (which maps characters by sound — &quot;ш&quot; → &quot;sh&quot;), layout conversion maps by key position. The &quot;a&quot; key on a QWERTY keyboard produces &quot;ф&quot; when Ukrainian layout is active, so the converter reverses exactly that mapping.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            How to use
          </h2>
          <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { n: '1', title: 'Select the conversion direction', desc: 'Choose the pair of layouts — for example, English → Ukrainian if you typed Ukrainian words on an English keyboard, or Ukrainian → English for the reverse.' },
              { n: '2', title: 'Paste or type the mistyped text', desc: 'Enter the text in the input field. The tool converts every character in real time as you type.' },
              { n: '3', title: 'Copy the result', desc: 'The corrected text appears instantly in the output panel. Click Copy to grab it. Use the swap button to quickly reverse the direction.' },
            ].map(({ n, title, desc }) => (
              <li key={n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--bg-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{n}</span>
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
            Supported layout pairs
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left' }}>Direction</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left' }}>Example input</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left' }}>Example output</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left' }}>When to use</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { dir: 'EN → UA', inp: 'ghbdsn', out: 'привіт', when: 'Typed Ukrainian text with English layout on' },
                  { dir: 'UA → EN', inp: 'пшефги', out: 'github', when: 'Typed English text with Ukrainian layout on' },
                  { dir: 'EN → RU', inp: 'ghbdtn', out: 'привет', when: 'Typed Russian text with English layout on' },
                  { dir: 'RU → EN', inp: 'руддщ', out: 'hello', when: 'Typed English text with Russian layout on' },
                ].map(({ dir, inp, out, when }) => (
                  <tr key={dir} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600 }}>{dir}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>{inp}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>{out}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-3)' }}>{when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            How keyboard layout mapping works
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            Every physical key on your keyboard sends the same key code to the operating system regardless of the active layout. The OS then translates that code into a character based on the selected language. When you type with the wrong layout, the physical keys are correct but the characters are wrong.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            This tool reverses the process: it takes each character in your input, finds which physical key would have produced it in the source layout, then outputs the character that same key produces in the target layout. The mapping covers all printable characters including shifted variants (uppercase letters, punctuation marks, and special symbols).
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            Characters that don&apos;t exist in the source layout — such as digits, spaces, tabs, and emojis — pass through unchanged, since they are typically identical across standard QWERTY-based layouts.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Layout conversion vs transliteration
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            These two concepts are often confused but serve completely different purposes:
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left' }}>Aspect</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left' }}>Layout conversion</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left' }}>Transliteration</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { aspect: 'Mapping basis', layout: 'Physical key position', translit: 'Phonetic similarity' },
                  { aspect: 'Example (UA→EN)', layout: 'ф → a (same key)', translit: 'ф → f (same sound)' },
                  { aspect: 'Use case', layout: 'Fix wrong-layout mistakes', translit: 'Romanize Cyrillic for URLs, passports, etc.' },
                  { aspect: 'Reversibility', layout: '100% reversible', translit: 'Often lossy (ш → sh → ?)' },
                ].map(({ aspect, layout, translit }) => (
                  <tr key={aspect} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600 }}>{aspect}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{layout}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{translit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Common scenarios
          </h2>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'You wrote a Slack message in the wrong layout and need to resend it quickly.',
              'You pasted a URL or command that was typed with Cyrillic layout and needs to be English.',
              'You copied text from a document where someone forgot to switch layouts mid-sentence.',
              'You are searching for a file or variable name but typed it in the wrong layout.',
              'You received a message that looks like gibberish and want to decode which layout it was typed in.',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>{item}</li>
            ))}
          </ul>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Privacy and security
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            This tool runs 100% in your browser. The text you enter is never transmitted to any server — the character mapping is a simple JavaScript lookup table that executes locally. There are no cookies, no analytics on input content, and no storage of your text. You can verify this by disconnecting from the internet and confirming the tool still works.
          </p>
        </section>

      </div>
    </div>
  );
}
