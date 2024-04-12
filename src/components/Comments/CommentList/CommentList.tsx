"use client"

import {useInfiniteQuery} from "@tanstack/react-query";
import {comments} from "@/lib/comments/comments";
import {CommentType} from "@/types/CommentType";
import {InView} from "react-intersection-observer";
import {Comment} from "@/components/Comments/Comment/Comment";

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
        return await comments.get({ title: titleCode, nextCursor: nextCursor })
    }

    const commentSection = status === 'pending' ? (
        <>Loading...</>
    ) : status === 'error' ? (
        <>Error: {error.message}</>
    ) : (
        data.pages.map((group) => {
            const commentGroup: CommentType[] | null = group.data ?? []

            return commentGroup.map((comment) => {
                return (
                    <Comment key={comment.uuid} comment={comment} />
                )
            })
        })
    )

    return (
        <div>
            {commentSection}
            <InView onChange={(inView) => {
                if (!inView) {
                    return
                }

                const dataPages = data?.pages ?? []
                const lastDataPage = dataPages[dataPages.length - 1] ?? []
                const hasNextPageData = lastDataPage.data

                if (!hasNextPageData) {
                    return
                }

                fetchNextPage().then()
            }}>
                <hr></hr>
            </InView>
        </div>
    )
}