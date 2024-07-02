"use client";

import {Pagination, rem, Stack, Text, Title} from "@mantine/core";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import NProgress from "nprogress";
import useCustomTheme from "@/hooks/useCustomTheme";
import classes from './Trending.module.css';
import TrendingGrid from "@/components/Trending/TrendingGrid/TrendingGrid";
import {useTranslations} from "next-intl";

const TOTAL_PAGES = 500;
const LIMIT = 32;
const PLACEHOLDER_DATA = Array.from({ length: LIMIT });

export default function Trending() {
    const translate = useTranslations('Translations');
    const info = useTranslations('Info');
    const locale = info('locale');
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
                            "english",
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
        const redirectUrl = `/${locale}/trending?page=${nextPage}`;
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
                <Title c="var(--anisun-text-contrast-color)">
                    {translate('common__trending-placeholder')}
                </Title>
                <Pagination
                    classNames={{
                        control: classes.control
                    }}
                    radius="md"
                    autoContrast
                    color={theme.color}
                    value={page}
                    onChange={pushToNextPage}
                    total={TOTAL_PAGES}
                />
                {
                    error ? (
                        <Text>{translate('common__error-label')}: {error.message}</Text>
                    ) : (
                        <TrendingGrid
                            data={data}
                            isPending={isPending}
                            placeholderData={PLACEHOLDER_DATA}
                        />
                    )
                }
                <Pagination
                    classNames={{
                        control: classes.control
                    }}
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