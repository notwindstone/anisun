"use client";

import { Dispatch, SetStateAction } from "react";
import { createContext } from "use-context-selector";
import { useDebouncedState } from "@mantine/hooks";

export const AnilibriaSearchContext = createContext<{
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
}>({
    search:    "",
    setSearch: () => {},
});

export function AnilibriaSearchProvider({
    children,
    searchName,
}: {
    children: React.ReactNode;
    searchName: string;
}) {
    const [debounced, setDebounced] = useDebouncedState<string>(searchName, 300, {
        leading: true,
    });

    return (
        <AnilibriaSearchContext.Provider value={{
            search:    debounced,
            setSearch: setDebounced,
        }}>
            {children}
        </AnilibriaSearchContext.Provider>
    );
}