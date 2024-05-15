"use client"

import {CustomThemeContext} from "@/utils/Contexts";
import {useLocalStorage} from "@mantine/hooks";
import ColorSchemeControl from "@/components/ColorSchemeControl/ColorSchemeControl";
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import {ThemeType} from "@/types/CustomThemeContext/Theme.type";

export default function SideBar() {
    const [theme, setTheme] = useLocalStorage<ThemeType>({
        key: 'settings',
        defaultValue: {
            color: "violet",
            breadcrumb: true
        },
    })

    return (
        <CustomThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
            <ColorSchemeControl />
            <DecoratedButton
            >
                Сменить цвет
            </DecoratedButton>
        </CustomThemeContext.Provider>
    )
}