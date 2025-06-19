"use client";

import { useQuery } from "@tanstack/react-query";
import { OAuth2ProvidersType } from "@/types/OAuth2/OAuth2Providers.type";
import { RemoteRoutes } from "@/constants/routes";
import GridCards from "@/components/layout/GridCards/GridCards";
import SmallCard from "@/components/misc/SmallCard/SmallCard";
import { AnimeType } from "@/types/Anime/Anime.type";
import { useRef, useState } from "react";
import getGraphQLResponse from "@/utils/misc/getGraphQLResponse";
import { GraphQLClient } from "@/lib/graphql/client";
import { VariablesType } from "@/types/Anime/Variables.type";
import SkeletonSmallCard from "@/components/misc/SkeletonSmallCard/SkeletonSmallCard";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import ErrorSmallCard from "@/components/misc/ErrorSmallCard/ErrorSmallCard";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";

const mediaListStatuses: Array<VariablesType["mediaListStatus"] | "ALL"> = ["COMPLETED", "CURRENT", "DROPPED", "PAUSED", "PLANNING", "REPEATING", "ALL"];

export default function AnilistLibrary({
    username,
    accessToken,
    tokenProvider,
}: {
    username: string;
    accessToken: string;
    tokenProvider: OAuth2ProvidersType;
}) {
    const { theme, base } = useContextSelector(ConfigsContext, (value) => {
        return {
            theme: value.data.theme,
            base:  value.data.colors.base,
        };
    });
    const [selectedList, setSelectedList] = useState<VariablesType["mediaListStatus"] | "ALL" | undefined>();
    const currentButtonWidth = useRef<{
        width:  number;
        offset: {
            left: number;
            top:  number;
        };
    }>(null);
    const { data, isPending, error } = useQuery({
        queryKey: ["anime", "library", tokenProvider, selectedList],
        queryFn:  async () => {
            const data = await getGraphQLResponse<{ mediaList: AnimeType }>({
                accessToken,
                url: RemoteRoutes.Anilist.GraphQL.Root,
                ...GraphQLClient.Anilist({
                    queries: [
                        {
                            alias:     "library",
                            name:      "Page.MediaList",
                            variables: {
                                page: {
                                    page:    1,
                                    perPage: 30,
                                },
                                media: {
                                    type:     "ANIME",
                                    userName: username,
                                    ...((selectedList === "ALL" || selectedList === undefined) ? {} : {
                                        mediaListStatus: selectedList,
                                    }),
                                },
                            },
                            fields: `
                                progress
                                score
                                media {
                                  id
                                  idMal
                                  coverImage { extraLarge }
                                  averageScore
                                  episodes
                                  status
                                  title {
                                    romaji
                                    english
                                  }
                                }
                            `,
                        },
                    ],
                }),
            });

            // eslint-disable-next-line unicorn/no-abusive-eslint-disable
            // eslint-disable-next-line
            // @ts-ignore
            return data.Library.mediaList;
        },
    });

    let cardsNode: React.ReactNode;

    if (isPending) {
        cardsNode = mediaListStatuses.map((mediaListStatus) => (
            <SkeletonSmallCard
                key={mediaListStatus}
                isGrid
                theme={theme}
                base={base}
            />
        ));
    }

    if (error) {
        cardsNode = mediaListStatuses.map((mediaListStatus) => (
            <ErrorSmallCard
                key={mediaListStatus}
                isGrid
            />
        ));
    }

    if (data) {
        cardsNode = data.map((media: {
            media: AnimeType;
            progress: number;
            score: number;
        }, index: number) => {
            const { media: anime, progress, score } = media;

            return (
                <SmallCard
                    key={`${anime.id}_${index}`}
                    data={{
                        ...anime,
                        currentEpisode: progress,
                        userScore:      score,
                    }}
                    isGrid
                    isImageUnoptimized
                />
            );
        });
    }

    return (
        <>
            <div />
            <p className="text-2xl font-medium leading-none">
                Library
            </p>
            <p className="text-md text-neutral-500 dark:text-neutral-400 leading-none">
                Browse your Anilist library
            </p>
            <div className="flex gap-2 shrink-0 flex-wrap">
                <div
                    className="w-fit relative rounded-md flex gap-2 p-1 overflow-hidden shrink-0 flex-wrap"
                    style={{
                        backgroundColor: parseTailwindColor({
                            color: base,
                            step:  theme === DarkThemeKey
                                ? 900 : 100,
                        }),
                    }}
                >
                    <span
                        className="transition-segmented-control duration-300 absolute h-8 rounded-md"
                        style={{
                            backgroundColor: parseTailwindColor({
                                color: base,
                                step:  theme === DarkThemeKey
                                    ? 800 : 200,
                            }),
                            width:     currentButtonWidth.current?.width ?? 0,
                            transform: `translateX(${currentButtonWidth.current?.offset?.left ?? 0}px) translateY(${currentButtonWidth.current?.offset?.top ?? 0}px)`,
                        }}
                    />
                    {
                        mediaListStatuses.map((mediaListStatus) => {
                            return (
                                <button
                                    onClick={(event) => {
                                        currentButtonWidth.current = {
                                            width:  event.currentTarget.clientWidth,
                                            offset: {
                                                left: event.currentTarget.offsetLeft - 4,
                                                top:  event.currentTarget.offsetTop - 4,
                                            },
                                        };
                                        setSelectedList(mediaListStatus);
                                    }}
                                    className="z-10 flex rounded-md py-1 px-2 h-8 cursor-pointer transition-[opacity] duration-300 opacity-80 hover:opacity-100"
                                    key={mediaListStatus}
                                >
                                    {mediaListStatus}
                                </button>
                            );
                        })
                    }
                </div>
            </div>
            <GridCards disablePadding>
                {cardsNode}
            </GridCards>
        </>
    );
}
