import { useState, useCallback, useMemo } from 'react';

/* ── Types ──────────────────────────────────────────────── */
export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'hsv' | 'cmyk';

export interface RgbColor  { r: number; g: number; b: number }
export interface HslColor  { h: number; s: number; l: number }
export interface HsvColor  { h: number; s: number; v: number }
export interface CmykColor { c: number; m: number; y: number; k: number }

export interface ColorValues {
  hex:  string;
  rgb:  RgbColor;
  hsl:  HslColor;
  hsv:  HsvColor;
  cmyk: CmykColor;
  css:  string;   // rgb(r, g, b)
  cssHsl: string; // hsl(h, s%, l%)
}

/* ── Conversion utilities ───────────────────────────────── */

function clamp(v: number, min = 0, max = 255) {
  return Math.max(min, Math.min(max, Math.round(v)));
}

function hexToRgb(hex: string): RgbColor | null {
  const clean = hex.replace('#', '');
  const full  = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }: RgbColor): string {
  return '#' + [r, g, b].map(v => clamp(v).toString(16).padStart(2, '0')).join('');
}

function rgbToHsl({ r, g, b }: RgbColor): HslColor {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb({ h, s, l }: HslColor): RgbColor {
  const sn = s / 100, ln = l / 100;
  if (sn === 0) {
    const v = Math.round(ln * 255);
    return { r: v, g: v, b: v };
  }
  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;
  const hk = h / 360;
  const toRgb = (t: number) => {
    let tc = t < 0 ? t + 1 : t > 1 ? t - 1 : t;
    if (tc < 1/6) return p + (q - p) * 6 * tc;
    if (tc < 1/2) return q;
    if (tc < 2/3) return p + (q - p) * (2/3 - tc) * 6;
    return p;
  };
  return {
    r: clamp(toRgb(hk + 1/3) * 255),
    g: clamp(toRgb(hk) * 255),
    b: clamp(toRgb(hk - 1/3) * 255),
  };
}

function rgbToHsv({ r, g, b }: RgbColor): HsvColor {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const v = max, d = max - min;
  const s = max === 0 ? 0 : d / max;
  let h = 0;
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
    else if (max === gn) h = ((bn - rn) / d + 2) / 6;
    else h = ((rn - gn) / d + 4) / 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
}

function hsvToRgb({ h, s, v }: HsvColor): RgbColor {
  const sn = s / 100, vn = v / 100;
  if (sn === 0) {
    const c = clamp(vn * 255);
    return { r: c, g: c, b: c };
  }
  const i = Math.floor(h / 60) % 6;
  const f = h / 60 - Math.floor(h / 60);
  const p = vn * (1 - sn);
  const q = vn * (1 - f * sn);
  const t = vn * (1 - (1 - f) * sn);
  const [r, g, b] = [
    [vn, t, p, p, q, vn],
    [q, vn, vn, t, p, p],
    [p, p, q, vn, vn, t],
  ].map(arr => clamp(arr[i] * 255));
  return { r, g, b };
}

function rgbToCmyk({ r, g, b }: RgbColor): CmykColor {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round(((1 - rn - k) / (1 - k)) * 100),
    m: Math.round(((1 - gn - k) / (1 - k)) * 100),
    y: Math.round(((1 - bn - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}

function cmykToRgb({ c, m, y, k }: CmykColor): RgbColor {
  const kn = k / 100;
  return {
    r: clamp(255 * (1 - c / 100) * (1 - kn)),
    g: clamp(255 * (1 - m / 100) * (1 - kn)),
    b: clamp(255 * (1 - y / 100) * (1 - kn)),
  };
}

function rgbToAll(rgb: RgbColor): ColorValues {
  const hex    = rgbToHex(rgb);
  const hsl    = rgbToHsl(rgb);
  const hsv    = rgbToHsv(rgb);
  const cmyk   = rgbToCmyk(rgb);
  const css    = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const cssHsl = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  return { hex, rgb, hsl, hsv, cmyk, css, cssHsl };
}

/* ── Input parsers ─────────────────────────────────────── */

function parseHex(v: string): RgbColor | null {
  return hexToRgb(v.trim());
}

function parseRgb(v: string): RgbColor | null {
  const m = v.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i)
          || v.match(/^(\d+)\s*[,\s]\s*(\d+)\s*[,\s]\s*(\d+)$/);
  if (!m) return null;
  return { r: clamp(+m[1]), g: clamp(+m[2]), b: clamp(+m[3]) };
}

function parseHsl(v: string): RgbColor | null {
  const m = v.match(/hsl\s*\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*\)/i)
          || v.match(/^(\d+)\s*[,\s]\s*(\d+)\s*[,\s]\s*(\d+)$/);
  if (!m) return null;
  return hslToRgb({ h: +m[1], s: +m[2], l: +m[3] });
}

function parseHsv(v: string): RgbColor | null {
  const m = v.match(/^(\d+)\s*[,\s]\s*(\d+)\s*[,\s]\s*(\d+)$/);
  if (!m) return null;
  return hsvToRgb({ h: +m[1], s: +m[2], v: +m[3] });
}

function parseCmyk(v: string): RgbColor | null {
  const m = v.match(/^(\d+)\s*[,\s]\s*(\d+)\s*[,\s]\s*(\d+)\s*[,\s]\s*(\d+)$/);
  if (!m) return null;
  return cmykToRgb({ c: +m[1], m: +m[2], y: +m[3], k: +m[4] });
}

/* ── Hook ──────────────────────────────────────────────── */

const DEFAULT_HEX = '#3b82f6';
const DEFAULT_RGB = hexToRgb(DEFAULT_HEX)!;

export function useColorConverter() {
  const [inputFormat, setInputFormat] = useState<ColorFormat>('hex');
  const [rawInput,    setRawInput]    = useState(DEFAULT_HEX);
  // sourceRgb — single source of truth, never derived from rounded display values
  const [sourceRgb,   setSourceRgb]   = useState<RgbColor>(DEFAULT_RGB);
  const [copied,      setCopied]      = useState<string | null>(null);

  // Always derive all formats from sourceRgb — no drift
  const colors = useMemo<ColorValues>(() => rgbToAll(sourceRgb), [sourceRgb]);

  // Parse rawInput → update sourceRgb only when input is valid
  const handleRawInput = useCallback((v: string) => {
    setRawInput(v);
    let rgb: RgbColor | null = null;
    const trimmed = v.trim();
    if (!trimmed) return;
    if (inputFormat === 'hex')  rgb = parseHex(trimmed);
    if (inputFormat === 'rgb')  rgb = parseRgb(trimmed);
    if (inputFormat === 'hsl')  rgb = parseHsl(trimmed);
    if (inputFormat === 'hsv')  rgb = parseHsv(trimmed);
    if (inputFormat === 'cmyk') rgb = parseCmyk(trimmed);
    if (rgb) setSourceRgb(rgb);
  }, [inputFormat]);

  // Validate: show error only when input is non-empty but unparseable
  const isInvalid = useMemo(() => {
    const v = rawInput.trim();
    if (!v) return false;
    let rgb: RgbColor | null = null;
    if (inputFormat === 'hex')  rgb = parseHex(v);
    if (inputFormat === 'rgb')  rgb = parseRgb(v);
    if (inputFormat === 'hsl')  rgb = parseHsl(v);
    if (inputFormat === 'hsv')  rgb = parseHsv(v);
    if (inputFormat === 'cmyk') rgb = parseCmyk(v);
    return rgb === null;
  }, [rawInput, inputFormat]);

  const handlePickerChange = useCallback((hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return;
    setSourceRgb(rgb);
    setInputFormat('hex');
    setRawInput(hex);
  }, []);

  // When switching format: read from sourceRgb directly — no rounding chain
  const handleFormatChange = useCallback((fmt: ColorFormat) => {
    setInputFormat(fmt);
    // Derive display value from sourceRgb — always lossless at this step
    const all = rgbToAll(sourceRgb);
    const map: Record<ColorFormat, string> = {
      hex:  all.hex,
      rgb:  `${all.rgb.r}, ${all.rgb.g}, ${all.rgb.b}`,
      hsl:  `${all.hsl.h}, ${all.hsl.s}, ${all.hsl.l}`,
      hsv:  `${all.hsv.h}, ${all.hsv.s}, ${all.hsv.v}`,
      cmyk: `${all.cmyk.c}, ${all.cmyk.m}, ${all.cmyk.y}, ${all.cmyk.k}`,
    };
    setRawInput(map[fmt]);
  }, [sourceRgb]);

  const copy = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    } catch { /* ignore */ }
  }, []);

  return {
    inputFormat, setInputFormat: handleFormatChange,
    rawInput, setRawInput: handleRawInput,
    pickerColor: colors.hex,
    handlePickerChange,
    colors, isInvalid, copied, copy,
  };
}
