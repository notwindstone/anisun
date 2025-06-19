import { AnimeType } from "@/types/Anime/Anime.type";
import ConfiguredImage from "@/components/base/ConfiguredImage/ConfiguredImage";
import Link from "next/link";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import Badge from "@/components/base/Badge/Badge";
import { DefaultLocale } from "@/constants/localization";
import translate from "@/utils/misc/translate";
import { useContextSelector } from "use-context-selector";

export default function SmallCard({
    data,
    isGrid,
    isImageUnoptimized,
}: {
    data: AnimeType & Partial<{
        currentEpisode: number;
        currentSeason:  number;
        userScore:      number;
        greyOutScore:   boolean;
    }>;
    isGrid?: boolean;
    isImageUnoptimized?: boolean;
}) {
    const { dictionaries, data: { theme, colors: { base } } } = useContextSelector(ConfigsContext, (value) => {
        return {
            dictionaries: value.dictionaries,
            data:         value.data,
        };
    });

    if (data?.idMal === null) {
        return;
    }

    const locale = dictionaries?.metadata.locale ?? DefaultLocale;

    const name = data?.title?.romaji ?? data?.title?.english ?? data?.title?.native ?? "none";
    const status = data?.status ?? "";
    const score = Number(data?.averageScore) / 10;
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

    const baseColor = [ ...parseTailwindColor({
        color: base,
        step:  theme === DarkThemeKey
            ? 950
            : 50,
    }) ];
    baseColor.pop();
    const posterDarkEffect = `${baseColor.join("")} / 0.5)`;

    const gridClassNames = isGrid ? "w-full flex-max-w-1/2 xs:flex-max-w-1/3 lg:flex-max-w-1/4 xl:flex-max-w-1/6" : "h-full";

    // for additional entries
    const currentEpisode = data?.currentEpisode;
    const currentSeason = data?.currentSeason;
    const userScore = data?.userScore;

    return (
        <>
            <Link
                href={`/anime/${data?.idMal}?title=${redirectURLAnimeName}`}
                className={`shrink-0 select-none group relative aspect-poster rounded-md overflow-clip ${gridClassNames}`}
            >
                <ConfiguredImage
                    className="object-cover duration-300 group-hover:scale-105 group-hover:brightness-75 group-focus:scale-105 group-focus:brightness-75"
                    style={{
                        objectPosition: "100% 20%",
                    }}
                    fill
                    src={data?.coverImage?.extraLarge}
                    alt={`${data?.title?.romaji} anime's poster`}
                    unoptimized={isImageUnoptimized ?? false}
                    sizes={"(max-width: 640px) 108px, (max-width: 1024px) 144px, 320px"}
                />
                <div
                    className="text-black absolute w-full h-full"
                    style={{
                        backgroundColor: posterDarkEffect,
                    }}
                />
                <div className="absolute w-full h-full flex flex-col justify-between items-start p-2 text-white gap-2">
                    <div className="w-full flex flex-wrap justify-between gap-1">
                        {
                            (status === "FINISHED" || status === "RELEASING") && (
                                <Badge
                                    textSize="text-xs"
                                    label="Current anime status"
                                >
                                    {
                                        translate({
                                            text:   status,
                                            locale: locale,
                                        })
                                    }
                                </Badge>
                            )
                        }
                        <Badge
                            textSize="text-xs"
                            score={score}
                            // `isScore` is designed to make badge differently colored
                            // based on the `score` property
                            // if `greyOutScore` is true, we don't need it
                            isScore={!data?.greyOutScore}
                            label="Other users' average score"
                        >
                            {
                                // Cast this variable to a string
                                // because it might be NaN
                                score.toString()
                            }
                        </Badge>
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        {
                            (userScore !== undefined && userScore !== null) && (
                                <Badge
                                    isScore
                                    score={userScore}
                                    appendClassNames="w-fit"
                                    textSize="text-xs"
                                    label="Your score"
                                >
                                    {userScore}
                                </Badge>
                            )
                        }
                        {
                            (currentEpisode !== undefined && currentEpisode !== null) && (
                                <Badge
                                    appendClassNames="w-fit invert"
                                    textSize="text-xs"
                                    label="Total episodes watched"
                                >
                                    {`${currentEpisode} / ${data?.episodes ?? "?"}`}
                                </Badge>
                            )
                        }
                        {
                            (currentSeason !== undefined && currentEpisode !== null) && (
                                <Badge
                                    appendClassNames="w-fit invert"
                                    textSize="text-xs"
                                    label="Season that you watched"
                                >
                                    {`SEASON ${currentSeason}`}
                                </Badge>
                            )
                        }
                        <p className="text-md text-black dark:text-white text-pretty font-medium drop-shadow-sm line-clamp-3">
                            {
                                translate({
                                    text:   name,
                                    locale: locale,
                                })
                            }
                        </p>
                    </div>
                </div>
            </Link>
        </>
    );
}
