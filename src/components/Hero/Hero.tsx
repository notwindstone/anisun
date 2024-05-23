"use client"

import {Carousel} from "@mantine/carousel";
import HeroSlides from "@/components/Hero/HeroSlides/HeroSlides";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import {Container} from "@mantine/core";
import {useViewportSize} from "@mantine/hooks";
import classes from './Hero.module.css';

const HERO_TITLES_LIMIT = 7
const slidesLength: undefined[] = Array.from({ length: HERO_TITLES_LIMIT })

export default function Hero() {
    const { width } = useViewportSize();
    const shikimori = client();
    const { status, error, data } = useQuery({
        queryKey: ['heroTitles'],
        queryFn: getTitles
    })
    // Around 21 / 9
    const aspectRatioHeight = (width - 96) * 0.42

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

    return (
        <>
            <Container
                fluid
                h={aspectRatioHeight}
                p={0}
                className={classes.wrapper}
            >
                <Carousel
                    h={aspectRatioHeight}
                    slideSize="100%"
                    initialSlide={0}
                    loop
                >
                    <HeroSlides
                        data={data}
                        status={status}
                        error={error}
                        slidesLength={slidesLength}
                        debouncedHeight={aspectRatioHeight}
                    />
                </Carousel>
            </Container>
        </>
    );
}