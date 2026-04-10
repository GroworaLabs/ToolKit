import {FaqItem} from "@/lib/types";

export const faq: FaqItem[] = [
    { q: 'How are usernames generated?', a: 'Usernames are built by combining random adjectives, nouns, and verbs from curated word lists. The style setting controls the format — fun uses underscores and numbers, professional uses PascalCase, gamer removes separators, minimal keeps it short.' },
    { q: 'Are these usernames unique?', a: 'With thousands of possible word combinations, duplicates are rare. However, availability on specific platforms is not checked — always verify the name is available before registering.' },
    { q: 'Can I use these for any platform?', a: 'Yes. The generated names are designed to be appropriate for social media, gaming, professional networks, and general online accounts. Some platforms have character or format restrictions — the minimal style works best for strict requirements.' },
    { q: 'How do I pick the best username?', a: 'Choose something easy to remember, spell, and type. Shorter is generally better. Avoid numbers that look like letters (0 vs O, 1 vs l). If the name will represent a brand, prefer the professional style.' },
    { q: 'How long should a username be?', a: 'Aim for 6–20 characters. Very short usernames (under 4 characters) are almost always taken on popular platforms. Very long usernames are hard to remember and type. The sweet spot is 8–15 characters — long enough to be unique, short enough to be memorable.' },
    { q: 'Should I use numbers in my username?', a: 'Only if they add meaning (your birth year, a lucky number). Avoid appending random numbers just to grab an available name — it makes the handle look like a throwaway account. If your preferred name is taken, try combining two different words instead of adding digits.' },
    { q: 'What makes a username look professional?', a: 'A professional username avoids slang, excessive numbers, and underscores. PascalCase (BrightNova, ClearPath) looks polished on LinkedIn and GitHub. It should read as a person or brand name, not a gaming handle. Consistency across platforms — the same name on GitHub, LinkedIn, and Twitter — also signals professionalism.' },
    { q: 'Can I use the same username across all platforms?', a: 'Yes — cross-platform consistency is a significant branding advantage. Before committing to a name, check availability on all platforms you plan to use. Tools like Namecheckr let you search multiple platforms simultaneously. Consistent handles make you easier to find and harder to impersonate.' },
];

export const styleGuide = [
    { style: 'Fun',          example: 'wild_apex_392', desc: 'Great for social media and casual platforms'     },
    { style: 'Professional', example: 'BoldNova',      desc: 'LinkedIn, portfolio sites, business accounts'   },
    { style: 'Gamer',        example: 'swiftnova847',  desc: 'Gaming platforms, Twitch, Discord'              },
    { style: 'Minimal',      example: 'calmweb',       desc: 'Short handles, usernames with character limits'  },
];