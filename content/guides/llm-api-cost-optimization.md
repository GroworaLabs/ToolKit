---
title: "LLM API Cost Optimization: A Developer's Guide to Token Pricing"
description: "OpenAI, Anthropic, and Google charge per token — and the difference between a thoughtful prompt and a careless one can be 10× in cost. This guide covers token counting, pricing models, and the optimization strategies that actually move the needle."
category: "AI"
tools: ["token-counter", "ai-cost-calculator", "ai-model-comparison"]
tags: ["llm", "ai", "openai", "cost optimization", "tokens", "api", "anthropic", "claude", "gemini"]
publishedAt: "2026-05-22"
author: "marcus-chen"
---

Running a production LLM application is not like running a database. There is no fixed infrastructure cost — every call is billed, and the bill is determined by how many tokens flow through the model. A chatbot that averages 2 000 tokens per conversation at $0.15/1M tokens costs almost nothing at 100 users/day. The same chatbot at 50 000 users/day with a context window that silently balloons to 8 000 tokens per call costs $36 000/month.

The developers who avoid surprise bills are not the ones who chose the cheapest model — they are the ones who understood their token usage before scaling. This guide covers how token pricing works, how to count tokens before you send a request, and the concrete optimizations that reduce cost without degrading quality.

---

## How Token Pricing Works

LLM APIs charge separately for input tokens (the prompt you send) and output tokens (the response the model generates). These are priced differently because generation is computationally more expensive than processing.

A rough reference across major providers (prices change — verify current rates):

| Model | Input ($/1M) | Output ($/1M) | Context |
|---|---|---|---|
| GPT-4o | $2.50 | $10.00 | 128K |
| GPT-4o mini | $0.15 | $0.60 | 128K |
| Claude Sonnet 4 | $3.00 | $15.00 | 200K |
| Claude Haiku 4 | $0.80 | $4.00 | 200K |
| Gemini 2.5 Pro | $1.25–$2.50 | $10.00–$15.00 | 1M |
| Gemini 2.5 Flash | $0.15–$0.30 | $0.60 | 1M |

The output/input price ratio is typically 3–5×. This means reducing output length matters more per-token than reducing input length — but input tokens are usually far more numerous in real applications (system prompts, conversation history, retrieved documents), so input reduction often has greater absolute impact.

Use the [AI Cost Calculator](/tools/ai-cost-calculator) to compute your monthly spend across models with your specific token usage and call volume before you commit to a model choice.

---

## What Is a Token?

Tokens are not words or characters — they are the chunks a model's tokenizer splits text into. Roughly:

- 1 token ≈ 4 characters in English
- 1 token ≈ 0.75 words in English
- 100 tokens ≈ 75 words ≈ one short paragraph

But this breaks down significantly for non-English text, code, and special characters:

```
"Hello world"           → 2 tokens
"Hello, world!"         → 4 tokens
"Привіт, світ!"         → 10 tokens  (Ukrainian — CJK and Cyrillic tokenize less efficiently)
"SELECT * FROM users"   → 5 tokens
"{"key": "value"}"      → 7 tokens
"<|endoftext|>"         → 1 token    (special token — a single unit)
```

The tokenizer is model-specific. GPT-4o uses `cl100k_base`. GPT-4o-mini uses `o200k_base`. Claude uses a different tokenizer entirely, and Gemini uses yet another. A prompt that is 1 000 tokens for GPT-4o might be 900 or 1 100 tokens for Claude.

Use the [Token Counter](/tools/token-counter) to count tokens for any text with the exact tokenizer for your model — this is the only accurate way to predict API costs before sending a request.

---

## Understanding Your Token Usage

Before optimizing, measure. Three numbers matter:

1. **Average input tokens per call** — driven by system prompt + conversation history + retrieved context
2. **Average output tokens per call** — driven by task type (classification = 1 token, essay = 2000 tokens)
3. **Calls per day** — multiply by (1) and (2) to get daily token volume

Most APIs report token usage in their response objects:

```javascript
// OpenAI response
const response = await openai.chat.completions.create({ ... });
console.log(response.usage);
// {
//   prompt_tokens: 1847,      ← input
//   completion_tokens: 312,   ← output
//   total_tokens: 2159
// }
```

```python
# Anthropic response
response = anthropic.messages.create(...)
print(response.usage)
# Usage(input_tokens=1847, output_tokens=312)
```

Log these numbers for every call in production. Aggregate them daily. Token usage patterns change as your prompts evolve, your user base grows, and conversations get longer. Without logging, you will not notice a 3× increase until the billing alert fires.

---

## Optimization Strategy 1: Right-size Your Model

The single highest-leverage decision is which model you use. A task that a small model handles well costs 10–50× less than running it on a frontier model.

**Framework for model selection:**

1. **What is the task?** Classify emails → small model. Write a 5 000-word technical specification → frontier model.
2. **What is the failure mode?** A wrong classification is logged and reviewed. A wrong medical summary goes to a doctor. Scale model capability to failure consequence.
3. **What is the quality floor?** Run 50 representative examples through a small model. If 45+ pass your quality bar, use the small model.

**Common mapping:**

| Task | Recommended tier |
|---|---|
| Classification (sentiment, category, yes/no) | Small (Haiku, GPT-4o mini, Gemini Flash) |
| Extraction (structured data from text) | Small–Mid |
| Summarisation (short documents) | Small–Mid |
| Summarisation (long/complex documents) | Mid (Sonnet, GPT-4o) |
| Code generation (boilerplate, CRUD) | Mid |
| Code review / architecture / reasoning | Frontier (Opus, GPT-4o, Gemini Pro) |
| Creative writing | Mid–Frontier |
| Complex multi-step reasoning | Frontier |

Use the [AI Model Comparison](/tools/ai-model-comparison) to compare capability and pricing across providers side-by-side when making this decision.

---

## Optimization Strategy 2: Control Context Window Growth

The most common source of runaway costs is conversation history that grows without limit. Every message in the history is re-sent as input on every turn.

**The math:** a chatbot with a 100-token system prompt and 20-message conversation where each message averages 150 tokens sends:

```
Turn 1:  100 + 150 = 250 tokens input
Turn 5:  100 + (5 × 150) = 850 tokens input
Turn 10: 100 + (10 × 150) = 1,600 tokens input
Turn 20: 100 + (20 × 150) = 3,100 tokens input
```

Average across 20 turns: ~1,675 tokens/turn. Compare to a naive implementation that sends the full history: the 20th turn costs 12× what the 1st turn cost.

**Strategies:**

**Sliding window** — keep only the last N messages. Simple, cheap to implement. Loses context after N messages.

```javascript
const MAX_MESSAGES = 10;
const messages = conversationHistory.slice(-MAX_MESSAGES);
```

**Token budget** — keep messages until the token count would exceed a limit:

```javascript
const TOKEN_BUDGET = 2000;
let tokenCount = systemPromptTokens;
const messages = [];
for (const msg of conversationHistory.slice().reverse()) {
  const msgTokens = countTokens(msg.content);
  if (tokenCount + msgTokens > TOKEN_BUDGET) break;
  messages.unshift(msg);
  tokenCount += msgTokens;
}
```

**Summarisation** — when history grows long, compress it with a cheap model call:

```javascript
// When history exceeds 3000 tokens, summarise the oldest half
if (historyTokens > 3000) {
  const toSummarise = conversationHistory.slice(0, -4);
  const summary = await callModel({
    model: 'gpt-4o-mini',  // cheap model for summarisation
    messages: [
      { role: 'system', content: 'Summarise this conversation in 150 words.' },
      ...toSummarise,
    ],
    max_tokens: 200,
  });
  conversationHistory = [
    { role: 'assistant', content: `[Previous context: ${summary}]` },
    ...conversationHistory.slice(-4),
  ];
}
```

---

## Optimization Strategy 3: Trim Your System Prompt

System prompts run on every call. A 2 000-token system prompt at 1 million calls/month costs $300/month on GPT-4o mini — before any user input.

**Audit your system prompt:**

1. Copy it to the [Token Counter](/tools/token-counter) — see exactly how many tokens it uses
2. Remove filler phrases: "You are a helpful, friendly, and professional assistant who..." → "You are a technical support assistant."
3. Remove obvious instructions: "Do not make up information" is implied by good models
4. Use bullet points instead of prose — they tokenize more efficiently
5. Move static reference data (product lists, FAQ tables) to a retrieval system instead of embedding in the prompt

**Before (347 tokens):**
```
You are a helpful customer service assistant for Acme Corporation. 
You should always be friendly, professional, and helpful. When a 
customer asks you something, try your best to answer it. If you 
don't know the answer, don't make things up — instead, tell the 
customer that you'll need to check with the team. Remember to 
always be polite and use the customer's name when you know it.
Here is a list of our products and their prices: ...
```

**After (41 tokens):**
```
Customer service assistant for Acme Corp. Be concise. If unsure, say you'll check with the team.
```

The difference: 306 tokens per call. At 100K calls/day on GPT-4o mini: $4.59/day saved, $1,650/year.

---

## Optimization Strategy 4: Set `max_tokens` on Every Call

If you do not set `max_tokens`, the model generates until it stops naturally or hits the context limit. For a task that needs a 100-token answer, failing to set `max_tokens: 150` might occasionally produce a 1 500-token answer for the same cost as 15 calls.

```javascript
// Wrong — model generates as much as it wants
const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [...],
});

// Correct — cap output at a reasonable maximum for this task
const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [...],
  max_tokens: 500,  // for a task that needs ~200 tokens
});
```

Set `max_tokens` conservatively — low enough to prevent runaway outputs, high enough not to truncate valid responses. Monitor your `finish_reason`: if it is frequently `length` instead of `stop`, you are truncating too aggressively.

---

## Optimization Strategy 5: Use Structured Output for Extraction

When extracting structured data, use JSON mode or tool/function calling instead of asking the model to format it in prose and then parsing it.

**Prose extraction (expensive):**
```
Prompt: "Extract the name, email, and company from this email. Format your response as:
Name: ...
Email: ...
Company: ..."

Response: "Based on the email provided, here are the extracted details:
Name: John Smith
Email: john@acme.com
Company: Acme Corporation"
```

**JSON mode (cheap):**
```json
// System: "Extract contact info as JSON"
// Response:
{
  "name": "John Smith",
  "email": "john@acme.com",
  "company": "Acme Corporation"
}
```

JSON mode cuts output tokens by 50–80% for extraction tasks and eliminates the post-processing step. Most APIs support it natively:

```javascript
// OpenAI
const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [...],
  response_format: { type: 'json_object' },
});

// Anthropic
const response = await anthropic.messages.create({
  model: 'claude-haiku-4-5',
  messages: [...],
  // Instruct in system prompt: "Respond only with valid JSON."
});
```

---

## Optimization Strategy 6: Prompt Caching

Anthropic (Claude) and OpenAI both offer prompt caching — repeated identical prefix content is charged at a lower rate or cached for free on subsequent calls.

**Anthropic cache pricing:** cached input tokens cost $0.30/1M (vs $3.00/1M standard for Claude Sonnet) — a 90% discount on the cached portion.

```python
# Anthropic — mark large static content for caching
response = anthropic.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    system=[
        {
            "type": "text",
            "text": system_prompt,
            "cache_control": {"type": "ephemeral"}  # cache this block
        }
    ],
    messages=user_messages,
)
# First call: normal price
# Subsequent calls with same system prompt: 90% cheaper on that content
```

**When caching is worth it:** static content larger than 1 024 tokens (Anthropic's minimum) that repeats across many calls — system prompts, RAG knowledge bases, few-shot examples, long tool definitions.

---

## Optimization Strategy 7: Batch Processing

Both OpenAI and Anthropic offer batch APIs with 50% discount in exchange for async delivery (results within 24 hours):

```javascript
// OpenAI Batch API
const batch = await openai.batches.create({
  input_file_id: uploadedFileId,
  endpoint: '/v1/chat/completions',
  completion_window: '24h',
});
```

Use batch for: document classification, bulk summarisation, data enrichment, nightly processing pipelines, generating embeddings. Avoid batch for: interactive user-facing features, anything that needs a response in under 30 seconds.

---

## Building Cost Visibility

Without cost monitoring, you cannot optimize. Minimum viable monitoring:

```javascript
// Log token usage and cost for every call
async function callLLM(params) {
  const response = await openai.chat.completions.create(params);
  const { prompt_tokens, completion_tokens } = response.usage;

  const INPUT_PRICE = 0.15 / 1_000_000;   // GPT-4o-mini
  const OUTPUT_PRICE = 0.60 / 1_000_000;

  const cost = (prompt_tokens * INPUT_PRICE) + (completion_tokens * OUTPUT_PRICE);

  logger.info({
    model: params.model,
    prompt_tokens,
    completion_tokens,
    cost_usd: cost.toFixed(6),
    feature: params._feature,  // pass context from caller
  });

  return response;
}
```

Aggregate daily by feature. Set billing alerts in your provider console at 50% and 90% of your monthly budget. Review weekly — token usage drifts as prompts evolve and user behaviour changes.

Use the [AI Cost Calculator](/tools/ai-cost-calculator) to model different scenarios — for example, what happens to your monthly bill if average conversation length grows from 10 messages to 20, or if you migrate from GPT-4o to GPT-4o mini for a subset of tasks.
