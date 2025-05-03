"use client";

import { useContext, useRef } from "react";
import { ListFilter, SearchIcon } from "lucide-react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import Button from "@/components/Button/Button";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import { SearchContext } from "@/utils/providers/SearchProvider";

export default function Search() {
    const { data: { theme, colors: { base } }, dictionaries } = useContext(ConfigsContext);
    const { setData } = useContext(SearchContext);
    const reference = useRef<HTMLInputElement>(null);

    return (
        <div className="px-2 w-full flex flex-nowrap gap-2">
            <div
                onClick={() => {
                    reference.current?.focus();
                }}
                className="focus-within:ring-2 ring-black dark:ring-white rounded-md flex flex-nowrap items-center overflow-clip h-8 gap-0 cursor-text transition w-full"
                style={{
                    background: parseTailwindColor({
                        color: base,
                        step: theme === DarkThemeKey
                            ? 900
                            : 200,
                    }),
                }}
            >
                <div className="flex justify-center items-center w-8 h-full shrink-0">
                    <SearchIcon size={16} />
                </div>
                <input
                    defaultValue={"  "}
                    ref={reference}
                    className="pr-2 w-full h-full text-sm focus:outline-none"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = event.currentTarget.value.trim();

                        setData(value);
                    }}
                    placeholder={dictionaries?.misc?.searchAnimes}
                    title={dictionaries?.aria?.searchAnimes}
                    aria-label={dictionaries?.aria?.searchAnimes}
                />
            </div>
            <Button label={dictionaries?.aria?.filterAnimes ?? ""}>
                <ListFilter
                    size={16}
                />
            </Button>
        </div>
    );
}