"use client";

import { useState } from "react";
import GridCards from "@/components/layout/GridCards/GridCards";
import SmallCard from "@/components/layout/SmallCard/SmallCard";
import SkeletonSmallCard from "@/components/layout/SkeletonSmallCard/SkeletonSmallCard";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/lib/providers/ConfigsProvider";
import ErrorSmallCard from "@/components/layout/ErrorSmallCard/ErrorSmallCard";
import Pagination from "@/components/base/Pagination/Pagination";
import { AnimeType } from "@/types/Anime/Anime.type";

export default function HistoryLoader({
    passedChunkSize,
    history,
    isPending,
    isError,
}: {
    passedChunkSize: number;
    history: Array<AnimeType & { date: string } | number>;
    isPending?: boolean;
    isError?: boolean;
}) {
    const { theme, base } = useContextSelector(ConfigsContext, (value) => {
        return {
            theme: value.data.theme,
            base:  value.data.colors.base,
        };
    });
    const [page, onChange] = useState(1);

    if (isPending || isError) {
        return (
            <div className="flex flex-col w-full gap-4">
                <Pagination
                    total={Math.ceil(history.length / passedChunkSize)}
                    onChange={onChange}
                    page={page}
                >
                    <GridCards disablePadding>
                        {
                            history.map((historyEntry) => {
                                if (isError) {
                                    return (
                                        <ErrorSmallCard key={`${historyEntry}`} isGrid />
                                    );
                                }

                                return (
                                    <SkeletonSmallCard
                                        key={`${historyEntry}`}
                                        isGrid
                                        theme={theme}
                                        base={base}
                                    />
                                );
                            })
                        }
                    </GridCards>
                </Pagination>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full gap-4">
            <Pagination
                darker
                total={Math.ceil(history.length / passedChunkSize)}
                onChange={onChange}
                page={page}
            >
                <GridCards disablePadding>
                    {
                        history.slice(
                            (page - 1) * passedChunkSize,
                            ((page - 1) * passedChunkSize) + passedChunkSize,
                        ).map((historyEntry) => {
                            return (
                                <SmallCard
                                    key={typeof historyEntry === "number" ? historyEntry : `${historyEntry.idMal}_${historyEntry.date}`}
                                    data={typeof historyEntry === "number" ? {} : historyEntry}
                                    isGrid
                                    isImageUnoptimized
                                />
                            );
                        })
                    }
                </GridCards>
            </Pagination>
        </div>
    );
}
