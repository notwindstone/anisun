"use client";

import ClientFetch from "@/components/fetch/ClientFetch/ClientFetch";
import { SearchContext } from "@/lib/providers/SearchProvider";
import Cards from "@/components/layout/Cards/Cards";
import { useContextSelector } from "use-context-selector";
import { useEffect, useState } from "react";
import getAnilistFilters from "@/lib/misc/getAnilistFilters";

export default function ClientFetchWithSearchWrapper({
    isGrid,
}: {
    isGrid?: boolean;
}) {
    const search = useContextSelector(SearchContext, (value) => value.data);
    const filtersAsKeys = Object.keys(search.filters);
    const areFiltersEmpty =
        filtersAsKeys.length === 0 ||
        // initial filters value can contain `search` parameter from `useInitialSearchParameters`
        (filtersAsKeys.length === 1 && filtersAsKeys.includes("search"));
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) {
        return;
    }

    if (search.search === "" && areFiltersEmpty) {
        return;
    }

    const cleanedQueryKey = getAnilistFilters({
        search: {
            search:  "static-value---ignored",
            type:    "name",
            filters: search.filters,
        },
    });

    return (
        <>
            <ClientFetch
                queryKey={[
                    "search",
                    search.search,
                    search.type,
                    // we can probably just fetch 50 entries
                    // and then remove not needed entries client-side
                    search.filters?.["perPage"]?.toString(),
                    JSON.stringify(cleanedQueryKey),
                ]}
                method={"SearchAnime"}
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
                    areFiltersEmpty={areFiltersEmpty}
                    isImageUnoptimized
                    isGrid
                />
            </ClientFetch>
        </>
    );
}
