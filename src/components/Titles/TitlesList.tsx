"use client"

import {TitlesSortContext} from "@/utils/Contexts/Contexts";
import {useState} from "react";
import { variables } from '@/configs/variables';
import TitlesSort from "@/components/Titles/TitlesSort/TitlesSort";
import {useQuery} from "@tanstack/react-query";
import TitleCard from "@/components/Titles/TitleCard/TitleCard";
import {client} from "@/lib/shikimori/client";
import {StatusType} from "@/types/Shikimori/General/Status.type";

const LATEST_TITLES = variables.sorting.latest;

export default function TitlesList() {
    const shikimori = client();
    const [sortingType, setSortingType] = useState<StatusType>(LATEST_TITLES.value);
    const { data, status } = useQuery({
        queryFn: async () => {
            return (
                await shikimori
                    .animes
                    .list({
                        order: "ranked",
                        status: sortingType,
                        limit: 5,
                        filter: ["id", "name"]
                    })
            ).animes
        },
        queryKey: ["titlesList", sortingType]
    })

    const titles = data?.map((title: { id: string }) => {
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