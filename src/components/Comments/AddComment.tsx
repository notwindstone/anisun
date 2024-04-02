import {useRef} from "react";
import {Button, Group, Textarea} from "@mantine/core";
import { IconMessage } from "@tabler/icons-react";

export default function AddComment() {
    const ref = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = async () => {
        console.log(ref.current?.value)
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