"use client";

import {client} from "@/lib/shikimori/client";
import {useQuery} from "@tanstack/react-query";
import {Container, Divider, Group, Image, rem, Stack, Text, Title, UnstyledButton} from "@mantine/core";
import classes from './AnimeInfo.module.css';
import AnimeInfoDownloadVideo from "@/components/AnimeInfo/AnimeInfoDownloadVideo/AnimeInfoDownloadVideo";
import AnimeInfoCopyLink from "@/components/AnimeInfo/AnimeInfoCopyLink/AnimeInfoCopyLink";
import {Suspense} from "react";
import Link from "next/link";
import {useDisclosure} from "@mantine/hooks";

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
                                        <>
                                            <span className={classes.span}>
                                                {index ? ', ' : ''}
                                            </span>
                                            <Link
                                                className={classes.link}
                                                href={`/titles?studio=${genre.name}`}
                                            >
                                                {genre.name}
                                            </Link>
                                        </>
                                    );
                                })
                            }
                        </Text>
                        <Text lineClamp={1}>
                            {
                                data?.studios.map((studio, index) => {
                                    return (
                                        <>
                                        <span className={classes.span}>
                                            {index ? ', ' : ''}
                                        </span>
                                            <Link
                                                className={classes.link}
                                                href={`/titles?studio=${studio.name}`}
                                            >
                                                {studio.name}
                                            </Link>
                                        </>
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
            <Container
                onClick={descriptionOpen}
                className={`
                    ${classes.description} ${opened && classes.expandedDescription}
                `}
            >
                <Stack>

                </Stack>
                <Stack
                    w="fit-content"
                    h="100%"
                    align="flex-end"
                    justify="flex-end"
                >
                    {
                        opened ? (
                            <UnstyledButton className={classes.button} onClick={close}>
                                Свернуть
                            </UnstyledButton>
                        ) : (
                            <UnstyledButton className={classes.button} onClick={open}>
                                Ещё
                            </UnstyledButton>
                        )
                    }
                </Stack>
            </Container>
        </Stack>
    );
}