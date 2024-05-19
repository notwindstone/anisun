import {Carousel} from "@mantine/carousel";
import {ResponseInterface} from "@/types/Shikimori/Responses/Interfaces/Response.interface";
import HeroCard from "@/components/Hero/HeroCard/HeroCard";
import {Skeleton, Text} from "@mantine/core";

interface HeroResponseInterface extends ResponseInterface {
    status: "error" | "success" | "pending";
    error: Error | null;
    slidesLength: undefined[];
}

export default function HeroSlides({ data, status, error, slidesLength }: HeroResponseInterface) {
    return slidesLength.map((_slide, index) => {
        let currentSlide

        switch (status) {
            case "success":
                currentSlide = (
                    <HeroCard animeTitle={data?.animes?.[index]} />
                )
                break
            case "pending":
                currentSlide = (
                    <Skeleton radius={0} w="100%" h="40vh" />
                )
                break
            case "error":
            default:
                currentSlide = (
                    <Text>Ошибка: {error?.message}</Text>
                )
        }

        return (
            <Carousel.Slide
                key={index}
            >
                {currentSlide}
            </Carousel.Slide>
        )
    })
}