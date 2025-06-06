"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { createContext } from "use-context-selector";
import { ExtensionType } from "@/types/Extensions/Extension.type";

export const ExtensionsContext = createContext<{
    data: Array<ExtensionType>;
    optimisticallyUpdate: Dispatch<
        SetStateAction<
            Array<ExtensionType>
        >
    > | undefined;
}>({
    data:                 [],
    optimisticallyUpdate: undefined,
});

export function ExtensionsProvider({
    children,
    extensions,
}: {
    children: React.ReactNode;
    extensions: Array<ExtensionType>;
}) {
    const [extensionsState, setExtensionsState] = useState<Array<ExtensionType>>(extensions);

    return (
        <ExtensionsContext.Provider value={{
            data:                 extensionsState,
            optimisticallyUpdate: setExtensionsState,
        }}>
            {children}
        </ExtensionsContext.Provider>
    );
}
