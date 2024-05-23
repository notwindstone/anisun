"use client"

import {TitlesSortContext} from "@/utils/Contexts/Contexts";
import {useState} from "react";
import { variables } from '@/configs/variables';
import TitlesSort from "@/components/Titles/TitlesSort/TitlesSort";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import {StatusType} from "@/types/Shikimori/General/Status.type";
import ConfiguredCarousel from "@/components/Carousel/ConfiguredCarousel";

const LATEST_TITLES = variables.sorting.latest;
const carouselSlides: undefined[] = Array.from({ length: 5 })

export default function TitlesList() {
    const shikimori = client();
    const [sortingType, setSortingType] = useState<StatusType>(LATEST_TITLES.value);
    const { data, status, error } = useQuery({
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

    return (
        <TitlesSortContext.Provider value={{ sortingType: sortingType, setSortingType: setSortingType }}>
            <TitlesSort />
            {
                status === "pending" ? (
                    <div>Pending...</div>
                ) : (
                    <ConfiguredCarousel
                        data={data}
                        carouselSlides={carouselSlides}
                        error={error}
                        status={status}
                    />
                )
            }
        </TitlesSortContext.Provider>
    )
}