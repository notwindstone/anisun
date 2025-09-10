"use client";

import Link from "next/link";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/lib/providers/ConfigsProvider";
import parseTailwindColor from "@/lib/appearance/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import { ExtensionsContext } from "@/lib/providers/ExtensionsProvider";
import { usePathname } from "next/navigation";
import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";
import { PaletteType } from "@/types/TailwindCSS/Palette.type";
import ExtensionWrapper from "@/components/extensions/ExtensionWrapper/ExtensionWrapper";
import { useEffect, useState } from "react";

const NotFoundComponent = ({
    translations,
    accent,
    isDark,
}: {
    translations: NonNullable<DictionariesType>["notFound"] | undefined;
    accent: PaletteType;
    isDark: boolean;
}) => {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        setOpacity(1);
    }, []);

    return (
        <div className="transition duration-500 flex flex-col justify-center items-center p-4 mx-auto max-w-384 w-full min-h-[100svh] gap-4 text-balance text-center text-black dark:text-white" style={{ opacity }}>
            <p
                className="text-6xl sm:text-9xl font-black pb-2 sm:pb-4"
                style={{
                    color: parseTailwindColor({
                        color: accent,
                        step:  isDark ? 400 : 500,
                    }),
                }}
            >
                {translations?.title}
            </p>
            <p className="text-xl sm:text-3xl font-bold">
                {translations?.subtitle}
            </p>
            <p className="text-md sm:text-lg">
                {translations?.description}
            </p>
            <Link
                prefetch
                className="text-center text-balance flex gap-2 items-center py-1 px-2 sm:py-2 sm:px-4 rounded-md font-bold text-md sm:text-lg text-white dark:text-black transition dark:hover:brightness-125 dark:focus:brightness-125 hover:brightness-85 focus:brightness-85 mt-2"
                href="/"
                style={{
                    backgroundColor: parseTailwindColor({
                        color: accent,
                        step:  isDark ? 400 : 500,
                    }),
                }}
            >
                {translations?.link}
            </Link>
        </div>
    );
};

export default function Page() {
    const { translations, accent, theme } = useContextSelector(ConfigsContext, (value) => {
        return {
            translations: value.dictionaries?.notFound,
            accent:       value.data.colors.accent,
            theme:        value.data.theme,
        };
    });
    const extensions = useContextSelector(ExtensionsContext, (value) => value.data);
    const pathname = usePathname();
    const isDark = theme === DarkThemeKey;

    if (extensions === undefined) {
        return (
            <NotFoundComponent
                translations={translations}
                accent={accent}
                isDark={isDark}
            />
        );
    }

    const pluginsByPage = [];

    for (const extension of extensions) {
        if (extension?.enabled === false) {
            continue;
        }

        for (const page of (extension?.pages ?? [])) {
            pluginsByPage.push({
                page,
                url: extension.url,
            });
        }
    }

    const pathnameWithoutLocale = pathname.split("/").slice(2).join("/");

    for (const plugin of pluginsByPage) {
        if (plugin.page === pathnameWithoutLocale) {
            return (
                <div id="extensions-root-page-id" className="relative w-full">
                    <ExtensionWrapper url={plugin.url} isCustomPage />
                </div>
            );
        }
    }

    return (
        <NotFoundComponent
            translations={translations}
            accent={accent}
            isDark={isDark}
        />
    );
}
