"use client";

import { createContext } from "react";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { InitialConfig } from "@/constants/configs";
import { ConfigType } from "@/types/Configs/Config.type";

export const ConfigsContext = createContext<{
    data: ConfigType | undefined;
}>({ data: undefined });

export function ConfigsProvider({
    children,
    configs,
}: {
    children: React.ReactNode;
    configs: RequestCookie | undefined;
}) {
    const cookieData = JSON.parse(configs?.value ?? JSON.stringify(InitialConfig));

    return (
        <ConfigsContext.Provider value={{
            data: cookieData,
        }}>
            {children}
        </ConfigsContext.Provider>
    );
}