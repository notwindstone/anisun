import ExtensionsFetch from "@/components/extensions/ExtensionsFetch/ExtensionsFetch";
import ClientFetch from "@/components/fetch/ClientFetch/ClientFetch";
import React from "react";
import getAnimePageQueryKey from "@/utils/misc/getAnimePageQueryKey";
import AnimeInfo from "@/components/layout/AnimeInfo/AnimeInfo";

export default async function Page({
    params,
    searchParams,
}: {
    params?: Promise<{ id: string }>;
    searchParams?: Promise<{
        selectedExtension?: string;
    }>;
}) {
    const parameters = await params;
    const id = parameters?.id;
    const search = await searchParams;

    return (
        <div className="flex flex-col sm:p-4 gap-4 mx-auto max-w-384">
            <div className="z-1000 sticky sm:static sm:rounded-md overflow-clip top-0">
                <ExtensionsFetch
                    selectedExtension={search?.selectedExtension as string}
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
