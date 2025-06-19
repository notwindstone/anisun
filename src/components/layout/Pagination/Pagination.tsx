import { usePagination } from "@mantine/hooks";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import Button from "@/components/base/Button/Button";

export default function Pagination({
    darker,
    total,
    page,
    onChange,
    children,
}: {
    darker?: boolean;
    total: number;
    page: number;
    onChange: (page: number) => void;
    children: React.ReactNode;
}) {
    const pagination = usePagination({
        total,
        page,
        onChange,
        siblings: 2,
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
                    darker,
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
        <div className="flex gap-2 shrink-0 flex-wrap">
            <Button
                custom={{
                    darker,
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
                    darker,
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
        <>
            {paginationComponent}
            {children}
            {paginationComponent}
        </>
    );
}
