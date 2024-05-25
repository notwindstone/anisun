"use client";

import {client} from "@/lib/shikimori/client";
import {useQuery} from "@tanstack/react-query";
import {Group, Skeleton, Stack, Text, Title} from "@mantine/core";

export default function AnimeInfo({ id }: { id: string }) {
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

    if (error) {
        return <></>;
    }
    console.log(data);
    return (
        <Stack>
            <Skeleton width="70%" visible={isPending}>
                <Title lineClamp={2}>{data?.russian} - {data?.name}</Title>
            </Skeleton>
            <Group>
                <Skeleton height={24} visible={isPending}>
                    <Text lineClamp={1}>
                        {
                            data?.studios.map((studio, index) => {
                                return `${index ? ', ' : ''}${studio.name}`;
                            })
                        }
                    </Text>
                </Skeleton>
            </Group>
        </Stack>
    );
}