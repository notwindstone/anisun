import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        reactCompiler: true,
    },
    env: {
        GIT_COMMIT_HASH: process.env.GIT_COMMIT_HASH,
    },
    images: {
        minimumCacheTTL: 60 * 60 * 24, // 24 hours
        remotePatterns:  [
            {
                protocol: "https",
                hostname: "s4.anilist.co",
            },
            {
                protocol: "https",
                hostname: "shikimori.one",
            },
        ],
    },
};

export default nextConfig;
