"use client";

import { createContext } from "react";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { InitialConfig } from "@/constants/configs";
import { ConfigType } from "@/types/Configs/Config.type";

export const ConfigsContext = createContext<{
    data: ConfigType;
}>({ data: undefined });

export function ConfigsProvider({
    children,
    configs,
}: {
    children: React.ReactNode;
    configs: RequestCookie | undefined;
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
        }}>
            {children}
        </ConfigsContext.Provider>
    );
}