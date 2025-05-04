"use server";

import ClientFetch from "@/components/ClientFetch/ClientFetch";
import { AnimeLRUCache, MiscLRUCache } from "@/lib/cache/LRUCaches";
import { ServerFetchTimeout } from "@/constants/app";
import Cards from "@/components/Cards/Cards";
import fetchTrendingTitles from "@/lib/anime/fetchTrendingTitles";

const key = "trending/anime";
const errorKey = "trending/error";

// Because of the cache getting data requires just 1-3ms,
// and the anime data will load instantly on the client.
// If there is no cache, a user will see a loading state (skeleton).
// If there is an error while getting the data server-side,
// data will be fetched client-side using Tanstack Query. But:
// server doesn't know if client-side successfully fetched anime data
// so it will refetch on every page render that contains this component.
// That's why i implemented an error counter: if there is more than
// 3 errors (in the last 3 minutes), just let the client handle everything.
export default async function ServerFetch() {
    const clientReactNode = (
        <>
            <ClientFetch
                queryKey={["trending", "anime"]}
                method={"SearchTitles"}
                pendingUI={
                    <Cards isPending />
                }
                errorUI={
                    <Cards isError />
                }
            >
                <Cards />
            </ClientFetch>
        </>
    );
    const errorCount = Number(MiscLRUCache.get(errorKey) ?? 0);
    let data;

    try {
        if (errorCount >= 3) {
            return clientReactNode;
        }

        if (AnimeLRUCache.has(key)) {
            data = AnimeLRUCache.get(key);
        } else {
            data = await fetchTrendingTitles({
                // Abort fetch after 3000ms
                signal: AbortSignal.timeout(ServerFetchTimeout),
            });

            AnimeLRUCache.set(key, data);
        }
    } catch {
        MiscLRUCache.set(errorKey, errorCount + 1);

        return clientReactNode;
    }

    // should never occur
    if (!Array.isArray(data)) {
        return;
    }

    return (
        <>
            <Cards data={data} />
        </>
    );
}