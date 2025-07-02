"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { HistoryEntriesLimit, HistoryLocalStorageKey } from "@/constants/app";
import { useQuery } from "@tanstack/react-query";
import { AnimeType } from "@/types/Anime/Anime.type";
import getAnimePageQueryKey from "@/utils/misc/getAnimePageQueryKey";
import getRouteState from "@/utils/misc/getRouteStates";
import useQueriesStore from "@/utils/stores/useQueriesStore";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";

export default function HistoryLogger(): React.ReactNode {
    const loggerEnabled = useContextSelector(ConfigsContext, (value) => value.data.other.historyEnabled);
    const pathname = usePathname();
    const searchParameters = useSearchParams();
    const setQueriesState = useQueriesStore((state) => state.setQueriesState);

    const pathnames = pathname.split("/");
    const idMal = Number(pathnames.at(-1) ?? 0);

    // we define a query with the same queryKey on the anime page
    // that will overwrite values here
    const { data, isPending, error } = useQuery({
        queryKey: getAnimePageQueryKey(idMal),
        queryFn:  () => ({
            Current: {
                // key property here to tell that data is not loaded
                loading: true,
            },
        }),
        enabled: false,
    });

    // log all routes and their search params to implement a states storage
    useEffect(() => {
        const currentPathname = pathnames.slice(2).join("");

        setQueriesState(getRouteState({
            currentPathname,
            searchParameters,
        }));
    }, [pathnames, searchParameters, setQueriesState]);


    // log anime pages only with data that have loaded
    useEffect(() => {
        if (!loggerEnabled) {
            return;
        }

        if (!pathname.includes("anime")) {
            return;
        }

        if (isPending) {
            return;
        }

        if (error) {
            return;
        }

        if (data?.Current?.loading) {
            return;
        }

        const storedHistory = localStorage?.getItem(HistoryLocalStorageKey) ?? "[]";
        let parsedHistory: Array<AnimeType | unknown>;

        try {
            parsedHistory = JSON.parse(storedHistory);
        } catch {
            parsedHistory = [];
        }

        const currentEpisode = searchParameters.get("episode");
        const currentSeason = searchParameters.get("season");

        parsedHistory.push({
            ...data?.Current,
            currentEpisode,
            currentSeason,
            date: new Date(),
        });

        if (parsedHistory.length > HistoryEntriesLimit) {
            const toRemove = parsedHistory.length - HistoryEntriesLimit;

            parsedHistory.splice(0, toRemove);
        }

        localStorage?.setItem(HistoryLocalStorageKey, JSON.stringify(parsedHistory));
    }, [pathname, searchParameters, idMal, data, isPending, error]);

    return;
}
