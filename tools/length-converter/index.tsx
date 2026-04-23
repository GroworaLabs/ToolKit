import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'How many centimetres are in an inch?',
    a: 'One inch equals exactly 2.54 centimetres, by the definition of the international inch agreed in 1959. This makes it easy to convert: multiply inches by 2.54 to get centimetres, or divide centimetres by 2.54 to get inches. One foot is 30.48 cm (12 × 2.54), and one yard is 91.44 cm (36 × 2.54).',
  },
  {
    q: 'How do I convert kilometres to miles?',
    a: 'Multiply kilometres by 0.621371 to get miles. Equivalently, divide by 1.60934. A useful mental shortcut: multiply km by 0.6 for a quick estimate (10 km ≈ 6 miles is close to the real 6.21). More precisely: 5 km ≈ 3.11 miles, 10 km ≈ 6.21 miles, 42.195 km (marathon) ≈ 26.22 miles.',
  },
  {
    q: 'How many feet are in a metre?',
    a: 'One metre equals approximately 3.28084 feet, or exactly 3 feet 3.3701 inches. Conversely, one foot is 0.3048 metres. In everyday context: a 6-foot person is about 1.83 metres tall; a standard door is roughly 2.1 metres (6 ft 10 in); a 100-metre sprint is about 328 feet (109 yards).',
  },
  {
    q: 'What is the difference between a nautical mile and a statute mile?',
    a: 'A statute (land) mile is exactly 1,609.344 metres. A nautical mile is exactly 1,852 metres — about 15% longer. The nautical mile was originally defined as one minute of arc of latitude along a meridian, making it intrinsically useful for navigation: moving 1 nautical mile north or south changes your latitude by exactly 1 arcminute. Aviation and maritime navigation use nautical miles; everyday distance uses statute miles in the US.',
  },
  {
    q: 'What is a micrometre (micron) and how small is it?',
    a: 'A micrometre (µm), commonly called a micron, equals one-millionth of a metre (0.000001 m or 10⁻⁶ m). Human hair is typically 50–100 µm in diameter. A red blood cell is about 6–8 µm. Bacteria range from 1–10 µm. Modern semiconductor transistors are measured in nanometres (1,000× smaller than a micrometre). The micrometre is the standard unit for manufacturing tolerances in precision engineering.',
  },
  {
    q: 'How many yards are in a mile?',
    a: 'One statute mile equals exactly 1,760 yards, or 5,280 feet, or 63,360 inches. The mile descended from the Roman mille passuum (thousand paces, each being two steps), standardised over centuries in England. American football fields are 100 yards (end zone to end zone: 120 yards), so 17.6 football fields equal one mile.',
  },
  {
    q: 'What is the metric system and why doesn\'t the US use it?',
    a: 'The metric system (SI — Système International d\'Unités) is a decimal-based measurement system used in science worldwide and for everyday life in all countries except the US, Myanmar, and Liberia. The US adopted the Metric Conversion Act in 1975 and the metric system became the preferred system, but voluntary adoption meant most everyday use stayed Imperial. US science, medicine, military, and most industry use metric internally.',
  },
  {
    q: 'What is an angstrom and when is it used?',
    a: 'An angstrom (Å) equals 10⁻¹⁰ metres (0.1 nanometres). It was historically used in spectroscopy, crystallography, and chemistry because atomic radii and bond lengths fall in convenient ranges: the hydrogen atom has a radius of about 0.53 Å, and a carbon–carbon single bond is about 1.54 Å. The angstrom is not an SI unit (SI prefers nanometres and picometres), but it remains common in X-ray crystallography and atomic physics literature.',
  },
];

export const sidebarInfo = [
  { label: '1 inch',          value: '2.54 cm'      },
  { label: '1 foot',          value: '30.48 cm'     },
  { label: '1 yard',          value: '0.9144 m'     },
  { label: '1 mile',          value: '1,609.344 m'  },
  { label: '1 nautical mile', value: '1,852 m'      },
  { label: '1 kilometre',     value: '0.62137 mi'   },
];
