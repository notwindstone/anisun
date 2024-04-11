"use client"

import {comments} from "@/lib/comments/comments";
import {useInfiniteQuery} from "@tanstack/react-query";
import {Loader, UnstyledButton} from "@mantine/core";
import React from "react";
import {CommentType} from "@/types/commentType";
import Comment from "@/components/Comments/Comment";

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
                        if (!comment.children || comment.children[0].count < 1) {
                            return (
                                <div key={comment.uuid}>
                                    <Comment comment={comment}></Comment>
                                </div>
                            )
                        }

                        const notFetched = 'NOT_FETCHED'
                        const expanded = 'EXPANDED'
                        const notExpanded = 'NOT_EXPANDED'

                        let currentState = notFetched

                        let childrenComments

                        switch (currentState) {
                            case notFetched:
                                childrenComments = (
                                    <UnstyledButton>
                                        Раскрыть {comment.children[0].count} комментариев
                                    </UnstyledButton>
                                )
                                break
                            case expanded:
                                childrenComments = (
                                    <></>
                                )
                                break
                            case notExpanded:
                                childrenComments = (
                                    <></>
                                )
                                break
                            default:
                                childrenComments = (
                                    <></>
                                )
                                break
                        }

                        return (
                            <div key={comment.uuid}>
                                <Comment comment={comment}></Comment>
                                {childrenComments}
                            </div>
                        )
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