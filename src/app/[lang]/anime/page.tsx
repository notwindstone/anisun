"use client";

import { useContextSelector } from "use-context-selector";
import { AnimePageLoaderContext } from "@/lib/providers/AnimePageLoader";
import ExtensionsFetch from "@/components/extensions/ExtensionsFetch/ExtensionsFetch";
import ClientFetch from "@/components/fetch/ClientFetch/ClientFetch";
import getAnimePageQueryKey from "@/lib/misc/getAnimePageQueryKey";
import AnimeInfo from "@/components/layout/AnimeInfo/AnimeInfo";

export default function Page() {
    const optimisticData = useContextSelector(AnimePageLoaderContext, (value) => value.optimisticData);

    const idMal = optimisticData?.idMal ?? "0";
    const selectedExtension = optimisticData?.selectedExtension ?? "";

    return (
        <div className="flex flex-col sm:p-4 gap-4 mx-auto max-w-384">
            <div className="z-1000 sticky sm:static sm:rounded-md overflow-clip top-0">
                <ExtensionsFetch
                    selectedExtension={selectedExtension}
                />
            </div>
            <ClientFetch
                queryKey={getAnimePageQueryKey(Number(idMal))}
                method="FetchCurrentAnime"
                fetchArguments={{ idMal: idMal }}
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
