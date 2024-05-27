"use client";

import {AspectRatio, Badge, Container, Group, Image, rem, Skeleton, Stack, Text} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import {variables} from "@/configs/variables";
import NextImage from "next/image";
import classes from './Recommendations.module.css';
import translateAnimeKind from "@/utils/Translates/translateAnimeKind";

export default function Recommendations({ id }: { id: string } ) {
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
                <Group align="flex-start" grow key={index}>
                    <AspectRatio ratio={16 / 9}>
                        <Skeleton
                            radius="md"
                            width="100%"
                            height="100%"
                        />
                    </AspectRatio>
                    <Stack h="100%" justify="flex-start" gap={rem(8)}>
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
    console.log(data);
    // TODO: remove this line tomorrow (or today for you now)
    // eslint-disable-next-line
    return data?.map((anime: any) => {
        return (
            <Group
                onClick={() => console.log('')}
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
                <Stack className={classes.stack} h="100%" justify="flex-start" gap={0}>
                    <Text className={classes.title} lineClamp={2}>
                        {anime?.russian ?? anime.name}
                        {anime?.russian && ` - ${anime.name}`}
                    </Text>
                    <Text className={classes.text} lineClamp={1}>
                        {translateAnimeKind(anime.kind)}
                    </Text>
                    <Text className={classes.text} lineClamp={1}>
                        {anime.aired_on}
                    </Text>
                </Stack>
            </Group>
        );
    });
}