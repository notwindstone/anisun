"use client";

import {AspectRatio, Group, rem, Skeleton, Stack} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";

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

    return data?.map((anime) => {
        return (
            <div key={anime.id}>
                {anime.name}
            </div>
        );
    });
}