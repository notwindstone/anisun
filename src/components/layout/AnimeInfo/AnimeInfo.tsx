"use client";

import { useContextSelector } from "use-context-selector";
import { ClientFetchDataContext } from "@/utils/providers/ClientFetchDataProvider";

export default function AnimeInfo() {
    const data = useContextSelector(ClientFetchDataContext, (value) => value.data);

    return (
        <>
            {JSON.stringify(data)}
        </>
    );
}
