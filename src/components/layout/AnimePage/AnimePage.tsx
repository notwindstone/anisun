"use client";

import ClientFetch from "@/components/fetch/ClientFetch/ClientFetch";
import getAnimePageQueryKey from "@/lib/misc/getAnimePageQueryKey";
import AnimeInfo from "@/components/layout/AnimeInfo/AnimeInfo";
import ExtensionsSelector from "@/components/extensions/ExtensionsSelector/ExtensionsSelector";

export default function AnimePage({
    selectedExtension,
    idMal,
}: {
    selectedExtension: string;
    idMal: string;
}) {
    return (
        <div className="flex flex-col sm:p-4 gap-4 mx-auto max-w-384">
            <ClientFetch
                queryKey={getAnimePageQueryKey(Number(idMal))}
                method="FetchCurrentAnime"
                fetchArguments={{ idMal: idMal }}
                pendingUI={
                    <div className="flex flex-col gap-4">
                        <div className="flex lg:flex-nowrap flex-wrap gap-4">
                            <div className="w-full bg-neutral-800 aspect-video animate-pulse" />
                            <div className="w-full lg:max-w-96 bg-neutral-800 animate-pulse" />
                        </div>
                        <div className="flex lg:flex-nowrap flex-wrap gap-4">

                        </div>
                    </div>
                }
                errorUI={
                    <>Error...</>
                }
            >
                <AnimeInfo>
                    <div className="z-1000 sm:rounded-md overflow-clip top-0 w-full">
                        <ExtensionsSelector
                            selectedExtension={selectedExtension}
                        />
                    </div>
                </AnimeInfo>
            </ClientFetch>
        </div>
    );
}
