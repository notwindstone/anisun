import {Carousel} from "@mantine/carousel";
import {ResponseInterface} from "@/types/Shikimori/Responses/Interfaces/Response.interface";
import HeroCard from "@/components/Hero/HeroCard/HeroCard";
import {Skeleton} from "@mantine/core";

interface HeroResponseInterface extends ResponseInterface {
    isPending: boolean;
    error: Error | null;
    slidesLength: undefined[];
}

export default function HeroSlides({ data, isPending, error, slidesLength }: HeroResponseInterface) {
    if (error) {
        return (
            <>Error: {error.message}</>
        )
    }

    return slidesLength.map((_slide, index) => {
        return (
            <Carousel.Slide
                key={index}
            >
                {
                    isPending ? (
                        <Skeleton radius={0} w="100%" h="40vh" />
                    ) : (
                        <HeroCard animeTitle={data?.animes?.[index]} />
                    )
                }
            </Carousel.Slide>
        )
    })
}