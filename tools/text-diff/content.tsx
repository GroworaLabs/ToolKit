export default function TextDiffContent() {
  const h2: React.CSSProperties = {
    fontFamily: 'Outfit, sans-serif', fontWeight: 700,
    fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)',
    letterSpacing: '-0.02em', marginBottom: 16,
  };
  const p: React.CSSProperties = { fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 };
  const code: React.CSSProperties = { fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 };
  const link: React.CSSProperties = { color: 'var(--green)', textDecoration: 'underline' };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
      <div>

        {/* ── What is a diff ───────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={h2}>What is a text diff?</h2>
          <p style={p}>
            A diff — short for "difference" — is a representation of the changes between two versions of a text. Given an original text and a modified version, a diff algorithm identifies which lines were deleted, which were inserted, and which remained the same. The result is displayed as a structured comparison that lets you understand exactly what changed, without reading both texts in full.
          </p>
          <p style={p}>
            Diffs are fundamental to software development. Every commit in Git is stored as a diff. Code reviews on GitHub, GitLab, and Bitbucket display diffs to show what a pull request changes. Patch files distributed on mailing lists are diffs in unified format. Documentation teams use diffs to review edits to technical writing. Database administrators compare configuration files between environments. Journalists compare document versions to track revisions. The ability to quickly identify the difference between two texts is one of the most universally useful operations in knowledge work.
          </p>
          <p style={p}>
            This tool brings that capability to your browser — no command line required, no files to save, no installation. Paste any two pieces of text and see a colour-coded, line-by-line comparison instantly.
          </p>
        </section>

        {/* ── How diff algorithms work ─────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={h2}>How the diff algorithm works</h2>
          <p style={p}>
            This tool uses the <strong style={{ color: 'var(--ink)' }}>LCS (Longest Common Subsequence)</strong> algorithm — the same foundational approach behind the Unix <code style={code}>diff</code> command, Git's diff engine, and virtually every code review tool in existence.
          </p>
          <p style={p}>
            The algorithm works in two phases. First, it builds a dynamic programming table that finds the longest sequence of lines common to both texts — the lines that appear in the same relative order in both versions and therefore didn't change. Second, it backtracks through that table to reconstruct the edit script: the minimal sequence of insertions and deletions needed to transform the original into the modified version.
          </p>
          <p style={p}>
            The key property of an LCS-based diff is that it finds a <em>minimal</em> edit: it never marks a line as changed if it could be considered equal. This means the diff output is as small as possible and highlights only genuine differences, not artefacts of the comparison algorithm.
          </p>
          <div style={{ padding: '16px 20px', background: 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, lineHeight: 1.8 }}>
            <div style={{ color: 'var(--ink-3)', marginBottom: 8, fontFamily: 'Outfit, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Example unified diff output</div>
            <div style={{ color: 'var(--ink-3)' }}>{'  '} const greeting = "Hello";</div>
            <div style={{ color: '#dc2626' }}>{'− '} console.log(greeting + " world");</div>
            <div style={{ color: 'var(--green)' }}>{'+ '} console.log(`{'${greeting}'} universe`);</div>
            <div style={{ color: 'var(--ink-3)' }}>{'  '} return greeting;</div>
          </div>
        </section>

        {/* ── Unified vs split view ────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={h2}>Unified vs split view: which to use</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px,100%), 1fr))', gap: 12 }}>
            {[
              {
                title: 'Unified view',
                desc: 'Both texts are merged into a single scrollable panel. Removed lines appear in red prefixed with "−", added lines in green prefixed with "+", unchanged lines in grey. Context is immediately visible — you can see what surrounded each change without switching panels. Best for small-to-medium diffs where you want to understand the full picture quickly.',
                tag: 'Like git diff in terminal',
              },
              {
                title: 'Split view',
                desc: 'Original text is displayed on the left, modified on the right, with corresponding lines aligned. Deleted lines show on the left with a red background; inserted lines show on the right with a green background. Empty rows fill gaps where one side has more lines than the other. Best for large block-level changes where you want to compare sections side by side.',
                tag: 'Like GitHub code review',
              },
            ].map(({ title, desc, tag }) => (
              <div key={title} style={{ padding: '18px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--green)', background: 'var(--green-lt)', padding: '2px 8px', borderRadius: 99, display: 'inline-block', marginBottom: 10 }}>{tag}</div>
                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Developer use cases ──────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={h2}>Common use cases for developers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px,100%), 1fr))', gap: 10 }}>
            {[
              {
                title: 'Config file comparison',
                desc: 'Compare nginx.conf, docker-compose.yml, or .env files between production and staging environments. Instantly see which keys differ without reading thousands of lines.',
              },
              {
                title: 'API response changes',
                desc: 'Paste a JSON response from two API versions and diff them to detect breaking changes. Tip: use the JSON Formatter first to normalise indentation so formatting differences don\'t appear as content changes.',
              },
              {
                title: 'SQL query optimization',
                desc: 'Compare the original query with your optimized version to confirm you haven\'t accidentally changed the logic while restructuring the SQL. Useful for complex CTEs and multi-join queries.',
              },
              {
                title: 'Documentation editing',
                desc: 'Compare a draft document with the revised version to review edits before publishing. Shows exactly which sentences were rewritten, deleted, or added.',
              },
              {
                title: 'Log file analysis',
                desc: 'Diff application log snippets from two time periods to identify what changed between a working state and a failure. Good for spotting new error patterns.',
              },
              {
                title: 'Code review prep',
                desc: 'Before opening a pull request, diff your changes locally to review what you\'re about to submit. Helps catch accidental debug code, forgotten TODOs, or unintended whitespace changes.',
              },
            ].map(({ title, desc }) => (
              <div key={title} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55 }}>{desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Ignore options explained ─────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={h2}>Understanding ignore whitespace and ignore case</h2>
          <p style={p}>
            Two lines that are semantically identical can appear as changed if they differ only in formatting or capitalisation. The ignore options let you focus on meaningful differences:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                title: 'Ignore whitespace',
                equiv: 'Equivalent to: diff -w or git diff -w',
                desc: 'Lines are compared after trimming leading and trailing spaces and collapsing internal whitespace runs to a single space. A line re-indented from two spaces to four spaces, or with a trailing space added, will be treated as unchanged. The displayed output still shows the original formatting — only the comparison logic changes. Essential when comparing code that was auto-formatted or pasted from different editors.',
                example: '"  function foo()" equals "function foo()"',
              },
              {
                title: 'Ignore case',
                equiv: 'Equivalent to: diff -i or git diff --ignore-case',
                desc: 'All characters are lowercased before comparison. Useful for comparing SQL (where keywords may be upper or lower case), HTML attribute names, HTTP headers, or config keys that are case-insensitive in their target system.',
                example: '"Content-Type" equals "content-type"',
              },
            ].map(({ title, equiv, desc, example }) => (
              <div key={title} style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{title}</span>
                  <code style={{ ...code, color: 'var(--green)', background: 'var(--green-lt)' }}>{equiv}</code>
                </div>
                <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.65, marginBottom: 8 }}>{desc}</p>
                <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-3)', background: 'var(--page-bg)', padding: '6px 10px', borderRadius: 'var(--r-s)' }}>
                  e.g. {example}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── How to read a diff ───────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={h2}>How to read the diff output</h2>
          <p style={p}>
            The unified diff format has been the standard since the 1980s and is used identically by Unix <code style={code}>diff -u</code>, <code style={code}>git diff</code>, patch files, and this tool. Once you learn to read it, you can read any diff anywhere:
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                  {['Prefix', 'Colour', 'Meaning', 'Line numbers shown'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { prefix: '−', color: 'Red',    meaning: 'Line was deleted — exists in Original only',    nums: 'Original line number' },
                  { prefix: '+', color: 'Green',  meaning: 'Line was inserted — exists in Modified only',   nums: 'Modified line number' },
                  { prefix: ' ', color: 'Grey',   meaning: 'Line is unchanged — exists in both versions',   nums: 'Both line numbers shown' },
                  { prefix: '⋯', color: '—',      meaning: 'Separator — hidden unchanged lines in between', nums: '—' },
                ].map(({ prefix, color, meaning, nums }, i) => (
                  <tr key={prefix} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 16 }}>{prefix}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{color}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{meaning}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--ink-2)', fontSize: 13 }}>{nums}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ ...p, marginTop: 16 }}>
            The "Hide unchanged" toggle collapses unchanged lines and shows only a few lines of context around each group of changes — exactly like <code style={code}>git diff</code> in a terminal. This is useful when a small change is buried in a large file: you don't need to scroll through hundreds of unchanged lines to find it.
          </p>
        </section>

        {/* ── Workflow tips ────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={h2}>Tips for effective text comparison</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                title: 'Normalise JSON before diffing',
                desc: (
                  <>
                    JSON files with different indentation or key ordering will produce noisy diffs full of false positives. Run both JSON texts through the <a href="/tools/json-formatter" style={link}>JSON Formatter</a> (Prettify mode, same indent setting) before pasting them into the diff tool. This ensures only actual value changes appear as differences.
                  </>
                ),
              },
              {
                title: 'Use line-level ignores for auto-formatted code',
                desc: 'If your team uses Prettier, Black, or gofmt, a reformatting commit will produce a diff with hundreds of changed lines where only indentation moved. Enable "Ignore whitespace" to filter those out and see only the logical changes.',
              },
              {
                title: 'Compare encoded strings after decoding',
                desc: (
                  <>
                    If you're diffing URL-encoded strings or Base64 payloads, decode them first using the <a href="/tools/url-encoder" style={link}>URL Encoder / Decoder</a> or <a href="/tools/base64" style={link}>Base64 Encoder / Decoder</a>. Diffing encoded text is often meaningless — a single character change in the raw string can alter many characters in the encoded form.
                  </>
                ),
              },
              {
                title: 'Copy diff for sharing',
                desc: 'The "Copy diff" button copies the output in standard unified diff format — the same format used in Git patches and bug reports. Paste it into a GitHub comment, Jira ticket, or Slack message and it will be immediately readable to any developer.',
              },
            ].map(({ title, desc }) => (
              <div key={title} style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', display: 'flex', gap: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', flexShrink: 0, marginTop: 6 }} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                  <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>


        
        {/* ── Git diff deep dive ──────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
            How Git uses diffs internally
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            Git does not store file snapshots for every commit — that would consume enormous storage. Instead, Git stores the <strong style={{ color: 'var(--ink)' }}>objects</strong> (blobs) for each version of a file and computes diffs on demand when you run <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>git diff</code> or view a commit. Each commit object points to a tree of blob hashes, and the diff is computed by comparing the blob content of matching file paths between two commits.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
            Git's default diff algorithm is <strong style={{ color: 'var(--ink)' }}>Myers diff</strong>, the same algorithm described by Eugene Myers in 1986. For most text, it produces optimal diffs. Git also supports the <strong style={{ color: 'var(--ink)' }}>patience diff</strong> algorithm (<code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>--diff-algorithm=patience</code>) which produces more readable diffs for code by anchoring around unique lines — particularly useful when a function is moved rather than modified. The <strong style={{ color: 'var(--ink)' }}>histogram diff</strong> (<code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>--diff-algorithm=histogram</code>) is an evolution of patience diff and is often recommended for code review workflows.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { cmd: 'git diff', desc: 'Shows unstaged changes — what is in the working directory but not yet staged for commit.' },
              { cmd: 'git diff --staged', desc: 'Shows staged changes — what will be included in the next commit. Alias: --cached.' },
              { cmd: 'git diff HEAD~1 HEAD', desc: 'Shows what changed between the previous commit and the current one.' },
              { cmd: 'git diff main...feature', desc: 'Shows changes in the feature branch since it diverged from main — the "what did this PR change" view.' },
              { cmd: 'git diff -w', desc: 'Ignores whitespace-only changes. Equivalent to the "Ignore whitespace" option in this tool.' },
              { cmd: 'git log -p', desc: "Shows commit history with the full diff for each commit inline — useful for auditing a file's change history." },
            ].map(({ cmd, desc }, i) => (
              <div key={cmd} style={{ padding: '12px 16px', display: 'flex', gap: 16, alignItems: 'flex-start', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', background: 'var(--green-lt)', padding: '2px 8px', borderRadius: 4, flexShrink: 0, marginTop: 2, whiteSpace: 'nowrap' }}>{cmd}</code>
                <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

{/* ── Privacy note ────────────────────────────── */}
        <section style={{ marginBottom: 48 }}>
          <div style={{ padding: '20px 24px', background: 'var(--green-lt)', border: '1px solid rgba(5,150,105,.2)', borderRadius: 'var(--r-l)' }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--ink)', marginBottom: 8 }}>
              Your text never leaves your browser
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-2)', margin: 0 }}>
              The entire diff computation runs in JavaScript inside your browser tab. Nothing you paste is transmitted to any server, logged, or stored. This makes the tool safe to use with confidential code, internal documents, unreleased content, and sensitive configuration data — the same level of privacy as running <code style={code}>diff</code> locally on your own machine.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
