import {useRef} from "react";
import {Button, Group, Textarea} from "@mantine/core";
import { IconMessage } from "@tabler/icons-react";
import {comments} from "@/api/comments/comments";
import {nanoid} from "nanoid";
import {useQueryClient} from "@tanstack/react-query";
import {notifications} from "@mantine/notifications";

export default function AddComment({ titleCode }: { titleCode: string }) {
    const ref = useRef<HTMLTextAreaElement>(null);

    const queryClient = useQueryClient()

    const onSuccess = () => {
        notifications.show({
            title: 'Успех',
            message: 'Комментарий был успешно добавлен',
            autoClose: 3000,
            color: 'green',
        })
        return queryClient.invalidateQueries({queryKey: ["comments"]})
    }

    const handleSubmit = async () => {
        const input = ref.current?.value ?? ""

        if (input.length < 10 || input.length > 2000) {
            return notifications.show({
                title: 'Ошибка',
                message: 'Пожалуйста, напишите комментарий от 10 до 2000 символов',
                autoClose: 3000,
                color: 'yellow',
            })
        }

        const uuid = nanoid()
        const createdAt = new Date().toJSON()

        await comments.add(
            uuid,
            titleCode,
            uuid,
            "windstone",
            "https://tabler.io/packages/logo-figma.svg",
            createdAt,
            0,
            0,
            input,
            false,
            false,
        )

        await onSuccess()
    }

    return (
        <Group>
            <Textarea
                ref={ref}
                placeholder="Autosize with no rows limit"
                autosize
                required
                minRows={2}
            />
            <Button type="button" onClick={handleSubmit} variant="light">
                <IconMessage/>
            </Button>
        </Group>
    )
}