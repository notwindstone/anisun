"use client";

import { useContextSelector } from "use-context-selector";
import { ClientFetchDataContext } from "@/lib/providers/ClientFetchDataProvider";
import { useEffect } from "react";
import { ConfigsContext } from "@/lib/providers/ConfigsProvider";
import { DarkThemeKey } from "@/constants/configs";
import { AnimeType } from "@/types/Anime/Anime.type";
import parseTailwindColor from "@/lib/appearance/parseTailwindColor";
import ConfiguredImage from "@/components/base/ConfiguredImage/ConfiguredImage";
import { useSearchParams } from "next/navigation";

export default function AnimeInfo({
    children,
}: {
    children: React.ReactNode;
}) {
    const { base, theme } = useContextSelector(ConfigsContext, (value) => ({
        base:  value.data.colors.base,
        theme: value.data.theme,
    }));
    const data: Record<"Current", AnimeType> = useContextSelector(ClientFetchDataContext, (value) => value.data);
    const searchParameters = useSearchParams();
    const selectedEpisode = Number(searchParameters.get("selectedEpisode") ?? 0);

    useEffect(() => {
        if (!data) {
            return;
        }

        console.log("anime:", data);

        /*
        (async () => {
            console.log(data.Current);
            //const response = await fetch("https://animestars.org/?do=search&subaction=search&story=SAKAMOTO+DAYS");
            //const shit = await response.text();

            const root = parse(shit);
            const foundLink = root.querySelector(".watchlist-item")?.attributes?.href;
            const linkLast = foundLink?.split("/").at(-1);
            const id = linkLast?.split("-").at(0);

            //const response = await fetch(`https://animestars.org/engine/ajax/controller.php?mod=anime_grabber&module=kodik_playlist_ajax&news_id=${id}&action=load_player`);
            //const smolData = await response.json();

            const smolRoot = parse(smolData);
            const smolShits = smolRoot.querySelectorAll(".watchlist-stats__item");
            const smolChildren = smolShits.map((smolShit) => smolShit.children);

            const actualData = [];

            for (const smolChild of smolChildren) {
                actualData.push({
                    name: smolChild[0].textContent,
                    value: smolChild[2].textContent,
                });
            }

            console.log(actualData);
        })();
         */
    }, [data]);

    // this shit is so fucking unstable
    // anilist returns same list for COTE season 1 and COTE season 2
    // even if those have a different episode count lol the fuck on earth is going on with their db
    const streamingEpisodes = data?.Current?.streamingEpisodes ?? [];
    const sortedStreamingEpisodes = streamingEpisodes.sort((a, b) => {
        const episodeIndexCurrent = Number(a?.title?.split?.(" ")?.[1] ?? 0);
        const episodeIndexNext = Number(b?.title?.split?.(" ")?.[1] ?? 1);

        return episodeIndexCurrent - episodeIndexNext;
    });
    const totalEpisodes = data?.Current?.episodes ?? 0;
    const status = data?.Current?.status;
    const thumbnail = data?.Current?.coverImage?.extraLarge;

    let episodesArray: Array<Partial<{
        thumbnail: string;
        title:     string;
    }>>;

    switch (status) {
        case "RELEASING":
        case "FINISHED": {
            const episodesToMap = status === "RELEASING"
                ? (data?.Current?.nextAiringEpisode?.episode ?? 1) - 1
                : totalEpisodes;

            episodesArray = Array
                .from({ length: episodesToMap })
                .map((_, index) => {
                    const entryFromStreamingEpisodes = sortedStreamingEpisodes[index];
                    const episodeTitle = entryFromStreamingEpisodes?.title ?? `Episode ${index + 1}`;
                    const episodeThumbnail = entryFromStreamingEpisodes?.thumbnail ?? thumbnail;

                    return {
                        title:     episodeTitle,
                        thumbnail: episodeThumbnail,
                    };
                });

            break;
        }
        default: {
            episodesArray = [];

            break;
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex lg:flex-nowrap flex-wrap items-stretch gap-4">
                {children}
                {
                    // we should probably implement virtual list for animes like one piece (1000+ episodes)
                    // too lazy lol, even with ready out-of-the-box libraries like tanstack virtual
                    (episodesArray.length > 0) && (
                        <div
                            // aspect-video here so that this element won't exceed player height
                            // and at the same time will be able to stretch
                            className="rounded-md w-full lg:max-w-96 flex flex-col gap-2 p-2 overflow-y-auto aspect-video lg:max-h-none max-h-96"
                            style={{
                                backgroundColor: parseTailwindColor({
                                    color: base,
                                    step:  theme === DarkThemeKey
                                        ? 900
                                        : 100,
                                }),
                            }}
                        >
                            {
                                episodesArray.map((episode, index) => {
                                    const currentMappingEpisode = index + 1;

                                    return (
                                        <button
                                            disabled={selectedEpisode === currentMappingEpisode}
                                            onClick={() => {
                                                const modifiedParameters = new URLSearchParams(searchParameters);

                                                modifiedParameters.set("selectedEpisode", currentMappingEpisode.toString());

                                                globalThis.history.replaceState({}, "", `?${modifiedParameters.toString()}`);
                                            }}
                                            className="cursor-pointer transition-[filter] flex flex-nowrap gap-4 items-center hover:brightness-80 brightness-60 focus:brightness-100 disabled:cursor-default disabled:font-semibold disabled:brightness-100"
                                            key={episode.title}
                                        >
                                            <div className="aspect-video relative h-20 rounded-md overflow-clip">
                                                <ConfiguredImage
                                                    fill
                                                    className="object-cover"
                                                    src={episode.thumbnail}
                                                    alt="Anime episode thumbnail"
                                                />
                                            </div>
                                            <p
                                                className="opacity-80 text-start text-sm"
                                            >
                                                {episode.title}
                                            </p>
                                        </button>
                                    );
                                })
                            }
                        </div>
                    )
                }
            </div>
            <div className="flex lg:flex-nowrap flex-wrap gap-4">

            </div>
        </div>
    );
}
