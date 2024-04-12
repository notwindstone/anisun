"use client"

import {useInfiniteQuery} from "@tanstack/react-query";
import {comments} from "@/lib/comments/comments";
import {Text} from "@mantine/core";

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

    async function retrieveComments({ nextCursor }: { nextCursor: number }) {
        const data = await comments.get({ title: titleCode, nextCursor: nextCursor })
        console.log(data, titleCode, nextCursor)
        return data
    }

    const commentSection = status === 'pending' ? (
        <>Loading...</>
    ) : status === 'error' ? (
        <>Error: {error.message}</>
    ) : (
        <div>
            <>1234</>
            <Text>{data.pages[0].data[2].children[0].count}</Text>
        </div>
    )

    return (
        <>
            {commentSection}
        </>
    )
}