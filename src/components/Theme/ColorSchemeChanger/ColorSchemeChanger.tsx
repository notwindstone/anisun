"use client";

import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { DarkThemeKey, LightThemeKey } from "@/constants/configs";
import { Moon, Sun } from "lucide-react";
import getSafeConfigValues from "@/utils/configs/getSafeConfigValues";
import setConfigValues from "@/utils/configs/setConfigValues";
import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";

async function switchTheme({
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

    await setConfigValues({ configs: newData });
}

export default function ColorSchemeChanger() {
    const { data } = useContext(ConfigsContext);
    const config = getSafeConfigValues({ config: data });

    return (
        <>
            <button
                className=""
                onClick={async () => switchTheme({
                    currentConfig: config,
                })}
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