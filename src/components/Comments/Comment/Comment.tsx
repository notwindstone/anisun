import {CommentType} from "@/types/CommentType";
import {Avatar, Button, Flex, Group, Stack, Text, UnstyledButton} from "@mantine/core";
import {ChildCommentList} from "@/components/Comments/ChildCommentList/ChildCommentList";
import classes from "./Comment.module.css";
import Link from "next/link";
import {makeDate} from "@/utils/makeDate";
import {makeWordEnding} from "@/utils/makeWordEnding";
import {useDisclosure} from "@mantine/hooks";
import {VoteComment} from "@/components/Comments/VoteComment/VoteComment";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {MutatedDataType} from "@/types/MutatedDataType";
import {useUser} from "@clerk/nextjs";
import {AddComment} from "@/components/Comments/AddComment/AddComment";

export function Comment({ comment, isChild }: { comment: CommentType, isChild?: boolean }) {
    const { isLoaded, isSignedIn, user } = useUser();
    const [isExpandedChild, { toggle: toggleChild }] = useDisclosure(false)
    const [isToggledReply, { toggle: toggleReply }] = useDisclosure(false)

    const isUser = isLoaded && isSignedIn

    function handleNewVotes({ newLikes, newDislikes }: { newLikes?: unknown[], newDislikes?: unknown[] }) {
        const mutationQueryKey = isChild ? comment.parentuuid : comment.title

        mutation.mutate({
            uuid: comment.uuid,
            likes: newLikes,
            dislikes: newDislikes,
            mutationQueryKey: mutationQueryKey,
            isChild: isChild,
        })
    }

    function handleNewComment(newComment: CommentType) {
        console.log(newComment)
        //mutation.mutate(newComment)
    }

    const children = comment.children ? comment.children[0].count : 0

    const hasOneChild = children === 1
    const hasMoreThanOneChild = children > 1

    const queryClient = useQueryClient()

    const mutation = useMutation({
        // @ts-ignore
        mutationFn: (
            {
                uuid,
                likes,
                dislikes,
                mutationQueryKey,
                isChild,
            }: {
                uuid: string
                likes: unknown[] | undefined,
                dislikes: unknown[] | undefined,
                mutationQueryKey: string | null,
                isChild?: boolean,
            }
        ) => {
            const mutatedData: MutatedDataType | { data: CommentType[] | null | undefined } | undefined = queryClient.getQueryData(['comments', mutationQueryKey])

            if (!mutatedData) {
                return
            }

            if (isChild) {
                // @ts-ignore
                const mutatedCommentsData = mutatedData.data

                if (!mutatedCommentsData) {
                    return
                }

                const mutatingComment = mutatedCommentsData.find(
                    (currentComment: CommentType) => currentComment.uuid === uuid
                )

                if (!mutatingComment) {
                    return
                }

                if (likes) {
                    mutatingComment.likes = likes
                }

                if (dislikes) {
                    mutatingComment.dislikes = dislikes
                }

                return { data: mutatedData, mutationQueryKey: mutationQueryKey }
            }

            // @ts-ignore
            for (const pages of mutatedData.pages) {
                const mutatingComment = pages.data.find(
                    (currentComment: CommentType) => currentComment.uuid === uuid
                )

                if (!mutatingComment) {
                    continue
                }

                if (likes) {
                    mutatingComment.likes = likes
                }

                if (dislikes) {
                    mutatingComment.dislikes = dislikes
                }
            }

            return { data: mutatedData, mutationQueryKey: mutationQueryKey }
        },

        onSuccess: (newData: { data: MutatedDataType, mutationQueryKey: string }) => {
            queryClient.setQueryData(['comments', newData.mutationQueryKey],
                (oldData: MutatedDataType) =>
                    oldData
                        ? newData.data
                        : oldData
            )
        }
    })

    return (
        <div>
            <Flex className={classes.root}>
                <Link href={`/account/${comment.userid}`}>
                    <Avatar src={comment.avatar} size={64}/>
                </Link>
                <Stack>
                    <Group>
                        <Link href={`/account/${comment.userid}`}>
                            <Text>{comment.username}</Text>
                        </Link>
                        <Text>{makeDate(comment.createdAt)}</Text>
                    </Group>
                    <Group>
                        <Text>{comment.message}</Text>
                    </Group>
                    <Group>
                        <VoteComment
                            uuid={comment.uuid}
                            likes={comment.likes}
                            dislikes={comment.dislikes}
                            sendVotes={handleNewVotes}
                            user={user}
                            isUser={isUser}
                        />
                        <Button onClick={toggleReply}>Ответить</Button>
                    </Group>
                </Stack>
            </Flex>
            {
                isToggledReply && <AddComment title={comment.title} parentUUID={comment.uuid} sendComment={handleNewComment} />
            }
            {
                /*
                 * Если к комментарию только 1 ответ, то он автоматически загрузится
                 * Если к комментарию больше 1 ответа, то будет показана кнопка "Раскрыть {число} ответов"
                 * В ином случае (т.е. ответов нет) ничего не выведется
                 * */
                hasOneChild
                    ? (
                        <ChildCommentList uuid={comment.uuid} childComments={children} />
                    )
                    : hasMoreThanOneChild
                        ? (
                            <>
                                <UnstyledButton
                                    onClick={toggleChild}
                                >
                                    {
                                        isExpandedChild ? "Свернуть" : `Раскрыть ${children} ${makeWordEnding({ replies: children, wordTypes: ['ответ', 'ответа', 'ответов'] })}`
                                    }
                                </UnstyledButton>
                                {isExpandedChild && (<ChildCommentList uuid={comment.uuid} childComments={children} />)}
                            </>
                        )
                        : null
            }
        </div>
    )
}