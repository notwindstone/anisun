import {
    IconBrandSafari,
    IconChevronLeft,
    IconChevronRight,
    IconHome,
    IconReload,
    IconTrendingUp
} from "@tabler/icons-react";
import {
    ActionIcon,
    Box,
    Center,
    Divider,
    Group,
    rem,
    Stack,
    Text,
    ThemeIcon,
    Title,
    UnstyledButton
} from "@mantine/core";
import classes from "@/components/MobileNavbar/MobileNavbar.module.css";
import {useDisclosure} from "@mantine/hooks";
import {usePathname, useRouter} from "next/navigation";
import {Sheet} from "react-modal-sheet";
import React from "react";
import NProgress from "nprogress";
import MobileNavbarLink from "@/components/MobileNavbar/MobileNavbarLink/MobileNavbarLink";
import {useTranslations} from "next-intl";
import useCustomTheme from "@/hooks/useCustomTheme";
import {useQueryClient} from "@tanstack/react-query";

const ICON_STYLES = {
    size: 32,
    stroke: 1.5
};

export default function MobileNavbarNavigation() {
    const { theme } = useCustomTheme();
    const translate = useTranslations('Translations');
    const [opened, { open, close }] = useDisclosure(false);
    const pathname = usePathname();
    const router = useRouter();
    const info = useTranslations('Info');
    const locale = info('locale');
    const queryClient = useQueryClient();

    function redirect(link: string) {
        NProgress.start();
        router.push(link);

        if (link === pathname) {
            NProgress.done();
        }
    }

    function reloadPage() {
        NProgress.start();
        router.refresh();
        queryClient.clear();
        NProgress.done();
    }

    function navigateBack() {
        NProgress.start();
        router.back();
        NProgress.done();
    }

    function navigateForward() {
        NProgress.start();
        router.forward();
        NProgress.done();
    }

    const NAV_LINKS = [
        {
            label: translate('common__home-label'),
            func: () => redirect(`/${locale}`),
            icon: <IconHome {...ICON_STYLES} />,
        },
        {
            label: translate('common__trending-placeholder'),
            func: () => redirect(`/${locale}/trending`),
            icon: <IconTrendingUp {...ICON_STYLES} />
        },
    ];

    const NAV_BUTTONS = [
        {
            key: 'back',
            func: navigateBack,
            icon: <IconChevronLeft {...ICON_STYLES} />,
        },
        {
            key: 'forward',
            func: navigateForward,
            icon: <IconChevronRight {...ICON_STYLES} />,
        },
        {
            key: 'reload',
            func: reloadPage,
            icon: <IconReload {...ICON_STYLES} />,
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
                                <Group justify="space-between" wrap="nowrap">
                                    <Title
                                        c="var(--anisun-text-contrast-color)"
                                    >
                                        {translate('common__navigation-label')}
                                    </Title>
                                    <Group wrap="nowrap">
                                        {
                                            NAV_BUTTONS.map((link) => {
                                                return (
                                                    <ActionIcon
                                                        key={link.key}
                                                        color={theme.color}
                                                        variant="light"
                                                        size={48}
                                                        radius="md"
                                                        onClick={link.func}
                                                    >
                                                        {link.icon}
                                                    </ActionIcon>
                                                );
                                            })
                                        }
                                    </Group>
                                </Group>
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
                    <Text className={classes.text}>
                        {translate('common__navigation-label')}
                    </Text>
                </UnstyledButton>
            </Center>
        </>
    );
}