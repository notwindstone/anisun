import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { getNavbarItems } from "@/constants/navbar";

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
    const [backgroundWidth, setBackgroundWidth] = useState(48);
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
        setBackgroundWidth(48);

        // Jetpack Compose UI like transition doesn't work without a timeout
        const timeout = setTimeout(() => {
            if (focused === item.href) {
                setBackgroundWidth(80);

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
            className="shrink-0 flex flex-col gap-2 text-xs xxs:text-sm items-center justify-center w-16 xxs:w-20"
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
            href={item.href}
            onClick={() => setFocused(item.href)}
        >
            <div
                className="flex h-fit py-1 justify-center items-center rounded-full transition-sidebar duration-300"
                style={{
                    width: backgroundWidth,
                    ...(
                        focused === item.href ? {
                            backgroundColor,
                        } : {}
                    ),
                }}
            >
                {item.icon}
            </div>
            <p className="text-center transition-colors duration-300 leading-none">
                {item.name}
            </p>
        </Link>
    );
}
