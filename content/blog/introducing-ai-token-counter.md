---
title: "Introducing the AI Token Counter"
description: "We built a browser-based token counter that uses the actual BPE tokenizer for OpenAI models — so you can see exactly what you're paying for before sending a single API request."
tags: ["new tool", "ai", "openai"]
tools: ["token-counter", "ai-cost-calculator"]
publishedAt: "2026-04-21"
author: "marcus-chen"
---

If you've ever been surprised by an OpenAI API bill, the cause is almost always the same: tokens accumulate faster than you expect, and you don't see the count until after you've paid.

We built the [Token Counter](/tools/token-counter) to fix that feedback loop. It runs the actual `js-tiktoken` BPE tokenizer in the browser — the same tokenizer OpenAI uses — so the count you see is the count you'll be billed for.

## What it does

Paste any text into the input and you instantly see:

- Exact token count for GPT-4o, GPT-4o mini, o1, and other OpenAI models
- Per-token visualization — each token is highlighted in a different color, so you can see where your prompt is "expensive"
- ChatML chat mode — wraps your text in the system/user/assistant template that OpenAI charges for in chat completions
- Rough estimates for Claude, Gemini, and DeepSeek (their tokenizers are proprietary, but we show honest approximations marked with `~`)

## Why it matters

A 500-token system prompt that runs 1 million times per month costs $75 at GPT-4o mini rates. If you can cut it to 200 tokens, that's $45/month saved — without changing a line of application code.

The Token Counter makes that optimization visible. Paste your system prompt, see the count, and start trimming.

It's fully client-side — your prompts never leave the browser.

[Try the Token Counter →](/tools/token-counter)
