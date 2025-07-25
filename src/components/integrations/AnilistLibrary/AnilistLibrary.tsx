"use client";

import React, { useEffect, useState, useMemo, useCallback, SetStateAction, useLayoutEffect } from "react";
import GridCards from "@/components/layout/GridCards/GridCards";
import SmallCard from "@/components/layout/SmallCard/SmallCard";
import { AnimeType } from "@/types/Anime/Anime.type";
import SkeletonSmallCard from "@/components/layout/SkeletonSmallCard/SkeletonSmallCard";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/lib/providers/ConfigsProvider";
import ErrorSmallCard from "@/components/layout/ErrorSmallCard/ErrorSmallCard";
import Pagination from "@/components/base/Pagination/Pagination";
import { useSearchParams } from "next/navigation";
import SegmentedControl from "@/components/base/SegmentedControl/SegmentedControl";
import { useDebouncedState } from "@mantine/hooks";
import Input from "@/components/base/Input/Input";
import getCurrentAnimeChunk from "@/lib/misc/getCurrentAnimeChunk";
import AnilistUsernamesDropdown from "@/components/integrations/AnilistUsernamesDropdown/AnilistUsernamesDropdown";
import { PageRoutes } from "@/constants/routes";
import useFuturePathname from "@/stores/useFuturePathname";

const mediaListStatuses: Array<string> = ["Loading", "user", "lists.", "Please", "wait!"];

export default function AnilistLibrary({
    data,
    isPending,
    error,
    username,
    passedChunkSize,
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
    passedChunkSize: number;
}) {
    const { theme, base } = useContextSelector(ConfigsContext, (value) => {
        return {
            theme: value.data.theme,
            base:  value.data.colors.base,
        };
    });
    const searchParameters = useSearchParams();
    const futurePathname = useFuturePathname((state) => state.futurePathname);

    const [debouncedSearchParameters, setDebouncedSearchParameters] = useDebouncedState<string>("", 500, {
        leading: true,
    });
    const [debouncedSearch, setDebouncedSearch] = useDebouncedState<string>(searchParameters.get("search") ?? "", 100);
    const [debouncedUsername, setDebouncedUsername] = useDebouncedState<string>(username, 300, {
        leading: true,
    });

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
    const safePage = Math.max(
        // handle `0` values
        1,
        // handle total data pages
        Math.min(page, slicedData.total),
    );

    // here i use `useLayoutEffect` instead of `useEffect` to get
    // rid of an almost unnoticeable delay between showing anime entries
    useLayoutEffect(() => {
        if (!data) {
            return;
        }

        setSlicedData(getCurrentAnimeChunk({
            data,
            debouncedSearch,
            selectedList,
            safePage,
            passedChunkSize,
        }));
    }, [data, selectedList, safePage, debouncedSearch, passedChunkSize]);

    // page writing to debounced searchParams state
    useEffect(() => {
        if (!globalThis) {
            return;
        }

        if (safePage === 0) {
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
        // sometimes (thanks to `debouncedSearchParameters`) this shit fires at the same time as the routing.
        // if the user's device is loading another page too long, then it could lead to overwriting the redirect path
        if (
            futurePathname.path !== PageRoutes.Library.Root &&
            // don't change search params if last navigation initialized less than 510ms ago
            // 510ms just for the reserve
            ((Date.now()) - futurePathname.date) <= 510
        ) {
            return;
        }

        globalThis.history.replaceState({}, "", debouncedSearchParameters);
    }, [futurePathname, debouncedSearchParameters]);

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
                passedMessage={error?.message}
                isGrid
            />
        ));
    }

    breakable: if (data !== undefined) {
        // should never occur
        if (!Array.isArray(slicedData.list)) {
            break breakable;
        }

        // handle duplicates
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
    const memoizedSetUsernameSearchParameters = useCallback(
        (value: SetStateAction<string>) => {
            const modifiedParameters = new URLSearchParams(searchParameters.toString());

            modifiedParameters.set("username", value.toString());

            globalThis.history.replaceState({}, "", `?${modifiedParameters.toString()}`);
        },
        [searchParameters],
    );
    const memoizedSetUsernameState = useCallback(
        (value: SetStateAction<string>) => setDebouncedUsername(value),
        [setDebouncedUsername],
    );

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
                    <div className="relative flex-1 shrink-0 min-w-40">
                        <Input
                            defaultValue={username}
                            setSearch={memoizedSetUsernameState}
                            placeholder="Use different username..."
                            appendClassNames="flex-1 shrink-0 min-w-40"
                            dropdown={(
                                <AnilistUsernamesDropdown
                                    search={debouncedUsername}
                                    setSearch={memoizedSetUsernameSearchParameters}
                                />
                            )}
                        />
                    </div>
                </div>
                <GridCards disablePadding>
                    {cardsNode}
                </GridCards>
            </Pagination>
        </>
    );
}
