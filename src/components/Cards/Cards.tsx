"use client";

import { useContext } from "react";
import { ClientFetchDataContext } from "@/utils/providers/ClientFetchDataProvider";
import SmallCard from "@/components/SmallCard/SmallCard";
import { AnimeType } from "@/types/Anime/Anime.type";
import SkeletonSmallCard from "@/components/SmallCard/SkeletonSmallCard/SkeletonSmallCard";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";

const placeholderArray = Array.from({ length: 16 });

export default function Cards({
    isPending,
    search,
}: {
    isPending?: boolean;
    search?: string;
}) {
    const { data: animeData } = useContext(ClientFetchDataContext);
    const { data: { theme, colors: { base } } } = useContext(ConfigsContext);

    if (search !== undefined && search === "") {
        return;
    }

    if (isPending) {
        return (
            <>
                <div className="p-4 flex flex-nowrap gap-4 w-full overflow-x-auto scrollbar-hidden">
                    {
                        placeholderArray.map((_, index) => {
                            return (
                                <SkeletonSmallCard
                                    key={`skeleton_${index}`}
                                    theme={theme}
                                    base={base}
                                />
                            );
                        })
                    }
                </div>
            </>
        );
    }
    
    if (animeData.length === 0) {
        return;
    }

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