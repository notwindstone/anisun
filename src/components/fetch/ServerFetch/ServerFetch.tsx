"use server";

import ClientFetch from "@/components/fetch/ClientFetch/ClientFetch";
import { AnimeLRUCache, MiscLRUCache } from "@/lib/cache/LRUCaches";
import { ServerFetchErrorCount, ServerFetchTimeout } from "@/constants/app";
import { Getters } from "@/lib/anime/getters";
import React from "react";
import getGraphQLResponse from "@/utils/misc/getGraphQLResponse";

// Because of the cache getting data requires just 1-3ms,
// and the anime data will load instantly on the client.
// If there is no cache, a user will see a loading state (skeleton).
// If there is an error while getting the data server-side,
// data will be fetched client-side using Tanstack Query.
// If there is more than 3 errors in the last 3 minutes,
// just let the client handle everything.
export default async function ServerFetch({
    children,
    queryKey,
    method,
    pendingUI,
    errorUI,
    cacheQueryKey,
    cacheErrorKey,
    renderChildrenWithData,
}: {
    children: React.ReactNode;
    queryKey: Array<string>;
    method: keyof typeof Getters;
    pendingUI: React.ReactNode;
    errorUI: React.ReactNode;
    cacheQueryKey: string;
    cacheErrorKey: string;
    renderChildrenWithData: ({
        data,
    }: {
        data?: Awaited<ReturnType<typeof getGraphQLResponse>>;
    }) => React.ReactNode;
}) {
    const clientReactNode = (
        <>
            <ClientFetch
                queryKey={queryKey}
                method={method}
                pendingUI={pendingUI}
                errorUI={errorUI}
            >
                {children}
            </ClientFetch>
        </>
    );
    const errorCount = Number(MiscLRUCache.get(cacheErrorKey) ?? 0);
    let data;

    try {
        if (errorCount >= ServerFetchErrorCount) {
            return clientReactNode;
        }

        if (AnimeLRUCache.has(cacheQueryKey)) {
            data = AnimeLRUCache.get(cacheQueryKey);
        } else {
            data = await Getters[method]({
                // Abort fetch after 3000ms
                signal: AbortSignal.timeout(ServerFetchTimeout),
            });

            AnimeLRUCache.set(cacheQueryKey, data);
        }
    } catch {
        MiscLRUCache.set(cacheErrorKey, errorCount + 1);

        return clientReactNode;
    }

    if (data === undefined) {
        return;
    }

    return (
        <>
            {
                renderChildrenWithData({ data })
            }
        </>
    );
}
