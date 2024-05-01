import {useInfiniteQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";

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
        getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
            lastPage.nextCursor,
    })

    async function getAnimeList(pageParam: number) {
        const animeList = (await shikimori.animes.list({
            limit: 16,
        })).animes

        return { animeList: animeList, nextCursor: 2 }
    }

    return (
        <>
        </>
    )
}