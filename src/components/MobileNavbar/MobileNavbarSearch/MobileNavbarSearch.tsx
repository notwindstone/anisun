import {IconBrandSafari} from "@tabler/icons-react";
import {Center, Drawer, rem, Text, ThemeIcon, Title, UnstyledButton} from "@mantine/core";
import classes from "@/components/MobileNavbar/MobileNavbar.module.css";
import {useDisclosure} from "@mantine/hooks";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function MobileNavbarSearch() {
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
                <SearchBar size="xl" />
            </Drawer>
            <Center flex={1}>
                <UnstyledButton onClick={open} className={classes.buttonWrapper}>
                    <ThemeIcon className={classes.button}>
                        <IconBrandSafari className={classes.icon} stroke={1.5} size={rem(28)} />
                    </ThemeIcon>
                    <Text className={classes.text}>Поиск</Text>
                </UnstyledButton>
            </Center>
        </>
    );
}