"use client";

import { createContext } from "use-context-selector";

export const ClientFetchDataContext = createContext<{
    // generics won't work with React Contexts.
    // this is the only solution to actually make this context reusable
    // I didn't use `any` type in any other place
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
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
