"use client"

import {comments} from "@/api/comments/comments";
import AddComment from "@/components/Comments/AddComment";
import {useInfiniteQuery} from "@tanstack/react-query";
import Comment from "@/components/Comments/Comment";
import {InView} from "react-intersection-observer";
import {Loader} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import React from "react";

interface CommentsGroupProps {
    uuid: string;
    title: string;
    userid: string;
    username: string;
    avatar: string;
    date: string;
    likes: number | null;
    dislikes: number | null;
    message: string;
    isDeleted: boolean | null;
    isEdited: boolean | null;
}

export default function Comments({ titleCode }: { titleCode: string }) {
    const getComments = async ({ pageParam } : { pageParam: number }) => {
        return await comments.get(titleCode, pageParam)
    }

    const {
        data,
        error,
        fetchNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["comments", titleCode],
        queryFn: getComments,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
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
                    return (
                        <Comment key={comment.uuid} comment={comment} />
                    )
                })
            })}
            <span>{isFetchingNextPage ? <Loader /> : 'Больше комментариев нет!'}</span>
        </>
    )

    return (
        <div>
            <AddComment titleCode={titleCode} />
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