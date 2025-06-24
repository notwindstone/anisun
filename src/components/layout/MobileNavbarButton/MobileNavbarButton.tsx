import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import Link from "next/link";
import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
    startTransition,
} from "react";
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
        startTransition(() => {
            setBackgroundProperties(navbarBackground.closed);
        });

        if (focused !== item.href) {
            return;
        }

        // Jetpack Compose UI like transition doesn't work without a timeout
        startTransition(() => {
            setBackgroundProperties(navbarBackground.opened);
        });
    }, [focused, item.href]);

    return (
        <Link
            // `null` by default, which means only static routes gonna fully prefetch
            // `true` allows for the full dynamic route prefetch
            prefetch
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

                startTransition(() => {
                    setFocused(item.href);
                });
            }}
        >
            <div
                className="mobile-navbar__button-icon relative flex h-fit py-1 justify-center items-center rounded-full transition-mobile-navbar-button duration-300"
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
