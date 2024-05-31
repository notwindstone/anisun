"use client";

import {Grid, Pagination, Title} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import {useRouter, useSearchParams} from "next/navigation";
import NProgress from "nprogress";

export default function TrendingGrid() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const unsafePageParam = parseInt(searchParams.get('page') ?? '1');
    const isSafeNumber = unsafePageParam > 0 && !Number.isNaN(unsafePageParam);
    const page = isSafeNumber ? unsafePageParam : 1;
    const shikimori = client();
    const { data, status, error } = useQuery({
        queryFn: async () => {
            return (
                await shikimori
                    .animes
                    .list({
                        order: "popularity",
                        limit: 32,
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
        queryKey: ["trending"]
    });

    function pushToNextPage(nextPage: number) {
        NProgress.start();
        router.push(`/trending?page=${nextPage}`);
    }

    return (
        <>
            <Title c="var(--animeth-text-contrast-color)">
                Популярное
            </Title>
            <Pagination value={page} onChange={pushToNextPage} total={10} />
            <Grid>

            </Grid>
        </>
    );
}