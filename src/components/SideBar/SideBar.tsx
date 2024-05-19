"use client"

import {CustomThemeContext, SideBarContext} from "@/utils/Contexts/Contexts";
import {useDisclosure, useLocalStorage, useMediaQuery} from "@mantine/hooks";
import {ThemeType} from "@/types/CustomThemeContext/Theme.type";
import defaultTheme from '@/configs/defaultTheme.json';
import {em, rem, Stack} from "@mantine/core";
import classes from './SideBar.module.css';
import SideBarBurger from "@/components/SideBar/SideBarBurger/SideBarBurger";
import React from "react";
import SideBarAccount from "@/components/SideBar/SideBarAccount/SideBarAccount";

export default function SideBar({ children }: { children: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure(false);
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
    const [theme, setTheme] = useLocalStorage<ThemeType>({
        key: 'settings',
        defaultValue: {
            color: defaultTheme.primaryColor,
            breadcrumb: true
        },
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
                        <SideBarBurger />
                        <SideBarAccount />
                    </Stack>
                </aside>
            </SideBarContext.Provider>
        </CustomThemeContext.Provider>
    )
}