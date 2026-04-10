import type { ReactNode } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

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

export function Layout({ children, activeNav }: LayoutProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

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