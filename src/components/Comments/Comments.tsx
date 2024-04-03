"use client"

import {comments} from "@/api/comments/comments";
import AddComment from "@/components/Comments/AddComment";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import Comment from "@/components/Comments/Comment";
import {useState} from "react";

export default function Comments() {
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
        getNextPageParam: (lastPage, page) => lastPage.nextCursor,
        refetchInterval: 5000,
    })

    // let commentsSection = commentsData.map((comment) => {
    //    return (
    //        <Comment key={comment.uuid} comment={comment} />
    //    )
    // })

    const commentsSection = status === 'pending' ? (
        <p>Loading...</p>
    ) : status === 'error' ? (
        <p>Error: {error.message}</p>
    ) : (
        <>
            {data.pages.map((group, i) => (
                group.data.map((comment) => {
                    return (
                        <Comment key={comment.uuid} comment={comment} />
                    )
                })
            ))}
            <div>
                <button
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                >
                    {isFetchingNextPage
                        ? 'Loading more...'
                        : hasNextPage
                            ? 'Load More'
                            : 'Nothing more to load'}
                </button>
            </div>
            <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </>
    )

    return (
        <>
            <AddComment />
            {commentsSection}
        </>
    )
}