import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";
import {AspectRatio, Badge, Box, Flex, Image, Overlay, Title} from "@mantine/core";
import useCustomTheme from "@/hooks/useCustomTheme";
import {getScoreBadgeColor} from "@/utils/Misc/getScoreBadgeColor";
import {variables} from "@/configs/variables";
import NextImage from "next/image";
import classes from './TrendingCard.module.css';
import Link from "next/link";
import translateAnimeStatus from "@/utils/Translates/translateAnimeStatus";

export default function TrendingCard({ anime }: { anime: AnimeType }) {
    const { theme } = useCustomTheme();
    const animeStatus = anime?.status ?? "";
    const isAnnounced = animeStatus === 'anons';
    const isReleased = animeStatus === 'released';
    const scoreBadgeColor = getScoreBadgeColor({ score: anime?.score });
    const episodesBadge = isReleased
        ? `${anime?.episodes} / ${anime?.episodes}`
        : `${anime?.episodesAired} / ${anime?.episodes}`;

    return (
        <Box
            component={Link}
            href={`/titles/${anime?.url.replace('https://shikimori.one/animes/', '')}`}
        >
            <AspectRatio
                className={classes.aspectRatio}
                ratio={ 3 / 4 }
            >
                <Overlay
                    backgroundOpacity={0.4}
                    radius="md"
                    className={classes.overlay}
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
                                {anime?.score}
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
                                    {episodesBadge}
                                </Badge>
                            )
                        }
                        <Title
                            className={classes.title}
                            order={3}
                            lineClamp={isAnnounced ? 3 : 2}
                        >
                            {anime?.russian}
                        </Title>
                    </Flex>
                </Overlay>
                <Box
                    className={classes.imageWrapper}
                    w="100%"
                    h="100%"
                >
                    <Image
                        className={classes.image}
                        radius="md"
                        alt="Anime poster"
                        src={anime?.poster?.originalUrl}
                        placeholder="blur"
                        blurDataURL={variables.imagePlaceholder}
                        fill
                        component={NextImage}
                    />
                </Box>
            </AspectRatio>
        </Box>
    );
}