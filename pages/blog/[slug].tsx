import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '@/components/ui/Layout';
import { getBlogPostBySlug, getBlogSlugs } from '@/lib/blog';
import { getAuthor } from '@/lib/authors';
import type { BlogPostWithContent } from '@/lib/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.webtoolkit.tech';

interface Props { post: BlogPostWithContent; }

export const getStaticPaths: GetStaticPaths = () => ({
  paths:    getBlogSlugs().map(slug => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = ({ params }) => {
  const slug = params?.slug as string;
  const post = getBlogPostBySlug(slug);
  if (!post) return { notFound: true };
  return { props: { post } };
};

const BlogPostPage: NextPage<Props> = ({ post }) => {
  const author = getAuthor(post.author);
  const date   = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline:      post.title,
    description:   post.description,
    datePublished: post.publishedAt,
    url:           `${BASE_URL}/blog/${post.slug}`,
    author: {
      '@type':     'Person',
      name:        author.name,
      jobTitle:    author.title,
      description: author.bio,
      image:       `${BASE_URL}${author.image}`,
    },
    publisher: {
      '@type': 'Organization',
      name:    'ToolKit',
      url:     BASE_URL,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${BASE_URL}/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <Head>
        <title>{post.title} | ToolKit Blog</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={`${BASE_URL}/blog/${post.slug}`} />
        <meta property="og:title"       content={`${post.title} | ToolKit`} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type"        content="article" />
        <meta property="og:url"         content={`${BASE_URL}/blog/${post.slug}`} />
        <meta property="og:image"       content={`${BASE_URL}/og-image.png`} />
        {post.publishedAt && <meta property="article:published_time" content={post.publishedAt} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <Layout activeNav="blog">
        <div className="wrap-wide" style={{ paddingTop: 'clamp(32px,5vw,48px)', paddingBottom: 80 }}>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: 24 }}>
            <ol style={{ display: 'flex', gap: 6, alignItems: 'center', listStyle: 'none', fontSize: 13, color: 'var(--ink-3)', flexWrap: 'wrap' }}>
              <li><Link href="/"     style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Home</Link></li>
              <li aria-hidden>›</li>
              <li><Link href="/blog" style={{ color: 'var(--ink-3)', textDecoration: 'none' }}>Blog</Link></li>
              <li aria-hidden>›</li>
              <li aria-current="page" style={{ color: 'var(--ink)', fontWeight: 600 }}>{post.title}</li>
            </ol>
          </nav>

          <article style={{ maxWidth: 720 }}>

            {/* Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
              {date && <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{date}</span>}
              {post.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  style={{
                    fontSize: 11, padding: '2px 8px',
                    background: 'var(--page-bg)', border: '1px solid var(--border)',
                    borderRadius: 99, color: 'var(--ink-3)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.25, marginBottom: 14 }}>
              {post.title}
            </h1>

            <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: 24 }}>
              {post.description}
            </p>

            {/* Author byline */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 16px', marginBottom: 36,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-m)',
            }}>
              <img
                src={author.image}
                alt={author.name}
                width={44}
                height={44}
                style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, background: 'var(--page-bg)' }}
              />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>
                  {author.name}
                  <span style={{ fontWeight: 400, color: 'var(--ink-3)' }}> · {author.title}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5, marginTop: 2 }}>
                  {author.bio}
                </div>
              </div>
            </div>

            {/* Content */}
            <div
              className="guide-prose"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </article>

          {/* Back link */}
          <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--border)', maxWidth: 720 }}>
            <Link
              href="/blog"
              style={{ fontSize: 13, color: 'var(--ink-3)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              ← All posts
            </Link>
          </div>

        </div>
      </Layout>
    </>
  );
};

export default BlogPostPage;
