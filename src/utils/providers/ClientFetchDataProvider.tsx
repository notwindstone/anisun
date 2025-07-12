"use client";

import { createContext } from "use-context-selector";

export const ClientFetchDataContext = createContext<{
    data: unknown;
}>({
    data: undefined,
});

export function ClientFetchDataProvider({
    children,
    data,
}: {
    children: React.ReactNode;
    data: unknown;
}) {
    return (
        <ClientFetchDataContext.Provider value={{
            data: data,
        }}>
            {children}
        </ClientFetchDataContext.Provider>
    );
}
