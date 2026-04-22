export default function AiCostCalculatorContent() {
  const H2: React.CSSProperties = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 };
  const P: React.CSSProperties  = { fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 };
  const Code = ({ children }: { children: React.ReactNode }) => (
    <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>{children}</code>
  );

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
      <div>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>How LLM API pricing actually works</h2>
          <p style={P}>
            Every commercial LLM API bills the same way: <strong style={{ color: 'var(--ink)' }}>per token, per million</strong>, with a different rate for input and output. There is no per-call fee, no monthly subscription, no minimum commitment on the standard tier — you pay for exactly the tokens you send and receive. This calculator multiplies your token counts by the published rates from OpenAI, Anthropic, Google, and DeepSeek to surface the real-world dollar number for any workload size.
          </p>
          <p style={P}>
            The catch is that real bills are dominated by patterns the per-million-token rate hides. A chatbot that looks cheap on paper at $0.0008 per call becomes $7,200/month at 300k requests/day. A frontier model that costs $0.02 per call sounds harmless until the agent loop calls it 12 times per user task. Budgeting for AI requires plugging the token math into the actual call volume — which is what this tool does in one panel.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>Input vs output: the 3–5× rule</h2>
          <p style={P}>
            Every model on this calculator charges more for output than input. The ratio is consistent across vendors:
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                  {['Model', 'Input $/1M', 'Output $/1M', 'Out:in ratio'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['GPT-5',              '$5.00',  '$20.00', '4×'],
                  ['o1',                 '$15.00', '$60.00', '4×'],
                  ['Claude Opus 4.7',    '$15.00', '$75.00', '5×'],
                  ['Claude Sonnet 4.6',  '$3.00',  '$15.00', '5×'],
                  ['Gemini 2.5 Pro',     '$1.25',  '$10.00', '8×'],
                  ['GPT-4o mini',        '$0.15',  '$0.60',  '4×'],
                  ['Gemini 2.0 Flash',   '$0.10',  '$0.40',  '4×'],
                  ['DeepSeek V3',        '$0.27',  '$1.10',  '4×'],
                ].map(([model, inp, out, ratio], i) => (
                  <tr key={model} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{model}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-2)', whiteSpace: 'nowrap' }}>{inp}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-2)', whiteSpace: 'nowrap' }}>{out}</td>
                    <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--green)', fontFamily: 'JetBrains Mono, monospace' }}>{ratio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ ...P, marginTop: 14, marginBottom: 0 }}>
            Two practical consequences: (1) for chatbots that produce long answers, output dominates the bill — capping <Code>max_tokens</Code> is the highest-leverage cost lever; (2) for RAG and summarization workloads, where you stuff lots of context in and pull a short answer out, input dominates — and prompt caching becomes the highest-leverage lever.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>Prompt caching can cut input cost by 90%</h2>
          <p style={P}>
            All three major providers now support prompt caching: when a long prefix repeats across calls (system prompt, tool definitions, retrieved documents, few-shot examples), the provider stores the precomputed KV cache and bills cached tokens at a steep discount on subsequent calls.
          </p>
          <ul style={{ paddingLeft: 18, margin: '0 0 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Anthropic</strong> — 90% off cached input. Claude Opus drops from $15 to $1.50 per 1M.
            </li>
            <li style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>OpenAI</strong> — 50–90% off cached input depending on model. Automatic on prompts &gt; 1024 tokens.
            </li>
            <li style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Google</strong> — ~75% off cached input on Gemini 2.5 Pro / 2.0 Flash. Explicit cache creation API.
            </li>
          </ul>
          <p style={{ ...P, marginBottom: 0 }}>
            Switch the calculator&apos;s <strong style={{ color: 'var(--ink)' }}>Pricing mode</strong> selector to <em>Prompt cache hit</em> to see the upper-bound savings (assumes 100% of input tokens are cache hits). Real production cache hit rates land between 40–80% — multiply the savings accordingly.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>Batch API: 50% off if you can wait</h2>
          <p style={P}>
            For workloads that don&apos;t need a real-time response, the Batch API gives a flat 50% discount on both input and output across OpenAI, Anthropic, and Google. You submit a JSONL file of requests, the provider returns results within 24 hours.
          </p>
          <p style={P}>
            Good fits: nightly summarization runs, embeddings backfills on historical data, LLM-as-judge evaluation sweeps, content moderation passes, document classification jobs. Bad fits: anything user-facing, agent loops, customer chat, on-call alerts.
          </p>
          <p style={{ ...P, marginBottom: 0 }}>
            Switching the calculator&apos;s <strong style={{ color: 'var(--ink)' }}>Pricing mode</strong> to <em>Batch API</em> applies the discount across both directions. A workflow that costs $20k/month in real-time becomes $10k/month batched — pure margin recovery if you can tolerate the delay.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>Pick the right tier — frontier vs mid vs fast</h2>
          <p style={P}>
            The 30–150× price gap between fast and frontier models is the most important tradeoff in production AI. The fast tier (GPT-4o mini, Claude Haiku 4.5, Gemini 2.0 Flash, DeepSeek V3) is good enough for the vast majority of business workflows: classification, extraction, structured output, customer Q&A on a known knowledge base.
          </p>
          <p style={P}>
            Frontier models (Claude Opus 4.7, o1, GPT-5) earn their cost on hard reasoning: multi-step planning, code generation across files, ambiguous edge cases, novel problem framings. Sending routine work to a frontier model is the most common avoidable cost mistake — a routing layer that picks the model based on task complexity typically cuts spend by 70–90%.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                  {['Tier', 'Best for', 'Avoid for', 'Per-1M output cost range'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Fast',     'Classification, extraction, simple Q&A, embeddings', 'Hard reasoning, code refactoring across files', '$0.40–$5'],
                  ['Mid',      'Most product features, RAG, structured generation', 'Hardest research / planning loops',              '$10–$15'],
                  ['Frontier', 'Agent loops, novel reasoning, codegen on hard bugs', 'High-volume routine work',                       '$20–$75'],
                ].map(([tier, best, avoid, cost], i) => (
                  <tr key={tier} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{tier}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{best}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-3)', fontSize: 13 }}>{avoid}</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--green)', whiteSpace: 'nowrap' }}>{cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>Cost-cutting checklist</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { title: 'Cap max_tokens',           body: 'Output is the expensive direction. A max_tokens of 4000 when 200 would do is a 20× overcharge waiting to happen on long-tail responses. Set per-route caps tight to typical output length × 1.5.' },
              { title: 'Trim system prompts',      body: 'Every call re-sends the system prompt. Cutting 500 tokens of unused boilerplate from a system prompt that runs 10M times/month is a $1,500 saving on Claude Opus, $50 on Haiku.' },
              { title: 'Enable prompt caching',    body: 'Anthropic and OpenAI auto-cache long prefixes if you mark them. A 5k-token RAG context cached at 70% hit rate cuts input cost by ~63% on that workload.' },
              { title: 'Route by complexity',      body: 'Classifier picks fast vs frontier per request. Most queries land on the cheap model; only the hard ones escalate. Typical savings: 70–90% vs always-frontier.' },
              { title: 'Move offline jobs to Batch', body: 'Anything tolerant of 24h latency — embeddings backfills, evals, content audits — runs at 50% off. Real margin uplift, zero quality loss.' },
              { title: 'Summarize history',        body: 'Long chat histories are expensive to keep verbatim. Summarize older turns into a compact running summary; keep the last 4–6 messages full-fidelity.' },
            ].map(({ title, body }, i) => (
              <div key={title} style={{ padding: '14px 16px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>How to read the calculator</h2>
          <p style={P}>
            Pick a workload preset to seed realistic token sizes, or punch in your own numbers from the <a href="/tools/token-counter" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Token Counter</a>. The headline card shows your selected model&apos;s per-month and per-call cost; the comparison table sorts every supported model from cheapest to most expensive and shows the multiplier vs the cheapest option. Click any row to make it the headline. Toggle <strong style={{ color: 'var(--ink)' }}>Pricing mode</strong> to see how prompt caching and Batch API change the picture.
          </p>
          <p style={{ ...P, marginBottom: 0 }}>
            All math runs in your browser — no requests leave your device. Pricing data is a static snapshot dated next to the volume strip; cross-check against the vendor&apos;s console for binding production figures.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>Related tools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: 10 }}>
            {[
              { href: '/tools/token-counter',           title: 'AI Token Counter',       desc: 'Measure exact input + output tokens for any prompt — feed those numbers into this calculator.' },
              { href: '/tools/word-counter',            title: 'Word Counter',           desc: 'Convert character / word counts to a rough token estimate for back-of-envelope math.' },
              { href: '/tools/markdown-editor',         title: 'Markdown Editor',        desc: 'Author and preview structured prompts before measuring their token cost.' },
              { href: '/tools/text-diff',               title: 'Text Diff',              desc: 'A/B-compare two prompt versions to see how rewording changes token count and cost.' },
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
