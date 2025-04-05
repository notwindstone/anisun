"use client";

import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { setCookie } from "@/lib/actions/cookies";
import { getRelativeDate } from "@/utils/misc/getRelativeDate";
import { ConfigType } from "@/types/Configs/Config.type";

async function setConfig({
    configs,
}: {
    configs: ConfigType | undefined;
}) {
    await setCookie({
        key: "configs",
        value: JSON.stringify(configs),
        expiresAt: getRelativeDate({ days: 365 }),
        httpOnly: false,
    });
}

export default function ColorSchemeChanger() {
    const { data } = useContext(ConfigsContext);

    return (
        <div>
            asd
            {JSON.stringify(data)}
            <button onClick={async () => {
                const newData: ConfigType = {
                    theme: "light",
                    colors: {
                        accent: "var(--color-rose-100)",
                    },
                };

                await setConfig({ configs: newData });
            }}>
                set theme
            </button>
        </div>
    );
}