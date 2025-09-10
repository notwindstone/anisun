"use client";

import { HistoryLocalStorageKey } from "@/constants/app";
import HistoryLoader from "@/components/layout/HistoryLoader/HistoryLoader";
import { useQuery } from "@tanstack/react-query";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/lib/providers/ConfigsProvider";
import { AnimeType } from "@/types/Anime/Anime.type";

export default function HistoryWrapper(): React.ReactNode {
    const chunkSize = useContextSelector(ConfigsContext, (value) => value.data.library.historyEntriesOnThePage);
    const { data, isPending, error } = useQuery({
        queryKey: ["anime", "history", "localStorage"],
        queryFn:  (): Array<AnimeType & { date: string }> => {
            const historyString = localStorage?.getItem(HistoryLocalStorageKey) ?? "[]";

            let parsedHistory: Array<unknown>;

            try {
                parsedHistory = JSON.parse(historyString);
            } catch {
                parsedHistory = [];
            }

            // at least validate that entries are objects
            for (const parsedEntry of parsedHistory) {
                if (typeof parsedEntry !== "object" || parsedEntry === null) {
                    return [];
                }
            }

            // first elements will be the most recent
            // assure typescript that this array is actually an 'Array<AnimeType...>',
            // even thought it is maybe not.
            return parsedHistory.reverse() as Array<AnimeType & { date: string }>;
        },
    });

    if (isPending) {
        return (
            <HistoryLoader
                passedChunkSize={chunkSize}
                isPending
                history={
                    Array
                        .from({
                            length: 12,
                        }, (_, z) => z)
                }
            />
        );
    }

    if (error) {
        return (
            <HistoryLoader
                passedChunkSize={chunkSize}
                isError
                history={
                    Array
                        .from({
                            length: 12,
                        }, (_, z) => z)
                }
            />
        );
    }

    if (data?.length === 0) {
        return (
            <div>
                No history yet. Try watching some anime first!
            </div>
        );
    }

    return (
        <HistoryLoader
            passedChunkSize={chunkSize}
            history={data}
        />
    );
}
