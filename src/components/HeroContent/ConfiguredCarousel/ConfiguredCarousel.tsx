"use client"

import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import {client} from "@/lib/shikimori/client";
import {StatusType} from "@/types/Shikimori/Responses/Types/StatusType";
import {useQuery} from "@tanstack/react-query";
import classes from "./ConfiguredCarousel.module.css"
import {Title} from "@mantine/core";
import {Carousel} from "@mantine/carousel";
import CarouselSlides from "@/components/HeroContent/CarouselSlides/CarouselSlides";

export default function ConfiguredCarousel(
    {
        direction,
        queryKey,
        order,
        title,
    }: {
        direction: "forward" | "backward";
        queryKey: "newest" | "popular";
        order: "created_at" | "popularity";
        title: string;
    }
) {
    const autoplay
        = useRef(
        AutoScroll({
            speed: 2,
            direction: direction,
            playOnInit: false,
        })
    );
    const shikimori = client()
    const currentYear = new Date().getFullYear().toString()
    const [year, setYear] = useState(currentYear)
    const [animeStatus, setAnimeStatus]: [animeStatus: StatusType | undefined, Dispatch<SetStateAction<StatusType | undefined>>] = useState<StatusType | undefined>("ongoing")

    const { data, status, error } = useQuery({
        queryKey: ['hero', queryKey, year],
        queryFn: getNewestTitles,
    });

    async function getNewestTitles() {
        return await shikimori.animes.list({
            limit: 15,
            status: animeStatus,
            year: year,
            order: order
        })
    }

    const carouselSlides = Array.from({ length: 15 })

    if (status === 'success' && data.animes.length < 15) {
        const previousYear = (new Date().getFullYear() - 1).toString()
        setYear(previousYear)
        setAnimeStatus("released")
    }

    useEffect(() => {
        if (data?.animes.length !== 15) {
            return
        }

        autoplay.current.play()
    }, [data]);

    return (
        <div className={classes.hero}>
            <Title>{title}</Title>
            <Carousel
                classNames={{
                    control: classes.control
                }}
                slideSize={225}
                height={325}
                slideGap="md"
                controlsOffset="md"
                controlSize={40}
                loop
                dragFree
                plugins={[autoplay.current]}
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={autoplay.current.play}
            >
                <CarouselSlides carouselSlides={carouselSlides} error={error} status={status} data={data} />
            </Carousel>
        </div>
    );
}