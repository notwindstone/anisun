"use client";

import ClientFetch from "@/components/fetch/ClientFetch/ClientFetch";
import { useContext } from "react";
import { SearchContext } from "@/utils/providers/SearchProvider";
import Cards from "@/components/misc/Cards/Cards";

export default function ClientFetchWrapper({
    children,
    isGrid,
}: {
    children: React.ReactNode;
    isGrid?: boolean;
}) {
    const { data: search } = useContext(SearchContext);

    return (
        <>
            <ClientFetch
                queryKey={["search", search.search, search.type]}
                method={"SearchTitles"}
                pendingUI={
                    <Cards isGrid={isGrid} search={search.search} isPending />
                }
                errorUI={
                    <Cards isGrid={isGrid} isError />
                }
                fetchArguments={search}
            >
                {children}
            </ClientFetch>
        </>
    );
}