import {useRef, useState} from "react";
import {Avatar, Button, Flex, Group, Paper, Space, Text, Textarea} from "@mantine/core";
import {notify} from "@/utils/notify/notify";
import {nanoid} from "nanoid";
import {comments} from "@/lib/comments/comments";
import {CommentType} from "@/types/CommentType";
import {useUser} from "@clerk/nextjs";
import classes from './AddComment.module.css'

export function AddComment({ title, parentUUID, sendComment }: { title: string, parentUUID: string | null, sendComment: (comment: CommentType) => void }) {
    const { isLoaded, isSignedIn, user } = useUser();
    const ref = useRef<HTMLTextAreaElement>(null);
    const [delayed, setDelayed] = useState(false)

    const isUser = isLoaded && isSignedIn

    const handleSubmit = async () => {
        if (delayed) {
            return notify.delay()
        }

        if (!isUser || !user) {
            return notify.notAuthenticated()
        }

        const message = ref.current?.value ?? ""

        if (message.length < 2 || message.length > 2000) {
            return notify.incorrectInput()
        }

        setDelayed(true)

        const notificationId = nanoid()

        notify.loading(notificationId, true)

        const uuid = nanoid()
        const createdAt = new Date().toJSON()

        const userId = user?.id
        const username = user?.username ?? "Пользователь без никнейма"
        const avatar = user?.imageUrl
        const children = [{ count: 0 }]

        const comment = {
            uuid: uuid,
            parentuuid: parentUUID,
            title: title,
            userid: userId,
            username: username,
            avatar: avatar,
            createdAt: createdAt,
            likes: [],
            dislikes: [],
            message: message,
            isDeleted: false,
            isEdited: false,
            children: children
        }

        sendComment(comment)

        await comments.add(
            uuid,
            parentUUID,
            title,
            userId,
            username,
            avatar,
            createdAt,
            [],
            [],
            message,
            false,
            false,
        )

        notify.loading(notificationId, false)

        setTimeout(() => {
            setDelayed(false)
        }, 5000)
    }

    return (
        <Paper className={classes.root}>
            {
                isUser && (
                    <Group>
                        <Avatar className={classes.avatar} src={user?.imageUrl} />
                        <Text className={classes.username}>{user?.username}</Text>
                    </Group>
                )

            }
            <Space h="md" />
            <Textarea
                classNames={{
                    wrapper: classes.wrapper,
                    input: classes.input,
                }}
                ref={ref}
                placeholder={
                    isUser
                        ? "Написать комментарий..."
                        : "Вы должны войти в аккаунт, чтобы написать комментарий"
                }
                autosize
                required
                minRows={2}
                disabled={
                    !isUser
                }
            />
            {
                isUser
                    ? (
                        <Flex justify="flex-end">
                            <Button
                                className={classes.submit}
                                type="button" onClick={handleSubmit}
                                variant="filled"
                            >
                                Ответить
                            </Button>
                        </Flex>
                    ) : null
            }
        </Paper>
    )
}