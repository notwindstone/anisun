"use client";

import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { DarkThemeKey, LightThemeKey } from "@/constants/configs";
import { Moon, Sun } from "lucide-react";
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
    const { data: config, optimisticallyUpdate } = useContext(ConfigsContext);

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
                onClick={() => {
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