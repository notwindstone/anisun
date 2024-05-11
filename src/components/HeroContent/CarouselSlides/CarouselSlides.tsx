import {Carousel} from "@mantine/carousel";
import CarouselCard from "@/components/HeroContent/CarouselCard/CarouselCard";
import {Skeleton} from "@mantine/core";
import {AnimeType} from "@/types/Shikimori/Responses/Types/AnimeType";

export default function CarouselSlides(
    {
        status,
        carouselSlides,
        error,
        data
    } : {
        status: "success" | "error" | "pending";
        carouselSlides: unknown[];
        error: Error | null;
        data: { animes: AnimeType[] } | undefined;
    }
) {
    return carouselSlides.map((_slide, index) => {
            return (
                <Carousel.Slide key={index}>
                    {
                        (status === 'success' && data !== undefined)
                            ? (
                                <>
                                    <CarouselCard animeTitle={data.animes[index]} />
                                </>
                            ) : status === 'error' ? (
                                <>Error: {error?.message}</>
                            ) : (
                                <Skeleton width={209} height={317} />
                            )
                    }
                </Carousel.Slide>
            )
        })
}