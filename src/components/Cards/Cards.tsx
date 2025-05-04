"use client";

import { useContext } from "react";
import { ClientFetchDataContext } from "@/utils/providers/ClientFetchDataProvider";
import SmallCard from "@/components/SmallCard/SmallCard";
import { AnimeType } from "@/types/Anime/Anime.type";
import SkeletonSmallCard from "@/components/SmallCard/SkeletonSmallCard/SkeletonSmallCard";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import ErrorSmallCard from "@/components/SmallCard/ErrorSmallCard/ErrorSmallCard";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import GridCards from "@/components/Cards/GridCards/GridCards";
import ScrollableCards from "@/components/Cards/ScrollableCards/ScrollableCards";

const placeholderArray = Array.from({ length: 16 });

export default function Cards({
    isPending,
    isError,
    search,
}: {
    isPending?: boolean;
    isError?: boolean;
    search?: string;
}) {
    const { data: animeData } = useContext(ClientFetchDataContext);
    const { data: { theme, colors: { base } } } = useContext(ConfigsContext);

    const colorFirstArray = [ ...parseTailwindColor({
        color: base,
        step: theme === DarkThemeKey
            ? 950
            : 50,
    }) ];

    colorFirstArray.pop();

    const colorSecondArray = [ ...colorFirstArray ];

    colorFirstArray.push(" / 0.7)");
    colorSecondArray.push(" / 0)");

    const colorFirst = colorFirstArray.join("");
    const colorSecond = colorSecondArray.join("");

    if (isError) {
        return (
            <>
                <GridCards gradientColorOne={colorFirst} gradientColorTwo={colorSecond}>
                    {
                        placeholderArray.map((_, index) => {
                            return (
                                <ErrorSmallCard
                                    key={`error_${index}`}
                                />
                            );
                        })
                    }
                </GridCards>
            </>
        );
    }

    if (search !== undefined && search === "") {
        return;
    }

    if (isPending) {
        return (
            <>
                <GridCards gradientColorOne={colorFirst} gradientColorTwo={colorSecond}>
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
                </GridCards>
            </>
        );
    }
    
    if (animeData.length === 0) {
        return;
    }

    return (
        <>
            <ScrollableCards gradientColorOne={colorFirst} gradientColorTwo={colorSecond}>
                {
                    animeData.map((anime: AnimeType) => {
                        return (
                            <SmallCard key={anime.id} data={anime} />
                        );
                    })
                }
            </ScrollableCards>
            <GridCards gradientColorOne={colorFirst} gradientColorTwo={colorSecond}>
                {
                    animeData.map((anime: AnimeType) => {
                        return (
                            <SmallCard key={anime.id} data={anime} />
                        );
                    })
                }
            </GridCards>
        </>
    );
}