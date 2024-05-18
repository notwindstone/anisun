import {Carousel} from "@mantine/carousel";
import {Skeleton} from "@mantine/core";
import CarouselCard from "@/components/Carousel/CarouselCard/CarouselCard";

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
        data: { animes: {  } } | undefined;
    }
) {
    return carouselSlides.map((_slide, index) => {
        return (
            <Carousel.Slide key={index}>
                {
                    (status === 'success' && data !== undefined)
                        ? (
                            <>
                                <CarouselCard />
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