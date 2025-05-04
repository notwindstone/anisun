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

const placeholderArray = Array.from({ length: 16 });

function LocalContainer({
    children,
    gradientColorOne,
    gradientColorTwo,
}: {
    children: React.ReactNode;
    gradientColorOne: string;
    gradientColorTwo: string;
}) {
    return (
        <div className="relative flex flex-nowrap w-full h-fit">
            <div className="p-4 flex flex-nowrap gap-4 w-full overflow-x-auto overflow-y-hidden scrollbar-hidden h-fit">
                {children}
            </div>
            <div
                className="absolute left-0 w-4 h-full z-10"
                style={{
                    backgroundImage: `linear-gradient(
                        to right,
                        ${gradientColorOne},
                        ${gradientColorTwo}
                    )`,
                }}
            />
            <div
                className="absolute right-0 w-4 h-full z-10"
                style={{
                    backgroundImage: `linear-gradient(
                        to left,
                        ${gradientColorOne},
                        ${gradientColorTwo}
                    )`,
                }}
            />
        </div>
    );
}

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
                <LocalContainer gradientColorOne={colorFirst} gradientColorTwo={colorSecond}>
                    {
                        placeholderArray.map((_, index) => {
                            return (
                                <ErrorSmallCard
                                    key={`error_${index}`}
                                />
                            );
                        })
                    }
                </LocalContainer>
            </>
        );
    }

    if (search !== undefined && search === "") {
        return;
    }

    if (isPending) {
        return (
            <>
                <LocalContainer gradientColorOne={colorFirst} gradientColorTwo={colorSecond}>
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
                </LocalContainer>
            </>
        );
    }
    
    if (animeData.length === 0) {
        return;
    }

    return (
        <>
            <LocalContainer gradientColorOne={colorFirst} gradientColorTwo={colorSecond}>
                {
                    animeData.map((anime: AnimeType) => {
                        return (
                            <SmallCard key={anime.id} data={anime} />
                        );
                    })
                }
            </LocalContainer>
        </>
    );
}