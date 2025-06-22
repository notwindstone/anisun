"use client";

import { useEffect, useMemo, useState } from "react";
import makeObservable from "@/utils/misc/makeObservable";

const initialValue = {
    path: "/",
    date: Date.now(),
};

// initialize kinda persistent storage
const futurePathnameStore = makeObservable(initialValue);
const getFuturePathnameStoreData = (): {
    path: string;
    date: number;
} => {
    const unknownData = futurePathnameStore.get();

    if (
        typeof unknownData !== "object" ||
        unknownData === null
    ) {
        return initialValue;
    }

    if (
        !("path" in unknownData) ||
        typeof unknownData.path !== "string"
    ) {
        return initialValue;
    }

    if (
        !("date" in unknownData) ||
        typeof unknownData.date !== "number"
    ) {
        return initialValue;
    }

    return {
        path: unknownData.path,
        date: unknownData.date,
    };
};

/**
 * `usePathname` returns pathname only when the page is loaded
 * while `useFuturePathname` returns the page that user is being redirected
 *
 * `setFuturePathname` should be fired in `onNavigate` property of the `Link`
 * */
export default function useFuturePathname() {
    const [futurePathnameState, setFuturePathnameState] = useState<{
        path: string;
        date: number;
    }>(getFuturePathnameStoreData());

    useEffect(() => {
        return futurePathnameStore.subscribe(setFuturePathnameState);
    }, []);

    const setFuturePathname = useMemo(
        () => {
            return (pathname: {
                path: string;
                date: number;
            }) => futurePathnameStore.set(pathname);
        },
        [],
    );

    return {
        futurePathname: futurePathnameState,
        setFuturePathname,
    };
}
