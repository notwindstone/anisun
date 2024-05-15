"use client"

import Slides from "@/components/Carousel/Slides/Slides";
import {Carousel} from "@mantine/carousel";

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
            <Slides
                carouselSlides={[1, 2]}
                error={null}
                status={"success"}
                data={{ animes: {} }}
            />
        </Carousel>
    )
}