import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";
import {AspectRatio, Badge, Box, Flex, Image, Overlay, Title} from "@mantine/core";
import useCustomTheme from "@/hooks/useCustomTheme";
import {getScoreBadgeColor} from "@/utils/Misc/getScoreBadgeColor";
import {variables} from "@/configs/variables";
import NextImage from "next/image";
import classes from './TrendingCard.module.css';
import Link from "next/link";
import translateAnimeStatus from "@/utils/Translates/translateAnimeStatus";
import {useTranslations} from "next-intl";

export default function TrendingCard({ anime }: { anime: AnimeType }) {
    const translate = useTranslations('Translations');
    const info = useTranslations('Info');
    const locale = info('locale');
    const { theme } = useCustomTheme();
    const animeStatus = anime?.status ?? "";
    const isAnnounced = animeStatus === 'anons';
    const isReleased = animeStatus === 'released';
    const scoreBadgeColor = getScoreBadgeColor({ score: anime?.score });
    const episodesBadge = isReleased
        ? `${anime?.episodes} / ${anime?.episodes}`
        : `${anime?.episodesAired} / ${anime?.episodes}`;
    const translatedStatus = translate(
        translateAnimeStatus({ sortingType: animeStatus, singular: true })
    );

    let animeName;

    switch (locale) {
        case "en":
            animeName = anime?.english;
            break;
        case "ru":
            animeName = anime?.russian;
            break;
        default:
            animeName = anime?.english;
            break;
    }

    return (
        <Box
            w="100%" h="100%"
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
                        {translatedStatus}
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
                            {animeName ?? anime?.name}
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