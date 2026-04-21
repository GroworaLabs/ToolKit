export default function TokenCounterContent() {
  const H2: React.CSSProperties = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 };
  const P: React.CSSProperties  = { fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 };
  const Code = ({ children }: { children: React.ReactNode }) => (
    <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>{children}</code>
  );

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
      <div>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>What is a token?</h2>
          <p style={P}>
            A <strong style={{ color: 'var(--ink)' }}>token</strong> is the smallest unit that a large language model processes. Before a model can read your prompt or generate a response, the text is split into tokens by a component called a tokenizer. Every piece of text you send to GPT, Claude, Gemini, DeepSeek, or any other LLM is first converted into a sequence of integer token IDs — that is what the model actually computes on.
          </p>
          <p style={P}>
            Modern LLMs use <a href="https://en.wikipedia.org/wiki/Byte_pair_encoding" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Byte-Pair Encoding (BPE)</a> or SentencePiece tokenizers. These algorithms learn a vocabulary of sub-word pieces from training data: common words like <Code>the</Code> or <Code>and</Code> become a single token, while rarer words split into multiple tokens — <Code>tokenization</Code> becomes <Code>token</Code> + <Code>ization</Code>. Numbers, punctuation, and non-Latin scripts often consume more tokens per character than plain English.
          </p>
          <p style={P}>
            A useful mental model: one token is roughly <strong style={{ color: 'var(--ink)' }}>¾ of an English word</strong>, or about <strong style={{ color: 'var(--ink)' }}>4 characters</strong>. But that average hides a lot of variance — which is exactly why it matters to count, not guess.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>Why token counts differ across models</h2>
          <p style={P}>
            Each model family ships with its own tokenizer, trained on a different corpus and tuned for different trade-offs. The same paragraph can tokenize very differently across vendors:
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                  {['Family', 'Tokenizer', 'Vocab size', 'Notes'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['GPT-4o / GPT-5 / o1', 'o200k_base (BPE)', '~200,000', 'Newer OpenAI vocab — stronger on code and multilingual.'],
                  ['GPT-3.5 / GPT-4',      'cl100k_base (BPE)', '~100,000', 'Legacy OpenAI tokenizer; higher token counts on modern content.'],
                  ['Claude 4.x family',    'Claude SentencePiece (proprietary)', '~65,000', 'Anthropic does not publish the tokenizer; counts via API.'],
                  ['Gemini 2.x family',    'Google SentencePiece', '~256,000', 'Very efficient on multilingual; 1 char ≈ 0.25 tokens for English.'],
                  ['DeepSeek V3 / R1',     'DeepSeek BPE',      '~128,000', 'Optimized for Chinese + code; rich multilingual coverage.'],
                ].map(([fam, tok, vocab, note], i) => (
                  <tr key={fam} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{fam}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)' }}>{tok}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-2)', whiteSpace: 'nowrap' }}>{vocab}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-3)', fontSize: 13 }}>{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ ...P, marginTop: 14, marginBottom: 0 }}>
            A 1,000-word English article is about 1,330 tokens in GPT-4o and about 1,400 in Claude Sonnet — a ~5% difference. On Chinese or Cyrillic text, the gap widens dramatically: some tokenizers are 2–3× more efficient than others on non-Latin scripts.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>Chat templates and special tokens</h2>
          <p style={P}>
            When you call the chat completion API, the provider doesn&apos;t just concatenate your messages — it wraps them in a chat template. OpenAI uses the <strong style={{ color: 'var(--ink)' }}>ChatML</strong> format, which injects special control tokens around each message: <Code>&lt;|im_start|&gt;</Code>, role name, newline, content, <Code>&lt;|im_end|&gt;</Code>. Those markers are real tokens that count against your input budget — typically 3–5 per message, plus overhead.
          </p>
          <p style={P}>
            Switch this tool to <strong style={{ color: 'var(--ink)' }}>Chat (ChatML)</strong> mode to see it. The three fields (system, user, assistant) get wrapped into a proper ChatML envelope before tokenization, and the special tokens appear highlighted in red in the visualizer. This is the count the API will actually bill you for — not just the raw content length.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>Why count tokens before sending?</h2>
          <p style={P}>
            Every production-grade LLM integration needs a token budget. There are three reasons to count before you send:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { title: 'Cost estimation',     body: 'API pricing is per token, usually quoted per 1 million tokens input and output separately. A single automated workflow that processes 10,000 support tickets × 4k tokens each is 40M tokens — the difference between GPT-4o and GPT-4o-mini on that workload is thousands of dollars per month.' },
              { title: 'Context-window fit',  body: 'Every model has a hard token ceiling: 128k for GPT-4o, 200k for Claude, 2M for Gemini 2.5 Pro. If your system prompt + chat history + new input exceeds the window, the model rejects the request or silently truncates. Checking before sending prevents mid-pipeline failures.' },
              { title: 'Rate-limit planning', body: 'Providers enforce tokens-per-minute and tokens-per-day limits per account tier. Large batch jobs need to estimate throughput in advance to avoid hitting 429 errors during production runs.' },
            ].map(({ title, body }, i) => (
              <div key={title} style={{ padding: '14px 16px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>Context window limits per model</h2>
          <p style={P}>
            The context window is the maximum number of tokens a model can attend to in a single call — it includes your system prompt, prior messages, new input, <em>and</em> the generated response. Here are the ceilings for current frontier models (as of 2026-04):
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                  {['Model', 'Context window', 'Practical headroom*'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['GPT-5',              '400,000 tokens', '~380k input + 20k output'],
                  ['GPT-4o / GPT-4o mini', '128,000 tokens', '~120k input + 8k output'],
                  ['o1',                 '200,000 tokens', '~180k input + 20k output'],
                  ['Claude Opus 4.7',    '200,000 tokens', '~190k input + 10k output'],
                  ['Claude Sonnet 4.6',  '200,000 tokens', '~190k input + 10k output'],
                  ['Claude Haiku 4.5',   '200,000 tokens', '~196k input + 4k output'],
                  ['Gemini 2.5 Pro',     '2,000,000 tokens', '~1.9M input + 64k output'],
                  ['Gemini 2.0 Flash',   '1,000,000 tokens', '~990k input + 8k output'],
                  ['DeepSeek V3',        '128,000 tokens', '~120k input + 8k output'],
                ].map(([model, ctx, headroom], i) => (
                  <tr key={model} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{model}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-2)', whiteSpace: 'nowrap' }}>{ctx}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-3)', fontSize: 13 }}>{headroom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 10, margin: 0 }}>
            * Practical headroom reserves output tokens. Many providers also cap max_tokens on the response independently of the window.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>Rules of thumb for estimating</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))', gap: 12 }}>
            {[
              { title: 'English prose',          desc: '1 token ≈ 4 characters, or ¾ of a word. 1,000 words ≈ 1,300–1,400 tokens across all modern LLMs.' },
              { title: 'Code',                   desc: '15–25% more tokens per character than prose. Minified JSON is the worst case — roughly 1 token per 2.5 chars.' },
              { title: 'Non-Latin scripts',      desc: 'Chinese, Japanese, Korean, Arabic, Cyrillic: 2–3× more tokens per character than English in most tokenizers.' },
              { title: 'Whitespace',             desc: 'Spaces, newlines, and tabs each consume 1 token in most BPE tokenizers. Excessive indentation costs real money at scale.' },
              { title: 'Numbers',                desc: 'Long numeric sequences often split per 3-digit group. "1,234,567" can be 3–5 tokens depending on the tokenizer.' },
              { title: 'Emojis and Unicode',     desc: 'Non-ASCII characters frequently tokenize per byte (UTF-8), so a single emoji can consume 2–4 tokens.' },
            ].map(({ title, desc }) => (
              <div key={title} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>About this tool&apos;s accuracy</h2>
          <p style={P}>
            For <strong style={{ color: 'var(--ink)' }}>OpenAI models</strong> (GPT-5, GPT-4o, GPT-4o mini, o1), this tool runs the real <Code>tiktoken</Code> BPE tokenizer (<Code>o200k_base</Code> / <Code>cl100k_base</Code>) locally in your browser via <a href="https://github.com/dqbd/tiktoken" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'underline' }}>js-tiktoken</a> — counts are exact, and the visualization on the right shows every token boundary, ID, and special marker. The ranks file lazy-loads on first model use.
          </p>
          <p style={P}>
            For <strong style={{ color: 'var(--ink)' }}>Anthropic</strong>, <strong style={{ color: 'var(--ink)' }}>Google</strong>, and <strong style={{ color: 'var(--ink)' }}>DeepSeek</strong>, the count is an empirical estimate (character-to-token ratio per tokenizer family, with adjustments for code signals, non-ASCII content, and word-length distribution) — typically <strong style={{ color: 'var(--ink)' }}>±5–10%</strong> for English prose and modest code, wider on heavy CJK or minified code. Those vendors don&apos;t publish a client-side tokenizer, so per-token visualization is disabled for them (showing fabricated splits would mislead). For exact counts in production:
          </p>
          <ul style={{ paddingLeft: 18, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>OpenAI:</strong> <a href="https://github.com/openai/tiktoken" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'underline' }}>tiktoken</a> (Python) or <a href="https://github.com/dqbd/tiktoken" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'underline' }}>js-tiktoken</a> (Node/browser)
            </li>
            <li style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Anthropic:</strong> <Code>client.messages.count_tokens()</Code> in the official SDK
            </li>
            <li style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Google:</strong> <Code>model.count_tokens()</Code> in the Vertex AI / Gemini SDK
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>Related tools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: 10 }}>
            {[
              { href: '/tools/word-counter',            title: 'Word Counter',           desc: 'Count words, characters, and sentences — the traditional metric before LLMs.' },
              { href: '/tools/markdown-editor',         title: 'Markdown Editor',        desc: 'Live-preview Markdown — useful when authoring prompts with structured formatting.' },
              { href: '/tools/reading-time-calculator', title: 'Reading Time Calculator',desc: 'Estimate how long humans will take to read the text an LLM just generated.' },
              { href: '/tools/text-diff',               title: 'Text Diff',              desc: 'Compare two prompt versions side-by-side to spot regressions in prompt engineering.' },
            ].map(({ href, title, desc }) => (
              <a key={href} href={href} style={{ display: 'block', padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)', textDecoration: 'none' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55 }}>{desc}</div>
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
