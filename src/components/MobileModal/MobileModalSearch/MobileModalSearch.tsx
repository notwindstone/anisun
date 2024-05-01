import {IconBrandSafari, IconSearch} from "@tabler/icons-react";
import {Button, Center, Drawer, rem, Stack, Text, ThemeIcon, Title, UnstyledButton} from "@mantine/core";
import classes from "@/components/MobileModal/MobileModal.module.css";
import {useDisclosure} from "@mantine/hooks";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function MobileModalSearch() {
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
                title={
                    <Title order={2}>Поиск аниме</Title>
                }
            >
                <SearchBar close={close} />
            </Drawer>
            <Center flex={1}>
                <UnstyledButton onClick={open} className={classes.buttonWrapper}>
                    <ThemeIcon className={classes.button}>
                        <IconBrandSafari className={classes.icon} size={rem(28)} />
                    </ThemeIcon>
                    <Text className={classes.text}>Поиск</Text>
                </UnstyledButton>
            </Center>
        </>
    )
}