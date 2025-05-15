"use client";

import VidstackPlayer from "@/components/VideoPlayer/VidstackPlayer/VidstackPlayer";
import { VideoGetters } from "@/lib/anime/getters";
import { useQuery } from "@tanstack/react-query";

export default function VideoClientFetch({
    queryKey,
    method,
    fetchArguments,
}: {
    queryKey: Array<string>;
    method: keyof typeof VideoGetters;
    fetchArguments: number;
}) {
    const { isPending, error, data } = useQuery({
        queryKey: queryKey,
        queryFn: async () => await VideoGetters[method](fetchArguments),
    });

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