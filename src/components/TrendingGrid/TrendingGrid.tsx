"use client";

import {Grid, Title} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import {useSearchParams} from "next/navigation";

export default function TrendingGrid() {
    const searchParams = useSearchParams();
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
    console.log(data);
    return (
        <>
            <Title c="var(--animeth-text-contrast-color)">
                Популярное
            </Title>
            <Grid>

            </Grid>
        </>
    );
}