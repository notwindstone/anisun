"use client";

import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { ExtensionsContext } from "@/utils/providers/ExtensionsProvider";
import LoadedExtension from "@/components/extensions/LoadedExtension/LoadedExtension";
import ExtensionsLoadFromURL from "@/components/extensions/ExtensionsLoadFromURL/ExtensionsLoadFromURL";
import ExtensionsBrowser from "@/components/extensions/ExtensionsBrowser/ExtensionsBrowser";
import { useLayoutEffect, useState } from "react";

export default function ExtensionsLoader() {
    const { base, theme, accent } = useContextSelector(ConfigsContext, (value) => {
        return {
            base:   value.data.colors.base,
            theme:  value.data.theme,
            accent: value.data.colors.accent,
        };
    });
    const extensions = useContextSelector(ExtensionsContext, (value) => value.data);
    const [loading, setLoading] = useState(true);

    // useLayoutEffect blocks render, which is exactly what we need.
    // with useEffect user will see loading state for a split second
    // even if the page was already in CSR
    useLayoutEffect(() => {
        // disable loading state in CSR
        setLoading(false);
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <div
                className="transition p-4 rounded-md flex flex-col gap-4"
                style={{
                    backgroundColor: parseTailwindColor({
                        color: base,
                        step:  theme === DarkThemeKey ? 900 : 100,
                    }),
                }}
            >
                <div className="flex justify-between">
                    <p className="leading-none text-lg font-medium">
                        Installed
                    </p>
                    <p className="leading-none text-lg font-medium">
                        Total:
                        {" "}
                        <span style={{
                            color: parseTailwindColor({
                                color: accent,
                                step:  theme === DarkThemeKey
                                    ? 400
                                    : 500,
                            }),
                        }}>
                            {loading ? "?" : extensions?.length}
                        </span>
                    </p>
                </div>
                {
                    extensions?.map((extension, index) => (
                        <LoadedExtension
                            key={extension.url}
                            extension={extension}
                            index={index}
                        />
                    ))
                }
            </div>
            <ExtensionsBrowser />
            <ExtensionsLoadFromURL />
        </div>
    );
}
