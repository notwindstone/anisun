"use client";

import { Dispatch, SetStateAction, useContext, useState } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { DarkThemeKey, LightThemeKey } from "@/constants/configs";
import { Moon, Sun } from "lucide-react";
import getSafeConfigValues from "@/utils/configs/getSafeConfigValues";
import setConfigValues from "@/utils/configs/setConfigValues";
import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";
import { ParsedConfigType } from "@/types/Configs/ParsedConfig.type";

async function switchTheme({
    currentConfig,
    optimisticallyUpdate,
}: {
    currentConfig: SafeConfigType;
    optimisticallyUpdate: Dispatch<SetStateAction<ParsedConfigType>> | undefined;
}) {
    const newData: SafeConfigType = {
        ...currentConfig,
        theme: currentConfig.theme === DarkThemeKey
            ? LightThemeKey
            : DarkThemeKey,
    };

    optimisticallyUpdate?.(newData);

    await setConfigValues({ configs: newData });
}

export default function ColorSchemeChanger() {
    const [pending, setPending] = useState(false);
    const { data, optimisticallyUpdate } = useContext(ConfigsContext);
    const config = getSafeConfigValues({ config: data });

    return (
        <>
            <button
                className="border-neutral-400 dark:border-neutral-700 border-[1px] rounded-md p-2 transition hover:border-neutral-800 dark:hover:border-neutral-300"
                onClick={async () => {
                    if (pending) {
                        return;
                    }

                    setPending(true);

                    await switchTheme({
                        currentConfig: config,
                        optimisticallyUpdate,
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