import type { ReactNode } from 'react';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getLiveTools } from '@/lib/registry';
import type { ToolMeta } from '@/lib/types';

export function Logo() {
    return (
        <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
            <img src="/logo.svg" alt="ToolKit" width={120} height={32} style={{ display: 'block', height: 32, width: 'auto' }} />
        </Link>
    );
}

const CATEGORIES = [
    { href: '/tools/security',  label: 'Security'        },
    { href: '/tools/developer', label: 'Developer Tools' },
    { href: '/tools/text',      label: 'Text & Writing'  },
    { href: '/tools/design',    label: 'Design'          },
];

interface LayoutProps { children: ReactNode; activeNav?: 'home' | 'tools'; }

interface VariantHit { variantName: string; toolName: string; href: string; }

export function Layout({ children, activeNav }: LayoutProps) {
    const router     = useRouter();
    const liveTools  = getLiveTools();
    const [open, setOpen]           = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOpen, setSearchOpen]   = useState(false);
    const searchRef  = useRef<HTMLDivElement>(null);

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

    // Close search on route change
    useEffect(() => { setSearchOpen(false); setSearchQuery(''); }, [router.pathname]);

    const isActive = (href: string) => {
        if (activeNav === 'home'  && href === '/') return true;
        if (activeNav === 'tools' && href === '/tools') return true;
        return router.pathname === href || router.pathname.startsWith(href + '/');
    };

    return (
        <div style={{ background: 'var(--page-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            {/* ── Header ── */}
            <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(244,243,239,.97)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border)' }}>
                <div className="wrap-wide" style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <Logo />

                    {/* Desktop nav */}
                    <nav className="desktop-nav" aria-label="Main navigation">
                        <Link href="/" className={`nav-pill${router.pathname === '/' ? ' on' : ''}`}>Home</Link>
                        <Link href="/tools" className={`nav-pill${router.pathname === '/tools' ? ' on' : ''}`}>All Tools</Link>
                        <span style={{ width: 1, height: 16, background: 'var(--border)', margin: '0 4px', display: 'inline-block', verticalAlign: 'middle' }} />
                        {CATEGORIES.map(({ href, label }) => (
                            <Link key={href} href={href} className={`nav-pill${isActive(href) ? ' on' : ''}`} style={{ fontSize: 12 }}>{label}</Link>
                        ))}
                    </nav>

                    {/* Desktop search */}
                    <div className="header-search" ref={searchRef} style={{ position: 'relative', flex: '0 0 auto' }}>
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
                    <div style={{ borderTop: '1px solid var(--border)', background: 'var(--white)', padding: '8px 16px 20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 12 }}>
                            {[{ href: '/', label: 'Home' }, { href: '/tools', label: 'All Tools' }].map(({ href, label }) => (
                                <Link key={href} href={href} onClick={() => setOpen(false)}
                                      style={{ padding: '11px 14px', borderRadius: 'var(--r-m)', fontSize: 15, fontWeight: 500, color: isActive(href) ? 'var(--green)' : 'var(--ink-2)', background: isActive(href) ? 'var(--green-lt)' : 'transparent', textDecoration: 'none', display: 'block' }}>
                                    {label}
                                </Link>
                            ))}
                        </div>
                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--ink-4)', marginBottom: 8, paddingLeft: 14 }}>Categories</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {CATEGORIES.map(({ href, label }) => (
                                    <Link key={href} href={href} onClick={() => setOpen(false)}
                                          style={{ padding: '10px 14px', borderRadius: 'var(--r-m)', fontSize: 14, fontWeight: 500, color: isActive(href) ? 'var(--green)' : 'var(--ink-2)', background: isActive(href) ? 'var(--green-lt)' : 'transparent', textDecoration: 'none', display: 'block' }}>
                                        {label}
                                    </Link>
                                ))}
                            </div>
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
                                    {CATEGORIES.map(({ href, label }) => (
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
                                        { href: '/about',   label: 'About'   },
                                        { href: '/contact', label: 'Contact' },
                                        { href: '/privacy', label: 'Privacy' },
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