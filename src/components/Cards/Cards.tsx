"use client";

import { useContext } from "react";
import { ClientFetchDataContext } from "@/utils/providers/ClientFetchDataProvider";

export default function Cards() {
    const { data: animeData } = useContext(ClientFetchDataContext);
    console.log(JSON.stringify(animeData));
    return (
        <>
            {JSON.stringify("")}
        </>
    );
}