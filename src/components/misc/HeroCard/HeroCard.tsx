"use client";

import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import Link from "next/link";
import { AnimeType } from "@/types/Anime/Anime.type";
import ConfiguredImage from "@/components/base/ConfiguredImage/ConfiguredImage";
import { ClientFetchDataContext } from "@/utils/providers/ClientFetchDataProvider";
import Badge from "@/components/base/Badge/Badge";
import { DefaultLocale } from "@/constants/localization";
import translate from "@/utils/misc/translate";
import { useContextSelector } from "use-context-selector";

export default function HeroCard({
    data,
}: {
    data?: Array<AnimeType> | AnimeType | undefined;
}) {
    const { dictionaries, data: { theme, colors: { base } } } = useContextSelector(ConfigsContext, (value) => {
        return {
            dictionaries: value.dictionaries,
            data:         value.data,
        };
    });
    const animeData: AnimeType = useContextSelector(ClientFetchDataContext, (value) => value.data);
    const currentData = data ?? animeData;
    const locale = dictionaries?.metadata.locale ?? DefaultLocale;

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
        step:  theme === DarkThemeKey
            ? 950
            : 50,
    });
    const gradientColorOneArray = [ ...gradientColorTwo ];

    gradientColorOneArray.pop();
    gradientColorOneArray.push(" / 26.67%)");
    const gradientColorOne = gradientColorOneArray.join("");

    return (
        <Link className="hero__wrapper select-none group w-full" href={`/anime/${currentData?.idMal}?title=${redirectURLAnimeName}`}>
            <ConfiguredImage
                priority
                className="hero__poster-image object-cover duration-300 group-hover:scale-105 group-hover:brightness-75 group-focus:scale-105 group-focus:brightness-75 sm:blur-md sm:brightness-50 sm:scale-110 sm:group-hover:brightness-50 sm:group-hover:scale-115"
                style={{
                    objectPosition: "100% 20%",
                }}
                fill
                src={image}
                alt={`${name} anime's poster`}
                unoptimized={false}
                sizes={"(max-width: 640px) 256px, 144px"}
            />
            <div
                className="hero__poster-shadow text-black absolute w-full h-full"
                style={{
                    backgroundImage: `linear-gradient(
                        to bottom,
                        ${gradientColorOne},
                        ${gradientColorTwo}
                    )`,
                }}
            />
            <div className="hero__poster-info absolute w-full h-full flex flex-col justify-end items-center p-4 text-white gap-2 sm:gap-4 sm:flex-col sm:w-[75%] sm:max-w-320 sm:mx-auto sm:justify-center sm:items-start sm:relative">
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
                                    {
                                        translate({
                                            text:   genre,
                                            locale: locale,
                                        })
                                    }
                                </Badge>
                            );
                        })
                    }
                </div>
                <p className="text-2xl sm:text-4xl text-black dark:text-white text-pretty text-center font-medium sm:text-start">
                    {
                        translate({
                            text:   name,
                            locale: locale,
                        })
                    }
                </p>
                <p
                    className="hidden sm:block text-xl text-neutral-800 dark:text-neutral-300 text-pretty text-start"
                >
                    {
                        translate({
                            text:   description,
                            locale: locale,
                        })
                    }
                </p>
            </div>
        </Link>
    );
}
