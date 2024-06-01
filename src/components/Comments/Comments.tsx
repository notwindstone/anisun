import {useInfiniteQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {comments} from "@/lib/comments/comments";
import {CommentType} from "@/types/Comments/Comment.type";
import {Comment} from "@/components/Comments/Comment/Comment";
import {AddComment} from "@/components/Comments/AddComment/AddComment";
import {MutatedDataType} from "@/types/Comments/MutatedData.type";
import CommentSkeleton from "@/components/Comments/CommentSkeleton/CommentSkeleton";
import {Box, Center, rem, Skeleton, Title} from "@mantine/core";
import {useEffect, useState} from "react";
import {makeWordEnding} from "@/utils/Misc/makeWordEnding";
import classes from './Comments.module.css';
import {useInViewport} from "@mantine/hooks";

export default function Comments({ titleCode }: { titleCode: string }) {
    const { ref, inViewport } = useInViewport();
    const [delayed, setDelayed] = useState(false);
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
    });

    async function retrieveComments({ pageParam }: { pageParam: number }) {
        return await comments.getParent({ title: titleCode, nextCursor: pageParam });
    }

    function handleNewComment(newComment: CommentType) {
        mutation.mutate(newComment);
    }

    const queryClient = useQueryClient();

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
            const mutatedData: MutatedDataType | undefined = queryClient.getQueryData(['comments', title]);

            if (!mutatedData) {
                return;
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
            });

            return mutatedData;
        },

        onSettled: () => queryClient.invalidateQueries({ queryKey: ['comments', titleCode] }),

        onSuccess: (newData) => {
            queryClient.cancelQueries({ queryKey: ['comments', titleCode] }).then();

            queryClient.setQueryData(['comments', titleCode],
                (oldData: MutatedDataType) =>
                    oldData
                        ? newData
                        : oldData
            );
        }
    });

    const commentSection = status === 'pending' ? (
        <CommentSkeleton />
    ) : status === 'error' ? (
        <>Error: {error?.message}</>
    ) : (
        <>
            {
                data.pages.map((group) => {
                    if (!group) {
                        return;
                    }

                    const commentGroup: CommentType[] | null = group.data ?? [];

                    return commentGroup.map((comment) => {
                        return (
                            <Comment key={comment.uuid} comment={comment} level={1} />
                        );
                    });
                })
            }
        </>
    );

    // Каким-то образом _data._pages[0] может оказаться undefined
    let hasData;
    let hasPages;
    let hasPage;
    let hasCommentCount;

    if (data) hasData = true;
    if (hasData && data?.pages) hasPages = true;
    if (hasPages && data?.pages?.[0]) hasPage = true;
    if (hasPage && data?.pages?.[0].total?.[0].count) hasCommentCount = true;

    const hasAllData = hasData && hasPages && hasPage && hasCommentCount;

    const totalCount =
        hasAllData
            ? data?.pages?.[0].total?.[0].count ?? 0
            : 0;

    useEffect(() => {
        if (
            status === 'pending'
            || isFetchingNextPage
            || delayed
            || !inViewport
        ) {
            return;
        }

        setDelayed(true);

        fetchNextPage().then();

        setTimeout(() => {
            setDelayed(false);
        }, 500);
    // eslint-disable-next-line
    }, [inViewport]);

    return (
        <Box className={classes.wrapper}>
            {   status === 'pending'
                ? (
                    <Skeleton w={144} h={32}></Skeleton>
                ) : (
                    <Title
                        p={rem(16)}
                        order={3}
                        c="var(--animeth-text-contrast-color)"
                    >
                        {totalCount} {makeWordEnding({ replies: totalCount, wordTypes: ['комментарий', 'комментария', 'комментариев'] })}
                    </Title>
                )
            }
            <AddComment title={titleCode} parentUUID={null} sendComment={handleNewComment} />
            {commentSection}
            {
                isFetchingNextPage
                    ? <CommentSkeleton />
                    : <Center ref={ref} className={classes.center} />
            }
        </Box>
    );
}