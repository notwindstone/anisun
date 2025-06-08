"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { createContext } from "use-context-selector";
import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";
import { ParsedConfigType } from "@/types/Configs/ParsedConfig.type";
import getSafeConfigValues from "@/utils/configs/getSafeConfigValues";
import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";
import { InitialConfig } from "@/constants/configs";

/** Sidebar's `expanded` value is valid only on the first load. It's not being updated on expansion */
export const ConfigsContext = createContext<{
    data: SafeConfigType;
    optimisticallyUpdate: Dispatch<SetStateAction<ParsedConfigType>> | undefined;
    dictionaries: DictionariesType;
}>({
    data:                 InitialConfig,
    optimisticallyUpdate: undefined,
    dictionaries:         undefined,
});

export function ConfigsProvider({
    children,
    configs,
    dictionaries,
}: {
    children: React.ReactNode;
    configs: ParsedConfigType;
    dictionaries: DictionariesType;
}) {
    const [configsState, setConfigsState] = useState<ParsedConfigType>(configs);
    const safeConfigsState = getSafeConfigValues({
        config: configsState,
    });

    return (
        <ConfigsContext.Provider value={{
            data:                 safeConfigsState,
            optimisticallyUpdate: setConfigsState,
            dictionaries:         dictionaries,
        }}>
            {children}
        </ConfigsContext.Provider>
    );
}