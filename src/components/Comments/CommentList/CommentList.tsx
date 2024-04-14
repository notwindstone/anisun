"use client"

import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {comments} from "@/lib/comments/comments";
import {CommentType} from "@/types/CommentType";
import {InView} from "react-intersection-observer";
import {Comment} from "@/components/Comments/Comment/Comment";
import {Button, Loader, Skeleton} from "@mantine/core";
import {AddComment} from "@/components/Comments/AddComment/AddComment";
import {MutatedDataType} from "@/types/MutatedDataType";

export default function CommentList({ titleCode }: { titleCode: string }) {
    const {
        data,
        error,
        fetchNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ["comments", titleCode],
        // @ts-ignore
        queryFn: retrieveComments,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage ? lastPage.nextCursor : [],
        refetchInterval: 60000,
    })

    async function retrieveComments({ pageParam }: { pageParam: number }) {
        return await comments.getParent({ title: titleCode, nextCursor: pageParam })
    }


    /* TODO */
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
            }: {
                uuid: string,
                parentuuid: string | null,
                title: string,
                userid: string,
                username: string,
                avatar: string,
                createdAt: string,
                likes: string[],
                dislikes: string[],
                message: string,
                isDeleted: boolean,
                isEdited: boolean,
                children: { count: number }[],
            }
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

            mutatedData.pages[0].data[1].message = "Fucking test"

            return mutatedData
        },

        onSuccess: (newData) => {
            queryClient.setQueryData(['comments', titleCode],
                (oldData: MutatedDataType) =>
                    oldData
                        ? newData
                        : oldData
            )
        }
    })
    function handleSub() {
        mutation.mutate({
            uuid: 'uuid',
            parentuuid: null,
            title: titleCode,
            userid: 'userId',
            username: 'username',
            avatar: 'avatar',
            createdAt: 'createdAt',
            likes: [],
            dislikes: [],
            message: 'message',
            isDeleted: false,
            isEdited: false,
            children: [{ count: 2 }],
        })
    }



    const commentSection = status === 'pending' ? (
        <Skeleton w="100%" h={128} />
    ) : status === 'error' ? (
        <>Error: {error.message}</>
    ) : (
        <>
            {
                data.pages.map((group) => {
                    const commentGroup: CommentType[] | null = group.data ?? []

                    return commentGroup.map((comment) => {
                        return (
                            <Comment key={comment.uuid} comment={comment}/>
                        )
                    })
                })
            }
            <span>{isFetchingNextPage ? <Loader /> : 'Больше комментариев нет!'}</span>
        </>
    )

    return (
        <div>
            <Button onClick={handleSub}>Click</Button>
            <AddComment title={titleCode} parentUUID={null} />
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