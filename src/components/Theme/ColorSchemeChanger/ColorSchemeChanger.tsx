"use client";

import { useContext, useState } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { DarkThemeKey, LightThemeKey } from "@/constants/configs";
import { Moon, Sun } from "lucide-react";
import getSafeConfigValues from "@/utils/configs/getSafeConfigValues";
import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { setConfigValuesClient } from "@/utils/configs/setConfigValues";

function switchTheme({
    currentConfig,
}: {
    currentConfig: SafeConfigType;
}) {
    const newData: SafeConfigType = {
        ...currentConfig,
        theme: currentConfig.theme === DarkThemeKey
            ? LightThemeKey
            : DarkThemeKey,
    };

    setConfigValuesClient({
        configs: newData,
    });
}

export default function ColorSchemeChanger() {
    const [pending, setPending] = useState(false);
    const { data, optimisticallyUpdate } = useContext(ConfigsContext);
    const config = getSafeConfigValues({ config: data });

    return (
        <>
            <p className="transition-colors" style={{
                color: parseTailwindColor({
                    color: config.colors.accent,
                    step: 500,
                }),
            }}>
                Client-side
            </p>
            <button
                className="border-neutral-400 dark:border-neutral-700 border-[1px] rounded-md p-2 transition hover:border-neutral-800 dark:hover:border-neutral-300"
                onClick={() => {
                    if (pending) {
                        return;
                    }

                    setPending(true);

                    optimisticallyUpdate?.((state) => {
                        return {
                            ...state,
                            theme: config.theme === DarkThemeKey
                                ? LightThemeKey
                                : DarkThemeKey,
                        };
                    });

                    switchTheme({
                        currentConfig: config,
                    });
                    setPending(false);
                }}
                style={{
                    opacity: pending ? 0.6 : 1,
                    cursor: pending ? "default" : "pointer",
                }}
                aria-label="Toggle color scheme"
            >
                {
                    config.theme === DarkThemeKey ? (
                        <Sun />
                    ) : (
                        <Moon />
                    )
                }
            </button>
        </>
    );
}