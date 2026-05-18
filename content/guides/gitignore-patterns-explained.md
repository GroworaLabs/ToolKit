---
title: "gitignore Patterns Explained: What to Exclude and Why"
description: "A practical guide to writing effective .gitignore rules — pattern syntax, what to always exclude, common mistakes, and how to generate a complete .gitignore for your stack."
category: "Developer Tools"
tools: ["gitignore-generator"]
tags: ["git", "version control", "workflow", "devops"]
publishedAt: "2026-05-18"
author: "olivia-bennett"
---

## What .gitignore Does

Git tracks changes to files in a repository. The `.gitignore` file tells Git which files and directories to intentionally leave untracked. If a path matches a pattern in `.gitignore`, Git will not include it in `git status`, will not suggest adding it with `git add .`, and will not commit it.

A missing or incomplete `.gitignore` is one of the most common mistakes in new repositories. The consequences range from minor inconveniences (local OS metadata files cluttering `git status`) to serious security incidents (committing `.env` files with database passwords or API keys that end up on GitHub).

Getting `.gitignore` right once — at repository creation — prevents an entire class of problems.

---

## Pattern Syntax

`.gitignore` uses a simple glob-like pattern syntax with a few important rules:

**Blank lines are ignored.** You can use them to separate sections for readability.

**Lines starting with `#` are comments.**

```
# Dependency directories
node_modules/
vendor/
```

**A trailing `/` matches only directories**, not files with the same name.

```
build/       # Ignores the build/ directory but not a file named "build"
```

**A leading `/` anchors the pattern to the repository root.**

```
/config.local.json   # Ignores only root-level config.local.json, not nested ones
config.local.json    # Ignores any file named config.local.json anywhere in the tree
```

**A `*` matches anything except a slash.**

```
*.log        # All .log files anywhere
*.min.js     # All minified JavaScript files
```

**A `**` matches any path including slashes** (recursive glob).

```
**/node_modules/     # Ignores node_modules/ at any depth
src/**/*.test.ts     # All .test.ts files anywhere under src/
```

**A leading `!` negates a pattern** — re-includes a previously excluded path.

```
*.env
!.env.example    # Exclude all .env files except .env.example
```

The negation rule is order-dependent: a later `!` rule can un-exclude something a previous `*` matched, but a later `*` rule can re-exclude something a previous `!` un-excluded.

---

## What to Always Exclude

### Secrets and credentials

This is non-negotiable. Any file that contains credentials, secrets, or environment-specific configuration that differs between deployments should never be committed.

```
# Environment variables (all variants)
.env
.env.local
.env.*.local
.env.development
.env.staging
.env.production

# Key files
*.pem
*.key
*.p12
*.pfx
id_rsa
id_ed25519

# Cloud credentials
.aws/
.gcloud/
kubeconfig
```

Committing a `.env` file with a real database password is one of the most common causes of credential leaks on GitHub. Once a credential is in git history, removing it requires a full history rewrite — deleting the file from the working tree is not enough.

**Always commit `.env.example`** — a template of the environment variables the project needs, with placeholder values instead of real ones. This documents required configuration without exposing secrets.

### Dependency directories

Installed packages should never be committed. They are large, reproducible from a lock file, and differ between platforms.

```
# JavaScript / Node.js
node_modules/

# Python
venv/
.venv/
__pycache__/
*.pyc
*.pyo

# Ruby
vendor/bundle/
.bundle/

# PHP (Composer)
vendor/

# Go
# (go modules downloads to GOPATH, not the project)

# Rust
target/
```

### Build output

Compiled artifacts and generated files should be excluded. They are reproducible from source code and often platform-specific.

```
# Common build directories
dist/
build/
out/
.next/
.nuxt/
.output/

# Compiled binaries
*.exe
*.dll
*.so
*.dylib

# Compiled CSS (if generated from Sass/Less)
*.css.map

# Java / Kotlin
*.class
*.jar
*.war
target/

# .NET
bin/
obj/
```

### Editor and OS metadata

Personal editor configuration and OS-generated files have no place in a shared repository.

```
# macOS
.DS_Store
.AppleDouble
.LSOverride

# Windows
Thumbs.db
ehthumbs.db
Desktop.ini
$RECYCLE.BIN/

# Linux
*~

# JetBrains IDEs (IntelliJ, WebStorm, DataGrip, etc.)
.idea/
*.iml

# VS Code (optional — some teams commit .vscode/ for shared settings)
.vscode/
!.vscode/settings.json
!.vscode/extensions.json

# Vim
*.swp
*.swo
[._]*.s[a-v][a-z]
```

Whether to commit `.vscode/settings.json` is a team decision. If your settings include editor-specific format rules or recommended extensions that improve the developer experience, committing them is reasonable. Never commit `.vscode/launch.json` (contains local debug configurations with absolute paths).

### Test coverage and reports

```
coverage/
.nyc_output/
lcov.info
*.lcov
test-results/
playwright-report/
```

---

## Common Mistakes

### Committing a file before adding it to .gitignore

`.gitignore` only affects **untracked** files. If you have already committed `node_modules/` to your repository, adding it to `.gitignore` will not make Git forget it. You need to explicitly remove it from tracking:

```bash
git rm -r --cached node_modules/
git commit -m "Stop tracking node_modules"
```

The `--cached` flag removes the file from the index (tracking) without deleting it from the working directory.

### Trusting global .gitignore alone

Git supports a global `.gitignore` at `~/.config/git/ignore` (or `~/.gitignore_global`). You can use it for personal editor files (`.idea/`, `.DS_Store`) so you don't have to add them to every project. However, you should not rely on collaborators having the same global ignore — project-level `.gitignore` should cover everything the project always wants to exclude.

### Ignoring too broadly

A pattern like `*.json` intended to exclude a config file will silently exclude all JSON files. Use the narrowest pattern that solves the problem:

```
# Bad: too broad
*.json

# Good: only exclude the specific local config
config.local.json
```

### Forgetting nested .gitignore files

`.gitignore` files can exist in any subdirectory and apply to that directory and its descendants. Patterns are relative to the directory containing the file. This is useful for monorepos where different packages have different exclusion needs.

---

## Generating a Complete .gitignore

Starting from scratch with the right patterns for your stack is much faster than hand-writing a `.gitignore`. Use the [.gitignore Generator](/tools/gitignore-generator) to:

1. Select your programming language (JavaScript, TypeScript, Python, Ruby, Go, Rust, Java, etc.)
2. Add your framework (React, Next.js, Django, Rails, Laravel, etc.)
3. Add your editors (VS Code, JetBrains, Vim)
4. Add your OS (macOS, Windows, Linux)
5. Copy or download the merged, deduplicated result

The generator combines the [GitHub-maintained gitignore templates](https://github.com/github/gitignore) for each selected template into a single file, adding section headers so you can identify and customize individual rules.

---

## .gitignore vs .gitkeep vs .gitattributes

Three similarly-named files with completely different purposes:

| File | Purpose |
|---|---|
| `.gitignore` | List of paths Git should not track |
| `.gitkeep` | A conventional placeholder file — Git cannot track empty directories, so a `.gitkeep` file (any name works) is placed inside to allow an otherwise-empty directory to be committed |
| `.gitattributes` | Controls how Git handles file content: line endings (CRLF vs LF), diff drivers, merge strategies, binary file detection |

A `.gitkeep` is simply an empty file — it has no special meaning to Git. The convention exists because teams often want to commit the directory structure (e.g., `logs/`, `uploads/`) without committing actual files.

---

## Verifying Your .gitignore Is Working

After editing `.gitignore`, confirm it is matching correctly:

```bash
# Check if a specific file would be ignored
git check-ignore -v path/to/file

# List all currently ignored files
git status --ignored

# Test a pattern against a file path
git check-ignore -v --no-index .env
```

The `git check-ignore` command shows which `.gitignore` rule matched the path, which is useful for debugging when a file is unexpectedly ignored or unexpectedly tracked.

---

## Removing Accidentally Committed Secrets

If you have committed a secret file before adding it to `.gitignore`, you need to remove it from all history, not just the latest commit:

1. **Change the secret immediately.** Assume the credential is compromised the moment it appeared in any commit, even if the repository is private. Rotate the API key, change the password, revoke the certificate.

2. **Use `git filter-repo`** (the modern replacement for `git filter-branch`) to remove the file from all commits:

```bash
pip install git-filter-repo
git filter-repo --path .env --invert-paths
```

3. **Force-push to all remotes** — this rewrites history and requires coordination with all collaborators who have already cloned the repository.

4. **Add the file to `.gitignore`** immediately after to prevent re-committing it.

The [GitHub documentation on removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository) covers this process in detail, including options for contacting GitHub support to clear cached views of the affected commits.
