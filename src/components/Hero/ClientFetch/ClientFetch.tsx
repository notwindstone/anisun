"use client";

import HeroCard from "@/components/Hero/HeroCard/HeroCard";
import { useQuery } from "@tanstack/react-query";
import fetchHeroTitle from "@/lib/anime/fetchHeroTitle";
import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import SkeletonCard from "@/components/Hero/SkeletonCard/SkeletonCard";

// I thought about refactoring this function to be
// reusable, but how do i actually pass async functions here?
// There might be a way using JSON.stringify on the server
// And JSON.parse on the client, but to me, it seems cringy
// TODO: figure it out
export default function ClientFetch() {
    const { data: { theme, colors: { base } } } = useContext(ConfigsContext);
    const { isPending, error, data } = useQuery({
        queryKey: ["hero", "anime"],
        queryFn: async () => await fetchHeroTitle(),
    });

    if (isPending) {
        return (
            <>
                <SkeletonCard theme={theme} base={base} />
            </>
        );
    }

    if (error) {
        return (
            <>
            </>
        );
    }

    return (
        <>
            <HeroCard data={data} />
        </>
    );
}