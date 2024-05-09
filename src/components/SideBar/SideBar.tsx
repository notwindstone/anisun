"use client"

import {useDisclosure, useMediaQuery} from "@mantine/hooks";
import {em, Group, Image, rem, Stack, Text, Transition, UnstyledButton} from "@mantine/core";
import {
    IconHistory,
    IconHome,
    IconHomeFilled, IconMenu2,
    IconSearch,
    IconSettings,
    IconTrendingUp, IconUserCircle,
} from "@tabler/icons-react";
import classes from './SideBar.module.css';
import SideBarButton from "@/components/SideBar/SideBarButton/SideBarButton";
import React, {useState} from "react";
import {SideBarLink} from "@/types/SideBarLink";
import NextImage from "next/image";
import globalVariables from "@/configs/globalVariables.json";

const iconProps = {size: 32, stroke: 1.5}
const activeIconProps = {size: 32, stroke: 2.5}

const navLinks = [
    {
        label: 'Главная',
        icon: <IconHome {...iconProps} />,
        activeIcon: <IconHomeFilled {...activeIconProps} />,
        pathname: '/',
    },
    {
        label: 'Аккаунт',
        icon: <IconUserCircle {...iconProps} />,
        activeIcon: <IconUserCircle {...activeIconProps} />,
        content: <></>,
    },
    {
        label: 'Поиск',
        icon: <IconSearch {...iconProps} />,
        activeIcon: <IconSearch {...activeIconProps} />,
        content: <></>,
    },
    {
        label: 'Популярное',
        icon: <IconTrendingUp {...iconProps} />,
        activeIcon: <IconTrendingUp {...activeIconProps} />,
        pathname: '/trending',
    },
    {
        label: 'История',
        icon: <IconHistory {...iconProps} />,
        activeIcon: <IconHistory {...activeIconProps} />,
        pathname: '/history',
    },
    {
        label: 'Настройки',
        icon: <IconSettings {...iconProps} />,
        activeIcon: <IconSettings {...activeIconProps} />,
        content: <></>,
    }
]

export const SideBarLinkContext
    = React.createContext<{
    active: number,
    setActive: React.Dispatch<number>,
    opened: boolean,
}>({
    active: 0,
    setActive: () => null,
    opened: false,
});

export default function SideBar() {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(0)
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
    const navButtons = navLinks.map((link: SideBarLink, index) => {
        return (
            <SideBarButton
                key={link.label}
                link={link}
                order={index}
            />
        )
    })

    return isMobile === false && (
        <>
            <aside
                className={
                    `${classes.sidebar} ${opened && classes.opened}`
                }
            >
                <Stack
                    ml={rem(16)}
                    justify="flex-start"
                    align="flex-start"
                >
                    <Group
                        align="center"
                        gap={rem(16)}
                        wrap="nowrap"
                        mb={rem(16)}
                    >
                        <UnstyledButton
                            className={
                                `${classes.menuButton}`
                            }
                            onClick={toggle}
                        >
                            <IconMenu2 {...iconProps} />
                        </UnstyledButton>
                        <Transition
                            mounted={opened}
                            transition="fade-right"
                            duration={150}
                            timingFunction="ease"
                        >
                            {
                                (styles) => (
                                    <Group style={styles} align="center" wrap="nowrap">
                                        <Image
                                            alt="Animeth website icon"
                                            src="/favicon.png"
                                            radius="xl"
                                            w={32}
                                            h={32}
                                            component={NextImage}
                                            width={32}
                                            height={32}
                                            placeholder="blur"
                                            blurDataURL={globalVariables.imagePlaceholder}
                                        />
                                        <Text
                                            inline
                                            size={rem(32)}
                                            fw={700}
                                            variant="gradient"
                                            gradient={{ from: 'violet', to: 'indigo', deg: 90 }}
                                        >
                                            ANIMETH
                                        </Text>
                                    </Group>
                                )
                            }
                        </Transition>
                    </Group>
                    <SideBarLinkContext.Provider value={{ active, setActive, opened }}>
                        {navButtons}
                    </SideBarLinkContext.Provider>
                </Stack>
            </aside>
        </>
    )
}