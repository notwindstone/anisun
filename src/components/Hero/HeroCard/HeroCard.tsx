import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";
import {useDebouncedValue, useInterval, useInViewport, useTimeout} from "@mantine/hooks";
import {
    AspectRatio,
    Box,
    Center,
    Container,
    Image, MantineTransition,
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
import {useState} from "react";
import {TransitionStylesType} from "@/types/Transition/TransitionStyles.type";

const TRANSITION_PROPS: TransitionStylesType = {
    transition: "fade-left",
    duration: 1000,
    timingFunction: "ease",
}

export default function HeroCard({ animeTitle }: { animeTitle: AnimeType }) {
    const { ref, inViewport } = useInViewport();
    const [debouncedInViewport] = useDebouncedValue(inViewport, 200);

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
                <Container fluid>
                    <Transition
                        mounted={inViewport}
                        {...TRANSITION_PROPS}
                    >
                        {
                            (styles) => (
                                <Title style={styles}>{animeTitle?.name}</Title>
                            )
                        }
                    </Transition>
                    <Transition
                        mounted={debouncedInViewport}
                        {...TRANSITION_PROPS}
                    >
                        {
                            (styles) => (
                                <Text style={styles}>{animeTitle?.name}</Text>
                            )
                        }
                    </Transition>
                </Container>
            </Overlay>
        </AspectRatio>
    )
}