import {Avatar, Button, Flex, Group, Stack, Text} from "@mantine/core";
import classes from './Comment.module.css'
import Link from "next/link";
import {useState} from "react";
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

    const { isSignedIn, user, isLoaded } = useUser();
    const [toggle, setToggle] = useState(false)
    const [clientLikes, setClientLikes] = useState(comment.likes?.length ?? 0)

    function handleResponse() {
        setToggle(!toggle)
    }

    async function handleLike() {
        if (!user) {
            return alert('1')
        }

        const definedCommentLikes = comment.likes ?? []

        if (definedCommentLikes.includes(user.id)) {
            return alert('2')
        }

        if (definedCommentLikes.length !== clientLikes) {
            return alert('3')
        }

        await comments.like(comment.uuid, user.id, definedCommentLikes)
        setClientLikes(clientLikes + 1)
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
                        <Text>{comment.createdAt}</Text>
                    </Group>
                    <Group>
                        <Text>{comment.message}</Text>
                    </Group>
                    <Group>
                        <Button onClick={handleLike}>лайк</Button>
                        <Text>{clientLikes ?? comment.likes?.length}</Text>
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