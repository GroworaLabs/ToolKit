import { useState, useCallback } from 'react';

export type LoremUnit = 'paragraphs' | 'sentences' | 'words';

const LOREM_WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'.split(' ');

function pickWord(exclude?: string): string {
    let w: string;
    do { w = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]; }
    while (w === exclude);
    return w;
}

function makeSentence(wordCount = 0): string {
    const len = wordCount || Math.floor(Math.random() * 12) + 6;
    const words = Array.from({ length: len }, (_, i) => i === 0 ? pickWord().charAt(0).toUpperCase() + pickWord().slice(1) : pickWord());
    return words.join(' ') + '.';
}

function makeParagraph(): string {
    const sentCount = Math.floor(Math.random() * 4) + 3;
    return Array.from({ length: sentCount }, () => makeSentence()).join(' ');
}

export function useLoremIpsum() {
    const [unit,    setUnit]    = useState<LoremUnit>('paragraphs');
    const [amount,  setAmount]  = useState(3);
    const [startWithLorem, setStartWithLorem] = useState(true);
    const [output,  setOutput]  = useState('');
    const [copied,  setCopied]  = useState(false);

    const generate = useCallback(() => {
        let text = '';
        if (unit === 'paragraphs') {
            const paras = Array.from({ length: amount }, (_, i) => {
                if (i === 0 && startWithLorem) return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + makeParagraph();
                return makeParagraph();
            });
            text = paras.join('\n\n');
        } else if (unit === 'sentences') {
            const sentences = Array.from({ length: amount }, (_, i) => {
                if (i === 0 && startWithLorem) return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
                return makeSentence();
            });
            text = sentences.join(' ');
        } else {
            const words = Array.from({ length: amount }, (_, i) => {
                if (i === 0 && startWithLorem) return 'lorem';
                return pickWord();
            });
            text = words.join(' ');
        }
        setOutput(text);
        setCopied(false);
    }, [unit, amount, startWithLorem]);

    const copy = useCallback(async () => {
        if (!output) return;
        try {
            await navigator.clipboard.writeText(output);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch { /* ignore */ }
    }, [output]);

    return { unit, setUnit, amount, setAmount, startWithLorem, setStartWithLorem, output, generate, copy, copied };
}