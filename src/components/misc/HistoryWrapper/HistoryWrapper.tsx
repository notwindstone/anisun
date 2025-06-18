"use client";

import { HistoryLocalStorageKey } from "@/constants/app";
import HistoryLoader from "@/components/misc/HistoryLoader/HistoryLoader";
import { useEffect, useState } from "react";

export default function HistoryWrapper(): React.ReactNode {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) {
        return (
            <HistoryLoader
                isPending
                history={
                    Array
                        .from({
                            length: 12,
                        }, (_, z) => z)
                }
            />
        );
    }

    const historyString = localStorage?.getItem(HistoryLocalStorageKey) ?? "[]";

    let parsedHistory: Array<unknown>;

    try {
        parsedHistory = JSON.parse(historyString);
    } catch {
        parsedHistory = [];
    }

    // first elements will be most recent
    const reversedHistory = parsedHistory.reverse();

    return (
        <HistoryLoader
            history={reversedHistory}
        />
    );
}
