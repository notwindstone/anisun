"use client";

import { DarkThemeKey } from "@/constants/configs";
import parseTailwindColor from "@/lib/appearance/parseTailwindColor";
import { useEffect, useMemo, useState } from "react";
import { ConfigsContext } from "@/lib/providers/ConfigsProvider";
import { getNavbarItems } from "@/constants/navbar";
import React from "react";
import { usePathname } from "next/navigation";
import { Locales } from "@/constants/localization";
import { useContextSelector } from "use-context-selector";
import MobileNavbarButton from "@/components/layout/MobileNavbarButton/MobileNavbarButton";

const locales = new Set<string>(Locales);

export default function MobileNavbar({
    navbarItems,
}: {
    navbarItems: ReturnType<typeof getNavbarItems>;
}) {
    const pathname = usePathname()
        .split("/")
        .filter((word) => !locales.has(word))
        .join("/") || "/";
    const [focused, setFocused] = useState<string>(pathname);
    const { theme, base, accent } = useContextSelector(ConfigsContext, (value) => {
        return {
            theme:  value.data.theme,
            base:   value.data.colors.base,
            accent: value.data.colors.accent,
        };
    });

    // `oklch(percent number number)`
    const backgroundColorArray = [ ...parseTailwindColor({
        color: accent,
        step:  theme === DarkThemeKey ? 400 : 500,
    }) ];

    // remove `)`
    backgroundColorArray.pop();
    backgroundColorArray.push(" / 0.15)");

    const backgroundColor = backgroundColorArray.join("");

    useEffect(() => {
        setFocused(pathname);
    }, [pathname]);

    return useMemo(
        () => (
            <div
                className="mobile-navbar__wrapper flex flex-row flex-nowrap px-2 py-1 justify-between sm:hidden transition-colors duration-200 overflow-hidden w-full h-20"
                style={{
                    backgroundColor: theme === DarkThemeKey
                        ? parseTailwindColor({
                            color: base,
                            step:  900,
                        })
                        : parseTailwindColor({
                            color: base,
                            step:  100,
                        }),
                }}
            >
                {
                    navbarItems.map((item) => {
                        return (
                            <MobileNavbarButton
                                key={item.href}
                                item={item}
                                focused={focused}
                                setFocused={setFocused}
                                backgroundColor={backgroundColor}
                            />
                        );
                    })
                }
            </div>
        ),
        [backgroundColor, theme, base, focused, setFocused, navbarItems],
    );
}
