import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is a contrast ratio and how is it calculated?',
    a: 'Contrast ratio is a measure of luminance difference between two colours, defined by WCAG as (L1 + 0.05) / (L2 + 0.05), where L1 is the relative luminance of the lighter colour and L2 of the darker one. Relative luminance is computed by linearising sRGB channel values and applying the formula L = 0.2126R + 0.7152G + 0.0722B. Ratios range from 1:1 (identical colours) to 21:1 (black on white).',
  },
  {
    q: 'What are the WCAG AA and AAA requirements?',
    a: 'WCAG 2.1 Level AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (18pt / 14pt bold or larger). Level AAA requires 7:1 for normal text and 4.5:1 for large text. Most legal accessibility requirements (ADA, EN 301 549, EAA) mandate at least Level AA compliance.',
  },
  {
    q: 'What counts as "large text" in WCAG?',
    a: 'WCAG defines large text as at least 18pt (24px) for regular weight, or at least 14pt (approximately 18.67px) for bold text. Headings typically qualify; body paragraphs typically do not. CSS font-size in px maps to pt via: 1pt = 1.333px, so 18pt ≈ 24px.',
  },
  {
    q: 'Can I enter colours in formats other than hex?',
    a: 'The colour inputs accept any CSS colour string: hex (#fff, #ffffff), RGB (rgb(255,255,255)), HSL (hsl(0,0%,100%)), and named colours (white, black, cornflowerblue). The tool parses the value using the browser\'s built-in colour parser, so any valid CSS colour works.',
  },
  {
    q: 'What is the minimum contrast ratio for UI components?',
    a: 'WCAG 2.1 Success Criterion 1.4.11 (Non-text Contrast) requires a 3:1 ratio for the visual boundaries of UI components (buttons, inputs, checkboxes) and graphical objects (icons, charts). This applies to the component against its adjacent colours, not to text within the component.',
  },
  {
    q: 'Does contrast ratio account for colour blindness?',
    a: 'Partially. The WCAG luminance formula uses human eye sensitivity weights (R×0.2126, G×0.7152, B×0.0722), which reflect typical colour perception. However, specific colour combinations that look fine to people with normal vision may still be indistinguishable for those with colour blindness — for example, red on green can pass contrast ratio but fail for deuteranopia. Use a colour blindness simulator alongside contrast checking.',
  },
  {
    q: 'My design fails WCAG AA — what should I adjust?',
    a: 'The most effective fix is to darken the foreground colour or lighten the background (or vice versa for dark-mode designs). Increasing font size or weight can reduce the required ratio from 4.5:1 to 3:1. Avoid adjusting hue alone — hue changes rarely improve luminance contrast significantly. Use the colour picker to nudge lightness/brightness until the ratio passes.',
  },
  {
    q: 'Is this tool\'s calculation accurate?',
    a: 'Yes. The tool uses the exact WCAG 2.1 relative luminance formula, including the correct linearisation of sRGB values (applying the 2.4 gamma correction per the IEC 61966-2-1 standard). Results match the W3C\'s own contrast ratio checker and industry tools like WebAIM\'s contrast checker.',
  },
];

export const sidebarLinks = [
  { label: 'WCAG 2.1 — SC 1.4.3', href: 'https://www.w3.org/TR/WCAG21/#contrast-minimum' },
  { label: 'WCAG 2.1 — SC 1.4.6', href: 'https://www.w3.org/TR/WCAG21/#contrast-enhanced' },
  { label: 'WCAG 2.1 — SC 1.4.11', href: 'https://www.w3.org/TR/WCAG21/#non-text-contrast' },
];
