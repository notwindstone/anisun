"use client";

import { useContext, useRef, useState } from "react";
import { ListFilter, SearchIcon } from "lucide-react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import Button from "@/components/Button/Button";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import { SearchContext } from "@/utils/providers/SearchProvider";

const icons = {
    id: "ID",
    name: "Name",
};

export default function Search() {
    const { data: { theme, colors: { base } }, dictionaries } = useContext(ConfigsContext);
    const { setData } = useContext(SearchContext);
    const reference = useRef<HTMLInputElement>(null);
    const [searchType, setSearchType] = useState<"id" | "name">("name");

    return (
        <div className="px-4 w-full flex flex-nowrap gap-2">
            <div
                onClick={() => {
                    reference.current?.focus();
                }}
                className="focus-within:ring-2 ring-black dark:ring-white rounded-md flex flex-nowrap items-center overflow-clip h-10 gap-0 cursor-text transition w-full"
                style={{
                    background: parseTailwindColor({
                        color: base,
                        step: theme === DarkThemeKey
                            ? 900
                            : 200,
                    }),
                }}
            >
                <div className="flex justify-center items-center w-10 h-full shrink-0">
                    <SearchIcon size={18} />
                </div>
                <input
                    defaultValue={""}
                    ref={reference}
                    className="w-full h-full text-sm focus:outline-none"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = event.currentTarget.value.trim();

                        setData({
                            search: value,
                            type: searchType,
                        });
                    }}
                    placeholder={dictionaries?.misc?.searchAnimes}
                    title={dictionaries?.aria?.searchAnimes}
                    aria-label={dictionaries?.aria?.searchAnimes}
                />
                <div
                    onClick={() => {
                        let changedSearchType: "id" | "name";

                        setSearchType((state) => {
                            if (state === "id") {
                                changedSearchType = "name";

                                return "name";
                            }

                            changedSearchType = "id";

                            return "id";
                        });
                        setData((state) => {
                            return {
                                ...state,
                                type: changedSearchType,
                            };
                        });
                    }}
                    className="select-none flex justify-center items-center h-full shrink-0 px-2 cursor-pointer hover:text-neutral-500 dark:hover:text-neutral-400 transition"
                >
                    <p className="text-sm">
                        {icons[searchType]}
                    </p>
                </div>
            </div>
            <Button label={dictionaries?.aria?.filterAnimes ?? ""}>
                <ListFilter />
            </Button>
        </div>
    );
}