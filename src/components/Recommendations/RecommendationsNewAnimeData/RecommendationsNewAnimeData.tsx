import classes from "@/components/Recommendations/Recommendations.module.css";
import RecommendationsShareButton
    from "@/components/Recommendations/RecommendationsShareButton/RecommendationsShareButton";
import {AspectRatio, Badge, Container, Group, Image, Stack, Text} from "@mantine/core";
import {variables} from "@/configs/variables";
import NextImage from "next/image";
import {formatAiredOnDate} from "@/utils/Misc/formatAiredOnDate";
import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";
import {useTranslations} from "next-intl";

export default function RecommendationsNewAnimeData({
    anime,
    redirectUser,
    translatedKind,
    translatedStatus
}: {
    anime: AnimeType;
    redirectUser: () => void;
    translatedKind: string;
    translatedStatus: string;
}) {
    const info = useTranslations('Info');
    const locale = info('locale');
    const isReleased = anime?.status === 'released';
    const episodesBadge = isReleased
        ? `${anime?.episodes} / ${anime?.episodes}`
        : `${anime?.episodesAired} / ${anime?.episodes}`;

    let animeName;

    switch (locale) {
        case "en":
            animeName = `${anime?.name}${anime?.english ? ` - ${anime.english}` : ''}`;
            break;
        case "ru":
            animeName = `${anime?.name}${anime?.russian ? ` - ${anime.russian}` : ''}`;
            break;
        default:
            animeName = `${anime?.name}${anime?.english ? ` - ${anime.english}` : ''}`;
            break;
    }

    return (
        <div className={classes.recommendationWrapper}>
            <RecommendationsShareButton url={anime?.url.replace('https://shikimori.one/animes/', '')}/>
            <Group
                onClick={redirectUser}
                className={classes.group}
                align="flex-start"
            >
                <AspectRatio className={classes.aspectRatio} ratio={16 / 9}>
                    <Container fluid className={classes.container}>
                        <Image
                            alt="Anime preview"
                            src={anime?.poster?.originalUrl}
                            placeholder="blur"
                            blurDataURL={variables.imagePlaceholder}
                            fill
                            component={NextImage}
                            radius="md"
                        />
                        <div className={classes.scoreBadgeWrapper}>
                            <Badge
                                size="xs"
                                autoContrast
                                color="black"
                                className={classes.scoreBadge}
                            >
                                {anime.score}
                            </Badge>
                        </div>
                        <div className={classes.episodesBadgeWrapper}>
                            <Badge
                                size="xs"
                                autoContrast
                                color="black"
                                className={classes.episodesBadge}
                            >
                                {episodesBadge}
                            </Badge>
                        </div>
                    </Container>
                </AspectRatio>
                <Stack className={classes.stack} h="100%" justify="flex-start">
                    <Text className={classes.title} lineClamp={2}>
                        {animeName}
                    </Text>
                    <Text className={classes.text} lineClamp={1}>
                        {`${translatedKind}, ${translatedStatus}`}
                    </Text>
                    <Text className={classes.text} lineClamp={1}>
                        {
                            formatAiredOnDate({ airedOnDate: anime.airedOn?.date ?? '', locale: locale })
                        }
                    </Text>
                </Stack>
            </Group>
        </div>
    );
}