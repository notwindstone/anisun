"use client";

import Link from "next/link";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";

export default function Page() {
    const { dictionaries, accent, theme } = useContextSelector(ConfigsContext, (value) => {
        return {
            dictionaries: value.dictionaries,
            accent:       value.data.colors.accent,
            theme:        value.data.theme,
        };
    });
    const isDark = theme === DarkThemeKey;

    return (
        <div className="flex flex-col justify-center items-center p-4 mx-auto max-w-384 w-full h-[100svh] gap-4 text-balance text-center text-black dark:text-white">
            <p
                className="text-6xl sm:text-9xl font-black pb-2 sm:pb-4"
                style={{
                    color: parseTailwindColor({
                        color: accent,
                        step:  isDark ? 400 : 500,
                    }),
                }}
            >
                Oops!
            </p>
            <p className="text-xl sm:text-3xl font-bold">
                Page not found
            </p>
            <p className="text-md sm:text-lg">
                The page you are looking for might have been removed, had its name changed or is temporarily unavailable.
            </p>
            <Link
                prefetch
                className={`text-center text-balance flex gap-2 items-center py-1 px-2 sm:py-2 sm:px-4 rounded-md font-bold text-md sm:text-lg text-white dark:text-black transition dark:hover:brightness-125 dark:focus:brightness-125 hover:brightness-85 focus:brightness-85 mt-2`}
                href={"/"}
                style={{
                    backgroundColor: parseTailwindColor({
                        color: accent,
                        step:  isDark ? 400 : 500,
                    }),
                }}
            >
                Go to homepage
            </Link>
        </div>
    );
}
