"use client";

import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import getSafeConfigValues from "@/utils/configs/getSafeConfigValues";
import { DarkThemeKey } from "@/constants/configs";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";

export default function AppWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data } = useContext(ConfigsContext);
    const { theme, colors: { base } } = getSafeConfigValues({ config: data });
    const darkThemeClass = theme === DarkThemeKey
        ? "dark"
        : "light";

    return (
        <div className={`${darkThemeClass} transition-colors`} style={{
            backgroundColor: theme === DarkThemeKey
                ? parseTailwindColor({
                    color: base,
                    step: 950,
                })
                : parseTailwindColor({
                    color: base,
                    step: 50,
                }),
            color: theme === DarkThemeKey
                ? "var(--dark-foreground)"
                : "var(--light-foreground)",
        }}>
            {children}
        </div>
    );
}