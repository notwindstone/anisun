"use client"

import {useInfiniteQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import {Grid, rem} from "@mantine/core";
import AnimeTitleCard from "@/components/AnimeTitle/AnimeTitleCard/AnimeTitleCard";
import AnimeVideoSkeleton from "@/components/Skeletons/AnimeVideoSkeleton/AnimeVideoSkeleton";
import {useVirtualizer} from '@tanstack/react-virtual';
import React, {useEffect} from "react";
import classes from './AnimeTitleList.module.css'
import {useViewportSize} from "@mantine/hooks";

export default function AnimeTitleList({ inViewport }: { inViewport: boolean }) {
    const { width } = useViewportSize();
    const shikimori = client()
    const {
        data,
        status,
        isFetchingNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ['animeTitlesList'],
        queryFn: ({ pageParam }) => getAnimeList(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.nextCursor,
    })

    useEffect(() => {
        if (status === 'pending' || isFetchingNextPage || !inViewport) {
            return
        }

        fetchNextPage().then()
    }, [inViewport]);

    const skeletons = (
        <Grid pl={rem(32)} pr={rem(32)}>
            {
                Array.from({ length: 16 }).map((_skeleton, index) => {
                    return (
                        <Grid.Col span={{ base: 12, xs: 6, lg: 3 }} key={index}>
                            <AnimeVideoSkeleton key={index} />
                        </Grid.Col>
                    )
                })
            }
        </Grid>
    )

    const parentRef = React.useRef()

    const allRows = data ? data?.pages.map((d) => d.animeList) : []

    let estimatedSize: number

    if (width < 576) estimatedSize = 8240
    if (width >= 576 && width < 768) estimatedSize = 4128
    if (width >= 768) estimatedSize = 2128

    const rowVirtualizer = useVirtualizer({
        count: allRows.length,
        // @ts-ignore
        getScrollElement: () => parentRef.current,
        estimateSize: () => estimatedSize,
    })

    if (status === 'pending' && !isFetchingNextPage) return skeletons

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
                            pl={rem(32)}
                            pr={rem(32)}
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
                            {
                                allRows[item.index].map((animeTitle) => {
                                    return (
                                        <Grid.Col key={animeTitle.id} span={{ base: 12, xs: 6, lg: 3 }}>
                                            <AnimeTitleCard anime={animeTitle} />
                                        </Grid.Col>
                                    )
                                })
                            }
                        </Grid>
                    ))}
                </div>
                {isFetchingNextPage && skeletons}
            </div>
        </>
    )
}