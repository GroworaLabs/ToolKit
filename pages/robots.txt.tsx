import type { GetServerSideProps } from 'next';

export default function Robots() { return null; }

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.webtoolkit.tech';
  res.setHeader('Content-Type', 'text/plain');
  res.write(`User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml`);
  res.end();
  return { props: {} };
};