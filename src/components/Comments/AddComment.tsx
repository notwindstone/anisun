import {useRef} from "react";
import {Button, Group, Textarea} from "@mantine/core";
import { IconMessage } from "@tabler/icons-react";
import {comments} from "@/api/comments/comments";
import {nanoid} from "nanoid";

export default function AddComment() {
    const ref = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = async () => {
        const input = ref.current?.value ?? ""
        const uuid = nanoid()
        const date = new Date().toJSON()

        await comments.add(
            uuid,
            "ookami-to-koushinryou-merchant-meets-the-wise-wolf",
            "https://tabler.io/packages/logo-figma.svg",
            "windstone",
            date,
            0,
            0,
            input
        )
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
            <Button onClick={handleSubmit} variant="light">
                <IconMessage />
            </Button>
        </Group>
    )
}