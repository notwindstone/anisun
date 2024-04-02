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
                <IconMessage />
            </Button>
        </Group>
    )
}