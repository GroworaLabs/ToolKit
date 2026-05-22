---
title: "New Tool: Agent Rules Generator for AI Coding Assistants"
description: "One form, five output formats: CLAUDE.md, AGENTS.md, .cursorrules, .windsurfrules, and .clinerules. Configure your AI coding assistant once, export for whatever tool you're using."
tags: ["new tool", "ai", "developer tools"]
tools: ["agent-rules-generator"]
publishedAt: "2026-04-22"
author: "marcus-chen"
---

If you use more than one AI coding assistant — or if your team uses a mix of tools — you've probably experienced the rules-file fragmentation problem.

Claude Code reads `CLAUDE.md`. Cursor reads `.cursorrules`. Windsurf reads `.windsurfrules`. Codex and Aider look for `AGENTS.md`. They all serve the same purpose (project-specific instructions for the AI), but they're separate files with slightly different conventions, and keeping them in sync manually is tedious.

The [Agent Rules Generator](/tools/agent-rules-generator) solves this.

## How it works

Fill out a single form with your project's specifics:

- **Stack** — languages, frameworks, tools
- **Run commands** — how to start the dev server, run tests, build
- **Conventions** — naming, style, patterns the AI should follow
- **Architecture** — where things live in the codebase
- **Do / Don't / Never touch** — explicit guardrails

Then click one of five format chips — CLAUDE.md, AGENTS.md, .cursorrules, .windsurfrules, or .clinerules — and the preview updates to show the correctly formatted output for that tool.

Copy or download the file with one click.

## Four starter presets

If you're starting from scratch, four presets fully populate the form:

- **Web App** — Next.js, Drizzle, Clerk, TypeScript
- **CLI Tool** — Node.js, Commander, tsup
- **Library/SDK** — tsup, changesets, semantic versioning conventions
- **Data/ML** — Python, Polars, DuckDB, uv

Edit the preset to match your actual setup, then export.

## Fully client-side

Your project conventions and architecture decisions never leave the browser. The generator runs entirely client-side — nothing is sent to a server, nothing is stored.

[Try the Agent Rules Generator →](/tools/agent-rules-generator)
