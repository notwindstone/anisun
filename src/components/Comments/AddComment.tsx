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

    const onSuccess = () => queryClient.invalidateQueries({queryKey: ["comments"]})

    const handleSubmit = async () => {
        const input = ref.current?.value ?? ""

        if (input.length < 10 || input.length > 2000) {
            return notifications.show({
                title: '123',
                message: '123',
                autoClose: 5000,
                color: 'red',
                style: { zIndex: 30000 }
            })
        }

        const uuid = nanoid()
        const date = new Date().toJSON()

        await comments.add(
            uuid,
            titleCode,
            uuid,
            "windstone",
            "https://tabler.io/packages/logo-figma.svg",
            date,
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