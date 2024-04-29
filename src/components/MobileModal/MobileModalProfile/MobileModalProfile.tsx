import {useDisclosure} from "@mantine/hooks";
import classes from "@/components/MobileModal/MobileModal.module.css";
import {ActionIcon, Drawer} from "@mantine/core";
import {IconUser} from "@tabler/icons-react";

export default function MobileModalProfile() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Drawer
                position="bottom"
                size="100%"
                opened={opened}
                onClose={close}
                classNames={{
                    content: classes.drawer,
                    header: classes.drawer
                }}
                zIndex={29999}
            >
                MobileModalProfile
            </Drawer>
            <ActionIcon onClick={open}>
                <IconUser/>
            </ActionIcon>
        </>
    )
}