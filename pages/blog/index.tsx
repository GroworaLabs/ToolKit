import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '@/components/ui/Layout';
import { getAllBlogPosts } from '@/lib/blog';
import { getAuthor } from '@/lib/authors';
import type { BlogPost } from '@/lib/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.webtoolkit.tech';

interface Props { posts: BlogPost[]; }

export const getStaticProps: GetStaticProps<Props> = () => ({
  props: { posts: getAllBlogPosts() },
});

const BlogPage: NextPage<Props> = ({ posts }) => {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
    ],
  };

  return (
    <>
      <Head>
        <title>Blog — Developer Tips &amp; Updates | ToolKit</title>
        <meta name="description" content="The ToolKit blog: tool launches, how-we-built-it posts, and short developer tips from the team behind webtoolkit.tech." />
        <link rel="canonical" href={`${BASE_URL}/blog`} />
        <meta property="og:title"       content="Blog | ToolKit" />
        <meta property="og:description" content="Tool launches, how-we-built-it posts, and developer tips from the ToolKit team." />
        <meta property="og:url"         content={`${BASE_URL}/blog`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <Layout activeNav="blog">
        <div className="wrap-wide" style={{ paddingTop: 'clamp(32px,5vw,48px)', paddingBottom: 80 }}>

          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontSize: 'clamp(24px,3.5vw,36px)', fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>
              Blog
            </h1>
            <p style={{ fontSize: 15, color: 'var(--ink-2)', maxWidth: 540 }}>
              Tool launches, behind-the-scenes posts, and short developer tips from the ToolKit team.
            </p>
          </div>

          {/* Posts list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, border: '1px solid var(--border)', borderRadius: 'var(--r-l)', overflow: 'hidden' }}>
            {posts.map((post, i) => {
              const author = getAuthor(post.author);
              const date   = post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                : null;

              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  style={{
                    display: 'block',
                    padding: '20px 24px',
                    textDecoration: 'none',
                    background: 'var(--white)',
                    borderBottom: i < posts.length - 1 ? '1px solid var(--border)' : 'none',
                    transition: 'background .12s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--page-bg)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--white)')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                    {date && (
                      <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{date}</span>
                    )}
                    {post.tags.slice(0, 2).map(tag => (
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

                  <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginBottom: 4, lineHeight: 1.35 }}>
                    {post.title}
                  </h2>

                  <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 10, maxWidth: 600 }}>
                    {post.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img
                      src={author.image}
                      alt={author.name}
                      width={22}
                      height={22}
                      style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover', background: 'var(--border)' }}
                    />
                    <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{author.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </Layout>
    </>
  );
};

export default BlogPage;
