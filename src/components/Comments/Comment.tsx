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
    title: string;
    branch: string;
    userid: string;
    username: string;
    avatar: string;
    createdAt: string;
    likes: string[] | null;
    dislikes?: string[] | null;
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
    const [liked, setLiked] = useState(comment.likes?.includes(user?.id ?? ''))
    const [disliked, setDisliked] = useState(comment.dislikes?.includes(user?.id ?? ''))
    const [delayed, setDelayed] = useState(false)

    const queryClient = useQueryClient()

    const mutation = useMutation({
        // @ts-ignore
        mutationFn: ({ uuid, branch, likes, dislikes }: { uuid: string, branch: string, likes?: string[] | null, dislikes?: string[] | null }) => {
            return { uuid: uuid, branch: branch, likes: likes, dislikes: dislikes }
        },
        onSuccess: (data, variables) => {
            const { uuid, branch, likes, dislikes } = variables
            const oldData: DataProps | undefined = queryClient.getQueryData(['comments', comment.title])
            console.log(oldData)
            if (!oldData) {
                return
            }

            for (const pages of oldData.pages) {
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

                    const currentChild = branchComment.children.find((child: CommentProps) => child.uuid === uuid)

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

            queryClient.setQueryData(['comments', { uuid, likes }], data)
        },
    })

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
                if (disliked) {
                    // В данном случае дизлайк убирается, если он поставлен и синхронизированы лайки, и выполняется дальнейший код
                    handleDislike().then()
                }

                return handleLike().then()
            case 'dislike':
                if (liked) {
                    // В данном случае лайк убирается, если он поставлен и синхронизированы дизлайки, и выполняется дальнейший код
                    handleLike().then()
                }

                return handleDislike().then()
            default:
                return notifyCriticalError
        }
    }

    async function handleLike() {
        const definedCommentLikes = comment.likes ?? []

        // Уже проверил в handleVote()
        // @ts-ignore
        if (definedCommentLikes.includes(user.id)) {
            const toRemove = true

            const mutatedCommentLikes = definedCommentLikes.filter(function (value) {
                return value !== user?.id
            })

            setLiked(false)
            setDelayed(true)

            mutation.mutate({
                uuid: comment.uuid,
                branch: comment.branch,
                likes: mutatedCommentLikes
            })

            // @ts-ignore
            await comments.like(comment.uuid, user.id, definedCommentLikes, toRemove)

            return setTimeout(() => {
                setDelayed(false)
            }, 1000)
        }

        const mutatedCommentLikes = definedCommentLikes

        // Уже проверил в handleVote()
        // @ts-ignore
        mutatedCommentLikes.push(user?.id)

        setLiked(true)
        setDelayed(true)

        mutation.mutate({
            uuid: comment.uuid,
            branch: comment.branch,
            likes: mutatedCommentLikes,
        })

        // @ts-ignore
        await comments.like(comment.uuid, user.id, definedCommentLikes)

        return setTimeout(() => {
            setDelayed(false)
        }, 1000)
    }

    async function handleDislike() {
        const definedCommentDislikes = comment.dislikes ?? []

        // Уже проверил в handleVote()
        // @ts-ignore
        if (definedCommentDislikes.includes(user.id)) {
            const toRemove = true

            setDisliked(false)
            setDelayed(true)

            // @ts-ignore
            await comments.dislike(comment.uuid, user.id, definedCommentDislikes, toRemove)

            await queryClient.refetchQueries({
                queryKey: ['comments', comment.title]
            })

            return setTimeout(() => {
                setDelayed(false)
            }, 1000)
        }

        setDisliked(true)
        setDelayed(true)

        // @ts-ignore
        await comments.dislike(comment.uuid, user.id, definedCommentDislikes)

        await queryClient.refetchQueries({
            queryKey: ['comments', comment.title]
        })

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
                            liked
                                ? "filled"
                                : "default"
                        } onClick={() => handleVote("like")}>
                            <IconCaretUpFilled />
                        </ActionIcon>
                        <Text>{comment.likes?.length}</Text>

                        <ActionIcon variant={
                            disliked
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