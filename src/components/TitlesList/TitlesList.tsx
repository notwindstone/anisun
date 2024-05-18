"use client"

import {TitlesSortContext} from "@/utils/Contexts/Contexts";
import {useState} from "react";
import globalVariables from '@/configs/globalVariables.json';
import TitlesSort from "@/components/TitlesSort/TitlesSort";
import {SortType} from "@/types/TitlesList/Sort.type";
import {useQuery} from "@tanstack/react-query";
import TitleCard from "@/components/TitleCard/TitleCard";
import {client} from "@/lib/shikimori/client";

const ALL_TITLES = globalVariables.sorting.all;

export default function TitlesList() {
    const shikimori = client();
    const [sortingType, setSortingType] = useState<SortType>(ALL_TITLES.value);
    const { data, status } = useQuery({
        queryFn: async () => {
            const animeStatus = sortingType === "all" ? undefined : sortingType

            return (await shikimori.animes.list({ order: "ranked", status: animeStatus, limit: 5 })).animes
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