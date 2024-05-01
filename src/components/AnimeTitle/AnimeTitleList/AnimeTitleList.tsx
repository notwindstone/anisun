"use client"

import {useInfiniteQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import {InView} from "react-intersection-observer";
import {Divider, Grid, rem} from "@mantine/core";
import AnimeTitleCard from "@/components/AnimeTitle/AnimeTitleCard/AnimeTitleCard";
import AnimeVideoSkeleton from "@/components/Skeletons/AnimeVideoSkeleton/AnimeVideoSkeleton";
import classes from './AnimeTitleList.module.css';

export default function AnimeTitleList() {
    const shikimori = client()
    const {
        data,
        status,
        fetchNextPage,
        isFetchingNextPage,
        error,
    } = useInfiniteQuery({
        queryKey: ['animeTitlesList'],
        queryFn: ({ pageParam }) => getAnimeList(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.nextCursor,
    })

    async function getAnimeList(pageParam: number) {
        const animeList = (await shikimori.animes.list({
            limit: 16,
            page: pageParam
        })).animes

        return { animeList: animeList, nextCursor: pageParam + 1 }
    }

    const skeletons = Array.from({ length: 16 }).map((_skeleton, index) => {
        return (
            <Grid.Col span={{ base: 12, xs: 6, sm: 4, lg: 3 }} key={index}>
                <AnimeVideoSkeleton key={index} />
            </Grid.Col>
        )
    })

    const animeTitleListSection = status === 'pending' ? (
        <>{skeletons}</>
    ) : status === 'error' ? (
        <>Error: {error.message}</>
    ) : (
        <>
            {
                data?.pages.map((page) => {
                    return page.animeList.map((anime) => {
                        return (
                            <Grid.Col span={{ base: 12, xs: 6, sm: 4, lg: 3 }} key={anime.id}>
                                <AnimeTitleCard anime={anime} />
                            </Grid.Col>
                        )
                    })
                })
            }

        </>
    )

    return (
        <>
            <Grid p={rem(32)}>
                {animeTitleListSection}
                {
                    isFetchingNextPage && skeletons
                }
            </Grid>
            <InView
                onChange={(inView) => {
                    if (!inView) {
                        return
                    }

                    if (isFetchingNextPage) {
                        return
                    }

                    fetchNextPage().then()
                }}
            >
                <Divider className={classes.divider} h={8} />
            </InView>
        </>
    )
}