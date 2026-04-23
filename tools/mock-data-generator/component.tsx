'use client';
import { useState, useCallback } from 'react';

const FIRST_NAMES = ['Alice','Bob','Carol','David','Emma','Frank','Grace','Henry','Iris','James','Karen','Liam','Mia','Noah','Olivia','Paul','Quinn','Rachel','Sam','Taylor','Uma','Victor','Wendy','Xavier','Yara','Zoe','Aiden','Bella','Carlos','Diana','Ethan','Fiona','George','Hannah','Ivan','Julia','Kyle','Laura','Marcus','Nina','Oscar','Priya','Ryan','Sofia','Tom','Uma','Vince','Willow','Xander','Yasmine'];
const LAST_NAMES  = ['Johnson','Smith','Williams','Brown','Jones','Garcia','Miller','Davis','Wilson','Moore','Taylor','Anderson','Thomas','Jackson','White','Harris','Martin','Thompson','Young','Allen','King','Wright','Scott','Green','Baker','Hill','Adams','Nelson','Carter','Mitchell','Roberts','Turner','Phillips','Campbell','Parker','Evans','Edwards','Collins','Stewart','Morris','Rogers','Reed','Cook','Bell','Murphy','Bailey','Rivera','Cooper','Richardson','Cox'];
const COMPANIES   = ['Acme Corp','TechNova','BlueSky Solutions','DataPoint','Nexus Systems','Horizon Labs','Peak Software','Clarity AI','Vivid Digital','Axiom Consulting','Stellar Works','Precision Data','Quantum Leap','InnoWave','SkyBridge Tech'];
const JOB_TITLES  = ['Software Engineer','Product Manager','Data Scientist','DevOps Engineer','UX Designer','Backend Developer','Frontend Developer','Full Stack Developer','Solutions Architect','Engineering Manager','QA Engineer','Security Engineer','Machine Learning Engineer','Platform Engineer','Technical Lead'];
const CITIES      = ['New York','London','Berlin','Paris','Tokyo','Sydney','Toronto','Amsterdam','Singapore','Barcelona','Seattle','Austin','Chicago','Dublin','Melbourne','Zurich','Stockholm','Copenhagen','Helsinki','Oslo','Vienna','Prague','Warsaw','Lisbon','Athens'];
const COUNTRIES   = ['United States','United Kingdom','Germany','France','Japan','Australia','Canada','Netherlands','Singapore','Spain','Sweden','Norway','Denmark','Switzerland','Austria','Ireland','Portugal','Italy','Poland','Brazil','Mexico','India','South Korea','New Zealand'];
const DOMAINS     = ['example.com','test.dev','sample.org','demo.io','fakemail.com','testuser.net'];
const STREET_NAMES = ['Main St','Oak Ave','Maple Dr','Cedar Ln','Pine Rd','Elm Way','River Blvd','Lake Shore Dr','Park Ave','High St','Church Rd','School Lane','Mill Rd','Hill Crest','Valley View'];
const TLDS        = ['com','net','org','io','dev','tech','app','co'];

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randFloat(min: number, max: number, dp = 2) { return parseFloat((Math.random() * (max - min) + min).toFixed(dp)); }

function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function generateValue(field: string): string | number | boolean {
  const fn = rand(FIRST_NAMES);
  const ln = rand(LAST_NAMES);
  switch (field) {
    case 'id':         return randInt(1, 9999);
    case 'uuid':       return uuid();
    case 'firstName':  return rand(FIRST_NAMES);
    case 'lastName':   return rand(LAST_NAMES);
    case 'fullName':   return `${rand(FIRST_NAMES)} ${rand(LAST_NAMES)}`;
    case 'email':      return `${fn.toLowerCase()}.${ln.toLowerCase()}${randInt(1,99)}@${rand(DOMAINS)}`;
    case 'username':   return `${fn.toLowerCase()}${ln.toLowerCase().slice(0,3)}${randInt(10,99)}`;
    case 'phone':      return `+1-${randInt(200,999)}-${randInt(100,999)}-${randInt(1000,9999)}`;
    case 'company':    return rand(COMPANIES);
    case 'jobTitle':   return rand(JOB_TITLES);
    case 'address':    return `${randInt(1, 9999)} ${rand(STREET_NAMES)}`;
    case 'city':       return rand(CITIES);
    case 'country':    return rand(COUNTRIES);
    case 'postCode':   return `${randInt(10000, 99999)}`;
    case 'age':        return randInt(18, 80);
    case 'integer':    return randInt(1, 10000);
    case 'float':      return randFloat(0, 1000);
    case 'boolean':    return Math.random() > 0.5;
    case 'date': {
      const d = new Date(Date.now() - randInt(0, 365 * 10) * 86400000);
      return d.toISOString().split('T')[0];
    }
    case 'url':        return `https://${fn.toLowerCase()}${rand(TLDS) === 'com' ? '' : '-' + randInt(1,9)}.${rand(TLDS)}`;
    case 'ipv4':       return `${randInt(1,254)}.${randInt(0,255)}.${randInt(0,255)}.${randInt(1,254)}`;
    case 'color':      return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
    case 'lorem':      return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    default:           return '';
  }
}

const ALL_FIELDS: { id: string; label: string; group: string }[] = [
  { id: 'id',        label: 'ID (integer)',  group: 'Identity' },
  { id: 'uuid',      label: 'UUID v4',       group: 'Identity' },
  { id: 'firstName', label: 'First Name',    group: 'Person' },
  { id: 'lastName',  label: 'Last Name',     group: 'Person' },
  { id: 'fullName',  label: 'Full Name',     group: 'Person' },
  { id: 'email',     label: 'Email',         group: 'Person' },
  { id: 'username',  label: 'Username',      group: 'Person' },
  { id: 'age',       label: 'Age',           group: 'Person' },
  { id: 'phone',     label: 'Phone',         group: 'Contact' },
  { id: 'address',   label: 'Street Address',group: 'Contact' },
  { id: 'city',      label: 'City',          group: 'Contact' },
  { id: 'country',   label: 'Country',       group: 'Contact' },
  { id: 'postCode',  label: 'Post Code',     group: 'Contact' },
  { id: 'company',   label: 'Company',       group: 'Work' },
  { id: 'jobTitle',  label: 'Job Title',     group: 'Work' },
  { id: 'integer',   label: 'Random Integer',group: 'Misc' },
  { id: 'float',     label: 'Random Float',  group: 'Misc' },
  { id: 'boolean',   label: 'Boolean',       group: 'Misc' },
  { id: 'date',      label: 'Date (ISO)',    group: 'Misc' },
  { id: 'url',       label: 'URL',           group: 'Misc' },
  { id: 'ipv4',      label: 'IPv4 Address',  group: 'Misc' },
  { id: 'color',     label: 'Hex Colour',    group: 'Misc' },
  { id: 'lorem',     label: 'Lorem Ipsum',   group: 'Misc' },
];

const GROUPS = [...new Set(ALL_FIELDS.map(f => f.group))];

function toCSV(rows: Record<string, unknown>[], fields: string[]): string {
  const lines = [fields.join(',')];
  for (const row of rows) {
    lines.push(fields.map(f => {
      const v = String(row[f] ?? '');
      return v.includes(',') || v.includes('"') ? `"${v.replace(/"/g, '""')}"` : v;
    }).join(','));
  }
  return lines.join('\r\n');
}

export default function MockDataGenerator() {
  const [selectedFields, setSelectedFields] = useState<string[]>(['id', 'fullName', 'email', 'jobTitle', 'city']);
  const [count,   setCount]   = useState(10);
  const [format,  setFormat]  = useState<'json' | 'csv'>('json');
  const [output,  setOutput]  = useState('');
  const [copied,  setCopied]  = useState(false);

  const toggleField = (id: string) => {
    setSelectedFields(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const generate = useCallback(() => {
    const rows = Array.from({ length: count }, () => {
      const row: Record<string, unknown> = {};
      for (const f of selectedFields) row[f] = generateValue(f);
      return row;
    });
    if (format === 'json') {
      setOutput(JSON.stringify(rows, null, 2));
    } else {
      setOutput(toCSV(rows, selectedFields));
    }
  }, [count, selectedFields, format]);

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const download = () => {
    if (!output) return;
    const ext  = format === 'json' ? 'json' : 'csv';
    const mime = format === 'json' ? 'application/json' : 'text/csv';
    const blob = new Blob([output], { type: mime });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `mock-data.${ext}`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Field selector */}
      <div>
        <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>Select fields to generate</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {GROUPS.map(group => (
            <div key={group}>
              <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{group}</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {ALL_FIELDS.filter(f => f.group === group).map(f => (
                  <button key={f.id} onClick={() => toggleField(f.id)}
                    style={{ padding: '5px 12px', borderRadius: 20, fontSize: 12, cursor: 'pointer',
                      border: '1.5px solid', borderColor: selectedFields.includes(f.id) ? 'var(--green)' : 'var(--border)',
                      background: selectedFields.includes(f.id) ? 'var(--green-lt)' : 'var(--white)',
                      color: selectedFields.includes(f.id) ? 'var(--green)' : 'var(--ink-2)',
                      fontWeight: selectedFields.includes(f.id) ? 600 : 400 }}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <label style={{ fontSize: 13, color: 'var(--ink-2)' }}>Rows</label>
          <input type="number" min={1} max={1000} value={count} onChange={e => setCount(Math.min(1000, Math.max(1, +e.target.value)))}
            style={{ width: 72, padding: '6px 10px', borderRadius: 6, border: '1.5px solid var(--border)',
              fontSize: 13, fontFamily: 'JetBrains Mono, monospace', background: 'var(--surface)', color: 'var(--ink)' }} />
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <label style={{ fontSize: 13, color: 'var(--ink-2)' }}>Format</label>
          {(['json', 'csv'] as const).map(f => (
            <button key={f} onClick={() => setFormat(f)}
              style={{ padding: '5px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer',
                border: '1.5px solid', borderColor: format === f ? 'var(--green)' : 'var(--border)',
                background: format === f ? 'var(--green-lt)' : 'var(--white)',
                color: format === f ? 'var(--green)' : 'var(--ink-2)', fontWeight: format === f ? 600 : 400 }}>
              {f.toUpperCase()}
            </button>
          ))}
        </div>
        <button onClick={generate} disabled={selectedFields.length === 0}
          style={{ padding: '8px 20px', borderRadius: 8, background: 'var(--bg-accent)', color: '#fff',
            border: 'none', fontWeight: 600, fontSize: 14, cursor: selectedFields.length === 0 ? 'not-allowed' : 'pointer',
            opacity: selectedFields.length === 0 ? 0.5 : 1 }}>
          Generate →
        </button>
      </div>

      {/* Output */}
      {output && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button onClick={copy}
              style={{ padding: '6px 14px', borderRadius: 6, border: '1.5px solid var(--border)',
                background: 'var(--white)', color: 'var(--ink-2)', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button onClick={download}
              style={{ padding: '6px 14px', borderRadius: 6, background: 'var(--bg-accent)', color: '#fff',
                border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              Download
            </button>
          </div>
          <textarea readOnly value={output} spellCheck={false}
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.6, padding: 12,
              border: '1.5px solid var(--border)', borderRadius: 8, resize: 'vertical', minHeight: 320,
              background: 'var(--surface)', color: 'var(--ink)', outline: 'none' }} />
        </div>
      )}
    </div>
  );
}
