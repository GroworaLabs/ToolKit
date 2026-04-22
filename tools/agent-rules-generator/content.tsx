export default function AgentRulesGeneratorContent() {
  const H2: React.CSSProperties = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 };
  const P: React.CSSProperties  = { fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 };
  const Code = ({ children }: { children: React.ReactNode }) => (
    <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>{children}</code>
  );

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
      <div>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>What an agent rules file actually does</h2>
          <p style={P}>
            Every AI coding agent — Claude Code, Cursor, Windsurf, Cline, Codex, Aider, Goose — starts a session knowing almost nothing about your codebase. It can list files and read them, but it has no idea which conventions you enforce in review, which files are auto-generated, which libraries are banned, or what &quot;done&quot; looks like in your repo. Without a rules file, the agent guesses, you correct, it guesses again. With one, the first answer is usually right.
          </p>
          <p style={P}>
            A rules file is one markdown document at the repo root, loaded into the agent&apos;s context at the start of every session. It captures the conventions a senior engineer would tell a new hire on day one: stack choices, run commands, architecture sketch, off-limits paths, and soft/hard rules. The generator on this page assembles that file from a form — same output for Claude Code (<Code>CLAUDE.md</Code>), Cursor (<Code>.cursorrules</Code>), the cross-tool <Code>AGENTS.md</Code> standard, and two more.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>Which file for which tool</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                  {['Filename', 'Tool', 'Location', 'Format'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['CLAUDE.md',      'Claude Code',           'Repo root (also ~/.claude/CLAUDE.md)', 'Markdown'],
                  ['AGENTS.md',      'Codex, Aider, Goose, others', 'Repo root',                     'Markdown'],
                  ['.cursorrules',   'Cursor IDE',            'Repo root or any subdirectory',        'Plain text / markdown'],
                  ['.windsurfrules', 'Windsurf / Codeium',    'Repo root',                            'Plain text / markdown'],
                  ['.clinerules',    'Cline (VS Code)',       'Repo root',                            'Plain text / markdown'],
                ].map(([file, tool, loc, fmt], i) => (
                  <tr key={file} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{file}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{tool}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-3)', fontSize: 13 }}>{loc}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-3)', fontSize: 13 }}>{fmt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ ...P, marginTop: 14, marginBottom: 0 }}>
            All five formats are plain markdown or markdown-ish text — the differences are in the conventions the consumer tool expects at the top. Cursor prefers instruction-style prose addressed to the assistant (&quot;You are an AI coding assistant working on…&quot;). Claude Code and AGENTS.md prefer documentation-style prose addressed to the reader. The generator adapts the header per format; the rest of the body is identical, which is why committing two or three of these files to the same repo works fine.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>What belongs in the file — and what doesn&apos;t</h2>
          <p style={P}>
            The single biggest mistake in rules files is putting things that rot. File paths move, package versions bump, team priorities change — if your rules file says &quot;we use Next.js 14&quot;, it&apos;s wrong the day you upgrade. Describe <em>conventions and intent</em>, not facts the code already carries.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 12 }}>
            <div style={{ padding: '14px 16px', border: '1.5px solid var(--green)', background: 'var(--green-lt)', borderRadius: 'var(--r-l)' }}>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 8 }}>Include</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65 }}>
                <li>Stack + run commands (install, dev, build, test, lint)</li>
                <li>Architecture sketch — what lives where, and why</li>
                <li>Conventions the agent can&apos;t guess (server components, no default exports, etc.)</li>
                <li>Banned patterns and libraries</li>
                <li>Paths that must never be hand-edited</li>
                <li>Off-repo context — auth provider, release flow, &quot;we deploy via X&quot;</li>
              </ul>
            </div>
            <div style={{ padding: '14px 16px', border: '1.5px solid var(--border)', background: 'var(--white)', borderRadius: 'var(--r-l)' }}>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 8 }}>Leave out</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.65 }}>
                <li>Exhaustive file lists — the agent can ls the directory</li>
                <li>Pinned library versions — read <Code>package.json</Code></li>
                <li>JSDoc-style function documentation</li>
                <li>Recent decisions — git log is authoritative</li>
                <li>Secrets, credentials, or private URLs</li>
                <li>Anything that would be corrected in a PR review of CLAUDE.md itself</li>
              </ul>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>The right length: 100–300 lines</h2>
          <p style={P}>
            Rules files work best in the 100–300 line range. Under 50 lines and the agent keeps asking the same questions your teammates would answer automatically. Over 600 lines and the context gets bloated — the agent skims, the signal-to-noise drops, and you&apos;re paying token cost every call for content that doesn&apos;t change the answer. If the file grows past 500 lines, split by topic: universal rules in <Code>CLAUDE.md</Code>, deep architecture in <Code>docs/architecture.md</Code>, referenced by one line (&quot;For system design details, read <Code>docs/architecture.md</Code>&quot;). Agents will open linked files on demand.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>Do vs Don&apos;t vs Never-touch</h2>
          <p style={P}>
            The generator splits rules into three lists because agents should treat them differently. &quot;Do&quot; items are positive defaults — what to reach for when there&apos;s a choice. &quot;Don&apos;t&quot; items are soft prohibitions — avoid, but override if explicitly asked with a reason. &quot;Never touch&quot; is a hard boundary — paths the agent is not allowed to modify under any circumstance, because they are auto-generated, legally signed-off, or managed by an external release workflow.
          </p>
          <p style={{ ...P, marginBottom: 0 }}>
            Calibrating pressure matters. &quot;Don&apos;t use <Code>any</Code>&quot; as a &quot;never touch&quot; makes the rules fragile — there will be a legitimate case where a short <Code>any</Code> is the right call. The same item as a &quot;don&apos;t&quot; is correct: default to proper types, override with justification. Conversely, &quot;don&apos;t edit <Code>db/migrations/</Code>&quot; is too soft — migrations are generated by a tool and hand-edits cause silent schema drift. That belongs in &quot;never touch&quot;.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>Keeping the file accurate over time</h2>
          <p style={P}>
            A rules file drifts the moment you ship the next feature. Three tactics keep it useful:
          </p>
          <ul style={{ paddingLeft: 18, margin: '0 0 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Review it in PRs.</strong> When a PR changes architecture or conventions, the rules file change should land in the same PR. Add a reminder to your PR template: &quot;does this change any rule in CLAUDE.md?&quot;
            </li>
            <li style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Promote correction loops.</strong> The second time you correct an agent with the same instruction, that instruction belongs in the rules file. Agents give you a ready-made list of gaps.
            </li>
            <li style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Delete dead rules.</strong> A deprecated &quot;don&apos;t use redux&quot; after you&apos;ve fully migrated off redux is noise. Prune as aggressively as you add.
            </li>
          </ul>
          <p style={{ ...P, marginBottom: 0 }}>
            Treat the rules file like documentation for humans, because that&apos;s also what it is. A new teammate reading <Code>CLAUDE.md</Code> on day one should be able to answer &quot;what are our conventions?&quot; without asking anyone.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>AGENTS.md: the de-facto cross-tool standard</h2>
          <p style={P}>
            <Code>AGENTS.md</Code> emerged in late 2025 as a shared convention for describing a project to any AI coding agent. It is not an RFC or an official spec — it is a convention driven by adoption. Codex, Aider, Goose, and a growing list of CLIs read it at the repo root. The format is unstructured markdown, and the sections most files cover match the ones this generator produces: stack, commands, conventions, architecture, do/don&apos;t lists.
          </p>
          <p style={{ ...P, marginBottom: 0 }}>
            If your team uses more than one agent tool, or if you want the rules file to work with whatever tool a contributor happens to prefer, <Code>AGENTS.md</Code> is the portable choice. Many teams commit both <Code>AGENTS.md</Code> and <Code>CLAUDE.md</Code> — either maintained in parallel via this generator, or symlinked. The generator produces both from one form; regenerate whenever the rules change.
          </p>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={H2}>Related tools</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: 10 }}>
            {[
              { href: '/tools/token-counter',          title: 'AI Token Counter',        desc: 'Measure how many tokens your rules file consumes in the agent context every session.' },
              { href: '/tools/ai-cost-calculator',     title: 'AI API Cost Calculator',  desc: 'Estimate what those per-session rules-file tokens cost across GPT, Claude, Gemini, DeepSeek.' },
              { href: '/tools/markdown-editor',        title: 'Markdown Editor',         desc: 'Edit the generated file with live preview before committing to git.' },
              { href: '/tools/text-diff',              title: 'Text Diff',               desc: 'Compare an old and new version of your rules file to see exactly what you changed.' },
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
