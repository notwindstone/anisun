import {Carousel} from "@mantine/carousel";
import HeroCard from "@/components/Hero/HeroCard/HeroCard";
import {Flex, rem, Skeleton, Text} from "@mantine/core";
import {WrapperResponseInterface} from "@/types/Shikimori/Responses/Interfaces/WrapperResponse.interface";
import HeroMobileCard from "@/components/Hero/HeroMobileCard/HeroMobileCard";

interface HeroResponseInterface extends WrapperResponseInterface {
    status: "error" | "success" | "pending";
    error: Error | null;
    slidesLength: undefined[];
    debouncedHeight: number;
    isMobile?: boolean;
}

export default function HeroSlides({
    data,
    status,
    error,
    slidesLength,
    debouncedHeight,
    isMobile
}: HeroResponseInterface) {
    return slidesLength.map((_slide, index) => {
        let currentSlide;

        switch (status) {
            case "success":
                currentSlide = isMobile ? (
                    <HeroMobileCard animeTitle={data?.animes?.[index]} debouncedHeight={debouncedHeight} />
                ) : (
                    <HeroCard animeTitle={data?.animes?.[index]} debouncedHeight={debouncedHeight} />
                );
                break;
            case "pending":
                currentSlide = isMobile ? (
                    <Flex
                        h={debouncedHeight}
                        pl={rem(64)}
                        pr={rem(64)}
                        align="flex-end"
                    >
                        <Skeleton radius={32} h={debouncedHeight - 64} />
                    </Flex>
                ) : (
                    <Skeleton radius={0} w="100%" h={debouncedHeight} />
                );
                break;
            case "error":
            default:
                currentSlide = (
                    <Text>Ошибка: {error?.message}</Text>
                );
        }

        return (
            <Carousel.Slide
                key={index}
            >
                {currentSlide}
            </Carousel.Slide>
        );
    });
}