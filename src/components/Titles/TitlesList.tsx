"use client"

import {TitlesSortContext} from "@/utils/Contexts/Contexts";
import {useState} from "react";
import { variables } from '@/configs/variables';
import TitlesSort from "@/components/Titles/TitlesSort/TitlesSort";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import {StatusType} from "@/types/Shikimori/General/Status.type";
import ConfiguredCarousel from "@/components/Carousel/ConfiguredCarousel";
import {Group, rem} from "@mantine/core";

const TITLES_LENGTH = 10
const LATEST_TITLES = variables.sorting.latest;
const carouselSlides: undefined[] = Array.from({ length: TITLES_LENGTH })

export default function TitlesList() {
    const shikimori = client();
    const [sortingType, setSortingType] = useState<StatusType>(LATEST_TITLES.value);
    const { data, status, error } = useQuery({
        queryFn: async () => {
            return (
                await shikimori
                    .animes
                    .list({
                        order: "popularity",
                        status: sortingType,
                        limit: TITLES_LENGTH,
                        filter: [
                            "id",
                            "russian",
                            "status",
                            "score",
                            "poster { id originalUrl mainUrl }",
                            "episodes",
                            "episodesAired"
                        ]
                    })
            ).animes
        },
        queryKey: ["titlesList", sortingType]
    })

    return (
        <TitlesSortContext.Provider value={{ sortingType: sortingType, setSortingType: setSortingType }}>
            <Group grow pl={rem(32)} pr={rem(32)}>
                <TitlesSort />
            </Group>
            <ConfiguredCarousel
                data={data}
                carouselSlides={carouselSlides}
                error={error}
                status={status}
            />
        </TitlesSortContext.Provider>
    )
}