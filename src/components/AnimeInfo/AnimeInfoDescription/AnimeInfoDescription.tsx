import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";
import classes from "@/components/AnimeInfo/AnimeInfo.module.css";
import {Container, Group, Image, Overlay, rem, Stack, Text, Title, UnstyledButton} from "@mantine/core";
import React from "react";
import translateAnimeStatus from "@/utils/Translates/translateAnimeStatus";
import translateAnimeKind from "@/utils/Translates/translateAnimeKind";
import {useDisclosure} from "@mantine/hooks";
import DOMPurify from "isomorphic-dompurify";
import {variables} from "@/configs/variables";
import NextImage from "next/image";

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
            <Stack w="100%" gap={rem(8)}>
                <Group wrap="nowrap" justify="space-between">
                    <Text lineClamp={1} className={classes.statsText}>
                        {`${nextEpisodeAt}${airedOn}${animeStatus}${animeKind}`}
                    </Text>
                    {
                        !opened && (
                            <Text className={classes.expandText}>Нажмите, чтобы раскрыть</Text>
                        )
                    }
                </Group>
                <Group
                    w="100%"
                    justify="space-between"
                    align="flex-start"
                    wrap="nowrap"
                >
                    {
                        cleanDescription && data?.description && (
                            <Stack gap={rem(8)}>
                                <Title className={classes.heading} pt={rem(8)} order={4}>ОПИСАНИЕ</Title>
                                <Text
                                    {...opened ? null : { lineClamp: 1 }}
                                    dangerouslySetInnerHTML={{ __html: cleanDescription }}
                                />
                            </Stack>
                        )
                    }
                    <Container className={classes.imageWrapper}>
                        <Overlay
                            gradient={
                                opened ? "#00000000" : "linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 1) 30%)"
                            }
                            className={classes.imageOverlay}
                        />
                        <Image
                            alt="Anime poster"
                            src={data?.poster?.originalUrl}
                            placeholder="blur"
                            blurDataURL={variables.imagePlaceholder}
                            width={225}
                            height={317}
                            w={225}
                            h={317}
                            component={NextImage}
                            radius="md"
                        />
                    </Container>
                </Group>
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
                            Длительность эпизода: {data.duration} мин.
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
                {
                    data?.related?.length > 0 && (
                        <></>
                    )
                }
                {
                    data?.screenshots?.length > 0 && (
                        <></>
                    )
                }
                {
                    data?.videos?.length > 0 && (
                        <></>
                    )
                }
                {
                    data?.externalLinks?.length > 0 && (
                        <></>
                    )
                }

                <UnstyledButton className={classes.button} onClick={close}>
                    Свернуть
                </UnstyledButton>
            </Stack>
        </Group>
    );
}