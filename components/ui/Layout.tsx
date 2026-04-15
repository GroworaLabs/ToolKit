import type { ReactNode } from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getLiveTools, getCategories } from '@/lib/registry';
import type { ToolMeta } from '@/lib/types';
import { openCookiePreferences } from '@/components/ui/CookieConsent';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function Logo() {
    return (
        <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
            <img src="/logo.svg" alt="ToolKit" width={120} height={32} style={{ display: 'block', height: 32, width: 'auto' }} />
        </Link>
    );
}

interface LayoutProps { children: ReactNode; activeNav?: 'home' | 'tools' | 'guides'; }

interface VariantHit { variantName: string; toolName: string; href: string; }

/* ── Category icons map ─────────────────────────────────── */
const CAT_ICONS: Record<string, React.ReactNode> = {
    'Security': (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
    ),
    'Developer Tools': (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        </svg>
    ),
    'Text & Writing': (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
        </svg>
    ),
    'Design': (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/>
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
        </svg>
    ),
    'Value Converter': (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
        </svg>
    ),
};

const CAT_DESCS: Record<string, string> = {
    'Security':        'Passwords, hashes, tokens, encoding',
    'Developer Tools': 'JSON, regex, JWT, formatters',
    'Text & Writing':  'Case, diff, slugs, counters',
    'Design':          'Colors, palettes, favicons, QR',
    'Value Converter': 'Units, bitrate, pace, torque',
};

export function Layout({ children, activeNav }: LayoutProps) {
    const router     = useRouter();
    const liveTools  = getLiveTools();
    const categories = getCategories();
    const [open, setOpen]           = useState(false);
    const [catOpen, setCatOpen]     = useState(false);
    const [hoveredCat, setHoveredCat] = useState<string>(() => categories[0]?.label ?? '');
    const [dropLeft, setDropLeft]   = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOpen, setSearchOpen]   = useState(false);
    const searchRef  = useRef<HTMLDivElement>(null);
    const catRef     = useRef<HTMLDivElement>(null);
    const wrapRef    = useRef<HTMLDivElement>(null);
    const catTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

    const openCat  = useCallback(() => {
        if (catTimer.current) clearTimeout(catTimer.current);
        setCatOpen(true);
    }, []);
    const closeCat = useCallback(() => {
        catTimer.current = setTimeout(() => setCatOpen(false), 120);
    }, []);

    const q = searchQuery.trim().toLowerCase();

    const allToolHits: ToolMeta[] = q ? [
        ...liveTools.filter(t => t.name.toLowerCase().includes(q)),
        ...liveTools.filter(t => !t.name.toLowerCase().includes(q) && (
            t.tagline.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
        )),
    ] : [];

    const allVariantHits: VariantHit[] = q ? liveTools.flatMap(t =>
        (t.variants ?? [])
            .filter(v => v.seoH1.toLowerCase().includes(q))
            .map(v => ({ variantName: v.seoH1, toolName: t.name, href: `/tools/${t.slug}/${v.slug}` }))
    ) : [];

    const hasResults = allToolHits.length > 0 || allVariantHits.length > 0;
    const bothCols   = allToolHits.length > 0 && allVariantHits.length > 0;

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setSearchOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Close search + cat dropdown on route change
    useEffect(() => {
        setSearchOpen(false);
        setSearchQuery('');
        setCatOpen(false);
    }, [router.pathname]);

    // Align dropdown left edge with wrap-wide left edge
    useEffect(() => {
        if (!catOpen) return;
        const calc = () => {
            if (!catRef.current || !wrapRef.current) return;
            const catRect  = catRef.current.getBoundingClientRect();
            const wrapRect = wrapRef.current.getBoundingClientRect();
            setDropLeft(wrapRect.left - catRect.left);
        };
        calc();
        window.addEventListener('resize', calc);
        return () => window.removeEventListener('resize', calc);
    }, [catOpen]);

    const isActive = (href: string) => {
        if (activeNav === 'home'  && href === '/') return true;
        if (activeNav === 'tools' && href === '/tools') return true;
        return router.pathname === href || router.pathname.startsWith(href + '/');
    };

    return (
        <div style={{ background: 'var(--page-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            {/* ── Header ── */}
            <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'var(--header-bg)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border)' }}>
                <div ref={wrapRef} className="wrap-wide" style={{ height: 52, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Logo />

                    {/* Desktop nav */}
                    <nav className="desktop-nav" aria-label="Main navigation" style={{ flex: 1 }}>
                        <Link href="/" className={`nav-pill${router.pathname === '/' ? ' on' : ''}`}>Home</Link>

                        {/* Tools dropdown trigger */}
                        <div
                            ref={catRef}
                            style={{ position: 'relative', display: 'inline-flex' }}
                            onMouseEnter={openCat}
                            onMouseLeave={closeCat}
                        >
                            <button
                                className={`nav-pill${categories.some(c => isActive(c.href)) ? ' on' : ''}`}
                                style={{ border: 'none', cursor: 'pointer', gap: 4, font: 'inherit' }}
                                aria-expanded={catOpen}
                            >
                                Tools
                                <svg
                                    width="11" height="11" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                    style={{ transition: 'transform .18s', transform: catOpen ? 'rotate(180deg)' : 'none', opacity: 0.6 }}
                                >
                                    <polyline points="6 9 12 15 18 9"/>
                                </svg>
                            </button>

                            {catOpen && (() => {
                                const catToolsAll = liveTools.filter(t => t.category === hoveredCat);
                                const catTools    = catToolsAll.slice(0, 8);
                                const catHref     = categories.find(c => c.label === hoveredCat)?.href ?? '/tools';
                                return (
                                    <>
                                        {/* Transparent bridge — covers the gap so mouse doesn't leave the zone */}
                                        <div
                                            onMouseEnter={openCat}
                                            style={{ position: 'absolute', top: '100%', left: 0, right: 0, height: 12, zIndex: 199 }}
                                        />
                                        <div
                                            onMouseEnter={openCat}
                                            onMouseLeave={closeCat}
                                            style={{
                                                position: 'absolute', top: 'calc(100% + 10px)', left: dropLeft,
                                                transform: 'none',
                                                background: 'var(--white)',
                                                border: '1px solid var(--border)',
                                                borderRadius: 14,
                                                boxShadow: '0 4px 6px -2px rgba(0,0,0,.05), 0 20px 48px -8px rgba(0,0,0,.16)',
                                                zIndex: 200,
                                                display: 'flex',
                                                overflow: 'hidden',
                                                width: 760,
                                            }}
                                        >
                                            {/* Left column — categories */}
                                            <div style={{ width: 248, flexShrink: 0, padding: '6px', display: 'flex', flexDirection: 'column', gap: 1, borderRight: '1px solid var(--border)' }}>
                                                <Link
                                                    href="/tools"
                                                    style={{
                                                        display: 'flex', alignItems: 'center', gap: 10,
                                                        padding: '8px 10px', borderRadius: 8, textDecoration: 'none',
                                                        background: router.pathname === '/tools' ? 'var(--green-lt)' : 'transparent',
                                                        transition: 'background .12s',
                                                    }}
                                                    onMouseEnter={e => { if (router.pathname !== '/tools') e.currentTarget.style.background = 'var(--page-bg)'; }}
                                                    onMouseLeave={e => { if (router.pathname !== '/tools') e.currentTarget.style.background = 'transparent'; }}
                                                >
                                                    <span style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--ink-2)' }}>
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                                                        </svg>
                                                    </span>
                                                    <div>
                                                        <div style={{ fontSize: 13, fontWeight: 600, color: router.pathname === '/tools' ? 'var(--green)' : 'var(--ink)' }}>All Tools</div>
                                                        <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>Browse everything</div>
                                                    </div>
                                                </Link>

                                                <div style={{ height: 1, background: 'var(--border)', margin: '4px 2px' }} />

                                                {categories.map(({ href, label }) => {
                                                    const active  = isActive(href);
                                                    const sel     = hoveredCat === label;
                                                    return (
                                                        <Link
                                                            key={href}
                                                            href={href}
                                                            style={{
                                                                display: 'flex', alignItems: 'center', gap: 10,
                                                                padding: '8px 10px', borderRadius: 8, textDecoration: 'none',
                                                                background: sel ? 'var(--page-bg)' : active ? 'var(--green-lt)' : 'transparent',
                                                                transition: 'background .12s',
                                                                position: 'relative',
                                                            }}
                                                            onMouseEnter={() => setHoveredCat(label)}
                                                        >
                                                            {sel && <span style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 3, borderRadius: 99, background: 'var(--green)' }} />}
                                                            <span style={{ width: 30, height: 30, borderRadius: 8, background: sel || active ? 'rgba(5,150,105,.12)' : 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: sel || active ? 'var(--green)' : 'var(--ink-2)', transition: 'background .12s, color .12s' }}>
                                                                {CAT_ICONS[label] ?? (
                                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                        <circle cx="12" cy="12" r="10"/>
                                                                    </svg>
                                                                )}
                                                            </span>
                                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                                <div style={{ fontSize: 13, fontWeight: 600, color: sel || active ? 'var(--green)' : 'var(--ink)' }}>{label}</div>
                                                                <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>{CAT_DESCS[label] ?? ''}</div>
                                                            </div>
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: sel ? 0.35 : 0, transition: 'opacity .12s', flexShrink: 0 }}>
                                                                <polyline points="9 18 15 12 9 6"/>
                                                            </svg>
                                                        </Link>
                                                    );
                                                })}
                                            </div>

                                            {/* Right column — tools grid */}
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                                                <div style={{ padding: '11px 16px 9px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-2)' }}>
                                                            {hoveredCat}
                                                        </span>
                                                        <span style={{ fontSize: 11, color: 'var(--ink-3)', background: 'var(--border)', borderRadius: 99, padding: '1px 7px' }}>
                                                            {catToolsAll.length}
                                                        </span>
                                                    </div>
                                                    <Link href={catHref}
                                                        style={{ fontSize: 11, color: 'var(--green)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}
                                                        onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                                                        onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}>
                                                        View all
                                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="9 18 15 12 9 6"/>
                                                        </svg>
                                                    </Link>
                                                </div>

                                                {/* Tiles grid */}
                                                <div style={{ padding: '10px 10px 8px', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 220px))', justifyContent: 'start', gap: 6, alignContent: 'start' }}>
                                                    {catTools.map(tool => (
                                                        <Link key={tool.slug} href={`/tools/${tool.slug}`}
                                                            style={{
                                                                display: 'flex', flexDirection: 'column', gap: 2,
                                                                padding: '9px 11px', borderRadius: 9, textDecoration: 'none',
                                                                border: '1px solid transparent',
                                                                background: 'var(--page-bg)',
                                                                transition: 'background .1s, border-color .1s',
                                                            }}
                                                            onMouseEnter={e => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                                                            onMouseLeave={e => { e.currentTarget.style.background = 'var(--page-bg)'; e.currentTarget.style.borderColor = 'transparent'; }}
                                                        >
                                                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3 }}>{tool.name}</span>
                                                            <span style={{ fontSize: 11, color: 'var(--ink-3)', lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{tool.tagline}</span>
                                                        </Link>
                                                    ))}
                                                </div>

                                                {catToolsAll.length > 8 && (
                                                    <div style={{ padding: '2px 16px 10px' }}>
                                                        <Link href={catHref}
                                                            style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--green)', textDecoration: 'none', fontWeight: 600, opacity: 0.8 }}
                                                            onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.textDecoration = 'underline'; }}
                                                            onMouseLeave={e => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.textDecoration = 'none'; }}>
                                                            +{catToolsAll.length - 8} more tools in {hoveredCat}
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>

                        <Link
                            href="/guides"
                            className={`nav-pill${router.pathname.startsWith('/guides') ? ' on' : ''}`}
                        >
                            Guides
                        </Link>
                    </nav>

                    {/* Desktop search */}
                    <div className="header-search" ref={searchRef} style={{ position: 'relative', flex: '0 0 auto', marginLeft: 'auto' }}>
                        <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', pointerEvents: 'none' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={e => { setSearchQuery(e.target.value); setSearchOpen(true); }}
                            placeholder="Search tools…"
                            autoComplete="off"
                            style={{ width: 200, padding: '6px 10px 6px 32px', fontSize: 13, border: '1px solid var(--border)', borderRadius: 8, background: 'var(--white)', color: 'var(--ink)', outline: 'none', transition: 'border-color .15s', display: 'block' }}
                            onFocus={e => { setSearchOpen(true); e.currentTarget.style.borderColor = 'var(--ink-3)'; }}
                            onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                        />

                        {/* Dropdown — detached panel below header */}
                        {searchOpen && q && (
                            <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 'max-content', minWidth: bothCols ? 480 : 240, maxWidth: 'min(860px, 90vw)', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: '0 4px 6px -2px rgba(0,0,0,.05), 0 16px 40px -8px rgba(0,0,0,.12)', zIndex: 200, overflow: 'hidden' }}>

                                {!hasResults ? (
                                    <div style={{ padding: '14px 16px', fontSize: 13, color: 'var(--ink-3)' }}>
                                        Nothing found for "<strong style={{ color: 'var(--ink)', fontWeight: 600 }}>{searchQuery}</strong>"
                                    </div>
                                ) : (
                                    <div style={{ display: 'grid', gridTemplateColumns: bothCols ? '1fr 1fr' : '1fr' }}>

                                        {allToolHits.length > 0 && (
                                            <div style={{ borderRight: bothCols ? '1px solid var(--border)' : 'none', display: 'flex', flexDirection: 'column' }}>
                                                <div style={{ padding: '8px 14px 7px', fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink-3)', background: 'var(--surface, #f9f9f9)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span>Tools</span>
                                                    <span style={{ fontWeight: 500, letterSpacing: 0, textTransform: 'none', fontSize: 11 }}>{allToolHits.length}</span>
                                                </div>
                                                <div style={{ overflowY: 'auto', maxHeight: 320 }}>
                                                    {allToolHits.map(tool => (
                                                        <Link key={tool.slug} href={`/tools/${tool.slug}`}
                                                            onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '8px 14px', textDecoration: 'none', borderBottom: '1px solid var(--border)', background: 'var(--white)', transition: 'background .1s' }}
                                                            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface, #f7f7f7)')}
                                                            onMouseLeave={e => (e.currentTarget.style.background = 'var(--white)')}
                                                        >
                                                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{tool.name}</span>
                                                            <span style={{ fontSize: 11, color: 'var(--ink-3)', flexShrink: 0, background: 'var(--border)', borderRadius: 99, padding: '1px 7px', whiteSpace: 'nowrap' }}>{tool.category}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {allVariantHits.length > 0 && (
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <div style={{ padding: '8px 14px 7px', fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink-3)', background: 'var(--surface, #f9f9f9)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span>Presets</span>
                                                    <span style={{ fontWeight: 500, letterSpacing: 0, textTransform: 'none', fontSize: 11 }}>{allVariantHits.length}</span>
                                                </div>
                                                <div style={{ overflowY: 'auto', maxHeight: 320 }}>
                                                    {allVariantHits.map(v => (
                                                        <Link key={v.href} href={v.href}
                                                            onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '8px 14px', textDecoration: 'none', borderBottom: '1px solid var(--border)', background: 'var(--white)', transition: 'background .1s' }}
                                                            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface, #f7f7f7)')}
                                                            onMouseLeave={e => (e.currentTarget.style.background = 'var(--white)')}
                                                        >
                                                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{v.variantName}</span>
                                                            <span style={{ fontSize: 11, color: 'var(--ink-3)', flexShrink: 0, whiteSpace: 'nowrap' }}>{v.toolName}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto' }}>
                        <ThemeToggle />
                    </div>

                    {/* Hamburger — proper X animation */}
                    <button
                        onClick={() => setOpen(o => !o)}
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                        className="ham"
                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 36, height: 36, padding: 0, background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, position: 'relative' }}
                    >
                        {/* Top bar */}
                        <span style={{
                            position: 'absolute', width: 20, height: 2, background: 'var(--ink)', borderRadius: 2,
                            transform: open ? 'rotate(45deg)' : 'translateY(-6px)',
                            transition: 'transform .22s ease',
                        }} />
                        {/* Middle bar — fades out when open */}
                        <span style={{
                            position: 'absolute', width: 20, height: 2, background: 'var(--ink)', borderRadius: 2,
                            opacity: open ? 0 : 1,
                            transition: 'opacity .15s ease',
                        }} />
                        {/* Bottom bar */}
                        <span style={{
                            position: 'absolute', width: 20, height: 2, background: 'var(--ink)', borderRadius: 2,
                            transform: open ? 'rotate(-45deg)' : 'translateY(6px)',
                            transition: 'transform .22s ease',
                        }} />
                    </button>
                </div>

                {/* Mobile dropdown */}
                {open && (
                    <div style={{ borderTop: '1px solid var(--border)', background: 'var(--white)', padding: '8px 12px 16px' }}>
                        {/* Main links */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 8 }}>
                            {[{ href: '/', label: 'Home' }, { href: '/tools', label: 'All Tools' }, { href: '/guides', label: 'Guides' }].map(({ href, label }) => (
                                <Link key={href} href={href} onClick={() => setOpen(false)}
                                      style={{ padding: '11px 12px', borderRadius: 'var(--r-m)', fontSize: 15, fontWeight: 500, color: isActive(href) ? 'var(--green)' : 'var(--ink-2)', background: isActive(href) ? 'var(--green-lt)' : 'transparent', textDecoration: 'none', display: 'block' }}>
                                    {label}
                                </Link>
                            ))}
                        </div>

                        <div style={{ height: 1, background: 'var(--border)', margin: '4px 0 10px' }} />
                        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 6, paddingLeft: 12 }}>Categories</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {categories.map(({ href, label }) => {
                                const active = isActive(href);
                                return (
                                    <Link key={href} href={href} onClick={() => setOpen(false)}
                                          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 'var(--r-m)', textDecoration: 'none', background: active ? 'var(--green-lt)' : 'transparent' }}>
                                        <span style={{ width: 26, height: 26, borderRadius: 6, background: active ? 'rgba(5,150,105,.12)' : 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: active ? 'var(--green)' : 'var(--ink-2)' }}>
                                            {CAT_ICONS[label] ?? (
                                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                                            )}
                                        </span>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 500, color: active ? 'var(--green)' : 'var(--ink-2)' }}>{label}</div>
                                            {CAT_DESCS[label] && <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{CAT_DESCS[label]}</div>}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </header>

            {/* ── Main ── */}
            <main style={{ flex: 1, minWidth: 0, paddingTop: 52 }}>
                {children}
            </main>

            {/* ── Footer ── */}
            <footer style={{ background: 'var(--ink)', marginTop: 64 }}>
                <div className="wrap-wide" style={{ padding: 'clamp(40px, 6vw, 56px) 16px 0' }}>

                    {/* Top section */}
                    <div className="footer-grid">

                        {/* Brand */}
                        <div style={{ maxWidth: 220 }}>
                            <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                                <img src="/logo-light.svg" alt="ToolKit" width={120} height={32}
                                     style={{ display: 'block', height: 32, width: 'auto' }} />
                            </Link>
                            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 12, lineHeight: 1.65 }}>
                                Free browser-based tools.<br />No signup. No tracking. No server calls.
                            </p>
                        </div>

                        {/* Nav columns */}
                        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
                            <div>
                                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>
                                    Tools
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <Link href="/tools" style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontWeight: 500, transition: 'color .13s' }}
                                          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                                          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}>
                                        All Tools
                                    </Link>
                                    {categories.map(({ href, label }) => (
                                        <Link key={href} href={href}
                                              style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontWeight: 500, transition: 'color .13s' }}
                                              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                                              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}>
                                            {label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>
                                    Company
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {[
                                        { href: '/guides',  label: 'Guides'  },
                                        { href: '/about',   label: 'About'   },
                                        { href: '/contact', label: 'Contact' },
                                    ].map(({ href, label }) => (
                                        <Link key={href} href={href}
                                              style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontWeight: 500, transition: 'color .13s' }}
                                              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                                              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}>
                                            {label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>
                                    Legal
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {[
                                        { href: '/privacy', label: 'Privacy' },
                                        { href: '/terms',   label: 'Terms'   },
                                        { href: '/cookies', label: 'Cookies' },
                                    ].map(({ href, label }) => (
                                        <Link key={href} href={href}
                                              style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontWeight: 500, transition: 'color .13s' }}
                                              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                                              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}>
                                            {label}
                                        </Link>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={openCookiePreferences}
                                        style={{
                                            background: 'none', border: 'none', padding: 0,
                                            fontSize: 14, color: 'rgba(255,255,255,0.75)', textAlign: 'left',
                                            fontWeight: 500, cursor: 'pointer', transition: 'color .13s',
                                            fontFamily: 'inherit',
                                        }}
                                        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                                    >
                                        Cookie preferences
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div style={{
                        marginTop: 48, paddingTop: 20, paddingBottom: 24,
                        borderTop: '1px solid rgba(255,255,255,0.08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        flexWrap: 'wrap', gap: 12,
                    }}>
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
                            © {new Date().getFullYear()} ToolKit. All rights reserved.
                        </p>
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
                            Built with Next.js · Deployed on Vercel
                        </p>
                    </div>
                </div>
            </footer>

        </div>
    );
}