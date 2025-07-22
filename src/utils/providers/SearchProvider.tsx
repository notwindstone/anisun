"use client";

import { Dispatch, SetStateAction } from "react";
import { createContext } from "use-context-selector";
import { useDebouncedState } from "@mantine/hooks";
import { SearchType } from "@/types/Anime/Search.type";

export const SearchContext = createContext<{
    data: SearchType;
    setData: Dispatch<SetStateAction<SearchType>>;
}>({
    data: {
        search:  "",
        type:    "name",
        filters: {
            status: "HIATUS",
        },
    },
    setData: () => {},
});

export function SearchProvider({
    children,
    mediaGenres,
    mediaTags,
}: {
    children: React.ReactNode;
    mediaGenres?: Array<string>;
    mediaTags?:   Array<Partial<{
        name:        string;
        category:    string;
        description: string;
    }>>;
}) {
    const [debounced, setDebounced] = useDebouncedState<SearchType>({
        search:  "",
        type:    "name",
        filters: {},
    }, 300, {
        leading: true,
    });

    console.log(mediaTags)
    console.log(mediaGenres)

    return (
        <SearchContext.Provider value={{
            data:    debounced,
            setData: setDebounced,
        }}>
            {children}
        </SearchContext.Provider>
    );
}
