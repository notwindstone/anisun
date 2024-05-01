import {IconBrandSafari, IconSearch} from "@tabler/icons-react";
import {Button, Drawer, rem, Stack, Text, Title, UnstyledButton} from "@mantine/core";
import classes from "@/components/MobileModal/MobileModal.module.css";
import {useDisclosure} from "@mantine/hooks";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function MobileModalSearch() {
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
                title={
                    <Title order={2}>Поиск аниме</Title>
                }
            >
                <SearchBar close={close} />
            </Drawer>
            <UnstyledButton onClick={open}>
                <Stack align="center" justify="center" gap={rem(4)}>
                    <IconBrandSafari size={rem(28)} />
                    <Text>Навигация</Text>
                </Stack>
            </UnstyledButton>
        </>
    )
}