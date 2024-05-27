import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";
import classes from "@/components/AnimeInfo/AnimeInfo.module.css";
import {Group, rem, Stack, Text, Title, UnstyledButton} from "@mantine/core";
import React from "react";
import translateAnimeStatus from "@/utils/Translates/translateAnimeStatus";
import translateAnimeKind from "@/utils/Translates/translateAnimeKind";
import {useDisclosure} from "@mantine/hooks";
import DOMPurify from "isomorphic-dompurify";

export default function AnimeInfoDescription({ data }: { data: AnimeType }) {
    const [opened, { open, close }] = useDisclosure(false);

    let cleanDescription;

    if (data?.descriptionHtml) {
        cleanDescription = DOMPurify.sanitize(data.descriptionHtml);
    }

    function descriptionOpen() {
        if (!opened) {
            open();
        }
    }

    console.log(data);

    const nextEpisodeAt
        = data?.nextEpisodeAt ? `Следующий эпизод: ${data.nextEpisodeAt} • ` : "";
    const airedOn
        = data?.airedOn?.date ? `${data.airedOn.date} • ` : "";
    const animeStatus
        = data?.status ? `${translateAnimeStatus({ sortingType: data?.status })} • ` : "";
    const animeKind
        = data?.kind ? `${translateAnimeKind(data?.kind)}` : "";

    return (
        <Group
            onClick={descriptionOpen}
            className={`
                    ${classes.description} ${opened && classes.expandedDescription}
                `}
        >
            <Stack gap={rem(8)}>
                <Text className={classes.statsText}>
                    {`${nextEpisodeAt}${airedOn}${animeStatus}${animeKind}`}
                </Text>
                {
                    cleanDescription && (
                        <>
                            <Title className={classes.heading} pt={rem(8)} order={4}>ОПИСАНИЕ</Title>
                            <Text
                                {...opened ? null : { lineClamp: 1 }}
                                dangerouslySetInnerHTML={{ __html: cleanDescription }}
                            />
                        </>
                    )
                }
                <Title className={classes.heading} order={4}>ИНФОРМАЦИЯ</Title>
                {
                    (data?.episodes && data?.episodesAired) && (
                        <Text>
                            Эпизоды: {data.episodes} / {data.episodesAired}
                        </Text>
                    )
                }
                {
                    data?.duration && (
                        <Text>
                            Длительность эпизода: {data.duration}
                        </Text>
                    )
                }
                {
                    data?.rating && (
                        <Text>
                            Рейтинг: {data.rating}
                        </Text>
                    )
                }
                {
                    data?.japanese && (
                        <Text>
                            Японское название: {data.japanese}
                        </Text>
                    )
                }
                {
                    data?.english && (
                        <Text>
                            Английское название: {data.english}
                        </Text>
                    )
                }
                {
                    data?.synonyms?.length > 0 && (
                        <Text>
                            Другие названия: {data.synonyms.map((synonym) => (
                                <span key={synonym}>{synonym}</span>
                            ))}
                        </Text>
                    )
                }
                {
                    data?.fandubbers?.length > 0 && (
                        <Text>
                            Фанатский дубляж: {data.fandubbers.map((fandub, index) => (
                                <span key={fandub}>{index ? ', ' : ''}{fandub}</span>
                            ))}
                        </Text>
                    )
                }
                {
                    data?.fansubbers?.length > 0 && (
                        <Text>
                            Фанатские субтитры: {data.fansubbers.map((fansub, index) => (
                                <span key={fansub}>{index ? ', ' : ''}{fansub}</span>
                            ))}
                        </Text>
                    )
                }

                <UnstyledButton className={classes.button} onClick={close}>
                    Свернуть
                </UnstyledButton>
            </Stack>
        </Group>
    );
}