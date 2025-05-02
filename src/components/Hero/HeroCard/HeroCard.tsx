"use client";

import { OAuth2ProvidersType } from "@/types/OAuth2/OAuth2Providers.type";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";

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
                {
                    animes(limit: 1, status: "ongoing") {
                        id
                        name
                        score
                        genres { id name }
                        poster { originalUrl }
                    }
                }
            `;

            const response = await fetch('https://shikimori.one/api/graphql', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: query,
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

            return data.data.animes[0];
        },
    });

    if (isPending) {
        return (
            <>
                <div
                    className="animate-pulse w-full h-full"
                    style={{
                        backgroundColor: parseTailwindColor({
                            color: base,
                            step: theme === DarkThemeKey
                                ? 800
                                : 200,
                        }),
                    }}
                />
            </>
        );
    }

    if (error) {
        return (
            <>
            </>
        );
    }

    const scoreBadgeColorClassName = data.score > 8.5
        ? "bg-green-600"
        : (data.score > 7.5
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
                src={data.poster.originalUrl}
                alt={`${data.name} anime's poster`}
            />
            <div className="text-black absolute w-full h-full bg-[linear-gradient(to_bottom,#0004,#000d)]" />
            <div className="absolute w-full h-full flex flex-col justify-end items-center p-4 text-white gap-2">
                <div className="flex flex-wrap justify-center gap-2">
                    <p className={`${scoreBadgeColorClassName} rounded-md text-sm px-2 py-1 leading-none`}>
                        {data.score}
                    </p>
                    {
                        data.genres.map((genre: any, index: number) => {
                            if (index >= 2) {
                                return;
                            }

                            return (
                                <p
                                    key={genre.id}
                                    className="rounded-md text-sm px-2 py-1 leading-none"
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
                                                ? 400
                                                : 600,
                                        }),
                                    }}
                                >
                                    {genre.name}
                                </p>
                            );
                        })
                    }
                </div>
                <p className="text-2xl text-pretty text-center font-bold leading-none">
                    {data.name}
                </p>
            </div>
        </>
    );
}