import { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'Are the generated API keys cryptographically secure?',
    a: 'Yes. All keys are generated using the Web Crypto API (crypto.getRandomValues() and crypto.randomUUID()), which uses the operating system\'s CSPRNG — the same entropy source used for TLS keys and SSH keys. Keys generated here are safe to use in production as API secrets.',
  },
  {
    q: 'Which API key format should I use?',
    a: 'Use Prefixed format when you want Stripe-style keys (sk_live_..., pk_test_...) that are immediately identifiable and can be scanned for in code. Use UUID v4 for distributed systems where UUID compatibility matters. Use Hex 64 or Base64url for maximum entropy in a compact format. Hex 32 is a good choice for keys that will appear in URLs or headers.',
  },
  {
    q: 'What is a prefixed API key and why use prefixes?',
    a: 'A prefixed key has a short identifier before the random part, like sk_a1b2c3... (secret key) or pk_a1b2c3... (public key). Prefixes serve three purposes: they identify the key type at a glance, they allow scanning tools to detect accidentally committed keys in source code (GitHub has built-in scanning for many prefixes), and they enable users to distinguish between test and production keys.',
  },
  {
    q: 'How do I store API keys securely in my application?',
    a: 'Never hardcode API keys in source code. Use environment variables (.env files) locally and a secrets manager (AWS Secrets Manager, HashiCorp Vault, Doppler, Infisical) in production. Add .env to .gitignore and use pre-commit hooks to scan for leaked secrets. In the database, store a hashed version of the key for lookups — never the plaintext key.',
  },
  {
    q: 'Should I hash API keys before storing them in a database?',
    a: 'Yes, for production systems. Store a SHA-256 hash of the key in the database, not the plaintext. Show the full key to the user exactly once (at creation time) and prompt them to save it. On subsequent API requests, hash the received key and compare to the stored hash. This means a database breach does not expose usable keys. GitHub, Stripe, and most major API providers follow this pattern.',
  },
  {
    q: 'How often should I rotate API keys?',
    a: 'Rotate API keys: immediately if they are suspected to be compromised, when a team member with access leaves, and as part of regular security reviews (every 90–180 days for sensitive keys). Use key rotation strategies that allow both old and new keys to work simultaneously during the transition period, then revoke the old key after confirming the new one is in use.',
  },
  {
    q: 'What is the difference between a public key and a secret key in API authentication?',
    a: 'In split-key schemes (like Stripe): a publishable/public key (pk_...) identifies your account and can safely appear in client-side JavaScript. A secret key (sk_...) authorizes privileged operations and must only appear on your server. This is not the same as asymmetric cryptography — both keys in this context are random strings, just with different permission levels.',
  },
  {
    q: 'How do I implement API key authentication in my application?',
    a: 'Standard implementation: 1) Generate a secure random key (32+ bytes). 2) Show the full key to the user once. 3) Store SHA-256(key) in the database with associated user ID and permissions. 4) Accept the key in an Authorization header (Bearer <key>) or X-API-Key header. 5) On each request, SHA-256 hash the received key and look it up in the database. 6) Check rate limits, expiry, and permissions before processing the request.',
  },
];

export const sidebarFeatures = [
  { label: '5 key formats',        desc: 'Prefixed, UUID v4, Hex 32, Hex 64, Base64url — pick your style.', color: 'var(--green)', bg: 'var(--green-lt)' },
  { label: 'Custom prefix',        desc: 'Stripe-style sk_, pk_, api_, live_ — any prefix you need.', color: 'var(--blue)',  bg: 'var(--blue-lt)'  },
  { label: 'Bulk generation',      desc: 'Generate up to 20 keys at once for test fixtures or seeding.', color: 'var(--amber)', bg: 'var(--amber-lt)' },
  { label: 'Zero data collection', desc: 'Generated in your browser. No keys are ever stored or transmitted.', color: 'var(--ink-2)', bg: 'var(--border)'   },
];
