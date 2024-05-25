"use client";

import {client} from "@/lib/shikimori/client";
import {useQuery} from "@tanstack/react-query";
import {Group, Stack, Text, Title} from "@mantine/core";
import classes from './AnimeInfo.module.css';
import DecoratedButton from "@/components/DecoratedButton/DecoratedButton";
import {IconShare3} from "@tabler/icons-react";
import {useClipboard} from "@mantine/hooks";
import {usePathname} from "next/navigation";
import AnimeInfoDownloadVideo from "@/components/AnimeInfo/AnimeInfoDownloadVideo/AnimeInfoDownloadVideo";

export default function AnimeInfo({ id }: { id: string }) {
    const pathname = usePathname();
    const clipboard = useClipboard({ timeout: 1000 });
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

    function copyLink() {
        clipboard.copy(`https://animeth.vercel.app${pathname}`);

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
                        leftSection={!clipboard.copied && <IconShare3 />}
                        onClick={copyLink}
                    >
                        {
                            clipboard.copied ? "Скопировано" : "Поделиться"
                        }
                    </DecoratedButton>
                    <AnimeInfoDownloadVideo id={id} />
                </Group>
            </Group>
        </Stack>
    );
}