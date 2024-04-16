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
import {useState} from "react";
import {Select} from "@mantine/core";

export default function CommentList({ titleCode }: { titleCode: string }) {
    const [filters, setFilters] = useState('FROM_NEWEST')
    const [delayed, setDelayed] = useState(false)
    const {
        data,
        error,
        fetchNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["comments", titleCode, filters],
        // @ts-ignore
        queryFn: retrieveComments,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage ? lastPage.nextCursor : 0,
        refetchInterval: 60000,
    })
    const { isLoaded, isSignedIn, user } = useUser();

    const isUser = isLoaded && isSignedIn

    async function retrieveComments({ pageParam }: { pageParam: number }) {
        return await comments.getParent({ title: titleCode, nextCursor: pageParam, filters: filters })
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
            const mutatedData: MutatedDataType | undefined = queryClient.getQueryData(['comments', title, filters])

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

    const dataPages = data?.pages ?? []
    const lastDataPage = dataPages[dataPages.length - 1] ?? []
    const hasNextPageData = lastDataPage.data

    const commentSection = status === 'pending' ? (
        <CommentSkeleton />
    ) : status === 'error' ? (
        <>Error: {error.message}</>
    ) : (
        <>
            {
                data.pages.map((group) => {
                    group = group ?? []

                    const commentGroup: CommentType[] | null = group.data ?? []

                    return commentGroup.map((comment) => {
                        return (
                            <Comment key={comment.uuid} comment={comment} user={user} isUser={isUser} />
                        )
                    })
                })
            }
            {
                hasNextPageData && isFetchingNextPage && <CommentSkeleton />
            }
        </>
    )

    return (
        <div>
            <Select
                placeholder="Сортировка комментариев"
                data={[
                    { value: 'FROM_NEWEST', label: 'От самого нового' },
                    { value: 'FROM_OLDEST', label: 'От самого старого' },
                    { value: 'MOST_LIKED', label: 'От самого залайканного' },
                ]}
                onOptionSubmit={(option) => setFilters(option)}
            />
            <AddComment title={titleCode} parentUUID={null} sendComment={handleNewComment} user={user} isUser={isUser} />
            {commentSection}
            {
                !hasNextPageData && !isFetchingNextPage && status !== 'pending' && <>Похоже, что больше комментариев нет</>
            }
            <InView
                onChange={(inView) => {
                    if (!inView || delayed) {
                        return
                    }

                    setDelayed(true)

                    fetchNextPage().then()

                    setTimeout(() => {
                        setDelayed(false)
                    }, 1000)
                }}
            >
                <hr></hr>
            </InView>
        </div>
    )
}