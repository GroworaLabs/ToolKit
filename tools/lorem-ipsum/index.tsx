import {FaqItem} from "@/lib/types";


export const faq: FaqItem[] = [
    { q: 'What is Lorem Ipsum?', a: 'Lorem Ipsum is scrambled Latin text from Cicero\'s "De Finibus Bonorum et Malorum" (45 BC). It has been used as placeholder text in publishing and web design since the 1960s because it looks like natural language without being readable or distracting.' },
    { q: 'Why use Lorem Ipsum instead of real text?', a: 'Placeholder text lets designers and developers focus on layout, typography, and spacing without the distraction of meaningful content. It also prevents clients from fixating on copy before the design is finalized.' },
    { q: 'Is Lorem Ipsum copyrighted?', a: 'No. The original Latin source is over 2,000 years old and in the public domain. The Lorem Ipsum variant used in design has been freely used for decades with no copyright restrictions.' },
    { q: 'How many paragraphs should I generate?', a: 'For a single content block or card, 1 paragraph is usually enough. For a full page layout, 3–5 paragraphs gives a realistic sense of content density. Use sentences or words for smaller UI elements like buttons, labels, or headings.' },
    { q: 'Does Lorem Ipsum affect SEO if left on a published page?', a: 'Yes — publishing Lorem Ipsum on a live website is an SEO mistake. Search engines index placeholder text as real content. Latin gibberish signals thin or low-quality content and can trigger ranking penalties. Always replace placeholder text before deploying to production.' },
    { q: 'Why does Lorem Ipsum start with "Lorem ipsum dolor sit amet"?', a: 'This specific opening has been used since the 1960s when Letraset first included it on dry-transfer sheets. It comes from Cicero\'s "De Finibus Bonorum et Malorum" but is deliberately scrambled and shortened. The phrase has become so recognizable as a placeholder that seeing it instantly signals "this is not real content."' },
    { q: 'What is the difference between "paragraphs", "sentences", and "words" modes?', a: 'Paragraphs generate full blocks of 4–7 sentences — ideal for body copy in articles and blog post mockups. Sentences generate individual sentences of 10–20 words — useful for card descriptions, subtitles, and testimonials. Words generate 1–10 words — useful for headings, button labels, navigation items, and tags.' },
    { q: 'How do I generate Lorem Ipsum programmatically in code?', a: 'Use a library for your environment: lorem-ipsum or @faker-js/faker (npm/Node.js), Faker (Python), Faker (PHP/Laravel), or Faker (Ruby). These are useful for seeding test databases, generating realistic mock API responses, and populating Storybook stories with varied content lengths. For quick one-off generation, this browser tool is faster than setting up a library.' },
];

export const useCases = [
    { label: 'Web mockups',       desc: 'Fill page layouts before real copy is ready'   },
    { label: 'Typography testing', desc: 'See how fonts render at different densities'  },
    { label: 'UI prototypes',     desc: 'Populate cards, feeds, and list components'    },
    { label: 'Print design',      desc: 'Standard in brochures, magazines, and posters' },
];