import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is bcrypt and why is it used for passwords?',
    a: 'Bcrypt is a password hashing function based on the Blowfish cipher, designed in 1999 by Niels Provos and David Mazières. Unlike fast hash functions like SHA-256 (which can compute billions of hashes per second), bcrypt is intentionally slow — making brute-force attacks impractical. It also incorporates a random salt automatically, preventing rainbow table attacks. Bcrypt remains one of the most widely recommended password hashing algorithms.',
  },
  {
    q: 'What does the cost factor mean?',
    a: 'The cost factor (also called work factor or log rounds) determines how many iterations bcrypt performs internally. The number of rounds is 2^cost — so cost 10 means 1,024 rounds, cost 12 means 4,096 rounds, and cost 14 means 16,384 rounds. Higher cost = slower hashing = harder to brute-force. OWASP recommends a minimum cost of 10 for production systems, with 12 being a common choice in 2024–2025.',
  },
  {
    q: 'What cost factor should I use in production?',
    a: 'Choose the highest cost that keeps hashing time under your acceptable threshold — typically 250–500 ms per hash for login endpoints. On modern hardware, cost 10 takes ~100 ms, cost 12 takes ~300 ms, and cost 14 takes ~1–2 seconds. Start at 10 and benchmark on your production hardware. You can increase the cost over time as hardware gets faster — just rehash passwords on next successful login.',
  },
  {
    q: 'What do the parts of a bcrypt hash mean?',
    a: 'A bcrypt hash like $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy has four parts separated by $: the algorithm identifier (2a), the cost factor (10), a 22-character Base64-encoded salt (N9qo8uLOickgx2ZMRZoMye), and the 31-character Base64-encoded hash output (IjZAgcfl7p92ldGxad68LJZdL17lhWy). The total is always exactly 60 characters.',
  },
  {
    q: 'Is bcrypt still secure in 2025?',
    a: 'Yes, bcrypt remains a secure and OWASP-recommended choice for password hashing. However, for new projects, OWASP now recommends Argon2id as the primary choice because it offers better resistance to GPU-based attacks and side-channel attacks. Bcrypt is still the standard in many frameworks (Rails, Django, Laravel, Spring Security) and is perfectly acceptable — there is no urgent need to migrate existing systems from bcrypt to Argon2id.',
  },
  {
    q: 'What is the difference between bcrypt, scrypt, and Argon2?',
    a: 'All three are slow password hashing algorithms designed to resist brute-force attacks. Bcrypt (1999) is CPU-hard — it resists CPU-based attacks but is vulnerable to GPU parallelism. Scrypt (2009) adds memory-hardness, making GPU attacks more expensive. Argon2id (2015, winner of the Password Hashing Competition) is both CPU-hard and memory-hard with tunable parallelism, and is currently the OWASP top recommendation for new projects.',
  },
  {
    q: 'Is my password safe when using this tool?',
    a: 'Yes. All hashing and verification runs locally in your browser using JavaScript. Your password is never sent to any server, never stored, and never logged. You can verify this by disconnecting from the internet and using the tool offline — it will work identically.',
  },
  {
    q: 'Why does the same password produce a different hash each time?',
    a: 'Because bcrypt generates a random 128-bit salt for each hash operation. The salt is embedded in the output hash string, so verification still works — bcrypt extracts the salt from the stored hash and uses it to re-hash the input password for comparison. This means even identical passwords stored for different users produce completely different hash strings, preventing attackers from spotting duplicate passwords.',
  },
];

export const sidebarInfo = [
  { label: 'Algorithm',     value: 'Blowfish-based (2a/2b)' },
  { label: 'Output length',  value: '60 characters' },
  { label: 'Salt',           value: '128-bit, auto-generated' },
  { label: 'Default cost',   value: '10 (1,024 rounds)' },
];
