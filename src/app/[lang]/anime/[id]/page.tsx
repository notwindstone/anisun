"use client";

import ExtensionsFetch from "@/components/extensions/ExtensionsFetch/ExtensionsFetch";
import ClientFetch from "@/components/fetch/ClientFetch/ClientFetch";
import React from "react";
import getAnimePageQueryKey from "@/lib/misc/getAnimePageQueryKey";
import AnimeInfo from "@/components/layout/AnimeInfo/AnimeInfo";
import { useParams, useSearchParams } from "next/navigation";

export default function Page(/*{
    params,
    searchParams,
}: {
    params?: Promise<{ id: string }>;
    searchParams?: Promise<{
        selectedExtension?: string;
    }>;
}*/) {
    /*
    const parameters = await params;
    const id = parameters?.id;
    const search = await searchParams;
    */
    const parameters = useParams<{ id: string }>();
    const id = parameters?.id;
    const searchParameters = useSearchParams();
    const selectedExtension = searchParameters?.get("selectedExtension");

    return (
        <div className="flex flex-col sm:p-4 gap-4 mx-auto max-w-384">
            <div className="z-1000 sticky sm:static sm:rounded-md overflow-clip top-0">
                <ExtensionsFetch
                    selectedExtension={selectedExtension ?? ""}
                />
            </div>
            <ClientFetch
                queryKey={getAnimePageQueryKey(Number(id ?? 0))}
                method="FetchCurrentAnime"
                fetchArguments={{ idMal: id }}
                pendingUI={
                    <>loading an anime page...</>
                }
                errorUI={
                    <>error on anime page...</>
                }
            >
                <AnimeInfo />
            </ClientFetch>
        </div>
    );
}
