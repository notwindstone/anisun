"use server";

import fetchHeroTitle from "@/lib/anime/fetchHeroTitle";
import ClientFetch from "@/components/Hero/ClientFetch/ClientFetch";
import HeroCard from "@/components/Hero/HeroCard/HeroCard";
import { AnimeLRUCache } from "@/lib/cache/LRUCaches";

const timeout = 2000;
const key = "hero/anime";

// Because of the cache getting data requires just 1-3ms,
// and the anime data will load instantly on the client.
// If there is no cache, a user will see a loading state (skeleton).
// If there is an error while getting the data server-side,
// Data will be fetched client-side using Tanstack Query.
export default async function ServerFetch() {
    let data;

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
                <ClientFetch
                    method={"FetchHeroTitle"}
                />
            </>
        );
    }

    return (
        <>
            <HeroCard data={data} />
        </>
    );
}