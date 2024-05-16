"use client"

import {CustomThemeContext} from "@/utils/Contexts/Contexts";
import {useLocalStorage, useMediaQuery} from "@mantine/hooks";
import ThemeSchemeControl from "@/components/ThemeSchemeControl/ThemeSchemeControl";
import {ThemeType} from "@/types/CustomThemeContext/Theme.type";
import ColorSchemeControl from "@/components/ColorSchemeControl/ColorSchemeControl";
import defaultTheme from '@/configs/defaultTheme.json';
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
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
            <DecoratedButton>
                Кастомная кнопка в сайдбаре (в контексте)
            </DecoratedButton>
            <ThemeSchemeControl />
            <ColorSchemeControl />
        </CustomThemeContext.Provider>
    )
}