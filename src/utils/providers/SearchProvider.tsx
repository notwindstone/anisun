"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { useDebouncedState } from "@mantine/hooks";

export const SearchContext = createContext<{
    data: string;
    setData: Dispatch<SetStateAction<string>>;
}>({
    data: "",
    setData: () => {},
});

export function SearchProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [debounced, setDebounced] = useDebouncedState<string>("", 300, {
        leading: true,
    });

    return (
        <SearchContext.Provider value={{
            data: debounced,
            setData: setDebounced,
        }}>
            {children}
        </SearchContext.Provider>
    );
}