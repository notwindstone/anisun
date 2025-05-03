"use client";

import HeroCard from "@/components/Hero/HeroCard/HeroCard";
import { useQuery } from "@tanstack/react-query";
import fetchHeroTitle from "@/lib/anime/fetchHeroTitle";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import { useContext } from "react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";

const placeholderArray = [ "w-9", "w-14", "w-14" ];

export default function ClientFetch() {
    const { data: { theme, colors: { base } } } = useContext(ConfigsContext);
    const { isPending, error, data } = useQuery({
        queryKey: ["hero", "anime"],
        queryFn: async () => await fetchHeroTitle(),
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

    return (
        <>
            <HeroCard data={data} />
        </>
    );
}