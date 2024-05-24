"use client";

import {Carousel} from "@mantine/carousel";
import HeroSlides from "@/components/Hero/HeroSlides/HeroSlides";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import {Container} from "@mantine/core";
import {useViewportSize} from "@mantine/hooks";
import classes from './Hero.module.css';
import {useRef} from "react";
import Autoplay from 'embla-carousel-autoplay';

const CAROUSEL_PROPS = {
    slideSize: "100%",
    initialSlide: 0,
    loop: true,
    withIndicators: true,
};
const CAROUSEL_CONTAINER_PROPS = {
    fluid: true,
    p: 0,
};
const HERO_TITLES_LIMIT = 7;
const slidesLength: undefined[] = Array.from({ length: HERO_TITLES_LIMIT });

export default function Hero() {
    const autoplay = useRef(Autoplay({ delay: 7000 }));
    const { width } = useViewportSize();
    const shikimori = client();
    const { status, error, data } = useQuery({
        queryKey: ['heroTitles'],
        queryFn: getTitles
    });
    // Around 21 / 9
    const aspectRatioHeight = (width - 96) * 0.42;
    // Around 4 / 5
    const mobileHeight = width * 1.25;

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
        );
    }

    return (
        <>
            {/* Mobile Container */}
            <Container
                className={classes.mobileWrapper}
                h={mobileHeight}
                {...CAROUSEL_CONTAINER_PROPS}
            >
                <Carousel
                    h={mobileHeight}
                    plugins={[autoplay.current]}
                    onMouseEnter={autoplay.current.stop}
                    onMouseLeave={autoplay.current.reset}
                    {...CAROUSEL_PROPS}
                >
                    <HeroSlides
                        isMobile
                        data={data}
                        status={status}
                        error={error}
                        slidesLength={slidesLength}
                        debouncedHeight={mobileHeight}
                    />
                </Carousel>
            </Container>
            {/* Desktop Container */}
            <Container
                className={classes.wrapper}
                h={aspectRatioHeight}
                {...CAROUSEL_CONTAINER_PROPS}
            >
                <Carousel
                    h={aspectRatioHeight}
                    plugins={[autoplay.current]}
                    onMouseEnter={autoplay.current.stop}
                    onMouseLeave={autoplay.current.reset}
                    {...CAROUSEL_PROPS}
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