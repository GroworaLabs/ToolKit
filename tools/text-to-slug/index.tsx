import { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is a URL slug?',
    a: 'A URL slug is the part of a web address that identifies a specific page in a human-readable form. In "https://example.com/blog/how-to-bake-bread", the slug is "how-to-bake-bread". Slugs replace spaces with hyphens, remove special characters, and use lowercase letters so URLs are clean, shareable, and optimized for search engines.',
  },
  {
    q: 'How does the slug converter handle accented characters?',
    a: 'Accented characters like é, ñ, ü, and ø are transliterated to their closest ASCII equivalents (e, n, u, o) using Unicode normalization (NFD decomposition). This ensures slugs remain URL-safe without percent-encoding, which keeps links clean and readable across all browsers and platforms.',
  },
  {
    q: 'Should I use hyphens or underscores in URL slugs?',
    a: 'Use hyphens. Google officially recommends hyphens as word separators in URLs. Underscores cause Google to treat connected words as a single unit — "my_page" is read as one keyword "mypage", while "my-page" is read as two separate keywords "my" and "page". Hyphens also improve readability for human visitors.',
  },
  {
    q: 'Does slug length affect SEO?',
    a: 'Yes, but the guideline is to keep slugs concise and descriptive rather than long. Remove stop words like "a", "the", "and", "of" from slugs when possible. Most SEO guides recommend keeping slugs under 5–7 words. Google truncates long URLs in search results, so a clear, keyword-rich slug is better than a verbose one.',
  },
  {
    q: 'Can I use numbers in URL slugs?',
    a: 'Yes, numbers are fully valid in slugs. They are commonly used for years ("2024-seo-guide"), versions ("python-3-tutorial"), or listicles ("10-best-practices"). Numbers are preserved exactly as-is by this converter.',
  },
  {
    q: 'What happens to symbols like @, #, and & in slugs?',
    a: 'Most special characters and symbols are stripped from slugs because they are either reserved in URLs (# starts a fragment, & separates parameters) or require percent-encoding which makes URLs ugly. Exceptions: hyphens and underscores used as separators are preserved or standardized based on your chosen separator setting.',
  },
  {
    q: 'Should slugs always be lowercase?',
    a: 'Yes. URLs are technically case-sensitive on most servers, meaning /Blog/Post and /blog/post could be two different pages, causing duplicate content issues. Always use lowercase slugs and set up redirects to enforce them. This converter lowercases everything by default.',
  },
  {
    q: 'What is the difference between a slug and a permalink?',
    a: 'A slug is just the text identifier portion of a URL (e.g., "my-article-title"), while a permalink (permanent link) is the complete URL structure including the domain and path (e.g., "https://example.com/blog/my-article-title"). The slug is one component of the permalink.',
  },
  {
    q: 'Can I change a slug after publishing without hurting SEO?',
    a: 'Changing a published slug can hurt SEO if you do not set up a 301 redirect from the old URL to the new one. Without a redirect, any backlinks and search rankings pointing to the old URL are lost. If you must change a slug, always implement a permanent redirect and update internal links.',
  },
];

export const slugRules = [
  { rule: 'Lowercase only',          desc: 'Prevents duplicate content from case differences'        },
  { rule: 'Hyphens as separators',   desc: 'Google reads hyphens as word separators (not underscores)' },
  { rule: 'No special characters',   desc: 'Strip @, #, !, ?, &, % and other non-alphanumeric chars' },
  { rule: 'No leading/trailing hyphens', desc: 'Clean start and end with no extra dashes'             },
  { rule: 'Accents transliterated',  desc: 'é→e, ñ→n, ü→u for clean ASCII-only slugs'               },
  { rule: 'Short and descriptive',   desc: 'Aim for 3–5 keywords; remove stop words when possible'   },
];
