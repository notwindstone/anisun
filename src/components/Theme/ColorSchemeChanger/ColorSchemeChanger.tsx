"use client";

import { useContext, useState } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { DarkThemeKey, LightThemeKey } from "@/constants/configs";
import { Moon, Sun } from "lucide-react";
import getSafeConfigValues from "@/utils/configs/getSafeConfigValues";
import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { setConfigValuesClient } from "@/utils/configs/setConfigValues";
import Button from "@/components/Button/Button";

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
            <Button
                custom={{
                    pending: pending,
                }}
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
                aria-label="Toggle color scheme"
            >
                {
                    config.theme === DarkThemeKey ? (
                        <Sun />
                    ) : (
                        <Moon />
                    )
                }
            </Button>
            <button className="temporaryshit">
                Label
            </button>
        </>
    );
}