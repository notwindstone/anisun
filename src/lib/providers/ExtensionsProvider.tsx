"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { ManifestType } from "@/types/Extensions/Extension.type";
import { ExtensionsLocalStorageKey } from "@/constants/app";
import { getExtensions } from "@/lib/extensions/getExtensions";

export const ExtensionsContext = createContext<{
    data: Array<ManifestType>;
    optimisticallyUpdate: Dispatch<
        SetStateAction<
            Array<ManifestType>
        >
    > | undefined;
}>({
    data:                 [],
    optimisticallyUpdate: undefined,
});

export function ExtensionsProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [extensionsState, setExtensionsState] = useState<Array<ManifestType>>([]);

    useEffect(() => {
        const extensions = Object.values(getExtensions({
            local: true,
        }));

        // disable all plugins on /reset page navigation
        if (location !== undefined && location.pathname.startsWith("/reset")) {
            localStorage.setItem(ExtensionsLocalStorageKey, JSON.stringify(
                extensions.map((extension: ManifestType) => ({
                    ...extension,
                    enabled: false,
                })),
            ));

            return;
        }

        setExtensionsState(extensions);
    }, []);

    return (
        <ExtensionsContext.Provider value={{
            data:                 extensionsState,
            optimisticallyUpdate: setExtensionsState,
        }}>
            {children}
        </ExtensionsContext.Provider>
    );
}
