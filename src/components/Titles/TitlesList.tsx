"use client";

import {TitlesSortContext} from "@/utils/Contexts/Contexts";
import {useState} from "react";
import { variables } from '@/configs/variables';
import TitlesSort from "@/components/Titles/TitlesSort/TitlesSort";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import {StatusType} from "@/types/Shikimori/General/Status.type";
import ConfiguredCarousel from "@/components/Carousel/ConfiguredCarousel";
import {rem, Container, Stack, Title} from "@mantine/core";
import {useTranslations} from "next-intl";

const TITLES_LENGTH = 10;
const LATEST_TITLES = variables.sorting.latest;
const carouselSlides: undefined[] = Array.from({ length: TITLES_LENGTH });

export default function TitlesList() {
    const translate = useTranslations('Translations');

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
                            "url",
                            "name",
                            "status",
                            "score",
                            "poster { id originalUrl mainUrl }",
                            "episodes",
                            "episodesAired"
                        ]
                    })
            ).animes;
        },
        queryKey: ["titlesList", sortingType]
    });

    return (
        <TitlesSortContext.Provider value={{ sortingType: sortingType, setSortingType: setSortingType }}>
            <Container w="100%" p={0} size={1024}>
                <Stack gap={rem(8)} align="stretch" pl={rem(32)} pr={rem(32)}>
                    <TitlesSort />
                    <Title>
                        {translate('now-popular')}
                    </Title>
                </Stack>
            </Container>
            <ConfiguredCarousel
                data={data}
                carouselSlides={carouselSlides}
                error={error}
                status={status}
            />
        </TitlesSortContext.Provider>
    );
}