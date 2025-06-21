"use client";

import { useEffect, useMemo, useState } from "react";
import makeObservable from "@/utils/misc/makeObservable";

// initialize kinda persistent storage
const futurePathnameStore = makeObservable("/");

/**
 * `usePathname` returns pathname only when the page is loaded
 * while `useFuturePathname` returns the page that user is being redirected
 *
 * `setFuturePathname` should be fired in `onNavigate` property of the `Link`
 * */
export default function useFuturePathname() {
    const [futurePathnameState, setFuturePathnameState] = useState(futurePathnameStore.get());

    useEffect(() => {
        return futurePathnameStore.subscribe(setFuturePathnameState);
    }, []);

    const setFuturePathname = useMemo(() => {
        return (pathname: string) => futurePathnameStore.set(pathname);
    }, []);

    return {
        futurePathname: futurePathnameState,
        setFuturePathname,
    };
}
