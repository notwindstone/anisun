"use client"

import classes from './HeroContent.module.css';
import {Carousel} from "@mantine/carousel";
import {useQuery} from "@tanstack/react-query";
import {client} from "node-shikimori";
import {Image, Skeleton} from "@mantine/core";
import NextImage from "next/image";
import translateShikimoriStatus from "@/utils/translateShikimoriStatus";

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
        <Carousel slideSize={300} height={400} slideGap="md" controlsOffset="md" controlSize={40} loop dragFree withIndicators>
            {
                data && data?.map((animeTitle) => {
                    return (
                        <Carousel.Slide key={animeTitle.id}>
                            <div>
                                {translateShikimoriStatus(animeTitle.status)}
                                {animeTitle.score}
                                {animeTitle.aired_on?.split('-')[0]}
                                {animeTitle.episodes}
                                {animeTitle.russian}
                            </div>
                            <Image
                                alt="Anime poster"
                                src={shikimoriURL + animeTitle.image.original}
                                placeholder="blur"
                                blurDataURL="/blurredPlaceholderImage.png"
                                width={300}
                                height={400}
                                component={NextImage}
                                className={classes.poster}
                                radius="sm"
                            />
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