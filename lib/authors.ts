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
  'ryan-fletcher': {
    id:    'ryan-fletcher',
    name:  'Ryan Fletcher',
    title: 'DevOps & Site Reliability Engineer',
    bio:   'Platform engineer with a background in CI/CD pipelines, Kubernetes, and frontend performance. Writes about the infrastructure side of shipping software: build tools, deployment, observability, and making things fast.',
    image: '/authors/ryan-fletcher.jpg',
  },
  'sophie-larkin': {
    id:    'sophie-larkin',
    name:  'Sophie Larkin',
    title: 'Frontend Engineer',
    bio:   'Frontend engineer who specialises in design systems, CSS architecture, and developer experience. Writes about the visual and tooling layer of the web: color, typography, build pipelines, and the small things that make UIs feel right.',
    image: '/authors/sophie-larkin.jpg',
  },
};

export function getAuthor(id: string | undefined): Author {
  return AUTHORS[id ?? ''] ?? AUTHORS['marcus-chen'];
}
