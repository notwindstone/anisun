import { IconHomeFilled } from "@tabler/icons-react";
import {Drawer, rem, Stack, Text, ThemeIcon, UnstyledButton} from "@mantine/core";
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
            <UnstyledButton flex={1} onClick={open}>
                <Stack align="center" justify="center" gap={rem(4)}>
                    <ThemeIcon color="var(--animeth-nav-button-color)" w={rem(84)} h={36}>
                        <IconHomeFilled color="black" size={rem(28)} />
                    </ThemeIcon>
                    <Text>Навигация</Text>
                </Stack>
            </UnstyledButton>
        </>
    )
}