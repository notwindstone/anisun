import {IconBrandSafari, IconHome, IconTrendingUp} from "@tabler/icons-react";
import {Box, Center, Divider, rem, Stack, Text, ThemeIcon, Title, UnstyledButton} from "@mantine/core";
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

        if (link === pathname) {
            NProgress.done();
        }
    }

    const NAV_LINKS = [
        {
            label: "Главная",
            func: () => redirect('/'),
            icon: <IconHome {...ICON_STYLES} />,
        },
        {
            label: "Популярное",
            func: () => redirect('/trending'),
            icon: <IconTrendingUp {...ICON_STYLES} />
        },

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
                            <Box pb={rem(16)}>
                                <Title
                                    c="var(--animeth-text-contrast-color)"
                                >
                                    Навигация
                                </Title>
                                <Divider my={rem(16)} w="100%" />
                                <Stack gap={rem(16)}>
                                    {
                                        NAV_LINKS.map((link) => {
                                            return (
                                                <MobileNavbarLink key={link.label} func={link.func} label={link.label}>
                                                    {link.icon}
                                                </MobileNavbarLink>
                                            );
                                        })
                                    }
                                </Stack>
                            </Box>
                        </Sheet.Scroller>
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop onTap={close} />
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