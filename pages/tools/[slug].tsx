import { useState } from 'react';
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Layout } from '@/components/ui/Layout';
import { FaqSection } from '@/components/ui/FaqSection';
import { ToolCard } from '@/components/ui/ToolCard';
import { getBySlug, getLiveSlugs, TOOLS } from '@/lib/registry';
import type { ToolMeta, FaqItem } from '@/lib/types';

/* ── Static paths — only live tools get pages ─────────── */
export const getStaticPaths: GetStaticPaths = () => ({
    paths: getLiveSlugs().map(slug => ({ params: { slug } })),
    fallback: false,
});

/* ── Static props ──────────────────────────────────────── */
export const getStaticProps: GetStaticProps = ({ params }) => {
    const slug = params?.slug as string;
    const tool = getBySlug(slug);
    if (!tool) return { notFound: true };
    return { props: { tool } };
};

/* ── Dynamic tool loader ───────────────────────────────── */

// Map slug → dynamic import of { faq, ...sidebar data }
const TOOL_DATA: Record<string, () => Promise<{ faq: FaqItem[]; [key: string]: unknown }>> = {
    'regex-tester':       () => import('@/tools/regex-tester'),
    'password-generator': () => import('@/tools/password-generator'),
    'word-counter':       () => import('@/tools/word-counter'),
    'case-converter':     () => import('@/tools/case-converter'),
    'color-palette':      () => import('@/tools/color-palette'),
    'uuid-generator':     () => import('@/tools/uuid-generator'),
    'lorem-ipsum':        () => import('@/tools/lorem-ipsum'),
    'base64':             () => import('@/tools/base64'),
    'username-generator': () => import('@/tools/username-generator'),
    'json-formatter':     () => import('@/tools/json-formatter'),
    'hash-generator':     () => import('@/tools/hash-generator'),
    'url-encoder':        () => import('@/tools/url-encoder'),
    'markdown-editor':    () => import('@/tools/markdown-editor'),
    'qr-code-generator':  () => import('@/tools/qr-code-generator'),
    'color-converter':    () => import('@/tools/color-converter'),
    'time-converter':     () => import('@/tools/time-converter'),
    'csv-to-json':        () => import('@/tools/csv-to-json'),
    'text-diff':                () => import('@/tools/text-diff'),
    'reading-time-calculator':  () => import('@/tools/reading-time-calculator'),
    'random-text-generator':    () => import('@/tools/random-text-generator'),
    'timestamp-converter':      () => import('@/tools/timestamp-converter'),
    'cron-generator':           () => import('@/tools/cron-generator'),
    'favicon-generator':        () => import('@/tools/favicon-generator'),
    'jwt-decoder':              () => import('@/tools/jwt-decoder'),
    'password-strength-checker':() => import('@/tools/password-strength-checker'),
    'hmac-generator':           () => import('@/tools/hmac-generator'),
    'random-token-generator':   () => import('@/tools/random-token-generator'),
    'api-key-generator':        () => import('@/tools/api-key-generator'),
    'text-to-slug':             () => import('@/tools/text-to-slug'),
    'duplicate-line-remover':   () => import('@/tools/duplicate-line-remover'),
    'sort-lines':               () => import('@/tools/sort-lines'),
    'reverse-text':             () => import('@/tools/reverse-text'),
    'find-and-replace':         () => import('@/tools/find-and-replace'),
};

const TOOL_WIDGETS: Record<string, React.ComponentType> = {
    'regex-tester':       dynamic(() => import('@/tools/regex-tester/component'),       { ssr: false }) as React.ComponentType,
    'password-generator': dynamic(() => import('@/tools/password-generator/component'), { ssr: false }) as React.ComponentType,
    'word-counter':       dynamic(() => import('@/tools/word-counter/component'),       { ssr: false }) as React.ComponentType,
    'case-converter':     dynamic(() => import('@/tools/case-converter/component'),     { ssr: false }) as React.ComponentType,
    'color-palette':      dynamic(() => import('@/tools/color-palette/component'),      { ssr: false }) as React.ComponentType,
    'uuid-generator':     dynamic(() => import('@/tools/uuid-generator/component'),     { ssr: false }) as React.ComponentType,
    'lorem-ipsum':        dynamic(() => import('@/tools/lorem-ipsum/component'),        { ssr: false }) as React.ComponentType,
    'base64':             dynamic(() => import('@/tools/base64/component'),             { ssr: false }) as React.ComponentType,
    'username-generator': dynamic(() => import('@/tools/username-generator/component'), { ssr: false }) as React.ComponentType,
    'json-formatter':     dynamic(() => import('@/tools/json-formatter/component'),     { ssr: false }) as React.ComponentType,
    'hash-generator':     dynamic(() => import('@/tools/hash-generator/component'),     { ssr: false }) as React.ComponentType,
    'url-encoder':        dynamic(() => import('@/tools/url-encoder/component'),        { ssr: false }) as React.ComponentType,
    'markdown-editor':    dynamic(() => import('@/tools/markdown-editor/component'),    { ssr: false }) as React.ComponentType,
    'qr-code-generator':  dynamic(() => import('@/tools/qr-code-generator/component'), { ssr: false }) as React.ComponentType,
    'color-converter':    dynamic(() => import('@/tools/color-converter/component'),    { ssr: false }) as React.ComponentType,
    'time-converter':     dynamic(() => import('@/tools/time-converter/component'),     { ssr: false }) as React.ComponentType,
    'csv-to-json':        dynamic(() => import('@/tools/csv-to-json/component'),        { ssr: false }) as React.ComponentType,
    'text-diff':                dynamic(() => import('@/tools/text-diff/component'),                { ssr: false }) as React.ComponentType,
    'reading-time-calculator':  dynamic(() => import('@/tools/reading-time-calculator/component'),  { ssr: false }) as React.ComponentType,
    'random-text-generator':    dynamic(() => import('@/tools/random-text-generator/component'),    { ssr: false }) as React.ComponentType,
    'timestamp-converter':      dynamic(() => import('@/tools/timestamp-converter/component'),      { ssr: false }) as React.ComponentType,
    'cron-generator':           dynamic(() => import('@/tools/cron-generator/component'),           { ssr: false }) as React.ComponentType,
    'favicon-generator':             dynamic(() => import('@/tools/favicon-generator/component'),             { ssr: false }) as React.ComponentType,
    'jwt-decoder':                   dynamic(() => import('@/tools/jwt-decoder/component'),                   { ssr: false }) as React.ComponentType,
    'password-strength-checker':     dynamic(() => import('@/tools/password-strength-checker/component'),     { ssr: false }) as React.ComponentType,
    'hmac-generator':                dynamic(() => import('@/tools/hmac-generator/component'),                { ssr: false }) as React.ComponentType,
    'random-token-generator':        dynamic(() => import('@/tools/random-token-generator/component'),        { ssr: false }) as React.ComponentType,
    'api-key-generator':             dynamic(() => import('@/tools/api-key-generator/component'),             { ssr: false }) as React.ComponentType,
    'text-to-slug':                  dynamic(() => import('@/tools/text-to-slug/component'),                  { ssr: false }) as React.ComponentType,
    'duplicate-line-remover':        dynamic(() => import('@/tools/duplicate-line-remover/component'),        { ssr: false }) as React.ComponentType,
    'sort-lines':                    dynamic(() => import('@/tools/sort-lines/component'),                    { ssr: false }) as React.ComponentType,
    'reverse-text':                  dynamic(() => import('@/tools/reverse-text/component'),                  { ssr: false }) as React.ComponentType,
    'find-and-replace':              dynamic(() => import('@/tools/find-and-replace/component'),              { ssr: false }) as React.ComponentType,
};

/* ── Password generator sidebar ────────────────────────── */
const PasswordGeneratorSidebar = dynamic(
    () => import('@/tools/password-generator').then(m => {
        const { sidebarFeatures } = m as { sidebarFeatures: { label: string; desc: string; color: string; bg: string }[] };
        return function Sidebar() {
            return (
                <div className="tool-sidebar">
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>Why use this tool?</p>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {sidebarFeatures.map(({ label, desc, color, bg }) => (
                            <div key={label} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                                <div style={{ width: 30, height: 30, borderRadius: 7, background: bg, color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                                    ⚡
                                </div>
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 3 }}>{label}</div>
                                    <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.55 }}>{desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };
    }), { ssr: false }
) as React.ComponentType;

/* ── Word counter sidebar (specific to this tool) ──────── */
const WordCounterSidebar = dynamic(
    () => import('@/tools/word-counter').then(m => {
        const { whatsMeasured, commonLimits } = m as {
            whatsMeasured: { label: string; desc: string }[];
            commonLimits:  { platform: string; limit: string }[];
        };

        return function Sidebar() {
            return (
                <div className="tool-sidebar">
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>What's measured</p>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {whatsMeasured.map(({ label, desc }) => (
                            <div key={label} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{label}</div>
                                    <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 20, padding: 14, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
                        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 12 }}>Common limits to keep in mind</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                            {commonLimits.map(({ platform, limit }) => (
                                <div key={platform} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                                    <span style={{ fontSize: 12, color: 'var(--ink-2)' }}>{platform}</span>
                                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)', fontFamily: 'JetBrains Mono, monospace' }}>{limit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        };
    }),
    { ssr: false }
) as React.ComponentType;

const CaseConverterSidebar = dynamic(
    () => import('@/tools/case-converter').then(m => {
        const { useCases } = m as { useCases: { label: string; desc: string }[] };
        return function Sidebar() {
            return (
                <div className="tool-sidebar">
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>When to use each case</p>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {useCases.map(({ label, desc }) => (
                            <div key={label} style={{ display: 'flex', gap: 12, padding: '11px 0', borderBottom: '1px solid var(--border)' }}>
                                <div style={{ minWidth: 0 }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 2 }}>{label}</div>
                                    <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };
    }),
    { ssr: false }
) as React.ComponentType;

const ColorPaletteSidebar = dynamic(
    () => import('@/tools/color-palette').then(m => {
        const { harmonySidebar, colorTips } = m as {
            harmonySidebar: { label: string; desc: string }[];
            colorTips: { tip: string; desc: string }[];
        };
        return function Sidebar() {
            return (
                <div className="tool-sidebar">
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>
                        Color harmony modes
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {harmonySidebar.map(({ label, desc }) => (
                            <div key={label} style={{ display: 'flex', gap: 12, padding: '11px 0', borderBottom: '1px solid var(--border)' }}>
                                <div style={{ minWidth: 0 }}>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{label}</div>
                                    <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', margin: '20px 0 12px' }}>
                        Color tips
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {colorTips.map(({ tip, desc }) => (
                            <div key={tip} style={{ padding: '12px 14px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-m)' }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{tip}</div>
                                <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>{desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };
    }),
    { ssr: false }
) as React.ComponentType;

/* ── Generic info sidebar (UUID, Base64, JSON) ─────────── */
function InfoSidebar({ items }: { items: { label: string; value?: string; desc?: string }[] }) {
    return (
        <div className="tool-sidebar">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {items.map(({ label, value, desc }) => (
                    <div key={label} style={{ padding: '11px 0', borderBottom: '1px solid var(--border)' }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginBottom: value ? 2 : 4 }}>{label}</div>
                        {value && <div style={{ fontSize: 13, color: 'var(--ink-2)', fontFamily: 'JetBrains Mono, monospace' }}>{value}</div>}
                        {desc  && <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>{desc}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}

const UuidSidebar = dynamic(
    () => import('@/tools/uuid-generator').then(m => {
        const { sidebarInfo } = m as { sidebarInfo: { label: string; value: string }[] };
        return function Sidebar() { return <InfoSidebar items={sidebarInfo} />; };
    }), { ssr: false }
) as React.ComponentType;

const Base64Sidebar = dynamic(
    () => import('@/tools/base64').then(m => {
        const { sidebarInfo } = m as { sidebarInfo: { label: string; value: string }[] };
        return function Sidebar() { return <InfoSidebar items={sidebarInfo} />; };
    }), { ssr: false }
) as React.ComponentType;

const JsonSidebar = dynamic(
    () => import('@/tools/json-formatter').then(m => {
        const { sidebarInfo } = m as { sidebarInfo: { label: string; desc: string }[] };
        return function Sidebar() { return <InfoSidebar items={sidebarInfo} />; };
    }), { ssr: false }
) as React.ComponentType;

const LoremSidebar = dynamic(
    () => import('@/tools/lorem-ipsum').then(m => {
        const { useCases } = m as { useCases: { label: string; desc: string }[] };
        return function Sidebar() { return <InfoSidebar items={useCases.map(u => ({ label: u.label, desc: u.desc }))} />; };
    }), { ssr: false }
) as React.ComponentType;

const UsernameSidebar = dynamic(
    () => import('@/tools/username-generator').then(m => {
        const { styleGuide } = m as { styleGuide: { style: string; example: string; desc: string }[] };
        return function Sidebar() {
            return (
                <div className="tool-sidebar">
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>Style guide</p>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {styleGuide.map(({ style, example, desc }) => (
                            <div key={style} style={{ padding: '11px 0', borderBottom: '1px solid var(--border)' }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{style}</span>
                                    <span style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-3)' }}>{example}</span>
                                </div>
                                <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };
    }), { ssr: false }
) as React.ComponentType;

const HashSidebar = dynamic(
    () => import('@/tools/hash-generator').then(m => {
        const { sidebarInfo } = m as { sidebarInfo: { label: string; value: string; desc: string }[] };
        return function Sidebar() { return <InfoSidebar items={sidebarInfo} />; };
    }), { ssr: false }
) as React.ComponentType;

const UrlSidebar = dynamic(
    () => import('@/tools/url-encoder').then(m => {
        const { sidebarInfo } = m as { sidebarInfo: { label: string; value: string }[] };
        return function Sidebar() {
            return (
                <div className="tool-sidebar">
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 14 }}>Common encodings</p>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {sidebarInfo.map(({ label, value }) => (
                            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid var(--border)' }}>
                                <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{label}</span>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600, color: 'var(--ink)', background: 'var(--border)', padding: '2px 8px', borderRadius: 'var(--r-s)' }}>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };
    }), { ssr: false }
) as React.ComponentType;

const MarkdownSidebar = dynamic(
    () => import('@/tools/markdown-editor').then(m => {
        const { cheatSheet } = m as { cheatSheet: { syntax: string; output: string }[] };
        return function Sidebar() {
            return (
                <div className="tool-sidebar">
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 14 }}>Markdown cheatsheet</p>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {cheatSheet.map(({ syntax, output }) => (
                            <div key={syntax} style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                                <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink)', background: 'var(--border)', padding: '2px 6px', borderRadius: 4, alignSelf: 'flex-start' }}>{syntax}</code>
                                <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{output}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };
    }), { ssr: false }
) as React.ComponentType;

const RegexSidebar = dynamic(
    () => import('@/tools/regex-tester').then(m => {
        const { cheatSheet } = m as { cheatSheet: { syntax: string; desc: string }[] };
        return function Sidebar() {
            return (
                <div className="tool-sidebar">
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 14 }}>Regex cheatsheet</p>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {cheatSheet.map(({ syntax, desc }) => (
                            <div key={syntax} style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
                                <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', background: 'var(--green-lt)', padding: '1px 6px', borderRadius: 4, flexShrink: 0, minWidth: 80 }}>{syntax}</code>
                                <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };
    }), { ssr: false }
) as React.ComponentType;

/* ── Text-to-slug sidebar ───────────────────────────────── */
const TextToSlugSidebar = dynamic(
    () => import('@/tools/text-to-slug').then(m => {
        const { slugRules } = m as { slugRules: { rule: string; desc: string }[] };
        return function Sidebar() {
            return (
                <div className="tool-sidebar">
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>Slug rules</p>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {slugRules.map(({ rule, desc }) => (
                            <div key={rule} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{rule}</div>
                                <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>{desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };
    }), { ssr: false }
) as React.ComponentType;

/* ── Duplicate-line-remover sidebar ────────────────────── */
const DuplicateLineRemoverSidebar = dynamic(
    () => import('@/tools/duplicate-line-remover').then(m => {
        const { useCases } = m as { useCases: { label: string; desc: string }[] };
        return function Sidebar() {
            return (
                <div className="tool-sidebar">
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>Use cases</p>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {useCases.map(({ label, desc }) => (
                            <div key={label} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{label}</div>
                                <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>{desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };
    }), { ssr: false }
) as React.ComponentType;

/* ── Sort-lines sidebar ─────────────────────────────────── */
const SortLinesSidebar = dynamic(
    () => import('@/tools/sort-lines').then(m => {
        const { sortModes } = m as { sortModes: { mode: string; desc: string }[] };
        return function Sidebar() {
            return (
                <div className="tool-sidebar">
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>Sort modes</p>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {sortModes.map(({ mode, desc }) => (
                            <div key={mode} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', fontFamily: 'JetBrains Mono, monospace', marginBottom: 2 }}>{mode}</div>
                                <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>{desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };
    }), { ssr: false }
) as React.ComponentType;

/* ── Reverse-text sidebar ───────────────────────────────── */
const ReverseTextSidebar = dynamic(
    () => import('@/tools/reverse-text').then(m => {
        const { reverseModes } = m as { reverseModes: { mode: string; example: string; desc: string }[] };
        return function Sidebar() {
            return (
                <div className="tool-sidebar">
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>Reversal modes</p>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {reverseModes.map(({ mode, example, desc }) => (
                            <div key={mode} style={{ padding: '11px 0', borderBottom: '1px solid var(--border)' }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{mode}</div>
                                <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--green)', display: 'block', marginBottom: 3 }}>{example}</code>
                                <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>{desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };
    }), { ssr: false }
) as React.ComponentType;

/* ── Find-and-replace sidebar ───────────────────────────── */
const FindAndReplaceSidebar = dynamic(
    () => import('@/tools/find-and-replace').then(m => {
        const { regexCheatSheet } = m as { regexCheatSheet: { pattern: string; desc: string }[] };
        return function Sidebar() {
            return (
                <div className="tool-sidebar">
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 14 }}>Regex cheatsheet</p>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {regexCheatSheet.map(({ pattern, desc }) => (
                            <div key={pattern} style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
                                <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', background: 'var(--green-lt)', padding: '1px 6px', borderRadius: 4, flexShrink: 0, minWidth: 64, textAlign: 'center' }}>{pattern}</code>
                                <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };
    }), { ssr: false }
) as React.ComponentType;

/* ── Sidebar router ────────────────────────────────────── */
function ToolSidebar({ slug }: { slug: string }) {
    if (slug === 'password-generator') return <PasswordGeneratorSidebar />;
    if (slug === 'word-counter')       return <WordCounterSidebar />;
    if (slug === 'case-converter')     return <CaseConverterSidebar />;
    if (slug === 'color-palette')      return <ColorPaletteSidebar />;
    if (slug === 'uuid-generator')     return <UuidSidebar />;
    if (slug === 'base64')             return <Base64Sidebar />;
    if (slug === 'json-formatter')     return <JsonSidebar />;
    if (slug === 'lorem-ipsum')        return <LoremSidebar />;
    if (slug === 'username-generator') return <UsernameSidebar />;
    if (slug === 'hash-generator')     return <HashSidebar />;
    if (slug === 'url-encoder')        return <UrlSidebar />;
    if (slug === 'markdown-editor')    return <MarkdownSidebar />;
    if (slug === 'regex-tester')       return <RegexSidebar />;
    if (slug === 'qr-code-generator')  return <QrSidebar />;
    if (slug === 'color-converter')    return <ColorConverterSidebar />;
    if (slug === 'time-converter')     return <TimeConverterSidebar />;
    if (slug === 'csv-to-json')        return <CsvToJsonSidebar />;
    if (slug === 'text-diff')               return <TextDiffSidebar />;
    if (slug === 'reading-time-calculator') return <ReadingTimeSidebar />;
    if (slug === 'random-text-generator')   return <RandomTextSidebar />;
    if (slug === 'timestamp-converter')     return <TimestampSidebar />;
    if (slug === 'cron-generator')          return <CronSidebar />;
    if (slug === 'favicon-generator')       return <FaviconSidebar />;
    if (slug === 'text-to-slug')            return <TextToSlugSidebar />;
    if (slug === 'duplicate-line-remover')  return <DuplicateLineRemoverSidebar />;
    if (slug === 'sort-lines')              return <SortLinesSidebar />;
    if (slug === 'reverse-text')            return <ReverseTextSidebar />;
    if (slug === 'find-and-replace')        return <FindAndReplaceSidebar />;
    return null;
}

function ColorConverterSidebar() {
    return (
        <div className="tool-sidebar">
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>How to convert a color</p>
            <ol style={{ paddingLeft: 0, listStyle: 'none', margin: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                    { n: '1', title: 'Pick or enter a color',   desc: 'Click the color swatch to open the picker, or type a value directly.' },
                    { n: '2', title: 'Choose input format',      desc: 'Select HEX, RGB, HSL, HSV, or CMYK to match your source.' },
                    { n: '3', title: 'See all conversions',      desc: 'All formats update instantly — HEX, RGB, HSL, HSV, CMYK, and CSS.' },
                    { n: '4', title: 'Copy what you need',       desc: 'Click any output row to copy it to clipboard.' },
                ].map(({ n, title, desc }) => (
                    <li key={n} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                        <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{n}</span>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 3 }}>{title}</div>
                            <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.55 }}>{desc}</div>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}

function TimeConverterSidebar() {
    return (
        <div className="tool-sidebar">
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>Key time values</p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {[
                    { label: '1 minute',  value: '60 s'         },
                    { label: '1 hour',    value: '3,600 s'      },
                    { label: '1 day',     value: '86,400 s'     },
                    { label: '1 week',    value: '604,800 s'    },
                    { label: '1 year',    value: '31,536,000 s' },
                    { label: '1 day',     value: '1,440 min'    },
                    { label: '1 week',    value: '168 h'        },
                    { label: '1 year',    value: '8,760 h'      },
                ].map(({ label, value }) => (
                    <div key={label + value} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid var(--border)' }}>
                        <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{label}</span>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 600, color: 'var(--ink)', background: 'var(--border)', padding: '2px 8px', borderRadius: 'var(--r-s)' }}>{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TextDiffSidebar() {
    return (
        <div className="tool-sidebar">
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 14 }}>Diff legend</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                    { symbol: '+', label: 'Added',     bg: 'rgba(5,150,105,.08)',  color: 'var(--green)', desc: 'In Modified only' },
                    { symbol: '−', label: 'Removed',   bg: 'rgba(220,38,38,.08)', color: '#dc2626',       desc: 'In Original only' },
                    { symbol: ' ', label: 'Unchanged', bg: 'transparent',          color: 'var(--ink-3)',  desc: 'In both texts' },
                ].map(({ symbol, label, bg, color, desc }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                        <span style={{ width: 28, height: 28, borderRadius: 6, background: bg, border: `1.5px solid ${color === 'var(--ink-3)' ? 'var(--border)' : color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 14, color, flexShrink: 0 }}>{symbol}</span>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{label}</div>
                            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{desc}</div>
                        </div>
                    </div>
                ))}
            </div>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', margin: '18px 0 12px' }}>Options</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                    { label: 'Ignore whitespace', desc: 'Treats lines equal if they differ only in spaces/indentation (like git diff -w)' },
                    { label: 'Ignore case',        desc: 'Treats uppercase and lowercase as identical during comparison' },
                    { label: 'Hide unchanged',     desc: 'Collapses unchanged lines — shows only context around changes' },
                ].map(({ label, desc }) => (
                    <div key={label} style={{ padding: '10px 12px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-m)' }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginBottom: 3 }}>{label}</div>
                        <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>{desc}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ReadingTimeSidebar() {
    return (
        <div className="tool-sidebar">
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 14 }}>Reading speeds</p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {[
                    { label: 'Slow reader',     value: '150 WPM' },
                    { label: 'Average adult',   value: '238 WPM' },
                    { label: 'Fast reader',     value: '350 WPM' },
                    { label: 'Speed reading',   value: '400+ WPM' },
                    { label: 'Presentation',    value: '130 WPM' },
                    { label: 'Podcast/audio',   value: '150 WPM' },
                ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid var(--border)' }}>
                        <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{label}</span>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 700, color: 'var(--ink)', background: 'var(--border)', padding: '2px 8px', borderRadius: 'var(--r-s)' }}>{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function RandomTextSidebar() {
    return (
        <div className="tool-sidebar">
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 14 }}>Use cases</p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {[
                    { label: 'UI mockups',          desc: 'Fill cards and lists with realistic text' },
                    { label: 'Database seeding',    desc: 'Populate test tables with varied content' },
                    { label: 'Performance testing', desc: 'Stress-test with large volumes of text'   },
                    { label: 'Layout prototyping',  desc: 'Test how text length affects your design' },
                ].map(({ label, desc }) => (
                    <div key={label} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{label}</div>
                        <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{desc}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TimestampSidebar() {
    return (
        <div className="tool-sidebar">
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 14 }}>Key timestamps</p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {[
                    { label: 'Unix epoch',       value: '0'           },
                    { label: 'Y2K',              value: '946684800'   },
                    { label: '2038 limit',       value: '2147483647'  },
                    { label: '10 digits',        value: 'seconds'     },
                    { label: '13 digits',        value: 'milliseconds'},
                ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid var(--border)' }}>
                        <span style={{ fontSize: 12, color: 'var(--ink-2)' }}>{label}</span>
                        <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 700, color: 'var(--ink)', background: 'var(--border)', padding: '2px 6px', borderRadius: 'var(--r-s)' }}>{value}</code>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CronSidebar() {
    return (
        <div className="tool-sidebar">
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 14 }}>Field reference</p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {[
                    { pos: '1', name: 'Minute',       range: '0–59'  },
                    { pos: '2', name: 'Hour',          range: '0–23'  },
                    { pos: '3', name: 'Day of month',  range: '1–31'  },
                    { pos: '4', name: 'Month',         range: '1–12'  },
                    { pos: '5', name: 'Day of week',   range: '0–6'   },
                ].map(({ pos, name, range }) => (
                    <div key={pos} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: '1px solid var(--border)' }}>
                        <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{pos}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>{name}</div>
                            <div style={{ fontSize: 11, color: 'var(--ink-4)', fontFamily: 'JetBrains Mono, monospace' }}>{range}</div>
                        </div>
                    </div>
                ))}
            </div>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', margin: '16px 0 10px' }}>Special chars</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                    { ch: '*',    desc: 'Every value'   },
                    { ch: '/',    desc: 'Step (every N)'},
                    { ch: ',',    desc: 'List'          },
                    { ch: '-',    desc: 'Range'         },
                ].map(({ ch, desc }) => (
                    <div key={ch} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <code style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 14, color: 'var(--green)', background: 'var(--green-lt)', width: 24, textAlign: 'center', borderRadius: 4, flexShrink: 0 }}>{ch}</code>
                        <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{desc}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function FaviconSidebar() {
    return (
        <div className="tool-sidebar">
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 14 }}>Favicon sizes</p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {[
                    { size: '16×16',  use: 'Browser tab'         },
                    { size: '32×32',  use: 'Taskbar / pinned'    },
                    { size: '180×180',use: 'Apple touch icon'    },
                    { size: '192×192',use: 'Android home screen' },
                    { size: '512×512',use: 'PWA splash screen'   },
                ].map(({ size, use }) => (
                    <div key={size} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid var(--border)' }}>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 700, color: 'var(--ink)' }}>{size}</span>
                        <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{use}</span>
                    </div>
                ))}
            </div>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', margin: '16px 0 10px' }}>Tips</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {['Use 1–2 characters for clarity at 16px', 'High contrast = better legibility', 'Emoji favicons require no design skill'].map(t => (
                    <div key={t} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', flexShrink: 0, marginTop: 5 }} />
                        <span style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>{t}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CsvToJsonSidebar() {
    return (
        <div className="tool-sidebar">
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>How to convert CSV</p>
            <ol style={{ paddingLeft: 0, listStyle: 'none', margin: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                    { n: '1', title: 'Paste your CSV',       desc: 'Copy rows from Excel, Google Sheets, or any text file and paste them into the input.' },
                    { n: '2', title: 'Pick delimiter',        desc: 'Choose comma, semicolon, tab or pipe to match your file\'s format.' },
                    { n: '3', title: 'Toggle headers',        desc: 'Enable to use the first row as JSON object keys. Disable for an array of arrays.' },
                    { n: '4', title: 'Copy or download',      desc: 'Copy the JSON to clipboard or download it as a .json file.' },
                ].map(({ n, title, desc }) => (
                    <li key={n} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                        <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{n}</span>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 3 }}>{title}</div>
                            <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.55 }}>{desc}</div>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}

function QrSidebar() {
    const steps = [
        { n: '1', title: 'Choose content type',    desc: 'Pick URL, Email, Phone, SMS, WiFi, or plain Text.' },
        { n: '2', title: 'Enter your content',     desc: 'Paste a URL or type any text. The QR updates instantly.' },
        { n: '3', title: 'Customize',              desc: 'Set colors, size, and error correction level to your needs.' },
        { n: '4', title: 'Download PNG or SVG',    desc: 'PNG for digital use. SVG for print — scales without quality loss.' },
        { n: '5', title: 'Test before printing',   desc: 'Scan with your phone before printing at scale.' },
    ];
    return (
        <div className="tool-sidebar">
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>
                How to generate a QR code
            </p>
            <ol style={{ paddingLeft: 0, listStyle: 'none', margin: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
                {steps.map(({ n, title, desc }) => (
                    <li key={n} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                        <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{n}</span>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 3 }}>{title}</div>
                            <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.55 }}>{desc}</div>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}

/* ── Page ─────────────────────────────────────────────── */
interface Props { tool: ToolMeta; }

const CATEGORY_SLUGS: Record<string, string> = {
    'Security':        '/tools/security',
    'Developer Tools': '/tools/developer',
    'Text & Writing':  '/tools/text',
    'Design':          '/tools/design',
    'Value Converter': '/tools/value-converter',
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.webtoolkit.tech';

const ToolPage: NextPage<Props> = ({ tool }) => {
    const Widget = TOOL_WIDGETS[tool.slug];
    const relatedTools = TOOLS.filter(t => t.category === tool.category && t.slug !== tool.slug).slice(0, 4);
    const toolUrl = `${BASE_URL}/tools/${tool.slug}`;

    return (
        <>
            <Head>
                {/* ── Primary SEO ── */}
                <title>{tool.seoTitle}</title>
                <meta name="description" content={tool.seoDescription} />
                <meta name="keywords"    content={tool.keywords.join(', ')} />
                <link rel="canonical"    href={toolUrl} />

                {/* ── Open Graph ── */}
                <meta property="og:title"       content={tool.seoTitle} />
                <meta property="og:description" content={tool.seoDescription} />
                <meta property="og:type"        content="website" />
                <meta property="og:url"         content={toolUrl} />
                <meta property="og:image"       content={`${BASE_URL}/og-image.png`} />
                <meta property="og:site_name"   content="ToolKit" />

                {/* ── Twitter Card ── */}
                <meta name="twitter:card"        content="summary_large_image" />
                <meta name="twitter:title"       content={tool.seoTitle} />
                <meta name="twitter:description" content={tool.seoDescription} />
                <meta name="twitter:image"       content={`${BASE_URL}/og-image.png`} />

                {/* ── Structured data: SoftwareApplication (expanded) ── */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'SoftwareApplication',
                        '@id': `${toolUrl}/#software`,
                        name: tool.seoH1,
                        description: tool.seoDescription,
                        url: toolUrl,
                        applicationCategory: 'UtilitiesApplication',
                        operatingSystem: 'Web Browser',
                        featureList: tool.keywords,
                        audience: {
                            '@type': 'Audience',
                            audienceType: 'Developers, Designers, Everyone',
                        },
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'USD',
                        },
                        isPartOf: {
                            '@type': 'WebSite',
                            '@id': `${BASE_URL}/#website`,
                            name: 'ToolKit',
                            url: BASE_URL,
                        },
                        publisher: {
                            '@type': 'Organization',
                            '@id': `${BASE_URL}/#organization`,
                        },
                    }),
                }} />

                {/* ── Structured data: HowTo ── */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'HowTo',
                        name: `How to use ${tool.name}`,
                        description: `Step-by-step guide to using the free online ${tool.name}.`,
                        tool: [{ '@type': 'HowToTool', name: tool.name, url: toolUrl }],
                        step: tool.slug === 'password-generator' ? [
                            { '@type': 'HowToStep', position: 1, name: 'Set password length', text: 'Use the length slider to choose between 8 and 64 characters. For most accounts, 16–20 characters is recommended.' },
                            { '@type': 'HowToStep', position: 2, name: 'Choose character types', text: 'Enable uppercase letters, lowercase letters, numbers, and symbols for maximum entropy.' },
                            { '@type': 'HowToStep', position: 3, name: 'Generate your password', text: 'Click Generate. A cryptographically random password appears instantly using the Web Crypto API.' },
                            { '@type': 'HowToStep', position: 4, name: 'Copy and save', text: 'Click the copy icon and paste the password directly into your password manager.' },
                        ] : [
                            { '@type': 'HowToStep', position: 1, name: 'Open the tool', text: `Navigate to ${tool.seoH1} on ToolKit. No signup or installation required.` },
                            { '@type': 'HowToStep', position: 2, name: 'Enter your input', text: 'Type or paste your content into the input field. The tool processes everything locally in your browser.' },
                            { '@type': 'HowToStep', position: 3, name: 'Get your result', text: 'Your result appears instantly. Click Copy to copy it to your clipboard.' },
                        ],
                        totalTime: 'PT1M',
                    }),
                }} />

                {/* ── Structured data: BreadcrumbList ── */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Home',            item: BASE_URL },
                            { '@type': 'ListItem', position: 2, name: 'All Tools',       item: `${BASE_URL}/tools` },
                            { '@type': 'ListItem', position: 3, name: tool.category,     item: `${BASE_URL}${CATEGORY_SLUGS[tool.category] ?? '/tools'}` },
                            { '@type': 'ListItem', position: 4, name: tool.name,         item: toolUrl },
                        ],
                    }),
                }} />
            </Head>

            <Layout>
                {/* ── Hero + Tool ───────────────────────────── */}
                <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(32px, 5vw, 52px) 16px 0' }}>
                    {/* Breadcrumb — visible, also semantic */}
                    <nav aria-label="Breadcrumb" style={{ marginBottom: 20 }}>
                        <ol style={{ display: 'flex', gap: 6, alignItems: 'center', listStyle: 'none', fontSize: 13, color: 'var(--ink-3)', flexWrap: 'wrap' }}>
                            <li><a href="/"      style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Home</a></li>
                            <li aria-hidden>›</li>
                            <li><a href="/tools" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Tools</a></li>
                            <li aria-hidden>›</li>
                            <li>
                                <a href={CATEGORY_SLUGS[tool.category] ?? '/tools'} style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>
                                    {tool.category}
                                </a>
                            </li>
                            <li aria-hidden>›</li>
                            <li aria-current="page" style={{ color: 'var(--ink)', fontWeight: 600 }}>{tool.name}</li>
                        </ol>
                    </nav>

                    <div className="tool-grid">
                        {/* Left */}
                        <div>
                            <p className="ov a0" style={{ marginBottom: 10 }}>{tool.category}</p>
                            <h1 className="disp a1" style={{ fontSize: 'clamp(24px, 4vw, 40px)', marginBottom: 12 }}>
                                {tool.seoH1}
                            </h1>
                            <p className="a2" style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: 24, maxWidth: 480 }}>
                                {tool.description}
                            </p>
                            {Widget && (
                                <div className="card a3" style={{ padding: 'clamp(16px, 3vw, 28px)', overflow: 'hidden' }}>
                                    <Widget />
                                </div>
                            )}
                        </div>

                        {/* Right — tool-specific sidebar (hidden on mobile via CSS) */}
                        <ToolSidebar slug={tool.slug} />
                    </div>
                </section>

                {/* ── Variant pages ─────────────────────────────── */}
                <ToolVariants tool={tool} />

                {/* ── Tool content ──────────────────────────────── */}
                <ToolContent slug={tool.slug} />

                {/* ── FAQ with FAQPage schema ────────────────── */}
                <ToolFaq slug={tool.slug} />

                {/* ── Related tools ─────────────────────────── */}
                {relatedTools.length > 0 && (
                    <section style={{ maxWidth: 1000, margin: '56px auto 0', padding: '0 16px' }}>
                        <p className="ov" style={{ marginBottom: 12 }}>More in {tool.category}</p>
                        <div className="tools-grid">
                            {relatedTools.map(t => <ToolCard key={t.slug} tool={t} />)}
                        </div>
                    </section>
                )}

            </Layout>
        </>
    );
};

/* ── Variant pages block (collapsible) ─────────────────── */
const VARIANTS_VISIBLE = 8;

function ToolVariants({ tool }: { tool: ToolMeta }) {
    const [expanded, setExpanded] = useState(false);
    const variants = tool.variants ?? [];
    if (variants.length === 0) return null;

    const visible = expanded ? variants : variants.slice(0, VARIANTS_VISIBLE);
    const hiddenCount = variants.length - VARIANTS_VISIBLE;

    return (
        <section style={{ maxWidth: 1000, margin: '48px auto 0', padding: '0 16px' }}>
            <p className="ov" style={{ marginBottom: 12 }}>Specialized versions</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
                {visible.map(v => (
                    <a
                        key={v.slug}
                        href={`/tools/${tool.slug}/${v.slug}`}
                        style={{ display: 'block', padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)', textDecoration: 'none', transition: 'border-color .13s' }}
                    >
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>
                            {v.seoH1}
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.5 }}>
                            {v.seoDescription.slice(0, 80)}…
                        </div>
                    </a>
                ))}
            </div>
            {hiddenCount > 0 && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    style={{
                        marginTop: 14,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 14,
                        fontWeight: 600,
                        color: 'var(--green)',
                        padding: 0,
                    }}
                >
                    {expanded ? 'Show less' : `Show all ${variants.length} versions (+${hiddenCount} more)`}
                </button>
            )}
        </section>
    );
}

/* ── Tool content sections ─────────────────────────────── */
const TOOL_CONTENT: Record<string, React.ComponentType> = {
    'password-generator': dynamic(() => import('@/tools/password-generator/content'), { ssr: false }) as React.ComponentType,
    'word-counter':       dynamic(() => import('@/tools/word-counter/content'),       { ssr: false }) as React.ComponentType,
    'json-formatter':     dynamic(() => import('@/tools/json-formatter/content'),     { ssr: false }) as React.ComponentType,
    'base64':             dynamic(() => import('@/tools/base64/content'),             { ssr: false }) as React.ComponentType,
    'case-converter':     dynamic(() => import('@/tools/case-converter/content'),     { ssr: false }) as React.ComponentType,
    'hash-generator':     dynamic(() => import('@/tools/hash-generator/content'),     { ssr: false }) as React.ComponentType,
    'url-encoder':        dynamic(() => import('@/tools/url-encoder/content'),        { ssr: false }) as React.ComponentType,
    'uuid-generator':     dynamic(() => import('@/tools/uuid-generator/content'),     { ssr: false }) as React.ComponentType,
    'lorem-ipsum':        dynamic(() => import('@/tools/lorem-ipsum/content'),        { ssr: false }) as React.ComponentType,
    'markdown-editor':    dynamic(() => import('@/tools/markdown-editor/content'),    { ssr: false }) as React.ComponentType,
    'color-palette':      dynamic(() => import('@/tools/color-palette/content'),      { ssr: false }) as React.ComponentType,
    'regex-tester':       dynamic(() => import('@/tools/regex-tester/content'),       { ssr: false }) as React.ComponentType,
    'username-generator': dynamic(() => import('@/tools/username-generator/content'), { ssr: false }) as React.ComponentType,
    'qr-code-generator':  dynamic(() => import('@/tools/qr-code-generator/content'), { ssr: false }) as React.ComponentType,
    'color-converter':    dynamic(() => import('@/tools/color-converter/content'),    { ssr: false }) as React.ComponentType,
    'time-converter':     dynamic(() => import('@/tools/time-converter/content'),     { ssr: false }) as React.ComponentType,
    'csv-to-json':        dynamic(() => import('@/tools/csv-to-json/content'),        { ssr: false }) as React.ComponentType,
    'text-diff':                dynamic(() => import('@/tools/text-diff/content'),                { ssr: false }) as React.ComponentType,
    'reading-time-calculator':  dynamic(() => import('@/tools/reading-time-calculator/content'),  { ssr: false }) as React.ComponentType,
    'random-text-generator':    dynamic(() => import('@/tools/random-text-generator/content'),    { ssr: false }) as React.ComponentType,
    'timestamp-converter':      dynamic(() => import('@/tools/timestamp-converter/content'),      { ssr: false }) as React.ComponentType,
    'cron-generator':           dynamic(() => import('@/tools/cron-generator/content'),           { ssr: false }) as React.ComponentType,
    'favicon-generator':             dynamic(() => import('@/tools/favicon-generator/content'),             { ssr: false }) as React.ComponentType,
    'jwt-decoder':                   dynamic(() => import('@/tools/jwt-decoder/content'),                   { ssr: false }) as React.ComponentType,
    'password-strength-checker':     dynamic(() => import('@/tools/password-strength-checker/content'),     { ssr: false }) as React.ComponentType,
    'hmac-generator':                dynamic(() => import('@/tools/hmac-generator/content'),                { ssr: false }) as React.ComponentType,
    'random-token-generator':        dynamic(() => import('@/tools/random-token-generator/content'),        { ssr: false }) as React.ComponentType,
    'api-key-generator':             dynamic(() => import('@/tools/api-key-generator/content'),             { ssr: false }) as React.ComponentType,
    'text-to-slug':                  dynamic(() => import('@/tools/text-to-slug/content'),                  { ssr: false }) as React.ComponentType,
    'duplicate-line-remover':        dynamic(() => import('@/tools/duplicate-line-remover/content'),        { ssr: false }) as React.ComponentType,
    'sort-lines':                    dynamic(() => import('@/tools/sort-lines/content'),                    { ssr: false }) as React.ComponentType,
    'reverse-text':                  dynamic(() => import('@/tools/reverse-text/content'),                  { ssr: false }) as React.ComponentType,
    'find-and-replace':              dynamic(() => import('@/tools/find-and-replace/content'),              { ssr: false }) as React.ComponentType,
};

function ToolContent({ slug }: { slug: string }) {
    const Content = TOOL_CONTENT[slug];
    if (!Content) return null;
    return <Content />;
}

/* ── Async FAQ loader + FAQPage schema ─────────────────── */
function ToolFaq({ slug }: { slug: string }) {
    const loader = TOOL_DATA[slug];
    if (!loader) return null;

    const LazyFaq = dynamic(
        () => loader().then(m => {
            const items = m.faq as FaqItem[];
            const faqSchema = {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: items.map(item => ({
                    '@type': 'Question',
                    name: item.q,
                    acceptedAnswer: { '@type': 'Answer', text: item.a },
                })),
            };
            return function Faq() {
                return (
                    <>
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                        />
                        <FaqSection items={items} />
                    </>
                );
            };
        }),
        { ssr: false }
    );

    return <LazyFaq />;
}

export default ToolPage;