"use client";

import {AspectRatio, Badge, Container, Group, Image, rem, Skeleton, Stack, Text} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import {variables} from "@/configs/variables";
import NextImage from "next/image";
import classes from './Recommendations.module.css';
import translateAnimeKind from "@/utils/Translates/translateAnimeKind";
import RecommendationsShareButton
    from "@/components/Recommendations/RecommendationsShareButton/RecommendationsShareButton";
import {useRouter} from "next/navigation";
import NProgress from "nprogress";
import {OldAnimeType} from "@/types/Shikimori/Responses/Types/OldAnime.type";
import translateAnimeStatus from "@/utils/Translates/translateAnimeStatus";

export default function Recommendations({ id }: { id: string } ) {
    const router = useRouter();
    const shikimori = client();
    const { data, isPending, error } = useQuery({
        queryKey: ['recommendations', id],
        queryFn: async () => getSimilarAnimes(),
    });

    async function getSimilarAnimes() {
        return await shikimori.animes.similar({ id });
    }

    const mockVideos = Array.from({ length: 17 });

    if (isPending) {
        return mockVideos.map((_mockVideo, index) => {
            return (
                <Group
                    className={classes.group}
                    key={index}
                    align="flex-start"
                >
                    <AspectRatio className={classes.aspectRatio} ratio={16 / 9}>
                        <Skeleton
                            radius="md"
                            width="100%"
                            height="100%"
                        />
                    </AspectRatio>
                    <Stack className={classes.stack} h="100%" justify="flex-start">
                        <Skeleton width="80%" height={rem(20)} />
                        <Skeleton width="60%" height={rem(12)} />
                        <Skeleton width="60%" height={rem(12)} />
                    </Stack>
                </Group>
            );
        });
    }

    if (error) {
        return <>Error: {error.message}</>;
    }

    if (!data) {
        return;
    }

    return data?.map((anime: OldAnimeType) => {
        function redirectUser() {
            NProgress.start();
            router.push(`/titles/${anime.url.replace('/animes/', '')}`);
        }

        const translatedKind = translateAnimeKind(anime.kind);
        const translatedStatus = translateAnimeStatus({ sortingType: anime.status, singular: true, lowerCase: true });

        return (
            <div className={classes.recommendationWrapper}>
                <RecommendationsShareButton url={anime.url} />
                <Group
                    onClick={redirectUser}
                    className={classes.group}
                    key={anime.id}
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
                            {anime.aired_on.split('-')?.[0]}
                        </Text>
                    </Stack>
                </Group>
            </div>
        );
    });
}