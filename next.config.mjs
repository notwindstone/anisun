/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    KODIK_TOKEN: process.env.KODIK_TOKEN,
  },
  experimental: {
    optimizePackageImports: [
      '@mantine/core',
      '@mantine/hooks',
    ],
  },
};

export default nextConfig;
