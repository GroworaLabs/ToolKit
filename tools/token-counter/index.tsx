import { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'Is my prompt sent anywhere when I use this tool?',
    a: 'No. The token count is computed entirely in your browser using local JavaScript — your prompt is never transmitted to any server, logged, or stored. Feel free to paste proprietary prompts, system messages, or sensitive data. You can verify by opening DevTools → Network tab and confirming zero network requests while counting.',
  },
  {
    q: 'How accurate is the token count?',
    a: 'For OpenAI models (GPT-5, GPT-4o, GPT-4o mini, o1), the count is exact — we run the real tiktoken library (o200k_base / cl100k_base) locally in your browser, so the per-token visualization matches what OpenAI\'s API would produce. For Anthropic, Google, and DeepSeek, counts are empirical estimates (±5–10% for English prose, wider for code and non-Latin scripts) because those vendors don\'t publish a client-side tokenizer. For production cost estimates on Claude/Gemini, call each vendor\'s token-counting endpoint.',
  },
  {
    q: 'Why can I see tokens highlighted for OpenAI models but not others?',
    a: 'The visualizer runs the real BPE tokenizer in your browser — it needs the model\'s vocabulary ranks file. OpenAI open-sourced theirs via tiktoken, so we can show you exactly how GPT splits your text into tokens with colored boundaries, IDs, and special-token markers. Anthropic and Google keep their tokenizers closed — for those, we fall back to an empirical byte-ratio estimate and don\'t draw per-token boundaries (showing made-up splits would be misleading).',
  },
  {
    q: 'What does Chat (ChatML) mode do?',
    a: 'In a real chat completion call, the provider wraps your messages with role tokens before feeding them to the model — OpenAI uses the ChatML format with <|im_start|>system, <|im_start|>user, <|im_end|> markers. Each of those control markers costs tokens (~3–5 per message) on top of your content. Chat mode composes your system/user/assistant fields into the ChatML envelope and tokenizes that, so the count matches what the API actually bills. The red highlights mark special tokens.',
  },
  {
    q: 'Why do different models give different token counts for the same text?',
    a: 'Each model family uses its own tokenizer with its own vocabulary. GPT-4o uses BPE with a 200k-token vocabulary (o200k_base), GPT-3.5/4 uses a 100k-token vocabulary (cl100k_base), Claude uses a proprietary SentencePiece-based tokenizer, and Gemini uses yet another variant. The same word might be one token in GPT-4o and two in an older tokenizer — especially for non-English text, code, and rare words.',
  },
  {
    q: 'How many tokens is 1,000 words?',
    a: 'For English prose, 1,000 words is roughly 1,300–1,400 tokens across most models (GPT-4o: ~1,330 • Claude: ~1,400 • Gemini: ~1,300). Technical writing runs higher, around 1,400–1,600 tokens per 1,000 words because code, punctuation, and technical terms split into more sub-tokens.',
  },
  {
    q: 'How many tokens is 1 MB of text?',
    a: 'A 1 MB plain-text file (about 1,000,000 characters of English) is roughly 250,000–290,000 tokens. Code-heavy files skew toward the higher end because curly braces, operators, and identifiers fragment into multiple tokens. This matters for context-window planning — a 1 MB log file exceeds GPT-4o\'s 128k window but fits comfortably in Gemini 2.5 Pro\'s 2M window.',
  },
  {
    q: 'What is a "token" exactly?',
    a: 'A token is the smallest unit a language model processes. Modern tokenizers use subword BPE (Byte-Pair Encoding), which splits text into pieces that are common across the training data: frequent words become single tokens ("the", "and"), rare words split into multiple tokens ("tokenization" → "token" + "ization"), and non-Latin characters often split per byte. One token is roughly ¾ of an English word on average.',
  },
  {
    q: 'Why does code use more tokens than English?',
    a: 'Programming languages are punctuation-heavy and full of identifiers that are rare in natural-language training data. Curly braces, semicolons, angle brackets, and camelCase names fragment into many sub-tokens. Expect 15–25% more tokens per character for typical source code vs English prose. JSON and minified code are the worst offenders — they can hit 1 token per 2.5–3 characters.',
  },
  {
    q: 'Why does non-English text cost more tokens?',
    a: 'Most LLM tokenizers are trained predominantly on English. Languages that share Latin script (Spanish, French, German) tokenize efficiently. Languages with different scripts — Cyrillic, Greek, Arabic, Chinese, Japanese, Korean — often tokenize per byte or per character, which multiplies token counts 2–3×. This is why a 1,000-character Chinese prompt can consume more tokens than a 4,000-character English prompt.',
  },
  {
    q: 'Does the context window include both input and output tokens?',
    a: 'Yes. The context window is the total: your system prompt + conversation history + new input + model output all compete for the same budget. If GPT-4o has a 128k context window and your history is already 120k tokens, the model can only generate 8k tokens before hitting the ceiling. Always reserve headroom for the response — typically 4k–16k tokens depending on use case.',
  },
  {
    q: 'How do I reduce the token count of a prompt?',
    a: 'The biggest wins: (1) remove few-shot examples you no longer need, (2) summarize long conversation history rather than resending it verbatim, (3) strip Markdown formatting from system prompts if the model doesn\'t need it, (4) use abbreviations in system prompts where clarity allows, (5) move static context to prompt caching (Anthropic) or the OpenAI Batch API for 50–90% cost savings on repeated prefixes.',
  },
];

export const sidebarFeatures = [
  { label: 'Real tiktoken',           desc: 'Exact per-token counts for GPT-5/4o/o1 via tiktoken running in your browser.', color: 'var(--green)', bg: 'var(--green-lt)' },
  { label: 'Visual tokenizer',        desc: 'See how GPT splits your prompt — colored boundaries, IDs, special tokens.',   color: 'var(--blue)',  bg: 'var(--blue-lt)'  },
  { label: 'Chat template mode',      desc: 'Wrap system/user/assistant with ChatML and count the real billed tokens.',    color: 'var(--amber)', bg: 'var(--amber-lt)' },
  { label: 'All major LLMs',          desc: 'Claude 4.x, Gemini 2.5/2.0, DeepSeek with estimates + context-window bars.',   color: 'var(--ink-2)', bg: 'var(--border)'   },
];
