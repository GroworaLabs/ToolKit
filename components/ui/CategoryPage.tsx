import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '@/components/ui/Layout';
import { ToolCard } from '@/components/ui/ToolCard';
import { FaqSection } from '@/components/ui/FaqSection';
import { TOOLS } from '@/lib/registry';
import { getCategoryBySlug } from '@/lib/categories';
import type { ToolMeta } from '@/lib/types';
import type { CategoryMeta } from '@/lib/categories';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.webtoolkit.tech';

export interface CategoryPageProps {
    category: CategoryMeta;
    tools:    ToolMeta[];
}

/* ── Factory: call this in each category's getStaticProps ── */
export function makeCategoryProps(slug: string) {
    const category = getCategoryBySlug(slug);
    if (!category) return { notFound: true as const };
    const tools = TOOLS.filter(t => t.category === category.registryKey);
    return { props: { category, tools } };
}

/* ── Shared page component ─────────────────────────────── */
const CategoryPage: NextPage<CategoryPageProps> = ({ category, tools }) => {
    const pageUrl   = `${BASE_URL}/tools/${category.slug}`;
    const liveTools = tools.filter(t => t.live);
    const sorted    = [...liveTools, ...tools.filter(t => !t.live)];
    const hasVariants = tools.some(t => (t.variants ?? []).length > 0);

    const breadcrumb = {
        '@context': 'https://schema.org',
        '@type':    'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home',      item: BASE_URL },
            { '@type': 'ListItem', position: 2, name: 'All Tools', item: `${BASE_URL}/tools` },
            { '@type': 'ListItem', position: 3, name: category.name, item: pageUrl },
        ],
    };

    const itemList = {
        '@context':      'https://schema.org',
        '@type':         'ItemList',
        name:            category.seoH1,
        description:     category.seoDescription,
        url:             pageUrl,
        numberOfItems:   liveTools.length,
        itemListElement: liveTools.map((t, i) => ({
            '@type':   'ListItem',
            position:  i + 1,
            name:      t.name,
            url:       `${BASE_URL}/tools/${t.slug}`,
        })),
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type':    'FAQPage',
        mainEntity: category.faq.map(item => ({
            '@type':        'Question',
            name:           item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
    };

    return (
        <>
            <Head>
                <title>{category.seoTitle}</title>
                <meta name="description"        content={category.seoDescription} />
                <link rel="canonical"           href={pageUrl} />
                <meta property="og:title"       content={`${category.seoH1} | ToolKit`} />
                <meta property="og:description" content={category.seoDescription} />
                <meta property="og:type"        content="website" />
                <meta property="og:url"         content={pageUrl} />
                <meta property="og:image"       content={`${BASE_URL}/og-image.png`} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            </Head>

            <Layout>
                <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(32px,5vw,52px) 16px 0' }}>

                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" style={{ marginBottom: 20 }}>
                        <ol style={{ display: 'flex', gap: 6, alignItems: 'center', listStyle: 'none', fontSize: 13, color: 'var(--ink-3)', flexWrap: 'wrap' }}>
                            <li><Link href="/"      style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Home</Link></li>
                            <li aria-hidden>›</li>
                            <li><Link href="/tools" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Tools</Link></li>
                            <li aria-hidden>›</li>
                            <li aria-current="page" style={{ color: 'var(--ink)', fontWeight: 600 }}>{category.name}</li>
                        </ol>
                    </nav>

                    {/* Hero */}
                    <div style={{ marginBottom: 48 }}>
                        <p className="ov" style={{ marginBottom: 10 }}>{category.name} Tools</p>
                        <h1 className="disp" style={{ fontSize: 'clamp(28px, 5vw, 48px)', marginBottom: 16, maxWidth: 680 }}>
                            {category.seoH1}
                        </h1>
                        <p style={{ fontSize: 'clamp(15px, 2vw, 17px)', color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: 620 }}>
                            {category.intro}
                        </p>
                    </div>

                    {/* Tools grid */}
                    <div className="tools-grid" style={{ marginBottom: 64 }}>
                        {sorted.map(tool => <ToolCard key={tool.slug} tool={tool} />)}
                    </div>

                    {/* Variant pages */}
                    {hasVariants && (
                        <div style={{ marginBottom: 64 }}>
                            <p className="ov" style={{ marginBottom: 12 }}>Specialized versions</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {tools.flatMap(t => (t.variants ?? []).map(v => (
                                    <Link
                                        key={v.slug}
                                        href={`/tools/${t.slug}/${v.slug}`}
                                        style={{ padding: '7px 14px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', fontSize: 13, fontWeight: 500, color: 'var(--ink-2)', textDecoration: 'none' }}
                                    >
                                        {v.seoH1}
                                    </Link>
                                )))}
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div style={{ marginBottom: 64 }}>
                        <section style={{ marginBottom: 48 }}>
                            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                                {category.contentH2}
                            </h2>
                            {category.contentBody.map((para, i) => (
                                <p key={i} style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: i < category.contentBody.length - 1 ? 14 : 0 }}>
                                    {para}
                                </p>
                            ))}
                        </section>

                        {category.tips.length > 0 && (
                            <section style={{ marginBottom: 48 }}>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                                    {category.name} best practices
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {category.tips.map(({ title, desc }) => (
                                        <div key={title} style={{ padding: '16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', display: 'flex', gap: 14 }}>
                                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', flexShrink: 0, marginTop: 6 }} />
                                            <div>
                                                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{title}</div>
                                                <div style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6 }}>{desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* FAQ */}
                    <FaqSection items={category.faq} />

                    {/* Other categories */}
                    <div style={{ marginTop: 64 }}>
                        <p className="ov" style={{ marginBottom: 12 }}>More tool categories</p>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {category.otherCategories.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    style={{ padding: '8px 16px', background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-l)', fontSize: 14, fontWeight: 500, color: 'var(--ink-2)', textDecoration: 'none' }}
                                >
                                    {label} →
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </Layout>
        </>
    );
};

export default CategoryPage;