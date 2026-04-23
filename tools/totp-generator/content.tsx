export default function TotpGeneratorContent() {
  const h2   = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)' as const, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 };
  const p    = { fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 } as const;
  const h3   = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--ink)', marginBottom: 8, marginTop: 20 } as const;
  const code = { fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 } as const;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>

      {/* ── How TOTP works ────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>How TOTP works — the RFC 6238 algorithm step by step</h2>
        <p style={p}>
          <strong style={{ color: 'var(--ink)' }}>TOTP (Time-based One-Time Password)</strong> is an open standard (RFC 6238) for generating short-lived authentication codes that require no network communication between the authenticator and the server. When you scan a QR code to add an account to an authenticator app, both the server and your app receive the same <strong style={{ color: 'var(--ink)' }}>shared secret</strong> — a random sequence of bytes encoded in Base32 (the uppercase alphabet A–Z plus digits 2–7). From that moment forward, they can independently generate the same codes on demand.
        </p>
        <p style={p}>
          The algorithm works in three steps. First, divide the current Unix timestamp (seconds since January 1, 1970 UTC) by the time period (usually 30) and round down — this produces the <strong style={{ color: 'var(--ink)' }}>time counter</strong>. Second, compute <strong style={{ color: 'var(--ink)' }}>HMAC-SHA1</strong> (or SHA-256/SHA-512 in newer deployments) of the counter represented as an 8-byte big-endian integer, using the secret as the HMAC key — this produces a 20-byte hash digest. Third, apply <strong style={{ color: 'var(--ink)' }}>dynamic truncation</strong>: take the last nibble (4 bits) of the HMAC as an offset, extract 4 bytes starting at that offset, mask the high bit to avoid sign issues, and take the result modulo 10⁶ to produce a 6-digit code.
        </p>
        <p style={p}>
          Because both the server and your app perform these same three steps simultaneously using the same secret and the same clock, they always arrive at the same 6-digit number — without any network round-trip required to validate. The code changes every 30 seconds regardless of whether it has been used. Most servers accept codes from the previous and next time window (±30 seconds) to accommodate slight clock drift between devices.
        </p>
        <p style={p}>
          This tool implements the algorithm using the <strong style={{ color: 'var(--ink)' }}>Web Crypto API</strong> — a native browser API available in every modern browser since 2015. Your secret key never leaves your device, never touches a server, and is not stored in localStorage or any other persistent storage. You can verify this by loading the page, disconnecting from the internet, and confirming the codes still refresh correctly.
        </p>
      </section>

      {/* ── TOTP vs HOTP vs SMS ───────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>TOTP vs HOTP vs SMS — understanding 2FA methods</h2>
        <p style={p}>
          Two-factor authentication (2FA) broadly means requiring a second proof of identity beyond the password. Several different OTP mechanisms exist, each with different security profiles, convenience trade-offs, and failure modes.
        </p>

        <h3 style={h3}>TOTP (Time-based OTP, RFC 6238)</h3>
        <p style={p}>
          Uses the current time divided by the period as the counter. Codes expire automatically even if unused — there is no state to synchronise between client and server. No network connectivity required to generate codes. Codes are valid for one time period on both sides (typically ±1 window). TOTP is the most widely deployed consumer 2FA mechanism, supported by Google, GitHub, AWS, Cloudflare, Binance, and thousands of other services.
        </p>

        <h3 style={h3}>HOTP (HMAC-based OTP, RFC 4226)</h3>
        <p style={p}>
          Uses a monotonically incrementing counter instead of time. The server and client advance the counter with each successful authentication. HOTP codes do not expire — they are valid indefinitely until used, which is both a convenience feature (no time pressure) and a security risk (a stolen code can be replayed until the server uses it). Counter drift is the main operational challenge: if codes are generated but not presented to the server, the client counter advances while the server's expectation does not, eventually causing authentication failure. HOTP appears in some hardware tokens (RSA SecurID, YubiKey OTP) and older enterprise deployments.
        </p>

        <h3 style={h3}>SMS OTP</h3>
        <p style={p}>
          Sends a one-time code to your phone via text message. Easy to use — no app, no setup, no secret to manage. However, SMS OTP is significantly weaker than TOTP: it is vulnerable to SIM-swapping attacks (criminals convince carriers to transfer your number to a SIM they control), SS7 network interception (a known vulnerability in the telephone signalling protocol used by carriers), and social engineering (impersonating the carrier to claim the number). NIST SP 800-63-3 (2017) deprecated SMS as a standalone 2FA method for federal systems. SMS OTP is far better than no 2FA, but should be replaced with TOTP or hardware keys wherever possible.
        </p>

        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['Method', 'Standard', 'Offline', 'Phishing resistant', 'SIM-swap safe', 'Recommended'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['TOTP',          'RFC 6238',    '✓', '✗ (real-time relay possible)', '✓', '✓ Yes'],
                ['HOTP',          'RFC 4226',    '✓', '✗',                            '✓', '⚠ Limited'],
                ['SMS OTP',       'None',        '✗', '✗',                            '✗', '✗ Avoid'],
                ['FIDO2/WebAuthn','W3C + FIDO2', '✓', '✓ (origin-bound)',             '✓', '✓ Best'],
              ].map(([method, std, offline, phish, sim, rec], i) => (
                <tr key={method} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{method}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--ink-3)' }}>{std}</td>
                  <td style={{ padding: '10px 14px', fontSize: 13, color: offline === '✓' ? 'var(--green)' : 'var(--red)' }}>{offline}</td>
                  <td style={{ padding: '10px 14px', fontSize: 12, color: phish.startsWith('✓') ? 'var(--green)' : 'var(--red)' }}>{phish}</td>
                  <td style={{ padding: '10px 14px', fontSize: 13, color: sim === '✓' ? 'var(--green)' : 'var(--red)' }}>{sim}</td>
                  <td style={{ padding: '10px 14px', fontSize: 12, fontWeight: 600, color: rec.startsWith('✓') ? 'var(--green)' : rec.startsWith('⚠') ? 'var(--amber)' : 'var(--red)' }}>{rec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Authenticator apps compared ───────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Authenticator apps compared — which one should you use?</h2>
        <p style={p}>
          All TOTP authenticator apps generate identical codes from the same secret — the algorithm is fully standardised. The differences are in backup, sync, export, platform support, and security model. Choosing the right app affects your recovery options when a device is lost.
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['App', 'Platforms', 'Cloud backup', 'Export', 'Open source'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Google Authenticator', 'iOS, Android',        'Google Account (2023+, encrypted)', 'Yes (to Google Account)',  '✗'],
                ['Authy',               'iOS, Android, Desktop','Authy cloud (encrypted)',            'Limited',                  '✗'],
                ['Microsoft Authenticator','iOS, Android',      'Microsoft Account (encrypted)',       'Yes (to same MS account)', '✗'],
                ['Aegis (Android)',      'Android only',         'Self-hosted file (encrypted)',        'Yes (JSON/URI)',           '✓'],
                ['Raivo (iOS)',          'iOS only',             'iCloud (encrypted)',                  'Yes (OTP Auth format)',    '✓'],
                ['Bitwarden Authenticator','iOS, Android',      'Bitwarden cloud (E2E encrypted)',    'Yes (JSON)',               '✓'],
                ['1Password',           'All platforms',         '1Password cloud (E2E encrypted)',    'Yes',                     '✗'],
                ['KeePassXC',           'Desktop (all OS)',      'Local only (KeePass db)',             'Yes (CSV/JSON)',           '✓'],
              ].map(([app, platforms, backup, exp, oss], i) => (
                <tr key={app} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{app}</td>
                  <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--ink-3)' }}>{platforms}</td>
                  <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--ink-2)' }}>{backup}</td>
                  <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--ink-2)' }}>{exp}</td>
                  <td style={{ padding: '10px 14px', fontSize: 13, color: oss === '✓' ? 'var(--green)' : 'var(--ink-4)' }}>{oss}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={p}>
          For maximum recoverability, choose an app that supports both encrypted cloud backup and local export (Aegis for Android, Raivo or Bitwarden for iOS). For teams and enterprises, 1Password and Bitwarden both integrate TOTP into a password manager workflow, keeping codes and passwords in a single audited vault.
        </p>
      </section>

      {/* ── Setting up TOTP ───────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Setting up TOTP for a service — step by step</h2>
        <p style={p}>
          Enabling TOTP on an account is a one-time process that takes about two minutes. Here is the standard flow used by nearly every service that supports TOTP:
        </p>
        <ol style={{ paddingLeft: 20, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { n: '1', title: 'Navigate to two-factor authentication settings', desc: 'Usually found under Account → Security → Two-Factor Authentication. Some services call it "Authenticator app," "TOTP," or "2-step verification."' },
            { n: '2', title: 'Choose "Authenticator app" (not SMS)', desc: 'Select the authenticator app option — not SMS. The service generates a TOTP secret and shows it as a QR code.' },
            { n: '3', title: 'Save the secret key', desc: 'Before scanning the QR code, look for a "Can\'t scan? Show the text key" option. Copy this Base32 secret and save it securely in your password manager. This is your recovery key if you lose your phone.' },
            { n: '4', title: 'Scan the QR code with your authenticator app', desc: 'Open your authenticator app, tap "Add account" or "+", then scan the QR code. The app now generates valid codes.' },
            { n: '5', title: 'Verify with a current code', desc: 'The service will ask you to enter a code from the app to confirm setup worked. Enter the current 6-digit code shown in your app.' },
            { n: '6', title: 'Save backup codes', desc: 'After enabling TOTP, the service provides one-time backup codes. Store these in your password manager in a different vault or print them. They are your emergency access if you lose your device.' },
          ].map(({ n, title, desc }) => (
            <li key={n} style={{ display: 'flex', gap: 14, listStyle: 'none' }}>
              <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--bg-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{n}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6 }}>{desc}</div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Backup and recovery ───────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>TOTP backup and recovery — never get locked out</h2>
        <p style={p}>
          The most common TOTP disaster is losing access to your authenticator app — through a lost phone, a factory reset, or a broken device — and finding yourself locked out of accounts. The correct preventive measures:
        </p>

        <h3 style={h3}>Save the raw secret</h3>
        <p style={p}>
          When setting up TOTP, always save the text representation of the secret (the Base32 string shown under or beside the QR code). Store it in your password manager alongside the account credentials. With the raw secret, you can re-add the account to any authenticator on any device at any time — no customer support needed.
        </p>

        <h3 style={h3}>Use an authenticator with encrypted backup</h3>
        <p style={p}>
          Authy, 1Password, Bitwarden Authenticator, and Microsoft Authenticator all offer encrypted cloud sync. If your phone is lost, reinstall the app on a new device, log into your account, and your TOTP secrets are restored. Aegis (Android) lets you export an encrypted backup file and store it in Google Drive or another cloud service under your control.
        </p>

        <h3 style={h3}>Register multiple devices</h3>
        <p style={p}>
          Adding the same TOTP secret to two devices (e.g., your phone and a tablet) means both generate identical codes simultaneously. Losing one device does not lock you out — the other still works. This is the simplest recovery strategy that requires no additional software or cloud accounts.
        </p>

        <h3 style={h3}>Store backup codes securely</h3>
        <p style={p}>
          Most services provide 8–16 one-time backup codes when you enable 2FA. Each code can only be used once. Store them in your password manager in a separate vault from the TOTP secret itself, or print them and keep them in a physically secure location. Backup codes are the last resort when all other 2FA methods are unavailable — treat them like a skeleton key.
        </p>
      </section>

      {/* ── Developer use cases ───────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Implementing TOTP in your own application</h2>
        <p style={p}>
          If you are building a service that needs TOTP-based 2FA, the implementation is straightforward — the algorithm is a thin wrapper around HMAC-SHA1. Libraries exist for every major language.
        </p>

        <h3 style={h3}>Server-side libraries</h3>
        <p style={p}>
          Use battle-tested libraries rather than rolling your own: <code style={code}>pyotp</code> (Python), <code style={code}>notp</code> or <code style={code}>otplib</code> (Node.js), <code style={code}>ROTP</code> (Ruby), <code style={code}>google/google-authenticator-libpam</code> (C). These handle the edge cases of the algorithm correctly — particularly the 64-bit counter encoding and timing window calculations.
        </p>

        <h3 style={h3}>QR code URI format</h3>
        <p style={p}>
          TOTP accounts are transferred via the <code style={code}>otpauth://</code> URI scheme. A full URI looks like: <code style={code}>otpauth://totp/Service%20Name:user%40example.com?secret=BASE32SECRET&issuer=ServiceName&algorithm=SHA1&digits=6&period=30</code>. Encode this URI as a QR code using any QR library to give users a scannable setup code. Include both <code style={code}>issuer</code> and the account name in the label so the authenticator app shows a useful description.
        </p>

        <h3 style={h3}>Security considerations for implementers</h3>
        <p style={p}>
          Always generate secrets with a cryptographically secure random number generator — at least 20 bytes (160 bits) of entropy. Rate-limit code verification attempts (lock after 5–10 failures). Mark each time-window code as used server-side to prevent replay attacks within the same 30-second window. Store secrets encrypted at rest using AES-256-GCM or equivalent; treat them with the same care as password hashes. Provide a secure mechanism for users to regenerate their secret (which invalidates all existing authenticator pairings) and to disable TOTP entirely via backup codes.
        </p>
      </section>

    </div>
  );
}
