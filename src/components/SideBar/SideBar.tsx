"use client"

import {CustomThemeContext} from "@/utils/Contexts/Contexts";
import {useLocalStorage} from "@mantine/hooks";
import ThemeSchemeControl from "@/components/ThemeSchemeControl/ThemeSchemeControl";
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
            <ThemeSchemeControl />

        </CustomThemeContext.Provider>
    )
}