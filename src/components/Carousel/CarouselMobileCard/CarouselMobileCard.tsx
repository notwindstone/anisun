import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";
import useCustomTheme from "@/hooks/useCustomTheme";
import {variables} from "@/configs/variables";
import {Badge, Flex, Image, Overlay, Paper, Title} from "@mantine/core";
import Link from "next/link";
import classes from "./CarouselMobileCard.module.css";
import translateAnimeStatus from "@/utils/Translates/translateAnimeStatus";
import NextImage from "next/image";
import {getScoreBadgeColor} from "@/utils/Misc/getScoreBadgeColor";
import {useTranslations} from "next-intl";

export default function CarouselMobileCard({
    animeTitle,
}: {
    animeTitle?: AnimeType;
}) {
    const translate = useTranslations('Translations');
    const info = useTranslations('Info');
    const locale = info('locale');
    const { theme } = useCustomTheme();
    const animeStatus = animeTitle?.status ?? "";
    const isAnnounced = animeStatus === 'anons';
    const isReleased = animeStatus === 'released';
    const scoreBadgeColor = getScoreBadgeColor({ score: animeTitle?.score });
    const episodesBadge = isReleased
        ? `${animeTitle?.episodes} / ${animeTitle?.episodes}`
        : `${animeTitle?.episodesAired} / ${animeTitle?.episodes}`;

    let animeName;

    switch (locale) {
        case "en":
            animeName = animeTitle?.english;
            break;
        case "ru":
            animeName = animeTitle?.russian;
            break;
        default:
            animeName = animeTitle?.english;
            break;
    }

    return (
        <Paper
            component={Link}
            href={`/titles/${animeTitle?.url.replace('https://shikimori.one/animes/', '')}`}
            radius="xl"
            className={classes.card}
        >
            <Overlay
                radius="xl"
                gradient="linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)"
                className={classes.overlay}
            >
                <Badge className={classes.status} color="black">
                    {
                        translate(
                            translateAnimeStatus({ sortingType: animeStatus, singular: true })
                        )
                    }
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
                                {episodesBadge}
                            </Badge>
                        )
                    }
                    <Title
                        className={classes.title}
                        order={3}
                        lineClamp={isAnnounced ? 3 : 2}
                    >
                        {animeName}
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