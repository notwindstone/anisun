import {IconBrandSafari} from "@tabler/icons-react";
import {Center, Drawer, rem, Text, ThemeIcon, UnstyledButton} from "@mantine/core";
import classes from "@/components/MobileNavbar/MobileNavbar.module.css";
import {useDisclosure} from "@mantine/hooks";
import {usePathname} from "next/navigation";
import {Sheet} from "react-modal-sheet";

export default function MobileNavbarNavigation() {
    const [opened, { open, close }] = useDisclosure(false);
    const pathname = usePathname();

    return (
        <>
            <Sheet isOpen={opened} onClose={close}>
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>{/* Your sheet content goes here */}</Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
            <Center flex={1}>
                <UnstyledButton onClick={open} className={classes.buttonWrapper}>
                    <ThemeIcon className={`${classes.button} ${pathname === "/" && classes.activeButton}`}>
                        <IconBrandSafari className={classes.icon} stroke={1.5} size={rem(28)} />
                    </ThemeIcon>
                    <Text className={classes.text}>Навигация</Text>
                </UnstyledButton>
            </Center>
        </>
    );
}