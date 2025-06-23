"use client";

import { HistoryLocalStorageKey } from "@/constants/app";
import HistoryLoader from "@/components/layout/HistoryLoader/HistoryLoader";
import { useQuery } from "@tanstack/react-query";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";

export default function HistoryWrapper(): React.ReactNode {
    const chunkSize = useContextSelector(ConfigsContext, (value) => value.data.library.historyEntriesOnThePage);
    const { data, isPending, error } = useQuery({
        queryKey: ["anime", "history", "localStorage"],
        queryFn:  () => {
            const historyString = localStorage?.getItem(HistoryLocalStorageKey) ?? "[]";

            let parsedHistory: Array<unknown>;

            try {
                parsedHistory = JSON.parse(historyString);
            } catch {
                parsedHistory = [];
            }

            // first elements will be most recent
            return parsedHistory.reverse();
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

    return (
        <HistoryLoader
            passedChunkSize={chunkSize}
            history={data}
        />
    );
}
