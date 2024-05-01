"use client"

import {useInfiniteQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import {Divider, Grid, rem, Title} from "@mantine/core";
import AnimeTitleCard from "@/components/AnimeTitle/AnimeTitleCard/AnimeTitleCard";
import AnimeVideoSkeleton from "@/components/Skeletons/AnimeVideoSkeleton/AnimeVideoSkeleton";
import {useVirtualizer, useWindowVirtualizer} from '@tanstack/react-virtual';
import React, {useEffect} from "react";
import {InView} from "react-intersection-observer";
import classes from './AnimeTitleList.module.css'

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
        estimateSize: () => 2000,
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
                            p={rem(32)}
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
                                        <Grid.Col key={animeTitle.id} span={{ base: 12, xs: 6, sm: 4, lg: 3 }}>
                                            <AnimeTitleCard anime={animeTitle} />
                                        </Grid.Col>
                                    )
                                })
                            }
                        </Grid>
                    ))}
                </div>
                <InView
                    className={classes.intersection}
                    onChange={(inView) => {
                        if (!inView) {
                            return
                        }

                        console.log('fetching...')

                        if (isFetchingNextPage) {
                            return
                        }

                        fetchNextPage().then()
                    }}
                >
                    <Divider h={8} />
                </InView>
            </div>
        </>
    )
}