"use client";

import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { DarkThemeKey } from "@/constants/configs";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { useContextSelector } from "use-context-selector";

export default function AppWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { theme, colors: { base } } = useContextSelector(ConfigsContext, (value) => value.data);
    const darkThemeClass = theme === DarkThemeKey
        ? "dark"
        : "light";

    return (
        <div className={`${darkThemeClass} transition-colors duration-200`} style={{
            backgroundColor: theme === DarkThemeKey
                ? parseTailwindColor({
                    color: base,
                    step:  950,
                })
                : parseTailwindColor({
                    color: base,
                    step:  50,
                }),
            color: theme === DarkThemeKey
                ? "var(--dark-foreground)"
                : "var(--light-foreground)",
        }}>
            {children}
        </div>
    );
}