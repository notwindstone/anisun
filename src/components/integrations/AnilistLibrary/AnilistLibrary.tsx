"use client";

import React from "react";
import GridCards from "@/components/layout/GridCards/GridCards";
import SmallCard from "@/components/misc/SmallCard/SmallCard";
import { AnimeType } from "@/types/Anime/Anime.type";
import { useEffect, useRef, useState } from "react";
import SkeletonSmallCard from "@/components/misc/SkeletonSmallCard/SkeletonSmallCard";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import ErrorSmallCard from "@/components/misc/ErrorSmallCard/ErrorSmallCard";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import Pagination from "@/components/layout/Pagination/Pagination";
import { useSearchParams } from "next/navigation";

const mediaListStatuses: Array<string> = ["Loading", "your", "lists.", "Please", "wait!"];
const totalEntries = 18;

export default function AnilistLibrary({
    data,
    isPending,
    error,
}: {
    data: {
        categories: Array<string>,
        lists:      Array<any>,
    } | undefined;
    isPending: boolean;
    error: Error | null;
}) {
    const { theme, base } = useContextSelector(ConfigsContext, (value) => {
        return {
            theme: value.data.theme,
            base:  value.data.colors.base,
        };
    });
    const currentButtonWidth = useRef<{
        width:  number;
        offset: {
            left: number;
            top:  number;
        };
    }>(null);
    const searchParameters = useSearchParams();

    const [page, onChange] = useState(
        Number(searchParameters.get("page") || 1),
    );
    const [selectedList, setSelectedList] = useState<string | undefined>();
    const [slicedData, setSlicedData] = useState<{
        index: number;
        list:  Array<{
            media: AnimeType;
            progress: number;
            score: number;
        }>;
    }>({
        index: 0,
        list:  [],
    });

    const safeListCategories = data?.categories ?? mediaListStatuses;

    // slice array with useEffect to improve performance
    useEffect(() => {
        if (!data) {
            return;
        }

        let selectedIndex = data.categories.indexOf(selectedList ?? "");

        if (selectedIndex === -1) {
            selectedIndex = 0;
        }

        setSlicedData({
            index: selectedIndex,
            list:  data.lists[selectedIndex].entries.slice(
                (page - 1) * totalEntries,
                ((page - 1) * totalEntries) + totalEntries,
            ),
        });
    }, [data, selectedList, page]);

    useEffect(() => {
        if (!globalThis) {
            return;
        }

        const modifiedParameters = new URLSearchParams(searchParameters.toString());

        modifiedParameters.set("page", page.toString());

        globalThis.history.pushState({}, "", `?${modifiedParameters.toString()}`);
    }, [searchParameters, page]);

    let cardsNode: React.ReactNode;

    if (isPending) {
        cardsNode = safeListCategories.map((mediaListStatus) => (
            <SkeletonSmallCard
                key={mediaListStatus}
                isGrid
                theme={theme}
                base={base}
            />
        ));
    }

    if (error) {
        cardsNode = safeListCategories.map((mediaListStatus) => (
            <ErrorSmallCard
                key={mediaListStatus}
                isGrid
            />
        ));
    }

    breakable: if (data !== undefined) {
        // should never occur
        if (!Array.isArray(slicedData.list)) {
            break breakable;
        }

        cardsNode = slicedData.list.map((media: {
            media: AnimeType;
            progress: number;
            score: number;
        }, index: number) => {
            const { media: anime, progress, score } = media;

            return (
                <SmallCard
                    key={`${anime.id}_${index}`}
                    data={{
                        ...anime,
                        currentEpisode: progress,
                        userScore:      score,
                        greyOutScore:   true,
                    }}
                    isGrid
                    isImageUnoptimized
                />
            );
        });
    }

    return (
        <>
            <div className="flex gap-2 shrink-0 flex-wrap">
                <div
                    className="w-fit relative rounded-md flex gap-2 p-1 overflow-hidden shrink-0 flex-wrap"
                    style={{
                        backgroundColor: parseTailwindColor({
                            color: base,
                            step:  theme === DarkThemeKey
                                ? 900 : 100,
                        }),
                    }}
                >
                    <span
                        className="transition-segmented-control duration-300 absolute h-8 rounded-md"
                        style={{
                            backgroundColor: parseTailwindColor({
                                color: base,
                                step:  theme === DarkThemeKey
                                    ? 800 : 200,
                            }),
                            width:     currentButtonWidth.current?.width ?? 0,
                            transform: `translateX(${currentButtonWidth.current?.offset?.left ?? 0}px) translateY(${currentButtonWidth.current?.offset?.top ?? 0}px)`,
                        }}
                    />
                    {
                        safeListCategories.map((mediaListStatus, index) => {
                            return (
                                <React.Fragment key={mediaListStatus}>
                                    {
                                        index > 0 && (

                                            <div
                                                className="h-8 w-[1px]"
                                                style={{
                                                    backgroundColor: parseTailwindColor({
                                                        color: base,
                                                        step:  theme === DarkThemeKey
                                                            ? 800 : 200,
                                                    }),
                                                }}
                                            />
                                        )
                                    }
                                    <button
                                        onClick={(event) => {
                                            currentButtonWidth.current = {
                                                width:  event.currentTarget.clientWidth,
                                                offset: {
                                                    left: event.currentTarget.offsetLeft - 4,
                                                    top:  event.currentTarget.offsetTop - 4,
                                                },
                                            };
                                            setSelectedList(mediaListStatus);
                                        }}
                                        className="z-10 flex rounded-md py-1 px-2 h-8 cursor-pointer transition-[opacity] duration-300 opacity-80 hover:opacity-100"
                                    >
                                        {mediaListStatus}
                                    </button>
                                </React.Fragment>

                            );
                        })
                    }
                </div>
            </div>
            <Pagination
                total={
                    Math.ceil((data?.lists?.[slicedData.index]?.entries?.length ?? 1) / totalEntries)
                }
                onChange={onChange}
                page={page}
            >
                <GridCards disablePadding>
                    {cardsNode}
                </GridCards>
            </Pagination>
        </>
    );
}
