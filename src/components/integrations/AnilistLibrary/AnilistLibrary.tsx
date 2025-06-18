"use client";

import { useQuery } from "@tanstack/react-query";
import { OAuth2ProvidersType } from "@/types/OAuth2/OAuth2Providers.type";
import { OAuth2Routes } from "@/constants/routes";
import GridCards from "@/components/layout/GridCards/GridCards";
import SmallCard from "@/components/misc/SmallCard/SmallCard";
import { AnimeType } from "@/types/Anime/Anime.type";
import { useState } from "react";

export default function AnilistLibrary({
    accessToken,
    tokenProvider,
}: {
    accessToken: string;
    tokenProvider: OAuth2ProvidersType;
}) {
    const [selectedList, setSelectedList] = useState<"COMPLETED" | "PLANNING" | "ALL" | "other shit">("ALL");
    const { data, isPending, error } = useQuery({
        queryKey: ["anime", tokenProvider, "library"],
        queryFn:  async () => {
            const response = await fetch(OAuth2Routes.Anilist._FetchUserURL, {
                method:  "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    ...OAuth2Routes.Anilist._FetchUserHeaders,
                },
                body: JSON.stringify({
                    query: `
                        query {
                          Page(perPage: 30) {
                            mediaList(userName: "windstone", type: ANIME${selectedList === "ALL" ? "" : `, status: ${selectedList}`}) {
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
                            }
                          }
                        }
                    `,
                }),
            });
            const body = await response.json();

            return body.data.Page.mediaList;
        },
    });

    if (isPending) {
        return;
    }

    if (error) {
        return;
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
                {selectedList}
            </div>
            <GridCards disablePadding>
                {
                    data.map((media: {
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
                    })
                }
            </GridCards>
        </>
    );
}
