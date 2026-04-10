import { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is an HMAC and what is it used for?',
    a: 'HMAC (Hash-based Message Authentication Code) is a cryptographic signature that proves a message was created by someone who holds the secret key and that the message has not been altered since it was signed. Common uses: webhook signature verification (Stripe, GitHub), API request authentication, JWT signing with HS256/HS512, and cookie integrity checks.',
  },
  {
    q: 'What is the difference between HMAC-SHA256 and HMAC-SHA512?',
    a: 'Both provide equivalent security for most applications — the difference is digest size and performance. HMAC-SHA256 produces a 32-byte (256-bit) output and is faster on 32-bit systems. HMAC-SHA512 produces a 64-byte (512-bit) output and is faster on 64-bit systems. Choose SHA-256 for compatibility (it is more widely supported) and SHA-512 if you need longer output or are on 64-bit systems.',
  },
  {
    q: 'Is HMAC the same as a hash?',
    a: 'No. A plain hash (SHA-256, MD5) can be computed by anyone without a key — it only proves the data was not accidentally corrupted. An HMAC requires a shared secret key, so only parties with the key can verify or generate valid signatures. This makes HMAC suitable for authentication, whereas plain hashes are only suitable for integrity checks.',
  },
  {
    q: 'How do I verify a webhook using HMAC?',
    a: 'When you receive a webhook: 1) Get the raw request body (before JSON parsing). 2) Compute HMAC-SHA256 of the raw body using the webhook secret as the key. 3) Compare your computed HMAC to the signature in the webhook header (e.g., X-Stripe-Signature, X-Hub-Signature-256). Use a constant-time comparison function to prevent timing attacks. Never compare signatures with == or ===.',
  },
  {
    q: 'Why must I use a constant-time comparison for HMAC verification?',
    a: 'Standard string equality (==) short-circuits as soon as it finds the first mismatched character — the time taken leaks information about how many characters match. An attacker can use this timing difference to guess the correct signature one character at a time. Use crypto.timingSafeEqual() (Node.js) or hmac.compare_digest() (Python) to compare signatures in constant time.',
  },
  {
    q: 'How long should my HMAC secret key be?',
    a: 'The HMAC specification recommends a key at least as long as the hash output. For HMAC-SHA256, use at least 32 bytes (256 bits). For HMAC-SHA512, use at least 64 bytes (512 bits). Use the Random Token Generator tool to create a properly random key. Never use a human-readable word or phrase as an HMAC key — the entropy is too low.',
  },
  {
    q: 'Can I use HMAC to sign JWT tokens?',
    a: 'Yes. The HS256, HS384, and HS512 JWT signing algorithms are all HMAC variants (HS = HMAC-SHA). HS256 uses HMAC-SHA256. When you sign a JWT with a symmetric secret, the "signature" part of the JWT is the Base64url-encoded HMAC of the header and payload. Any party with the secret can both create and verify tokens — use asymmetric algorithms (RS256, ES256) if you need to separate signing from verification.',
  },
  {
    q: 'Is HMAC-SHA256 still considered secure?',
    a: 'Yes, HMAC-SHA256 is currently considered secure and is recommended by NIST. The SHA-256 hash function has no known practical vulnerabilities when used in HMAC mode. SHA-1-based HMAC (HMAC-SHA1) is still technically secure in HMAC mode (unlike bare SHA-1) but should be avoided in new systems due to perception issues and for future-proofing.',
  },
];

export const sidebarFeatures = [
  { label: 'SHA-256 & SHA-512',    desc: 'Both HMAC variants via the Web Crypto SubtleCrypto API.', color: 'var(--green)', bg: 'var(--green-lt)' },
  { label: 'Hex + Base64 output',  desc: 'Both output formats shown simultaneously for convenience.', color: 'var(--blue)',  bg: 'var(--blue-lt)'  },
  { label: 'Live computation',     desc: 'HMAC updates instantly as you type message or key.', color: 'var(--amber)', bg: 'var(--amber-lt)' },
  { label: 'Browser-only',         desc: 'Your message and key never leave your device.', color: 'var(--ink-2)', bg: 'var(--border)'   },
];
