"use client";

import { useCallback, useMemo, useState } from "react";
import { ListFilter } from "lucide-react";
import { ConfigsContext } from "@/lib/providers/ConfigsProvider";
import { SearchContext } from "@/lib/providers/SearchProvider";
import { useContextSelector } from "use-context-selector";
import Modal from "@/components/base/Modal/Modal";
import Input from "@/components/base/Input/Input";
import SearchFilters from "@/components/search/SearchFilters/SearchFilters";
import useInitialSearchParameters from "@/hooks/useInitialSearchParameters";

const icons = {
    id:   "ID",
    name: "Name",
};

export default function AdvancedSearchBar() {
    const dictionaries = useContextSelector(ConfigsContext, (value) => {
        return value.dictionaries;
    });
    const setData = useContextSelector(SearchContext, (value) => value.setData);
    const [searchType, setSearchType] = useState<"id" | "name">("name");
    const [isError, setIsError] = useState(false);
    const initialSearchValue = useInitialSearchParameters("search") ?? "";

    const filtersTitle = dictionaries?.misc?.filters;
    const filtersDescription = dictionaries?.misc?.filtersDescription;

    const memoizedModal = useMemo(
        () => (
            <Modal
                buttonChildren={<ListFilter />}
                label={filtersTitle}
                description={filtersDescription}
                shouldBeRelative={false}
            >
                <SearchFilters />
            </Modal>
        ),
        [filtersTitle, filtersDescription],
    );
    const memoizedSearchAction = useCallback(
        (value: string) => {
            setIsError(false);

            setData((state) => ({
                ...state,
                search: value,
            }));

            if (searchType === "id" && /[^0-9]/.test(value)) {
                setIsError(true);
            }
        },
        [searchType, setData],
    );
    const memoizedSearchTypeAction = useCallback(
        () => {
            let changedSearchType: "id" | "name";

            setIsError(false);
            setSearchType((state) => {
                if (state === "id") {
                    changedSearchType = "name";

                    return "name";
                }

                changedSearchType = "id";

                return "id";
            });
            setData((state) => ({
                ...state,
                type: changedSearchType,
            }));
        },
        [setData],
    );

    return (
        // `sm:relative` here to link Modal with this element
        <div className="px-4 w-full mx-auto max-w-384 flex flex-nowrap gap-2 sm:relative">
            <Input
                defaultValue={initialSearchValue}
                setSearch={memoizedSearchAction}
                placeholder={dictionaries?.misc?.searchAnimes ?? ""}
                appendClassNames={isError ? "!ring-red-500 dark:!ring-red-400" : ""}
            >
                <div
                    onClick={memoizedSearchTypeAction}
                    className="select-none flex justify-center items-center h-full shrink-0 px-2 cursor-pointer hover:text-neutral-500 dark:hover:text-neutral-400 transition"
                >
                    <p className="text-sm">
                        {icons[searchType]}
                    </p>
                </div>
            </Input>
            {searchType === "name" && memoizedModal}
        </div>
    );
}
