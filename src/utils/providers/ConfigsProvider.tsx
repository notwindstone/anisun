"use client";

import { createContext } from "react";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { InitialConfig } from "@/constants/configs";
import { ConfigType } from "@/types/Configs/Config.type";
import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";

export const ConfigsContext = createContext<{
    data: ConfigType;
    dictionaries: DictionariesType;
}>({ data: undefined, dictionaries: undefined });

export function ConfigsProvider({
    children,
    configs,
    dictionaries,
}: {
    children: React.ReactNode;
    configs: RequestCookie | undefined;
    dictionaries: DictionariesType;
}) {
    let cookieData;
    const fallbackConfig = JSON.stringify(InitialConfig);

    try {
        cookieData = JSON.parse(configs?.value || fallbackConfig);
    } catch {
        cookieData = InitialConfig;
    }

    return (
        <ConfigsContext.Provider value={{
            data: cookieData,
            dictionaries: dictionaries,
        }}>
            {children}
        </ConfigsContext.Provider>
    );
}