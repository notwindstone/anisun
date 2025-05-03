"use server";

import fetchHeroTitle from "@/lib/anime/fetchHeroTitle";
import ClientFetch from "@/components/Hero/ClientFetch/ClientFetch";
import HeroCard from "@/components/Hero/HeroCard/HeroCard";
import { AnimeLRUCache } from "@/lib/cache/LRUCaches";

const timeout = 1000;
const key = "hero/anime";

// Adds at most 1000ms (average ~400ms) to the FCP for really unlucky people
// who decided to open the website when the cache expired.
// Because of the cache, most of the time it's just 1-3ms,
// and the anime data will load instantly on the client.
export default async function ServerFetch() {
    let data;
    console.log(AnimeLRUCache);
    try {
        if (AnimeLRUCache.has(key)) {
            data = AnimeLRUCache.get(key);
        } else {
            data = await fetchHeroTitle({
                // Abort fetch after 1000ms
                signal: AbortSignal.timeout(timeout),
            });

            AnimeLRUCache.set(key, data);
        }
    } catch {
        return (
            <>
                <ClientFetch />
            </>
        );
    }

    return (
        <>
            <HeroCard data={data} />
        </>
    );
}