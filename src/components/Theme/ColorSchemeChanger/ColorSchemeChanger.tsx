"use client";

import { useContext, useState } from "react";
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
    const [pending, setPending] = useState(false);
    const { data } = useContext(ConfigsContext);
    const config = getSafeConfigValues({ config: data });

    return (
        <>
            <button
                className="border-zinc-500 border-[1px] rounded-md p-2 transition hover:border-zinc-800 dark:hover:border-zinc-300"
                onClick={async () => {
                    if (pending) {
                        return;
                    }

                    setPending(true);

                    await switchTheme({
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