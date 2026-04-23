import { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'How is the comparison data sourced?',
    a: 'Pricing comes from each vendor\'s official pricing page and is stored as constants in this site\'s code. Capability data (vision, tool use, thinking, batch API) comes from the provider\'s API documentation. The "as of" date shown below the tool is when data was last refreshed. Always cross-check the provider\'s current docs before making a production decision — models can be deprecated, capabilities updated, and prices cut without warning.',
  },
  {
    q: 'What does "Frontier" vs "Mid" vs "Fast" mean?',
    a: '"Frontier" models sit at the top of the capability curve — highest benchmark scores, best reasoning, largest context. They also cost the most. "Mid" models offer strong general performance at a significant price reduction, typically within 10–20% of frontier on most benchmarks. "Fast / Cheap" models are optimized for throughput and cost — ideal for classification, extraction, summarization, and high-volume tasks where raw reasoning depth matters less. For most real workloads, a mid-tier model handles 80% of tasks well; escalate to frontier only for the hard 20%.',
  },
  {
    q: 'What is a "reasoning" or "thinking" model?',
    a: 'Reasoning models (OpenAI o-series, DeepSeek R1, Grok 3 mini) internally generate long chains of thought before producing their final answer. They\'re significantly better at multi-step logic, math, and scientific problems, but also considerably slower and more expensive — o3 charges $40/M output tokens vs. $20 for GPT-5. The "Thinking / CoT" capability in this table refers to extended chain-of-thought that the model can optionally reveal. Use reasoning models when accuracy on hard problems matters more than speed or cost.',
  },
  {
    q: 'What is an "open weights" model?',
    a: 'Open-weights models (Meta\'s Llama 4 series, Mistral Small, DeepSeek R1) have their weights publicly released, meaning you can download and run them yourself on your own hardware or cloud infrastructure. This gives you: zero per-token cost at scale, full data privacy (nothing leaves your servers), no rate limits, and the ability to fine-tune on proprietary data. The trade-off is infrastructure cost and engineering overhead. Shown API pricing is from popular providers (Groq, Fireworks, Together) — self-hosting is free beyond compute.',
  },
  {
    q: 'Why is output so much more expensive than input?',
    a: 'Generating tokens requires one full autoregressive forward pass per token, with KV-cache state maintained throughout. Reading input tokens can be parallelized across the whole prompt in a single pass. Providers reflect this in pricing: output is typically 3–8× more expensive than input. For chatbot or agent workloads where output is large, the output rate dominates total cost. For RAG or classification where you send large prompts but get short answers, the input rate matters more.',
  },
  {
    q: 'What is the Batch API and when should I use it?',
    a: 'OpenAI, Anthropic, and Google all offer a Batch API that processes requests asynchronously (within 24 hours) at 50% off standard prices on both input and output. This is ideal for offline workloads: nightly report generation, historical data classification, content moderation runs, A/B prompt evaluation, embeddings backfills. It\'s not suitable for user-facing or real-time tasks. If you have a mixed workload, run live traffic at standard rates and batch your offline tasks — the savings add up quickly at scale.',
  },
  {
    q: 'How do I choose between GPT-5, Claude Opus 4.7, and Gemini 2.5 Pro?',
    a: 'All three are top-tier frontier models. In practice, differences come down to: (1) Context window — Gemini 2.5 Pro\'s 2M token window is in a different league for large document processing. (2) Output pricing — Claude Opus 4.7 charges $75/M output (the highest), so it\'s expensive for verbose tasks. (3) Thinking — all three support CoT/extended thinking. (4) Ecosystem — GPT-5 fits naturally in OpenAI-native stacks; Claude is best-in-class for code in agentic loops; Gemini integrates with Google Workspace and Vertex AI. (5) Price/performance — Gemini 2.5 Pro at $1.25 input is significantly cheaper than the other two for the same capability tier.',
  },
  {
    q: 'What capabilities are not covered in this comparison?',
    a: 'This table covers text/multimodal (vision) inference. It does not cover: audio input/output (GPT-4o audio, Gemini 2.5 audio mode), real-time streaming voice APIs, image generation (DALL-E, Imagen), embeddings models (text-embedding-3, Gecko), code execution (Gemini Code Execution tool), or search/grounding integrations. For a complete picture of what each platform offers, consult the official API documentation. Prices and capabilities for add-on features like web search grounding or interpreter tools are charged separately.',
  },
  {
    q: 'Why does context window size matter?',
    a: 'Context window is the maximum combined length of your input (system prompt + history + user message + tool results) plus the model\'s output. Smaller windows (32K–128K) are fine for most chat and single-document tasks. You hit limits with: long conversations that accumulate history, large codebases fed as context, multi-document RAG retrieval, legal or scientific documents, or long agent traces. Gemini 2.5 Pro\'s 2M window (≈1,500 pages of text) and Llama 4 Scout\'s 10M window are purpose-built for these use cases. Larger context also typically means higher input cost, so don\'t over-provision.',
  },
  {
    q: 'What is vision/multimodal capability?',
    a: 'Vision-capable models can accept images (and in some cases video, audio, PDFs) as part of the input. This enables: document understanding with visual layout, chart/graph analysis, screenshot debugging, product image classification, OCR on complex layouts, and visual question answering. All frontier models and most mid-tier models now support vision. Exceptions in this table are DeepSeek V3/R1 and Mistral models, which are text-only as of April 2026. Vision input is billed separately from text tokens — typically per image tile or resolution bracket.',
  },
  {
    q: 'How do I estimate the actual cost of my workload?',
    a: 'Use the AI API Cost Calculator (linked in the sidebar) to input your expected token counts and call volume. For token counts, measure a representative sample of your actual prompts and responses using the Token Counter — the same text can vary 10–20% in token count across providers due to different vocabularies. Key inputs: (1) average input tokens per call (include system prompt + history + user message), (2) average output tokens per call, (3) calls per day, (4) whether you can use Batch API for offline tasks, (5) whether your prompt prefix is stable enough to benefit from prompt caching.',
  },
  {
    q: 'Are all models available everywhere?',
    a: 'Not necessarily. Some models have geographic restrictions, require enterprise agreements, or have capacity limits. xAI/Grok is available via api.x.ai with an API key. DeepSeek is available via platform.deepseek.com — subject to export controls for some jurisdictions. Open-weights models (Llama 4, Mistral Small, DeepSeek R1) can be accessed via third-party providers (Groq, Fireworks, Together AI, AWS Bedrock, Azure AI) in addition to self-hosting. Always check the provider\'s terms of service and your jurisdiction\'s AI regulations before deploying to production.',
  },
];

export const sidebarFeatures = [
  { label: '19 models across 7 providers', desc: 'OpenAI, Anthropic, Google, xAI, DeepSeek, Meta, Mistral — all major vendors in one view.', color: 'var(--green)', bg: 'var(--green-lt)' },
  { label: 'Cards + Table + Compare',       desc: 'Browse in card grid, switch to sortable table, or select 2–3 models for side-by-side breakdown.', color: 'var(--blue)',  bg: 'var(--blue-lt)' },
  { label: 'Capabilities at a glance',      desc: 'Vision, tool use, thinking/CoT, batch API, fine-tuning, open weights — all in one place.',          color: 'var(--amber)', bg: 'var(--amber-lt)' },
  { label: 'Filter & sort',                 desc: 'Filter by tier (Frontier / Mid / Fast), reasoning models, or open-weights. Sort by price or context.', color: 'var(--ink-2)', bg: 'var(--border)' },
];
