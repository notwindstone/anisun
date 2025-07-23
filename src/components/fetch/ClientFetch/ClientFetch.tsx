"use client";

import { useQuery } from "@tanstack/react-query";
import { Getters } from "@/lib/anime/getters";
import { ClientFetchDataProvider } from "@/lib/providers/ClientFetchDataProvider";
import { SearchType } from "@/types/Anime/Search.type";

export default function ClientFetch({
    children,
    queryKey,
    method,
    pendingUI,
    errorUI,
    fetchArguments,
}: {
    children: React.ReactNode;
    queryKey: Array<string | number>
    method: keyof typeof Getters;
    pendingUI: React.ReactNode;
    errorUI: React.ReactNode;
    fetchArguments?: { idMal?: string } | SearchType;
}) {
    const { isPending, error, data } = useQuery({
        queryKey: queryKey,
        queryFn:  async () => await Getters[method](fetchArguments),
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
