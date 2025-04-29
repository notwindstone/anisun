"use client";

import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { DarkThemeKey } from "@/constants/configs";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";

export default function SidebarWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data: { theme, colors: { base } } } = useContext(ConfigsContext);

    return (
        <>
            <div
                className="shrink-0 w-8 sm:w-64 h-full transition-colors overflow-hidden"
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
                }}
            >
                {children}
            </div>
        </>
    );
}