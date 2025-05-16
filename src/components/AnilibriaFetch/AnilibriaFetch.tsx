"use client";

import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AnilibriaSearchContext } from "@/utils/providers/AnilibriaSearchProvider";

export default function AnilibriaFetch() {
    const { search } = useContext(AnilibriaSearchContext);
    const { isPending, error, data } = useQuery({
        queryKey: ["anime", "anilibria", search],
        queryFn: async () => {
            if (!search) {
                return [];
            }

            const response = await fetch(`https://api.anilibria.tv/v3/title/search?search=${search}&limit=8`);
            const data = await response.json();

            return data.list;
        },
    });

    if (isPending) {
        return <>loading</>;
    }

    console.log(data);
    if (error) {
        return <>error</>;
    }

    return (
        <>
            {JSON.stringify(data)}
        </>
    );
}