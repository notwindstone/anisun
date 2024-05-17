"use client"

import {TitlesSortContext} from "@/utils/Contexts/Contexts";
import {useState} from "react";
import { sorting } from '@/configs/globalVariables.json';
import TitlesSort from "@/components/TitlesSort/TitlesSort";
import {SortType} from "@/types/TitlesList/Sort.type";
import {useQuery} from "@tanstack/react-query";
import TitleCard from "@/components/TitleCard/TitleCard";

const ALL_TITLES = sorting.all;

export default function TitlesList() {
    const [sortingType, setSortingType] = useState<SortType>(ALL_TITLES.value);
    const { data, status } = useQuery({
        queryFn: async () => {
            const animeStatus = sortingType === "all" ? "" : `status=${sortingType}&`

            return await fetch(`https://shikimori.one/api/animes?order=ranked&${animeStatus}limit=5`)
                .then(response => response.json())
        },
        queryKey: ["titlesList", sortingType]
    })

    const titles = data?.map((title: { id: number }) => {
        return (
            <TitleCard key={title.id} title={title} />
        )
    })

    return (
        <TitlesSortContext.Provider value={{ sortingType: sortingType, setSortingType: setSortingType }}>
            <TitlesSort />
            {
                status === "pending" ? (
                    <div>Pending...</div>
                ) : (
                    titles
                )
            }
        </TitlesSortContext.Provider>
    )
}