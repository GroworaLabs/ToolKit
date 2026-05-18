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
            QWERTY ↔ ЙЦУКЕН key mapping reference
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
            The table below shows the physical key position mapping between English QWERTY and Ukrainian/Russian ЙЦУКЕН. When you type with the wrong layout, each character corresponds to a specific key in the other layout — this is exactly what the converter reverses.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                  {['QWERTY key', 'Ukrainian (ЙЦУКЕН)', 'Russian (ЙЦУКЕН)', 'Key location'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['q', 'й', 'й', 'Top row, leftmost'],
                  ['w', 'ц', 'ц', 'Top row'],
                  ['e', 'у', 'у', 'Top row'],
                  ['r', 'к', 'к', 'Top row'],
                  ['t', 'е', 'е', 'Top row'],
                  ['y', 'н', 'н', 'Top row'],
                  ['u', 'г', 'г', 'Top row'],
                  ['i', 'ш', 'ш', 'Top row'],
                  ['o', 'щ', 'щ', 'Top row'],
                  ['p', 'з', 'з', 'Top row'],
                  ['a', 'ф', 'ф', 'Home row, leftmost'],
                  ['s', 'і', 'ы', 'Home row (differs UA/RU)'],
                  ['d', 'в', 'в', 'Home row'],
                  ['f', 'а', 'а', 'Home row'],
                  ['g', 'п', 'п', 'Home row'],
                  ['h', 'р', 'р', 'Home row'],
                  ['j', 'о', 'о', 'Home row'],
                  ['k', 'л', 'л', 'Home row'],
                  ['l', 'д', 'д', 'Home row'],
                  ['z', 'я', 'я', 'Bottom row, leftmost'],
                  ['x', 'ч', 'ч', 'Bottom row'],
                  ['c', 'с', 'с', 'Bottom row'],
                  ['v', 'м', 'м', 'Bottom row'],
                  ['b', 'и', 'и', 'Bottom row'],
                  ['n', 'т', 'т', 'Bottom row'],
                  ['m', 'ь', 'ь', 'Bottom row'],
                ].map(([en, ua, ru, pos], i) => (
                  <tr key={en} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '8px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 700, color: 'var(--green)' }}>{en}</td>
                    <td style={{ padding: '8px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: 'var(--ink)' }}>{ua}</td>
                    <td style={{ padding: '8px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: 'var(--ink)' }}>{ru}</td>
                    <td style={{ padding: '8px 14px', fontSize: 12, color: 'var(--ink-3)' }}>{pos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-3)', marginTop: 12 }}>
            Note: Ukrainian and Russian ЙЦУКЕН layouts are nearly identical except for a few keys. The most notable difference is the S key — Ukrainian produces <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>і</code> while Russian produces <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>ы</code>.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Keyboard layout switching shortcuts by OS
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
            To avoid typing in the wrong layout in the first place, learn your OS keyboard shortcut. A quick muscle-memory habit eliminates the need to fix text afterwards:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                os: 'Windows 10 / 11',
                shortcut: 'Win + Space',
                alt: 'Alt + Shift (older shortcut, still works)',
                note: 'Cycles through all installed input languages. The language indicator in the system tray (bottom right) shows the current layout (e.g. ENG, УКР, RUS).',
              },
              {
                os: 'macOS',
                shortcut: 'Control + Space',
                alt: 'Cmd + Space (if not used by Spotlight)',
                note: 'Shows the Input Sources menu. Configure shortcuts in System Settings → Keyboard → Input Sources. The flag icon in the menu bar shows the active layout.',
              },
              {
                os: 'Ubuntu / GNOME',
                shortcut: 'Super + Space',
                alt: 'Win + Space or custom binding in Settings → Keyboard → Input Sources',
                note: 'The active layout indicator appears in the top bar. Set up IBus or GNOME input sources for reliable multi-layout support.',
              },
              {
                os: 'Linux (KDE Plasma)',
                shortcut: 'Alt + Shift (default)',
                alt: 'Configurable in System Settings → Input Devices → Keyboard → Layouts',
                note: 'Plasma shows the current layout in the system tray. You can also configure a per-window layout setting so each app remembers its own language.',
              },
            ].map(({ os, shortcut, alt, note }, i) => (
              <div key={os} style={{ padding: '16px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', flexWrap: 'wrap', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{os}</span>
                  <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 700, color: 'var(--green)', background: 'var(--green-lt)', padding: '2px 8px', borderRadius: 99 }}>{shortcut}</code>
                </div>
                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, marginBottom: 4 }}>Alternative: {alt}</p>
                <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6, margin: 0 }}>{note}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Automatic layout correction tools
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
            If you frequently forget to switch layouts, dedicated tools can detect and correct the language automatically as you type — no copy-paste needed:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
            {[
              { name: 'Punto Switcher', platform: 'Windows', desc: 'The most popular automatic layout switcher for Russian/Ukrainian users. Detects wrong-layout typing in real time and silently corrects it. Free, by Yandex.' },
              { name: 'Tapper', platform: 'macOS', desc: 'Auto-switches layout based on what you type. Open-source alternative to Punto Switcher for Mac. Lightweight and runs in the menu bar.' },
              { name: 'xkeysnail / keyd', platform: 'Linux', desc: 'Keyboard remapping daemons for Linux that can be configured to auto-correct layout on hotkey. More technical to set up but highly configurable.' },
              { name: 'Jayme / Convertify', platform: 'Browser extensions', desc: 'Browser extensions that add a right-click "convert layout" option for selected text in any web input field.' },
            ].map(({ name, platform, desc }) => (
              <div key={name} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{name}</div>
                <div style={{ fontSize: 11, color: 'var(--green)', fontWeight: 600, marginBottom: 6 }}>{platform}</div>
                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
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
