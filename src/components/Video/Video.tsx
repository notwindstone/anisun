"use client";

import {client} from "@/lib/shikimori/client";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";

export default function Video() {
    const shikimori = client();
    const [value, setValue] = useState('Kodik');
    const { isFetching, data } = useQuery({
        queryKey: ['anime', id],
        queryFn: async () => fetchAnime(),
    });

    return (
        <>

        </>
    );
}