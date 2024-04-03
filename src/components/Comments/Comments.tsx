"use client"

import {comments} from "@/api/comments/comments";
import {Button, Loader, Skeleton} from "@mantine/core";
import AddComment from "@/components/Comments/AddComment";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import Comment from "@/components/Comments/Comment";
import {useState} from "react";

export default function Comments() {
    const [limit, setLimit] = useState(8)

    const getComments = async ({ pageParam } : { pageParam: number }) => {
        return await comments.get("ookami-to-koushinryou-merchant-meets-the-wise-wolf", pageParam)
    }

    const {
        isPending,
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["comments"],
        queryFn: getComments,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.length === 0) {
                return undefined
            }
            return lastPageParam + 1
        },
        getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
            if (firstPageParam <= 1) {
                return undefined
            }
            return firstPageParam - 1
        },
        refetchInterval: 5000
    })

    const commentsData = data?.pages ?? []

    let commentsSection = commentsData.map((comment) => {
        return (
            <Comment key={comment.uuid} comment={comment} />
        )
    })

    return (
        <>
            <AddComment />
            {isPending && <Loader color="blue" />}
            {commentsSection}
            <Button onClick={() => setLimit(limit + 8)}>Load</Button>

        </>
    )
}