import {Avatar, Button, Flex, Group, Stack, Text} from "@mantine/core";
import classes from './Comment.module.css'
import Link from "next/link";
import {useEffect, useState} from "react";
import AddComment from "@/components/Comments/AddComment";
import {comments} from "@/api/comments/comments";
import {useUser} from "@clerk/nextjs";
import {notifications} from "@mantine/notifications";

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

export default function Comment(
    {
        parentUUIDOfLastChild,
        comment
    }: {
        parentUUIDOfLastChild?: string | null,
        comment: CommentProps
    }) {

    const { user, isLoaded } = useUser();
    const [toggle, setToggle] = useState(false)
    const [clientLikes, setClientLikes] = useState(comment.likes?.length ?? 0)
    const [clientDislikes, setClientDislikes] = useState(comment.dislikes?.length ?? 0)

    function handleResponse() {
        setToggle(!toggle)
    }

    function handleVote(voteType: string) {
        if (!isLoaded) {
            return notifications.show({
                title: 'Критическая ошибка',
                message: 'Возникла непредвиденная ошибка. Попробуйте обновить страницу',
                autoClose: 3000,
                color: 'red',
            })
        }

        if (!user) {
            return notifications.show({
                title: 'Ошибка',
                message: 'Войдите в аккаунт перед тем, как ставить свой голос на комментарий',
                autoClose: 3000,
                color: 'yellow',
            })
        }

        switch (voteType) {
            case 'like':
                return handleLike().then()
            case 'dislike':
                return handleDislike().then()
            default:
                return notifications.show({
                    title: 'Критическая ошибка',
                    message: 'Что-то пошло не так...',
                    autoClose: 3000,
                    color: 'red',
                })
        }
    }

    async function handleLike() {
        const definedCommentLikes = comment.likes ?? []

        if (definedCommentLikes.length !== clientLikes) {
            return notifications.show({
                title: 'Ошибка',
                message: 'Пожалуйста, подождите перед следующим голосом',
                autoClose: 3000,
                color: 'yellow',
            })
        }

        // Уже проверил в handleVote()
        // @ts-ignore
        if (definedCommentLikes.includes(user.id)) {
            const toRemove = true

            setClientLikes(clientLikes - 1)

            // @ts-ignore
            return await comments.like(comment.uuid, user.id, definedCommentLikes, toRemove)
        }

        setClientLikes(clientLikes + 1)

        // @ts-ignore
        return await comments.like(comment.uuid, user.id, definedCommentLikes)
    }

    async function handleDislike() {
        const definedCommentDislikes = comment.dislikes ?? []

        if (definedCommentDislikes.length !== clientDislikes) {
            return notifications.show({
                title: 'Ошибка',
                message: 'Пожалуйста, подождите перед следующим голосом',
                autoClose: 3000,
                color: 'yellow',
            })
        }

        // Уже проверил в handleVote()
        // @ts-ignore
        if (definedCommentDislikes.includes(user.id)) {
            const toRemove = true

            setClientDislikes(clientDislikes - 1)

            // @ts-ignore
            return await comments.dislike(comment.uuid, user.id, definedCommentDislikes, toRemove)
        }

        setClientDislikes(clientDislikes + 1)

        // @ts-ignore
        return await comments.dislike(comment.uuid, user.id, definedCommentDislikes)

    }

    useEffect(() => {
        setClientLikes(comment.likes?.length ?? clientLikes)
        // eslint-disable-next-line
    }, [comment.likes?.length]);

    useEffect(() => {
        setClientDislikes(comment.dislikes?.length ?? clientDislikes)
        // eslint-disable-next-line
    }, [comment.dislikes?.length]);

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
                        <Text>{comment.createdAt}</Text>
                    </Group>
                    <Group>
                        <Text>{comment.message}</Text>
                    </Group>
                    <Group>
                        <Button onClick={() => handleVote("like")}>лайк</Button>
                        <Text>{clientLikes ?? comment.likes?.length}</Text>
                        <Button onClick={() => handleVote("dislike")}>дизлайк</Button>
                        <Text>{clientDislikes ?? comment.dislikes?.length}</Text>
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