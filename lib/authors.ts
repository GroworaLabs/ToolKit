import type { Author } from './types';

export const AUTHORS: Record<string, Author> = {
  'marcus-chen': {
    id:    'marcus-chen',
    name:  'Marcus Chen',
    title: 'Security Engineer',
    bio:   'Backend engineer with 10+ years building authentication systems and API infrastructure. Writes about cryptography, identity, and the weird corners of HTTP.',
    image: '/authors/marcus-chen.jpg',
  },
  'olivia-bennett': {
    id:    'olivia-bennett',
    name:  'Olivia Bennett',
    title: 'Full-stack Developer',
    bio:   'Full-stack developer focused on developer tooling and web performance. Writes about the formats, patterns, and shortcuts devs reach for every day.',
    image: '/authors/olivia-bennett.jpg',
  },
};

export function getAuthor(id: string | undefined): Author {
  return AUTHORS[id ?? ''] ?? AUTHORS['marcus-chen'];
}
