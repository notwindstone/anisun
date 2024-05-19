import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";
import {useDebouncedValue, useInterval, useInViewport, useTimeout} from "@mantine/hooks";
import {
    AspectRatio, Badge,
    Box,
    Center,
    Container, Group,
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
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";

const TRANSITION_PROPS: TransitionStylesType = {
    transition: "fade-left",
    duration: 1000,
    timingFunction: "ease",
}

export default function HeroCard({ animeTitle }: { animeTitle: AnimeType }) {
    const { ref, inViewport } = useInViewport();
    const [debouncedSlightlyInViewport] = useDebouncedValue(inViewport, 200);
    const [debouncedLongerInViewport] = useDebouncedValue(inViewport, 400);

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
                                <Title style={styles}>
                                    {animeTitle?.name}
                                </Title>
                            )
                        }
                    </Transition>
                    <Transition
                        mounted={debouncedSlightlyInViewport}
                        {...TRANSITION_PROPS}
                    >
                        {
                            (styles) => (
                                <Group style={styles}>
                                    <Badge>{animeTitle?.score}</Badge>
                                    {
                                        animeTitle?.genres.map((genre, index) => {
                                            if (index >= 3) {
                                                return
                                            }

                                            return (
                                                <Badge
                                                    variant="light"
                                                    color="gray"
                                                    key={
                                                        `${animeTitle.id}_${genre.name}`
                                                    }
                                                >
                                                    {genre.russian}
                                                </Badge>
                                            )
                                        })
                                    }
                                </Group>
                            )
                        }
                    </Transition>
                    <Transition
                        mounted={debouncedLongerInViewport}
                        {...TRANSITION_PROPS}
                    >
                        {
                            (styles) => (
                                <DecoratedButton
                                    radius="md"
                                    style={styles}
                                >
                                    Перейти
                                </DecoratedButton>
                            )
                        }
                    </Transition>
                </Container>
            </Overlay>
        </AspectRatio>
    )
}