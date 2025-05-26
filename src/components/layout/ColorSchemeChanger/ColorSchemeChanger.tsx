"use client";

import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { DarkThemeKey, LightThemeKey } from "@/constants/configs";
import { Moon, Sun } from "lucide-react";
import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";
import { setConfigValuesClient } from "@/utils/configs/setConfigValues";
import Button from "@/components/base/Button/Button";
import {useContextSelector} from "use-context-selector";

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
    const { config, optimisticallyUpdate, dictionaries } = useContextSelector(ConfigsContext, (value) => {
        return {
            config:               value.data,
            optimisticallyUpdate: value.optimisticallyUpdate,
            dictionaries:         value.dictionaries,
        };
    });

    return (
        <>
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
                label={dictionaries?.aria?.toggleColorScheme as string}
            >
                {
                    config.theme === DarkThemeKey ? (
                        <Sun />
                    ) : (
                        <Moon />
                    )
                }
            </Button>
        </>
    );
}