"use client";

import {AspectRatio, Group, rem, SegmentedControl, Skeleton, Stack, Text} from "@mantine/core";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {client} from "@/lib/shikimori/client";
import classes from './Recommendations.module.css';
import translateAnimeKind from "@/utils/Translates/translateAnimeKind";
import {usePathname, useRouter} from "next/navigation";
import NProgress from "nprogress";
import {OldAnimeType} from "@/types/Shikimori/Responses/Types/OldAnime.type";
import translateAnimeStatus from "@/utils/Translates/translateAnimeStatus";
import {useEffect, useState} from "react";
import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";
import {useInterval} from "@mantine/hooks";
import RecommendationsOldAnimeData
    from "@/components/Recommendations/RecommendationsOldAnimeData/RecommendationsOldAnimeData";
import RecommendationsNewAnimeData
    from "@/components/Recommendations/RecommendationsNewAnimeData/RecommendationsNewAnimeData";
import {useTranslations} from "next-intl";

export default function Recommendations({ id }: { id: string } ) {
    const translate = useTranslations('Translations');
    const info = useTranslations('Info');
    const locale = info('locale');
    const ALL = { label: translate('common__similar-label'), value: "all" };
    const [segmentedControlData, setSegmentedControlData] = useState([ALL]);
    const router = useRouter();
    const pathname = usePathname();
    const shikimori = client();
    const [filter, setFilter] = useState(ALL.value);
    const { data, isPending, error } = useQuery({
        queryKey: ['recommendations', id, filter],
        queryFn: async () => getSimilarAnimes(),
    });
    const queryClient = useQueryClient();
    const queryData: AnimeType | undefined = queryClient.getQueryData(['anime', 'info', locale, id]);
    const [seconds, setSeconds] = useState(0);
    const interval = useInterval(() => setSeconds((s) => s + 1), 1000);

    // queryClient.getQueryData does not subscribe to queries data
    // And I'm too tired of this project to implement a better solution for this lol
    useEffect(() => {
        if (queryData) {
            return interval.stop();
        }

        // IDK what this was supposed to be, but I'm assuming
        // that this interval was re-rendering the component
        // and that was causing queryClient to get cache again
        interval.start();
        return interval.stop;
    // eslint-disable-next-line
    }, [seconds]);

    useEffect(() => {
        if (segmentedControlData[1]) {
            return;
        }

        if (!queryData) {
            return;
        }

        queryData.studios?.forEach((studio) => {
            const dataArray = segmentedControlData;
            dataArray.push({ label: `${translate('component__recommendations__studio-label')}: ${studio.name}`, value: `studio-${studio.id}` });

            return setSegmentedControlData(dataArray);
        });

        queryData.genres?.forEach((genre) => {
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

            const dataArray = segmentedControlData;
            dataArray.push({ label: genreName, value: genre.id });

            return setSegmentedControlData(dataArray);
        });
    }, [locale, queryData, segmentedControlData, translate]);

    async function getSimilarAnimes() {
        if (filter === ALL.value) {
            return await shikimori.animes.similar({ id });
        }

        if (filter.includes("studio")) {
            const studioId = filter.split('-')[1];

            return (await shikimori
                .animes
                .list({
                    limit: 16,
                    studio: studioId,
                    filter: [
                        "id",
                        "name",
                        "english",
                        "russian",
                        "url",
                        "status",
                        "kind",
                        "poster { id originalUrl mainUrl }",
                        "score",
                        "episodesAired",
                        "episodes",
                        "airedOn { year month day date }",
                    ],
                })).animes;
        }

        return (await shikimori
            .animes
            .list({
                limit: 16,
                genre: filter,
                filter: [
                    "id",
                    "name",
                    "english",
                    "russian",
                    "url",
                    "status",
                    "kind",
                    "poster { id originalUrl mainUrl }",
                    "score",
                    "episodesAired",
                    "episodes",
                    "airedOn { year month day date }",
                ],
            })).animes;
    }

    const filtersSegmentedControl = (
        <SegmentedControl
            value={filter}
            onChange={setFilter}
            classNames={{
                root: classes.segmentedControlRoot,
                indicator: classes.segmentedControlIndicator,
                label: classes.segmentedControlLabel
            }}
            radius="md"
            withItemsBorders={false}
            data={segmentedControlData}
        />
    );

    const mockVideos = Array.from({ length: 8 });

    if (isPending) {
        return (
            <Stack gap={rem(8)} className={classes.similar}>
                <div className={classes.segmentedControlWrapper}>
                    {
                        queryData ? (
                            <>
                                {filtersSegmentedControl}
                            </>
                        ) : (
                            <Skeleton radius="md" h={32} w={82} />
                        )
                    }
                </div>
                {
                    mockVideos.map((_mockVideo, index) => {
                        return (
                            <Group
                                className={classes.group}
                                key={index}
                                align="flex-start"
                            >
                                <AspectRatio className={classes.aspectRatio} ratio={16 / 9}>
                                    <Skeleton
                                        radius="md"
                                        width="100%"
                                        height="100%"
                                    />
                                </AspectRatio>
                                <Stack className={classes.stack} h="100%" justify="flex-start">
                                    <Skeleton width="80%" height={rem(20)}/>
                                    <Skeleton width="60%" height={rem(12)}/>
                                    <Skeleton width="60%" height={rem(12)}/>
                                </Stack>
                            </Group>
                        );
                    })
                }
            </Stack>
        );
    }

    if (error) {
        return (
            <Stack gap={rem(8)} className={classes.similar}>
                <div className={classes.segmentedControlWrapper}>
                    {filtersSegmentedControl}
                </div>
                <Text>Error: {error.message}</Text>
            </Stack>
        );
    }

    if (!data || data === "Retry later") {
        return;
    }

    if (!data.length) {
        return (
            <Stack pb={rem(112)} gap={rem(8)} className={classes.similar}>
                <div className={classes.segmentedControlWrapper}>
                    {filtersSegmentedControl}
                </div>
                <Text>
                    {translate('component__recommendations__nothing-found-label')}
                </Text>
            </Stack>
        );
    }

    const recommendationVideos = data?.map((anime: AnimeType | OldAnimeType) => {
        // It does exist on AnimeType, but doesn't on OldAnimeType
        // @ts-ignore
        const isNewType = anime?.poster;

        function redirectUser() {
            NProgress.start();

            const newLink = `/titles/${anime?.url.replace('https://shikimori.one/animes/', '')}`;
            const oldLink = `/titles/${anime.url.replace('/animes/', '')}`;

            router.push(isNewType ? newLink : oldLink);

            if (pathname === `/${locale}${newLink}` || pathname === `/${locale}${oldLink}`) {
                return NProgress.done();
            }
        }

        const translatedKind = translateAnimeKind(anime.kind ?? '');
        const translatedStatus = translateAnimeStatus({sortingType: anime.status ?? '', singular: true, lowerCase: true });

        if (isNewType) {
            return (
                <RecommendationsNewAnimeData
                    key={anime.id}
                    // @ts-ignore
                    anime={anime}
                    redirectUser={redirectUser}
                    translatedKind={translatedKind}
                    translatedStatus={translatedStatus}
                />
            );
        }

        return (
            <RecommendationsOldAnimeData
                key={anime.id}
                // @ts-ignore
                anime={anime}
                redirectUser={redirectUser}
                translatedKind={translatedKind}
                translatedStatus={translatedStatus}
            />
        );
    });

    return (
        <Stack gap={rem(8)} className={classes.similar}>
            <div className={classes.segmentedControlWrapper}>
                {filtersSegmentedControl}
            </div>
            {recommendationVideos}
        </Stack>
    );
}