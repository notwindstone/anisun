import { IconHomeFilled } from "@tabler/icons-react";
import {Center, Drawer, rem, Text, ThemeIcon, UnstyledButton} from "@mantine/core";
import classes from "@/components/MobileModal/MobileModal.module.css";
import {useDisclosure} from "@mantine/hooks";

export default function MobileModalMenu() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Drawer
                position="bottom"
                size="60vh"
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
            <Center flex={1}>
                <UnstyledButton onClick={open} className={classes.buttonWrapper}>
                    <ThemeIcon w={rem(86)} className={classes.button}>
                        <IconHomeFilled className={classes.icon} size={rem(28)} />
                    </ThemeIcon>
                    <Text className={classes.text}>Навигация</Text>
                </UnstyledButton>
            </Center>
        </>
    )
}