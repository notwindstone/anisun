"use client";

import ClientFetch from "@/components/fetch/ClientFetch/ClientFetch";
import { SearchContext } from "@/utils/providers/SearchProvider";
import Cards from "@/components/layout/Cards/Cards";
import { useContextSelector } from "use-context-selector";

export default function ClientFetchWithSearchWrapper({
    isGrid,
}: {
    isGrid?: boolean;
}) {
    const search = useContextSelector(SearchContext, (value) => value.data);

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
                <Cards
                    search={search.search}
                    isImageUnoptimized
                    isGrid
                />
            </ClientFetch>
        </>
    );
}
