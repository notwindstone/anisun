"use client";

import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import Link from "next/link";
import { AnimeType } from "@/types/Anime/Anime.type";
import ConfiguredImage from "@/components/base/ConfiguredImage/ConfiguredImage";
import { ClientFetchDataContext } from "@/utils/providers/ClientFetchDataProvider";
import Badge from "@/components/base/Badge/Badge";

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

    if (currentData !== undefined && Array.isArray(currentData)) {
        return;
    }

    const name = currentData?.title?.romaji ?? currentData?.title?.english ?? currentData?.title?.native ?? "none";

    const htmlDescription = currentData?.description ?? "";
    const description = htmlDescription.replaceAll(
        new RegExp("(<.*>|[(]Source.*)", "g"),
        "",
    );

    const image = currentData?.coverImage?.extraLarge;
    const score = Number(currentData?.averageScore) / 10;
    const redirectURLAnimeName =
        // eslint-disable-next-line unicorn/no-abusive-eslint-disable
        // eslint-disable-next-line
        // @ts-ignore
        data?.relations?.nodes?.[0]?.title?.romaji
        // eslint-disable-next-line unicorn/no-abusive-eslint-disable
        // eslint-disable-next-line
        // @ts-ignore
        ?? data?.relations?.nodes?.[0]?.title?.english
        ?? name;

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
        <Link className="select-none group" href={`/anime/${currentData?.idMal}?title=${redirectURLAnimeName}`}>
            <ConfiguredImage
                className="object-cover duration-300 group-hover:scale-105 group-hover:brightness-75 group-focus:scale-105 group-focus:brightness-75 sm:blur-sm sm:brightness-50 sm:scale-110 sm:group-hover:brightness-50 sm:group-hover:scale-115"
                style={{
                    objectPosition: "100% 20%",
                }}
                fill
                src={image}
                alt={`${name} anime's poster`}
                unoptimized={false}
                priority
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
            <div className="absolute w-full h-full flex flex-col justify-end items-center p-4 text-white gap-2 sm:gap-4 sm:pl-[8%] sm:flex-col sm:w-fit sm:justify-center sm:items-start sm:max-w-192">
                <div className="flex flex-wrap justify-center gap-2">
                    <Badge textSize="sm:text-xl text-md" score={score} isScore>
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
                                <Badge textSize="sm:text-xl text-md" key={genre}>
                                    {genre}
                                </Badge>
                            );
                        })
                    }
                </div>
                <p className="text-2xl sm:text-4xl text-black dark:text-white text-pretty text-center font-medium sm:text-start">
                    {name}
                </p>
                <p
                    className="hidden sm:block text-xl text-neutral-800 dark:text-neutral-300 text-pretty text-start"
                >
                    {description}
                </p>
            </div>
        </Link>
    );
}