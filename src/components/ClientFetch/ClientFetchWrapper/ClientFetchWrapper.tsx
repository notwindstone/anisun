"use client";

import ClientFetch from "@/components/ClientFetch/ClientFetch";
import Cards from "@/components/Cards/Cards";
import { useContext } from "react";
import { SearchContext } from "@/utils/providers/SearchProvider";

export default function ClientFetchWrapper() {
    const { data: search } = useContext(SearchContext);
    console.log(search);
    return (
        <>
            <ClientFetch
                queryKey={["search", search]}
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