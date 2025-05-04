"use client";

import { useContext } from "react";
import { ClientFetchDataContext } from "@/utils/providers/ClientFetchDataProvider";

export default function Cards() {
    const { data: animeData } = useContext(ClientFetchDataContext);

    return (
        <>
            {JSON.stringify(animeData)}
        </>
    );
}