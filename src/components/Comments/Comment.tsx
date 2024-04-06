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

interface CommentProps {
    uuid: string;
    title: string;
    userid: string;
    username: string;
    avatar: string;
    createdAt: string;
    likes: unknown[] | null;
    dislikes: unknown[] | null;
    message: string;
    isDeleted: boolean;
    isEdited: boolean;
}

function notifyAboutDelay() {
    notifications.clean()

    return notifications.show({
        title: 'Ошибка',
        message: 'Пожалуйста, подождите перед следующим голосом',
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

export default function Comment(
    {
        parentUUIDOfLastChild,
        comment
    }: {
        parentUUIDOfLastChild?: string | null,
        comment: CommentProps
    }) {

    const { user } = useUser();

    const [toggle, setToggle] = useState(false)
    const [liked, setLiked] = useState(comment.likes?.includes(user?.id))
    const [disliked, setDisliked] = useState(comment.dislikes?.includes(user?.id))

    const queryClient = useQueryClient()

    const commentsData = queryClient.getQueryData(['comments', comment.title])

    const mutation = useMutation({
        mutationFn: () => commentsData,
        onSuccess: (data) => {
            queryClient.setQueryData(['todo', comment.title], data)
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

            setLiked(false)

            const newCommentLikes = definedCommentLikes.filter(function (value) {
                return value !== user?.id
            })

            // @ts-ignore
            return await comments.like(comment.uuid, user.id, definedCommentLikes, toRemove)
        }

        setLiked(true)

        // @ts-ignore
        return await comments.like(comment.uuid, user.id, definedCommentLikes)
    }

    async function handleDislike() {
        const definedCommentDislikes = comment.dislikes ?? []

        // Уже проверил в handleVote()
        // @ts-ignore
        if (definedCommentDislikes.includes(user.id)) {
            const toRemove = true

            setDisliked(false)

            // @ts-ignore
            return await comments.dislike(comment.uuid, user.id, definedCommentDislikes, toRemove)
        }

        setDisliked(true)

        // @ts-ignore
        return await comments.dislike(comment.uuid, user.id, definedCommentDislikes)

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
                toggle && <AddComment titleCode={comment.title} parentUUID={comment.uuid} parentUUIDOfLastChild={parentUUIDOfLastChild} />
            }
        </>

    )
}