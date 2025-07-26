"use client";

import { createContext } from "use-context-selector";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { PageRoutes } from "@/constants/routes";

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
    const pathname = usePathname();
    const [animeData, setAnimeData] = useState<AnimePageOptimisticDataType>({});

    useEffect(() => {
        if (globalThis.window === undefined) {
            return;
        }

        if (!animeData?.idMal) {
            return;
        }

        const pathnames = pathname.split("/");
        const pathnameWithoutLocale = pathnames?.[2];

        // pathname is probably `/{locale}/anime/{ID}` at this point
        // if no, we don't care, because we want pathname to be only `/{locale}/anime`
        if (pathnames.length >= 4) {
            return;
        }

        if (pathnameWithoutLocale !== PageRoutes.Anime.Pathname) {
            return;
        }

        const searchString: string = globalThis.location.search;
        const searchParameters = new URLSearchParams(searchString);

        if (animeData?.title) {
            searchParameters.set("title", animeData.title);
        }

        if (animeData?.selectedExtension) {
            searchParameters.set("selectedExtension", animeData.selectedExtension);
        }

        const URLToApply: string = `${pathname}/${animeData.idMal}?${searchParameters.toString()}`;

        globalThis.history.replaceState({}, "", URLToApply);
    }, [pathname, animeData]);

    return useMemo(
        () => (
            <AnimePageLoaderContext.Provider value={{
                optimisticData:    animeData,
                setOptimisticData: setAnimeData,
            }}>
                {children}
            </AnimePageLoaderContext.Provider>
        ),
        [animeData, children],
    );
}
