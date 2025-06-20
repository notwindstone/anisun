"use client";

import { OAuth2ProvidersType } from "@/types/OAuth2/OAuth2Providers.type";
import { useQuery } from "@tanstack/react-query";
import getGraphQLResponse from "@/utils/misc/getGraphQLResponse";
import { AnimeType } from "@/types/Anime/Anime.type";
import { RemoteRoutes } from "@/constants/routes";
import { GraphQLClient } from "@/lib/graphql/client";
import AnilistLibrary from "@/components/integrations/AnilistLibrary/AnilistLibrary";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import divideMediaListCollectionToChunks from "@/utils/misc/divideMediaListCollectionToChunks";

export default function AnilistLibraryWrapper({
    username,
    accessToken,
    tokenProvider,
}: {
    username: string;
    accessToken: string | undefined;
    tokenProvider: OAuth2ProvidersType;
}) {
    const searchParameters = useSearchParams();
    const usernameFromParameters = searchParameters.get("username") || username;
    const { data: queryData, isPending, error } = useQuery({
        queryKey: ["anime", "library", tokenProvider, usernameFromParameters],
        queryFn:  async () => {
            const data = await getGraphQLResponse<{ media: AnimeType }>({
                accessToken,
                url: RemoteRoutes.Anilist.GraphQL.Root,
                ...GraphQLClient.Anilist({
                    queries: [
                        {
                            alias:     "library",
                            name:      "MediaListCollection",
                            variables: {
                                page:  {},
                                media: {
                                    type:     "ANIME",
                                    userName: usernameFromParameters,
                                },
                            },
                            fields: [
                                "hasNextChunk",
                                "lists.name",
                                "lists.entries.progress",
                                "lists.entries.score",
                                "lists.entries.media.id",
                                "lists.entries.media.idMal",
                                "lists.entries.media.coverImage.extraLarge",
                                "lists.entries.media.averageScore",
                                "lists.entries.media.episodes",
                                "lists.entries.media.status",
                                "lists.entries.media.title.english",
                                "lists.entries.media.title.romaji",
                            ],
                        },
                    ],
                }),
            });

            return divideMediaListCollectionToChunks({
                data,
            });
        },
    });

    return useMemo(() => (
        <>
            <div />
            <p className="text-2xl font-medium leading-none">
                Library
            </p>
            <p className="text-md text-neutral-500 dark:text-neutral-400 leading-none">
                {
                    username === usernameFromParameters
                        ? "Browse your Anilist library"
                        : `Browse ${usernameFromParameters}'s Anilist library`
                }
            </p>
            <AnilistLibrary
                data={queryData}
                isPending={isPending}
                error={error}
                username={usernameFromParameters}
            />
        </>
    ), [queryData, isPending, error, username, usernameFromParameters]);
}
