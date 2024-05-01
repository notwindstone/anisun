"use client"

import {useInfiniteQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import {Grid, rem, Title} from "@mantine/core";
import AnimeTitleCard from "@/components/AnimeTitle/AnimeTitleCard/AnimeTitleCard";
import AnimeVideoSkeleton from "@/components/Skeletons/AnimeVideoSkeleton/AnimeVideoSkeleton";
import {useVirtualizer, useWindowVirtualizer} from '@tanstack/react-virtual';
import React, {useEffect} from "react";

export default function AnimeTitleList() {
    const shikimori = client()
    const {
        data,
        status,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['animeTitlesList'],
        queryFn: ({ pageParam }) => getAnimeList(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.nextCursor,
    })

    const skeletons = Array.from({ length: 16 }).map((_skeleton, index) => {
        return (
            <Grid.Col span={{ base: 12, xs: 6, sm: 4, lg: 3 }} key={index}>
                <AnimeVideoSkeleton key={index} />
            </Grid.Col>
        )
    })

    const parentRef = React.useRef()

    const allRows = data ? data?.pages.map((d) => d.animeList) : []

    const rowVirtualizer = useVirtualizer({
        count: allRows.length,
        // @ts-ignore
        getScrollElement: () => parentRef.current,
        estimateSize: () => 500,
    })
    async function getAnimeList(pageParam: number) {
        const animeList = (await shikimori.animes.list({
            limit: 16,
            page: pageParam
        })).animes

        return { animeList: animeList, nextCursor: pageParam + 1 }
    }

    return (
        <>
            {/* @ts-ignore */}
            <div ref={parentRef} className="List">
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((item) => (
                        <Grid
                            key={item.key}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: `fit-content`,
                                transform: `translateY(${
                                    item.start - rowVirtualizer.options.scrollMargin
                                }px)`,
                            }}
                        >
                            <Grid.Col>{item.index}{console.log(allRows[item.index])}</Grid.Col>
                        </Grid>
                    ))}
                </div>
            </div>
        </>
    )
}