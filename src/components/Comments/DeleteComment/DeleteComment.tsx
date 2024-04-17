import {useState} from "react";
import {useUser} from "@clerk/nextjs";
import {notify} from "@/utils/notify/notify";
import {useDisclosure} from "@mantine/hooks";
import {ActionIcon} from "@mantine/core";
import {IconArrowBack, IconX} from "@tabler/icons-react";
import {comments} from "@/lib/comments/comments";

export function DeleteComment({ uuid, isInitiallyDeleted, sendDelete }: { uuid: string, isInitiallyDeleted: boolean, sendDelete: (isDeleted: boolean) => void }) {
    const { isLoaded, isSignedIn, user } = useUser();
    const [delayed, setDelayed] = useState(false)
    const [isDeleted, { toggle }] = useDisclosure(isInitiallyDeleted)

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

    const handleDelete = async () => {
        if (!handleChecks()) {
            return
        }

        setDelayed(true)
        toggle()

        // Почему-то функциям передаётся неизменённый isDeleted
        sendDelete(!isDeleted)

        await comments.remove(uuid, !isDeleted)

        return setTimeout(() => {
            setDelayed(false)
        }, 500)
    }

    return (
        <ActionIcon variant="default" onClick={() => handleDelete()}>
            {

                isDeleted
                    ? (
                        <IconArrowBack />
                    )
                    : (
                        <IconX />
                    )
            }
        </ActionIcon>
    )
}