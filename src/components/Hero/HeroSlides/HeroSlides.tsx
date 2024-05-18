import {Carousel} from "@mantine/carousel";
import {ResponseInterface} from "@/types/Shikimori/Responses/Interfaces/Response.interface";
import HeroCard from "@/components/Hero/HeroCard/HeroCard";

interface HeroResponseInterface extends ResponseInterface {
    isPending: boolean;
    error: Error | null;
    slidesLength: undefined[];
}

export default function HeroSlides({ data, isPending, error, slidesLength }: HeroResponseInterface) {
    if (isPending) {
        return (
            <>Loading...</>
        )
    }

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
                <HeroCard animeTitle={data?.animes?.[index]} />
            </Carousel.Slide>
        )
    })
}