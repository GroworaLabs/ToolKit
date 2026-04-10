import {FaqItem} from "@/lib/types";


export const faq: FaqItem[] = [
    {
        q: 'What is color harmony?',
        a: 'Color harmony is the use of colors that look visually pleasing together based on their position on the color wheel. Common harmonies include analogous (adjacent colors), complementary (opposite colors), and triadic (three evenly spaced colors).',
    },
    {
        q: 'What is the difference between analogous and complementary palettes?',
        a: 'Analogous palettes use colors that sit next to each other on the color wheel — they feel cohesive and calm. Complementary palettes use colors directly opposite each other — they create strong visual contrast and energy.',
    },
    {
        q: 'How do I lock a color?',
        a: 'Click the lock icon on any swatch to keep that color fixed while regenerating the rest of the palette. This lets you build around a specific brand color or a favorite tone.',
    },
    {
        q: 'How do I use the CSS export?',
        a: 'Click "Copy CSS" to copy the palette as CSS custom properties (variables). Paste it into your stylesheet\'s :root block and use var(--color-1) through var(--color-5) anywhere in your CSS.',
    },
    {
        q: 'What color formats are supported?',
        a: 'Each color is shown in HEX, RGB, and HSL. Click any HEX value in the color table to copy it instantly.',
    },
    {
        q: 'What is the 60-30-10 color rule?',
        a: 'Use your dominant color for 60% of the visual space (large areas, backgrounds), your secondary color for 30% (cards, sidebars, secondary UI), and your accent color for 10% (buttons, links, highlights). This ratio creates visual hierarchy without overwhelming the eye. It applies equally to interior design, fashion, and UI design.',
    },
    {
        q: 'How many colors should a UI palette have?',
        a: 'A typical design system defines 2–3 brand colors (primary, secondary, accent) plus a neutral gray scale. In practice this grows to 30–50 named tokens when you include all lightness steps. For a simple project, start with 5 harmonious colors, then add neutrals and semantic colors (green for success, red for error, yellow for warning).',
    },
    {
        q: 'Why do colors look different on screen versus in print?',
        a: 'Screens use RGB (additive color — mixing light), while print uses CMYK (subtractive color — mixing ink). Vivid RGB colors like bright blues and electric greens often fall outside the CMYK gamut and cannot be reproduced accurately on paper. If your palette will be printed, use the Color Converter to check CMYK values and discuss gamut limitations with your print shop.',
    },
];

export const harmonySidebar = [
    { label: 'Analogous',          desc: 'Neighbours on the wheel — calm, natural feel'              },
    { label: 'Complementary',      desc: 'Opposites — high contrast, bold and energetic'              },
    { label: 'Triadic',            desc: 'Three evenly spaced — vibrant yet balanced'                  },
    { label: 'Split Complementary',desc: 'Softer than complementary, more variety than analogous'     },
    { label: 'Tetradic',           desc: 'Four colors — rich palettes, harder to balance'             },
    { label: 'Monochromatic',      desc: 'One hue, varied lightness — elegant and cohesive'           },
];

export const colorTips = [
    { tip: '60–30–10 rule',   desc: 'Use your dominant color for 60%, secondary for 30%, accent for 10%' },
    { tip: 'Contrast ratio',  desc: 'Text needs at least 4.5:1 contrast for WCAG AA accessibility'       },
    { tip: 'Lock base first', desc: 'Lock your brand or primary color, then generate harmonies around it' },
];