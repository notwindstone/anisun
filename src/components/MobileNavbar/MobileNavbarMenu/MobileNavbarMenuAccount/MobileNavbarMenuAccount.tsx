import {Avatar, Box, Divider, NavLink, rem, Stack, ThemeIcon, Title} from "@mantine/core";
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import {SignedIn, SignedOut, SignOutButton, useUser} from "@clerk/nextjs";
import {IconLogout, IconSettings, IconUserCircle} from "@tabler/icons-react";
import NProgress from "nprogress";
import React, {useContext} from "react";
import {MobileNavbarModalsContext} from "@/utils/Contexts/Contexts";
import useCustomTheme from "@/hooks/useCustomTheme";
import classes from './MobileNavbarMenuAccount.module.css';
import {usePathname, useRouter} from "next/navigation";
import MobileNavbarLink from "@/components/MobileNavbar/MobileNavbarLink/MobileNavbarLink";
import {useTranslations} from "next-intl";

const ICON_STYLES = {
    size: 32,
    stroke: 1.5
};

export default function MobileNavbarMenuAccount({ close }: { close: () => void }) {
    const { theme } = useCustomTheme();
    const { user } = useUser();
    const { openSettings, openSignIn, openSignUp } = useContext(
        MobileNavbarModalsContext
    );
    const router = useRouter();
    const pathname = usePathname();
    const translate = useTranslations('Translations');
    const info = useTranslations('Info');
    const locale = info('locale');

    function pushToProfile() {
        if (!user) {
            return;
        }

        const accountURL = `/${locale}/account/${user.id}`;

        close();
        NProgress.start();
        router.push(accountURL);

        if (accountURL === pathname) {
            return NProgress.done();
        }
    }

    function toggleSettings() {
        openSettings();
        close();
    }

    function signOut() {
        NProgress.start();
        NProgress.done();
        close();
    }

    function signIn() {
        openSignIn();
        close();
    }

    function signUp() {
        openSignUp();
        close();
    }

    const NAV_LINKS = [
        {
            label: translate("common__my-profile-label"),
            func: pushToProfile,
            icon: <IconUserCircle {...ICON_STYLES} />,
        },
        {
            label: translate("common__settings-label"),
            func: toggleSettings,
            icon: <IconSettings {...ICON_STYLES} />
        }
    ];

    return (
        <>
            <Stack w="90%" align="center" gap={rem(8)}>
                <SignedIn>
                    <Avatar
                        src={user?.imageUrl ?? '/blurred.png'}
                        size={rem(64)}
                        alt={`User profile picture of ${user?.username}`}
                    >
                        {user?.username?.[0]}
                    </Avatar>
                    <Title order={2} pb={rem(8)}>
                        {user?.username ?? translate('common__account-placeholder-label')}
                    </Title>
                    <Divider my={rem(16)} w="100%" />
                    <Stack w="100%">
                        {
                            NAV_LINKS.map((navLink) => {
                                return (
                                    <MobileNavbarLink key={navLink.label} func={navLink.func} label={navLink.label}>
                                        {navLink.icon}
                                    </MobileNavbarLink>
                                );
                            })
                        }
                    </Stack>
                    <Divider my={rem(16)} w="100%" />
                    <SignOutButton>
                        {/* It doesn't work with <MobileNavbarLink /> component somehow */}
                        <NavLink
                            h={48}
                            classNames={{
                                root: classes.root,
                                label: classes.label
                            }}
                            onClick={signOut}
                            label={translate('common__quit-label')}
                            leftSection={
                                <ThemeIcon
                                    size={48}
                                    color={theme.color}
                                    radius="md"
                                    variant="light"
                                >
                                    <IconLogout {...ICON_STYLES} />
                                </ThemeIcon>
                            }
                        />
                    </SignOutButton>
                </SignedIn>
                <SignedOut>
                    <Box
                        w={rem(64)}
                        h={rem(64)}
                    >
                        <IconUserCircle size={64} stroke={1.5} />
                    </Box>
                    <Title order={2}>
                        {translate('common__account-placeholder-label')}
                    </Title>
                    <Stack pt={rem(16)} gap={rem(8)}>
                        <DecoratedButton onClick={signIn}>
                            {translate('common__sign-in-label')}
                        </DecoratedButton>
                        <DecoratedButton onClick={signUp}>
                            {translate('common__sign-up-label')}
                        </DecoratedButton>
                    </Stack>
                </SignedOut>
            </Stack>
        </>
    );
}