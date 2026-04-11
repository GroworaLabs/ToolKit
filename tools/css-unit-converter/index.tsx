import { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
    { q: 'What is the difference between px and rem?', a: 'px is an absolute unit — 1px is always one CSS pixel regardless of context. rem (root em) is relative to the root element\'s font size (typically 16px by default). If the root font size is 16px, then 1rem = 16px. Unlike px, rem scales with the user\'s browser font size preference, making it better for accessibility and responsive design.' },
    { q: 'When should I use rem instead of px?', a: 'Use rem for font sizes, spacing, and most layout measurements where accessibility matters. Users can override the browser\'s base font size (common for low-vision users), and rem units respect that override. Use px for things that should not scale with font size: borders (1px), box shadows, and precise icon sizes.' },
    { q: 'What is the difference between em and rem?', a: 'Both are relative units, but rem is relative to the root (html) element\'s font size, while em is relative to the nearest ancestor\'s font size. This means em units compound: if a parent has font-size: 1.5em and a child has font-size: 1.5em too, the child\'s effective size is 1.5 × 1.5 = 2.25× the base. rem avoids this compounding by always referencing the root.' },
    { q: 'What are vw and vh units?', a: 'vw (viewport width) and vh (viewport height) are percentages of the browser window\'s dimensions. 1vw = 1% of the viewport width, so 100vw = full width. They are ideal for full-screen layouts, hero sections, and fluid typography. On mobile, vh is notoriously tricky because the browser UI (address bar) affects the viewport height — use svh (small viewport height) or dvh (dynamic viewport height) for mobile-first designs.' },
    { q: 'What is 1rem in pixels?', a: 'By default, browsers set the root font size to 16px, so 1rem = 16px. However, this is configurable — users can change it in browser settings, and developers can change it with html { font-size: 62.5% } (making 1rem = 10px for easier math). This converter lets you set a custom base font size.' },
    { q: 'What are CSS print units (pt, cm, mm, in)?', a: 'Point (pt), centimeter (cm), millimeter (mm), and inch (in) are physical units meaningful for print stylesheets (@media print). 1in = 96px = 72pt = 2.54cm = 25.4mm. On screen, these units are resolved to pixels at 96 DPI. Use them in @media print rules for accurate printed document layout, not for screen layouts.' },
    { q: 'What does % mean as a CSS unit?', a: '% (percent) is relative to the parent element\'s corresponding value. For font-size, 100% equals the inherited font-size. For width, 100% equals the parent\'s content width. For margins and padding with the % unit, they are calculated relative to the parent\'s width, even for top/bottom values — a common source of confusion.' },
    { q: 'What is the ch unit?', a: 'ch (character) equals the width of the "0" character in the current font. It\'s useful for sizing text inputs and code blocks: width: 80ch creates an input that fits 80 characters, matching the traditional terminal width. It approximates average character width for proportional fonts but is exact for monospace fonts.' },
    { q: 'How do I do responsive typography without breakpoints?', a: 'Use the CSS clamp() function: font-size: clamp(1rem, 2.5vw, 2rem) sets a minimum, a fluid middle, and a maximum. No media queries needed. The browser interpolates the font size between the min and max as the viewport grows. Combined with rem as min and max and vw as the fluid value, you get accessible, responsive typography in one line.' },
];

export const sidebarInfo = [
    { label: '1rem (default)',  desc: '= 16px (browser default root font size)'  },
    { label: '1pt',            desc: '= 1.333px = 1/72 inch at 96 DPI'          },
    { label: '1cm',            desc: '= 37.795px at 96 DPI screen resolution'    },
    { label: '1in',            desc: '= 96px (96 DPI standard)'                  },
    { label: '1vw at 1440px',  desc: '= 14.4px viewport width unit'              },
];
