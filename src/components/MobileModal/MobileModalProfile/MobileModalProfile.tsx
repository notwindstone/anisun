import {useDisclosure} from "@mantine/hooks";
import classes from "@/components/MobileModal/MobileModal.module.css";
import {Center, Drawer, rem, Stack, Text, ThemeIcon, UnstyledButton} from "@mantine/core";
import {IconHomeFilled, IconMenu2} from "@tabler/icons-react";

export default function MobileModalProfile() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Drawer
                position="bottom"
                size="80vh"
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
            <Center flex={1}>
                <UnstyledButton onClick={open} className={classes.buttonWrapper}>
                    <ThemeIcon w={rem(86)} className={classes.button}>
                        <IconMenu2 className={classes.icon} size={rem(28)} />
                    </ThemeIcon>
                    <Text className={classes.text}>Настройки</Text>
                </UnstyledButton>
            </Center>
        </>
    )
}