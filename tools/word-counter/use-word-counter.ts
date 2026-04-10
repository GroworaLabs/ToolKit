import { useState, useCallback, useMemo } from 'react';

export interface WordStats {
  words:          number;
  chars:          number;
  charsNoSpaces:  number;
  sentences:      number;
  paragraphs:     number;
  readingTime:    string;   // "2 min read"
  speakingTime:   string;   // "3 min speak"
  uniqueWords:    number;
  avgWordLength:  string;   // "4.8"
}

export interface KeywordDensityItem {
  word:    string;
  count:   number;
  percent: string;
}

// Common English stop words to exclude from keyword density
const STOP_WORDS = new Set([
  'the','a','an','and','or','but','in','on','at','to','for','of','with',
  'by','from','is','it','its','was','are','were','be','been','being',
  'have','has','had','do','does','did','will','would','could','should',
  'may','might','this','that','these','those','i','you','he','she','we',
  'they','my','your','his','her','our','their','what','which','who','how',
  'when','where','why','not','no','so','if','as','up','out','about',
]);

function calcReadingTime(words: number): string {
  const mins = Math.ceil(words / 200);
  if (mins < 1) return '< 1 min read';
  return `${mins} min read`;
}

function calcSpeakingTime(words: number): string {
  const mins = Math.ceil(words / 130);
  if (mins < 1) return '< 1 min speak';
  return `${mins} min speak`;
}

export function useWordCounter() {
  const [text, setText] = useState('');

  const stats = useMemo<WordStats>(() => {
    if (!text.trim()) {
      return {
        words: 0, chars: 0, charsNoSpaces: 0,
        sentences: 0, paragraphs: 0,
        readingTime: '0 min read', speakingTime: '0 min speak',
        uniqueWords: 0, avgWordLength: '0',
      };
    }

    // Unicode-aware word split — works for Cyrillic, Latin, and other scripts
    const wordList = text.trim().match(/[\p{L}\p{N}]+(?:[''\-][\p{L}\p{N}]+)*/gu) ?? [];
    const words    = wordList.length;
    const chars    = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;

    // Sentences: ends with . ! ? (Unicode aware)
    const sentences = (text.match(/[^.!?]*[.!?]+/gu) ?? []).length || (words > 0 ? 1 : 0);

    // Paragraphs: non-empty blocks separated by blank lines
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length || (words > 0 ? 1 : 0);

    const uniqueWords = new Set(wordList.map(w => w.toLowerCase())).size;

    const totalCharsInWords = wordList.reduce((sum, w) => sum + w.length, 0);
    const avgWordLength = words > 0 ? (totalCharsInWords / words).toFixed(1) : '0';

    return {
      words, chars, charsNoSpaces, sentences, paragraphs,
      readingTime:  calcReadingTime(words),
      speakingTime: calcSpeakingTime(words),
      uniqueWords,  avgWordLength,
    };
  }, [text]);

  const keywords = useMemo<KeywordDensityItem[]>(() => {
    if (!text.trim()) return [];

    const wordList = text.toLowerCase().match(/\b[a-z]{3,}\b/g) ?? [];
    const freq: Record<string, number> = {};
    for (const w of wordList) {
      if (!STOP_WORDS.has(w)) freq[w] = (freq[w] ?? 0) + 1;
    }

    const total = wordList.filter(w => !STOP_WORDS.has(w)).length || 1;

    return Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([word, count]) => ({
          word,
          count,
          percent: ((count / total) * 100).toFixed(1),
        }));
  }, [text]);

  const clear = useCallback(() => setText(''), []);

  return { text, setText, stats, keywords, clear };
}