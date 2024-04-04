"use client"

import {comments} from "@/api/comments/comments";
import AddComment from "@/components/Comments/AddComment";
import {useInfiniteQuery} from "@tanstack/react-query";
import Comment from "@/components/Comments/Comment";
import {InView} from "react-intersection-observer";
import {Loader} from "@mantine/core";
import React from "react";

interface CommentsGroupProps {
    uuid: string;
    parentuuid: string | null;
    title: string;
    userid: string;
    username: string;
    avatar: string;
    createdAt: string;
    likes: unknown[] | null;
    dislikes: unknown[] | null;
    message: string;
    isDeleted: boolean;
    isEdited: boolean;
}

export default function Comments({ titleCode }: { titleCode: string }) {
    const getComments = async ({ pageParam } : { pageParam: number }) => {
        return await comments.get({title: titleCode, nextCursor: pageParam})
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
        refetchInterval: 5000,
    })

    const commentsSection = status === 'pending' ? (
        <p>Loading...</p>
    ) : status === 'error' ? (
        <p>Error: {error.message}</p>
    ) : (
        <>
            {data.pages.map((group) => {
                const commentsGroup: CommentsGroupProps[] | null = group.data

                if (!commentsGroup) {
                    return null
                }

                return commentsGroup.map((comment) => {
                    const childComments = commentsGroup.filter((currentComment) => currentComment.parentuuid === comment.uuid)

                    const childCommentsComponent = childComments.map((childComment) => {
                            return (
                                <Comment key={childComment.uuid} comment={childComment}/>
                            )
                        })

                    return (
                        <div key={comment.uuid}>
                            {
                                // Не нужно повторно показывать ответы на комментарии
                                comment.parentuuid
                                    ? (
                                        <></>
                                    )
                                    : (
                                        <>
                                            <Comment comment={comment}/>
                                            {childCommentsComponent}
                                            <hr/>
                                        </>
                                    )
                            }
                        </div>
                    )
                })
            })}
            <span>{isFetchingNextPage ? <Loader /> : 'Больше комментариев нет!'}</span>
        </>
    )

    return (
        <div>
            <AddComment titleCode={titleCode} parentUUID={null} />
            {commentsSection}
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