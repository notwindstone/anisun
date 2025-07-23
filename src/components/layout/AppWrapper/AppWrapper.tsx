"use client";

import { ConfigsContext } from "@/lib/providers/ConfigsProvider";
import { DarkThemeKey, SidebarLeftPosition } from "@/constants/configs";
import parseTailwindColor from "@/lib/appearance/parseTailwindColor";
import { useContextSelector } from "use-context-selector";
import TopLoader from "@/components/layout/TopLoader/TopLoader";
import { SidebarConfigContext } from "@/lib/providers/SidebarConfigProvider";
import { useMemo } from "react";

export default function AppWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { theme, colors: { base } } = useContextSelector(ConfigsContext, (value) => value.data);
    const sidebarConfig = useContextSelector(SidebarConfigContext, (value) => value.data);
    const darkThemeClass = theme === DarkThemeKey
        ? "dark"
        : "light";
    const layoutClassNames = sidebarConfig.position === SidebarLeftPosition
        ? "flex-col sm:flex-row"
        : "flex-col sm:flex-row-reverse";

    const memoizedTopLoader = useMemo(() => (
        <TopLoader />
    ), []);
    const memoizedChildren = useMemo(() => (
        <>
            {children}
        </>
    ), [children]);

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
            {memoizedTopLoader}
            <main
                className={`w-full h-[100svh] flex flex-nowrap gap-0 ${layoutClassNames}`}
            >
                {memoizedChildren}
            </main>
        </div>
    );
}
