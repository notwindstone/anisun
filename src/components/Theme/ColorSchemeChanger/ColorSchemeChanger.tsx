"use client";

import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { setCookie } from "@/lib/actions/cookies";
import { ConfigType } from "@/constants/configs";
import { getRelativeDate } from "@/utils/misc/getRelativeDate";

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
                const newData = {
                    theme: "light",
                };

                await setConfig({ configs: newData });
            }}>
                set theme
            </button>
        </div>
    );
}