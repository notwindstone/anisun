import {ActionIcon, Avatar, Button, Flex, Group, Stack, Text} from "@mantine/core";
import classes from './Comment.module.css'
import Link from "next/link";
import {useState} from "react";
import AddComment from "@/components/Comments/AddComment";
import {comments} from "@/api/comments/comments";
import {useUser} from "@clerk/nextjs";
import {notifications} from "@mantine/notifications";
import {IconCaretDownFilled, IconCaretUpFilled} from "@tabler/icons-react";
import {makeDate} from "@/utils/makeDate";
import {useMutation, useQueryClient} from "@tanstack/react-query";

interface DataProps {
    pages: {
        data: CommentProps[];
    }[]
}

interface CommentProps {
    uuid: string;
    parentuuid: string | null;
    title: string;
    branch: string;
    userid: string;
    username: string;
    avatar: string;
    createdAt: string;
    likes: unknown[] | null;
    dislikes: unknown[] | null;
    message: string;
    isDeleted: boolean;
    isEdited: boolean;
    children?: CommentProps[];
}

function notifyAboutDelay() {
    notifications.clean()

    return notifications.show({
        title: 'Ошибка',
        message: 'Пожалуйста, подождите секунду перед следующим голосом',
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
export default function Comment({ comment }: { comment: CommentProps }) {

    const { user } = useUser();

    const [toggle, setToggle] = useState(false)
    const [delayed, setDelayed] = useState(false)

    const queryClient = useQueryClient()

    const mutation = useMutation({
        // @ts-ignore
        mutationFn: ({ uuid, branch, likes, dislikes }: { uuid: string, branch: string, likes?: unknown[] | null, dislikes?: unknown[] | null }) => {
            const mutatedData: DataProps | undefined = queryClient.getQueryData(['comments', comment.title])

            if (!mutatedData) {
                return
            }

            for (const pages of mutatedData.pages) {
                const originComment = pages.data.find(
                    (comment: CommentProps) => comment.uuid === uuid
                )

                if (!originComment) {
                    const branchComment = pages.data.find(
                        (comment: CommentProps) => comment.branch === branch
                    )

                    if (!branchComment?.children) {
                        return
                    }

                    let currentChild = branchComment.children.find((child: CommentProps) => child.uuid === uuid)

                    if (!currentChild) {
                        return
                    }

                    if (likes) {
                        currentChild.likes = likes

                    }

                    if (dislikes) {
                        currentChild.dislikes = dislikes
                    }

                    return
                }

                if (likes) {
                    originComment.likes = likes
                }

                if (dislikes) {
                    originComment.dislikes = dislikes
                }
            }

            return mutatedData
        },

        onSuccess: (newData) => {
            queryClient.setQueryData(['comments', comment.title],
                (oldData) =>
                    oldData
                        ? newData
                        : oldData
            )
        },
    })

    if (!user) {
        return
    }

    function handleResponse() {
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
            const toRemove = true

            const mutatedCommentLikes = definedCommentLikes.filter(function (value) {
                return value !== user?.id
            })

            console.log(definedCommentLikes, mutatedCommentLikes)

            mutation.mutate({
                uuid: comment.uuid,
                branch: comment.branch,
                likes: mutatedCommentLikes
            })

            console.log(definedCommentLikes, mutatedCommentLikes)

            // @ts-ignore
            await comments.like(comment.uuid, mutatedCommentLikes)

            console.log(definedCommentLikes, mutatedCommentLikes)

            return setTimeout(() => {
                setDelayed(false)
            }, 1000)
        }

        const mutatedCommentLikes = definedCommentLikes

        console.log(definedCommentLikes, mutatedCommentLikes)

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
        }, 1000)
    }

    async function handleDislike() {
        setDelayed(true)

        const definedCommentDislikes = comment.dislikes ?? []

        // Уже проверил в handleVote()
        // @ts-ignore
        if (definedCommentDislikes.includes(user.id)) {
            const toRemove = true

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
            }, 1000)
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
        }, 1000)
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
                    </Group>
                    <Group>
                        <Text>{comment.message}</Text>
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
                            handleResponse()
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