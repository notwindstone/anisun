import {useUser} from "@clerk/nextjs";
import {useRef, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {ActionIcon, Group, Textarea} from "@mantine/core";
import {IconMessage} from "@tabler/icons-react";
import {handleAdd} from "@/utils/comments/handleAdd";

export function AddComment({ title, parentUUID }: { title: string, parentUUID: string | null }) {
    const { isLoaded, isSignedIn, user } = useUser();
    const ref = useRef<HTMLTextAreaElement>(null);
    const [delayed, setDelayed] = useState(false)

    const queryClient = useQueryClient()

    const isUser = isLoaded && isSignedIn

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
                        <ActionIcon type="button" onClick={() => handleAdd({ title, parentUUID })} variant="light">
                            <IconMessage />
                        </ActionIcon>
                    ) : (
                        <></>
                    )
            }
        </Group>
    )
}