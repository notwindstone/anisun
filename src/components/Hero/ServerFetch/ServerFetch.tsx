"use server";

import fetchHeroTitle from "@/lib/anime/fetchHeroTitle";
import ClientFetch from "@/components/ClientFetch/ClientFetch";
import HeroCard from "@/components/Hero/HeroCard/HeroCard";
import { AnimeLRUCache, MiscLRUCache } from "@/lib/cache/LRUCaches";
import SkeletonCard from "@/components/Hero/SkeletonCard/SkeletonCard";
import ErrorCard from "@/components/Hero/ErrorCard/ErrorCard";
import { BaseColorsType } from "@/types/TailwindCSS/BaseColors.type";
import { ServerFetchTimeout } from "@/constants/app";

const key = "hero/anime";
const errorKey = "hero/error";

// Because of the cache getting data requires just 1-3ms,
// and the anime data will load instantly on the client.
// If there is no cache, a user will see a loading state (skeleton).
// If there is an error while getting the data server-side,
// data will be fetched client-side using Tanstack Query. But:
// server doesn't know if client-side successfully fetched anime data
// so it will refetch on every page render that contains this component.
// That's why i implemented an error counter: if there is more than
// 3 errors (in the last 3 minutes), just let the client handle everything.
export default async function ServerFetch({
    theme,
    base,
}: {
    theme: "light" | "dark";
    base: BaseColorsType;
}) {
    const clientReactNode = (
        <>
            <ClientFetch
                queryKey={["hero", "anime"]}
                method={"FetchHeroTitle"}
                pendingUI={
                    <SkeletonCard theme={theme} base={base} />
                }
                errorUI={
                    <ErrorCard />
                }
            >
                <HeroCard />
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
            data = await fetchHeroTitle({
                // Abort fetch after 3000ms
                signal: AbortSignal.timeout(ServerFetchTimeout),
            });

            AnimeLRUCache.set(key, data);
        }
    } catch {
        MiscLRUCache.set(errorKey, errorCount + 1);

        return clientReactNode;
    }

    return (
        <>
            <HeroCard data={data} />
        </>
    );
}