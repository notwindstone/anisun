import {useState} from "react";
import {useUser} from "@clerk/nextjs";
import {notify} from "@/utils/notify/notify";
import {useDisclosure} from "@mantine/hooks";
import {ActionIcon, Button, Flex, Modal, Text} from "@mantine/core";
import {IconArrowBack, IconX} from "@tabler/icons-react";
import {comments} from "@/lib/comments/comments";

export function DeleteComment({ uuid, userid, isInitiallyDeleted, sendDelete }: { uuid: string, userid: string, isInitiallyDeleted: boolean, sendDelete: (isDeleted: boolean) => void }) {
    const { isLoaded, isSignedIn, user } = useUser();
    const [delayed, setDelayed] = useState(false)
    const [isDeleted, { toggle }] = useDisclosure(isInitiallyDeleted)
    const [opened, { open, close }] = useDisclosure(false);

    const isUser = isLoaded && isSignedIn

    if (!isUser || userid !== user?.id) {
        return
    }

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
        close()

        // Почему-то функциям передаётся неизменённый isDeleted
        sendDelete(!isDeleted)

        await comments.remove(uuid, !isDeleted)

        return setTimeout(() => {
            setDelayed(false)
        }, 500)
    }

    const modalTitle = isDeleted ? "Восстановление комментария" : "Удаление комментария"
    const modalDescription = isDeleted
        ? "Вы уверены, что хотите восстановить комментарий? Ваш комментарий вновь станет доступным всем."
        : "Вы уверены, что хотите удалить комментарий? Вы сможете восстановить его позже."

    return (
        <>
            <Modal opened={opened} onClose={close} title={modalTitle}>
                <Text>{modalDescription}</Text>
                <Flex
                    justify="space-between"
                >
                    <Button variant="default" onClick={close}>Нет</Button>
                    <Button onClick={() => handleDelete()}>Да</Button>
                </Flex>
            </Modal>
            <ActionIcon variant="default" onClick={open}>
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
        </>
    )
}