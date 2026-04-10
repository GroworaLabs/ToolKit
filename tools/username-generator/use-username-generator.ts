import { useState, useCallback } from 'react';

export type UsernameStyle = 'fun' | 'professional' | 'gamer' | 'minimal';

const ADJECTIVES = ['swift','bold','calm','dark','epic','fast','gold','iron','jade','keen','lone','mild','neon','odd','pale','quick','rare','sage','true','vast','wild','zest','azure','brave','crisp','dusk','elder','frost','grand','happy','icy','jolly','kind','lunar','mystic','noble','orange','prime','quiet','rustic','silent','turbo','ultra','vivid','warm'];
const NOUNS      = ['ace','arc','bay','bit','cog','den','dot','era','fog','gem','hex','ink','jet','key','lab','map','net','orb','pad','ray','sky','tag','uri','vig','web','xor','yak','zen','apex','bird','cake','dusk','echo','flux','gale','halo','iris','jolt','knot','lark','mist','nova','onyx','peak','quark','rune','soul','tide','unit','volt','wave'];
const VERBS      = ['build','chase','craft','drive','forge','grasp','hack','ignite','jump','keep','lead','make','ninja','orbit','push','quest','race','spark','think','unite','vault','wake','xerox','yield','zoom'];
const NUMBERS    = () => Math.floor(Math.random() * 900) + 100;
const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

function generate(style: UsernameStyle, count: number): string[] {
    return Array.from({ length: count }, () => {
        const adj = pick(ADJECTIVES);
        const noun = pick(NOUNS);
        const verb = pick(VERBS);
        const num  = NUMBERS();

        switch (style) {
            case 'fun':
                return [pick([adj, verb]), noun, Math.random() > 0.5 ? String(num) : ''].filter(Boolean).join('_');
            case 'professional':
                return adj.charAt(0).toUpperCase() + adj.slice(1) + noun.charAt(0).toUpperCase() + noun.slice(1);
            case 'gamer':
                return `${pick([adj,verb])}${noun}${num}`.replace(/_/g, '');
            case 'minimal':
                return `${adj}${noun}`;
            default:
                return `${adj}_${noun}`;
        }
    });
}

export function useUsernameGenerator() {
    const [style,    setStyle]   = useState<UsernameStyle>('fun');
    const [usernames, setUsernames] = useState<string[]>(() => generate('fun', 8));
    const [copied,   setCopied]  = useState<string | null>(null);

    const generateNew = useCallback((newStyle?: UsernameStyle) => {
        const s = newStyle ?? style;
        if (newStyle) setStyle(newStyle);
        setUsernames(generate(s, 8));
    }, [style]);

    const copy = useCallback(async (name: string) => {
        try {
            await navigator.clipboard.writeText(name);
            setCopied(name);
            setTimeout(() => setCopied(null), 1800);
        } catch { /* ignore */ }
    }, []);

    return { style, usernames, generateNew, copy, copied };
}