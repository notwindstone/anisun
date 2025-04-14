"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";
import { DictionariesType } from "@/types/Dictionaries/Dictionaries.type";
import { ParsedConfigType } from "@/types/Configs/ParsedConfig.type";

export const ConfigsContext = createContext<{
    data: ParsedConfigType;
    optimisticallyUpdate: Dispatch<SetStateAction<ParsedConfigType>> | undefined;
    dictionaries: DictionariesType;
}>({
    data: undefined,
    optimisticallyUpdate: undefined,
    dictionaries: undefined,
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

    return (
        <ConfigsContext.Provider value={{
            data: configsState,
            optimisticallyUpdate: setConfigsState,
            dictionaries: dictionaries,
        }}>
            {children}
        </ConfigsContext.Provider>
    );
}