"use client";

import VidstackPlayer from "@/components/player/VidstackPlayer/VidstackPlayer";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import SkeletonPlayer from "@/components/player/SkeletonPlayer/SkeletonPlayer";
import { ErrorStrings } from "@/constants/errors";

const unableToFind = ErrorStrings.Player.UnableToFind;

export default function VideoClientQuery({
    queryKey,
    method,
    fetchArguments,
}: {
    queryKey: Array<string>;
    method: string;
    fetchArguments: number;
}) {
    const pathname = usePathname();
    const searchParameters = useSearchParams();
    const status = searchParameters.get("status") === "cached"
        ? "cached"
        : "uncached";
    const { isPending, error, data, failureCount } = useQuery({
        queryKey: [...queryKey, status],
        queryFn:  async () => {
            const result = method + fetchArguments;

            return result;
        },
        retry: ((failureCount, error) => {
            if (error?.message === unableToFind.Description) {
                return false;
            }

            return failureCount <= 3;
        }),
    });

    useEffect(() => {
        if (!globalThis || !data) {
            return;
        }

        const parameters = new URLSearchParams(searchParameters);

        if (parameters.has("mediaSrc")) {
            return;
        }

        parameters.set("mediaSrc", data);
        // replace url without a website refresh
        globalThis.history.replaceState({}, '', `${pathname}?${parameters.toString()}`);

    }, [data, searchParameters, pathname]);

    if (isPending) {
        return (
            <>
                <SkeletonPlayer status={status} failureCount={failureCount} />
            </>
        );
    }

    if (error) {
        if (error?.message === ErrorStrings.Player.UnableToFind.Description) {
            return (
                <>
                    {error.message}
                </>
            );
        }

        return (
            <>
                <SkeletonPlayer status="cached" />
            </>
        );
    }

    return (
        <>
            <VidstackPlayer videoSrc={data} />
        </>
    );
}
