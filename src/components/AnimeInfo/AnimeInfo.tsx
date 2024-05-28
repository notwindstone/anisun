"use client";

import {client} from "@/lib/shikimori/client";
import {useQuery} from "@tanstack/react-query";
import {Divider, Group, Image, rem, Stack, Text, Title} from "@mantine/core";
import classes from './AnimeInfo.module.css';
import AnimeInfoDownloadVideo from "@/components/AnimeInfo/AnimeInfoDownloadVideo/AnimeInfoDownloadVideo";
import AnimeInfoCopyLink from "@/components/AnimeInfo/AnimeInfoCopyLink/AnimeInfoCopyLink";
import {Suspense} from "react";
import Link from "next/link";
import React from "react";
import AnimeInfoDescription from "@/components/AnimeInfo/AnimeInfoDescription/AnimeInfoDescription";
import Comments from "@/components/Comments/Comments";

export default function AnimeInfo({ id }: { id: string }) {
    const shikimori = client();
    const { data, isPending, error } = useQuery({
        queryKey: ['anime', 'info', id],
        queryFn: async () => getShikimoriInfo(),
    });

    async function getShikimoriInfo() {
        return (await shikimori.animes.byId({
            ids: id,
        })).animes[0];
    }

    if (isPending) {
        return <>Loading...</>;
    }

    if (error) {
        return <>Error...</>;
    }

    return (
        <Stack gap={rem(8)} className={classes.stack}>
            <Title
                className={classes.title}
                order={2}
                lineClamp={2}
            >
                {data?.russian} - {data?.name}
            </Title>
            <Group className={classes.infoGroup} wrap="nowrap" justify="space-between">
                <Group wrap="nowrap" gap={rem(8)}>
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
                        <Text lineClamp={1} fw={600}>
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
                <Group wrap="nowrap">
                    <AnimeInfoCopyLink />
                    <Suspense fallback={<p>Loading button...</p>}>
                        <AnimeInfoDownloadVideo id={id} />
                    </Suspense>
                </Group>
            </Group>
            <Divider />
            <Suspense fallback={<p>Loading...</p>}>
                <AnimeInfoDescription data={data} />
            </Suspense>
            <Comments />
        </Stack>
    );
}