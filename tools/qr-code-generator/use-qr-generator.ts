import { useState, useCallback, useRef, useEffect } from 'react';

export type QrErrorLevel = 'L' | 'M' | 'Q' | 'H';

export interface QrOptions {
  text:        string;
  size:        number;
  fgColor:     string;
  bgColor:     string;
  errorLevel:  QrErrorLevel;
  margin:      number;
}

const DEFAULT: QrOptions = {
  text:       'https://www.webtoolkit.tech',
  size:       256,
  fgColor:    '#000000',
  bgColor:    '#ffffff',
  errorLevel: 'M',
  margin:     2,
};

export function useQrGenerator() {
  const [options,   setOptions]   = useState<QrOptions>(DEFAULT);
  const [dataUrl,   setDataUrl]   = useState<string>('');
  const [svgString, setSvgString] = useState<string>('');
  const [copied,    setCopied]    = useState(false);
  const [error,     setError]     = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const generate = useCallback(async () => {
    if (!options.text.trim()) {
      setDataUrl(''); setSvgString(''); setError(null);
      return;
    }
    try {
      // Static import — avoids require.e bundler issue with Next.js 14
      const QRCode = (await import('qrcode')).default;

      const canvas = canvasRef.current;
      if (canvas) {
        await QRCode.toCanvas(canvas, options.text, {
          width:                options.size,
          margin:               options.margin,
          errorCorrectionLevel: options.errorLevel,
          color: { dark: options.fgColor, light: options.bgColor },
        });
        setDataUrl(canvas.toDataURL('image/png'));
      }

      const svg = await QRCode.toString(options.text, {
        type:                 'svg' as const,
        width:                options.size,
        margin:               options.margin,
        errorCorrectionLevel: options.errorLevel,
        color: { dark: options.fgColor, light: options.bgColor },
      });
      setSvgString(svg);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to generate QR code');
    }
  }, [options]);

  useEffect(() => {
    const t = setTimeout(generate, 200);
    return () => clearTimeout(t);
  }, [generate]);

  const downloadPng = useCallback(() => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'qrcode.png';
    a.click();
  }, [dataUrl]);

  const downloadSvg = useCallback(() => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'qrcode.svg';
    a.click();
    URL.revokeObjectURL(url);
  }, [svgString]);

  const copyImage = useCallback(async () => {
    if (!dataUrl) return;
    try {
      const res  = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        await navigator.clipboard.writeText(options.text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch { /* ignore */ }
    }
  }, [dataUrl, options.text]);

  const update = useCallback(<K extends keyof QrOptions>(key: K, val: QrOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: val }));
  }, []);

  return {
    options, update, canvasRef,
    dataUrl, svgString, copied, error,
    downloadPng, downloadSvg, copyImage,
  };
}