"use client";

import {AspectRatio, Grid, Pagination, rem, Skeleton, Stack, Text, Title} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import NProgress from "nprogress";
import useCustomTheme from "@/hooks/useCustomTheme";
import classes from './TrendingGrid.module.css';
import TrendingCard from "@/components/TrendingGrid/TrendingCard/TrendingCard";

const TOTAL_PAGES = 500;
const LIMIT = 32;
const PLACEHOLDER_DATA = Array.from({ length: LIMIT });

export default function TrendingGrid() {
    const { theme } = useCustomTheme();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const unsafePageParam = parseInt(searchParams.get('page') ?? '1');
    const isSafeNumber = unsafePageParam > 0 && !Number.isNaN(unsafePageParam);
    const page = isSafeNumber ? unsafePageParam : 1;
    const shikimori = client();
    const { data, isPending, error } = useQuery({
        queryFn: async () => {
            return (
                await shikimori
                    .animes
                    .list({
                        order: "popularity",
                        limit: LIMIT,
                        page: page,
                        filter: [
                            "id",
                            "url",
                            "russian",
                            "status",
                            "score",
                            "poster { id originalUrl mainUrl }",
                            "episodes",
                            "episodesAired"
                        ]
                    })
            ).animes;
        },
        queryKey: ["trending", page]
    });

    function pushToNextPage(nextPage: number) {
        const redirectUrl = `/trending?page=${nextPage}`;
        const pathnameWithSearchParams = `${pathname}?page=${page}`;

        if (pathnameWithSearchParams === redirectUrl) {
            return;
        }

        NProgress.start();
        router.push(`/trending?page=${nextPage}`);
    }

    return (
        <>
            <Stack p={rem(8)}>
                <Title c="var(--animeth-text-contrast-color)">
                    Популярное
                </Title>
                <Pagination
                    siblings={3}
                    radius="md"
                    autoContrast
                    color={theme.color}
                    value={page}
                    onChange={pushToNextPage}
                    total={TOTAL_PAGES}
                />
                {
                    error ? (
                        <Text>Ошибка: {error.message}</Text>
                    ) : (
                        <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
                            {
                                (isPending && !data) ? (
                                    PLACEHOLDER_DATA.map((_placeholder, index) => {
                                        return (
                                            <Grid.Col key={index} span={{ base: 12, xs: 6, md: 3 }}>
                                                <AspectRatio ratio={ 3 / 4 }>
                                                    <Skeleton radius="md" w="100%" h="100%" />
                                                </AspectRatio>
                                            </Grid.Col>
                                        );
                                    })
                                ) : data && (
                                    data.map((anime) => {
                                        return (
                                            <Grid.Col key={anime.id} span={{ base: 12, xs: 6, md: 3 }}>
                                                <TrendingCard anime={anime} />
                                            </Grid.Col>
                                        );
                                    })
                                )
                            }
                        </Grid>
                    )
                }
                <Pagination
                    siblings={3}
                    radius="md"
                    autoContrast
                    color={theme.color}
                    value={page}
                    onChange={pushToNextPage}
                    total={TOTAL_PAGES}
                />
            </Stack>
        </>
    );
}