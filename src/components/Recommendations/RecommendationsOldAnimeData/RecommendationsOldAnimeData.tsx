import classes from "@/components/Recommendations/Recommendations.module.css";
import RecommendationsShareButton
    from "@/components/Recommendations/RecommendationsShareButton/RecommendationsShareButton";
import {AspectRatio, Badge, Container, Group, Image, Stack, Text} from "@mantine/core";
import {variables} from "@/configs/variables";
import NextImage from "next/image";
import {formatAiredOnDate} from "@/utils/Misc/formatAiredOnDate";
import {OldAnimeType} from "@/types/Shikimori/Responses/Types/OldAnime.type";

export default function RecommendationsOldAnimeData({
    anime,
    redirectUser,
    translatedKind,
    translatedStatus
}: {
    anime: OldAnimeType;
    redirectUser: () => void;
    translatedKind: string;
    translatedStatus: string;
}) {
    return (
        <div className={classes.recommendationWrapper}>
            <RecommendationsShareButton url={anime.url}/>
            <Group
                onClick={redirectUser}
                className={classes.group}
                align="flex-start"
            >
                <AspectRatio className={classes.aspectRatio} ratio={16 / 9}>
                    <Container fluid className={classes.container}>
                        <Image
                            alt="Anime preview"
                            src={`https://shikimori.one${anime?.image.original}`}
                            placeholder="blur"
                            blurDataURL={variables.imagePlaceholder}
                            fill
                            component={NextImage}
                            radius="md"
                        />
                        <Badge
                            size="xs"
                            autoContrast
                            color="black"
                            className={classes.scoreBadge}
                        >
                            {anime.score}
                        </Badge>
                        <Badge
                            size="xs"
                            autoContrast
                            color="black"
                            className={classes.episodesBadge}
                        >
                            {anime.episodes_aired} / {anime.episodes}
                        </Badge>
                    </Container>
                </AspectRatio>
                <Stack className={classes.stack} h="100%" justify="flex-start">
                    <Text className={classes.title} lineClamp={2}>
                        {anime?.russian ?? anime.name}
                        {anime?.russian && ` - ${anime.name}`}
                    </Text>
                    <Text className={classes.text} lineClamp={1}>
                        {`${translatedKind}, ${translatedStatus}`}
                    </Text>
                    <Text className={classes.text} lineClamp={1}>
                        {formatAiredOnDate(anime.aired_on)}
                    </Text>
                </Stack>
            </Group>
        </div>
    );
}