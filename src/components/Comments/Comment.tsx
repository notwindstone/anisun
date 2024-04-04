import {Avatar, Button, Flex, Group, Stack, Text} from "@mantine/core";
import classes from './Comment.module.css'
import Link from "next/link";
import {useState} from "react";
import AddComment from "@/components/Comments/AddComment";

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

export default function Comment({ comment }: { comment: CommentProps }) {
    const [isParent, setIsParent] = useState(false)

    function handleResponse(parentUUID: string) {
        setIsParent(true)
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
                    <Text>{comment.likes?.length}</Text>
                    <Text>{comment.dislikes?.length}</Text>
                    <Button variant="light" onClick={() => {
                        handleResponse(comment.uuid)
                    }}>Ответить</Button>
                    {
                        isParent && <AddComment titleCode={comment.title} parentUUID={comment.uuid} />
                    }
                </Group>
            </Stack>
        </Flex>
    )
}