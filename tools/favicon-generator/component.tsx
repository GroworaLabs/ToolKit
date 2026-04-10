import { useState, useRef, useEffect, useCallback } from 'react';

const IcoDownload = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;

const SIZES = [16, 32, 192] as const;
type Size = typeof SIZES[number];

function drawFavicon(canvas: HTMLCanvasElement, text: string, bg: string, fg: string, fontSize: number) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const s = canvas.width;
  ctx.clearRect(0, 0, s, s);
  ctx.fillStyle = bg;
  const r = s * 0.18;
  ctx.beginPath();
  ctx.moveTo(r, 0); ctx.lineTo(s - r, 0); ctx.quadraticCurveTo(s, 0, s, r);
  ctx.lineTo(s, s - r); ctx.quadraticCurveTo(s, s, s - r, s);
  ctx.lineTo(r, s); ctx.quadraticCurveTo(0, s, 0, s - r);
  ctx.lineTo(0, r); ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();
  ctx.fill();
  if (!text) return;
  ctx.fillStyle = fg;
  const actualFontSize = Math.round(s * (fontSize / 100));
  ctx.font = `700 ${actualFontSize}px -apple-system, system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text.slice(0, 3), s / 2, s / 2 + s * 0.02);
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise(res => canvas.toBlob(b => res(b!), 'image/png'));
}

async function downloadPng(canvas: HTMLCanvasElement, filename: string) {
  const blob = await canvasToBlob(canvas);
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

/* Minimal ICO writer: single 32x32 PNG inside ICO container */
async function downloadIco(canvas32: HTMLCanvasElement) {
  const blob32 = await canvasToBlob(canvas32);
  const buf32  = await blob32.arrayBuffer();
  const png32  = new Uint8Array(buf32);

  const header    = new Uint8Array(6);
  const dirEntry  = new Uint8Array(16);
  const view      = new DataView(header.buffer);
  view.setUint16(0, 0, true);
  view.setUint16(2, 1, true);
  view.setUint16(4, 1, true);

  const dv = new DataView(dirEntry.buffer);
  dv.setUint8(0, 32); dv.setUint8(1, 32);
  dv.setUint8(2, 0);  dv.setUint8(3, 0);
  dv.setUint16(4, 1, true); dv.setUint16(6, 32, true);
  dv.setUint32(8, png32.byteLength, true);
  dv.setUint32(12, 6 + 16, true);

  const icoData = new Uint8Array(6 + 16 + png32.byteLength);
  icoData.set(header, 0);
  icoData.set(dirEntry, 6);
  icoData.set(png32, 22);

  const icoBlob = new Blob([icoData], { type: 'image/x-icon' });
  const url = URL.createObjectURL(icoBlob);
  const a   = document.createElement('a');
  a.href = url; a.download = 'favicon.ico'; a.click();
  URL.revokeObjectURL(url);
}

export default function FaviconWidget() {
  const [text,     setText]     = useState('A');
  const [bg,       setBg]       = useState('#0f172a');
  const [fg,       setFg]       = useState('#ffffff');
  const [fontSize, setFontSize] = useState(60);
  const [preview,  setPreview]  = useState<Size>(32);

  const canvasRefs = {
    16:  useRef<HTMLCanvasElement>(null),
    32:  useRef<HTMLCanvasElement>(null),
    192: useRef<HTMLCanvasElement>(null),
  };

  useEffect(() => {
    SIZES.forEach(s => {
      const c = canvasRefs[s].current;
      if (c) drawFavicon(c, text, bg, fg, fontSize);
    });
  }, [text, bg, fg, fontSize]);

  const dl = useCallback((size: Size) => {
    const c = canvasRefs[size].current;
    if (c) downloadPng(c, `favicon-${size}x${size}.png`);
  }, []);

  const dlIco = useCallback(() => {
    const c = canvasRefs[32].current;
    if (c) downloadIco(c);
  }, []);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 20, alignItems: 'start' }}>

        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Text */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', display: 'block', marginBottom: 6 }}>Text or emoji</label>
            <input
              value={text} onChange={e => setText(e.target.value)} maxLength={3}
              placeholder="A or 🚀"
              style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)', fontSize: 20, fontWeight: 700, color: 'var(--ink)', background: 'var(--page-bg)', outline: 'none', boxSizing: 'border-box', transition: 'border-color .15s' }}
              onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
              onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          {/* Colors */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', display: 'block', marginBottom: 6 }}>Background</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)', background: 'var(--page-bg)' }}>
                <input type="color" value={bg} onChange={e => setBg(e.target.value)} style={{ width: 28, height: 28, border: 'none', borderRadius: 4, cursor: 'pointer', padding: 0, background: 'none' }} />
                <code style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink)', flex: 1 }}>{bg}</code>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', display: 'block', marginBottom: 6 }}>Text colour</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)', background: 'var(--page-bg)' }}>
                <input type="color" value={fg} onChange={e => setFg(e.target.value)} style={{ width: 28, height: 28, border: 'none', borderRadius: 4, cursor: 'pointer', padding: 0, background: 'none' }} />
                <code style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink)', flex: 1 }}>{fg}</code>
              </div>
            </div>
          </div>

          {/* Font size */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)' }}>Font size</label>
              <span style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink)' }}>{fontSize}%</span>
            </div>
            <input type="range" min={20} max={90} value={fontSize} onChange={e => setFontSize(+e.target.value)} style={{ width: '100%', accentColor: 'var(--green)' }} />
          </div>

          {/* Quick backgrounds */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)', display: 'block', marginBottom: 6 }}>Quick colours</label>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['#0f172a','#1e40af','#047857','#b91c1c','#7c3aed','#ea580c','#ffffff','#f1f5f9'].map(c => (
                <button key={c} onClick={() => setBg(c)} title={c}
                  style={{ width: 28, height: 28, borderRadius: 6, background: c, border: `2px solid ${bg === c ? 'var(--green)' : 'var(--border)'}`, cursor: 'pointer', flexShrink: 0 }} />
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          {/* Hidden canvases */}
          {SIZES.map(s => <canvas key={s} ref={canvasRefs[s]} width={s} height={s} style={{ display: 'none' }} />)}

          {/* Visible preview */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{ width: preview, height: preview, border: '1px solid var(--border)', borderRadius: 4 }}>
              <canvas ref={canvasRefs[preview]} width={preview} height={preview} style={{ display: 'block', imageRendering: preview < 64 ? 'pixelated' : 'auto', width: preview, height: preview }} />
            </div>
            <span style={{ fontSize: 11, color: 'var(--ink-4)' }}>{preview}×{preview}</span>
          </div>

          {/* Preview size toggle */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {SIZES.map(s => (
              <button key={s} onClick={() => setPreview(s)}
                style={{ padding: '4px 10px', border: `1.5px solid ${preview === s ? 'var(--green)' : 'var(--border)'}`, borderRadius: 'var(--r-s)', background: preview === s ? 'var(--green-lt)' : 'var(--white)', color: preview === s ? 'var(--green)' : 'var(--ink-3)', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                {s}px
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Download buttons */}
      <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {SIZES.map(s => (
          <button key={s} onClick={() => dl(s)}
            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '8px 14px', background: 'var(--white)', color: 'var(--ink-2)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            <IcoDownload /> PNG {s}×{s}
          </button>
        ))}
        <button onClick={dlIco}
          style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '8px 16px', background: 'var(--ink)', color: '#fff', border: 'none', borderRadius: 'var(--r-m)', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
          <IcoDownload /> Download favicon.ico
        </button>
      </div>
    </div>
  );
}
