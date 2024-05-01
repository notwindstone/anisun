"use client"

import {useInfiniteQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import {InView} from "react-intersection-observer";
import {Divider} from "@mantine/core";
import AnimeTitleCard from "@/components/AnimeTitle/AnimeTitleCard/AnimeTitleCard";

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
        getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
            lastPage.nextCursor,
    })

    async function getAnimeList(pageParam: number) {
        const animeList = (await shikimori.animes.list({
            limit: 16,
            page: pageParam
        })).animes

        return { animeList: animeList, nextCursor: pageParam + 1 }
    }

    return status === 'pending' ? (
        <>Loading</>
    ) : status === 'error' ? (
        <>Error: {error.message}</>
    ) : (
        <>
            {
                data?.pages.map((page) => {
                    return page.animeList.map((anime) => {
                        return (
                            <AnimeTitleCard key={anime.id} anime={anime} />
                        )
                    })
                })
            }
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
                <Divider h={2} />
            </InView>
        </>
    )
}