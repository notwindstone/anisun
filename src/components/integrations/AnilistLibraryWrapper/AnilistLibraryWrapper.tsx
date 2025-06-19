"use client";

import { OAuth2ProvidersType } from "@/types/OAuth2/OAuth2Providers.type";
import { useQuery } from "@tanstack/react-query";
import getGraphQLResponse from "@/utils/misc/getGraphQLResponse";
import { AnimeType } from "@/types/Anime/Anime.type";
import { RemoteRoutes } from "@/constants/routes";
import { GraphQLClient } from "@/lib/graphql/client";
import AnilistLibrary from "@/components/integrations/AnilistLibrary/AnilistLibrary";
import { LibraryChunkSize } from "@/constants/app";

export default function AnilistLibraryWrapper({
    username,
    accessToken,
    tokenProvider,
}: {
    username: string;
    accessToken: string;
    tokenProvider: OAuth2ProvidersType;
}) {
    const { data: queryData, isPending, error } = useQuery({
        queryKey: ["anime", "library", tokenProvider],
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
                                    userName: username,
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

            const categories = [];
            const allChunkedLists = [];

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

                    if (!currentChunks[chunkIndex]) {
                        currentChunks[chunkIndex] = [];
                    }

                    currentChunks[chunkIndex].push(anime);

                    index++;
                }

                allChunkedLists.push({
                    total:   entry.entries.length,
                    entries: currentChunks,
                });
            }

            return {
                categories: categories,
                lists:      allChunkedLists,
            };
        },
    });

    return (
        <>
            <div />
            <p className="text-2xl font-medium leading-none">
                Library
            </p>
            <p className="text-md text-neutral-500 dark:text-neutral-400 leading-none">
                Browse your Anilist library
            </p>
            <AnilistLibrary
                data={queryData}
                isPending={isPending}
                error={error}
            />
        </>
    );
}
