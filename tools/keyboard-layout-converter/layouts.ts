const EN = "`1234567890-=qwertyuiop[]asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}ASDFGHJKL:\"ZXCVBNM<>?";

const UA = "'1234567890-=йцукенгшщзхїфівапролджєячсмитьбю.₴!\"№;%:?*()_+ЙЦУКЕНГШЩЗХЇФІВАПРОЛДЖЄЯЧСМИТЬБЮ,";

const RU = "ё1234567890-=йцукенгшщзхъфывапролджэячсмитьбю.Ё!\"№;%:?*()_+ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,";

export type LayoutPair = 'en→ua' | 'ua→en' | 'en→ru' | 'ru→en';

export const LAYOUT_OPTIONS: { id: LayoutPair; label: string; from: string; to: string }[] = [
  { id: 'en→ua', label: 'English → Ukrainian', from: 'EN (QWERTY)', to: 'UA (ЙЦУКЕН)' },
  { id: 'ua→en', label: 'Ukrainian → English', from: 'UA (ЙЦУКЕН)', to: 'EN (QWERTY)' },
  { id: 'en→ru', label: 'English → Russian',   from: 'EN (QWERTY)', to: 'RU (ЙЦУКЕН)' },
  { id: 'ru→en', label: 'Russian → English',   from: 'RU (ЙЦУКЕН)', to: 'EN (QWERTY)' },
];

function buildMap(from: string, to: string): Record<string, string> {
  const map: Record<string, string> = {};
  const fromChars = [...from];
  const toChars = [...to];
  const len = Math.min(fromChars.length, toChars.length);
  for (let i = 0; i < len; i++) {
    map[fromChars[i]] = toChars[i];
  }
  return map;
}

const maps: Record<LayoutPair, Record<string, string>> = {
  'en→ua': buildMap(EN, UA),
  'ua→en': buildMap(UA, EN),
  'en→ru': buildMap(EN, RU),
  'ru→en': buildMap(RU, EN),
};

export function convert(text: string, pair: LayoutPair): string {
  const map = maps[pair];
  return [...text].map(ch => map[ch] ?? ch).join('');
}
