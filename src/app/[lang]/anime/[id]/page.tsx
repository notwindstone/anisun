"use client";

import ExtensionsFetch from "@/components/extensions/ExtensionsFetch/ExtensionsFetch";
import ClientFetch from "@/components/fetch/ClientFetch/ClientFetch";
import getAnimePageQueryKey from "@/lib/misc/getAnimePageQueryKey";
import AnimeInfo from "@/components/layout/AnimeInfo/AnimeInfo";
import { useParams, useSearchParams } from "next/navigation";

// loads when user opens anime page via a URL
export default function Page() {
    const parameters = useParams<
        Partial<{ id: string }>
    >();
    const id = parameters?.id ?? "0";

    const searchParameters = useSearchParams();
    const selectedExtension = searchParameters?.get("selectedExtension") ?? "";

    return (
        <div className="flex flex-col sm:p-4 gap-4 mx-auto max-w-384">
            <div className="z-1000 sticky sm:static sm:rounded-md overflow-clip top-0">
                <ExtensionsFetch
                    selectedExtension={selectedExtension}
                />
            </div>
            <ClientFetch
                queryKey={getAnimePageQueryKey(Number(id))}
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
