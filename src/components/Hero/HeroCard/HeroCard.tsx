import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";
import {useDebouncedValue, useInterval, useInViewport, useLocalStorage, useTimeout} from "@mantine/hooks";
import {
    AspectRatio, Badge,
    Box,
    Center,
    Container, Flex, Group,
    Image, MantineTransition,
    Overlay,
    Paper,
    rem,
    Skeleton, Stack,
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
import {ThemeType} from "@/types/CustomThemeContext/Theme.type";
import defaultTheme from "@/configs/defaultTheme.json";
import useCustomTheme from "@/hooks/useCustomTheme";

const TRANSITION_PROPS: TransitionStylesType = {
    transition: "fade-left",
    duration: 1000,
    timingFunction: "ease",
}

export default function HeroCard({ animeTitle }: { animeTitle?: AnimeType }) {
    const { ref, inViewport } = useInViewport();
    const [debouncedSlightlyInViewport] = useDebouncedValue(inViewport, 200);
    const [debouncedLongerInViewport] = useDebouncedValue(inViewport, 400);
    const { theme } = useCustomTheme()

    return (
        <AspectRatio
            ratio={ 16 / 9 }
            className={classes.wrapper}
        >
            <Box
                className={classes.centerBox}
                ref={ref}
            />
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
                <Container
                    fluid
                >
                    <Stack
                        w="fit-content"
                        align="flex-start"
                        justify="flex-start"
                    >
                        <Transition
                            mounted={inViewport}
                            {...TRANSITION_PROPS}
                        >
                            {
                                (styles) => (
                                    <Title className={classes.title} style={styles}>
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
                                        <Badge
                                            autoContrast
                                            color={theme.color}
                                        >
                                            {animeTitle?.score}
                                        </Badge>
                                        {
                                            animeTitle?.genres.map((genre, index) => {
                                                if (index >= 3) {
                                                    return
                                                }

                                                return (
                                                    <Badge
                                                        variant="light"
                                                        color="white"
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
                    </Stack>
                </Container>
            </Overlay>
        </AspectRatio>
    )
}