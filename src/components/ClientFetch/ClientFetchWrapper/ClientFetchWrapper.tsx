"use client";

import ClientFetch from "@/components/ClientFetch/ClientFetch";
import { useContext } from "react";
import { SearchContext } from "@/utils/providers/SearchProvider";
import Cards from "@/components/Cards/Cards";

export default function ClientFetchWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: search } = useContext(SearchContext);

    return (
        <>
            <ClientFetch
                queryKey={["search", search.search, search.type]}
                method={"SearchTitles"}
                pendingUI={
                    <Cards search={search.search} isPending />
                }
                errorUI={<></>}
                fetchArguments={search}
            >
                {children}
            </ClientFetch>
        </>
    );
}