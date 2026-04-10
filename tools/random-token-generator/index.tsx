import { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'Is this token generator cryptographically secure?',
    a: 'Yes. All tokens are generated using the Web Crypto API (crypto.getRandomValues()), which uses the operating system\'s cryptographically secure pseudo-random number generator (CSPRNG). This is the same entropy source used by your operating system for TLS keys, SSH keys, and other security-critical operations.',
  },
  {
    q: 'How many bytes should I use for an API secret or session token?',
    a: '32 bytes (256 bits) is the recommended minimum for API secrets, signing keys, and session tokens. This gives 256 bits of entropy — far beyond practical brute-force. 16 bytes (128 bits) is acceptable for shorter-lived tokens like CSRF tokens. Never use less than 16 bytes for security-sensitive tokens.',
  },
  {
    q: 'What is the difference between hex, Base64, and alphanumeric formats?',
    a: 'Hex encodes each byte as two characters (0–9, a–f), producing a string twice the byte count. Base64 encodes 3 bytes as 4 characters using A–Z, a–z, 0–9, +, /. Base64url replaces + with - and / with _ for safe use in URLs and JWTs. Alphanumeric uses only letters and digits — slightly less efficient but universally safe in any context.',
  },
  {
    q: 'Which format should I use for JWT secret keys?',
    a: 'For HS256/HS384/HS512 JWT signing, use a hex or Base64url secret with at least 256 bits of entropy (32 hex bytes = 64 hex characters, or 32 bytes as Base64url). Many JWT libraries accept the raw string directly. For RS256 or ES256, generate a proper RSA or EC key pair instead.',
  },
  {
    q: 'Can I use these tokens as database IDs?',
    a: 'Yes, but consider the trade-offs. Random tokens as IDs are not sortable by creation time (unlike UUID v7 or ULID). For primary keys in high-write databases, this can cause B-tree index fragmentation. For secondary identifiers (public-facing IDs, shareable links, invite codes), random tokens are excellent because they prevent enumeration attacks.',
  },
  {
    q: 'How do I store generated secrets securely in my application?',
    a: 'Store secrets in environment variables, not in source code or config files. Use a secrets manager (AWS Secrets Manager, HashiCorp Vault, Doppler) in production. Never commit secrets to version control — use .gitignore for .env files and tools like git-secrets or gitleaks to scan for accidental commits. Rotate secrets immediately if they are ever exposed.',
  },
  {
    q: 'What is the difference between a token and a password?',
    a: 'A password is chosen by a human (memorable, limited entropy). A token is machine-generated (maximum entropy for its length, no dictionary words). Tokens are used for machine-to-machine authentication where memorability is not required. Tokens should be treated as secrets: never log them, rotate them regularly, and revoke them immediately if compromised.',
  },
  {
    q: 'How do I generate tokens like this in code?',
    a: 'In JavaScript/Node.js: crypto.randomBytes(32).toString("hex"). In Python: secrets.token_hex(32). In Go: crypto/rand.Read(). In PHP: bin2hex(random_bytes(32)). Always use the language\'s cryptographic random module (secrets, crypto/rand) — never Math.random() or random.random() for security tokens.',
  },
];

export const sidebarFeatures = [
  { label: 'CSPRNG-backed',        desc: 'Uses Web Crypto API — the same entropy as your OS for TLS.', color: 'var(--green)', bg: 'var(--green-lt)' },
  { label: 'Multiple formats',     desc: 'Hex, Base64, Base64url, alphanumeric — choose what fits.', color: 'var(--blue)',  bg: 'var(--blue-lt)'  },
  { label: 'Configurable length',  desc: '8 to 256 bytes. Bulk generate up to 20 tokens at once.', color: 'var(--amber)', bg: 'var(--amber-lt)' },
  { label: 'Zero data collection', desc: 'Runs in your browser. Nothing is ever sent to a server.', color: 'var(--ink-2)', bg: 'var(--border)'   },
];
