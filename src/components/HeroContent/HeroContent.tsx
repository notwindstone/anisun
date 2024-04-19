"use client"

import classes from './HeroContent.module.css';
import {Carousel} from "@mantine/carousel";
import {useQuery} from "@tanstack/react-query";
import {client} from "node-shikimori";
import {Skeleton} from "@mantine/core";
import CarouselCard from "@/components/CarouselCard/CarouselCard";

export function HeroContent() {
    const shikimori = client();
    const shikimoriURL = 'https://shikimori.one'

    const { data, isPending } = useQuery({
        queryKey: ['hero'],
        queryFn: async () => getRandomTitles(),
    });

    async function getRandomTitles() {
        const currentYear = new Date().getFullYear().toString()

        return await shikimori.animes.list({
            limit: 7,
            season: currentYear,
            status: 'ongoing',
            order: "popularity"
        })
    }

    const carouselSection = isPending ? (
        <Skeleton />
    ) : (
        <Carousel slideSize={225} height={317} slideGap="md" controlsOffset="md" controlSize={40} loop dragFree withIndicators>
            {
                data && data?.map((animeTitle) => {
                    return (
                        <Carousel.Slide key={animeTitle.id}>
                            <CarouselCard animeTitle={animeTitle} shikimoriURL={shikimoriURL} />
                        </Carousel.Slide>
                    )
                })
            }
        </Carousel>
    )

    return (
        <div className={classes.hero}>
            {carouselSection}
        </div>
    );
}