"use client"

import {CustomThemeContext} from "@/utils/Contexts/Contexts";
import {useLocalStorage, useMediaQuery} from "@mantine/hooks";
import {ThemeType} from "@/types/CustomThemeContext/Theme.type";
import defaultTheme from '@/configs/defaultTheme.json';
import {em} from "@mantine/core";

export default function SideBar() {
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

        </CustomThemeContext.Provider>
    )
}