"use client"

import classes from './HeroContent.module.css';
import {Carousel} from "@mantine/carousel";
import {useQuery} from "@tanstack/react-query";
import {Skeleton, Title} from "@mantine/core";
import CarouselCard from "@/components/CarouselCard/CarouselCard";
import {useState} from "react";
import {client} from "@/lib/shikimori/client";

export function HeroContent() {
    const shikimori = client()
    const currentYear = new Date().getFullYear().toString()
    const [year, setYear] = useState(currentYear)

    const { data, status, error } = useQuery({
        queryKey: ['hero', year],
        queryFn: getPopularTitles,
    });

    async function getPopularTitles() {
        return await shikimori.animes.list({
            limit: 12,
            status: "ongoing",
            year: year,
            order: "popularity"
        })
    }

    const carouselSlides = Array.from({ length: 12 })

    if (status === 'success' && data.animes.length < 12) {
        const previousYear = (new Date().getFullYear() - 1).toString()
        setYear(previousYear)
    }

    return (
        <div className={classes.hero}>
            <Title>Сейчас популярно:</Title>
            <Carousel slideSize={225} height={325} slideGap="md" controlsOffset="md" controlSize={40} loop dragFree>
                {
                    carouselSlides.map((_slide, index) => {
                        return (
                            <Carousel.Slide key={index}>
                                {
                                    status === 'success'
                                        ? (
                                            <>
                                                <CarouselCard animeTitle={data.animes[index]} />
                                            </>
                                        )
                                        : status === 'error' ? (
                                            <>Error: {error.message}</>
                                        ) : (
                                            <Skeleton width={209} height={317} />
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