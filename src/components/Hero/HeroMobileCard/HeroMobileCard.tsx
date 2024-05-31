import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";
import {Badge, Box, Container, Group, Image, MantineSize, Overlay, rem, Stack, Title, TitleOrder} from "@mantine/core";
import {useInViewport, useViewportSize} from "@mantine/hooks";
import classes from "./HeroMobileCard.module.css";
import NextImage from "next/image";
import {variables} from "@/configs/variables";
import Link from "next/link";
import {getScoreBadgeColor} from "@/utils/Misc/getScoreBadgeColor";

export default function HeroMobileCard({
    animeTitle,
    debouncedHeight
}: {
    animeTitle?: AnimeType,
    debouncedHeight: number
}) {
    const { width: viewportWidth } = useViewportSize();
    const { ref, inViewport } = useInViewport();

    let size: MantineSize;
    let order: TitleOrder;

    if (viewportWidth < 300) {
        size = "xs";
        order = 4;
    } else if (viewportWidth < 450) {
        size = "sm";
        order = 3;
    } else if (viewportWidth < 600) {
        size = "md";
        order = 2;
    } else {
        size = "lg";
        order = 1;
    }

    const scoreBadgeColor = getScoreBadgeColor({ score: animeTitle?.score });

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
            <Box
                component={Link}
                href={`/titles/${animeTitle?.url.replace('https://shikimori.one/animes/', '')}`}
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
                            order={order}
                            lineClamp={2}
                        >
                            {animeTitle?.name}
                        </Title>
                        <Group
                            w="100%"
                            justify="flex-start"
                        >
                            <Badge
                                size={size}
                                color={scoreBadgeColor}
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
                                            size={size}
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
            </Box>
        </Container>
    );
}