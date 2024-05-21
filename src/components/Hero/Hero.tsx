"use client"

import {Carousel} from "@mantine/carousel";
import HeroSlides from "@/components/Hero/HeroSlides/HeroSlides";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import classes from './Hero.module.css';

const HERO_TITLES_LIMIT = 7

export default function Hero() {
    const shikimori = client();
    const { status, error, data } = useQuery({
        queryKey: ['heroTitles'],
        queryFn: getTitles
    })

    async function getTitles() {
        return (
            await shikimori
                .animes
                .list({
                    order: "ranked",
                    limit: HERO_TITLES_LIMIT,
                    filter: [
                        "id",
                        "name",
                        "url",
                        "score",
                        "genres { id name russian kind }",
                        "poster { id originalUrl mainUrl }"
                    ]
                })
        )
    }

    const slidesLength: undefined[] = Array.from({ length: HERO_TITLES_LIMIT })

    return (
        <>
            <Carousel
                h={200}
                slideSize="100%"
                initialSlide={0}
                loop
            >
                <HeroSlides
                    data={data}
                    status={status}
                    error={error}
                    slidesLength={slidesLength}
                />
            </Carousel>
        </>
    );
}