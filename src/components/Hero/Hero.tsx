"use client"

import {useCallback, useEffect, useState} from "react";
import {Carousel, Embla} from "@mantine/carousel";
import {Progress} from "@mantine/core";
import {useInViewport} from "@mantine/hooks";
import HeroSlides from "@/components/Hero/HeroSlides/HeroSlides";

export default function Hero() {
    return (
        <>
            <Carousel
                slideSize="100%"
                slideGap="md"
                height={200}
                initialSlide={3}
                loop
            >
                {
                    [1,2,3,4,5].map((value, index, array) => {
                        return (
                            <HeroSlides key={value}>
                            </HeroSlides>
                        )
                    })
                }
            </Carousel>
        </>
    );
}