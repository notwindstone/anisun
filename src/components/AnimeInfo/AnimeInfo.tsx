"use client";

import {client} from "@/lib/shikimori/client";
import {useQuery} from "@tanstack/react-query";
import {Divider, Group, Image, rem, Stack, Text, Title, UnstyledButton} from "@mantine/core";
import classes from './AnimeInfo.module.css';
import AnimeInfoDownloadVideo from "@/components/AnimeInfo/AnimeInfoDownloadVideo/AnimeInfoDownloadVideo";
import AnimeInfoCopyLink from "@/components/AnimeInfo/AnimeInfoCopyLink/AnimeInfoCopyLink";
import {Suspense} from "react";
import Link from "next/link";
import {useDisclosure} from "@mantine/hooks";
import React from "react";
import translateAnimeStatus from "@/utils/Translates/translateAnimeStatus";
import translateAnimeKind from "@/utils/Translates/translateAnimeKind";

export default function AnimeInfo({ id }: { id: string }) {
    const [opened, { open, close }] = useDisclosure(false);
    const shikimori = client();
    const { data, isPending, error } = useQuery({
        queryKey: ['anime', 'info', id],
        queryFn: async () => getShikimoriInfo(),
    });
    console.log(data)
    async function getShikimoriInfo() {
        return (await shikimori.animes.byId({
            ids: id,
        })).animes[0];
    }

    function descriptionOpen() {
        if (!opened) {
            open();
        }
    }

    if (isPending) {
        return <>Loading...</>;
    }

    if (error) {
        return <></>;
    }

    const nextEpisodeAt
        = data?.nextEpisodeAt ? `Следующий эпизод: ${data.nextEpisodeAt} • ` : "";
    const airedOn
        = data?.airedOn?.date ? `${data.airedOn.date} • ` : "";
    const animeStatus
        = data?.status ? `${translateAnimeStatus({ sortingType: data?.status })} • ` : "";
    const animeKind
        = data?.kind ? `${translateAnimeKind(data?.kind)}` : "";

    return (
        <Stack gap={rem(8)} className={classes.stack}>
            <Title
                className={classes.title}
                order={2}
                lineClamp={2}
            >
                {data?.russian} - {data?.name}
            </Title>
            <Group justify="space-between">
                <Group gap={rem(8)}>
                    <Link
                        href={`/titles?studio=${data?.studios?.[0]?.name}`}
                    >
                        <Image
                            radius="xs"
                            className={classes.studioLogo}
                            w="auto"
                            h={40}
                            src={data?.studios?.[0]?.imageUrl}
                        />
                    </Link>
                    <Stack gap={0}>
                        <Text fw={600}>
                            {
                                data?.genres.map((genre, index) => {
                                    return (
                                        <React.Fragment key={genre.id}>
                                            <span className={classes.span}>
                                                {index ? ', ' : ''}
                                            </span>
                                            <Link
                                                className={classes.link}
                                                href={`/titles?studio=${genre.name}`}
                                            >
                                                {genre.name}
                                            </Link>
                                        </React.Fragment>
                                    );
                                })
                            }
                        </Text>
                        <Text lineClamp={1}>
                            {
                                data?.studios.map((studio, index) => {
                                    return (
                                        <React.Fragment key={studio.id}>
                                            <span className={classes.span}>
                                                {index ? ', ' : ''}
                                            </span>
                                            <Link
                                                className={classes.link}
                                                href={`/titles?studio=${studio.name}`}
                                            >
                                                {studio.name}
                                            </Link>
                                        </React.Fragment>
                                    );
                                })
                            }
                        </Text>
                    </Stack>
                </Group>
                <Group>
                    <AnimeInfoCopyLink />
                    <Suspense fallback={<p>Loading button...</p>}>
                        <AnimeInfoDownloadVideo id={id} />
                    </Suspense>
                </Group>
            </Group>
            <Divider />
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
                        data?.description && (
                            <>
                                <Title className={classes.heading} pt={rem(8)} order={4}>ОПИСАНИЕ</Title>
                                <Text>{data.description}</Text>
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
                                    <span>{synonym}</span>
                            ))}
                            </Text>
                        )
                    }
                    <UnstyledButton className={classes.button} onClick={close}>
                        Свернуть
                    </UnstyledButton>
                </Stack>
            </Group>
        </Stack>
    );
}