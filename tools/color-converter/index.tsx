import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is the difference between HEX, RGB, and HSL?',
    a: 'HEX (#rrggbb) is shorthand for RGB in base-16, used in HTML and CSS. RGB (Red, Green, Blue) defines colors by mixing three light channels, each 0–255. HSL (Hue, Saturation, Lightness) describes colors by their position on the color wheel plus their intensity and brightness — making it more intuitive for design work.',
  },
  {
    q: 'What is HSV and how is it different from HSL?',
    a: 'HSV (Hue, Saturation, Value) and HSL both use a cylindrical color model, but differ in the third component: HSL measures Lightness (0% = black, 100% = white, 50% = pure color), while HSV measures Value (0% = black, 100% = full brightness). HSV is used in most design tools like Photoshop and Figma. HSL is more common in CSS.',
  },
  {
    q: 'What is CMYK and when is it used?',
    a: 'CMYK (Cyan, Magenta, Yellow, Black) is a subtractive color model used in print. Unlike RGB which adds light, CMYK works by subtracting light from white paper using ink. If you are designing for print (business cards, posters, brochures), your printer will need CMYK values.',
  },
  {
    q: 'Why does my color look different in print than on screen?',
    a: 'Screens use additive RGB color (light) while printers use subtractive CMYK color (ink). Some vivid RGB colors — especially bright blues and purples — cannot be accurately reproduced in CMYK because the gamut (range of reproducible colors) is smaller. Always proof your design in CMYK before printing.',
  },
  {
    q: 'Can I use HSL colors directly in CSS?',
    a: 'Yes. Modern CSS supports hsl(h, s%, l%) and the newer hsl(h s% l%) syntax (without commas). HSL is often preferred for CSS because you can easily create lighter or darker variants by adjusting only the lightness value, making theming and design systems simpler.',
  },
  {
    q: 'What is a CSS custom property (variable) for colors?',
    a: 'A CSS custom property stores a color value as a reusable variable: --color-primary: #3b82f6. You then reference it as color: var(--color-primary). This is the foundation of design tokens and theming in modern CSS — change the variable once and it updates everywhere.',
  },
  {
    q: 'How precise is this conversion?',
    a: 'RGB and HEX conversions are lossless (exact). HSL, HSV, and CMYK conversions involve rounding since they use different mathematical models. Converting HEX → HSL → HEX may produce a value 1–2 steps off due to rounding. For critical design work, verify the final hex value after multiple conversions.',
  },
];

export const sidebarInfo = [
  { label: 'Formats',    value: 'HEX, RGB, HSL, HSV, CMYK' },
  { label: 'CSS output', value: 'rgb(), hsl(), var()' },
  { label: 'Input',      value: 'Any format' },
  { label: 'Picker',     value: 'Native color picker' },
  { label: 'Copy',       value: 'Click any row' },
  { label: 'Data sent',  value: 'Zero — 100% local' },
];
