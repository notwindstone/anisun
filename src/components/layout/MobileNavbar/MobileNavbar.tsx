"use client";

import { useMediaQuery } from "@mantine/hooks";
import { DarkThemeKey } from "@/constants/configs";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { useEffect, useState } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { getNavbarItems } from "@/constants/navbar";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { Locales } from "@/constants/localization";
import { useContextSelector } from "use-context-selector";

const locales = new Set<string>(Locales);

export default function MobileNavbar({
    accountInfo,
}: {
    accountInfo: unknown;
}) {
    const pathname = usePathname()
        .split("/")
        .filter((word) => !locales.has(word))
        .join("/") || "/";
    const [focused, setFocused] = useState<string>(pathname);
    const { data: {
        theme,
        colors: { base, accent },
    }, dictionaries } = useContextSelector(ConfigsContext, (value) => {
        return {
            data:         value.data,
            dictionaries: value.dictionaries,
        };
    });
    const matches = useMediaQuery('(min-width: 640px)');

    useEffect(() => {
        setFocused(pathname);
    }, [pathname]);

    if (matches === true) {
        return;
    }

    let avatar: string | undefined;

    if (
        typeof accountInfo === "object"
        && accountInfo !== null
        && "avatar" in accountInfo
        && typeof accountInfo.avatar === "string"
    ) {
        avatar = accountInfo.avatar;
    }

    const navbarItems = getNavbarItems({
        dictionaries,
        avatar,
    });

    return (
        <>
            <div
                className="flex flex-row flex-nowrap px-8 py-1 justify-between sm:hidden transition-colors duration-200 overflow-hidden w-full h-16"
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
                            <React.Fragment key={item.href}>
                                <Link
                                    // `null` by default, which means only static routes gonna fully prefetch
                                    // `true` allows for the full dynamic route prefetch
                                    prefetch
                                    className="flex flex-col gap-1 text-sm items-center justify-center transition hover:brightness-125 dark:hover:brightness-75 w-24"
                                    style={focused === item.href ? {
                                        color: parseTailwindColor({
                                            color: accent,
                                            step:  500,
                                        }),
                                    } : undefined}
                                    href={item.href}
                                    onClick={() => setFocused(item.href)}
                                >
                                    {item.icon}
                                    <p className="text-center leading-none">
                                        {item.name}
                                    </p>
                                </Link>
                            </React.Fragment>
                        );
                    })
                }
            </div>
        </>
    );
}