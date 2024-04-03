import {Avatar, Flex, Group, Stack, Text} from "@mantine/core";
import classes from './Comment.module.css'

interface CommentProps {
    uuid: string;
    title: string;
    userid: string;
    username: string;
    avatar: string;
    date: string;
    likes: number | null;
    dislikes: number | null;
    message: string;
    isDeleted: boolean | null;
    isEdited: boolean | null;
}

export default function Comment({ comment }: { comment: CommentProps }) {
    return (
        <Flex className={classes.root}>
            <Group>
                <Avatar src={comment.avatar} size={64}/>
            </Group>
            <Stack>
                <Group>
                    <Text>{comment.username}</Text>
                    <Text>{comment.date}</Text>
                </Group>
                <Group>
                    <Text>{comment.message}</Text>
                </Group>
                <Group>
                    <Text>{comment.likes}</Text>
                    <Text>{comment.dislikes}</Text>
                </Group>
            </Stack>
        </Flex>
    )
}