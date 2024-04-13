import {useUser} from "@clerk/nextjs";
import {useRef, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ActionIcon, Group, Textarea} from "@mantine/core";
import {IconMessage} from "@tabler/icons-react";
import {notify} from "@/utils/notify/notify";
import {nanoid} from "nanoid";
import {comments} from "@/lib/comments/comments";
import {MutatedDataType} from "@/types/MutatedDataType";

export function AddComment({ title, parentUUID }: { title: string, parentUUID: string | null }) {
    const { isLoaded, isSignedIn, user } = useUser();
    const ref = useRef<HTMLTextAreaElement>(null);
    const [delayed, setDelayed] = useState(false)

    const queryClient = useQueryClient()

    const isUser = isLoaded && isSignedIn

    const mutation = useMutation({
        // @ts-ignore
        mutationFn: (
            {
                uuid,
                parentuuid,
                title,
                userid,
                username,
                avatar,
                createdAt,
                likes,
                dislikes,
                message,
                isDeleted,
                isEdited,
                children,
            }: {
                uuid: string,
                parentuuid: string | null,
                title: string,
                userid: string,
                username: string,
                avatar: string,
                createdAt: string,
                likes: string[],
                dislikes: string[],
                message: string,
                isDeleted: boolean,
                isEdited: boolean,
                children: { count: number }[],
            }
        ) => {
            const mutatedData: MutatedDataType | undefined = queryClient.getQueryData(['comments', title])

            if (!mutatedData) {
                return
            }

            mutatedData.pages[0].data.unshift({
                uuid,
                parentuuid,
                title,
                userid,
                username,
                avatar,
                createdAt,
                likes,
                dislikes,
                message,
                isDeleted,
                isEdited,
                children,
            })

            return mutatedData
        },

mutatedData.pages[0].data[1].message === "Fucking test"

        onSuccess: (newData) => {
            queryClient.setQueryData(['comments', title],
                (oldData: MutatedDataType) =>
                    oldData
                        ? newData
                        : oldData
            )

            console.log(newData)
        }
    })

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
        const children = [{ count: 0 }]

        mutation.mutate({
            uuid: uuid,
            /*
             * Чтобы комментарии не уходили ниже 3-го уровня,
             * я в качестве parentuuid использую айди прародителя комментария
             *
             * Схема: Комментарий 1
             *            |-> Ответ на комментарий
             *                |-> Ответ на ответ
             *                |-> Ответ на ответ на ответ
             */
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
            children: children,
        })

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