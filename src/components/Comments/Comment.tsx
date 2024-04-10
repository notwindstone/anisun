import {ActionIcon, Avatar, Button, Flex, Group, Stack, Text, Textarea} from "@mantine/core";
import classes from './Comment.module.css'
import Link from "next/link";
import {useRef, useState} from "react";
import AddComment from "@/components/Comments/AddComment";
import {comments} from "@/lib/comments/comments";
import {useUser} from "@clerk/nextjs";
import {notifications} from "@mantine/notifications";
import {
    IconArrowBack,
    IconCaretDownFilled,
    IconCaretUpFilled, IconCheck, IconEdit,
    IconX
} from "@tabler/icons-react";
import {makeDate} from "@/utils/makeDate";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {CommentType} from "@/types/commentType";

interface DataProps {
    pages: {
        data: CommentType[];
    }[]
}

function notifyAboutDelay() {
    notifications.clean()

    return notifications.show({
        title: 'Ошибка',
        message: 'Пожалуйста, подождите немного перед следующим действием',
        autoClose: 3000,
        color: 'yellow',
    })
}

function notifyCriticalError() {
    notifications.clean()

    return notifications.show({
        title: 'Критическая ошибка',
        message: 'Возникла непредвиденная ошибка. Попробуйте обновить страницу',
        autoClose: 3000,
        color: 'red',
    })
}

// TODO: rewrite client-server sync
export default function Comment({ comment }: { comment: CommentType }) {

    const { user } = useUser();

    const [edit, setEdit] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [delayed, setDelayed] = useState(false)

    const ref = useRef<HTMLTextAreaElement>(null);

    const queryClient = useQueryClient()

    const mutation = useMutation({
        // @ts-ignore
        mutationFn: (
                {
                    uuid,
                    branch,
                    likes,
                    dislikes,
                    remove,
                    message,
                }: {
                    uuid: string,
                    branch: string,
                    likes?: unknown[] | null,
                    dislikes?: unknown[] | null,
                    remove?: boolean,
                    message?: string,
                }
            ) => {
            const mutatedData: DataProps | undefined = queryClient.getQueryData(['comments', comment.title])

            if (!mutatedData) {
                return
            }

            for (const pages of mutatedData.pages) {
                const originComment = pages.data.find(
                    (comment: CommentType) => comment.uuid === uuid
                )

                if (!originComment) {
                    const branchComment = pages.data.find(
                        (comment: CommentType) => comment.branch === branch
                    )

                    if (!branchComment?.children) {
                        return
                    }

                    let currentChild = branchComment.children.find((child: CommentType) => child.uuid === uuid)

                    if (!currentChild) {
                        return
                    }

                    if (likes) {
                        currentChild.likes = likes

                    }

                    if (dislikes) {
                        currentChild.dislikes = dislikes
                    }

                    if (remove !== undefined) {
                        currentChild.isDeleted = remove
                    }

                    if (message) {
                        currentChild.message = message
                        currentChild.isEdited = true
                    }

                    return
                }

                if (likes) {
                    originComment.likes = likes
                }

                if (dislikes) {
                    originComment.dislikes = dislikes
                }

                if (remove !== undefined) {
                    originComment.isDeleted = remove
                }

                if (message) {
                    originComment.message = message
                    originComment.isEdited = true
                }
            }

            return mutatedData
        },

        onSuccess: (newData) => {
            queryClient.setQueryData(['comments', comment.title],
                (oldData: DataProps) =>
                    oldData
                        ? newData
                        : oldData
            )
        },
    })

    if (!user) {
        return
    }

    function toggleResponse() {
        setToggle(!toggle)
    }

    function handleVote(voteType: string) {
        if (!user) {
            notifications.clean()

            return notifications.show({
                title: 'Ошибка',
                message: 'Войдите в аккаунт перед тем, как оставить свой голос на комментарий',
                autoClose: 3000,
                color: 'yellow',
            })
        }

        if (delayed) {
            notifications.clean()

            return notifyAboutDelay()
        }

        switch (voteType) {
            case 'like':
                if (comment.dislikes?.includes(user?.id)) {
                    // В данном случае дизлайк убирается, если он поставлен и синхронизированы лайки, и выполняется дальнейший код
                    handleDislike().then()
                }

                return handleLike().then()
            case 'dislike':
                if (comment.likes?.includes(user?.id)) {
                    // В данном случае лайк убирается, если он поставлен и синхронизированы дизлайки, и выполняется дальнейший код
                    handleLike().then()
                }

                return handleDislike().then()
            default:
                return notifyCriticalError
        }
    }

    async function handleLike() {
        setDelayed(true)

        const definedCommentLikes = comment.likes ?? []

        // Уже проверил в handleVote()
        // @ts-ignore
        if (definedCommentLikes.includes(user.id)) {
            const mutatedCommentLikes = definedCommentLikes.filter(function (value) {
                return value !== user?.id
            })

            mutation.mutate({
                uuid: comment.uuid,
                branch: comment.branch,
                likes: mutatedCommentLikes
            })

            // @ts-ignore
            await comments.like(comment.uuid, mutatedCommentLikes)

            return setTimeout(() => {
                setDelayed(false)
            }, 500)
        }

        const mutatedCommentLikes = definedCommentLikes

        // Уже проверил в handleVote()
        // @ts-ignore
        mutatedCommentLikes.push(user?.id)

        mutation.mutate({
            uuid: comment.uuid,
            branch: comment.branch,
            likes: mutatedCommentLikes,
        })

        // @ts-ignore
        await comments.like(comment.uuid, mutatedCommentLikes)

        return setTimeout(() => {
            setDelayed(false)
        }, 500)
    }

    async function handleDislike() {
        setDelayed(true)

        const definedCommentDislikes = comment.dislikes ?? []

        // Уже проверил в handleVote()
        // @ts-ignore
        if (definedCommentDislikes.includes(user.id)) {
            const mutatedCommentDislikes = definedCommentDislikes.filter(function (value) {
                return value !== user?.id
            })

            mutation.mutate({
                uuid: comment.uuid,
                branch: comment.branch,
                dislikes: mutatedCommentDislikes
            })

            // @ts-ignore
            await comments.dislike(comment.uuid, mutatedCommentDislikes)

            return setTimeout(() => {
                setDelayed(false)
            }, 500)
        }

        const mutatedCommentDislikes = definedCommentDislikes

        // Уже проверил в handleVote()
        // @ts-ignore
        mutatedCommentDislikes.push(user?.id)

        mutation.mutate({
            uuid: comment.uuid,
            branch: comment.branch,
            dislikes: mutatedCommentDislikes,
        })

        // @ts-ignore
        await comments.dislike(comment.uuid, mutatedCommentDislikes)

        return setTimeout(() => {
            setDelayed(false)
        }, 500)
    }

    async function handleRemove(uuid: string, branch: string, toRemove: boolean = true) {
        if (delayed) {
            notifications.clean()

            return notifyAboutDelay()
        }

        setDelayed(true)

        mutation.mutate({
            uuid: uuid,
            branch: branch,
            remove: toRemove
        })

        await comments.remove(uuid, toRemove)

        return setTimeout(() => {
            setDelayed(false)
        }, 500)
    }

    async function handleEdit(uuid: string, branch: string, message?: string) {
        if (delayed) {
            notifications.clean()

            return notifyAboutDelay()
        }

        if (!message || message.length < 2) {
            return notifications.show({
                title: 'Ошибка',
                message: 'В комментарии должно быть от 2 до 2000 символов',
                autoClose: 3000,
                color: 'yellow',
            })
        }

        setDelayed(true)

        mutation.mutate({
            uuid: uuid,
            branch: branch,
            message: message,
        })

        toggleEdit()

        await comments.edit(uuid, message)

        return setTimeout(() => {
            setDelayed(false)
        }, 500)
    }

    function toggleEdit() {
        setEdit(!edit)
    }

    return (
        <>
            <Flex className={classes.root}>
                <Group>
                    <Link href={`/account/${comment.userid}`}>
                        <Avatar src={comment.avatar} size={64}/>
                    </Link>
                </Group>
                <Stack>
                    <Group>
                        <Link href={`/account/${comment.userid}`}>
                            <Text>{comment.username}</Text>
                        </Link>
                        <Text>{makeDate(comment.createdAt)}</Text>
                        {
                            comment.isEdited
                                && (
                                    <Text className={classes.edited}>(изменено)</Text>
                                )
                        }
                        {
                            comment.userid === user.id
                                && (
                                    <Group>
                                        {
                                            comment.isDeleted
                                                ? (
                                                    <ActionIcon variant="default" onClick={() => handleRemove(comment.uuid, comment.branch, false)}>
                                                        <IconArrowBack />
                                                    </ActionIcon>
                                                )
                                                : (
                                                    <>
                                                        <ActionIcon variant="default" onClick={() => toggleEdit()}>
                                                            <IconEdit />
                                                        </ActionIcon>
                                                        <ActionIcon variant="default" onClick={() => handleRemove(comment.uuid, comment.branch)}>
                                                            <IconX />
                                                        </ActionIcon>
                                                    </>
                                                )
                                        }
                                    </Group>
                                )
                        }
                    </Group>
                    <Group>
                        {
                            comment.isDeleted
                                ? (
                                    <Text className={classes.deleted}>Сообщение было удалено</Text>
                                )
                                : (
                                    <Text>
                                        {
                                            edit
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
                                                        <ActionIcon variant="light" onClick={() => handleEdit(comment.uuid, comment.branch, ref.current?.value)}>
                                                            <IconCheck />
                                                        </ActionIcon>
                                                    </>
                                                )
                                                : comment.message
                                        }
                                    </Text>
                                )
                        }
                    </Group>
                    <Group>
                        <ActionIcon variant={
                            comment.likes?.includes(user.id)
                                ? "filled"
                                : "default"
                        } onClick={() => handleVote("like")}>
                            <IconCaretUpFilled />
                        </ActionIcon>
                        <Text>{comment.likes?.length}</Text>

                        <ActionIcon variant={
                            comment.dislikes?.includes(user.id)
                                ? "filled"
                                : "default"
                        } onClick={() => handleVote("dislike")}>
                            <IconCaretDownFilled />
                        </ActionIcon>
                        <Text>{comment.dislikes?.length}</Text>

                        <Button variant="light" onClick={() => {
                            toggleResponse()
                        }}>Ответить</Button>
                    </Group>
                </Stack>
            </Flex>
            {
                toggle && <AddComment titleCode={comment.title} parentUUID={comment.uuid} branch={comment.branch} />
            }
        </>

    )
}