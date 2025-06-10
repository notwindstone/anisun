"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { HistoryEntriesLimit, HistoryLocalStorageKey } from "@/constants/app";
import { useQuery } from "@tanstack/react-query";
import { AnimeType } from "@/types/Anime/Anime.type";
import getAnimePageQueryKey from "@/utils/misc/getAnimePageQueryKey";

// log anime pages only with data that have loaded
export default function HistoryLogger(): React.ReactNode {
    const pathname = usePathname();

    const pathnames = pathname.split("/");
    const idMal = Number(pathnames.at(-1) ?? 0);

    // we define a query with the same queryKey on the anime page
    // that will overwrite values here
    const { data, isPending, error } = useQuery({
        queryKey: getAnimePageQueryKey(idMal),
        queryFn:  () => ({
            // key property here to tell that data is not loaded
            loading: true,
        }),
        enabled: false,
    });

    useEffect(() => {
        if (!pathname.includes("anime")) {
            return;
        }

        if (isPending) {
            return;
        }

        if (error) {
            return;
        }

        if (data?.loading) {
            return;
        }

        const storedHistory = localStorage?.getItem(HistoryLocalStorageKey) ?? "[]";
        let parsedHistory: Array<AnimeType | unknown>;

        try {
            parsedHistory = JSON.parse(storedHistory);
        } catch {
            parsedHistory = [];
        }

        parsedHistory.push({
            ...data,
            date: new Date(),
        });

        if (parsedHistory.length > HistoryEntriesLimit) {
            const toRemove = parsedHistory.length - HistoryEntriesLimit;

            parsedHistory.splice(0, toRemove);
        }

        localStorage?.setItem(HistoryLocalStorageKey, JSON.stringify(parsedHistory));
    }, [pathname, idMal, data, isPending, error]);

    return;
}
