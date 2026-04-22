import { useEffect, useMemo, useRef, useState } from 'react';

type FormatId = 'claude' | 'agents' | 'cursor' | 'windsurf' | 'cline';

interface FormatMeta {
  id:        FormatId;
  filename:  string;
  label:     string;
  blurb:     string;
  consumer:  string;
}

const FORMATS: FormatMeta[] = [
  { id: 'claude',   filename: 'CLAUDE.md',      label: 'CLAUDE.md',      blurb: 'Markdown context for Claude Code',     consumer: 'Anthropic Claude Code'    },
  { id: 'agents',   filename: 'AGENTS.md',      label: 'AGENTS.md',      blurb: 'Cross-tool agent rules (de-facto standard)', consumer: 'Codex, Aider, Goose, others' },
  { id: 'cursor',   filename: '.cursorrules',   label: '.cursorrules',   blurb: 'Project rules consumed by Cursor',     consumer: 'Cursor IDE'                },
  { id: 'windsurf', filename: '.windsurfrules', label: '.windsurfrules', blurb: 'Workspace rules for Windsurf / Codeium', consumer: 'Windsurf / Codeium'      },
  { id: 'cline',    filename: '.clinerules',    label: '.clinerules',    blurb: 'Rules consumed by Cline (VS Code)',    consumer: 'Cline VS Code extension'   },
];

interface Preset {
  id:    string;
  label: string;
  apply: (s: State) => State;
}

interface State {
  projectName:  string;
  oneLiner:     string;
  language:     string;
  framework:    string;
  packager:     string;
  database:     string;
  install:      string;
  dev:          string;
  build:        string;
  test:         string;
  lint:         string;
  conventions:  string;
  architecture: string;
  dos:          string;
  donts:        string;
  neverTouch:   string;
  notes:        string;
}

const EMPTY: State = {
  projectName:  '',
  oneLiner:     '',
  language:     '',
  framework:    '',
  packager:     '',
  database:     '',
  install:      '',
  dev:          '',
  build:        '',
  test:         '',
  lint:         '',
  conventions:  '',
  architecture: '',
  dos:          '',
  donts:        '',
  neverTouch:   '',
  notes:        '',
};

const PRESETS: Preset[] = [
  {
    id: 'web', label: 'Web app',
    apply: () => ({
      projectName: 'Acme Web', oneLiner: 'Customer-facing dashboard for Acme.',
      language: 'TypeScript', framework: 'Next.js (app router) + React 19', packager: 'pnpm', database: 'Postgres (Drizzle ORM)',
      install: 'pnpm install', dev: 'pnpm dev', build: 'pnpm build', test: 'pnpm test', lint: 'pnpm lint && pnpm typecheck',
      conventions: 'Server components by default. Client components only when needed for state/effects. Tailwind for styling. Forms with react-hook-form + zod. Co-locate component + test + story files.',
      architecture: 'app/ — routes\ncomponents/ — shared UI\nlib/ — server utilities\ndb/ — schema + migrations\nMutations live in server actions, never in client components.',
      dos: 'Validate every external input with zod\nUse the existing Button / Input / Dialog primitives — do not roll your own\nWrite a unit test alongside any new lib/ helper\nUse semantic HTML (button, nav, main, header)',
      donts: 'Add a new UI primitive when one exists\nFetch data inside client components — use server actions / server components\nIntroduce a new state-management library — context + URL state is enough\nLeave any TypeScript any in production code',
      neverTouch: 'db/migrations/* — generate via drizzle-kit, never hand-edit\n.env.local, .env.production\npublic/legal/* — content is signed off by legal',
      notes: 'Auth is handled by Clerk. Always read the user from the server with auth() — never trust the client.',
    }),
  },
  {
    id: 'cli', label: 'CLI tool',
    apply: () => ({
      ...EMPTY,
      projectName: 'mycli', oneLiner: 'Command-line tool for X.',
      language: 'TypeScript', framework: 'Node 20 + Commander', packager: 'npm', database: '(none)',
      install: 'npm install', dev: 'npm run dev', build: 'npm run build', test: 'npm test', lint: 'npm run lint',
      conventions: 'One command per file under src/commands/. Each command exports { name, describe, builder, handler }. All filesystem and network IO goes through src/io/ — pure functions live in src/lib/.',
      architecture: 'src/cli.ts — entry point\nsrc/commands/ — subcommands\nsrc/io/ — filesystem, network, stdout helpers\nsrc/lib/ — pure logic (heavily tested)\ntest/ — vitest suites mirror src/',
      dos: 'Treat stdout as data, stderr for diagnostics\nWrite a snapshot test for any new command\nFail fast with a clear error message on bad input\nRespect $NO_COLOR and $CI environment variables',
      donts: 'console.log inside lib/ — log only at the command boundary\nThrow strings — always throw Error subclasses\nWrite to the user’s home dir without a flag they explicitly passed',
      neverTouch: 'CHANGELOG.md (managed by changesets)\npackage.json version (managed by release workflow)',
      notes: '',
    }),
  },
  {
    id: 'lib', label: 'Library / SDK',
    apply: () => ({
      ...EMPTY,
      projectName: 'my-sdk', oneLiner: 'TypeScript SDK for the Acme API.',
      language: 'TypeScript', framework: 'tsup + tsx', packager: 'pnpm', database: '(none)',
      install: 'pnpm install', dev: 'pnpm dev', build: 'pnpm build', test: 'pnpm test', lint: 'pnpm lint && pnpm typecheck',
      conventions: 'Public API surface is whatever index.ts exports — be deliberate. No default exports. Every exported function and type carries a one-line JSDoc. Bump semver in changesets, never in package.json directly.',
      architecture: 'src/index.ts — public surface\nsrc/internal/ — implementation, never re-exported\ntest/ — vitest, every public export covered\nexamples/ — runnable examples used in docs',
      dos: 'Treat any change to src/index.ts as potentially breaking — add a changeset\nKeep the dependency footprint small; pin versions\nCover the unhappy path in tests, not just the happy one\nWrite the README example before writing the function',
      donts: 'Re-export anything from src/internal/\nUse Node-only APIs without a polyfill — this ships to browsers too\nBreak public types without a major-version changeset',
      neverTouch: 'CHANGELOG.md\ndist/ (built artifact)\nnpm credentials',
      notes: '',
    }),
  },
  {
    id: 'data', label: 'Data / ML project',
    apply: () => ({
      ...EMPTY,
      projectName: 'pipeline-x', oneLiner: 'ETL + training pipeline for X.',
      language: 'Python 3.12', framework: 'Polars + DuckDB + scikit-learn', packager: 'uv', database: 'DuckDB local + S3 parquet',
      install: 'uv sync', dev: 'uv run python -m pipeline.cli', build: '(no build step)', test: 'uv run pytest', lint: 'uv run ruff check && uv run mypy',
      conventions: 'All transforms are pure functions on Polars DataFrames. Pipelines composed as small steps in pipeline/steps/. No notebooks in main — exploration lives in notebooks/ and is not CI-run.',
      architecture: 'pipeline/cli.py — orchestration\npipeline/steps/ — pure DataFrame transforms\npipeline/io/ — S3 / DuckDB readers + writers\nmodels/ — sklearn pipelines, versioned\nnotebooks/ — exploratory only',
      dos: 'Always pass schemas explicitly — never infer from prod data\nUse pytest fixtures with tiny synthetic frames, not prod samples\nLog input/output row counts at every step\nVersion every model artifact with a hash + date',
      donts: 'Mutate DataFrames in place — return new frames\nRead production parquet from a notebook without a code review\nUse pandas — this codebase is Polars only',
      neverTouch: 'data/raw/ — immutable source of truth\nmodels/production/ — promoted via release workflow only',
      notes: '',
    }),
  },
];

function joinBullets(s: string): string {
  return s.split('\n').map(l => l.trim()).filter(Boolean).map(l => `- ${l}`).join('\n');
}

function section(title: string, body: string): string {
  if (!body.trim()) return '';
  return `## ${title}\n\n${body.trim()}\n`;
}

function bulletSection(title: string, body: string): string {
  if (!body.trim()) return '';
  return `## ${title}\n\n${joinBullets(body)}\n`;
}

function commandsTable(s: State): string {
  const rows: [string, string][] = [
    ['Install', s.install], ['Dev',   s.dev], ['Build', s.build],
    ['Test',    s.test],    ['Lint',  s.lint],
  ].filter(([, cmd]) => cmd.trim()) as [string, string][];
  if (rows.length === 0) return '';
  const lines = rows.map(([k, v]) => `- **${k}** — \`${v.trim()}\``).join('\n');
  return `## Run commands\n\n${lines}\n`;
}

function stackBlock(s: State): string {
  const rows: [string, string][] = [
    ['Language',       s.language],
    ['Framework',      s.framework],
    ['Package manager', s.packager],
    ['Database',       s.database],
  ].filter(([, v]) => v.trim()) as [string, string][];
  if (rows.length === 0) return '';
  return `## Stack\n\n${rows.map(([k, v]) => `- **${k}** — ${v.trim()}`).join('\n')}\n`;
}

function generate(s: State, fmt: FormatId): string {
  const project = s.projectName.trim() || 'This project';
  const tagline = s.oneLiner.trim();

  let header: string;
  if (fmt === 'cursor') {
    header = `You are an AI coding assistant working on ${project}.${tagline ? ' ' + tagline : ''}\nUse the conventions, commands, and rules below. When in doubt, ask before deviating.\n`;
  } else if (fmt === 'windsurf' || fmt === 'cline') {
    header = `# ${project} — workspace rules\n${tagline ? `\n${tagline}\n` : ''}`;
  } else if (fmt === 'agents') {
    header = `# AGENTS.md — ${project}\n${tagline ? `\n${tagline}\n` : ''}\nThis file describes the project to any AI coding agent (Claude Code, Codex, Aider, Goose, etc.).\n`;
  } else {
    header = `# ${project} — context for Claude\n${tagline ? `\n${tagline}\n` : ''}\nThis file is loaded into Claude's context every session. Keep it concise — verbose history belongs in git, not here.\n`;
  }

  const parts = [
    header,
    stackBlock(s),
    commandsTable(s),
    section('Conventions',  s.conventions),
    section('Architecture', s.architecture),
    bulletSection('Do', s.dos),
    bulletSection("Don't", s.donts),
    bulletSection('Never touch', s.neverTouch),
    section('Notes', s.notes),
  ].filter(Boolean);

  return parts.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>{children}</span>
);

const inputBox: React.CSSProperties = {
  padding: '8px 10px',
  border: '1.5px solid var(--border)', borderRadius: 'var(--r-s)',
  background: 'var(--white)', color: 'var(--ink)',
  fontSize: 13, fontFamily: 'inherit', outline: 'none',
  width: '100%', boxSizing: 'border-box',
};

const textareaBox: React.CSSProperties = {
  ...inputBox,
  minHeight: 70, resize: 'vertical',
  fontFamily: 'JetBrains Mono, monospace', lineHeight: 1.55,
};

function Field({ label, value, onChange, placeholder, multiline, minH }: {
  label:        string;
  value:        string;
  onChange:     (v: string) => void;
  placeholder?: string;
  multiline?:   boolean;
  minH?:        number;
}) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 5, minWidth: 0 }}>
      <FieldLabel>{label}</FieldLabel>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          spellCheck={false}
          style={{ ...textareaBox, minHeight: minH ?? 70 }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={inputBox}
        />
      )}
    </label>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      padding: 12, background: 'var(--white)',
      border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-2)' }}>
        {title}
      </div>
      {children}
    </div>
  );
}

const IcoCopy  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoDown  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;

export default function AgentRulesGeneratorWidget() {
  const [format, setFormat] = useState<FormatId>('claude');
  const [state,  setState]  = useState<State>(PRESETS[0].apply(EMPTY));
  const [presetId, setPresetId] = useState<string>('web');
  const [copied, setCopied] = useState(false);
  const dlAnchorRef = useRef<HTMLAnchorElement | null>(null);

  const set = <K extends keyof State>(key: K) => (v: State[K]) => setState(s => ({ ...s, [key]: v }));

  const applyPreset = (id: string) => {
    const p = PRESETS.find(p => p.id === id);
    if (!p) return;
    setPresetId(id);
    setState(p.apply(EMPTY));
  };

  const fmtMeta = FORMATS.find(f => f.id === format) ?? FORMATS[0];
  const output  = useMemo(() => generate(state, format), [state, format]);
  const charCount = output.length;
  const lineCount = output.split('\n').length;

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const download = () => {
    const blob = new Blob([output], { type: 'text/markdown;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a    = dlAnchorRef.current;
    if (!a) return;
    a.href = url;
    a.download = fmtMeta.filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const reset = () => setState(EMPTY);

  return (
    <div>
      <a ref={dlAnchorRef} style={{ display: 'none' }} aria-hidden="true" />

      {/* ─── Format chips + presets ─── */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14,
        padding: '12px 14px', marginBottom: 14,
        background: 'var(--white)', border: '1.5px solid var(--border)',
        borderRadius: 'var(--r-m)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <FieldLabel>Output format</FieldLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {FORMATS.map(f => {
              const active = format === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFormat(f.id)}
                  title={`${f.consumer} — ${f.blurb}`}
                  style={{
                    padding: '6px 12px', fontSize: 12, fontWeight: 700,
                    border: '1.5px solid',
                    borderColor: active ? 'var(--green)'   : 'var(--border)',
                    background:  active ? 'var(--green-lt)' : 'var(--white)',
                    color:       active ? 'var(--green)'   : 'var(--ink-2)',
                    borderRadius: 999, cursor: 'pointer',
                    fontFamily: 'inherit', transition: 'all 0.12s',
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ width: 1, height: 36, background: 'var(--border)' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 200 }}>
          <FieldLabel>Preset</FieldLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {PRESETS.map(p => {
              const active = presetId === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => applyPreset(p.id)}
                  style={{
                    padding: '6px 12px', fontSize: 12, fontWeight: 700,
                    border: '1.5px solid',
                    borderColor: active ? 'var(--blue)'   : 'var(--border)',
                    background:  active ? 'var(--blue-lt)' : 'var(--white)',
                    color:       active ? 'var(--blue)'   : 'var(--ink-2)',
                    borderRadius: 999, cursor: 'pointer',
                    fontFamily: 'inherit', transition: 'all 0.12s',
                  }}
                >
                  {p.label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={reset}
              style={{
                padding: '6px 12px', fontSize: 12, fontWeight: 700,
                border: '1.5px dashed var(--border)',
                background: 'transparent', color: 'var(--ink-3)',
                borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* ─── Split: form | preview ─── */}
      <div className="tk-token-split">
        {/* ── Form ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SectionCard title="Project basics">
            <Field label="Project name" value={state.projectName} onChange={set('projectName')} placeholder="Acme Web" />
            <Field label="One-liner"    value={state.oneLiner}    onChange={set('oneLiner')}    placeholder="Customer-facing dashboard for Acme." />
          </SectionCard>

          <SectionCard title="Stack">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(160px, 100%), 1fr))', gap: 10 }}>
              <Field label="Language"        value={state.language}  onChange={set('language')}  placeholder="TypeScript" />
              <Field label="Framework"       value={state.framework} onChange={set('framework')} placeholder="Next.js + React 19" />
              <Field label="Package manager" value={state.packager}  onChange={set('packager')}  placeholder="pnpm" />
              <Field label="Database"        value={state.database}  onChange={set('database')}  placeholder="Postgres" />
            </div>
          </SectionCard>

          <SectionCard title="Run commands">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))', gap: 10 }}>
              <Field label="Install" value={state.install} onChange={set('install')} placeholder="pnpm install" />
              <Field label="Dev"     value={state.dev}     onChange={set('dev')}     placeholder="pnpm dev" />
              <Field label="Build"   value={state.build}   onChange={set('build')}   placeholder="pnpm build" />
              <Field label="Test"    value={state.test}    onChange={set('test')}    placeholder="pnpm test" />
              <Field label="Lint"    value={state.lint}    onChange={set('lint')}    placeholder="pnpm lint" />
            </div>
          </SectionCard>

          <SectionCard title="Conventions & architecture">
            <Field label="Conventions"  value={state.conventions}  onChange={set('conventions')}  placeholder="Server components by default. Tailwind for styling. Co-locate test + component." multiline minH={84} />
            <Field label="Architecture" value={state.architecture} onChange={set('architecture')} placeholder="app/ — routes&#10;components/ — shared UI&#10;lib/ — server utilities" multiline minH={84} />
          </SectionCard>

          <SectionCard title="Rules">
            <Field label="Do (one per line)"     value={state.dos}        onChange={set('dos')}        placeholder="Validate inputs with zod&#10;Use existing UI primitives" multiline minH={70} />
            <Field label="Don't (one per line)" value={state.donts}      onChange={set('donts')}      placeholder="Add a new state library&#10;Leave any TypeScript any" multiline minH={70} />
            <Field label="Never touch (one per line)" value={state.neverTouch} onChange={set('neverTouch')} placeholder="db/migrations/*&#10;.env.production" multiline minH={56} />
            <Field label="Free-form notes"        value={state.notes}       onChange={set('notes')}       placeholder="Auth handled by Clerk; always read user from server with auth()." multiline minH={56} />
          </SectionCard>
        </div>

        {/* ── Preview ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{
            display: 'flex', flexDirection: 'column',
            border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)',
            background: 'var(--white)', overflow: 'hidden',
            position: 'sticky', top: 12,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 12px', borderBottom: '1px solid var(--border)',
              background: 'var(--page-bg)', gap: 10, flexWrap: 'wrap',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <span style={{
                  fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'var(--green)',
                  padding: '3px 8px', borderRadius: 4, background: 'var(--green-lt)',
                }}>
                  Preview
                </span>
                <code style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 700,
                  color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {fmtMeta.filename}
                </code>
                <span style={{ fontSize: 11, color: 'var(--ink-4)', whiteSpace: 'nowrap' }}>
                  {lineCount} lines · {charCount} chars
                </span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  type="button"
                  onClick={copy}
                  title="Copy to clipboard"
                  style={{
                    height: 30, padding: '0 12px',
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontSize: 12, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer',
                    border: '1.5px solid',
                    borderColor: copied ? 'var(--green)' : 'var(--border)',
                    background:  copied ? 'var(--green)' : 'var(--white)',
                    color:       copied ? 'var(--white)' : 'var(--ink-2)',
                    borderRadius: 'var(--r-s)', transition: 'all 0.13s',
                  }}
                >
                  {copied ? <IcoCheck /> : <IcoCopy />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  type="button"
                  onClick={download}
                  title={`Download as ${fmtMeta.filename}`}
                  style={{
                    height: 30, padding: '0 12px',
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontSize: 12, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer',
                    border: '1.5px solid var(--border)',
                    background: 'var(--white)', color: 'var(--ink-2)',
                    borderRadius: 'var(--r-s)', transition: 'all 0.13s',
                  }}
                >
                  <IcoDown />
                  <span>Download</span>
                </button>
              </div>
            </div>
            <pre style={{
              margin: 0, padding: '14px 16px',
              maxHeight: 620, overflow: 'auto',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 12.5,
              lineHeight: 1.65, color: 'var(--ink)',
              background: 'var(--white)', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            }}>
              {output}
            </pre>
          </div>

          <p style={{ fontSize: 12, color: 'var(--ink-4)', margin: '0 2px', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--ink)' }}>Place</strong> the file at the repo root (or in <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>~/.claude/CLAUDE.md</code> for user-wide rules).
            All editing happens in your browser — no data leaves your device.
          </p>
        </div>
      </div>
    </div>
  );
}
