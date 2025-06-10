"use client";

import { HistoryLocalStorageKey } from "@/constants/app";
import HistoryLoader from "@/components/misc/HistoryLoader/HistoryLoader";
import { useEffect, useState } from "react";
import simpleHash from "@/utils/misc/simpleHash";

export default function HistoryWrapper(): React.ReactNode {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) {
        return;
    }

    // i need to use tanstack query to cache anime history, but at the same time i need to be able
    // to always show updated values. if i will just use defined values as `queryKey` then, when user
    // will open another anime page, he won't see any changes on the history page until he refreshes the page.
    // if i will assign a random values to query, then history will be re-fetched every component re-render.
    // that's why i will use hashed values from last entries of history to check if it was changed
    const historyString = localStorage?.getItem(HistoryLocalStorageKey) ?? "[]";
    const historyStringLength = historyString.length;
    const lengthToHash = historyStringLength - 5;
    const stringToHash = historyString.slice(
        // historyLength can be less than 5
        Math.max(lengthToHash, 0),
    );
    const hashed = simpleHash(`${historyStringLength}_${stringToHash}`);

    return (
        <HistoryLoader hashedQueryKey={hashed} />
    );
}
