export default function ReverseTextContent() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
      <div>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            What is a reverse text generator?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            A reverse text generator takes a string of text and outputs it in the opposite order — characters, words, or lines can each be reversed independently. The simplest form, character reversal, produces a mirror image of the text where the last character becomes the first: "Hello" becomes "olleH". This is distinct from word reversal ("Hello World" → "World Hello") and line reversal, which flips the sequence of lines without altering their content.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            Reversed text has practical applications across several fields. Developers use it for testing string-handling edge cases, palindrome detection, and encoding. Educators use it for puzzles and exercises. Designers and typographers use it for logo concepts and typographic art. Social media users use it to create intriguing captions and bios that require a second look to decode.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
            This tool handles Unicode correctly, treating multi-code-point emoji and combined characters as single units, so reversed emoji stay intact rather than breaking into unrecognizable code point fragments.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            The three reversal modes explained
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              {
                mode: 'Character reversal',
                desc: 'The entire text is split into individual Unicode characters (using the spread operator to respect multi-code-point characters), then the array is reversed and joined back. Every character — letters, spaces, punctuation, line breaks, emoji — is included in the reversal.',
                input:  'The quick brown fox',
                output: 'xof nworb kciuq ehT',
                use: 'Mirror text art, palindrome detection, coding challenges, encryption experiments',
              },
              {
                mode: 'Word reversal',
                desc: 'The text is split on whitespace boundaries (spaces, tabs, newlines), the array of words is reversed, and whitespace is reinserted between them. Characters within each word remain in their original order — only the sequence of words changes.',
                input:  'Hello beautiful world',
                output: 'world beautiful Hello',
                use: 'Creative writing exercises, reversing lists of items, testing NLP parsing',
              },
              {
                mode: 'Line reversal',
                desc: 'The text is split on newline characters. The array of lines is reversed and rejoined with newlines. The content within each line — including word order, spacing, and punctuation — remains unchanged.',
                input:  'First line\nSecond line\nThird line',
                output: 'Third line\nSecond line\nFirst line',
                use: 'Showing newest log entries first, reversing numbered steps, reordering ranked lists',
              },
            ].map(({ mode, desc, input, output, use }) => (
              <div key={mode} style={{ padding: '20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>{mode}</div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-2)', margin: '0 0 12px' }}>{desc}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                  <div style={{ padding: '8px 12px', background: 'var(--page-bg)', borderRadius: 'var(--r-m)', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Input</div>
                    <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--ink)' }}>{input}</code>
                  </div>
                  <div style={{ padding: '8px 12px', background: 'var(--green-lt)', borderRadius: 'var(--r-m)', border: '1px solid var(--green-mid, rgba(5,150,105,.2))' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Output</div>
                    <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--green)' }}>{output}</code>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--ink)' }}>Use cases: </strong>{use}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Palindromes and reversed text
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            A palindrome is a word, phrase, or sequence that reads the same forwards and backwards. Classic examples include "racecar", "level", and "A man a plan a canal Panama" (ignoring spaces). Reversed text generators are a simple way to verify whether text forms a palindrome: if the reversed output matches the original input, it is a palindrome.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            For automatic palindrome detection with support for ignoring spaces, punctuation, and case, the <a href="/tools/word-counter" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Word Counter</a> can help you assess text properties, while manual comparison with this tool works well for shorter inputs.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
            {[
              { word: 'racecar',    palindrome: true },
              { word: 'level',      palindrome: true },
              { word: 'madam',      palindrome: true },
              { word: 'civic',      palindrome: true },
              { word: 'hello',      palindrome: false },
              { word: 'world',      palindrome: false },
            ].map(({ word, palindrome }) => (
              <div key={word} style={{
                padding: '12px 14px', borderRadius: 'var(--r-m)',
                background: palindrome ? 'var(--green-lt)' : 'var(--page-bg)',
                border: `1px solid ${palindrome ? 'var(--green-mid, rgba(5,150,105,.2))' : 'var(--border)'}`,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: 'var(--ink)', fontWeight: 600 }}>{word}</code>
                <span style={{ fontSize: 11, fontWeight: 600, background: palindrome ? 'var(--green)' : 'var(--border)', color: palindrome ? '#fff' : 'var(--ink-3)', padding: '2px 8px', borderRadius: 20 }}>
                  {palindrome ? 'Palindrome' : 'Not a palindrome'}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Creative uses for reversed text
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
            {[
              { title: 'Social media bios', desc: 'Reversed text in an Instagram or Twitter bio creates an element of surprise. Visitors who notice they need to read it backwards feel a moment of delight — increasing time-on-profile and interaction.' },
              { title: 'Escape room puzzles', desc: 'Character-reversed clues are a classic escape room mechanic. Participants must hold the clue up to a mirror or transcribe it backwards, adding a physical puzzle layer to text-based mysteries.' },
              { title: 'Logo and typographic concepts', desc: 'Some brand logos use reversed letterforms or palindromic constructions. Word-reversed text can reveal unexpected visual symmetries or interesting typographic patterns worth exploring in a design brief.' },
              { title: 'Programming exercises', desc: 'Reverse-string exercises are among the most common coding interview questions. Use this tool to quickly check expected output while practicing implementations in different languages.' },
            ].map(({ title, desc }) => (
              <div key={title} style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>{title}</div>
                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.7, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Related text tools
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
            {[
              { href: '/tools/case-converter',         label: 'Case Converter',          desc: 'Transform text between camelCase, snake_case, Title Case, UPPERCASE, and more' },
              { href: '/tools/sort-lines',             label: 'Sort Lines',              desc: 'Sort text lines alphabetically, by length, or numerically — forward or reversed' },
              { href: '/tools/duplicate-line-remover', label: 'Duplicate Line Remover',  desc: 'Remove repeated lines from any block of text with optional sorting' },
              { href: '/tools/word-counter',           label: 'Word Counter',            desc: 'Count words, characters, sentences and reading time in any text' },
            ].map(({ href, label, desc }) => (
              <a key={href} href={href} style={{ display: 'block', padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', textDecoration: 'none', transition: 'border-color .13s' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.5 }}>{desc}</div>
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
