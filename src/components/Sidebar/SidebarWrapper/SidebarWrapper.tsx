"use client";

import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import getSafeConfigValues from "@/utils/configs/getSafeConfigValues";
import { DarkThemeKey } from "@/constants/configs";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";

export default function SidebarWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data } = useContext(ConfigsContext);
    const { theme, colors: { base } } = getSafeConfigValues({ config: data });

    return (
        <>
            <div
                className="shrink-0 w-64 h-full border-r-[1px] transition-colors"
                style={{
                    backgroundColor: theme === DarkThemeKey
                        ? parseTailwindColor({
                            color: base,
                            step: 900,
                        })
                        : parseTailwindColor({
                            color: base,
                            step: 100,
                        }),
                    borderColor: theme === DarkThemeKey
                        ? parseTailwindColor({
                            color: base,
                            step: 800,
                        })
                        : parseTailwindColor({
                            color: base,
                            step: 400,
                        }),
                }}
            >
                {children}
            </div>
        </>
    );
}