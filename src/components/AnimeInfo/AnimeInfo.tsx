"use client";

import {client} from "@/lib/shikimori/client";
import {useQuery} from "@tanstack/react-query";
import {Group, Stack, Text, Title} from "@mantine/core";
import classes from './AnimeInfo.module.css';
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import {IconDownload, IconShare3} from "@tabler/icons-react";
import {useClipboard} from "@mantine/hooks";

export default function AnimeInfo({ id }: { id: string }) {
    const clipboard = useClipboard();
    const shikimori = client();
    const { data, isPending, error } = useQuery({
        queryKey: ['anime', 'info', id],
        queryFn: () => getShikimoriInfo(),
    });

    async function getShikimoriInfo() {
        return (await shikimori.animes.byId({
            ids: id,
        })).animes[0];
    }

    function copyLink() {
        clipboard.copy('Test');

    }

    if (isPending) {
        return <>Loading...</>;
    }

    if (error) {
        return <></>;
    }
    console.log(data);
    return (
        <Stack>
            <Title
                className={classes.title}
                order={2}
                lineClamp={2}
            >
                {data?.russian} - {data?.name}
            </Title>
            <Group justify="space-between">
                <Stack gap={0}>
                    <Text fw={600}>
                        {
                            data?.genres.map((genre, index) => {
                                return `${index ? ', ' : ''}${genre.name}`;
                            })
                        }
                    </Text>
                    <Text lineClamp={1}>
                        {
                            data?.studios.map((studio, index) => {
                                return `${index ? ', ' : ''}${studio.name}`;
                            })
                        }
                    </Text>
                </Stack>
                <Group>
                    <DecoratedButton
                        leftSection={<IconShare3 />}
                        onClick={copyLink}
                    >
                        Поделиться
                    </DecoratedButton>
                    <DecoratedButton
                        leftSection={<IconDownload />}
                        onClick={() => {}}
                    >
                        Скачать
                    </DecoratedButton>
                </Group>
            </Group>
        </Stack>
    );
}