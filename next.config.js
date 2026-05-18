/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['qrcode'],
  async redirects() {
    return [
      {
        source: '/tools/developer',
        destination: '/tools/code-dev',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
