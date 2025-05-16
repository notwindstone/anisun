"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { useDebouncedState } from "@mantine/hooks";

export const AnilibriaSearchContext = createContext<{
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
}>({
    search: "",
    setSearch: () => {},
});

export function AnilibriaSearchProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [debounced, setDebounced] = useDebouncedState<string>("", 300, {
        leading: true,
    });

    return (
        <AnilibriaSearchContext.Provider value={{
            search: debounced,
            setSearch: setDebounced,
        }}>
            {children}
        </AnilibriaSearchContext.Provider>
    );
}