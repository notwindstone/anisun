import {Avatar, Button, Flex, Group, Stack, Text} from "@mantine/core";
import classes from './Comment.module.css'
import Link from "next/link";
import {useState} from "react";
import AddComment from "@/components/Comments/AddComment";
import {nanoid} from "nanoid";
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

export default function Comment({ isChildOfChild = false, parentUUIDOfLastChild, comment }: { isChildOfChild?: boolean, parentUUIDOfLastChild?: string, comment: CommentProps }) {
    const [toggle, setToggle] = useState(false)

    function handleResponse(parentUUIDOfLastChild?: string) {
        if (parentUUIDOfLastChild) {
            return notifications.show({
                title: 'Критическая ошибка',
                message: 'Возникла непредвиденная проблема с вложенными комментариями',
                autoClose: 3000,
                color: 'red',
            })
        }

        setToggle(!toggle)
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
                        <Text>{comment.likes?.length}</Text>
                        <Text>{comment.dislikes?.length}</Text>
                        {
                            isChildOfChild
                                ? (
                                    <Button variant="light" onClick={() => {
                                        handleResponse(parentUUIDOfLastChild)
                                    }}>Ответить</Button>
                                )
                                : (
                                    <Button variant="light" onClick={() => {
                                        handleResponse(comment.uuid)
                                    }}>Ответить</Button>
                                )
                        }
                    </Group>
                </Stack>
            </Flex>
            {
                toggle && <AddComment titleCode={comment.title} parentUUID={comment.uuid} />
            }
        </>

    )
}