"use client"

import {useMediaQuery} from "@mantine/hooks";
import {em, rem, Stack, UnstyledButton} from "@mantine/core";
import {
    IconHistory,
    IconHome,
    IconHomeFilled, IconMenu2,
    IconSearch,
    IconSettings,
    IconTrendingUp,
} from "@tabler/icons-react";
import classes from './SideBar.module.css';
import SideBarButton from "@/components/SideBar/SideBarButton/SideBarButton";
import React, {useState} from "react";
import {SideBarLink} from "@/types/SideBarLink";

const iconProps = {size: 32, stroke: 1.5}
const activeIconProps = {size: 32, stroke: 2.5}

const navLinks = [
    {
        label: 'Главная',
        icon: <IconHome {...iconProps} />,
        activeIcon: <IconHomeFilled {...activeIconProps} />,
    },
    {
        label: 'Поиск',
        icon: <IconSearch {...iconProps} />,
        activeIcon: <IconSearch {...activeIconProps} />,
    },
    {
        label: 'Популярное',
        icon: <IconTrendingUp {...iconProps} />,
        activeIcon: <IconTrendingUp {...activeIconProps} />,
    },
    {
        label: 'История',
        icon: <IconHistory {...iconProps} />,
        activeIcon: <IconHistory {...activeIconProps} />,
    },
    {
        label: 'Найстроки',
        icon: <IconSettings {...iconProps} />,
        activeIcon: <IconSettings {...activeIconProps} />,
    }
]

export const SideBarLinkContext
    = React.createContext<{
    active: number,
    setActive: React.Dispatch<number>
}>({
    active: 0,
    setActive: () => null
});

export default function SideBar() {
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
            <aside className={classes.sidebar}>
                <Stack
                    justify="flex-start"
                    align="center"
                >
                    <UnstyledButton
                        className={
                            `${classes.menuButton}`
                        }
                        onClick={() => console.log('')}
                        mb={rem(16)}
                    >
                        <IconMenu2 {...iconProps} />
                    </UnstyledButton>
                    <SideBarLinkContext.Provider value={{ active, setActive }}>
                        {navButtons}
                    </SideBarLinkContext.Provider>
                </Stack>
            </aside>
        </>
    )
}