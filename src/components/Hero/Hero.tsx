"use client"

import {Carousel} from "@mantine/carousel";
import HeroSlides from "@/components/Hero/HeroSlides/HeroSlides";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import {Container} from "@mantine/core";
import {useDebouncedValue, useElementSize} from "@mantine/hooks";
import {useMemo} from "react";

const HERO_TITLES_LIMIT = 7
console.log("test")
const slidesLength: undefined[] = Array.from({ length: HERO_TITLES_LIMIT })

export default function Hero() {
    const { ref, width } = useElementSize();
    const [debouncedWidth] = useDebouncedValue(width, 150)
    const shikimori = client();
    const { status, error, data } = useQuery({
        queryKey: ['heroTitles'],
        queryFn: getTitles
    })
    // 16 / 9
    const aspectRatioHeight = debouncedWidth * 0.5625

    const memoizedCarousel = useMemo(
        () => <Carousel
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
            />
        </Carousel>,
        [data, status, error, aspectRatioHeight]
    )

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
            <Container h={aspectRatioHeight} p={0} ref={ref}>
                {memoizedCarousel}
            </Container>
        </>
    );
}