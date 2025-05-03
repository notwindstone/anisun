"use client";

import HeroCard from "@/components/Hero/HeroCard/HeroCard";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import SkeletonCard from "@/components/Hero/SkeletonCard/SkeletonCard";
import { Getters } from "@/lib/anime/getters";

// I thought about refactoring this function to be
// reusable, but how do i actually pass async functions here?
// There might be a way using JSON.stringify on the server
// And JSON.parse on the client, but to me, it seems cringy
// TODO: figure it out
export default function ClientFetch({
    method,
}: {
    method: keyof typeof Getters;
}) {
    const { data: { theme, colors: { base } } } = useContext(ConfigsContext);
    const { isPending, error, data } = useQuery({
        queryKey: ["hero", "anime"],
        queryFn: async () => await Getters[method](),
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