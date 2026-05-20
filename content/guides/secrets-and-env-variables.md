---
title: "Managing Secrets and Environment Variables in Node.js and Beyond"
description: "Hardcoded credentials are the single most common cause of credential leaks. This guide covers every layer of secrets management: .env files, secret managers, rotation, and what to do when a key leaks."
category: "Security"
tools: ["api-key-generator", "random-token-generator"]
tags: ["security", "secrets", "environment variables", "node.js", "api keys", "devops", "credentials"]
publishedAt: "2026-05-20"
author: "sophie-larkin"
---

In 2023, a researcher scanning GitHub found 10 million API keys and credentials committed to public repositories. In 2024, the number was higher. The root cause is almost always the same: a developer hardcoded a credential during development, committed it before a `.gitignore` was in place, and the secret was live from that moment forward.

This is not a carelessness problem. It is an infrastructure problem. When your workflow makes it harder to use secrets correctly than to hardcode them, secrets end up hardcoded. This guide fixes the workflow.

---

## The Hierarchy of Secrets Storage

Before any specific tools, the guiding principle: **secrets should live as close to the runtime as possible and as far from source code as possible.**

From worst to best:

| Location | Risk | When to use |
|---|---|---|
| Hardcoded in source | Critical — leaks with every repo clone | Never |
| Committed `.env` file | High — leaks with repo, visible in git history | Never |
| `.env` file, gitignored | Medium — leaks if disk is compromised | Local dev only |
| CI/CD environment variables | Low — access-controlled by platform | CI pipelines |
| Secret manager (Vault, AWS SM, 1Password) | Low — audited, rotatable, access-logged | Production |
| Platform-native injection (Vercel, Railway, Fly.io) | Low — secrets never touch your repo | Production hosting |

---

## Environment Variables: The Foundation

The twelve-factor app methodology established the principle in 2011: **store config in the environment, not the code.** An environment variable is a name-value pair provided to a process at startup by the operating system or runtime.

```bash
# Reading from the environment (Node.js)
const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.STRIPE_SECRET_KEY;

if (!dbUrl) {
  throw new Error('DATABASE_URL is not set');
}
```

Always validate that required environment variables are present at startup rather than letting the app crash mid-request when it first needs them.

**Naming conventions:**

- `SCREAMING_SNAKE_CASE` is universal
- Group related variables with a common prefix: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_PASSWORD`
- Use a consistent prefix for your app's vars to distinguish them from system variables: `MYAPP_JWT_SECRET`, `MYAPP_STRIPE_KEY`

---

## .env Files: Local Development

`.env` files give each developer a local configuration without touching the shell profile. The `dotenv` library (Node.js) or equivalent reads the file and populates `process.env` at startup.

```bash
# .env (never committed to git)
DATABASE_URL=postgres://user:password@localhost:5432/myapp
JWT_SECRET=dev-secret-do-not-use-in-production
STRIPE_SECRET_KEY=sk_test_...
REDIS_URL=redis://localhost:6379
```

```javascript
// Load at the very top of your entry point
require('dotenv').config();
// or in ESM:
import 'dotenv/config';
```

**The `.gitignore` rule that must exist in every project:**

```gitignore
# .gitignore
.env
.env.local
.env.*.local
```

**What should be committed:**

```bash
# .env.example — committed, no real values
DATABASE_URL=
JWT_SECRET=
STRIPE_SECRET_KEY=
REDIS_URL=
```

The `.env.example` file documents what variables the project needs. New team members copy it to `.env` and fill in their local values. Never include real credentials in `.env.example`.

**Multiple environments:**

```
.env               # loaded always (base defaults)
.env.local         # local overrides, gitignored
.env.development   # development-specific, can be committed if no secrets
.env.production    # production-specific, gitignored or not committed
.env.test          # test environment, can be committed if no secrets
```

Dotenv and most frameworks (Next.js, Vite, Create React App) have specific loading order rules for these files. Next.js, for example, loads `.env` → `.env.local` → `.env.[NODE_ENV]` → `.env.[NODE_ENV].local`, with later files overriding earlier ones.

---

## Generating Strong Secrets

A secret is only as strong as the randomness behind it. Common mistakes:

- Using a UUID v4 as an API key (128 bits of entropy — acceptable, but UUIDs are recognisable patterns)
- Using a human-readable passphrase (predictable structure)
- Reusing secrets across environments (one dev leak exposes production)
- Using short secrets for JWT signing (under 256 bits is considered weak)

Use the [API Key Generator](/tools/api-key-generator) to generate formatted API keys for your service — hex, base64, UUID-style, or prefixed formats. Use the [Random Token Generator](/tools/random-token-generator) for JWT secrets, HMAC keys, and session secrets — 256 bits or 512 bits of cryptographic randomness.

For programmatic generation:

```javascript
// Node.js — 32 bytes = 256 bits = 64 hex characters
const { randomBytes } = require('crypto');
const secret = randomBytes(32).toString('hex');
// → 'a3f9b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1'

// For base64url (URL-safe, shorter)
const token = randomBytes(32).toString('base64url');
// → 'o_my2dTl9qe4ydDh8qO0xdbno_KbsMHDtN3j9EqltqE'
```

Never use `Math.random()` for anything security-related. It is not cryptographically random.

---

## Secret Managers: Production-Grade Storage

For production deployments, `.env` files are a last resort, not a best practice. Secret managers provide:

- **Access control** — only the services that need a secret get it
- **Audit logging** — who read which secret and when
- **Rotation** — update a secret without redeploying the app
- **Versioning** — roll back to a previous secret value

**AWS Secrets Manager:**

```javascript
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

const client = new SecretsManagerClient({ region: 'us-east-1' });

async function getSecret(secretName) {
  const response = await client.send(
    new GetSecretValueCommand({ SecretId: secretName })
  );
  return JSON.parse(response.SecretString);
}

// Usage
const { DB_PASSWORD, STRIPE_KEY } = await getSecret('myapp/production');
```

**HashiCorp Vault:**

```bash
# Set a secret
vault kv put secret/myapp/production \
  db_password="..." \
  stripe_key="sk_live_..."

# Read in Node.js via vault HTTP API or node-vault library
```

**Doppler (SaaS, developer-friendly):**

Doppler syncs secrets to your app's environment at runtime — no SDK needed. It integrates with Vercel, Railway, Heroku, Docker, and Kubernetes. Worth considering for teams that want secret management without running Vault infrastructure.

**Platform-native secret injection:**

Most modern hosting platforms let you set environment variables through their dashboard or CLI, and inject them directly into the runtime:

```bash
# Vercel
vercel env add STRIPE_SECRET_KEY production

# Railway
railway variables set STRIPE_SECRET_KEY=sk_live_...

# Fly.io
fly secrets set STRIPE_SECRET_KEY=sk_live_...

# Docker (compose)
services:
  app:
    env_file:
      - .env.production   # never commit this
```

---

## Secret Rotation

Secrets should not live forever. Rotation limits the blast radius of a leak — if a key is compromised but rotated every 90 days, the attacker's window is bounded.

**When to rotate:**

- On a schedule (every 90 days for long-lived credentials)
- When a team member leaves
- When a developer's machine is compromised
- When a secret appears in logs or error messages
- When a repository was accidentally made public (even briefly)

**Zero-downtime rotation:**

The naive approach (delete old key, deploy new key) causes a downtime window. Instead:

1. Generate a new secret.
2. Add it alongside the old secret. Accept both during a transition window.
3. Deploy all services that use the secret with the new value.
4. Remove the old secret from the accepted set.
5. Delete the old secret from your secret manager.

For database passwords, most databases support this with connection pool configuration. For API keys issued to third parties, most providers support multiple active keys simultaneously.

---

## What to Do When a Secret Leaks

If you suspect a secret has been exposed — in logs, in a public repo, in a bug report — treat it as compromised immediately.

**Immediate steps (within minutes):**

1. **Revoke the secret.** Stripe, GitHub, AWS, and most providers have a "revoke" or "delete" button. Do this first, before investigating.
2. **Generate a new secret** and deploy it.
3. **Audit access logs.** Check whether the compromised key was used by anyone other than your own services.

**If it was committed to git:**

Revoking the secret from the provider is enough — rotating makes the committed value useless. But the commit is still in git history. If the repo is public or could become public:

```bash
# Remove a file from entire git history (destructive — coordinate with your team)
git filter-repo --path .env --invert-paths

# Or for a specific file pattern
git filter-repo --path-glob '*.env' --invert-paths
```

`git filter-repo` is the modern replacement for `git filter-branch`. Install it with `pip install git-filter-repo`.

**GitHub secret scanning:**

GitHub automatically scans pushes for known secret patterns (AWS access keys, Stripe keys, GitHub tokens, etc.) and notifies the provider when found. Many providers will auto-revoke a detected key. Enable GitHub Advanced Security's push protection on all repositories to block the push before it reaches `origin`.

---

## Preventing Leaks at the Source

The best mitigation is not letting secrets reach git in the first place.

**pre-commit hook with detect-secrets:**

```bash
pip install detect-secrets
detect-secrets scan > .secrets.baseline
```

```bash
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets
        args: ['--baseline', '.secrets.baseline']
```

**truffleHog (CI scan):**

```yaml
# GitHub Actions
- name: Scan for secrets
  uses: trufflesecurity/trufflehog@main
  with:
    path: ./
    base: ${{ github.event.repository.default_branch }}
    head: HEAD
```

**gitguardian:**

A SaaS that monitors git activity for credentials and sends real-time alerts. Free tier covers public repositories.

---

## Secrets in CI/CD Pipelines

Every CI/CD platform has its own mechanism for injecting secrets into build and deploy jobs. The common principle is the same: secrets are defined once in the platform's secret store and injected as environment variables at runtime — they never appear in the pipeline configuration file that lives in your repository.

**GitHub Actions:**

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          STRIPE_SECRET_KEY: ${{ secrets.STRIPE_SECRET_KEY }}
          JWT_SECRET: ${{ secrets.JWT_SECRET }}
        run: npm run deploy
```

Secrets are set in **Settings → Secrets and variables → Actions** in the repository (or organisation). They are masked in all log output — if a workflow step accidentally prints a secret, GitHub replaces it with `***`. Environment-scoped secrets (staging vs production) are set under **Environments** and only available to jobs that reference that environment.

**GitLab CI/CD:**

```yaml
# .gitlab-ci.yml
deploy:
  stage: deploy
  script:
    - npm run deploy
  variables:
    NODE_ENV: production
  # Secrets from Settings → CI/CD → Variables
  # They are injected automatically — no explicit env: block needed
```

GitLab's **CI/CD Variables** (Settings → CI/CD → Variables) support masking (values hidden in logs), protection (only available on protected branches), and file-type variables (the value is written to a temp file, and the path is injected — useful for certificates or JSON key files).

**Railway / Vercel / Fly.io:**

These platforms expose secrets via their dashboard or CLI. The secrets are available to the running service as environment variables — no pipeline YAML required.

```bash
# Railway
railway variables set DATABASE_URL="postgres://..."

# Vercel (per environment: development, preview, production)
vercel env add DATABASE_URL production

# Fly.io
fly secrets set DATABASE_URL="postgres://..."
```

**What not to do in pipeline files:**

```yaml
# Never do this — the value is in git history forever
env:
  DATABASE_URL: "postgres://user:password@host:5432/db"

# Also avoid this — still hardcoded, just slightly obscured
env:
  DATABASE_URL: "postgres://user:${{ 'p' }}assword@host:5432/db"
```

**Secret scoping by environment.** Most platforms distinguish between development, staging, and production secrets. Use different values for each — never share a production database password with a staging environment. The blast radius of a staging breach should not reach production data.

---

## Auditing Secret Access

Knowing *when* and *who* accessed a secret is as important as keeping it secure. Most secret managers provide access logs; most source code platforms log secret access events.

For AWS Secrets Manager, CloudTrail logs every `GetSecretValue` call with timestamp, IAM principal, and source IP. You can alert on unusual patterns — a service reading a secret it has never accessed before, or access outside business hours.

A minimal Node.js helper that adds context to every secret read:

```javascript
async function getSecret(name, context = {}) {
  console.log(JSON.stringify({
    event: 'secret_read',
    secret: name,
    service: process.env.SERVICE_NAME,
    ...context,
    timestamp: new Date().toISOString(),
  }));
  return secretsManagerClient.getSecretValue(name);
}
```

Structured logs like this feed into CloudWatch, Datadog, or whatever observability stack your team uses, making anomalies detectable without custom instrumentation.

---

## Summary: The Secrets Checklist

- [ ] `.env` in `.gitignore` — verify it before every new project
- [ ] `.env.example` committed with empty values
- [ ] Secrets generated with `crypto.randomBytes` or a dedicated generator — never `Math.random()` or UUIDs
- [ ] Production secrets stored in a secret manager, not a file
- [ ] Secret rotation schedule defined (90 days at minimum)
- [ ] `detect-secrets` or equivalent pre-commit hook active
- [ ] GitHub secret scanning and push protection enabled
- [ ] Incident runbook documented: what to do when a secret leaks
