"use client"

import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {comments} from "@/lib/comments/comments";
import {CommentType} from "@/types/CommentType";
import {InView} from "react-intersection-observer";
import {Comment} from "@/components/Comments/Comment/Comment";
import {AddComment} from "@/components/Comments/AddComment/AddComment";
import {MutatedDataType} from "@/types/MutatedDataType";
import CommentSkeleton from "@/components/Skeletons/CommentSkeleton/CommentSkeleton";
import {Container, Skeleton, Space, Text} from "@mantine/core";
import {useState} from "react";
import {makeWordEnding} from "@/utils/makeWordEnding";
import classes from './CommentList.module.css';

export default function CommentList({ titleCode }: { titleCode: string }) {
    const [delayed, setDelayed] = useState(false)
    const {
        data,
        error,
        fetchNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["comments", titleCode],
        queryFn: retrieveComments,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage ? lastPage.nextCursor : 16,
    })

    async function retrieveComments({ pageParam }: { pageParam: number }) {
        return await comments.getParent({ title: titleCode, nextCursor: pageParam })
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
        <>Error: {error?.message}</>
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
                            <Comment key={comment.uuid} comment={comment} />
                        )
                    })
                })
            }
        </>
    )

    // Каким-то образом _data._pages[0] может оказаться undefined
    let hasData
    let hasPages
    let hasPage
    let hasCommentCount

    if (data) hasData = true
    if (hasData && data?.pages) hasPages = true
    if (hasPages && data?.pages?.[0]) hasPage = true
    if (hasPage && data?.pages?.[0].total?.[0].count) hasCommentCount = true

    const hasAllData = hasData && hasPages && hasPage && hasCommentCount

    const totalCount =
        hasAllData
            ? data?.pages?.[0].total?.[0].count ?? 0
            : 0

    return (
        <Container size={800}>
            {   status === 'pending'
                    ? (
                        <Skeleton w={144} h={24}></Skeleton>
                    ) : (
                        <Text>
                            {totalCount} {makeWordEnding({ replies: totalCount, wordTypes: ['комментарий', 'комментария', 'комментариев'] })}
                        </Text>
                    )
            }
            <AddComment title={titleCode} parentUUID={null} sendComment={handleNewComment} />
            {commentSection}
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
                isFetchingNextPage
                    ? <CommentSkeleton />
                    : <div className={classes.commentPlaceholder} />
            }
            {
                totalCount > 0
                    && <AddComment title={titleCode} parentUUID={null} sendComment={handleNewComment} />
            }
            <Space h="xl" />
            {
                !isFetchingNextPage
                    && status !== 'pending'
                    && (
                        <Text>Похоже, что больше комментариев нет</Text>
                    )
            }
        </Container>
    )
}