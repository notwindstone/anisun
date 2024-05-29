import {Badge, Flex, Image, Overlay, Paper, Title} from "@mantine/core";
import classes from './CarouselCard.module.css';
import NextImage from "next/image";
import Link from "next/link";
import { variables } from '@/configs/variables';
import useCustomTheme from "@/hooks/useCustomTheme";
import {useHover} from "@mantine/hooks";
import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";
import translateAnimeStatus from "@/utils/Translates/translateAnimeStatus";
import {getScoreBadgeColor} from "@/utils/Misc/getScoreBadgeColor";

export default function CarouselCard({
    animeTitle,
}: {
    animeTitle?: AnimeType;
}) {
    const { theme } = useCustomTheme();
    const { hovered, ref } = useHover();
    const color = theme.color;
    // It can be MantineColor or HEXType code
    // @ts-ignore
    const isMantineColor = variables.mantineColors.includes(color);
    const mantineColor = color === "black" ? "#000000" : `var(--mantine-color-${color}-6)`;
    const calculatedColor = isMantineColor ? mantineColor : color;
    const animeStatus = animeTitle?.status ?? "";
    const isAnnounced = animeStatus === 'anons';
    const scoreBadgeColor = getScoreBadgeColor({ score: animeTitle?.score });


    return (
        <Paper
            component={Link}
            href={`/titles/${animeTitle?.url.replace('https://shikimori.one/animes/', '')}`}
            radius="xl"
            className={classes.card}
        >
            <Overlay
                ref={ref}
                radius="xl"
                gradient="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)"
                className={classes.overlay}
                style={{
                    outlineColor: hovered
                        ? calculatedColor
                        : "#00000000"
                }}
            >
                <Badge className={classes.status} color="black">
                    {translateAnimeStatus({ sortingType: animeStatus, singular: true })}
                </Badge>
                {
                    !isAnnounced && (
                        <Badge
                            className={classes.score}
                            color={scoreBadgeColor}
                        >
                            {animeTitle?.score}
                        </Badge>
                    )
                }
                <Flex
                    className={classes.info}
                    direction="column"
                    justify="flex-end"
                    gap="0.25rem"
                >
                    {
                        !isAnnounced && (
                            <Badge autoContrast className={classes.episodes} color={theme.color}>
                                {animeTitle?.episodesAired} / {animeTitle?.episodes}
                            </Badge>
                        )
                    }
                    <Title
                        className={classes.title}
                        order={3}
                        lineClamp={isAnnounced ? 3 : 2}
                    >
                        {animeTitle?.russian}
                    </Title>
                </Flex>
            </Overlay>
            <Image
                alt="Anime poster"
                src={animeTitle?.poster?.originalUrl}
                placeholder="blur"
                blurDataURL={variables.imagePlaceholder}
                width={300}
                height={325}
                component={NextImage}
                className={classes.poster}
                radius="xl"
            />
        </Paper>
    );
}