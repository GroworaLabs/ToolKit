/* ── Tool registry types ────────────────────────────── */

export interface ToolMeta {
  slug:           string;
  name:           string;
  tagline:        string;
  description:    string;
  seoTitle:       string;
  seoH1:          string;
  seoDescription: string;
  category:       ToolCategory;
  keywords:       string[];
  live:           boolean;
  featured?:      boolean;
  variants?:      ToolVariant[];
}

export interface VariantContentSection {
  heading: string;
  body:    string;
}

export interface ToolVariant {
  slug:             string;
  seoTitle:         string;
  seoH1:            string;
  seoDescription:   string;
  intro:            string;
  faq:              FaqItem[];
  defaults?:        Record<string, unknown>;
  contentSections?: VariantContentSection[];
  relatedVariants?: string[];
}

export type ToolCategory =
    | 'Security'
    | 'Text & Writing'
    | 'Developer Tools'
    | 'Design'
    | 'Value Converter';

/* ── FAQ ────────────────────────────────────────────── */

export interface FaqItem {
  q: string;
  a: string;
}

/* ── Password Generator ─────────────────────────────── */

export interface PasswordOptions {
  length:    number;
  uppercase: boolean;
  lowercase: boolean;
  numbers:   boolean;
  symbols:   boolean;
}

export interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

export interface UsePasswordGeneratorReturn {
  password:     string;
  options:      PasswordOptions;
  strength:     PasswordStrength;
  copied:       boolean;
  generate:     () => void;
  copy:         () => void;
  toggleOption: (key: keyof Omit<PasswordOptions, 'length'>) => void;
  setLength:    (val: number | string) => void;
}

export interface CheckboxOption {
  key:     keyof Omit<PasswordOptions, 'length'>;
  label:   string;
  example: string;
}

/* ── Word Counter ───────────────────────────────────── */

export interface WordStats {
  words:         number;
  chars:         number;
  charsNoSpaces: number;
  sentences:     number;
  paragraphs:    number;
  readingTime:   string;
  speakingTime:  string;
  uniqueWords:   number;
  avgWordLength: string;
}

export interface KeywordDensityItem {
  word:    string;
  count:   number;
  percent: string;
}

/* ── Case Converter ─────────────────────────────────── */

export type CaseType =
    | 'sentence' | 'lower' | 'upper' | 'title' | 'capitalized'
    | 'camel' | 'pascal' | 'snake' | 'kebab' | 'constant'
    | 'alternating' | 'inverse';

export interface CaseOption {
  id:      CaseType;
  label:   string;
  example: string;
  group:   'text' | 'code' | 'fun';
}

/* ── Color Palette ──────────────────────────────────── */

export type HarmonyMode =
    | 'random' | 'analogous' | 'complementary' | 'triadic'
    | 'split-complementary' | 'tetradic' | 'monochromatic';

export interface ColorSwatch {
  hex:    string;
  rgb:    { r: number; g: number; b: number };
  hsl:    { h: number; s: number; l: number };
  name:   string;
  locked: boolean;
}

export interface HarmonyOption {
  id:    HarmonyMode;
  label: string;
  desc:  string;
}

/* ── UUID Generator ─────────────────────────────────── */

export type UuidVersion = 'v4' | 'v1-like';

/* ── Lorem Ipsum ────────────────────────────────────── */

export type LoremUnit = 'paragraphs' | 'sentences' | 'words';

/* ── Base64 ─────────────────────────────────────────── */

export type Base64Mode = 'encode' | 'decode';

/* ── Username Generator ─────────────────────────────── */

export type UsernameStyle = 'fun' | 'professional' | 'gamer' | 'minimal';

/* ── JSON Formatter ─────────────────────────────────── */

export type JsonMode = 'prettify' | 'minify' | 'validate';

export interface JsonResult {
  output: string;
  error:  string | null;
  valid:  boolean | null;
}

/* ── Hash Generator ─────────────────────────────────── */

export type HashAlgo = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

/* ── URL Encoder ────────────────────────────────────── */

export type UrlMode = 'encode' | 'decode';

/* ── Markdown Editor ────────────────────────────────── */

export type MarkdownView = 'split' | 'preview' | 'source';

/* ── Shared sidebar item types ──────────────────────── */

export interface SidebarInfoItem {
  label: string;
  value?: string;
  desc?:  string;
}

export interface SidebarListItem {
  label: string;
  desc:  string;
}