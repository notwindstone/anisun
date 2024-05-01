import {IconBrandSafari, IconHome, IconMenu2} from "@tabler/icons-react";
import {ActionIcon, Drawer, rem, Stack, Text, UnstyledButton} from "@mantine/core";
import classes from "@/components/MobileModal/MobileModal.module.css";
import {useDisclosure} from "@mantine/hooks";

export default function MobileModalMenu() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Drawer
                position="bottom"
                size="100vh"
                opened={opened}
                onClose={close}
                classNames={{
                    content: classes.drawer,
                    header: classes.drawer
                }}
                zIndex={29999}
            >
                MobileModalMenu
            </Drawer>
            <UnstyledButton onClick={open}>
                <Stack align="center" justify="center" gap={rem(4)}>
                    <IconHome size={rem(28)} />
                    <Text>Главная</Text>
                </Stack>
            </UnstyledButton>
        </>
    )
}