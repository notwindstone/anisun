"use client";

import { createContext } from "react";
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
    configs: ConfigType;
    dictionaries: DictionariesType;
}) {
    return (
        <ConfigsContext.Provider value={{
            data: configs,
            dictionaries: dictionaries,
        }}>
            {children}
        </ConfigsContext.Provider>
    );
}