"use client";

import { OAuth2ProvidersType } from "@/types/OAuth2/OAuth2Providers.type";
import { useQuery } from "@tanstack/react-query";
import getGraphQLResponse from "@/utils/misc/getGraphQLResponse";
import { AnimeType } from "@/types/Anime/Anime.type";
import { RemoteRoutes } from "@/constants/routes";
import { GraphQLClient } from "@/lib/graphql/client";
import AnilistLibrary from "@/components/integrations/AnilistLibrary/AnilistLibrary";
import { LibraryChunkSize } from "@/constants/app";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function AnilistLibraryWrapper({
    username,
    accessToken,
    tokenProvider,
}: {
    username: string;
    accessToken: string;
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
                            fields: `
                                hasNextChunk
                                lists {
                                  name
                                  entries {
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
                                  }
                                }
                            `,
                        },
                    ],
                }),
            });

            if (
                !("lists" in data.Library) ||
                !Array.isArray(data.Library.lists)
            ) {
                return {
                    categories: [],
                    lists:      [],
                };
            }

            // slice anime entries into chunks to improve performance
            const categories = [];
            const allChunkedLists = [];

            // contains every anime entry from the list (there might be duplicates)
            const allAnimeEntriesInChunks: Record<number, Array<{
                media: AnimeType;
                progress: number;
                score: number;
            }>> = [];

            // for `allAnimeEntriesInChunks`
            let globalIndex = 0;
            let totalAnimes = 0;

            for (const entry of data.Library.lists) {
                categories.push(entry.name);

                let index = 0;
                const currentChunks: Record<number, Array<{
                    media: AnimeType;
                    progress: number;
                    score: number;
                }>> = {};

                for (const anime of entry.entries) {
                    const chunkIndex = Math.floor(index / LibraryChunkSize);
                    // for `allAnimeEntriesInChunks`
                    const globalChunkIndex = Math.floor(globalIndex / LibraryChunkSize);

                    if (!allAnimeEntriesInChunks[globalChunkIndex]) {
                        allAnimeEntriesInChunks[globalChunkIndex] = [];
                    }

                    if (!currentChunks[chunkIndex]) {
                        currentChunks[chunkIndex] = [];
                    }

                    allAnimeEntriesInChunks[globalChunkIndex].push(anime);
                    currentChunks[chunkIndex].push(anime);

                    index++;
                    globalIndex++;
                    totalAnimes++;
                }

                allChunkedLists.push({
                    total:   entry.entries.length,
                    entries: currentChunks,
                });
            }

            // to display `allAnimeEntriesInChunks`
            categories.push("Merged");
            allChunkedLists.push({
                total:   totalAnimes,
                entries: allAnimeEntriesInChunks,
            });

            return {
                categories: categories,
                lists:      allChunkedLists,
            };
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
    ), [queryData, isPending, error, usernameFromParameters]);
}
