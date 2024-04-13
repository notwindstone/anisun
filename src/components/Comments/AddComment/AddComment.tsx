import {useUser} from "@clerk/nextjs";
import {useRef, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {ActionIcon, Group, Textarea} from "@mantine/core";
import {IconMessage} from "@tabler/icons-react";
import {notify} from "@/utils/notify/notify";
import {nanoid} from "nanoid";
import {comments} from "@/lib/comments/comments";

export function AddComment({ title, parentUUID }: { title: string, parentUUID: string | null }) {
    const { isLoaded, isSignedIn, user } = useUser();
    const ref = useRef<HTMLTextAreaElement>(null);
    const [delayed, setDelayed] = useState(false)

    const queryClient = useQueryClient()

    const isUser = isLoaded && isSignedIn

    const handleSubmit = async () => {
        if (delayed) {
            return notify.delay()
        }

        if (!isUser) {
            return notify.notAuthenticated()
        }

        const message = ref.current?.value ?? ""

        if (message.length < 2 || message.length > 2000) {
            return notify.incorrectInput()
        }

        const uuid = nanoid()
        const createdAt = new Date().toJSON()

        const userId = user?.id
        const username = user?.username ?? "Пользователь без никнейма"
        const avatar = user?.imageUrl

        await comments.add(
            uuid,
            /*
             * Чтобы комментарии не уходили ниже 3-го уровня,
             * я в качестве parentuuid использую айди прародителя комментария
             *
             * Схема: Комментарий 1
             *            |-> Ответ на комментарий
             *                |-> Ответ на ответ
             *                |-> Ответ на ответ на ответ
             */
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

        notify.done()

        setDelayed(true)

        setTimeout(() => {
            setDelayed(false)
        }, 5000)
    }

    return (
        <Group>
            <Textarea
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
                        <ActionIcon type="button" onClick={handleSubmit} variant="light">
                            <IconMessage />
                        </ActionIcon>
                    ) : (
                        <></>
                    )
            }
        </Group>
    )
}