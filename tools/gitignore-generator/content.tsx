export default function GitignoreGeneratorContent() {
  return (
    <div className="tool-content">
      <h2>.gitignore Files: A Complete Guide for Developers</h2>
      <p>
        A <code>.gitignore</code> file is one of the first things you should create in any new repository. It tells Git which files and directories to ignore — keeping build artifacts, dependencies, secrets, and OS noise out of version control. A missing or incomplete <code>.gitignore</code> leads to bloated repositories, accidentally committed secrets, and noisy git diffs. This guide covers everything you need to know about <code>.gitignore</code> syntax, strategies, and best practices.
      </p>

      <h3>What Should Go in .gitignore?</h3>
      <p>
        The short rule: <strong>ignore generated files; track source files.</strong> More specifically:
      </p>
      <ul>
        <li><strong>Dependencies:</strong> <code>node_modules/</code>, <code>vendor/</code>, <code>.venv/</code> — reconstructable from lock files</li>
        <li><strong>Build artifacts:</strong> <code>dist/</code>, <code>build/</code>, <code>target/</code>, <code>*.class</code>, <code>*.pyc</code> — generated from source</li>
        <li><strong>Environment files:</strong> <code>.env</code>, <code>.env.local</code> — contain secrets; share <code>.env.example</code> instead</li>
        <li><strong>IDE settings:</strong> <code>.idea/</code>, <code>.vscode/</code> (except shared settings), <code>*.iml</code></li>
        <li><strong>OS files:</strong> <code>.DS_Store</code> (macOS), <code>Thumbs.db</code> (Windows), <code>*.lnk</code></li>
        <li><strong>Log files:</strong> <code>*.log</code>, <code>logs/</code></li>
        <li><strong>Cache directories:</strong> <code>.cache/</code>, <code>.turbo/</code>, <code>.pytest_cache/</code>, <code>.mypy_cache/</code></li>
        <li><strong>Coverage reports:</strong> <code>coverage/</code>, <code>htmlcov/</code>, <code>.nyc_output/</code></li>
      </ul>
      <p>
        What <em>not</em> to ignore: lock files (<code>package-lock.json</code>, <code>yarn.lock</code>, <code>Cargo.lock</code> for applications, <code>uv.lock</code>), configuration files that control behaviour for all contributors (<code>.eslintrc</code>, <code>tsconfig.json</code>, <code>pyproject.toml</code>), and <code>.env.example</code> which documents required environment variables without values.
      </p>

      <h3>.gitignore Pattern Syntax</h3>
      <p>
        <code>.gitignore</code> uses glob patterns. The key rules:
      </p>
      <ul>
        <li><strong>Blank lines and lines starting with <code>#</code> are ignored</strong> (comments).</li>
        <li><strong>A pattern without a slash matches at any depth:</strong> <code>*.log</code> matches <code>app.log</code>, <code>logs/app.log</code>, and <code>nested/dir/app.log</code>.</li>
        <li><strong>A trailing slash means "directory only":</strong> <code>build/</code> ignores the build directory but not a file named <code>build</code>.</li>
        <li><strong>A leading slash anchors to the root:</strong> <code>/build</code> ignores only a <code>build</code> entry at the repo root, not <code>src/build</code>.</li>
        <li><strong>Double asterisk matches across directories:</strong> <code>**/logs</code> matches <code>logs</code>, <code>a/logs</code>, <code>a/b/logs</code> at any depth. <code>src/**/*.test.js</code> matches any <code>.test.js</code> file anywhere inside <code>src/</code>.</li>
        <li><strong>A leading <code>!</code> negates a pattern</strong> (re-includes a file): <code>*.env</code> then <code>!.env.example</code> ignores all <code>.env</code> files except the example.</li>
        <li><strong>Ranges in brackets:</strong> <code>[abc]</code> matches <code>a</code>, <code>b</code>, or <code>c</code>. <code>[0-9]</code> matches any digit.</li>
      </ul>
      <p>
        Pitfall: if a directory is ignored, you cannot re-include files inside it with <code>!</code>. Git stops descending into ignored directories for performance. To selectively track files inside an otherwise-ignored directory, ignore only specific files rather than the parent directory.
      </p>

      <h3>Priority and Multiple .gitignore Files</h3>
      <p>
        Git evaluates ignore rules from multiple sources, in order of precedence (higher overrides lower):
      </p>
      <ol>
        <li><strong>Command-line flags:</strong> <code>git add --force</code> overrides all ignore rules.</li>
        <li><strong>Patterns in <code>.gitignore</code> in the current and parent directories:</strong> A pattern in a subdirectory's <code>.gitignore</code> only applies within that subdirectory.</li>
        <li><strong>Global gitignore:</strong> <code>~/.gitignore_global</code> (or the path in <code>core.excludesFile</code> config). Apply OS/editor rules here so you don't have to add them to every project.</li>
        <li><strong><code>.git/info/exclude</code>:</strong> Per-repository rules that are not tracked by Git. Useful for personal editor settings in a shared repo where you don't want to add IDE rules to the project's <code>.gitignore</code>.</li>
      </ol>
      <p>
        To set up a global gitignore:
      </p>
      <pre><code>{`# Create and register a global gitignore
touch ~/.gitignore_global
git config --global core.excludesFile ~/.gitignore_global

# Add macOS rules
echo ".DS_Store" >> ~/.gitignore_global
echo "*.swp" >> ~/.gitignore_global`}</code></pre>

      <h3>Handling Already-Tracked Files</h3>
      <p>
        Adding a rule to <code>.gitignore</code> does not affect files that are already tracked by Git. If you committed <code>node_modules/</code> before adding the ignore rule, Git still tracks those files. To fix this:
      </p>
      <pre><code>{`# Stop tracking the directory but keep it locally
git rm --cached -r node_modules/

# Or for a single file
git rm --cached .env

# Then commit the removal
git commit -m "Remove node_modules from tracking"

# Now the .gitignore rule will apply to future changes`}</code></pre>
      <p>
        Be careful: <code>git rm --cached</code> removes the file from Git's index (the snapshot that will be committed) but leaves the file on your local disk. Other contributors who pull this commit will have the file removed from their working directories too, which is usually the desired behaviour.
      </p>

      <h3>Debugging .gitignore: git check-ignore</h3>
      <p>
        When a file is being unexpectedly ignored (or not ignored), use <code>git check-ignore</code> to diagnose:
      </p>
      <pre><code>{`# Check if a file is ignored and why
git check-ignore -v path/to/file.txt

# Output: .gitignore:15:*.txt  path/to/file.txt
# Means: line 15 of .gitignore, pattern *.txt, matches this file

# Check all files in a directory
git check-ignore -v **/*`}</code></pre>
      <p>
        Another useful command: <code>git status --ignored</code> shows ignored files alongside untracked and modified files, which is helpful for auditing a repository's state.
      </p>

      <h3>Language and Framework-Specific Strategies</h3>
      <p>
        <strong>Node.js / npm:</strong> Always ignore <code>node_modules/</code>. Commit <code>package-lock.json</code> or <code>yarn.lock</code> or <code>pnpm-lock.yaml</code> for applications (for reproducible installs). Libraries should not commit lock files (they would conflict with consumers' dependency resolution). Ignore <code>.env</code> but commit <code>.env.example</code>. Also ignore <code>.npm/</code>, <code>.pnpm-store/</code>, and <code>.turbo/</code> if using Turborepo.
      </p>
      <p>
        <strong>Python:</strong> Ignore <code>__pycache__/</code>, <code>*.pyc</code>, <code>*.pyo</code>, <code>.venv/</code> (or <code>venv/</code>, <code>env/</code> — use a consistent naming convention). For Django: ignore <code>local_settings.py</code>, <code>db.sqlite3</code>, <code>media/</code>. Ignore <code>.mypy_cache/</code>, <code>.ruff_cache/</code>, <code>.pytest_cache/</code>, and <code>htmlcov/</code>. Commit <code>uv.lock</code> or <code>requirements.txt</code> (generated via <code>pip freeze</code> or <code>uv export</code>).
      </p>
      <p>
        <strong>Java / Maven / Gradle:</strong> Ignore <code>target/</code> (Maven build output), <code>.gradle/</code>, <code>build/</code> (Gradle). Commit <code>gradlew</code>, <code>gradlew.bat</code>, and the <code>gradle/wrapper/</code> directory — these are checked-in toolchain definitions, not generated. Ignore IDE files (<code>.idea/</code>, <code>*.iml</code>) unless your team standardises on a specific IDE configuration.
      </p>
      <p>
        <strong>Go:</strong> Go modules are relatively clean — ignore <code>*.exe</code>, <code>*.test</code>, <code>*.out</code>, and <code>vendor/</code> if you use <code>go mod vendor</code>. Commit <code>go.sum</code>. The <code>go.work</code> file for Go workspaces should typically be ignored unless the entire workspace is being tracked together.
      </p>
      <p>
        <strong>Rust:</strong> Ignore <code>target/</code> (the build directory, which can be several GB). For applications, commit <code>Cargo.lock</code>; for libraries, conventionally do not commit it (let consumers determine dependency versions). Ignore <code>*.pdb</code> (debug symbols on Windows).
      </p>

      <h3>Monorepo Considerations</h3>
      <p>
        In a monorepo (a single repository containing multiple packages or services), <code>.gitignore</code> strategy requires additional thought:
      </p>
      <ul>
        <li><strong>Root .gitignore:</strong> Add global rules that apply everywhere — OS files, common editor files, shared build artifacts.</li>
        <li><strong>Package-level .gitignore:</strong> Each package can have its own <code>.gitignore</code> for package-specific outputs. Rules in a subdirectory only apply within that subdirectory.</li>
        <li><strong>Don't duplicate:</strong> If a rule already exists at the root level, you don't need to repeat it in package-level files.</li>
        <li><strong>Turborepo / Nx:</strong> Both tools have specific cache directories (<code>.turbo/</code>, <code>.nx/cache/</code>) that should be ignored.</li>
      </ul>

      <h3>Secrets and .gitignore</h3>
      <p>
        A critical misconception: <strong><code>.gitignore</code> is not a security tool</strong>. It prevents files from being staged, but it provides no guarantee that secrets won't be committed. If you accidentally commit a secret, it remains in git history — even after adding a <code>.gitignore</code> rule and committing the deletion.
      </p>
      <p>
        To remove a secret from git history:
      </p>
      <ul>
        <li><strong>git-filter-repo</strong> (recommended): <code>git filter-repo --path .env --invert-paths</code> — rewrites history to remove all occurrences of the file.</li>
        <li><strong>BFG Repo Cleaner:</strong> <code>bfg --delete-files .env</code> — a faster alternative to git filter-branch for large repositories.</li>
        <li><strong>Rotate the secret immediately:</strong> Assume the secret is compromised the moment it appears in a commit, even briefly. History-rewriting is not sufficient if the remote was pushed — the secret was visible to anyone with access during that window.</li>
      </ul>
      <p>
        Best practice: use a secrets scanner (git-secrets, truffleHog, Gitleaks) as a pre-commit hook or CI check to catch credentials before they are committed.
      </p>
      <pre><code>{`# Install gitleaks pre-commit hook
gitleaks protect --staged --config .gitleaks.toml`}</code></pre>

      <h3>The GitHub Gitignore Template Repository</h3>
      <p>
        GitHub maintains an official collection of <code>.gitignore</code> templates at <code>github.com/github/gitignore</code>. These templates are:
      </p>
      <ul>
        <li>Community-maintained and regularly updated as ecosystems evolve</li>
        <li>Used automatically when you create a new repository on GitHub (the "Add .gitignore" dropdown)</li>
        <li>Available via the GitHub API for programmatic generation</li>
      </ul>
      <p>
        The templates in this generator are derived from and compatible with those official templates, with additions for modern tooling (pnpm, Bun, Vite, Turborepo, uv, Ruff). When new tooling becomes common, templates are updated accordingly.
      </p>

      <h3>Checking In vs. Global Ignore: IDE Files</h3>
      <p>
        Whether to commit IDE-specific files is a team decision with valid arguments on both sides:
      </p>
      <p>
        <strong>Arguments for committing (e.g. <code>.vscode/settings.json</code>):</strong> Ensures consistent editor settings across the team (tab size, format on save, recommended extensions). New contributors get the right setup immediately.
      </p>
      <p>
        <strong>Arguments against:</strong> Forces a specific IDE on contributors, causes merge conflicts when settings diverge, pollutes the repository with non-project files.
      </p>
      <p>
        A common compromise: commit <em>project-specific</em> VS Code settings (recommended extensions, format-on-save, ESLint integration) but keep personal preferences in your global gitignore. Use <code>!.vscode/settings.json</code> to allow committing that specific file while ignoring the rest of <code>.vscode/</code>:
      </p>
      <pre><code>{`.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
!.vscode/tasks.json`}</code></pre>
    </div>
  );
}
