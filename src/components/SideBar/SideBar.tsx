"use client"

import {CustomThemeContext, SideBarContext} from "@/utils/Contexts/Contexts";
import {useDisclosure, useLocalStorage, useMediaQuery} from "@mantine/hooks";
import {ThemeType} from "@/types/CustomThemeContext/Theme.type";
import defaultTheme from '@/configs/defaultTheme.json';
import {em, rem, Stack} from "@mantine/core";
import {
    IconHome,
    IconSearch,
    IconSettings,
    IconTrendingUp,
    IconUserCircle,
} from "@tabler/icons-react";
import classes from './SideBar.module.css';
import SideBarBurger from "@/components/SideBar/SideBarBurger/SideBarBurger";
import React from "react";
import SideBarAccount from "@/components/SideBar/SideBarAccount/SideBarAccount";
import SideBarButton from "@/components/SideBar/SideBarButton/SideBarButton";
import useCustomTheme from "@/hooks/useCustomTheme";
import ThemeSchemeControl from "@/components/ThemeSchemeControl/ThemeSchemeControl";
import ColorSchemeControl from "@/components/ColorSchemeControl/ColorSchemeControl";
import {variables} from "@/configs/variables";
import SideBarSettings from "@/components/SideBar/SideBarSettings/SideBarSettings";

const SIDEBAR_BUTTONS = [
    {
        key: 'main',
        content: <></>
    },
    {
        key: 'search',
        content: <></>
    },
    {
        key: 'trending',
        content: <></>
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
                        {buttons}
                        <SideBarAccount />
                    </Stack>
                </aside>
            </SideBarContext.Provider>
        </CustomThemeContext.Provider>
    )
}