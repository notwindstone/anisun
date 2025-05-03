"use client";

import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import Link from "next/link";
import { AnimeType } from "@/types/Anime/Anime.type";
import { ImagePlaceholder } from "@/constants/app";
import ConfiguredImage from "@/components/ConfiguredImage/ConfiguredImage";
import { ClientFetchDataContext } from "@/utils/providers/ClientFetchDataProvider";

export default function HeroCard({
    data,
}: {
    data?: AnimeType | undefined;
}) {
    const { data: { theme, colors: { base } } } = useContext(ConfigsContext);
    const { data: animeData } = useContext<{
        data: AnimeType;
    }>(ClientFetchDataContext);
    const currentData = data ?? animeData;

    const name = currentData?.title?.romaji ?? currentData?.title?.english ?? currentData?.title?.native ?? "none";
    const image = currentData?.coverImage?.extraLarge ?? ImagePlaceholder;
    const score = Number(currentData?.averageScore) / 10;
    const scoreBadgeColorClassName = score > 8.5
        ? "bg-green-700"
        : (score > 7
            ? "bg-yellow-700"
            : "bg-red-700");
    const gradientColorTwo = parseTailwindColor({
        color: base,
        step: theme === DarkThemeKey
            ? 950
            : 50,
    });
    const gradientColorOneArray = [ ...gradientColorTwo ];

    gradientColorOneArray.pop();
    gradientColorOneArray.push(" / 26.67%)");
    const gradientColorOne = gradientColorOneArray.join("");

    return (
        <Link className="select-none group" href={`/anime/${currentData?.idMal}`}>
            <ConfiguredImage
                className="object-cover duration-300 group-hover:scale-105 group-hover:brightness-75 group-focus:scale-105 group-focus:brightness-75"
                style={{
                    objectPosition: "100% 20%",
                }}
                fill
                src={image}
                alt={`${name} anime's poster`}
            />
            <div
                className="text-black absolute w-full h-full"
                style={{
                    backgroundImage: `linear-gradient(
                        to bottom,
                        ${gradientColorOne},
                        ${gradientColorTwo}
                    )`,
                }}
            />
            <div className="absolute w-full h-full flex flex-col justify-end items-center p-4 text-white gap-2">
                <div className="flex flex-wrap justify-center gap-2">
                    <p className={`${scoreBadgeColorClassName} rounded-sm text-sm px-2 py-1 leading-none`}>
                        {
                            // Cast this variable to a string
                            // because it might be NaN
                            score.toString()
                        }
                    </p>
                    {
                        currentData?.genres?.map((genre: string, index: number) => {
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
                <p className="text-2xl text-black dark:text-white text-pretty text-center font-medium">
                    {name}
                </p>
            </div>
        </Link>
    );
}