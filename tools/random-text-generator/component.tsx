import { useState, useCallback } from 'react';

const IcoCopy    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoRefresh = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>;

type Mode = 'words' | 'sentences' | 'paragraphs';

const WORDS = [
  'time','year','people','way','day','man','woman','child','world','life','hand','part','place','case','week',
  'company','system','program','question','government','number','night','point','home','water','room','mother',
  'area','money','story','fact','month','lot','right','study','book','eye','job','word','business','issue',
  'side','kind','head','house','service','friend','father','power','hour','game','line','end','among','road',
  'form','black','long','large','small','big','great','high','old','real','new','good','back','white','public',
  'through','between','during','before','without','under','within','along','following','across','behind','beyond',
  'find','know','take','see','come','think','look','want','give','use','feel','try','ask','need','seem','leave',
  'call','keep','let','begin','show','hear','play','run','move','live','believe','hold','bring','happen','write',
  'provide','sit','stand','lose','pay','meet','include','continue','set','learn','change','lead','understand',
  'watch','follow','stop','create','speak','read','spend','grow','open','walk','offer','remember','love','consider',
  'appear','buy','wait','serve','die','send','expect','build','stay','fall','cut','reach','kill','remain','suggest',
  'raise','pass','sell','require','report','decide','pull','morning','evening','afternoon','garden','street',
  'river','mountain','forest','city','village','school','office','market','hospital','library','museum','station',
  'beautiful','important','national','local','social','political','economic','possible','certain','difficult',
  'several','available','likely','clear','simple','recent','various','particular','common','early','major',
];

const VERBS   = WORDS.filter((_, i) => i > 80 && i < 140);
const NOUNS   = WORDS.filter((_, i) => i < 60);
const ADJECTIVES = WORDS.filter((_, i) => i >= 140);

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function cap(s: string): string { return s.charAt(0).toUpperCase() + s.slice(1); }

function genWord(): string  { return pick(WORDS); }
function genSentence(): string {
  const patterns = [
    () => `${cap(pick(ADJECTIVES))} ${pick(NOUNS)} ${pick(VERBS)} the ${pick(ADJECTIVES)} ${pick(NOUNS)}.`,
    () => `The ${pick(NOUNS)} ${pick(VERBS)} a ${pick(ADJECTIVES)} ${pick(NOUNS)}.`,
    () => `${cap(pick(NOUNS))} and ${pick(NOUNS)} ${pick(VERBS)} every ${pick(NOUNS)}.`,
    () => `A ${pick(ADJECTIVES)} ${pick(NOUNS)} can ${pick(VERBS)} without a ${pick(NOUNS)}.`,
    () => `The ${pick(ADJECTIVES)} ${pick(NOUNS)} will ${pick(VERBS)} the ${pick(NOUNS)}.`,
  ];
  return pick(patterns)();
}
function genParagraph(): string {
  const count = 3 + Math.floor(Math.random() * 4);
  return Array.from({ length: count }, genSentence).join(' ');
}

function generate(mode: Mode, count: number): string {
  if (mode === 'words')      return Array.from({ length: count }, genWord).join(' ');
  if (mode === 'sentences')  return Array.from({ length: count }, genSentence).join(' ');
  return Array.from({ length: count }, genParagraph).join('\n\n');
}

const MODES: { id: Mode; label: string; max: number; unit: string }[] = [
  { id: 'words',      label: 'Words',      max: 500, unit: 'words'      },
  { id: 'sentences',  label: 'Sentences',  max: 50,  unit: 'sentences'  },
  { id: 'paragraphs', label: 'Paragraphs', max: 20,  unit: 'paragraphs' },
];

export default function RandomTextWidget() {
  const [mode,    setMode]    = useState<Mode>('paragraphs');
  const [count,   setCount]   = useState(3);
  const [output,  setOutput]  = useState('');
  const [copied,  setCopied]  = useState(false);

  const cfg = MODES.find(m => m.id === mode)!;

  const run = useCallback(() => {
    setOutput(generate(mode, count));
    setCopied(false);
  }, [mode, count]);

  const copy = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }, [output]);

  return (
    <div>
      {/* Mode */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
        {MODES.map(m => (
          <button key={m.id} onClick={() => { setMode(m.id); setCount(m.id === 'words' ? 50 : m.id === 'sentences' ? 5 : 3); setOutput(''); }}
            style={{ flex: 1, padding: '8px 4px', border: `1.5px solid ${mode === m.id ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-s)', background: mode === m.id ? 'var(--green-lt)' : 'var(--white)', color: mode === m.id ? 'var(--green)' : 'var(--ink-2)', fontSize: 13, fontWeight: mode === m.id ? 700 : 500, cursor: 'pointer', transition: 'all .14s' }}>
            {m.label}
          </button>
        ))}
      </div>

      {/* Count + generate */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 180 }}>
          <button onClick={() => setCount(c => Math.max(1, c - 1))} style={{ width: 32, height: 36, border: '1.5px solid var(--border)', borderRadius: 'var(--r-s)', background: 'var(--white)', color: 'var(--ink-2)', fontSize: 18, cursor: 'pointer', flexShrink: 0 }}>−</button>
          <input
            type="number" min={1} max={cfg.max} value={count}
            onChange={e => setCount(Math.min(cfg.max, Math.max(1, parseInt(e.target.value) || 1)))}
            style={{ width: 64, padding: '8px 10px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)', fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 700, textAlign: 'center', color: 'var(--ink)', background: 'var(--page-bg)', outline: 'none', boxSizing: 'border-box' }}
          />
          <button onClick={() => setCount(c => Math.min(cfg.max, c + 1))} style={{ width: 32, height: 36, border: '1.5px solid var(--border)', borderRadius: 'var(--r-s)', background: 'var(--white)', color: 'var(--ink-2)', fontSize: 18, cursor: 'pointer', flexShrink: 0 }}>+</button>
          <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>{cfg.unit}</span>
        </div>
        <button onClick={run} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', background: 'var(--ink)', color: '#fff', border: 'none', borderRadius: 'var(--r-m)', fontSize: 13, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>
          <IcoRefresh /> Generate
        </button>
      </div>

      {/* Output */}
      {output && (
        <>
          <div style={{ position: 'relative', marginBottom: 10 }}>
            <div style={{ padding: '14px', background: 'var(--white)', border: '1.5px solid var(--border-md)', borderRadius: 'var(--r-m)', fontSize: 14, lineHeight: 1.75, color: 'var(--ink)', maxHeight: 320, overflowY: 'auto', whiteSpace: 'pre-wrap', boxShadow: 'var(--sh-xs)' }}>
              {output}
            </div>
          </div>
          <button onClick={copy} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', background: copied ? 'var(--green)' : 'var(--white)', color: copied ? '#fff' : 'var(--ink-3)', border: `1.5px solid ${copied ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-s)', fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all .14s' }}>
            {copied ? <IcoCheck /> : <IcoCopy />} {copied ? 'Copied!' : 'Copy text'}
          </button>
        </>
      )}

      {!output && (
        <div style={{ padding: '32px 16px', border: '1.5px dashed var(--border)', borderRadius: 'var(--r-m)', textAlign: 'center', color: 'var(--ink-4)', fontSize: 13 }}>
          Click Generate to create random text
        </div>
      )}
    </div>
  );
}
