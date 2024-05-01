import {AnimeType} from "@/types/Shikimori/Responses/Types/AnimeType"
import {AspectRatio, Avatar, Flex, Image, rem, Stack, Text, Title} from "@mantine/core";
import NextImage from "next/image";
import globalVariables from '@/configs/globalVariables.json';
import classes from './AnimeTitleCard.module.css';

export default function AnimeTitleCard({ anime }: { anime: AnimeType }) {
    const poster = anime.poster?.originalUrl ?? '/missing-image.png'

    return (
        <div>
            <Stack className={classes.root}>
                <AspectRatio ratio={270 / 180}>
                    <Image
                        radius="lg"
                        alt={`Постер к ${anime.name}`}
                        src={poster}
                        component={NextImage}
                        className={classes.poster}
                        width={270}
                        height={180}
                        placeholder="blur"
                        blurDataURL={globalVariables.imagePlaceholder}
                    />
                </AspectRatio>
                <Flex direction="row" gap={rem(16)}>
                    <Avatar src={anime.studios[0].imageUrl} size={64} />
                    <Stack>
                        <Title order={3} lineClamp={2}>{anime.name}</Title>
                        <Text lineClamp={1}>
                            {
                                anime.studios.map((studio, index) => {
                                    const lastElement = anime.studios.length - 1 === index

                                    return (
                                        <span key={studio.id}>{studio.name}{!lastElement && ", "}</span>
                                    )
                                })
                            }
                        </Text>
                        <Text>{anime.score}</Text>
                        <Text>{anime.airedOn?.year}</Text>
                    </Stack>
                </Flex>
            </Stack>
        </div>
    )
}