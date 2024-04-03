"use client"

import {comments} from "@/api/comments/comments";
import AddComment from "@/components/Comments/AddComment";
import {useInfiniteQuery} from "@tanstack/react-query";
import Comment from "@/components/Comments/Comment";
import {InView} from "react-intersection-observer";

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

export default function Comments() {
    const getComments = async ({ pageParam } : { pageParam: number }) => {
        return await comments.get("ookami-to-koushinryou-merchant-meets-the-wise-wolf", pageParam)
    }

    const {
        data,
        error,
        fetchNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["comments"],
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
            <span>{isFetchingNextPage ? 'Fetching...' : null}</span>
        </>
    )

    return (
        <div>
            <AddComment />
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
                <div></div>
            </InView>
        </div>
    )
}