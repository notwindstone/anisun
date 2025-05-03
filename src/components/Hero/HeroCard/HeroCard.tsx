"use client";

import { OAuth2ProvidersType } from "@/types/OAuth2/OAuth2Providers.type";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import { getRelativeDate } from "@/utils/misc/getRelativeDate";

const placeholderArray = [ "w-9", "w-14", "w-14" ];
// If it's January 1, then ofc there will be no good animes
// that were released on January 1, so we go back 30 days before.
const currentAnimeYear = getRelativeDate({ days: -30 }).getFullYear();

export default function HeroCard({
    provider,
}: {
    provider: OAuth2ProvidersType;
}) {
    const { data: { theme, colors: { base } } } = useContext(ConfigsContext);
    const { isPending, error, data } = useQuery({
        queryKey: ['hero', provider],
        queryFn: async () => {
            const query = `
                query($seasonYear: Int) {
                    Media(seasonYear: $seasonYear, status: RELEASING, sort: POPULARITY_DESC, format: TV, isAdult: false) {
                        id
                        title { english native romaji }
                        meanScore
                        averageScore
                        coverImage {
                            extraLarge
                        }
                        genres
                    }
                }
            `;

            const response = await fetch('https://graphql.anilist.co', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: query,
                    variables: JSON.stringify({
                        seasonYear: currentAnimeYear,
                    }),
                }),
            });

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            let data;

            try {
                data = await response.json();
            } catch {
                throw new Error("Something went wrong");
            }

            return data.data.Media;
        },
    });

    if (isPending) {
        return (
            <>
                <div
                    className="w-full h-full flex flex-col justify-end items-center p-4 text-white gap-2"
                >
                    <div className="flex flex-wrap justify-center gap-2">
                        {
                            placeholderArray.map((widthClassName, index) => {
                                return (
                                    <div
                                        className={`animate-pulse rounded-sm h-[22px] ${widthClassName}`}
                                        key={`${widthClassName}_${index}`}
                                        style={{
                                            backgroundColor: parseTailwindColor({
                                                color: base,
                                                step: theme === DarkThemeKey
                                                    ? 800
                                                    : 200,
                                            }),
                                        }}
                                    />
                                );
                            })
                        }
                    </div>
                    <div
                        className="animate-pulse rounded-sm w-96 max-w-[60%] h-8"
                        style={{
                            backgroundColor: parseTailwindColor({
                                color: base,
                                step: theme === DarkThemeKey
                                    ? 800
                                    : 200,
                            }),
                        }}
                    />
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
            </>
        );
    }

    const score = data.averageScore / 10;
    const scoreBadgeColorClassName = score > 8.5
        ? "bg-green-600"
        : (score > 7.5
            ? "bg-yellow-600"
            : "bg-red-600");

    return (
        <>
            <Image
                style={{
                    objectFit: "cover",
                    objectPosition: "100% 20%",
                }}
                fill
                src={data.coverImage.extraLarge}
                alt={`${data.title.romaji} anime's poster`}
            />
            <div className="text-black absolute w-full h-full bg-[linear-gradient(to_bottom,#0004,#000d)]" />
            <div className="absolute w-full h-full flex flex-col justify-end items-center p-4 text-white gap-2">
                <div className="flex flex-wrap justify-center gap-2">
                    <p className={`${scoreBadgeColorClassName} rounded-sm text-sm px-2 py-1 leading-none`}>
                        {score}
                    </p>
                    {
                        data.genres.map((genre: string, index: number) => {
                            if (index >= 2) {
                                return;
                            }

                            return (
                                <p
                                    key={genre}
                                    className="rounded-sm text-sm px-2 py-1 leading-none"
                                    style={{
                                        backgroundColor: parseTailwindColor({
                                            color: base,
                                            step: theme === DarkThemeKey
                                                ? 900
                                                : 100,
                                        }),
                                        color: parseTailwindColor({
                                            color: base,
                                            step: theme === DarkThemeKey
                                                ? 300
                                                : 800,
                                        }),
                                    }}
                                >
                                    {genre}
                                </p>
                            );
                        })
                    }
                </div>
                <p className="text-2xl text-pretty text-center font-bold">
                    {data.title.romaji}
                </p>
            </div>
        </>
    );
}