"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { ExtensionType } from "@/types/Extensions/Extension.type";
import { ExtensionsLocalStorageKey } from "@/constants/app";
import getSafeExtensionsValues from "@/utils/configs/getSafeExtensionsValues";

export const ExtensionsContext = createContext<{
    data: Array<ExtensionType> | undefined;
    optimisticallyUpdate: Dispatch<
        SetStateAction<
            Array<ExtensionType> | undefined
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
    const [extensionsState, setExtensionsState] = useState<Array<ExtensionType> | undefined>();

    useEffect(() => {
        const storedExtensions = localStorage.getItem(ExtensionsLocalStorageKey);

        if (!storedExtensions) {
            localStorage?.setItem(ExtensionsLocalStorageKey, JSON.stringify([]));

            return;
        }

        let parsedExtensions: unknown;

        try {
            parsedExtensions = JSON.parse(storedExtensions);
        } catch {
            parsedExtensions = [];
        }

        if (!Array.isArray(parsedExtensions)) {
            return;
        }

        const extensions = getSafeExtensionsValues({
            parsedExtensions,
        });

        // disable all plugins on /reset page navigation
        if (location !== undefined && location.pathname.startsWith("/reset")) {
            localStorage.setItem(ExtensionsLocalStorageKey, JSON.stringify(
                extensions.map((extension) => ({
                    ...extension,
                    isDisabled: true,
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
