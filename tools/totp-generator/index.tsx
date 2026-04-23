import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is TOTP and how does it work?',
    a: 'TOTP (Time-based One-Time Password, RFC 6238) generates a short numeric code by combining a shared secret key with the current time. Both the server and your authenticator app independently compute HMAC-SHA1 (or SHA-256) of the current 30-second time window using the same secret. Because the math is deterministic, they produce the same 6-digit code without any network communication. The code changes every 30 seconds and each code can only be used once.',
  },
  {
    q: 'Is TOTP the same as Google Authenticator?',
    a: 'Google Authenticator is an app that implements TOTP (and HOTP). The underlying algorithm is an open standard (RFC 6238), not proprietary to Google. Any TOTP-compatible authenticator — Authy, Microsoft Authenticator, Bitwarden, 1Password, Aegis (Android), Raivo (iOS) — will generate identical codes from the same secret. You are not locked into Google Authenticator.',
  },
  {
    q: 'What is a TOTP secret key and how is it encoded?',
    a: 'A TOTP secret is a random sequence of bytes (typically 16–32 bytes for strong security) encoded in Base32 — the uppercase letters A–Z and digits 2–7. Base32 encoding is used because it avoids characters that are easily confused visually (unlike Base64 which includes 0/O and 1/l). When you scan a QR code to add an account to an authenticator, the secret is embedded in the QR code in a URI like otpauth://totp/service?secret=BASE32SECRET.',
  },
  {
    q: 'What happens when a TOTP code expires?',
    a: 'TOTP codes change every 30 seconds (the standard period). Most server implementations accept codes from the previous and next window (±30 seconds) to account for clock drift. If your device clock is significantly wrong, your TOTP codes will be out of sync with the server. Authenticator apps that support time sync (like Authy) automatically correct for minor drift. For testing, this tool uses your device\'s system time.',
  },
  {
    q: 'What is the difference between TOTP and HOTP?',
    a: 'TOTP (Time-based OTP) uses the current Unix time divided by the period (usually 30 seconds) as the counter. HOTP (HMAC-based OTP, RFC 4226) uses an incrementing counter — the server and client both advance the counter with each authentication. TOTP is more commonly used because time is automatically synchronised; HOTP can drift if the counter gets out of sync (e.g., if codes are generated but not used).',
  },
  {
    q: 'How secure is TOTP for two-factor authentication?',
    a: 'TOTP provides strong protection against password-only attacks because an attacker needs both your password and physical access to your device. However, TOTP is vulnerable to real-time phishing (an attacker proxies the login, relaying your code before it expires) and SIM-swapping (if the backup is SMS). For higher security, prefer hardware security keys (FIDO2/WebAuthn) which are phishing-resistant. TOTP is far better than SMS 2FA.',
  },
  {
    q: 'Can I use a 6-digit vs 8-digit TOTP code?',
    a: 'Both are supported by RFC 6238. Most services use 6 digits (10⁶ = 1,000,000 possible codes per 30-second window), but 8 digits (10⁸ = 100,000,000 possible codes) provide additional security. Rate limiting on the server side is more important than code length — most servers lock accounts after 3–5 failed attempts, making brute-force attacks on 6-digit codes impractical in the allotted time window.',
  },
  {
    q: 'Does this TOTP generator store my secret key?',
    a: 'No. This tool runs entirely in your browser — your secret key never leaves your device and is never sent to a server. The TOTP code is computed using the Web Crypto API (built into every modern browser) directly on the page. You can verify this by disconnecting from the internet and reloading — the tool will still work.',
  },
];

export const sidebarFeatures = [
  { label: 'RFC 6238 compliant',  desc: 'Standard TOTP — works with Google Authenticator, Authy, and any compatible app.', color: 'var(--green)', bg: 'var(--green-lt)' },
  { label: 'SHA-1 / 256 / 512',   desc: 'Choose your HMAC algorithm. SHA-1 is the default; SHA-256/512 for stricter systems.', color: 'var(--blue)',  bg: 'var(--blue-lt)'  },
  { label: 'Auto-refresh',         desc: 'Code and countdown timer update in real time every second.', color: 'var(--amber)', bg: 'var(--amber-lt)' },
  { label: '100% browser-based',   desc: 'Your secret key never leaves your device — computed via Web Crypto API.', color: 'var(--ink-2)', bg: 'var(--border)' },
];
