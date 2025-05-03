"use client";

import HeroCard from "@/components/Hero/HeroCard/HeroCard";
import { useQuery } from "@tanstack/react-query";
import { Getters } from "@/lib/anime/getters";
import { ClientFetchDataProvider } from "@/utils/providers/ClientFetchDataProvider";

export default function ClientFetch({
    children,
    queryKey,
    method,
    pendingUI,
    errorUI,
}: {
    children: React.ReactNode;
    queryKey: Array<string>
    method: keyof typeof Getters;
    pendingUI: React.ReactNode;
    errorUI: React.ReactNode;
}) {
    const { isPending, error, data } = useQuery({
        queryKey: queryKey,
        queryFn: async () => await Getters[method](),
    });

    if (isPending) {
        return pendingUI;
    }

    if (error) {
        return errorUI;
    }

    return (
        <ClientFetchDataProvider data={data}>
            {children}
        </ClientFetchDataProvider>
    );
}