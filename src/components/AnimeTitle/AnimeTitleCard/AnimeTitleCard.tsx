import {AnimeType} from "@/types/Shikimori/Responses/Types/AnimeType"
import {Avatar, Flex, Group, Image, Stack, Text, Title} from "@mantine/core";
import NextImage from "next/image";
import globalVariables from '@/configs/globalVariables.json';

export default function AnimeTitleCard({ anime }: { anime: AnimeType }) {
    const poster = anime.poster?.originalUrl ?? '/missing-image.png'

    return (
        <div>
            <Stack>
                <Image
                    alt={`Постер к ${anime.name}`}
                    src={poster}
                    component={NextImage}
                    w={280}
                    h={157}
                    width={280}
                    height={157}
                    placeholder="blur"
                    blurDataURL={globalVariables.imagePlaceholder}
                />
                <Group>
                    <Avatar />
                    <Stack>
                        <Title order={3} lineClamp={2}>{anime.name}</Title>
                        <Text lineClamp={1}>
                            {
                                anime.studios.map((studio) => {
                                    return (
                                        <span key={studio.id}>{studio.name}</span>
                                    )
                                })
                            }
                        </Text>
                        <Text>{anime.score}</Text>
                        <Text>{anime.airedOn?.year}</Text>
                    </Stack>
                </Group>
            </Stack>

        </div>
    )
}