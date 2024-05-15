"use client"

import {CustomThemeContext} from "@/utils/Contexts";
import {useLocalStorage} from "@mantine/hooks";
import ColorSchemeControl from "@/components/ColorSchemeControl/ColorSchemeControl";
import BaseButton from "@/components/BaseButton/BaseButton";

export default function SideBar() {
    const [theme, setTheme] = useLocalStorage({
        key: 'settings',
        defaultValue: {
            color: "violet",
            breadcrumb: true
        },
    })

    return (
        <CustomThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
            <ColorSchemeControl />
            <BaseButton />
        </CustomThemeContext.Provider>
    )
}