"use client";

import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { ExtensionsContext } from "@/utils/providers/ExtensionsProvider";
import LoadedExtension from "@/components/extensions/LoadedExtension/LoadedExtension";
import ExtensionsLoadFromURL from "@/components/extensions/ExtensionsLoadFromURL/ExtensionsLoadFromURL";

export default function ExtensionsLoader() {
    const { theme, accent } = useContextSelector(ConfigsContext, (value) => {
        return {
            theme:  value.data.theme,
            accent: value.data.colors.accent,
        };
    });
    const extensions = useContextSelector(ExtensionsContext, (value) => value.data);

    return (
        <div className="flex flex-col gap-2">
            <div className="transition p-4 dark:bg-neutral-900 bg-neutral-100 rounded-md flex flex-col gap-4">
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
                            {extensions?.length ?? 0}
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
            <ExtensionsLoadFromURL />
        </div>
    );
}
