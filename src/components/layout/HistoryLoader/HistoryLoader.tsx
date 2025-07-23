"use client";

import { useState } from "react";
import GridCards from "@/components/layout/GridCards/GridCards";
import SmallCard from "@/components/layout/SmallCard/SmallCard";
import SkeletonSmallCard from "@/components/layout/SkeletonSmallCard/SkeletonSmallCard";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import ErrorSmallCard from "@/components/layout/ErrorSmallCard/ErrorSmallCard";
import Pagination from "@/components/base/Pagination/Pagination";

export default function HistoryLoader({
    passedChunkSize,
    history,
    isPending,
    isError,
}: {
    passedChunkSize: number;
    history: Array<unknown>;
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
                                    // eslint-disable-next-line unicorn/no-abusive-eslint-disable
                                    // eslint-disable-next-line
                                    // @ts-ignore
                                    key={`${historyEntry.idMal}_${historyEntry.date}`}
                                    // eslint-disable-next-line unicorn/no-abusive-eslint-disable
                                    // eslint-disable-next-line
                                    // @ts-ignore
                                    data={historyEntry}
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
