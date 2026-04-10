import { useState, useCallback, useRef } from 'react';

/* ── Types ─────────────────────────────────────────────── */

export type HarmonyMode =
    | 'random'
    | 'analogous'
    | 'complementary'
    | 'triadic'
    | 'split-complementary'
    | 'tetradic'
    | 'monochromatic';

export interface ColorSwatch {
  hex:    string;
  rgb:    { r: number; g: number; b: number };
  hsl:    { h: number; s: number; l: number };
  name:   string;
  locked: boolean;
}

export interface HarmonyOption {
  id:    HarmonyMode;
  label: string;
  desc:  string;
}

export const HARMONY_OPTIONS: HarmonyOption[] = [
  { id: 'random',              label: 'Random',         desc: 'Surprise me'              },
  { id: 'analogous',           label: 'Analogous',      desc: 'Adjacent on color wheel'  },
  { id: 'complementary',       label: 'Complementary',  desc: 'Opposite colors'          },
  { id: 'triadic',             label: 'Triadic',        desc: 'Three evenly spaced'      },
  { id: 'split-complementary', label: 'Split Compl.',   desc: 'Softer contrast'          },
  { id: 'tetradic',            label: 'Tetradic',       desc: 'Four balanced colors'     },
  { id: 'monochromatic',       label: 'Monochromatic',  desc: 'Same hue, varied tones'   },
];

/* ── Color math helpers ────────────────────────────────── */

function hslToRgb(h: number, s: number, l: number) {
  const s1 = s / 100, l1 = l / 100;
  const k  = (n: number) => (n + h / 30) % 12;
  const a  = s1 * Math.min(l1, 1 - l1);
  const f  = (n: number) => l1 - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: Math.round(f(0) * 255), g: Math.round(f(8) * 255), b: Math.round(f(4) * 255) };
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function rndHue() { return Math.floor(Math.random() * 360); }
function rndSat() { return Math.floor(Math.random() * 36) + 45; }   // 45–80
function rndLit() { return Math.floor(Math.random() * 25) + 38; }   // 38–62

function clamp(v: number, lo: number, hi: number) {
  return Math.round(Math.max(lo, Math.min(hi, v)));
}

function makeColor(h: number, s: number, l: number): ColorSwatch {
  const rgb = hslToRgb(h, s, l);
  return {
    hex:    rgbToHex(rgb.r, rgb.g, rgb.b),
    rgb,
    hsl:    { h, s, l },
    name:   hslToName(h, s, l),
    locked: false,
  };
}

function hslToName(h: number, s: number, l: number): string {
  if (l < 15) return 'Near Black';
  if (l > 88) return 'Near White';
  if (s < 12) return l > 55 ? 'Light Gray' : 'Gray';
  const hues: [number, number, string][] = [
    [0,   15,  'Red'],       [15,  30,  'Red-Orange'], [30,  45,  'Orange'],
    [45,  60,  'Amber'],     [60,  75,  'Yellow'],     [75,  105, 'Yellow-Green'],
    [105, 135, 'Green'],     [135, 165, 'Teal'],       [165, 195, 'Cyan'],
    [195, 225, 'Sky Blue'],  [225, 255, 'Blue'],       [255, 285, 'Indigo'],
    [285, 315, 'Violet'],    [315, 345, 'Pink'],       [345, 360, 'Red'],
  ];
  const base = hues.find(([lo, hi]) => h >= lo && h < hi)?.[2] ?? 'Colorful';
  if (l > 70) return `Light ${base}`;
  if (l < 35) return `Dark ${base}`;
  return base;
}

/* ── Harmony generators ────────────────────────────────── */

function generateHarmony(mode: HarmonyMode, prev: ColorSwatch[]): ColorSwatch[] {
  const h = rndHue(), s = rndSat(), l = rndLit();
  const SIZE = 5;

  // Helper: build a swatch or reuse a locked one
  const build = (idx: number, hv: number, sv: number, lv: number): ColorSwatch => {
    if (prev[idx]?.locked) return prev[idx];
    return makeColor(((hv % 360) + 360) % 360, clamp(sv, 10, 90), clamp(lv, 10, 90));
  };

  if (mode === 'random') {
    return Array.from({ length: SIZE }, (_, i) =>
        prev[i]?.locked ? prev[i] : makeColor(rndHue(), rndSat(), rndLit())
    );
  }

  let tuples: [number, number, number][] = [];

  switch (mode) {
    case 'analogous':
      tuples = [-36, -18, 0, 18, 36].map(d => [((h + d) + 360) % 360, s, l]);
      break;
    case 'complementary': {
      const c = (h + 180) % 360;
      tuples = [[h, s, l-10], [h, s-10, l+10], [h, s, l], [c, s-10, l+10], [c, s, l-10]];
      break;
    }
    case 'triadic': {
      const t1 = (h + 120) % 360, t2 = (h + 240) % 360;
      tuples = [[h, s, l], [h, s-12, l+12], [t1, s, l], [t2, s, l], [t2, s-12, l+12]];
      break;
    }
    case 'split-complementary': {
      const sc1 = (h + 150) % 360, sc2 = (h + 210) % 360;
      tuples = [[h, s, l], [h, s-10, l+12], [sc1, s, l], [sc2, s, l], [sc2, s-10, l+12]];
      break;
    }
    case 'tetradic': {
      const q = [0, 90, 180, 270].map(d => (h + d) % 360);
      tuples = [...q.map(hv => [hv, s, l] as [number,number,number]), [q[0], s-10, l+12]];
      break;
    }
    case 'monochromatic':
      tuples = [20, 35, 50, 62, 78].map(lv => [h, s, lv]);
      break;
  }

  return tuples.slice(0, SIZE).map(([hv, sv, lv], i) => build(i, hv, sv, lv));
}

/* ── Hook ──────────────────────────────────────────────── */

export function useColorPalette() {
  // useRef keeps the CURRENT mode value always fresh — no stale closure issues
  const modeRef = useRef<HarmonyMode>('random');
  const [mode,     setMode]     = useState<HarmonyMode>('random');
  const [swatches, setSwatches] = useState<ColorSwatch[]>(() =>
      generateHarmony('random', [])
  );
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // ✅ generate always reads modeRef.current — never stale
  const generate = useCallback((newMode?: HarmonyMode) => {
    const m = newMode ?? modeRef.current;
    modeRef.current = m;          // update ref immediately (sync)
    setMode(m);                   // update state for UI
    setSwatches(prev => generateHarmony(m, prev));
  }, []); // empty deps — callback is stable, never needs re-creation

  const toggleLock = useCallback((i: number) => {
    setSwatches(prev =>
        prev.map((s, idx) => idx === i ? { ...s, locked: !s.locked } : s)
    );
  }, []);

  const copyHex = useCallback(async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1800);
    } catch { /* ignore */ }
  }, []);

  const copyCss = useCallback(async () => {
    const css = swatches.map((s, i) => `  --color-${i + 1}: ${s.hex};`).join('\n');
    try {
      await navigator.clipboard.writeText(`:root {\n${css}\n}`);
      setCopiedHex('css');
      setTimeout(() => setCopiedHex(null), 1800);
    } catch { /* ignore */ }
  }, [swatches]);

  return { swatches, mode, generate, toggleLock, copyHex, copyCss, copiedHex };
}