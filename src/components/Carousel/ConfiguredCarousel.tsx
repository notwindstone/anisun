"use client"

import CarouselSlides from "@/components/Carousel/CarouselSlides/CarouselSlides";
import {Carousel} from "@mantine/carousel";
import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";

export default function ConfiguredCarousel(
    {
        status,
        carouselSlides,
        error,
        data
    } : {
        status: "success" | "error" | "pending";
        carouselSlides: undefined[];
        error: Error | null;
        data?: AnimeType[];
    }
) {
    return (
        <Carousel
            slideSize={225}
            height={325}
            slideGap="md"
            controlsOffset="md"
            controlSize={40}
            loop
            dragFree
        >
            <CarouselSlides
                carouselSlides={carouselSlides}
                error={error}
                status={status}
                data={data}
            />
        </Carousel>
    )
}