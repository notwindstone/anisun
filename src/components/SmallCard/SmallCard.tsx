import { AnimeType } from "@/types/Anime/Anime.type";
import ConfiguredImage from "@/components/ConfiguredImage/ConfiguredImage";
import Link from "next/link";
import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import Badge from "@/components/Badge/Badge";

export default function SmallCard({
    data,
}: {
    data: AnimeType;
}) {
    const { data: { theme, colors: { base } } } = useContext(ConfigsContext);

    const name = data?.title?.romaji ?? data?.title?.english ?? data?.title?.native ?? "none";
    const status = data?.status ?? "";
    const score = Number(data?.averageScore) / 10;

    const baseColor = [ ...parseTailwindColor({
        color: base,
        step: theme === DarkThemeKey
            ? 950
            : 50,
    }) ];
    baseColor.pop();
    const posterDarkEffect = `${baseColor.join("")} / 0.4)`;

    return (
        <>
            <Link href={`/anime/${data?.idMal}`} className="shrink-0 select-none group relative aspect-poster rounded-md overflow-clip w-32">
                <ConfiguredImage
                    className="object-cover duration-300 group-hover:scale-105 group-hover:brightness-75 group-focus:scale-105 group-focus:brightness-75"
                    style={{
                        objectPosition: "100% 20%",
                    }}
                    fill
                    src={data?.coverImage?.extraLarge}
                    alt={`${data?.title?.romaji} anime's poster`}
                />
                <div
                    className="text-black absolute w-full h-full"
                    style={{
                        backgroundColor: posterDarkEffect,
                    }}
                />
                <div className="absolute w-full h-full flex flex-col justify-between items-start p-2 text-white gap-2">
                    <div className="flex flex-wrap gap-1">
                        {
                            (status === "FINISHED" || status === "RELEASING") && (
                                <Badge textSize="text-xs">
                                    {status}
                                </Badge>
                            )
                        }
                        <Badge textSize="text-xs" score={score} isScore>
                            {
                                // Cast this variable to a string
                                // because it might be NaN
                                score.toString()
                            }
                        </Badge>
                    </div>
                    <p className="text-md text-black dark:text-white text-pretty font-medium drop-shadow-sm line-clamp-3">
                        {name}
                    </p>
                </div>
            </Link>
        </>
    );
}