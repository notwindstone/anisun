"use client";

import { useQuery } from "@tanstack/react-query";
import { OAuth2ProvidersType } from "@/types/OAuth2/OAuth2Providers.type";
import { RemoteRoutes } from "@/constants/routes";
import GridCards from "@/components/layout/GridCards/GridCards";
import SmallCard from "@/components/misc/SmallCard/SmallCard";
import { AnimeType } from "@/types/Anime/Anime.type";
import { useState } from "react";
import getGraphQLResponse from "@/utils/misc/getGraphQLResponse";
import { GraphQLClient } from "@/lib/graphql/client";
import Badge from "@/components/base/Badge/Badge";
import { VariablesType } from "@/types/Anime/Variables.type";
import SkeletonSmallCard from "@/components/misc/SkeletonSmallCard/SkeletonSmallCard";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import ErrorSmallCard from "@/components/misc/ErrorSmallCard/ErrorSmallCard";

const mediaListStatuses: Array<VariablesType["mediaListStatus"] | "ALL"> = ["COMPLETED", "CURRENT", "DROPPED", "PAUSED", "PLANNING", "REPEATING", "ALL"];

export default function AnilistLibrary({
    accessToken,
    tokenProvider,
}: {
    accessToken: string;
    tokenProvider: OAuth2ProvidersType;
}) {
    const { theme, base } = useContextSelector(ConfigsContext, (value) => {
        return {
            theme: value.data.theme,
            base:  value.data.colors.base,
        };
    });
    const [selectedList, setSelectedList] = useState<VariablesType["mediaListStatus"] | "ALL">("ALL");
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
                                    userName: "windstone",
                                    ...(selectedList === "ALL" ? {} : {
                                        mediaListStatus: selectedList,
                                    }),
                                },
                            },
                            fields: `
                                progress
                                media {
                                  id
                                  idMal
                                  coverImage { extraLarge }
                                  averageScore
                                  episodes
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
        }, index: number) => {
            const { media: anime, progress } = media;

            return (
                <SmallCard
                    key={`${anime.id}_${index}`}
                    data={{
                        ...anime,
                        currentEpisode: progress,
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
            <div className="flex gap-2">
                {
                    mediaListStatuses.map((mediaListStatus) => {
                        return (
                            <Badge
                                appendClassNames={`${selectedList === mediaListStatus ? "invert cursor-pointer" : "cursor-pointer"}`}
                                onClick={() => setSelectedList(mediaListStatus)}
                                key={mediaListStatus}
                            >
                                {mediaListStatus}
                            </Badge>
                        );
                    })
                }
            </div>
            <GridCards disablePadding>
                {cardsNode}
            </GridCards>
        </>
    );
}
