"use client"

import {CustomThemeContext, SideBarContext} from "@/utils/Contexts/Contexts";
import {useDisclosure, useMediaQuery} from "@mantine/hooks";
import {em, rem, Stack} from "@mantine/core";
import classes from './SideBar.module.css';
import SideBarBurger from "@/components/SideBar/SideBarBurger/SideBarBurger";
import React from "react";
import SideBarAccount from "@/components/SideBar/SideBarAccount/SideBarAccount";
import useCustomTheme from "@/hooks/useCustomTheme";
import SideBarSettings from "@/components/SideBar/SideBarSettings/SideBarSettings";
import SideBarHome from "@/components/SideBar/SideBarHome/SideBarHome";
import SideBarTrending from "@/components/SideBar/SideBarTrending/SideBarTrending";
import SideBarSearch from "@/components/SideBar/SideBarSearch/SideBarSearch";

const SIDEBAR_BUTTONS = [
    {
        key: 'main',
        content: <SideBarHome />
    },
    {
        key: 'trending',
        content: <SideBarTrending />
    },
    {
        key: 'search',
        content: <SideBarSearch />
    },
    {
        key: 'settings',
        content: <SideBarSettings />
    },
]

export default function SideBar({ children }: { children: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure(false);
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
    const { theme, setTheme } = useCustomTheme()

    const buttons = SIDEBAR_BUTTONS.map((button) => {
        return (
            <React.Fragment key={button.key}>
                {button.content}
            </React.Fragment>
        )
    })

    return isMobile === false && (
        <CustomThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
            <SideBarContext.Provider value={{ opened: opened, toggle: toggle }}>
                {children}
                <aside
                    className={
                        `${classes.sidebar} ${opened && classes.opened}`
                    }
                >
                    <Stack
                        ml={rem(16)}
                        justify="space-between"
                        align="flex-start"
                    >
                        <SideBarBurger />
                        <Stack>
                            {buttons}
                        </Stack>
                        <SideBarAccount />
                    </Stack>
                </aside>
            </SideBarContext.Provider>
        </CustomThemeContext.Provider>
    )
}