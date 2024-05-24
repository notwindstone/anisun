import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";
import {Box, Container, Image, rem} from "@mantine/core";
import {useInViewport} from "@mantine/hooks";
import classes from "./HeroMobileCard.module.css";
import NextImage from "next/image";
import {variables} from "@/configs/variables";

export default function HeroMobileCard({
    animeTitle,
    debouncedHeight
}: {
    animeTitle?: AnimeType,
    debouncedHeight: number
}) {
    const { ref, inViewport } = useInViewport();

    return (
        <Container
            fluid
            h={debouncedHeight}
            pl={rem(64)}
            pr={rem(64)}
            className={classes.wrapper}
        >
            <Box
                h={debouncedHeight}
                className={classes.centerBox}
                ref={ref}
            />
            <Container
                fluid
                h={debouncedHeight - 64}
                className={classes.imageWrapper}
            >
                <Image
                    className={classes.poster}
                    style={{
                        transform: inViewport ? 'translateY(-32px)' : 'translateY(0)'
                    }}
                    alt="Anime poster"
                    component={NextImage}
                    src={animeTitle?.poster?.originalUrl}
                    placeholder="blur"
                    blurDataURL={variables.imagePlaceholder}
                    fill
                />
            </Container>

        </Container>
    );
}