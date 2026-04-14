import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'tk_consent';
const VERSION     = 1;
const OPEN_EVENT  = 'tk:open-cookie-preferences';

export interface ConsentChoice {
  version:   number;
  decided:   boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

const DEFAULT: ConsentChoice = {
  version:   VERSION,
  decided:   false,
  analytics: false,
  marketing: false,
  updatedAt: '',
};

function read(): ConsentChoice {
  if (typeof window === 'undefined') return DEFAULT;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT;
    const parsed = JSON.parse(raw) as ConsentChoice;
    if (parsed.version !== VERSION) return DEFAULT;
    return parsed;
  } catch {
    return DEFAULT;
  }
}

function write(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
  } catch {}
}

export function openCookiePreferences() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function getConsent(): ConsentChoice {
  return read();
}

export function CookieConsent() {
  const [mounted, setMounted]   = useState(false);
  const [visible, setVisible]   = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    setMounted(true);
    const current = read();
    if (!current.decided) {
      setVisible(true);
    }
    setAnalytics(current.analytics);
    setMarketing(current.marketing);

    const handler = () => {
      const c = read();
      setAnalytics(c.analytics);
      setMarketing(c.marketing);
      setExpanded(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, []);

  if (!mounted || !visible) return null;

  const save = (a: boolean, m: boolean) => {
    const choice: ConsentChoice = {
      version:   VERSION,
      decided:   true,
      analytics: a,
      marketing: m,
      updatedAt: new Date().toISOString(),
    };
    write(choice);
    setVisible(false);
    setExpanded(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('tk:consent-changed', { detail: choice }));
    }
  };

  const acceptAll  = () => save(true,  true);
  const rejectAll  = () => save(false, false);
  const saveCustom = () => save(analytics, marketing);

  return (
      <div
          role="dialog"
          aria-label="Cookie preferences"
          aria-live="polite"
          style={{
            position: 'fixed', left: 12, right: 12, bottom: 12, zIndex: 100,
            background: 'var(--white)', border: '1px solid var(--border-md)',
            borderRadius: 'var(--r-l)', boxShadow: '0 12px 32px rgba(28,26,20,.16), 0 2px 6px rgba(28,26,20,.06)',
            maxWidth: 720, margin: '0 auto', overflow: 'hidden',
          }}
      >
        <div style={{ padding: '18px 20px' }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>
            We respect your privacy
          </p>
          <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: 14 }}>
            Tools on ToolKit run entirely in your browser — we never see your data. We'd like to use optional cookies for anonymous analytics and (in future) affiliate tracking. You choose.{' '}
            <Link href="/cookies" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Learn more</Link>
            {' · '}
            <Link href="/privacy" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Privacy</Link>
          </p>

          {expanded && (
              <div style={{ margin: '10px 0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Row
                    label="Strictly necessary"
                    desc="Required for the site to function. Always on."
                    checked readOnly
                />
                <Row
                    label="Analytics"
                    desc="Anonymous, aggregated usage statistics."
                    checked={analytics}
                    onChange={setAnalytics}
                />
                <Row
                    label="Marketing"
                    desc="Affiliate tracking and (on guide pages) ads."
                    checked={marketing}
                    onChange={setMarketing}
                />
              </div>
          )}

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {!expanded ? (
                <button
                    onClick={() => setExpanded(true)}
                    style={btnSecondary}
                    type="button"
                >
                  Customize
                </button>
            ) : (
                <button
                    onClick={saveCustom}
                    style={btnSecondary}
                    type="button"
                >
                  Save preferences
                </button>
            )}
            <button
                onClick={rejectAll}
                style={btnSecondary}
                type="button"
            >
              Reject all
            </button>
            <button
                onClick={acceptAll}
                style={btnPrimary}
                type="button"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
  );
}

function Row({ label, desc, checked, onChange, readOnly }: {
  label: string; desc: string; checked: boolean; onChange?: (v: boolean) => void; readOnly?: boolean;
}) {
  return (
      <label
          style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            padding: '10px 12px', border: '1px solid var(--border)',
            borderRadius: 'var(--r-m)', background: readOnly ? 'var(--page-bg)' : 'var(--white)',
            cursor: readOnly ? 'default' : 'pointer',
          }}
      >
        <input
            type="checkbox"
            checked={checked}
            disabled={readOnly}
            onChange={e => onChange?.(e.target.checked)}
            style={{ marginTop: 3, cursor: readOnly ? 'not-allowed' : 'pointer', accentColor: 'var(--green)' }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{label}</p>
          <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2, lineHeight: 1.5 }}>{desc}</p>
        </div>
      </label>
  );
}

const btnBase: React.CSSProperties = {
  padding: '8px 14px', borderRadius: 'var(--r-m)', fontSize: 13,
  fontWeight: 600, cursor: 'pointer', border: '1px solid var(--border-md)',
  fontFamily: 'Outfit, sans-serif',
  transition: 'background .12s, color .12s, border-color .12s',
  WebkitTapHighlightColor: 'transparent',
};
const btnSecondary: React.CSSProperties = {
  ...btnBase, background: 'var(--white)', color: 'var(--ink-2)',
};
const btnPrimary: React.CSSProperties = {
  ...btnBase, background: 'var(--ink)', color: 'var(--white)', borderColor: 'var(--ink)',
};
