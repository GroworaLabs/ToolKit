import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is a favicon and where is it used?',
    a: 'A favicon (short for "favourite icon") is a small image that browsers display in the tab bar, bookmarks, history, and address bar. It is linked in the HTML <head> with <link rel="icon" href="/favicon.ico">. Browsers request it automatically even without the link tag. A recognisable favicon reinforces brand identity and helps users locate your tab among many open ones.',
  },
  {
    q: 'What sizes should a favicon be?',
    a: 'The minimum is 16×16 px (browser tabs). 32×32 px is used for taskbar pinned sites and higher-DPI displays. 192×192 px is used for Android home screen shortcuts (web app manifest). Apple devices use 180×180 px (apple-touch-icon). ICO files can contain multiple sizes in one file. This generator produces 16, 32, and 192 px PNG files plus a combined ICO.',
  },
  {
    q: 'What is an ICO file?',
    a: 'An ICO file is a container format that bundles multiple image sizes into a single file. When a browser requests favicon.ico, the OS picks the most appropriate size from within the file. ICO is the only format that works in all browsers including older Internet Explorer versions. For modern projects, PNG favicons with explicit size declarations are also fully supported.',
  },
  {
    q: 'Can I use an emoji as a favicon?',
    a: 'Yes — and this is one of the most common modern approaches. Emojis render at any size, require no design skill, and are immediately recognisable. Simply type your chosen emoji into the text field. The generator renders it on a canvas and produces downloadable PNGs and an ICO. This technique is used on many developer tools and personal sites.',
  },
  {
    q: 'What fonts are available for the text favicon?',
    a: 'The generator uses the fonts available in your browser\'s system. By default it uses a bold sans-serif stack. Because favicons are very small, simple bold letters render more clearly than decorative fonts. Single letters and emojis work best — two or three characters maximum for 16×16 px clarity.',
  },
  {
    q: 'How do I install the favicon on my website?',
    a: 'Place favicon.ico in the root of your domain (e.g. https://example.com/favicon.ico). Browsers fetch it automatically. For PNG variants, add them to your HTML <head>: <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">. For PWAs, reference 192×192 in your manifest.json under the icons array.',
  },
  {
    q: 'Will the favicon look good at 16×16 px?',
    a: 'Simple designs — a single letter, digit, or emoji — work well at 16×16. Complex logos or multi-word text do not scale down well. Preview the 16×16 download before deploying. If the result looks blurry, try a single initial letter in a contrasting colour on a solid background, which is the most legible approach at small sizes.',
  },
  {
    q: 'Is the generated favicon free to use commercially?',
    a: 'Yes. You provide the text or emoji input and choose the colours — the generator simply renders your choices onto a canvas. The output is entirely yours. If you use an emoji, be aware that emoji designs are owned by platform vendors (Apple, Google, etc.) — using them on a commercial site is generally accepted practice, but check your use case if you have specific IP concerns.',
  },
];

export const faviconTips = [
  { tip: 'Use a single character',  desc: 'One letter or digit is the most legible design at 16×16 px'             },
  { tip: 'High contrast colours',   desc: 'Light text on dark background (or vice versa) reads clearly in any theme' },
  { tip: 'Try an emoji',            desc: 'Emoji favicons are instantly recognisable and require no design skill'     },
  { tip: 'Test at actual size',     desc: 'Check the 16×16 download before deploying — small details disappear'      },
];
