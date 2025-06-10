"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { HistoryLocalStorageKey } from "@/constants/app";

// log anime pages
export default function HistoryLogger(): React.ReactNode {
    const pathname = usePathname();

    useEffect(() => {
        if (!pathname.includes("anime")) {
            return;
        }

        const pathnames = pathname.split("/");
        const idMal = pathnames.at(-1);

        const storedHistory = localStorage?.getItem(HistoryLocalStorageKey) ?? "[]";
        let parsedHistory: Array<unknown>;

        try {
            parsedHistory = JSON.parse(storedHistory);
        } catch {
            parsedHistory = [];
        }

        parsedHistory.push({
            idMal,
            date: new Date(),
        });

        localStorage?.setItem(HistoryLocalStorageKey, JSON.stringify(parsedHistory));
    }, [pathname]);

    return;
}
