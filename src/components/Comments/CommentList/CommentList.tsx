"use client"

import {useInfiniteQuery} from "@tanstack/react-query";
import {retrieveComments} from "@/utils/comments/retrieveComments";

export default function CommentList({ titleCode }: { titleCode: string }) {
    const {
        data,
        error,
        fetchNextPage,
        isFetchingNextPage,
        status
    // @ts-ignore
    } = useInfiniteQuery({
        queryKey: ["comments", titleCode],
        queryFn: retrieveComments,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage ? lastPage.nextCursor : [],
        refetchInterval: 60000,
    })

    const commentSection = status === 'pending' ? (
        <>Loading...</>
    ) : status === 'error' ? (
        <>Error: {error.message}</>
    ) : (
        <></>
    )
}