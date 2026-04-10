import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is a random text generator used for?',
    a: 'Random text generators produce placeholder content for UI mockups, database seeding, performance testing, and layout prototyping. Unlike Lorem Ipsum, random English words and sentences let you test how real language wraps in a layout. They\'re also used to generate sample data for demos, populate test databases, and stress-test input validation.',
  },
  {
    q: 'What is the difference between random words, sentences, and paragraphs?',
    a: 'Words mode outputs a flat list of individual random words — useful for tag clouds, keyword inputs, or chip components. Sentences mode produces grammatically simple sentences with a subject, verb and object — good for testing single-line text fields and cards. Paragraphs mode generates multi-sentence blocks separated by newlines — ideal for testing article layouts, modals, and reading-time estimates.',
  },
  {
    q: 'How is this different from Lorem Ipsum?',
    a: 'Lorem Ipsum is a fixed scrambled Latin text that has been in use since the 1500s. It is visually uniform and unrecognisable as any language. Random English text uses real words, producing a more realistic preview of how actual content will look and feel in a UI — including word length variation, line breaks, and hyphenation patterns typical of English.',
  },
  {
    q: 'Can I control the length of the generated text?',
    a: 'Yes. In words mode, set how many words to generate (1–500). In sentences mode, choose the number of sentences (1–50). In paragraphs mode, choose the number of paragraphs (1–20), each containing 3–7 sentences. All counts can be typed directly or adjusted with the +/− controls.',
  },
  {
    q: 'Is the generated text truly random?',
    a: 'Yes, within the constraints of the word list. Each word is selected independently using Math.random() seeded by the browser\'s runtime. The same settings will produce different output each time you click Generate. The word list is curated to include common English words across various parts of speech for natural-sounding results.',
  },
  {
    q: 'Can I use the generated text commercially?',
    a: 'Yes. The generated text is assembled from a built-in word list and produced algorithmically. It has no copyright and can be used freely in any commercial or personal project — mockups, client presentations, open-source demos, or any other purpose.',
  },
  {
    q: 'What word list does the generator use?',
    a: 'The generator uses a curated list of approximately 300 common English words covering nouns, verbs, adjectives, and adverbs from everyday usage. This produces output that resembles real text more closely than a purely random character generator, while remaining clearly non-meaningful — appropriate for placeholder use.',
  },
  {
    q: 'Is my generated text stored or shared?',
    a: 'No. All generation runs locally in your browser. Nothing is sent to any server. Generated text exists only in your browser tab until you close it or generate new text.',
  },
];

export const useCases = [
  { label: 'UI mockups',         desc: 'Fill cards, lists, and text fields with realistic-looking placeholder content'    },
  { label: 'Database seeding',   desc: 'Populate test databases with varied text data for development and QA'             },
  { label: 'Performance testing',desc: 'Generate large volumes of text to test rendering, search, and pagination'         },
  { label: 'Layout prototyping', desc: 'Test how different text lengths affect your layout before real copy is ready'     },
];
