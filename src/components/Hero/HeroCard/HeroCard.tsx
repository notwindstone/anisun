import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";
import {useDebouncedValue, useInViewport} from "@mantine/hooks";
import {
    AspectRatio,
    Box,
    Center,
    Container,
    Image,
    Overlay,
    Paper,
    rem,
    Skeleton,
    Text,
    Title,
    Transition
} from "@mantine/core";
import Link from "next/link";
import classes from './HeroCard.module.css';
import {variables} from "@/configs/variables";
import NextImage from "next/image";

export default function HeroCard({ animeTitle }: { animeTitle: AnimeType }) {
    const { ref, inViewport } = useInViewport();

    return (
        <AspectRatio
            ratio={ 16 / 9 }
            className={classes.wrapper}
        >
            <Center>
                <Box
                    p={rem(64)}
                    ref={ref}
                />
            </Center>
            <Image
                className={classes.poster}
                style={{
                    scale: inViewport ? 1 : 1.2,
                }}
                alt="Anime poster"
                component={NextImage}
                src={animeTitle?.poster?.originalUrl}
                placeholder="blur"
                blurDataURL={variables.imagePlaceholder}
                fill
            />
            <Overlay
                backgroundOpacity={inViewport ? 0.5 : 0.8}
                blur={inViewport ? 0 : 2}
                className={classes.overlay}
            >

            </Overlay>
        </AspectRatio>
    )
}