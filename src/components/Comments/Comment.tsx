import {Avatar, Button, Flex, Group, Stack, Text} from "@mantine/core";
import classes from './Comment.module.css'
import Link from "next/link";

interface CommentProps {
    uuid: string;
    title: string;
    userid: string;
    username: string;
    avatar: string;
    createdAt: string;
    likes: number;
    dislikes: number;
    message: string;
    isDeleted: boolean;
    isEdited: boolean;
}

export default function Comment({ comment }: { comment: CommentProps }) {
    function handleResponse(parentUUID) {
        const isParent = true

        console.log(parentUUID)
    }

    return (
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
                    <Text>{comment.likes}</Text>
                    <Text>{comment.dislikes}</Text>
                    <Button variant="light" onClick={() => {
                        handleResponse(comment.uuid)
                    }}>Ответить</Button>
                </Group>
            </Stack>
        </Flex>
    )
}