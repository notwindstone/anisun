import {IconBrandSafari, IconSettings, IconUserCircle} from "@tabler/icons-react";
import {Center, rem, Text, ThemeIcon, UnstyledButton} from "@mantine/core";
import classes from "@/components/MobileNavbar/MobileNavbar.module.css";
import {useDisclosure} from "@mantine/hooks";
import {usePathname, useRouter} from "next/navigation";
import {Sheet} from "react-modal-sheet";
import React from "react";
import NProgress from "nprogress";
import MobileNavbarLink from "@/components/MobileNavbar/MobileNavbarLink/MobileNavbarLink";

const ICON_STYLES = {
    size: 32,
    stroke: 1.5
};

export default function MobileNavbarNavigation() {
    const [opened, { open, close }] = useDisclosure(false);
    const pathname = usePathname();
    const router = useRouter();

    function redirect(link: string) {
        NProgress.start();
        router.push(link);
        NProgress.done();
    }

    const NAV_LINKS = [
        {
            label: "Мой профиль",
            func: () => redirect(''),
            icon: <IconUserCircle {...ICON_STYLES} />,
        },
        {
            label: "Настройки",
            func: () => redirect(''),
            icon: <IconSettings {...ICON_STYLES} />
        }
    ];

    return (
        <>
            <Sheet
                isOpen={opened}
                onClose={close}
                detent="content-height"
            >
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        <Sheet.Scroller>
                            {
                                NAV_LINKS.map((link) => {
                                    return (
                                        <MobileNavbarLink func={link.func} label={link.label}>
                                            {link.icon}
                                        </MobileNavbarLink>
                                    );
                                })
                            }
                        </Sheet.Scroller>
                    </Sheet.Content>
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