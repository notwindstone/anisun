import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { getNavbarItems } from "@/constants/navbar";
import { usePathname, useSearchParams } from "next/navigation";
import getRouteState from "@/utils/misc/getRouteStates";
import { InitialRouteStates } from "@/constants/app";
import useFuturePathname from "@/utils/stores/useFuturePathname";

const navbarBackground = {
    opened: {
        width: 80,
    },
    closed: {
        width: 48,
    },
};

export default function MobileNavbarButton({
    item,
    focused,
    setFocused,
}: {
    item: ReturnType<typeof getNavbarItems>[0];
    focused: string;
    setFocused: Dispatch<SetStateAction<string>>;
}) {
    const { data: {
        theme,
        colors: { accent },
    } } = useContextSelector(ConfigsContext, (value) => {
        return {
            data: value.data,
        };
    });
    const [backgroundProperties, setBackgroundProperties] = useState<{
        width:      number;
    }>(navbarBackground.opened);
    const [queriesStore, setQueriesStore] = useState<Record<
        typeof item.href,
        Record<string, string>
    >>(InitialRouteStates);
    const currentPathname = usePathname().split("/").slice(2).join("/");
    const searchParameters = useSearchParams();
    const setFuturePathname = useFuturePathname((state) => state.setFuturePathname);

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
        setBackgroundProperties(navbarBackground.closed);

        // Jetpack Compose UI like transition doesn't work without a timeout
        const timeout = setTimeout(() => {
            if (focused === item.href) {
                setBackgroundProperties(navbarBackground.opened);

                return;
            }
        }, 0);

        return () => clearTimeout(timeout);
    }, [focused, item.href]);

    useEffect(() => {
        setQueriesStore((state) => getRouteState({
            state,
            currentPathname,
            searchParameters,
        }));
    }, [item, currentPathname, searchParameters]);

    return (
        <Link
            // `null` by default, which means only static routes gonna fully prefetch
            // `true` allows for the full dynamic route prefetch
            prefetch
            className="mobile-navbar__button shrink-0 flex flex-col gap-2 text-xs xxs:text-sm items-center justify-center w-16 xxs:w-20"
            style={{
                ...(
                    focused === item.href ? {
                        color: parseTailwindColor({
                            color: accent,
                            step:  theme === DarkThemeKey ? 400 : 500,
                        }),
                    } : {}
                ),
            }}
            href={{
                pathname: item.href,
                query:    queriesStore[item.href],
            }}
            onClick={() => {
                setFuturePathname({
                    path: item.href,
                    date: Date.now(),
                });
                setFocused(item.href);
            }}
        >
            <div
                className="mobile-navbar__button-icon flex h-fit py-1 justify-center items-center rounded-full transition-sidebar duration-300"
                style={{
                    width: backgroundProperties.width,
                    ...(
                        focused === item.href ? {
                            backgroundColor,
                        } : {}
                    ),
                }}
            >
                {item.icon}
            </div>
            <p className="mobile-navbar__button-text text-center transition-colors duration-300 leading-none">
                {item.name}
            </p>
        </Link>
    );
}
