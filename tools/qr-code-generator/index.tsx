import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is a QR code?',
    a: 'A QR code (Quick Response code) is a two-dimensional barcode that stores data as a pattern of black and white squares. It can encode URLs, text, contact information, WiFi credentials, and more. Any smartphone camera can read it in under a second.',
  },
  {
    q: 'Is this QR code generator free?',
    a: 'Yes, completely free with no limits. You can generate unlimited QR codes and download them as PNG or SVG. No account, no watermark, no expiry date on the codes.',
  },
  {
    q: 'What is the difference between PNG and SVG download?',
    a: 'PNG is a raster image — best for web use, social media, and digital display. SVG is a vector format that scales to any size without losing quality — ideal for print, logos, business cards, and large-format printing. For print use, always download SVG.',
  },
  {
    q: 'What does error correction level mean?',
    a: 'Error correction allows QR codes to be read even if partially damaged or covered. Level L (7%) is smallest and best for clean digital use. Level M (15%) is the standard balance. Level Q (25%) is recommended if you plan to overlay a logo on the QR code. Level H (30%) provides the maximum recovery — use for industrial or outdoor applications.',
  },
  {
    q: 'How big should my QR code be for print?',
    a: 'The minimum printable size is 2cm × 2cm (about 0.8 inches). For business cards, 2.5cm works well. For posters, use at least 4–5cm. The further the scanning distance, the larger the code needs to be. As a rule: scanning distance ÷ 10 = minimum QR size.',
  },
  {
    q: 'Can I customize the colors of a QR code?',
    a: 'Yes. You can set any foreground and background color using the color pickers. Important: maintain high contrast between QR color and background — dark QR on light background works best. Avoid low-contrast combinations (e.g., gray on white) as they may fail to scan.',
  },
  {
    q: 'Do QR codes expire?',
    a: 'QR codes generated here are static — they encode the data directly and never expire. The code will work as long as the URL or content it points to is active. Dynamic QR codes (with redirect tracking) are a different product that requires a paid service.',
  },
  {
    q: 'What is the quiet zone (margin) setting?',
    a: 'The quiet zone is the white border around the QR code. Most QR standards require a minimum of 4 modules of quiet zone. Reducing it below 2 may cause scanning failures, especially on printed materials. The default setting of 2 is safe for most uses.',
  },
];

export const sidebarInfo = [
  { label: 'Output formats', value: 'PNG + SVG' },
  { label: 'Max data',       value: '~3KB text / 2953 bytes' },
  { label: 'Error levels',   value: 'L / M / Q / H' },
  { label: 'Colors',         value: 'Fully customizable' },
  { label: 'Watermark',      value: 'None — ever' },
  { label: 'Data sent',      value: 'Zero — 100% local' },
];
