"use client";

import { useRef } from "react";
import { AnilibriaSearchContext } from "@/utils/providers/AnilibriaSearchProvider";
import parseTailwindColor from "@/utils/appearance/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import { SearchIcon } from "lucide-react";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { useContextSelector } from "use-context-selector";

export default function AnilibriaSearch() {
    const { data: { theme, colors: { base } }, dictionaries } = useContextSelector(ConfigsContext, (value) => {
        return {
            data:         value.data,
            dictionaries: value.dictionaries,
        };
    });
    const reference = useRef<HTMLInputElement>(null);
    const { search, setSearch } = useContextSelector(AnilibriaSearchContext, (value) => value);

    return (
        <>
            <div
                onClick={() => {
                    reference.current?.focus();
                }}
                className="focus-within:ring-2 ring-black dark:ring-white rounded-md flex flex-nowrap items-center overflow-clip h-10 gap-0 cursor-text transition w-full"
                style={{
                    background: parseTailwindColor({
                        color: base,
                        step:  theme === DarkThemeKey
                            ? 900
                            : 200,
                    }),
                }}
            >
                <div className="flex justify-center items-center w-10 h-full shrink-0">
                    <SearchIcon size={18} />
                </div>
                <input
                    defaultValue={search}
                    ref={reference}
                    className="w-full h-full text-sm focus:outline-none"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = event.currentTarget.value.trim();

                        setSearch(value);
                    }}
                    placeholder={dictionaries?.misc?.searchAnimes}
                    title={dictionaries?.aria?.searchAnimes}
                    aria-label={dictionaries?.aria?.searchAnimes}
                />
            </div>
        </>
    );
}
