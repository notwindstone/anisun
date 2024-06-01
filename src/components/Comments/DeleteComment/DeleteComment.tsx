import {useState} from "react";
import {useUser} from "@clerk/nextjs";
import {notify} from "@/utils/Notifications/notify";
import {useDisclosure} from "@mantine/hooks";
import {ActionIcon, Button, Flex, Modal, Text} from "@mantine/core";
import {IconArrowBack, IconX} from "@tabler/icons-react";
import {comments} from "@/lib/comments/comments";
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import classes from './DeleteComment.module.css';

export function DeleteComment({ uuid, userid, isInitiallyDeleted, sendDelete }: { uuid: string, userid: string, isInitiallyDeleted: boolean, sendDelete: (isDeleted: boolean) => void }) {
    const { isLoaded, isSignedIn, user } = useUser();
    const [delayed, setDelayed] = useState(false);
    const [isDeleted, { toggle }] = useDisclosure(isInitiallyDeleted);
    const [opened, { open, close }] = useDisclosure(false);

    const isUser = isLoaded && isSignedIn;

    if (!isUser || userid !== user?.id) {
        return;
    }

    const handleChecks = () => {
        if (delayed) {
            notify.delay();

            return false;
        }

        if (!isUser || !user) {
            notify.notAuthenticated();

            return false;
        }

        return true;
    };

    const handleDelete = async () => {
        if (!handleChecks()) {
            return;
        }

        setDelayed(true);
        toggle();
        close();

        // Почему-то функциям передаётся неизменённый isDeleted
        sendDelete(!isDeleted);

        await comments.remove(uuid, !isDeleted);

        return setTimeout(() => {
            setDelayed(false);
        }, 500);
    };

    const modalTitle = isDeleted ? "Восстановление комментария" : "Удаление комментария";
    const modalDescription = isDeleted
        ? "Вы уверены, что хотите восстановить комментарий? Ваш комментарий вновь станет доступным всем."
        : "Вы уверены, что хотите удалить комментарий? Вы сможете восстановить его позже.";

    return (
        <>
            <Modal
                classNames={{
                    content: classes.modal,
                    header: classes.modal
                }}
                opened={opened}
                onClose={close}
                title={modalTitle}
                centered
            >
                <Text>{modalDescription}</Text>
                <Flex
                    mt="1rem"
                    justify="flex-end"
                    gap="1rem"
                >
                    <Button className={classes.button} variant="default" onClick={close}>
                        Нет
                    </Button>
                    <DecoratedButton onClick={() => handleDelete()}>Да</DecoratedButton>
                </Flex>
            </Modal>
            <ActionIcon
                classNames={{
                    root: classes.iconWrapper,
                    icon: classes.iconWrapper,
                }}
                variant="default"
                onClick={open}
            >
                {

                    isDeleted
                        ? (
                            <IconArrowBack className={classes.icon} size={20} stroke={1.5} />
                        )
                        : (
                            <IconX className={classes.icon} size={20} stroke={1.5} />
                        )
                }
            </ActionIcon>
        </>
    );
}