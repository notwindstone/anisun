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
    const { data, dictionaries } = useContext(ConfigsContext);

    return (
        <div>
            asd
            <button
                className=""
            >
            </button>
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
                set theme {dictionaries?.greetings}
            </button>
        </div>
    );
}