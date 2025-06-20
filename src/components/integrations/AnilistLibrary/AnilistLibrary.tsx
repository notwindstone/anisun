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
import { useDebouncedState } from "@mantine/hooks";
import Input from "@/components/layout/Input/Input";
import getCurrentAnimeChunk from "@/utils/misc/getCurrentAnimeChunk";

const mediaListStatuses: Array<string> = ["Loading", "your", "lists.", "Please", "wait!"];

export default function AnilistLibrary({
    data,
    isPending,
    error,
    username,
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
    username: string;
}) {
    const { theme, base } = useContextSelector(ConfigsContext, (value) => {
        return {
            theme: value.data.theme,
            base:  value.data.colors.base,
        };
    });
    const searchParameters = useSearchParams();

    const [debouncedSearchParameters, setDebouncedSearchParameters] = useDebouncedState<string>("", 500);
    const [debouncedSearch, setDebouncedSearch] = useDebouncedState<string>(searchParameters.get("search") ?? "", 100);

    const [page, onChange] = useState(
        Number(searchParameters.get("page") || 1),
    );
    const [selectedList, setSelectedList] = useState<string | undefined>(
        searchParameters.get("list") ?? undefined,
    );
    const [slicedData, setSlicedData] = useState<{
        total: number;
        index: number;
        list:  Array<{
            media:    AnimeType;
            progress: number;
            score:    number;
        }>;
    }>({
        total: 0,
        index: 0,
        list:  [],
    });

    const safeListCategories = data?.categories ?? mediaListStatuses;
    const safePage = Math.min(page, slicedData.total);

    useEffect(() => {
        if (!data) {
            return;
        }

        setSlicedData(getCurrentAnimeChunk({
            data,
            debouncedSearch,
            selectedList,
            safePage,
        }));
    }, [data, selectedList, safePage, debouncedSearch]);

    // page writing to debounced searchParams state
    useEffect(() => {
        if (!globalThis) {
            return;
        }

        const modifiedParameters = new URLSearchParams(searchParameters.toString());

        modifiedParameters.set("page", safePage.toString());

        if (selectedList) {
            modifiedParameters.set("list", selectedList.toString());
        }

        if (debouncedSearch !== "") {
            modifiedParameters.set("search", debouncedSearch);
        }

        setDebouncedSearchParameters(`?${modifiedParameters.toString()}`);
    }, [searchParameters, debouncedSearch, selectedList, setDebouncedSearchParameters, safePage]);

    // updating states in search parameters
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
                darker
                total={slicedData.total}
                onChange={onChange}
                page={safePage}
            >
                <div className="flex gap-2 shrink-0 flex-wrap">
                    <Input
                        defaultValue={debouncedSearch}
                        setSearch={setDebouncedSearch}
                        placeholder="Search anime..."
                        appendClassNames="flex-1 shrink-0 min-w-40"
                    />
                    <Input
                        defaultValue={username}
                        setSearch={(value) => {
                            const modifiedParameters = new URLSearchParams(searchParameters.toString());

                            modifiedParameters.set("username", value.toString());

                            setDebouncedSearchParameters(`?${modifiedParameters.toString()}`);
                        }}
                        placeholder="Use different username..."
                        appendClassNames="flex-1 shrink-0 min-w-40"
                    />
                </div>
                <GridCards disablePadding>
                    {cardsNode}
                </GridCards>
            </Pagination>
        </>
    );
}
