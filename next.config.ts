import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        minimumCacheTTL: 60 * 60 * 24, // 24 hours
        remotePatterns: [
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