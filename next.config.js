const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {(phase: string, defaultConfig: import("next").NextConfig) => Promise<import("next").NextConfig>} */
module.exports = async (phase) => {
  /** @type {import("next").NextConfig} */
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
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'shikimori.one',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'desu.shikimori.one',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'img.clerk.com',
          port: '',
          pathname: '/**',
        }
      ]
    },
    async headers() {
      return [
        {
          // matching all API routes
          source: "/api/:path*",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "*" },
            { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
            { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
          ]
        }
      ];
    }
  };

  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withSerwist = (await import("@serwist/next")).default({
      swSrc: "src/service-worker/app-worker.ts",
      swDest: "public/sw.js",
      reloadOnOnline: true,
    });
    return withNextIntl(withSerwist(nextConfig));
  }

  return withNextIntl(nextConfig);
};
