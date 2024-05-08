"use client"

import {useMediaQuery} from "@mantine/hooks";
import {em, Stack} from "@mantine/core";
import {IconHome, IconHomeFilled, IconSearch, IconTrendingUp} from "@tabler/icons-react";
import classes from './SideBar.module.css';
import SideBarButton from "@/components/SideBar/SideBarButton/SideBarButton";
import React, {useState} from "react";
import {SideBarLink} from "@/types/SideBarLink";

const navLinks = [
    {
        label: 'Главная',
        icon: <IconHome size={32} stroke={1.5} />,
        activeIcon: <IconHomeFilled size={32} stroke={3} />,
    },
    {
        label: 'Поиск',
        icon: <IconSearch size={32} stroke={1.5} />,
        activeIcon: <IconSearch size={32} stroke={3} />,
    },
    {
        label: 'Популярное',
        icon: <IconTrendingUp size={32} stroke={1.5} />,
        activeIcon: <IconTrendingUp size={32} stroke={3} />,
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
                    <SideBarLinkContext.Provider value={{ active, setActive }}>
                        {navButtons}
                    </SideBarLinkContext.Provider>
                </Stack>
            </aside>
        </>
    )
}