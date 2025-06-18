"use client";

import { HistoryLocalStorageKey } from "@/constants/app";
import HistoryLoader from "@/components/misc/HistoryLoader/HistoryLoader";
import { useQuery } from "@tanstack/react-query";

export default function HistoryWrapper(): React.ReactNode {
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
            history={data}
        />
    );
}
