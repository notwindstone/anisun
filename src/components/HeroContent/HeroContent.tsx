"use client"

import classes from './HeroContent.module.css';
import {Carousel} from "@mantine/carousel";
import {useQuery} from "@tanstack/react-query";
import {Skeleton} from "@mantine/core";
import CarouselCard from "@/components/CarouselCard/CarouselCard";

export function HeroContent() {
    const shikimoriURL = 'https://shikimori.one'

    const { data, isPending } = useQuery({
        queryKey: ['hero'],
        queryFn: async () => getRandomTitles(),
    });

    async function getRandomTitles() {
        const currentYear = new Date().getFullYear().toString()

        return await shikimori.animes.list({
            limit: 10,
            season: currentYear,
            status: 'ongoing',
            order: "popularity"
        })
    }

    const carouselSlides = Array.from({ length: 10 })

    const carouselSection = isPending ? (
        carouselSlides.map((_skeleton, index) => {
            return (
                <Carousel.Slide key={index}>
                    <Skeleton width={225} height={317} />
                </Carousel.Slide>
            )
        })
    ) : (
        data && data?.map((animeTitle) => {
            return (
                <Carousel.Slide key={animeTitle.id}>
                    <CarouselCard animeTitle={animeTitle} shikimoriURL={shikimoriURL} />
                </Carousel.Slide>
            )
        })
    )

    return (
        <div className={classes.hero}>
            <Carousel slideSize={225} height={317} slideGap="md" controlsOffset="md" controlSize={40} loop dragFree withIndicators>
                {
                    carouselSlides.map((_slide, index) => {
                        return (
                            <Carousel.Slide key={index}>
                                {
                                    isPending
                                        ? (
                                            <Skeleton width={225} height={317} />
                                        )
                                        : (
                                            <CarouselCard animeTitle={data[index]} shikimoriURL={shikimoriURL} />
                                        )
                                }
                            </Carousel.Slide>
                        )
                    })
                }
            </Carousel>
        </div>
    );
}