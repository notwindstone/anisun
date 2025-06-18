"use client";

import { useQuery } from "@tanstack/react-query";
import { OAuth2ProvidersType } from "@/types/OAuth2/OAuth2Providers.type";

export default function AnilistLibrary({
    accessToken,
    tokenProvider,
}: {
    accessToken: string;
    tokenProvider: OAuth2ProvidersType;
}) {
    const { data, isPending, error } = useQuery({
        queryKey: ["anime", tokenProvider, "library"],
        queryFn:  async () => {
            
        },
    });

    if (isPending) {
        return;
    }

    if (error) {
        return;
    }

    return (
        <>
            <div />
            <p className="text-2xl font-medium leading-none">
                Library
            </p>
            <p className="text-md text-neutral-500 dark:text-neutral-400 leading-none">
                Browse your Anilist library
            </p>
            {JSON.stringify(data)}
        </>
    );
}
