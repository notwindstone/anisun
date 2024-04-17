"use client"

import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {comments} from "@/lib/comments/comments";
import {CommentType} from "@/types/CommentType";
import {InView} from "react-intersection-observer";
import {Comment} from "@/components/Comments/Comment/Comment";
import {AddComment} from "@/components/Comments/AddComment/AddComment";
import {MutatedDataType} from "@/types/MutatedDataType";
import CommentSkeleton from "@/components/Skeletons/CommentSkeleton/CommentSkeleton";
import {useUser} from "@clerk/nextjs";
import {Text} from "@mantine/core";
import {useState} from "react";

export default function CommentList({ titleCode }: { titleCode: string }) {
    const { isLoaded, isSignedIn, user } = useUser();
    const [delayed, setDelayed] = useState(false)
    const {
        data,
        error,
        fetchNextPage,
        isFetchingNextPage,
        status,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["comments", titleCode],
        queryFn: retrieveComments,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage ? lastPage.nextCursor : 16,
        refetchInterval: 60000,
    })

    const isUser = isLoaded && isSignedIn

    async function retrieveComments({ pageParam }: { pageParam: number }) {
        const loggedData = await comments.getParent({ title: titleCode, nextCursor: pageParam })

        console.log(loggedData, pageParam)

        return loggedData
    }

    function handleNewComment(newComment: CommentType) {
        mutation.mutate(newComment)
    }

    const queryClient = useQueryClient()

    const mutation = useMutation({
        // @ts-ignore
        mutationFn: (
            {
                uuid,
                parentuuid,
                title,
                userid,
                username,
                avatar,
                createdAt,
                likes,
                dislikes,
                message,
                isDeleted,
                isEdited,
                children,
            }: CommentType
        ) => {
            const mutatedData: MutatedDataType | undefined = queryClient.getQueryData(['comments', title])

            if (!mutatedData) {
                return
            }

            mutatedData.pages[0].data.unshift({
                uuid,
                parentuuid,
                title,
                userid,
                username,
                avatar,
                createdAt,
                likes,
                dislikes,
                message,
                isDeleted,
                isEdited,
                children,
            })

            return mutatedData
        },

        onSettled: () => queryClient.invalidateQueries({ queryKey: ['comments', titleCode] }),

        onSuccess: (newData) => {
            queryClient.cancelQueries({ queryKey: ['comments', titleCode] }).then()

            queryClient.setQueryData(['comments', titleCode],
                (oldData: MutatedDataType) =>
                    oldData
                        ? newData
                        : oldData
            )
        }
    })

    const commentSection = status === 'pending' ? (
        <CommentSkeleton />
    ) : status === 'error' ? (
        <>Error: {error.message}</>
    ) : (
        <>
            {
                data.pages.map((group) => {
                    if (!group) {
                        return
                    }

                    const commentGroup: CommentType[] | null = group.data ?? []

                    return commentGroup.map((comment) => {
                        return (
                            <Comment key={comment.uuid} comment={comment} user={user} isUser={isUser} />
                        )
                    })
                })
            }
        </>
    )

    return (
        <div>
            <AddComment title={titleCode} parentUUID={null} sendComment={handleNewComment} user={user} isUser={isUser} />
            {commentSection}
            {
                isFetchingNextPage && <CommentSkeleton />
            }
            <InView
                onChange={(inView) => {
                    if (!inView) {
                        return
                    }

                    if (delayed) {
                        return
                    }

                    setDelayed(true)

                    fetchNextPage().then()

                    return setTimeout(() => {
                        setDelayed(false)
                    }, 500)
                }}
            >
                <hr></hr>
            </InView>
            {
                !isFetchingNextPage
                    && status !== 'pending'
                    && (
                        <Text>Похоже, что больше комментариев нет</Text>
                    )
            }
        </div>
    )
}