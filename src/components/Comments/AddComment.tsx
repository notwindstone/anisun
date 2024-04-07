import {useRef, useState} from "react";
import {Button, Group, Textarea} from "@mantine/core";
import { IconMessage } from "@tabler/icons-react";
import {comments} from "@/api/comments/comments";
import {nanoid} from "nanoid";
import {useQueryClient} from "@tanstack/react-query";
import {notifications} from "@mantine/notifications";
import {useUser} from "@clerk/nextjs";

export default function AddComment({ titleCode, parentUUID, branch }: { titleCode: string, parentUUID: string | null, branch: string }) {
    const { isLoaded, isSignedIn, user } = useUser();
    const ref = useRef<HTMLTextAreaElement>(null);
    const [delayed, setDelayed] = useState(false)

    const queryClient = useQueryClient()

    const isUser = isLoaded && isSignedIn

    const onSuccess = () => {
        notifications.show({
            title: 'Успех',
            message: 'Комментарий был успешно добавлен',
            autoClose: 3000,
            color: 'green',
        })

        return queryClient.invalidateQueries(
            {
                queryKey: ["comments"]
            }
        )
    }

    const handleSubmit = async () => {
        if (delayed) {
            return notifications.show({
                title: 'Ошибка',
                message: 'Пожалуйста, подождите',
                autoClose: 3000,
                color: 'yellow',
            })
        }

        if (!isUser) {
            return notifications.show({
                title: 'Критическая ошибка',
                message: 'Вы не авторизованы. Войдите в аккаунт перед тем, как написать комментарий',
                autoClose: 3000,
                color: 'red',
            })
        }

        const input = ref.current?.value ?? ""

        if (input.length < 2 || input.length > 2000) {
            return notifications.show({
                title: 'Ошибка',
                message: 'В комментарии должно быть от 2 до 2000 символов',
                autoClose: 3000,
                color: 'yellow',
            })
        }

        const uuid = nanoid()
        const createdAt = new Date().toJSON()

        const userId = user.id
        const username = user.username ?? "Пользователь без никнейма"
        const avatar = user.imageUrl

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
            branch,
            titleCode,
            userId,
            username,
            avatar,
            createdAt,
            [],
            [],
            input,
            false,
            false,
        )

        await onSuccess()

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
                    ?
                        <Button type="button" onClick={handleSubmit} variant="light">
                            <IconMessage/>
                        </Button>
                    :
                        <></>
            }
        </Group>
    )
}