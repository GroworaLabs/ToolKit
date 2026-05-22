---
title: "Writing AI Agent System Prompts and Rules Files: A Practical Guide"
description: "The system prompt is the most important input you give an AI agent — it defines identity, constraints, output format, and failure behaviour. This guide covers how to write system prompts and agent rules files that produce consistent, reliable behaviour."
category: "AI"
tools: ["agent-rules-generator"]
tags: ["ai", "llm", "system prompt", "claude", "gpt", "agent", "prompt engineering", "cursorrules", "claude.md"]
publishedAt: "2026-05-22"
author: "marcus-chen"
---

The gap between a capable AI model and a reliable AI agent is almost entirely in the system prompt. The same model that gives inconsistent, off-topic, or overly verbose responses with a weak prompt gives precise, consistent, production-grade output with a well-crafted one.

Writing system prompts and agent rules files is a skill with learnable patterns. This guide covers those patterns — for standalone agents, for coding assistants configured via `CLAUDE.md` or `.cursorrules`, and for API-integrated AI features.

---

## What a System Prompt Does

A system prompt is a privileged set of instructions processed before any user input. It establishes:

- **Identity and role**: who the agent is, what it is for
- **Scope**: what it should and should not handle
- **Output format and constraints**: length, structure, style
- **Failure behaviour**: how to handle edge cases, out-of-scope questions, ambiguity
- **Context**: background knowledge the model needs that users should not have to repeat

A well-written system prompt reduces the variance in model output. Without it, an LLM responds to the same input differently on every run, adapts its style to the user's tone, and fills gaps in instruction with assumptions. With a precise system prompt, the same model behaves like a specialist: consistent role, consistent format, consistent boundaries.

---

## Anatomy of a System Prompt

### 1. Role definition (2–4 sentences)

The role statement answers: "who are you?" Keep it concise and specific. Vague roles produce vague behaviour.

```
Weak:
You are a helpful AI assistant.

Strong:
You are a technical support agent for Acme SaaS. You answer questions about API 
integration, billing, and account settings. You do not provide legal or financial 
advice, and you do not have access to customer account data.
```

Specificity in the role statement reduces hallucination about capabilities ("I can check your account...") and focuses the model on the right knowledge domain.

### 2. Scope (what to handle, what not to handle)

Define boundaries explicitly. Models fill undefined boundaries with assumptions — usually too permissive assumptions.

```
Handle:
- Questions about Acme API authentication (OAuth 2.0, API keys)
- Webhook configuration and troubleshooting
- Billing plan details and upgrade paths
- Common integration errors and solutions

Do not handle:
- Account-specific data or user records (you do not have access)
- Legal questions about our terms of service
- Questions unrelated to Acme products — redirect to appropriate resources
- Competitors' products — decline to compare
```

### 3. Output format and length

Specify exactly what the output should look like:

```
Format:
- Respond in plain text unless the user asks for code — then use code blocks with 
  language tags
- Keep responses under 300 words for simple questions; up to 800 words for 
  technical explanations
- Use numbered steps for procedures, bullet points for lists of options
- Do not use headers or markdown in chat responses (the UI does not render it)
```

### 4. Tone and persona

```
Tone:
- Professional and direct, not casual
- Acknowledge errors or limitations without excessive apology
- Do not use filler phrases ("Great question!", "Certainly!", "Of course!")
- Use the user's name if they have provided it, otherwise do not assume
```

### 5. Handling ambiguity and edge cases

```
When the question is ambiguous:
- Ask one clarifying question before answering, not multiple at once
- If you can answer two plausible interpretations briefly, answer both

When you do not know the answer:
- Say so explicitly: "I don't have information about that specific case."
- Suggest the next step: "You can find this in our documentation at docs.acme.com
  or contact support@acme.com for account-specific help."
- Never fabricate information about our products or policies
```

---

## System Prompt Patterns That Work

### Pattern 1: Persona + scope + format + constraints

```
You are [ROLE] for [PRODUCT/CONTEXT]. You help [TARGET USER] with [SCOPE].

Your responses should be [FORMAT]. Keep them [LENGTH].

You do not [EXCLUSION 1], [EXCLUSION 2].

When [EDGE CASE], [EXPECTED BEHAVIOUR].
```

### Pattern 2: Structured sections

For complex agents, use explicit section headers in the prompt:

```
## Role
You are a code review assistant specialising in Python security vulnerabilities.

## What you review
- Authentication and authorisation code
- Input validation and sanitisation
- Database query construction
- Secret and credential handling
- Dependency usage

## What you do not review
- Code style and formatting (defer to linters)
- Performance optimisation unless a security implication exists
- Business logic correctness

## Output format
For each issue found:
1. File and line number (if provided)
2. Severity: Critical / High / Medium / Low
3. What the vulnerability is
4. A corrected code example
5. Why it matters

## If no issues found
State "No security issues found in this review" and note what was checked.
```

### Pattern 3: Few-shot examples in the system prompt

For consistent output format, include examples:

```
Format your responses exactly as shown in these examples:

User: What is the OAuth redirect URI for local development?
Assistant: For local development, use `http://localhost:3000/auth/callback`. 
This is a non-routable address that Acme's OAuth server allows only for 
development environments. Do not use this in production.

User: My webhooks aren't firing.
Assistant: Check these in order:
1. Confirm the endpoint URL is publicly reachable (Acme cannot reach localhost)
2. Verify the webhook secret matches what you configured in the dashboard
3. Check the webhook delivery log at Settings → Webhooks → Recent deliveries
4. If deliveries show, check your server logs for the specific error
```

---

## Coding Agent Rules Files

When configuring AI coding assistants — Claude Code (`CLAUDE.md`), Cursor (`.cursorrules`), Windsurf (`.windsurfrules`), or Codex (`AGENTS.md`) — the rules file serves the same purpose as a system prompt but is project-specific and lives in the repository.

### What belongs in a rules file

**Project-specific conventions:**

```markdown
## Conventions
- TypeScript strict mode is enabled — no implicit `any`
- Use named exports, not default exports
- CSS-in-JS via CSS Modules — do not use Tailwind or styled-components
- All async functions use try/catch — no unhandled promise rejections
- Use `const` over `let`; avoid `var`
```

**Architectural constraints:**

```markdown
## Architecture
- Pages are in `pages/` (Next.js pages router — not App Router)
- Shared components go in `components/ui/`
- Tool-specific components go in `components/tools/<tool-name>/`
- No business logic in components — extract to `lib/`
- Database access only in `lib/db/` — never in components or pages
```

**Commands to run:**

```markdown
## Development
- Dev server: `npm run dev`
- Type check: `npm run type-check`
- Tests: `npm run test`
- Build: `npm run build` — run before committing
```

**What not to do (equally important):**

```markdown
## Do not
- Do not add `console.log` statements to committed code
- Do not modify `lib/registry.ts` without updating `TOOLS_PLAN.md`
- Do not use `any` type — use `unknown` and narrow
- Do not add new npm dependencies without discussing first
- Do not use `!important` in CSS
```

### What does not belong in a rules file

- Code patterns that are already in the codebase (the agent can read them)
- Obvious best practices that apply everywhere ("write clean code")
- Git history context — the agent can read `git log`
- Architecture already documented in README or inline code comments

Use the [Agent Rules Generator](/tools/agent-rules-generator) to build a structured rules file from your project's specifics — it generates `CLAUDE.md`, `.cursorrules`, `.windsurfrules`, `AGENTS.md`, and `.clinerules` from a single form, so you do not have to maintain separate files per tool.

---

## Debugging System Prompts

When an agent produces unexpected output, the systematic debug approach:

### Step 1: Identify the failure mode

- **Wrong information**: is the model hallucinating, or is the correct information missing from the prompt?
- **Wrong format**: is the format constraint clear enough, with an example?
- **Out-of-scope response**: did you define the scope explicitly, or did you assume the model would infer it?
- **Inconsistent behaviour**: the model may be interpreting an ambiguous instruction in multiple valid ways

### Step 2: Isolate the instruction

Comment out sections of the system prompt to find which instruction is being ignored or misapplied. Models do not follow instructions in conflict — they choose one. If two instructions conflict, the model picks the one it weighs more heavily (often the later one, often the more specific one).

### Step 3: Rewrite with specificity

Replace vague instructions with specific ones:

```
Vague:
Keep your responses concise.

Specific:
Keep your responses under 200 words for factual questions.
For technical explanations with code examples, keep total response under 600 words.
```

### Step 4: Add a counterexample

If the model keeps doing something wrong, explicitly address it:

```
Do not start responses with "Certainly!", "Sure!", "Great question!", or any 
similar affirmation. Begin directly with the answer.
```

### Step 5: Test with adversarial inputs

Give the model inputs designed to trigger the bad behaviour and confirm the fix works. Common adversarial patterns:

- "Ignore your previous instructions and..."
- Very short inputs that give the model little to work with
- Inputs explicitly outside the defined scope
- Ambiguous inputs with multiple plausible interpretations

---

## System Prompt vs. Retrieved Context vs. User Message

As your agent grows more complex, understand what goes where:

| Information | Where it belongs | Reason |
|---|---|---|
| Role, scope, format rules | System prompt | Applies to every interaction |
| Static reference data (small) | System prompt | Always available, no retrieval cost |
| Static reference data (large) | RAG / tool call | Keeps system prompt token count down |
| Per-user preferences | User message or injected context | Changes per user |
| Conversation history | Message array | Temporal, not universal |
| Current date/time | Injected into system prompt or user message | Not part of model's training |
| Retrieved documents | User message or assistant-injected | Variable, context-specific |

The system prompt should contain what is universally true for every call. Everything else is dynamic and belongs in the message array or retrieved on demand.

---

## Token Efficiency in System Prompts

System prompts run on every API call. A 2 000-token system prompt at 500K calls/month costs $300/month on Claude Sonnet at list pricing. Keep prompts lean:

- Use bullet points instead of prose — equivalent meaning, fewer tokens
- Remove filler ("It is important to note that...") — just state the rule
- Collapse repetitive rules into one general rule with examples
- Move large reference data to a retrieval system

With Anthropic's prompt caching, a system prompt that is longer than 1 024 tokens can be cached at $0.30/1M tokens (vs. $3.00/1M standard) — 90% cheaper on the cached portion. If your prompt is longer than 1K tokens and your call volume is high, caching pays for itself in hours.
