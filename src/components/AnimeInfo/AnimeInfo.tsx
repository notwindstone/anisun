"use client";

import {client} from "@/lib/shikimori/client";
import {useQuery} from "@tanstack/react-query";
import {Divider, Group, Image, rem, Skeleton, Stack, Text, Title} from "@mantine/core";
import classes from './AnimeInfo.module.css';
import AnimeInfoDownloadVideo from "@/components/AnimeInfo/AnimeInfoDownloadVideo/AnimeInfoDownloadVideo";
import AnimeInfoCopyLink from "@/components/AnimeInfo/AnimeInfoCopyLink/AnimeInfoCopyLink";
import {Suspense, useState} from "react";
import Link from "next/link";
import React from "react";
import AnimeInfoDescription from "@/components/AnimeInfo/AnimeInfoDescription/AnimeInfoDescription";
import Comments from "@/components/Comments/Comments";
import useMobileScreen from "@/hooks/useMobileScreen";
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import {useTranslations} from "next-intl";
import {jikan} from "@/lib/jikan/jikan";

export default function AnimeInfo({ id, titleCode }: { id: string, titleCode: string }) {
    const info = useTranslations('Info');
    const translate = useTranslations('Translations');
    const locale = info('locale');
    const [commentsExpanded, setCommentsExpanded] = useState(false);
    const { isTablet } = useMobileScreen();
    const shikimori = client();
    const { data, isPending, error } = useQuery({
        queryKey: ['anime', 'info', locale, id],
        queryFn: async () => getShikimoriInfo(),
    });

    async function getShikimoriInfo() {
        let jikanData;

        if (locale !== 'ru') {
            const jikanClient = jikan();
            jikanData = await jikanClient.animes.byId({ id: id });
        }

        let shikimoriData = (await shikimori.animes.byId({
            ids: id,
        })).animes[0];

        shikimoriData = {
            ...shikimoriData,
            synopsis: jikanData?.synopsis
        };

        return shikimoriData;
    }

    if (isPending) {
        return (
            <>
                <Stack gap={rem(8)} w="100%"  className={classes.stack}>
                    <Skeleton mb={rem(8)} w="100%" h={36} />
                    <Group>
                        <Skeleton w={96} h={40} />
                        <Stack gap={4}>
                            <Skeleton w={256} h={20} />
                            <Skeleton w={128} h={20} />
                        </Stack>
                    </Group>
                    <Divider />
                    <Skeleton radius="md" w="100%" h={120} />
                </Stack>
            </>
        );
    }

    if (error) {
        return (
            <>
                {translate('common-error-label')}: {error.message}
            </>
        );
    }

    let animeTitle;

    switch (locale) {
        case "en":
            animeTitle = `${data?.name}${data?.english ? ` - ${data.english}` : ""}`;
            break;
        case "ru":
            animeTitle = `${data?.name}${data?.russian ? ` - ${data.russian}` : ""}`;
            break;
        default:
            animeTitle = data?.name;
            break;
    }

    return (
        <Stack gap={rem(8)} className={classes.stack}>
            <Title
                className={classes.title}
                order={2}
                lineClamp={4}
            >
                {animeTitle}
            </Title>
            <Group className={classes.infoGroup} wrap="nowrap" justify="space-between">
                <Group wrap="nowrap" gap={rem(8)}>
                    <Link
                        href={`/titles?studio=${data?.studios?.[0]?.id}`}
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
                                    let genreName;

                                    switch (locale) {
                                        case "en":
                                            genreName = genre.name;
                                            break;
                                        case "ru":
                                            genreName = genre.russian;
                                            break;
                                        default:
                                            genreName = genre.name;
                                            break;
                                    }

                                    return (
                                        <React.Fragment key={genre.id}>
                                            <span className={classes.span}>
                                                {index ? ', ' : ''}
                                            </span>
                                            <Link
                                                className={classes.link}
                                                href={`/titles?genre=${genre.id}`}
                                            >
                                                {genreName}
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
                                                href={`/titles?studio=${studio.id}`}
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
            {
                isTablet && (
                    <>
                        <DecoratedButton
                            mt={rem(8)}
                            ml={rem(4)}
                            mr={rem(4)}
                            radius="md"
                            onClick={() => setCommentsExpanded((expanded) => !expanded)}
                        >
                            {translate('component__anime-info__show-comments-label')}
                        </DecoratedButton>
                    </>
                )
            }
            {
                (!isTablet || commentsExpanded) && (
                    <>
                        <Comments titleCode={titleCode} />
                    </>
                )
            }
        </Stack>
    );
}