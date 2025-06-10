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

    const { data, isPending, error } = useQuery({
        queryKey: getAnimePageQueryKey(idMal),
        queryFn:  () => {},
        enabled:  false,
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


        const storedHistory = localStorage?.getItem(HistoryLocalStorageKey) ?? "[]";
        let parsedHistory: Array<AnimeType | unknown>;

        try {
            parsedHistory = JSON.parse(storedHistory);
        } catch {
            parsedHistory = [];
        }

        parsedHistory.push({
            idMal,
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
