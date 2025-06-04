"use client";

import getKodikPlayer from "@/lib/anime/getKodikPlayer";
import { useQuery } from "@tanstack/react-query";
import SkeletonPlayer from "@/components/player/SkeletonPlayer/SkeletonPlayer";

export default function KodikPlayer({
    idMal,
}: {
    idMal: number;
}) {
    const { data, isPending, error } = useQuery({
        queryKey: ['anime', 'kodik', idMal],
        queryFn:  async () => await getKodikPlayer({ idMal }),
    });

    if (isPending) {
        return (
            <SkeletonPlayer status="uncached" />
        );
    }

    if (error) {
        return (
            <>
                sosi
            </>
        );
    }

    return (
        <iframe
            className="aspect-video w-full border-none rounded-none"
            src={data?.link}
            allow="autoplay *; fullscreen *"
        />
    );
}
