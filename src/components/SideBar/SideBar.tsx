"use client"

import {CustomThemeContext, SideBarContext} from "@/utils/Contexts/Contexts";
import {useDisclosure, useLocalStorage, useMediaQuery} from "@mantine/hooks";
import {ThemeType} from "@/types/CustomThemeContext/Theme.type";
import defaultTheme from '@/configs/defaultTheme.json';
import {em} from "@mantine/core";
import classes from './SideBar.module.css';

export default function SideBar() {
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
            <SideBarContext.Provider value={{ opened: opened }}>
                <aside
                    className={classes.sidebar}
                >
                    1234
                </aside>
            </SideBarContext.Provider>
        </CustomThemeContext.Provider>
    )
}