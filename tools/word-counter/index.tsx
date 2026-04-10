import {FaqItem} from "@/lib/types";


export const faq: FaqItem[] = [
  {
    q: 'How does the word counter work?',
    a: 'It counts words by matching sequences of characters separated by spaces or punctuation. Everything runs in your browser — no text is ever sent to a server.',
  },
  {
    q: 'What is reading time based on?',
    a: 'Reading time uses the average adult silent reading speed of 200 words per minute. Speaking time uses 130 wpm, which is a typical conversational pace.',
  },
  {
    q: 'Why are some words excluded from keyword density?',
    a: 'Common "stop words" like "the", "a", "and", "is" are excluded because they appear in every text and carry no meaning for keyword analysis.',
  },
  {
    q: 'What counts as a sentence?',
    a: 'A sentence is counted each time the text contains a period, exclamation mark, or question mark. Single-line texts without punctuation count as one sentence.',
  },
  {
    q: 'Does it work with non-English text?',
    a: 'Word and character counts work for any language. Keyword density and reading time estimates are calibrated for English text.',
  },
  {
    q: 'What is the ideal word count for an SEO blog post?',
    a: 'There is no universal answer, but data from multiple studies suggests 1,500–2,500 words for competitive topics. Long-form posts (2,000+ words) tend to rank better for informational queries because they cover topics more thoroughly. However, word count is not a direct ranking factor — topic coverage, E-E-A-T signals, and backlinks matter more. Write what fully answers the question, then check if the length is appropriate.',
  },
  {
    q: 'What is keyword density and how much is too much?',
    a: 'Keyword density is the percentage of words in a text that match a specific keyword. A density above 2–3% for any single keyword is generally considered keyword stuffing and can negatively affect SEO. Modern search engines focus on topic coverage and semantic relevance rather than exact keyword repetition. Use the keyword density panel to identify over-used words, not to optimize for a target percentage.',
  },
  {
    q: 'How do reading time estimates work and how accurate are they?',
    a: 'Reading time is calculated by dividing the word count by the average adult silent reading speed — typically 200–250 words per minute. This tool uses 200 wpm, which is a conservative estimate. Actual reading speed varies widely: technical content is read more slowly (100–150 wpm), fiction and news more quickly (250–300 wpm). Treat the estimate as a useful approximation rather than a precise measurement.',
  },
];

export const whatsMeasured = [
  { label: 'Words',          desc: 'Total word count, live as you type'     },
  { label: 'Characters',     desc: 'With and without spaces'                },
  { label: 'Sentences',      desc: 'Detected by punctuation'                },
  { label: 'Paragraphs',     desc: 'Separated by blank lines'               },
  { label: 'Reading time',   desc: 'Based on 200 words per minute'          },
  { label: 'Speaking time',  desc: 'Based on 130 words per minute'          },
  { label: 'Unique words',   desc: 'Vocabulary richness indicator'          },
  { label: 'Keyword density',desc: 'Top 8 words, stop words excluded'       },
];

export const commonLimits = [
  { platform: 'Tweet (X)',              limit: '280 chars'         },
  { platform: 'Meta description (SEO)', limit: '160 chars'         },
  { platform: 'LinkedIn post',          limit: '3,000 chars'       },
  { platform: 'Blog post (ideal SEO)',  limit: '1,500–2,500 words' },
  { platform: 'College essay',          limit: '500–650 words'     },
  { platform: 'Short story',            limit: '1,000–7,500 words' },
];
