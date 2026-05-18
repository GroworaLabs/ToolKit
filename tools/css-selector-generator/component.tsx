'use client';
import { useState, useCallback } from 'react';

interface ElemInfo {
  key:          number;
  parentKey:    number;
  depth:        number;
  tag:          string;
  id:           string;
  classes:      string[];
  testId:       string;
  role:         string;
  ariaLabel:    string;
  text:         string;
  placeholder:  string;
  alt:          string;
  title:        string;
  type:         string;
  name:         string;
  forAttr:      string;
  nthOfType:    number;
  totalOfType:  number;
}

interface Selector {
  framework: 'playwright' | 'css' | 'xpath' | 'cypress' | 'selenium';
  label:     string;
  value:     string;
  quality:   'best' | 'good' | 'ok' | 'fragile';
  reason:    string;
}

const EXAMPLE_HTML = `<form id="login-form" action="/login" method="post">
  <div class="form-group">
    <label for="email">Email address</label>
    <input
      id="email"
      type="email"
      name="email"
      placeholder="Enter your email"
      data-testid="email-input"
      required
    />
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input
      id="password"
      type="password"
      name="password"
      placeholder="Enter password"
      required
    />
  </div>
  <div class="form-actions">
    <button type="submit" class="btn btn-primary" data-testid="login-btn">
      Sign in
    </button>
    <a href="/forgot-password" class="link-secondary">Forgot password?</a>
  </div>
</form>`;

function parseHTML(html: string): ElemInfo[] {
  const result: ElemInfo[] = [];
  let key = 0;

  const doc = new DOMParser().parseFromString(html, 'text/html');

  function walk(node: Element, depth: number, parentKey: number) {
    const k = key++;
    const tag = node.tagName.toLowerCase();

    let text = '';
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) text += child.textContent ?? '';
    }
    text = text.trim().slice(0, 60);

    const siblings = node.parentElement
      ? Array.from(node.parentElement.children).filter(s => s.tagName.toLowerCase() === tag)
      : [];
    const nthOfType    = siblings.indexOf(node) + 1;
    const totalOfType  = siblings.length;

    result.push({
      key: k, parentKey, depth, tag,
      id:          node.id || '',
      classes:     Array.from(node.classList),
      testId:      node.getAttribute('data-testid') || node.getAttribute('data-test') || node.getAttribute('data-cy') || '',
      role:        node.getAttribute('role') || '',
      ariaLabel:   node.getAttribute('aria-label') || '',
      text,
      placeholder: node.getAttribute('placeholder') || '',
      alt:         node.getAttribute('alt') || '',
      title:       node.getAttribute('title') || '',
      type:        node.getAttribute('type') || '',
      name:        node.getAttribute('name') || '',
      forAttr:     node.getAttribute('for') || '',
      nthOfType, totalOfType,
    });

    for (const child of Array.from(node.children)) walk(child as Element, depth + 1, k);
  }

  for (const child of Array.from(doc.body.children)) walk(child as Element, 0, -1);
  return result;
}

function esc(s: string) {
  return typeof CSS !== 'undefined' ? CSS.escape(s) : s.replace(/[^\w-]/g, c => `\\${c}`);
}

function getCSSPath(elem: ElemInfo, all: ElemInfo[]): string {
  const parts: string[] = [];
  let cur: ElemInfo | undefined = elem;
  while (cur) {
    if (cur.id) { parts.unshift(`#${esc(cur.id)}`); break; }
    let part = cur.tag;
    if (cur.classes.length > 0) part += cur.classes.map(c => `.${esc(c)}`).join('');
    else if (cur.totalOfType > 1) part += `:nth-of-type(${cur.nthOfType})`;
    parts.unshift(part);
    if (cur.parentKey === -1) break;
    cur = all.find(n => n.key === cur!.parentKey);
  }
  return parts.join(' > ');
}

function getXPath(elem: ElemInfo, all: ElemInfo[]): string {
  const parts: string[] = [];
  let cur: ElemInfo | undefined = elem;
  while (cur) {
    const part = cur.totalOfType > 1 ? `${cur.tag}[${cur.nthOfType}]` : cur.tag;
    parts.unshift(part);
    if (cur.parentKey === -1) break;
    cur = all.find(n => n.key === cur!.parentKey);
  }
  return '//' + parts.join('/');
}

function implicitRole(e: ElemInfo): string {
  if (e.role) return e.role;
  if (e.tag === 'input') {
    const m: Record<string, string> = {
      checkbox: 'checkbox', radio: 'radio', submit: 'button',
      button: 'button', text: 'textbox', email: 'textbox',
      password: 'textbox', search: 'searchbox', tel: 'textbox', url: 'textbox',
    };
    return m[e.type] || 'textbox';
  }
  const m: Record<string, string> = {
    button: 'button', a: 'link', textarea: 'textbox', select: 'combobox',
    h1: 'heading', h2: 'heading', h3: 'heading', h4: 'heading',
    img: 'img', nav: 'navigation', main: 'main', header: 'banner',
    footer: 'contentinfo', form: 'form', table: 'table', li: 'listitem',
    ul: 'list', ol: 'list', checkbox: 'checkbox',
  };
  return m[e.tag] || '';
}

function generateSelectors(elem: ElemInfo, all: ElemInfo[]): Selector[] {
  const out: Selector[] = [];
  const role = implicitRole(elem);
  const labelElem = all.find(e => e.tag === 'label' && e.forAttr && (e.forAttr === elem.id || e.forAttr === elem.name));
  // Accessible name: label text takes priority (actual ARIA computed name), then aria-label, then visible text
  const accessibleName = (labelElem?.text || elem.ariaLabel || elem.text || elem.alt || elem.title).slice(0, 50);
  const name = accessibleName || elem.placeholder.slice(0, 50);

  // ── Playwright ───────────────────────────────────────────────────────────
  if (elem.testId) out.push({ framework: 'playwright', label: 'getByTestId', quality: 'best',
    value: `page.getByTestId('${elem.testId}')`,
    reason: 'Dedicated test attribute — most resilient to UI changes' });

  if (role && accessibleName) out.push({ framework: 'playwright', label: 'getByRole', quality: 'best',
    value: `page.getByRole('${role}', { name: '${accessibleName}' })`,
    reason: 'Semantic role + accessible name — Playwright\'s top recommendation' });

  if (labelElem?.text) out.push({ framework: 'playwright', label: 'getByLabel', quality: 'best',
    value: `page.getByLabel('${labelElem.text}')`,
    reason: 'Label association — ideal for form inputs' });

  if (elem.placeholder) out.push({ framework: 'playwright', label: 'getByPlaceholder', quality: 'good',
    value: `page.getByPlaceholder('${elem.placeholder}')`,
    reason: 'Placeholder text — works but breaks with i18n changes' });

  if (elem.alt) out.push({ framework: 'playwright', label: 'getByAltText', quality: 'good',
    value: `page.getByAltText('${elem.alt}')`,
    reason: 'Alt attribute — reliable for images' });

  if (elem.title) out.push({ framework: 'playwright', label: 'getByTitle', quality: 'good',
    value: `page.getByTitle('${elem.title}')`,
    reason: 'Title attribute — works but often omitted' });

  if (elem.text) out.push({ framework: 'playwright', label: 'getByText', quality: 'ok',
    value: `page.getByText('${elem.text}')`,
    reason: 'Visible text — breaks if text is dynamic or localized' });

  if (elem.id) out.push({ framework: 'playwright', label: 'locator (id)', quality: 'good',
    value: `page.locator('#${elem.id}')`,
    reason: 'ID attribute — unique but may change across environments' });
  else if (elem.classes.length) out.push({ framework: 'playwright', label: 'locator (CSS)', quality: 'ok',
    value: `page.locator('${elem.tag}.${elem.classes[0]}')`,
    reason: 'CSS class — avoid when class is styling-based' });

  // ── CSS selectors ─────────────────────────────────────────────────────────
  if (elem.testId) out.push({ framework: 'css', label: 'data-testid', quality: 'best',
    value: `[data-testid="${elem.testId}"]`,
    reason: 'Dedicated test attribute — preferred by testing teams' });

  if (elem.id) out.push({ framework: 'css', label: 'id', quality: 'good',
    value: `#${elem.id}`,
    reason: 'Unique ID — short and reliable' });

  if (elem.ariaLabel) out.push({ framework: 'css', label: 'aria-label', quality: 'good',
    value: `[aria-label="${elem.ariaLabel}"]`,
    reason: 'Accessibility attribute — doubles as a test hook' });

  if (elem.name) out.push({ framework: 'css', label: 'name', quality: 'good',
    value: `${elem.tag}[name="${elem.name}"]`,
    reason: 'Form name attribute — stable in most apps' });

  if (elem.classes.length) out.push({ framework: 'css', label: 'class', quality: 'ok',
    value: `${elem.tag}${elem.classes.slice(0, 2).map(c => `.${c}`).join('')}`,
    reason: 'CSS class — can match multiple elements, avoid utility classes' });

  const cssPath = getCSSPath(elem, all);
  if (!cssPath.startsWith('#')) out.push({ framework: 'css', label: 'full path', quality: 'fragile',
    value: cssPath,
    reason: 'Structural path — breaks on any DOM restructuring' });

  // ── XPath ──────────────────────────────────────────────────────────────────
  if (elem.testId) out.push({ framework: 'xpath', label: 'by data-testid', quality: 'best',
    value: `//${elem.tag}[@data-testid="${elem.testId}"]`,
    reason: 'Attribute match — same resilience as CSS data-testid' });

  if (elem.id) out.push({ framework: 'xpath', label: 'by id', quality: 'good',
    value: `//*[@id="${elem.id}"]`,
    reason: 'XPath by ID' });

  if (elem.text && elem.text.length < 50) out.push({ framework: 'xpath', label: 'by text', quality: 'ok',
    value: `//${elem.tag}[normalize-space()="${elem.text}"]`,
    reason: 'Exact text match — use contains() for partial' });

  if (elem.text && elem.text.length < 50) out.push({ framework: 'xpath', label: 'contains text', quality: 'ok',
    value: `//${elem.tag}[contains(., "${elem.text}")]`,
    reason: 'Partial text match — more flexible than exact match' });

  out.push({ framework: 'xpath', label: 'absolute path', quality: 'fragile',
    value: getXPath(elem, all),
    reason: 'Absolute path — very fragile, last resort only' });

  // ── Cypress ───────────────────────────────────────────────────────────────
  if (elem.testId) out.push({ framework: 'cypress', label: 'get (data-testid)', quality: 'best',
    value: `cy.get('[data-testid="${elem.testId}"]')`,
    reason: 'Dedicated test attribute — cy.get() with test attr is Cypress best practice' });

  if (elem.id) out.push({ framework: 'cypress', label: 'get (id)', quality: 'good',
    value: `cy.get('#${elem.id}')`,
    reason: 'ID selector — short and reliable' });

  if (elem.name) out.push({ framework: 'cypress', label: 'get (name)', quality: 'good',
    value: `cy.get('${elem.tag}[name="${elem.name}"]')`,
    reason: 'Form name — stable form field selector' });

  if (elem.text) {
    const hasContains = ['button', 'a', 'li', 'td', 'th', 'h1', 'h2', 'h3', 'span', 'p', 'label'].includes(elem.tag);
    if (hasContains) out.push({ framework: 'cypress', label: 'contains', quality: 'ok',
      value: `cy.contains('${elem.tag}', '${elem.text}')`,
      reason: 'Text match — good for buttons/links, breaks if text changes' });
  }

  if (elem.classes.length) out.push({ framework: 'cypress', label: 'get (class)', quality: 'ok',
    value: `cy.get('${elem.tag}.${elem.classes[0]}')`,
    reason: 'CSS class — may match multiple elements' });

  // ── Selenium (Python) ─────────────────────────────────────────────────────
  if (elem.testId) out.push({ framework: 'selenium', label: 'By.CSS_SELECTOR (data-testid)', quality: 'best',
    value: `driver.find_element(By.CSS_SELECTOR, '[data-testid="${elem.testId}"]')`,
    reason: 'Dedicated test attribute — most stable across refactors' });

  if (elem.id) out.push({ framework: 'selenium', label: 'By.ID', quality: 'good',
    value: `driver.find_element(By.ID, '${elem.id}')`,
    reason: 'ID — short and direct; may change across environments' });

  if (elem.name) out.push({ framework: 'selenium', label: 'By.NAME', quality: 'good',
    value: `driver.find_element(By.NAME, '${elem.name}')`,
    reason: 'Form name attribute — stable for input fields' });

  if (elem.ariaLabel) out.push({ framework: 'selenium', label: 'By.CSS_SELECTOR (aria-label)', quality: 'good',
    value: `driver.find_element(By.CSS_SELECTOR, '[aria-label="${elem.ariaLabel}"]')`,
    reason: 'Accessibility attribute — doubles as a reliable test hook' });

  if (elem.tag === 'a' && elem.text) out.push({ framework: 'selenium', label: 'By.LINK_TEXT', quality: 'ok',
    value: `driver.find_element(By.LINK_TEXT, '${elem.text}')`,
    reason: 'Exact link text — breaks if text is localized or changes' });

  if (elem.tag === 'a' && elem.text && elem.text.length > 5) out.push({ framework: 'selenium', label: 'By.PARTIAL_LINK_TEXT', quality: 'ok',
    value: `driver.find_element(By.PARTIAL_LINK_TEXT, '${elem.text.slice(0, Math.ceil(elem.text.length / 2))}')`,
    reason: 'Partial link text — more flexible than exact match' });

  if (elem.classes.length === 1) out.push({ framework: 'selenium', label: 'By.CLASS_NAME', quality: 'ok',
    value: `driver.find_element(By.CLASS_NAME, '${elem.classes[0]}')`,
    reason: 'Single class — use By.CSS_SELECTOR for multiple classes' });

  if (elem.id) out.push({ framework: 'selenium', label: 'By.XPATH (id)', quality: 'good',
    value: `driver.find_element(By.XPATH, '//*[@id="${elem.id}"]')`,
    reason: 'XPath by ID — equivalent to By.ID but composable' });

  if (elem.text && elem.text.length < 50) out.push({ framework: 'selenium', label: 'By.XPATH (text)', quality: 'ok',
    value: `driver.find_element(By.XPATH, '//${elem.tag}[normalize-space()="${elem.text}"]')`,
    reason: 'XPath text match — breaks if text changes' });

  const cssPath2 = getCSSPath(elem, all);
  if (!cssPath2.startsWith('#') && !elem.testId) out.push({ framework: 'selenium', label: 'By.CSS_SELECTOR (path)', quality: 'fragile',
    value: `driver.find_element(By.CSS_SELECTOR, '${cssPath2}')`,
    reason: 'Structural CSS path — breaks on any DOM restructuring' });

  return out;
}

// ── Quality badge config ──────────────────────────────────────────────────────
const BADGE: Record<string, { label: string; color: string; bg: string; border: string }> = {
  best:    { label: 'Best',    color: 'var(--green)',  bg: 'var(--green-lt)',  border: 'var(--green-mid)' },
  good:    { label: 'Good',    color: 'var(--ink-3)',  bg: 'var(--border)',    border: 'var(--border-md)' },
  ok:      { label: 'OK',      color: 'var(--amber)',  bg: 'var(--amber-lt)',  border: 'rgba(217,119,6,.2)' },
  fragile: { label: 'Fragile', color: '#c53030',       bg: '#fff5f5',          border: 'rgba(197,48,48,.25)' },
};

const BADGE_DESC: Record<string, string> = {
  best:    'Resilient to UI changes',
  good:    'Reliable in most cases',
  ok:      'May break on text or structure changes',
  fragile: 'Avoid — breaks on any layout change',
};

const FRAMEWORKS = ['playwright', 'css', 'xpath', 'cypress', 'selenium'] as const;
type Framework = typeof FRAMEWORKS[number];
const FW_LABEL: Record<Framework, string> = { playwright: 'Playwright', css: 'CSS', xpath: 'XPath', cypress: 'Cypress', selenium: 'Selenium' };

// ── Component ─────────────────────────────────────────────────────────────────
export default function CssSelectorGenerator() {
  const [html,     setHtml]     = useState('');
  const [parsed,   setParsed]   = useState<ElemInfo[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [copied,   setCopied]   = useState<string | null>(null);
  const [fw,       setFw]       = useState<Framework>('playwright');
  const [error,    setError]    = useState('');

  const handleParse = useCallback(() => {
    const src = html.trim() || EXAMPLE_HTML;
    try {
      setError('');
      const nodes = parseHTML(src);
      setParsed(nodes);
      setSelected(null);
      if (!html.trim()) setHtml(EXAMPLE_HTML);
    } catch {
      setError('Could not parse HTML — check for syntax errors.');
    }
  }, [html]);

  const selElem  = selected !== null ? parsed.find(e => e.key === selected) : null;
  const selectors = selElem ? generateSelectors(selElem, parsed) : [];
  const shown     = selectors.filter(s => s.framework === fw);

  const copy = (val: string, id: string) => {
    navigator.clipboard.writeText(val);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  // Readable tag label for the tree
  function treeLabel(e: ElemInfo) {
    let s = `<${e.tag}`;
    if (e.id)          s += `#${e.id}`;
    else if (e.testId) s += ` [data-testid="${e.testId}"]`;
    else if (e.classes.length) s += `.${e.classes.slice(0, 2).join('.')}`;
    return s + '>';
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Input row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>

        {/* Left — textarea + tree */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>HTML snippet</div>
          <textarea
            value={html}
            onChange={e => setHtml(e.target.value)}
            rows={12}
            placeholder={`Paste HTML here, or click "Load example"…`}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              padding: '10px 12px',
              border: '1px solid var(--border)',
              borderRadius: 8,
              resize: 'vertical',
              width: '100%',
              boxSizing: 'border-box',
              background: 'var(--surface)',
              color: 'var(--ink)',
              lineHeight: 1.55,
            }}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={handleParse}
              style={{
                background: 'var(--bg-accent)',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '9px 20px',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: 14,
              }}
            >
              Parse HTML
            </button>
            <button
              onClick={() => { setHtml(EXAMPLE_HTML); setError(''); }}
              style={{
                background: 'var(--surface)',
                color: 'var(--ink-3)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                padding: '9px 16px',
                cursor: 'pointer',
                fontSize: 13,
              }}
            >
              Load example
            </button>
          </div>
          {error && <p style={{ color: '#c53030', fontSize: 13, margin: 0 }}>{error}</p>}

          {parsed.length > 0 && (
            <div>
              <p style={{ fontSize: 13, color: 'var(--ink-3)', margin: '0 0 8px' }}>
                {parsed.length} element{parsed.length !== 1 ? 's' : ''} — click to inspect
              </p>
              <div style={{
                border: '1px solid var(--border)',
                borderRadius: 8,
                maxHeight: 280,
                overflowY: 'auto',
                background: 'var(--surface)',
              }}>
                {parsed.map(e => {
                  const isSel = selected === e.key;
                  const preview = (e.placeholder || e.text || e.alt || e.ariaLabel).slice(0, 28);
                  return (
                    <div
                      key={e.key}
                      onClick={() => setSelected(e.key)}
                      style={{
                        paddingLeft: 8 + e.depth * 14,
                        paddingRight: 8,
                        paddingTop: 5,
                        paddingBottom: 5,
                        cursor: 'pointer',
                        background: isSel ? 'var(--green-lt)' : 'transparent',
                        borderLeft: `3px solid ${isSel ? 'var(--green)' : 'transparent'}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: 12,
                        fontFamily: "'JetBrains Mono', monospace",
                        color: isSel ? 'var(--green-deep)' : 'var(--ink)',
                      }}
                    >
                      <span style={{ color: '#805ad5' }}>{treeLabel(e)}</span>
                      {preview && (
                        <span style={{ color: 'var(--ink-3)', fontSize: 11 }}>{preview}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right — selectors */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {selElem ? (
            <>
              <div style={{ fontWeight: 600, fontSize: 14 }}>
                Selected:{' '}
                <code style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  padding: '2px 8px',
                  borderRadius: 5,
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  &lt;{selElem.tag}{selElem.id ? `#${selElem.id}` : ''}&gt;
                </code>
              </div>

              {/* Framework tabs */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {FRAMEWORKS.map(f => (
                  <button
                    key={f}
                    onClick={() => setFw(f)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 20,
                      border: `1px solid ${fw === f ? 'var(--green)' : 'var(--border)'}`,
                      background: fw === f ? 'var(--green-lt)' : 'var(--surface)',
                      color: fw === f ? 'var(--green-deep)' : 'var(--ink)',
                      fontWeight: fw === f ? 600 : 400,
                      cursor: 'pointer',
                      fontSize: 13,
                    }}
                  >
                    {FW_LABEL[f]}
                  </button>
                ))}
              </div>

              {/* Selector cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 440, overflowY: 'auto' }}>
                {shown.length === 0 && (
                  <p style={{ color: 'var(--ink-3)', fontSize: 13 }}>
                    No {FW_LABEL[fw]} selectors available for this element.
                  </p>
                )}
                {shown.map((sel, i) => {
                  const badge = BADGE[sel.quality];
                  const cid   = `${sel.framework}-${i}`;
                  return (
                    <div key={i} style={{
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      padding: '10px 12px',
                      background: 'var(--surface)',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, gap: 8 }}>
                        <span style={{ fontSize: 12, color: 'var(--ink-3)', flexShrink: 0 }}>{sel.label}</span>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          <span style={{
                            fontSize: 11,
                            padding: '2px 8px',
                            borderRadius: 99,
                            background: badge.bg,
                            color: badge.color,
                            border: `1px solid ${badge.border}`,
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            letterSpacing: '.01em',
                          }}>
                            {badge.label}
                          </span>
                          <button
                            onClick={() => copy(sel.value, cid)}
                            style={{
                              background: copied === cid ? 'var(--green)' : 'var(--white)',
                              color: copied === cid ? '#fff' : 'var(--ink)',
                              border: `1px solid ${copied === cid ? 'var(--green)' : 'var(--border)'}`,
                              borderRadius: 6,
                              padding: '4px 10px',
                              fontSize: 12,
                              cursor: 'pointer',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {copied === cid ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </div>
                      <code style={{
                        display: 'block',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 13,
                        color: 'var(--ink)',
                        wordBreak: 'break-all',
                        marginBottom: 4,
                        lineHeight: 1.5,
                      }}>
                        {sel.value}
                      </code>
                      <p style={{ fontSize: 11, color: 'var(--ink-3)', margin: 0 }}>{sel.reason}</p>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div style={{
              border: '1.5px dashed var(--border)',
              borderRadius: 10,
              padding: '40px 24px',
              textAlign: 'center',
              color: 'var(--ink-3)',
              fontSize: 14,
              lineHeight: 1.6,
            }}>
              {parsed.length === 0
                ? <>Click <strong style={{ color: 'var(--ink)' }}>Parse HTML</strong> to build the element tree,<br />then click any element to generate selectors.</>
                : 'Click any element in the tree to generate selectors.'}
            </div>
          )}
        </div>
      </div>

      {/* ── Legend ── */}
      {selElem && (
        <div style={{
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
          padding: '10px 14px',
          border: '1px solid var(--border)',
          borderRadius: 8,
          fontSize: 12,
          color: 'var(--ink-3)',
          alignItems: 'center',
        }}>
          <span style={{ color: 'var(--ink-3)', fontSize: 11, marginRight: 2 }}>Resilience:</span>
          {Object.entries(BADGE).map(([q, b]) => (
            <span key={q} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{
                padding: '1px 8px',
                borderRadius: 99,
                background: b.bg,
                color: b.color,
                border: `1px solid ${b.border}`,
                fontWeight: 600,
                fontSize: 11,
              }}>{b.label}</span>
              <span style={{ color: 'var(--ink-3)' }}>{BADGE_DESC[q]}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
