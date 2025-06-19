"use client";

import React, { useMemo } from "react";
import GridCards from "@/components/layout/GridCards/GridCards";
import SmallCard from "@/components/misc/SmallCard/SmallCard";
import { AnimeType } from "@/types/Anime/Anime.type";
import { useEffect, useState } from "react";
import SkeletonSmallCard from "@/components/misc/SkeletonSmallCard/SkeletonSmallCard";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import ErrorSmallCard from "@/components/misc/ErrorSmallCard/ErrorSmallCard";
import Pagination from "@/components/layout/Pagination/Pagination";
import { useSearchParams } from "next/navigation";
import SegmentedControl from "@/components/layout/SegmentedControl/SegmentedControl";
import { LibraryChunkSize } from "@/constants/app";

const mediaListStatuses: Array<string> = ["Loading", "your", "lists.", "Please", "wait!"];

export default function AnilistLibrary({
    data,
    isPending,
    error,
}: {
    data: {
        categories: Array<string>,
        lists:      Array<{
            total:   number;
            entries: Record<number, Array<{
                media: AnimeType;
                progress: number;
                score: number;
            }>>;
        }>,
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
    const totalPages = Math.ceil((data?.lists?.[slicedData.index]?.total ?? 1) / LibraryChunkSize);
    const safePage = Math.min(page, totalPages);

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
            list:  data.lists[selectedIndex].entries[safePage - 1],
        });
    }, [data, selectedList, safePage]);

    useEffect(() => {
        if (!globalThis) {
            return;
        }

        const modifiedParameters = new URLSearchParams(searchParameters.toString());

        modifiedParameters.set("page", safePage.toString());

        globalThis.history.pushState({}, "", `?${modifiedParameters.toString()}`);
    }, [searchParameters, safePage]);

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

    // optimizations
    const memoizedSegmentedControl = useMemo(() => (
        <SegmentedControl
            list={safeListCategories}
            selectList={setSelectedList}
        />
    ), [safeListCategories, setSelectedList]);

    return (
        <>
            {memoizedSegmentedControl}
            <Pagination
                total={totalPages}
                onChange={onChange}
                page={safePage}
            >
                <GridCards disablePadding>
                    {cardsNode}
                </GridCards>
            </Pagination>
        </>
    );
}
