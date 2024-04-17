import {useRef, useState} from "react";
import {useUser} from "@clerk/nextjs";
import {notify} from "@/utils/notify/notify";
import {useDisclosure} from "@mantine/hooks";
import {ActionIcon} from "@mantine/core";
import {IconEdit} from "@tabler/icons-react";

export function EditComment({ uuid, sendEdit }: { uuid: string, sendEdit: ({ message, isEditing }: { message: string, isEditing: boolean }) => void }) {
    const { isLoaded, isSignedIn, user } = useUser();
    const [delayed, setDelayed] = useState(false)
    const ref = useRef<HTMLTextAreaElement>(null);
    const [isEditing, { toggle }] = useDisclosure(false)

    const isUser = isLoaded && isSignedIn

    const handleChecks = (message: string) => {
        if (delayed) {
            notify.delay()

            return false
        }

        if (!isUser || !user) {
            notify.notAuthenticated()

            return false
        }

        if (message.length < 2 || message.length > 2000) {
            notify.incorrectInput()

            return false
        }

        return true
    }

    const handleEdit = ({ message }: { message: string | undefined }) => {
        handleChecks(message ?? '')

    }

    return (
        <ActionIcon variant="light" onClick={() => handleEdit({ message: ref.current?.value })}>
            <IconEdit />
        </ActionIcon>
    )
}