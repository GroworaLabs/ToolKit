const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
    {children}
  </h2>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>{children}</p>
);

const MORSE_TABLE = [
  ['A','.-'],['B','-...'],['C','-.-.'],['D','-..'],['E','.'],['F','..-.'],['G','--.'],
  ['H','....'],['I','..'],['J','.---'],['K','-.-'],['L','.-..'],['M','--'],
  ['N','-.'],['O','---'],['P','.--.'],['Q','--.-'],['R','.-.'],['S','...'],
  ['T','-'],['U','..-'],['V','...-'],['W','.--'],['X','-..-'],['Y','-.--'],['Z','--..'],
  ['0','-----'],['1','.----'],['2','..---'],['3','...--'],['4','....-'],
  ['5','.....'],['6','-....'],['7','--...'],['8','---..'],['9','----.'],
];

export default function TextToMorseContent() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>

      {/* ── What is Morse code ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>What is Morse code and who invented it?</H2>
        <P>
          Morse code is a method of encoding text as sequences of two symbols — a short signal called a dot
          and a long signal called a dash. It was developed in the early 1840s by Samuel Morse, an American
          artist and inventor, together with his assistant Alfred Vail. The system was designed specifically
          for the electric telegraph, a technology that could transmit electrical pulses over long copper
          wire lines between distant cities. Before Morse code, there was no practical way to encode the
          letters of the alphabet as distinct electrical signals, making long-distance text communication
          impossible.
        </P>
        <P>
          Morse and Vail solved the problem with an elegantly simple principle: assign each letter a unique
          sequence of short and long pulses. They made a crucial optimization that makes Morse code efficient
          for English text: letters that appear most frequently in the language received the shortest codes.
          The letter E, the most common letter in English, is a single dot. The letter T is a single dash.
          Common letters like A, I, N, and S have two-symbol codes. Rare letters like Q and Z have four-symbol
          codes. This frequency-based variable-length encoding was one of the first practical applications of
          information theory — the same mathematical principle that underlies modern data compression formats
          like ZIP and MP3.
        </P>
        <P>
          The first official long-distance Morse code message was transmitted on May 24, 1844, from Washington
          D.C. to Baltimore, Maryland. The message was "What hath God wrought" — a biblical phrase chosen
          by the daughter of the Patent Commissioner who had supported Morse's work. The telegraph network
          built on this technology transformed commerce, journalism, and military communication throughout
          the second half of the nineteenth century. Morse code itself outlasted the telegraph, remaining
          in active use for maritime communication, aviation, and amateur radio well into the twenty-first
          century.
        </P>
      </section>

      {/* ── How to use ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>How to use the Morse code translator</H2>
        <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            {
              n: '1',
              title: 'Choose the direction',
              desc: 'The tool can translate in both directions. Select Text to Morse to encode plain text into Morse code dots and dashes. Select Morse to Text to decode a Morse code string back into plain text. The direction toggle is at the top of the tool.',
            },
            {
              n: '2',
              title: 'Type or paste your input',
              desc: 'For Text to Morse: type or paste any text. Letters, digits, and common punctuation are all supported. Characters without a Morse equivalent are shown as a question mark in the output. For Morse to Text: paste a Morse code string using dots and hyphens, with a single space between characters and a forward slash surrounded by spaces between words.',
            },
            {
              n: '3',
              title: 'Read the output',
              desc: 'The translation appears instantly. Each character becomes its Morse code sequence, separated from the next character by a space. Words are separated by a space-slash-space. For example, "HI THERE" encodes as ".... .. / - .... . .-. .".',
            },
            {
              n: '4',
              title: 'Copy the result',
              desc: 'Click Copy to send the translated output to your clipboard. The button shows the output character count so you can confirm the length before pasting into another application.',
            },
          ].map(({ n, title, desc }) => (
            <li key={n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{n}</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{title}</div>
                <P>{desc}</P>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Complete reference table ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>Complete Morse code reference table</H2>
        <P>
          The table below shows the International Morse code (ITU-R M.1677-1) for all 26 letters and all 10
          digits. This is the globally standardized version used in amateur radio, aviation, and maritime
          communication worldwide.
        </P>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: 6 }}>
            {MORSE_TABLE.map(([ch, code]) => (
              <div key={ch} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 6px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-m)' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 18, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>{ch}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--green)', marginTop: 6, letterSpacing: 2 }}>{code}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timing and format ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>Morse code timing rules and written format</H2>
        <P>
          Written Morse code and transmitted Morse code follow different conventions. Written Morse uses
          dots and dashes as visual symbols with spaces to separate units. Transmitted Morse is based on
          precise timing ratios between signal and silence. Understanding both conventions is important
          for using this tool correctly.
        </P>
        <div style={{ overflowX: 'auto', marginBottom: 16 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                {['Unit', 'Written form', 'Audio duration', 'Example'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Dot',                  '.',   '1 unit',  'E = .'],
                ['Dash',                 '-',   '3 units', 'T = -'],
                ['Space within letter',  '(none)', '1 unit', 'A = . -'],
                ['Space between letters','space', '3 units', '. / .. = E I'],
                ['Space between words',  ' / ', '7 units', 'HI THERE = .... .. / - .... . .-. .'],
              ].map(([unit, written, duration, ex], i) => (
                <tr key={unit} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{unit}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--green)', fontSize: 13 }}>{written}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)', fontSize: 13 }}>{duration}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-3)', fontSize: 12, wordBreak: 'break-all' }}>{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <P>
          The timing ratios — 1:3:7 for dot, inter-character space, and inter-word space — are not
          arbitrary. They were chosen so that an experienced operator can distinguish letters from
          words purely by listening, even at high transmission speeds. At 20 words per minute, a
          dot lasts about 60 milliseconds. A skilled operator handles this timing intuitively after
          extensive practice, much like a musician reads rhythm without consciously counting beats.
        </P>
      </section>

      {/* ── Use cases ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>Where Morse code is used today</H2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              title: 'Amateur radio (ham radio)',
              body: 'The amateur radio community, known as ham radio operators, maintains Morse code as an active skill and tradition. In this context Morse code is called CW — short for continuous wave — referring to the constant-frequency carrier signal that is keyed on and off. Many operators consider CW mastery a point of pride and technical achievement. Morse code has a practical advantage in amateur radio: a CW signal is narrower in bandwidth than a voice signal and can be copied by ear even when signal-to-noise ratio is too poor for voice communication. Emergency operators on distant expeditions and maritime vessels in distress still rely on this property.',
            },
            {
              title: 'Aviation navigation beacons',
              body: 'Every VOR (VHF omnidirectional range) and NDB (non-directional beacon) navigation aid used by aircraft transmits a three-letter Morse code identifier at regular intervals. Pilots tuning a navigation radio hear the Morse identifier as an audio tone overlay on the navigation signal. This allows them to confirm they have tuned the correct beacon and that the beacon is operating normally. The Morse identifiers for major airports and waypoints are published in aeronautical charts and pilots are expected to recognize them by ear during instrument flight.',
            },
            {
              title: 'Accessibility input technology',
              body: 'Morse code is a recognized accessibility input method for people who have limited motor control and can only operate a single switch or button. Single-switch Morse keyboards allow users to input text by tapping — one short tap for a dot, one long tap for a dash, a pause to confirm a letter, a longer pause for a space. This makes full text input possible for people with conditions such as ALS, cerebral palsy, or severe motor injury. Google\'s Gboard keyboard for Android includes a Morse code input mode specifically for this purpose. Eye-tracking systems can also accept Morse input through intentional blinks.',
            },
            {
              title: 'Emergency signaling',
              body: 'The SOS distress signal — three dots, three dashes, three dots — is internationally recognized as a call for help. It can be transmitted with any device capable of producing a signal: a radio, a flashlight, a mirror reflecting sunlight, a whistle, or even tapping on a solid surface. SOS was chosen for exactly these properties: it is short, symmetrical, and distinct from any letter or common word pattern, making it immediately recognizable even by someone with no Morse training. Knowing how to signal SOS in multiple forms is a fundamental survival skill.',
            },
            {
              title: 'Puzzle design and cryptography exercises',
              body: 'Morse code appears frequently in escape rooms, treasure hunts, competitive programming challenges, and capture-the-flag security competitions. It is ideal for puzzle design because it has a well-defined, publicly available encoding that contestants can look up, but decoding a long message still requires careful attention. Combined with other encodings or embedded in audio files and images, Morse provides a satisfying layer of complexity for puzzle designers. Familiarity with Morse code is a useful skill for anyone who participates in these activities regularly.',
            },
          ].map(({ title, body }) => (
            <div key={title} style={{ padding: '18px 20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>{title}</div>
              <P>{body}</P>
            </div>
          ))}
        </div>
      </section>

      {/* ── American vs International ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>American Morse vs. International Morse</H2>
        <P>
          There are two historical variants of Morse code. American Morse code — also called Railroad Morse —
          was the original system developed by Morse and Vail for landline telegraph in the United States. It
          introduced a third element type: a medium-length pause that occurred within certain letters, making
          some codes more efficient for experienced operators but significantly harder to learn. American Morse
          also assigned different codes to some letters compared to International Morse.
        </P>
        <P>
          International Morse code — also called Continental Morse — was standardized at international
          telegraph conferences in the 1850s to enable communication across borders and between telegraph
          systems operated by different countries. It eliminated the internal pause, used only dots and
          dashes, and became the global standard. Today "Morse code" universally refers to International
          Morse as specified by ITU-R M.1677-1. This tool implements International Morse code.
        </P>
      </section>

      {/* ── Tips ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>Tips for using the Morse code translator</H2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
          {[
            { tip: 'Use the word separator', desc: 'When decoding, separate words with " / " (space, slash, space). Without the word separator, the decoder cannot tell where one word ends and the next begins.' },
            { tip: 'Decode unknown Morse', desc: 'Found Morse code in a puzzle, game, or image? Paste it directly into Morse to Text mode. Unknown character codes that match nothing in the table will appear as question marks.' },
            { tip: 'Learn SOS by heart', desc: 'SOS is ... --- ... — three dots, three dashes, three dots. It is the most important Morse sequence to memorize and can be signaled with light, sound, or tapping.' },
            { tip: 'Compare code lengths', desc: 'Notice that E (.) and T (-) are single symbols while Q (--.-) and Z (--.. ) are four symbols. This reflects letter frequency in English — common letters have short codes.' },
            { tip: 'Check punctuation support', desc: 'Common punctuation like period (.-.-.-), comma (--..--), and question mark (..--..) are supported. Characters outside the ITU table appear as ? in the output.' },
            { tip: 'Combine with audio tools', desc: 'The text output of this tool is written Morse. To hear it as audio, copy the output and use an audio Morse player. The timing ratios are: dot=1 unit, dash=3, letter gap=3, word gap=7.' },
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
