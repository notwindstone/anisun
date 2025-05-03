"use server";

import fetchHeroTitle from "@/lib/anime/fetchHeroTitle";
import ClientFetch from "@/components/ClientFetch/ClientFetch";
import HeroCard from "@/components/Hero/HeroCard/HeroCard";
import { AnimeLRUCache } from "@/lib/cache/LRUCaches";
import SkeletonCard from "@/components/Hero/SkeletonCard/SkeletonCard";
import ErrorCard from "@/components/Hero/ErrorCard/ErrorCard";
import { BaseColorsType } from "@/types/TailwindCSS/BaseColors.type";
import { ServerFetchTimeout } from "@/constants/app";

const key = "hero/anime";

// Because of the cache getting data requires just 1-3ms,
// and the anime data will load instantly on the client.
// If there is no cache, a user will see a loading state (skeleton).
// If there is an error while getting the data server-side,
// Data will be fetched client-side using Tanstack Query.
export default async function ServerFetch({
    theme,
    base,
}: {
    theme: "light" | "dark";
    base: BaseColorsType;
}) {
    let data;

    try {
        if (AnimeLRUCache.has(key)) {
            data = AnimeLRUCache.get(key);
        } else {
            data = await fetchHeroTitle({
                // Abort fetch after 1000ms
                signal: AbortSignal.timeout(ServerFetchTimeout),
            });

            AnimeLRUCache.set(key, data);
        }
    } catch {
        return (
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