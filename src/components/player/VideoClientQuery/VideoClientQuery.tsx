"use client";

import VidstackPlayer from "@/components/player/VidstackPlayer/VidstackPlayer";
import { VideoGetters } from "@/lib/anime/getters";
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
    method: keyof typeof VideoGetters;
    fetchArguments: number;
}) {
    const pathname = usePathname();
    const searchParameters = useSearchParams();
    const status = searchParameters.get("status") === "cached"
        ? "cached"
        : "uncached";
    const { isPending, error, data } = useQuery({
        queryKey: queryKey,
        queryFn:  async () => {
            // ignore cache status property if we are fetching not from anilibria api
            if (!method.toLowerCase().includes("anilibria")) {
                const result = await VideoGetters[method](fetchArguments);

                if (result === unableToFind.Label) {
                    throw new Error(unableToFind.Description);
                }

                return result;
            }

            if (status === "uncached") {
                const result = await VideoGetters[method](fetchArguments);

                if (result === unableToFind.Label) {
                    throw new Error(unableToFind.Description);
                }

                return result;
            }

            const result = await VideoGetters["GetCachedAnilibriaVideo"](fetchArguments);

            if (result === unableToFind.Label) {
                throw new Error(unableToFind.Description);
            }

            return result;
        },
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
                <SkeletonPlayer status={status} />
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
