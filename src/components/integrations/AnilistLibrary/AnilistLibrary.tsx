"use client";

import React, { useEffect, useState, useMemo } from "react";
import GridCards from "@/components/layout/GridCards/GridCards";
import SmallCard from "@/components/misc/SmallCard/SmallCard";
import { AnimeType } from "@/types/Anime/Anime.type";
import SkeletonSmallCard from "@/components/misc/SkeletonSmallCard/SkeletonSmallCard";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import ErrorSmallCard from "@/components/misc/ErrorSmallCard/ErrorSmallCard";
import Pagination from "@/components/layout/Pagination/Pagination";
import { useSearchParams } from "next/navigation";
import SegmentedControl from "@/components/layout/SegmentedControl/SegmentedControl";
import { LibraryChunkSize } from "@/constants/app";
import { useDebouncedState } from "@mantine/hooks";

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
    const [debouncedSearchParameters, setDebouncedSearchParameters] = useDebouncedState<string>("", 500);

    const [page, onChange] = useState(
        Number(searchParameters.get("page") || 1),
    );
    const [selectedList, setSelectedList] = useState<string | undefined>(
        searchParameters.get("list") ?? undefined,
    );
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

    // page writing to debounced searchParams state
    useEffect(() => {
        if (!globalThis) {
            return;
        }

        const modifiedParameters = new URLSearchParams(searchParameters.toString());

        modifiedParameters.set("page", safePage.toString());
        modifiedParameters.set("list", (selectedList ?? "").toString());

        setDebouncedSearchParameters(`?${modifiedParameters.toString()}`);
    }, [searchParameters, selectedList, setDebouncedSearchParameters, safePage]);

    useEffect(() => {
        globalThis.history.pushState({}, "", debouncedSearchParameters);
    }, [debouncedSearchParameters]);

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

        const animeSet = new Set<number | undefined>([]);

        cardsNode = slicedData.list.map((media: {
            media: AnimeType;
            progress: number;
            score: number;
        }, index: number) => {
            const { media: anime, progress, score } = media;

            if (animeSet.has(anime?.id)) {
                return;
            }

            animeSet.add(anime?.id);

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
            selected={selectedList}
            selectList={setSelectedList}
        />
    ), [safeListCategories, selectedList, setSelectedList]);

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
