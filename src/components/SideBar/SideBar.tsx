"use client"

import {CustomThemeContext} from "@/utils/Contexts/Contexts";
import {useLocalStorage} from "@mantine/hooks";
import ThemeSchemeControl from "@/components/ThemeSchemeControl/ThemeSchemeControl";
import {ThemeType} from "@/types/CustomThemeContext/Theme.type";
import ColorSchemeControl from "@/components/ColorSchemeControl/ColorSchemeControl";
import defaultTheme from '@/configs/defaultTheme.json';
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";

export default function SideBar() {
    const [theme, setTheme] = useLocalStorage<ThemeType>({
        key: 'settings',
        defaultValue: {
            color: defaultTheme.primaryColor,
            breadcrumb: true
        },
    })

    return (
        <CustomThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
            <DecoratedButton>
                Кастомная кнопка в сайдбаре (в контексте)
            </DecoratedButton>
            <ThemeSchemeControl />
            <ColorSchemeControl />
        </CustomThemeContext.Provider>
    )
}