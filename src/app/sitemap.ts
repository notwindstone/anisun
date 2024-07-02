import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://anisun.vercel.app/',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://anisun.vercel.app/titles',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: 'https://anisun.vercel.app/trending',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.5,
        },
    ];
}