"use client";

import { useContext } from "react";
import { ClientFetchDataContext } from "@/utils/providers/ClientFetchDataProvider";
import SmallCard from "@/components/SmallCard/SmallCard";
import { AnimeType } from "@/types/Anime/Anime.type";

export default function Cards() {
    const { data: animeData } = useContext(ClientFetchDataContext);

    return (
        <>
            <div className="p-4 flex flex-nowrap gap-4 w-full overflow-x-auto scrollbar-hidden">
                {
                    animeData.map((anime: AnimeType) => {
                        return (
                            <SmallCard key={anime.id} data={anime} />
                        );
                    })
                }
            </div>
        </>
    );
}