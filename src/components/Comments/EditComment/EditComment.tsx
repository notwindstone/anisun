import {useState} from "react";
import {useUser} from "@clerk/nextjs";
import {notify} from "@/utils/notify/notify";
import {useDisclosure} from "@mantine/hooks";
import {ActionIcon} from "@mantine/core";
import {IconEdit} from "@tabler/icons-react";

export function EditComment({ sendEdit }: { sendEdit: (isEditing: boolean) => void }) {
    const { isLoaded, isSignedIn, user } = useUser();
    const [delayed, setDelayed] = useState(false)
    const [isEditing, { toggle }] = useDisclosure(false)

    const isUser = isLoaded && isSignedIn

    const handleChecks = () => {
        if (delayed) {
            notify.delay()

            return false
        }

        if (!isUser || !user) {
            notify.notAuthenticated()

            return false
        }

        return true
    }

    const handleEdit = () => {
        if (!handleChecks()) {
            return
        }

        setDelayed(true)
        toggle()

        sendEdit(!isEditing)

        return setTimeout(() => {
            setDelayed(false)
        }, 500)
    }

    return (
        <ActionIcon variant="default" onClick={() => handleEdit()}>
            <IconEdit />
        </ActionIcon>
    )
}