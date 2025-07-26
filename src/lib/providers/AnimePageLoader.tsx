"use client";

import { createContext } from "use-context-selector";
import { Dispatch, SetStateAction, useState } from "react";

type AnimePageOptimisticDataType = Partial<{
    idMal: string;
    title: string;
    selectedExtension: string;
}>;
type AnimePageLoaderContextType = {
    setOptimisticData: Dispatch<SetStateAction<AnimePageOptimisticDataType>>;
    optimisticData:    AnimePageOptimisticDataType;
};

export const AnimePageLoaderContext = createContext<AnimePageLoaderContextType>({
    optimisticData:    {},
    setOptimisticData: () => {},
});

export function AnimePageLoaderProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [animeData, setAnimeData] = useState<AnimePageOptimisticDataType>({});

    return (
        <AnimePageLoaderContext.Provider value={{
            optimisticData:    animeData,
            setOptimisticData: setAnimeData,
        }}>
            {children}
        </AnimePageLoaderContext.Provider>
    );
}
