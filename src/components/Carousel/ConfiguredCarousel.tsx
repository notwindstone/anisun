"use client"

import CarouselSlides from "@/components/Carousel/CarouselSlides/CarouselSlides";
import {Carousel} from "@mantine/carousel";
import classes from './ConfiguredCarousel.module.css';

export default function ConfiguredCarousel() {
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
                carouselSlides={[1, 2, 3, 4, 5, 6]}
                error={null}
                status={"success"}
                data={{ animes: {} }}
            />
        </Carousel>
    )
}