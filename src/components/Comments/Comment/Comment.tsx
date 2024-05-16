import {Avatar, Flex, Group, Paper, Stack, Text, TypographyStylesProvider} from "@mantine/core";
import classes from './Comment.module.css';
import Link from "next/link";

export default function Comment() {
    const comment = {
        avatar: "/blurred.png",
        username: "windstone",
        userid: "1234",
    }

    return (
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
            <Stack>
                <Flex justify="space-between">
                    <Group>
                        <Text>{comment.username}</Text>
                        <Text>23 апреля в 14:20</Text>
                    </Group>
                    <Group>
                        <Text>1</Text>
                        <Text>2</Text>
                    </Group>
                </Flex>
            </Stack>
        </Flex>
    )
}