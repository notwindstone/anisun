"use client";

import ClientFetch from "@/components/ClientFetch/ClientFetch";
import Cards from "@/components/Cards/Cards";
import { useContext } from "react";
import { SearchContext } from "@/utils/providers/SearchProvider";

export default function ClientFetchWrapper() {
    const { data: search } = useContext(SearchContext);

    return (
        <>
            <ClientFetch
                queryKey={["search", search.search, search.type]}
                method={"SearchTitles"}
                pendingUI={<></>}
                errorUI={<></>}
                fetchArguments={search}
            >
                <Cards />
            </ClientFetch>
        </>
    );
}