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
        return;
    }

    const historyString = localStorage?.getItem(HistoryLocalStorageKey) ?? "[]";

    let parsedHistory: Array<unknown>;

    try {
        parsedHistory = JSON.parse(historyString);
    } catch {
        parsedHistory = [];
    }

    return (
        <HistoryLoader
            history={parsedHistory}
        />
    );
}
