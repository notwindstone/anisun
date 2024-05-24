import {Carousel} from "@mantine/carousel";
import {Skeleton} from "@mantine/core";
import CarouselCard from "@/components/Carousel/CarouselCard/CarouselCard";
import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";

export default function CarouselSlides(
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
    return carouselSlides.map((_slide, index) => {
        return (
            <Carousel.Slide key={index}>
                {
                    (status === 'success' && data !== undefined)
                        ? (
                            <>
                                <CarouselCard animeTitle={data?.[index]} />
                            </>
                        ) : status === 'error' ? (
                            <>Error: {error?.message}</>
                        ) : (
                            <Skeleton width={209} height={317} />
                        )
                }
            </Carousel.Slide>
        );
    });
}