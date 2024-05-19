"use client"

import {Carousel} from "@mantine/carousel";
import HeroSlides from "@/components/Hero/HeroSlides/HeroSlides";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";

const HERO_TITLES_LIMIT = 7

export default function Hero() {
    const shikimori = client();
    const { isPending, error, data } = useQuery({
        queryKey: ['heroTitles'],
        queryFn: getTitles
    })

    async function getTitles() {
        return (
            await shikimori
                .animes
                .list({
                    limit: HERO_TITLES_LIMIT,
                    filter: [
                        "id",
                        "name",
                        "url",
                        "poster { id originalUrl mainUrl }"
                    ]
                })
        )
    }

    const slidesLength: undefined[] = Array.from({ length: HERO_TITLES_LIMIT })

    return (
        <>
            <Carousel
                slideSize="100%"
                initialSlide={3}
                loop
            >
                <HeroSlides
                    data={data}
                    isPending={isPending}
                    error={error}
                    slidesLength={slidesLength}
                />
            </Carousel>
        </>
    );
}