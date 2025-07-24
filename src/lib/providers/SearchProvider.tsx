"use client";

import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { createContext } from "use-context-selector";
import { useDebouncedValue } from "@mantine/hooks";
import { SearchType } from "@/types/Anime/Search.type";

export const SearchContext = createContext<{
    mediaGenres: Array<string>;
    mediaTags:   Record<string, Array<{
        name:        string;
        description: string;
    }>>;
    data:    SearchType;
    setData: Dispatch<SetStateAction<SearchType>>;
}>({
    mediaGenres: [],
    mediaTags:   {},
    data:        {
        search:  "",
        type:    "name",
        filters: {},
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
    mediaTags?:   Record<string, Array<{
        name:        string;
        description: string;
    }>>;
}) {
    const [searchData, setSearchData] = useState<SearchType>({
        search:  "",
        type:    "name",
        filters: {},
    });
    // `useDebouncedState` loses all previous setter invocations data
    // that's why i am using `useState` in pair with `useDebouncedValue`
    const [debouncedSearchData] = useDebouncedValue(searchData, 300);

    return useMemo(
        () => (
            <SearchContext.Provider value={{
                mediaGenres: mediaGenres ?? [],
                mediaTags:   mediaTags ?? {},
                data:        debouncedSearchData,
                setData:     setSearchData,
            }}>
                {children}
            </SearchContext.Provider>
        ),
        [debouncedSearchData, mediaGenres, mediaTags, children],
    );
}
