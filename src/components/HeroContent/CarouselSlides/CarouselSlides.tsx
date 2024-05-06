import {Carousel} from "@mantine/carousel";
import CarouselCard from "@/components/CarouselCard/CarouselCard";
import {Skeleton} from "@mantine/core";

export default function CarouselSlides({ status, carouselSlides, error, data }) {
    return carouselSlides.map((_slide, index) => {
            return (
                <Carousel.Slide key={index}>
                    {
                        status === 'success'
                            ? (
                                <>
                                    <CarouselCard animeTitle={data.animes[index]} />
                                </>
                            )
                            : status === 'error' ? (
                                <>Error: {error.message}</>
                            ) : (
                                <Skeleton width={209} height={317} />
                            )
                    }
                </Carousel.Slide>
            )
        })
}