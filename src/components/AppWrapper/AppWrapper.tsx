"use client";

import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { DarkThemeKey } from "@/constants/configs";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";

export default function AppWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data: { theme, colors: { base } } } = useContext(ConfigsContext);
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