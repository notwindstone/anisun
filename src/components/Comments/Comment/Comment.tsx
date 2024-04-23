import {CommentType} from "@/types/CommentType";
import {ActionIcon, Avatar, Button, Flex, Group, Stack, Text, Textarea, UnstyledButton} from "@mantine/core";
import {ChildCommentList} from "@/components/Comments/ChildCommentList/ChildCommentList";
import classes from "./Comment.module.css";
import Link from "next/link";
import {makeDate} from "@/utils/makeDate";
import {makeWordEnding} from "@/utils/makeWordEnding";
import {useDisclosure} from "@mantine/hooks";
import {VoteComment} from "@/components/Comments/VoteComment/VoteComment";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {MutatedDataType} from "@/types/MutatedDataType";
import {AddComment} from "@/components/Comments/AddComment/AddComment";
import {DeleteComment} from "@/components/Comments/DeleteComment/DeleteComment";
import {IconCheck} from "@tabler/icons-react";
import {useRef, useState} from "react";
import {EditComment} from "@/components/Comments/EditComment/EditComment";
import {notify} from "@/utils/notify/notify";
import {comments} from "@/lib/comments/comments";
import {MutationCommentType, MutationInputType} from "@/types/MutationInputType";

export function Comment({ comment, isChild }: { comment: CommentType, isChild?: boolean }) {
    const [editDelayed, setEditDelayed] = useState(false)
    const [isExpandedChild, { toggle: toggleChild }] = useDisclosure(false)
    const [isToggledReply, { toggle: toggleReply }] = useDisclosure(false)
    const [isEditing, setIsEditing] = useState(false)
    const ref = useRef<HTMLTextAreaElement>(null);

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
        const mutationQueryKey = newComment.parentuuid

        // @ts-ignore
        mutation.mutate({ mutationQueryKey, newComment: newComment })
    }

    function handleDelete(isDeleted: boolean) {
        const mutationQueryKey = isChild ? comment.parentuuid : comment.title

        mutation.mutate({
            uuid: comment.uuid,
            mutationQueryKey: mutationQueryKey,
            isDeleted: isDeleted,
            isChild: isChild,
        })
    }

    function handleStateEdit(isEditingState: boolean) {
        const isEditingSynced =
            isEditingState === isEditing ? !isEditingState : isEditingState
        setIsEditing(isEditingSynced)
    }

    async function handleMessageEdit({ uuid, message }: { uuid: string, message?: string }) {
        const mutationQueryKey = isChild ? comment.parentuuid : comment.title

        message = message ?? ''

        if (!handleChecks(message)) {
            return
        }

        setEditDelayed(true)

        mutation.mutate({
            uuid: uuid,
            isEdited: true,
            message: message,
            mutationQueryKey: mutationQueryKey,
            isChild: isChild,
        })

        setIsEditing(false)

        await comments.edit(uuid, message)

        return setEditDelayed(false)
    }

    function handleChecks(message: string) {
        if (editDelayed) {
            notify.delay()

            return false
        }

        if (message.length < 2 || message.length > 2000) {
            notify.incorrectInput()

            return false
        }

        return true
    }

    function handleMutation({ mutatingComment, message, isEdited, isDeleted, likes, dislikes }: MutationCommentType) {
        if (isEdited) {
            mutatingComment.message = message ?? ''
            mutatingComment.isEdited = isEdited
        }

        if (isDeleted !== undefined) {
            mutatingComment.isDeleted = isDeleted
        }

        if (likes) {
            mutatingComment.likes = likes
        }

        if (dislikes) {
            mutatingComment.dislikes = dislikes
        }

        return mutatingComment
    }

    const children = comment.children ? comment.children[0].count : 0

    let hasOneChild = children === 1
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
                newComment,
                isDeleted,
                isEdited,
                message,
            }: MutationInputType
        ) => {
            const mutatedData: MutatedDataType | { data: CommentType[] | null | undefined } | undefined = queryClient.getQueryData(['comments', mutationQueryKey])

            if (newComment) {
                if (!mutatedData) {
                    comment.children = [{ count: 1 }]

                    return { data: { data: [newComment] }, mutationQueryKey: mutationQueryKey }
                }

                // @ts-ignore
                mutatedData.data.unshift(newComment)

                return { data: mutatedData, mutationQueryKey: mutationQueryKey }
            }

            if (!mutatedData) {
                return
            }

            if (isChild) {
                // @ts-ignore
                const mutatedCommentsData = mutatedData.data

                if (!mutatedCommentsData) {
                    return
                }

                let mutatingComment = mutatedCommentsData.find(
                    (currentComment: CommentType) => currentComment.uuid === uuid
                )

                if (!mutatingComment) {
                    return
                }

                mutatingComment = handleMutation({ mutatingComment, message, isEdited, isDeleted, likes, dislikes })

                return { data: mutatedData, mutationQueryKey: mutationQueryKey }
            }

            // @ts-ignore
            for (const pages of mutatedData.pages) {
                let mutatingComment = pages.data.find(
                    (currentComment: CommentType) => currentComment.uuid === uuid
                )

                if (!mutatingComment) {
                    continue
                }

                mutatingComment = handleMutation({ mutatingComment, message, isEdited, isDeleted, likes, dislikes })
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
                <Avatar
                    src={comment.avatar}
                    alt={comment.username}
                    size={64}
                    component={Link}
                    href={`/account/${comment.userid}`}
                >
                    {comment.username[0]}
                </Avatar>
                <Stack className={classes.stack}>
                    <Group>
                        <Link href={`/account/${comment.userid}`}>
                            <Text>{comment.username}</Text>
                        </Link>
                        <Text>{makeDate(comment.createdAt)}</Text>
                        {
                            comment.isEdited && !comment.isDeleted
                                && <Text className={classes.edited}>(изменено)</Text>
                        }
                        {
                            !comment.isDeleted
                                && <EditComment userid={comment.userid} sendEdit={handleStateEdit} />
                        }
                        <DeleteComment uuid={comment.uuid} userid={comment.userid} isInitiallyDeleted={comment.isDeleted} sendDelete={handleDelete} />
                    </Group>
                    <Group>
                        {
                            comment.isDeleted
                                ? (
                                    <Text className={classes.deleted}>Сообщение было удалено</Text>
                                )
                                : (
                                    isEditing
                                        ? (
                                            <>
                                                <Textarea
                                                    ref={ref}
                                                    defaultValue={comment.message}
                                                    placeholder="Изменить комментарий..."
                                                    autosize
                                                    required
                                                    minRows={2}
                                                />
                                                <ActionIcon variant="light" onClick={() => handleMessageEdit({ uuid: comment.uuid, message: ref.current?.value })}>
                                                    <IconCheck />
                                                </ActionIcon>
                                            </>
                                        )
                                        : (
                                            <Text className={classes.message}>{comment.message}</Text>
                                        )
                                )
                        }
                    </Group>
                    <Group>
                        <VoteComment
                            uuid={comment.uuid}
                            likes={comment.likes}
                            dislikes={comment.dislikes}
                            sendVotes={handleNewVotes}
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
                                    className={classes.collapse}
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