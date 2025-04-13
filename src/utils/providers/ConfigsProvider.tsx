"use client";

import { createContext } from "react";
import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";
import { ParsedConfigType } from "@/types/Configs/ParsedConfig.type";

export const ConfigsContext = createContext<{
    data: ParsedConfigType;
    dictionaries: DictionariesType;
}>({ data: undefined, dictionaries: undefined });

export function ConfigsProvider({
    children,
    configs,
    dictionaries,
}: {
    children: React.ReactNode;
    configs: ParsedConfigType;
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