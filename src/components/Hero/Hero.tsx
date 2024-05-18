"use client"

import {useCallback, useEffect, useState} from "react";
import {Carousel, Embla} from "@mantine/carousel";
import {Progress} from "@mantine/core";

export default function Hero() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [embla, setEmbla] = useState<Embla | null>(null);

    const handleScroll = useCallback(() => {
        if (!embla) return;
        const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
        setScrollProgress(progress * 100);
    }, [embla, setScrollProgress]);

    useEffect(() => {
        if (embla) {
            embla.on('scroll', handleScroll);
            handleScroll();
        }
    }, [embla]);

    return (
        <>
            <Carousel
                slideSize="100%"
                slideGap="md"
                height={200}
                getEmblaApi={setEmbla}
                initialSlide={2}
            >
                <Carousel.Slide>1</Carousel.Slide>
                <Carousel.Slide>2</Carousel.Slide>
                <Carousel.Slide>3</Carousel.Slide>
            </Carousel>
            <Progress
                value={scrollProgress}
                maw={320}
                size="sm"
                mt="xl"
                mx="auto"
            />
        </>
    );
}