"use client";

import VidstackPlayer from "@/components/VideoPlayer/VidstackPlayer/VidstackPlayer";
import { VideoGetters } from "@/lib/anime/getters";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function VideoClientFetch({
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
    const { isPending, error, data } = useQuery({
        queryKey: queryKey,
        queryFn: async () => await VideoGetters[method](fetchArguments),
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
        globalThis.history.replaceState({}, '', `${pathname}?${parameters.toString()}`);

    }, [data, searchParameters, pathname]);

    if (isPending) {
        return <>loading</>;
    }

    console.log(data);
    if (error) {
        return <>error</>;
    }

    return (
        <>
            <VidstackPlayer videoSrc={data} />
        </>
    );
}