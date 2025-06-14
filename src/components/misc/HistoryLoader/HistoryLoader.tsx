"use client";

import { useState } from "react";
import { usePagination } from "@mantine/hooks";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import Button from "@/components/base/Button/Button";
import { HistoryEntriesCountOnPage } from "@/constants/app";
import GridCards from "@/components/layout/GridCards/GridCards";
import SmallCard from "@/components/misc/SmallCard/SmallCard";

export default function HistoryLoader({
    history,
}: {
    history: Array<unknown>;
}) {
    const [page, onChange] = useState(1);
    const pagination = usePagination({
        total: Math.ceil(history.length / HistoryEntriesCountOnPage),
        page,
        onChange,
    });

    const paginationButtonComponent = pagination.range.map((page, index) => {
        if (page === "dots") {
            return (
                <div className="min-w-8 h-8 grid place-items-center" key={`${page}_${index}`}>
                    <Ellipsis size={16} />
                </div>
            );
        }

        return (
            <Button
                key={`${page}_${index}`}
                custom={{
                    style: pagination.active === page
                        ? "accent"
                        : "base",
                    appendClassNames: "min-w-8 px-2 grid place-items-center",
                }}
                onClick={() => pagination.setPage(page)}
                label="Show previous page of history"
            >
                <p className="leading-none font-medium">
                    {page}
                </p>
            </Button>
        );
    });
    const paginationComponent = (
        <div className="flex gap-2">
            <Button
                custom={{
                    style: "base",
                }}
                onClick={pagination.previous}
                label="Show previous page of history"
            >
                <ChevronLeft size={16} />
            </Button>
            {paginationButtonComponent}
            <Button
                custom={{
                    style: "base",
                }}
                onClick={pagination.next}
                label="Show next page of history"
            >
                <ChevronRight size={16} />
            </Button>
        </div>
    );

    return (
        <div className="flex flex-col w-full gap-4">
            {paginationComponent}
            <GridCards disablePadding>
                {
                    history.slice(
                        (page - 1) * HistoryEntriesCountOnPage,
                        ((page - 1) * HistoryEntriesCountOnPage) + HistoryEntriesCountOnPage,
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
            {paginationComponent}
        </div>
    );
}
