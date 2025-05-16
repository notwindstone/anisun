"use client";

import VidstackPlayer from "@/components/VideoPlayer/VidstackPlayer/VidstackPlayer";
import { VideoGetters } from "@/lib/anime/getters";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
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
    const searchParameters = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const { isPending, error, data } = useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const mediaSource = await VideoGetters[method](fetchArguments);
            const parameters = new URLSearchParams(searchParameters);

            if (mediaSource) {
                parameters.set("mediaSrc", mediaSource);
            }

            replace(`${pathname}?${parameters.toString()}`);

            return mediaSource;
        },
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