"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { useDebouncedState } from "@mantine/hooks";
import { SearchType } from "@/types/Anime/Search.type";

export const SearchContext = createContext<{
    data: SearchType;
    setData: Dispatch<SetStateAction<SearchType>>;
}>({
    data: {
        search: "",
        type:   "name",
    },
    setData: () => {},
});

export function SearchProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [debounced, setDebounced] = useDebouncedState<SearchType>({ search: "", type: "name" }, 300, {
        leading: true,
    });

    return (
        <SearchContext.Provider value={{
            data:    debounced,
            setData: setDebounced,
        }}>
            {children}
        </SearchContext.Provider>
    );
}