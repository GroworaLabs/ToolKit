import { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'Is anything I type sent to a server?',
    a: 'No. The generator is pure client-side string assembly — your project name, stack, and internal conventions never leave the browser. There is no API call, no telemetry, no analytics tied to the form fields. Open DevTools → Network and you will see zero outbound requests while you type or switch formats. Safe to paste private architecture notes, internal tooling commands, or unreleased product names.',
  },
  {
    q: 'Which file should I generate — CLAUDE.md, AGENTS.md, or .cursorrules?',
    a: 'Depends on the tool your team uses. CLAUDE.md is for Claude Code (Anthropic\'s CLI) and lives at the repo root — Claude loads it into context every session. AGENTS.md is the de-facto cross-tool standard adopted by Codex, Aider, Goose, and a growing list of agents; use it if your team uses multiple CLIs or wants portability. .cursorrules is for Cursor IDE, .windsurfrules is for Windsurf/Codeium, .clinerules is for the Cline VS Code extension. Many teams commit both CLAUDE.md and AGENTS.md — and since both are plain markdown, one can symlink or import the other.',
  },
  {
    q: 'Can I keep more than one of these files in the same repo?',
    a: 'Yes, and it\'s common. Claude Code reads CLAUDE.md, Cursor reads .cursorrules, AGENTS.md is read by Codex/Aider/Goose — they don\'t conflict. The practical issue is keeping them in sync. Two options: (1) commit a single AGENTS.md and symlink the others to it (works on macOS/Linux, awkward on Windows); (2) generate all five from this tool whenever the rules change — takes 20 seconds and guarantees consistency.',
  },
  {
    q: 'What goes in the rules file vs what should stay in code?',
    a: 'The rules file captures what the code cannot self-document: why you chose an approach, what files are off-limits, which libraries are forbidden, what conventions you\'d correct in code review. Good content: "always use the existing Button primitive, never roll your own", "db/migrations/* is auto-generated — never hand-edit", "route all mutations through server actions". Bad content: function-level docs (JSDoc them), file paths that will rot (the agent can list the directory), library versions (read package.json), recent decisions (git log is authoritative). Rule of thumb: if a senior engineer would say it to a new hire on day one, it belongs here.',
  },
  {
    q: 'How long should the file be?',
    a: 'Short enough to load in full context, long enough to prevent repeated corrections. For most projects, 100–300 lines is the sweet spot. Under 50 lines usually means the agent keeps asking questions that could have been answered; over 600 lines means the context gets bloated and the agent skims. If the file grows past 500 lines, split by topic: keep the universal rules in CLAUDE.md and move deep-dive architecture into docs/ — reference them from CLAUDE.md so the agent can read on demand.',
  },
  {
    q: 'What do the presets seed?',
    a: 'Each preset populates every field with a realistic example of that project archetype. "Web app" seeds a Next.js + TypeScript + pnpm + Drizzle stack with server-component conventions and Clerk auth. "CLI tool" seeds a Node + Commander + vitest layout with stdout-as-data rules. "Library / SDK" seeds a tsup-based pnpm workspace with changesets and a public-surface discipline. "Data / ML project" seeds a Python 3.12 + Polars + DuckDB + uv pipeline with pure-function transforms. Use a preset as a starting skeleton — replace project name, tweak the stack, edit the rules — much faster than starting empty.',
  },
  {
    q: 'What is AGENTS.md and is it a real standard?',
    a: 'AGENTS.md emerged in late 2025 as a shared convention for telling any AI coding agent about a project. It\'s a plain-markdown file at the repo root, read by Codex, Aider, Goose, and a growing list of CLIs. It is not an RFC or an official spec — it is a de-facto standard driven by adoption. The pattern is: one file, any agent. The format is unstructured markdown, but most files cover the same sections this generator covers (stack, commands, conventions, architecture, do/don\'t lists). If you are writing rules for a multi-agent team or want portability, AGENTS.md is the safer bet than tool-specific files.',
  },
  {
    q: 'Why are Do / Don\'t / Never-touch separate sections?',
    a: 'They describe different kinds of rules and the agent treats them differently. "Do" items are positive defaults — pick these when deciding how to implement something. "Don\'t" items are soft prohibitions — the agent will avoid but may override if you explicitly ask. "Never touch" is a hard boundary — paths or files the agent is not allowed to modify even if asked, because they are auto-generated, legally signed-off, or managed by an external release workflow. Separating them lets you calibrate pressure: a "don\'t" can be overridden with a good reason; "never touch" requires explicit removal from the rules file.',
  },
  {
    q: 'Where do I put the file once I\'ve generated it?',
    a: 'Repo root, always — every supported agent looks there first. CLAUDE.md, AGENTS.md, .cursorrules, .windsurfrules, and .clinerules all sit next to package.json. For user-wide rules that apply across every project you open, Claude Code also reads ~/.claude/CLAUDE.md. Cursor supports subdirectory .cursorrules files too, which override the root file inside that folder — useful for monorepos where each package has different conventions. Commit the file to git so every teammate and every agent gets the same context.',
  },
  {
    q: 'Should the rules file be committed to git?',
    a: 'Yes. The whole point is to give every contributor — human or AI — the same starting context. Commit it, review changes to it in PRs (rules drift is real), and treat it as part of the documentation surface. If it contains anything secret, you\'re doing it wrong — rules files should describe conventions and architecture, not credentials or private URLs.',
  },
  {
    q: 'Does this include test-framework-specific rules or language-specific style guides?',
    a: 'Not automatically. The generator scaffolds the universal sections — stack, commands, conventions, architecture, rules — and leaves the content to you. If you want vitest-specific rules ("every test starts with describe(), prefer it.each over for-loops"), add them to the Conventions field. If you want Python-specific ("type-hint every function, use ruff not black"), same. The tool is opinionated about structure, unopinionated about content — that\'s deliberate, because good rules are project-specific.',
  },
  {
    q: 'Can I edit the generated file by hand after downloading?',
    a: 'Yes — the output is plain markdown, no hidden metadata, no structure required to keep working. Add sections, reorder them, drop ones that don\'t apply. The generator is a scaffold, not a runtime. A common workflow is: generate once to seed the file, then maintain it by hand going forward; re-run the generator only if you want to regenerate across formats or reset to a clean preset.',
  },
];

export const sidebarFeatures = [
  { label: '5 output formats',      desc: 'CLAUDE.md, AGENTS.md, .cursorrules, .windsurfrules, .clinerules — one form, any agent.',                color: 'var(--green)', bg: 'var(--green-lt)' },
  { label: '4 starter presets',     desc: 'Web app, CLI tool, library/SDK, data & ML — realistic stacks, commands, and conventions pre-filled.',     color: 'var(--blue)',  bg: 'var(--blue-lt)'  },
  { label: 'Live preview',          desc: 'The markdown updates as you type. Copy to clipboard or download as the right filename for each format.',  color: 'var(--amber)', bg: 'var(--amber-lt)' },
  { label: '100% browser-based',    desc: 'No project name, stack detail, or rule ever leaves your device. Safe to paste private conventions.',      color: 'var(--ink-2)', bg: 'var(--border)'   },
];
