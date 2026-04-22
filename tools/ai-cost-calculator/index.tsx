import { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'Is anything I type sent to a server?',
    a: 'No. The calculator does pure arithmetic on the token counts and per-million-token rates you see on the page — there is no inference, no API call, and no telemetry. Open DevTools → Network and you will see zero outbound requests while you change the inputs. Safe to use with confidential workload sizes and internal volume estimates.',
  },
  {
    q: 'How is the per-call cost computed?',
    a: '(input_tokens / 1,000,000 × input_rate) + (output_tokens / 1,000,000 × output_rate). Input and output are billed at different rates — output is almost always 3–5× more expensive per token than input. Monthly cost multiplies the per-call number by calls_per_day × 30. Switching pricing mode swaps the rates: Standard uses list prices, Prompt cache hit uses the cached-input rate (where the provider supports it), and Batch API uses the 50%-off rate available from OpenAI, Anthropic, and Google for non-real-time workloads.',
  },
  {
    q: 'Where does the pricing data come from?',
    a: 'The rates come from each vendor\'s official pricing page (OpenAI Platform, Anthropic Pricing, Google Vertex AI / AI Studio, DeepSeek Open Platform) and are stored as a flat constant per model in this site\'s code. The "as of" date shown next to the volume strip is when the table was last refreshed. If a vendor adjusts pricing between releases, the calculator may briefly lag — always cross-check against the vendor\'s console for binding numbers.',
  },
  {
    q: 'Why is output so much more expensive than input?',
    a: 'Generating tokens is more compute-intensive than reading them. For input, the model runs a single forward pass over the prompt (highly parallelizable, batched across requests). For output, the model runs one autoregressive step per token, with KV-cache state and sampling — each token needs a fresh forward pass. Providers reflect this in pricing: GPT-5 charges 4× more for output than input, Claude Opus charges 5×, DeepSeek charges 4×. The output:input ratio is the single biggest driver of cost for chatbot-style workloads.',
  },
  {
    q: 'What does Prompt cache hit mode actually save?',
    a: 'When a long prefix of your prompt repeats across calls — system prompt, few-shot examples, tool definitions, retrieved documents — the provider can store the KV cache and skip recomputation. Anthropic gives a 90% discount on cached input (Claude Opus 4.7 drops from $15 to $1.50 per 1M input tokens). OpenAI gives 50–90% on cached prefixes. Google Gemini gives ~75%. The mode in this calculator assumes 100% of the input is cached, which is the upper bound — real cache hit rates are 40–80% for production workloads, so divide the savings by your real hit rate.',
  },
  {
    q: 'When should I use the Batch API instead?',
    a: 'The Batch API is 50% cheaper on both input and output across OpenAI, Anthropic, and Google. The trade-off: results return within 24 hours instead of seconds. Good fits: nightly summarization, embeddings backfills, A/B prompt evaluation, classification of historical documents, content moderation passes. Bad fits: anything user-facing, agent loops, real-time chat. For mixed workloads, run the live tier on the Standard rate and the offline tier on Batch — the calculator lets you compute each separately.',
  },
  {
    q: 'How do I estimate my actual input and output token counts?',
    a: 'Use our Token Counter to measure a representative sample of your real prompts (system + few-shot + user message) and a typical model response. Average across 5–10 examples to smooth variance. For the input field, include the entire prompt the API will see, not just the user\'s message — system prompts and history can be 10× larger than the user input. For output, look at your actual completions, not your max_tokens cap.',
  },
  {
    q: 'Are tokens the same across providers?',
    a: 'No, and that matters. The same English paragraph might be 250 tokens in GPT-4o, 270 in Claude, and 220 in Gemini 2.5 — Gemini\'s 256k-token vocabulary tokenizes English very efficiently, while Claude\'s smaller vocab fragments more. On code or non-Latin scripts (Chinese, Cyrillic, Arabic), the gap can hit 2–3×. So a "cheaper per-million-token" model isn\'t automatically cheaper for your workload — measure on your actual inputs. The calculator uses your token counts as-is; it does not auto-translate between tokenizers.',
  },
  {
    q: 'Does this include image, audio, or vision tokens?',
    a: 'No — the calculator covers text-only inference. Vision and audio inputs are billed at different per-token rates that vary by image resolution and audio length. For workloads with multimodal content, compute the text portion here and add the multimodal cost from the vendor\'s pricing page separately. As of 2026-04, GPT-4o images cost ~$0.001875 per low-detail tile, Claude images cost ~$4.80 per 1k images, Gemini audio costs $0.10 per minute on the Pro tier.',
  },
  {
    q: 'Why is the same workload sometimes 100× more expensive on a frontier model?',
    a: 'Frontier models (Claude Opus 4.7, o1, GPT-5) sit at the top of the price curve because they target hard reasoning tasks where the value per call justifies the cost. For routine work — classification, extraction, summarization, customer Q&A — a fast-tier model (GPT-4o mini, Claude Haiku 4.5, Gemini 2.0 Flash) is typically 50–150× cheaper and benchmarks within a few points. The right strategy for cost-sensitive products is to route by complexity: cheap model first, escalate to frontier only when the cheap model fails a confidence check.',
  },
  {
    q: 'Why does my real bill differ from the estimate?',
    a: 'Common reasons: (1) you forgot to include system prompt and history tokens, which dominate input volume; (2) cache hit rate is lower than 100% in production; (3) max_tokens cap was higher than typical output, inflating worst-case cost; (4) request retries on 5xx errors double-charge; (5) tool-calling round-trips multiply per-conversation calls; (6) some providers charge minimum-call fees on small batches. Treat the calculator as an order-of-magnitude planning tool — track real spend in the provider dashboard for binding numbers.',
  },
  {
    q: 'How do I budget for an unpredictable workload?',
    a: 'Calculate three scenarios — pessimistic (worst-case input + max output + zero cache hits + Standard mode), expected (median observed values + 60% cache hit rate), and optimistic (small inputs + Batch API + 80% cache hits). Set your monthly budget cap at 1.5× the expected number. Wire spend alerts at 50% / 80% / 100% in your provider dashboard. For products with viral risk, add a per-user daily cap so a single bad actor cannot drain your budget overnight.',
  },
];

export const sidebarFeatures = [
  { label: 'All major LLMs',          desc: 'GPT-5/4o/o1, Claude Opus/Sonnet/Haiku 4.x, Gemini 2.5/2.0, DeepSeek V3 — sorted cheapest first.', color: 'var(--green)', bg: 'var(--green-lt)' },
  { label: 'Per-call & monthly',      desc: 'Enter calls/day; see real-world recurring spend, not just per-1M-token list rates.',                color: 'var(--blue)',  bg: 'var(--blue-lt)'  },
  { label: 'Cache + Batch modes',     desc: 'Toggle prompt-cache hit pricing and Batch-API 50%-off pricing to model real production economics.',  color: 'var(--amber)', bg: 'var(--amber-lt)' },
  { label: 'Workload presets',        desc: 'Chatbot, summarizer, RAG, codegen, batch, agent — each with realistic token + traffic shapes.',      color: 'var(--ink-2)', bg: 'var(--border)'   },
];
