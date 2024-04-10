"use client"

import {comments} from "@/lib/comments/comments";
import {useInfiniteQuery} from "@tanstack/react-query";
import {Loader} from "@mantine/core";
import React from "react";
import {CommentType} from "@/types/commentType";

export default function NewComments({ titleCode }: { titleCode: string }) {
    const getComments = async ({ pageParam } : { pageParam: number }) => {
        return await comments.getNew({title: titleCode, nextCursor: pageParam})
    }

    const {
        data,
        error,
        fetchNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["comments", titleCode],
        // @ts-ignore
        queryFn: getComments,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage ? lastPage.nextCursor : [],
        refetchInterval: 60000,
    })

    const commentsSection = status === 'pending' ? (
        <Loader size="1rem" />
    ) : status === 'error' ? (
        <p>Error: {error.message}</p>
    ) : (
        <>
            {
                data?.pages.map((group) => {
                    const commentsGroup: CommentType[] | null = group.data ?? []

                    return commentsGroup.map((comment) => {
console.log(comment.children)
                    })
                })
            }
        </>
    )

    return (
        <div>
            {commentsSection}
        </div>
    )
}