import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { getNavbarItems } from "@/constants/navbar";
import useFuturePathname from "@/utils/stores/useFuturePathname";
import useQueriesStore from "@/utils/stores/useQueriesStore";

const navbarBackground = {
    opened: {
        width: 80,
    },
    closed: {
        width: 48,
    },
};
const optimisticallyRender = true;

export default function MobileNavbarButton({
    item,
    focused,
    setFocused,
    backgroundColor,
}: {
    item: ReturnType<typeof getNavbarItems>[0];
    focused: string;
    setFocused: Dispatch<SetStateAction<string>>;
    backgroundColor: string;
}) {
    const renderReference = useRef(1);
    console.log(`${item.name} Button re-rendered ${renderReference.current++} times`);
    const buttonReference = useRef<HTMLAnchorElement>(null);
    const { theme, accent } = useContextSelector(ConfigsContext, (value) => {
        return {
            theme:  value.data.theme,
            accent: value.data.colors.accent,
        };
    });
    const [backgroundProperties, setBackgroundProperties] = useState<{
        width: number;
    }>(navbarBackground.opened);
    const queriesState = useQueriesStore((state) => state.queriesState);
    const setFuturePathname = useFuturePathname((state) => state.setFuturePathname);

    useEffect(() => {
        if (!optimisticallyRender) {
            buttonReference.current?.blur?.();
        }

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

    return (
        <Link
            // `null` by default, which means only static routes gonna fully prefetch
            // `true` allows for the full dynamic route prefetch
            prefetch
            ref={buttonReference}
            className="mobile-navbar__button group shrink-0 flex flex-col gap-2 text-xs xxs:text-sm items-center justify-center w-16 xxs:w-20"
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
                query:    queriesState[item.href],
            }}
            // fires on click
            onClick={() => {
                setFuturePathname({
                    path: item.href,
                    date: Date.now(),
                });

                if (!optimisticallyRender) {
                    return;
                }

                setFocused(item.href);
            }}
            // fires after route is loaded
            // this means that if user's internet is bad af, `onNavigate` will be delayed noticeably
            onNavigate={() => {
                if (optimisticallyRender) {
                    return;
                }

                setFocused(item.href);
            }}
        >
            <div
                className={`mobile-navbar__button-icon relative flex h-fit py-1 justify-center items-center rounded-full transition-mobile-navbar-button duration-300 ${optimisticallyRender ? "" : "group-focus:before:opacity-100 before:opacity-0 before:transition-opacity before:duration-150 before:bg-[theme(colors.white/.03)] before:absolute before:top-0 before:left-[50%] before:translate-x-[-50%] before:w-20 before:h-full before:rounded-full"}`}
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
            <p className="mobile-navbar__button-text select-none text-center transition-colors duration-300 leading-none">
                {item.name}
            </p>
        </Link>
    );
}
