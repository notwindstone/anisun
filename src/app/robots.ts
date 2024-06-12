import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/account/',
        },
        sitemap: 'https://animeth.vercel.app/sitemap.xml',
    };
}