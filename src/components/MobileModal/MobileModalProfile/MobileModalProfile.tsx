import {useDisclosure} from "@mantine/hooks";
import classes from "@/components/MobileModal/MobileModal.module.css";
import {Drawer, rem, Stack, Text, UnstyledButton} from "@mantine/core";
import {IconMenu2} from "@tabler/icons-react";

export default function MobileModalProfile() {
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
                MobileModalProfile
            </Drawer>
            <UnstyledButton onClick={open}>
                <Stack align="center" justify="center" gap={rem(4)}>
                    <IconMenu2 size={rem(28)} />
                    <Text>Ещё</Text>
                </Stack>
            </UnstyledButton>
        </>
    )
}