import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";
import {Badge, Box, Container, Group, Image, Overlay, rem, Stack, Title} from "@mantine/core";
import {useInViewport} from "@mantine/hooks";
import classes from "./HeroMobileCard.module.css";
import NextImage from "next/image";
import {variables} from "@/configs/variables";
import useCustomTheme from "@/hooks/useCustomTheme";

export default function HeroMobileCard({
    animeTitle,
    debouncedHeight
}: {
    animeTitle?: AnimeType,
    debouncedHeight: number
}) {
    const { ref, inViewport } = useInViewport();
    const { theme } = useCustomTheme();

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
                style={{
                    transform: inViewport ? 'translateY(-32px)' : 'translateY(0)'
                }}
                h={debouncedHeight - 64}
                className={classes.imageWrapper}
            >
                <Image
                    className={classes.poster}
                    alt="Anime poster"
                    component={NextImage}
                    src={animeTitle?.poster?.originalUrl}
                    placeholder="blur"
                    blurDataURL={variables.imagePlaceholder}
                    fill
                />
                <Overlay
                    backgroundOpacity={0.5}
                    className={classes.overlay}
                >
                    <Stack
                        p={rem(32)}
                        w="100%"
                        h="100%"
                        align="flex-start"
                        justify="flex-end"
                    >
                        <Title
                            className={classes.title}
                            lineClamp={2}
                        >
                            {animeTitle?.name}
                        </Title>
                        <Group
                            w="100%"
                            justify="flex-start"
                        >
                            <Badge
                                size="lg"
                                autoContrast
                                color={theme.color}
                            >
                                {animeTitle?.score}
                            </Badge>
                            {
                                animeTitle?.genres.map((genre, index) => {
                                    if (index >= 3) {
                                        return;
                                    }

                                    return (
                                        <Badge
                                            size="lg"
                                            variant="light"
                                            color="white"
                                            key={
                                                `${animeTitle?.id}_${genre.name}`
                                            }
                                        >
                                            {genre.russian}
                                        </Badge>
                                    );
                                })
                            }
                        </Group>
                    </Stack>
                </Overlay>
            </Container>

        </Container>
    );
}