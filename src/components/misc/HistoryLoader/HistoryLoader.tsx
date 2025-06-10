"use client";

import { useState } from "react";
import { usePagination } from "@mantine/hooks";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import Button from "@/components/base/Button/Button";

export default function HistoryLoader({
    hashedQueryKey,
}: {
    hashedQueryKey: number;
}) {
    const [page, onChange] = useState(1);
    const pagination = usePagination(
        { total: 10, page, onChange });
    const paginationComponent = pagination.range.map((page, index) => {
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

    return (
        <div className="flex-col">
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
                {paginationComponent}
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
        </div>
    );
}
