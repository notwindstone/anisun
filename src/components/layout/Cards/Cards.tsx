"use client";

import { ClientFetchDataContext } from "@/utils/providers/ClientFetchDataProvider";
import SmallCard from "@/components/layout/SmallCard/SmallCard";
import { AnimeType } from "@/types/Anime/Anime.type";
import SkeletonSmallCard from "@/components/layout/SkeletonSmallCard/SkeletonSmallCard";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import ErrorSmallCard from "@/components/layout/ErrorSmallCard/ErrorSmallCard";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import GridCards from "@/components/layout/GridCards/GridCards";
import ScrollableCards from "@/components/layout/ScrollableCards/ScrollableCards";
import { useContextSelector } from "use-context-selector";

const placeholderArray = Array.from({ length: 16 });

const LocalContainer = ({
    children,
    colorFirst,
    colorSecond,
    isGridCards,
}: {
    children: React.ReactNode;
    colorFirst: string;
    colorSecond: string;
    isGridCards?: boolean;
}) => (
    isGridCards ? (
        <GridCards>
            {children}
        </GridCards>
    ) : (
        <ScrollableCards gradientColorOne={colorFirst} gradientColorTwo={colorSecond}>
            {children}
        </ScrollableCards>
    )
);

export default function Cards({
    isImageUnoptimized,
    isGrid,
    isPending,
    isError,
    search,
    data,
}: {
    isImageUnoptimized?: boolean;
    isGrid?: boolean;
    isPending?: boolean;
    isError?: boolean;
    search?: string;
    data?: AnimeType | Array<AnimeType>;
}) {
    const animeData = useContextSelector(ClientFetchDataContext, (value) => value.data);
    const { theme, colors: { base } } = useContextSelector(ConfigsContext, (value) => {
        return {
            theme:  value.data.theme,
            colors: value.data.colors,
        };
    });
    const currentData = data ?? animeData;

    if (data !== undefined && !Array.isArray(currentData)) {
        return;
    }

    const colorFirstArray = [ ...parseTailwindColor({
        color: base,
        step:  theme === DarkThemeKey
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
                <LocalContainer
                    isGridCards={isGrid}
                    colorFirst={colorFirst}
                    colorSecond={colorSecond}
                >
                    {
                        placeholderArray.map((_, index) => {
                            return (
                                <ErrorSmallCard
                                    isGrid={isGrid}
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
                <LocalContainer
                    isGridCards={isGrid}
                    colorFirst={colorFirst}
                    colorSecond={colorSecond}
                >
                    {
                        placeholderArray.map((_, index) => {
                            return (
                                <SkeletonSmallCard
                                    isGrid={isGrid}
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

    if (currentData.length === 0) {
        return (
            <div className="py-4 px-8">
                <p className="text-center">
                    Unfortunately, no anime was found.
                </p>
            </div>
        );
    }

    return (
        <>
            <LocalContainer
                isGridCards={isGrid}
                colorFirst={colorFirst}
                colorSecond={colorSecond}
            >
                {
                    currentData.map((anime: AnimeType) => {
                        return (
                            <SmallCard
                                isImageUnoptimized={isImageUnoptimized}
                                isGrid={isGrid}
                                key={anime.id}
                                data={anime}
                            />
                        );
                    })
                }
            </LocalContainer>
        </>
    );
}
