"use client";

import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import Link from "next/link";
import { AnimeType } from "@/types/Anime/Anime.type";
import ConfiguredImage from "@/components/ConfiguredImage/ConfiguredImage";
import { ClientFetchDataContext } from "@/utils/providers/ClientFetchDataProvider";
import Badge from "@/components/Badge/Badge";

export default function HeroCard({
    data,
}: {
    data?: Array<AnimeType> | AnimeType | undefined;
}) {
    const { data: { theme, colors: { base } } } = useContext(ConfigsContext);
    const { data: animeData } = useContext<{
        data: AnimeType;
    }>(ClientFetchDataContext);
    const currentData = data ?? animeData;

    if (Array.isArray(currentData)) {
        return;
    }

    const name = currentData?.title?.romaji ?? currentData?.title?.english ?? currentData?.title?.native ?? "none";
    const image = currentData?.coverImage?.extraLarge;
    const score = Number(currentData?.averageScore) / 10;

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
                    <Badge score={score} isScore>
                        {
                            // Cast this variable to a string
                            // because it might be NaN
                            score.toString()
                        }
                    </Badge>
                    {
                        currentData?.genres?.map((genre: string, index: number) => {
                            if (index >= 2) {
                                return;
                            }

                            return (
                                <Badge key={genre}>
                                    {genre}
                                </Badge>
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