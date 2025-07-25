import { useContextSelector } from "use-context-selector";
import { SearchContext } from "@/lib/providers/SearchProvider";
import { AnyOption } from "@/constants/app";
import { ConfigsContext } from "@/lib/providers/ConfigsProvider";
import { DarkThemeKey } from "@/constants/configs";
import { X } from "lucide-react";
import {AnilistAllowedFilterKeys, AnilistFilterLabels} from "@/constants/anilist";
import parseTailwindColor from "@/lib/appearance/parseTailwindColor";

export default function AppliedFilters({
    callback,
}: {
    callback: ({
        parameter,
        value,
    }: {
        parameter: string;
        value:     string;
    }) => void;
}) {
    const { base, theme } = useContextSelector(ConfigsContext, (value) => ({
        base:  value.data.colors.base,
        theme: value.data.theme,
    }));
    const data = useContextSelector(SearchContext, (value) => value.data);
    const filters = data.filters;

    return (
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto max-h-20">
            {
                Object.entries(filters).map(([key, value]) => {
                    if (!AnilistAllowedFilterKeys.has(key)) {
                        return;
                    }

                    const isEmpty =
                        value === "" ||
                        value === "false" ||
                        value === false ||
                        value === "[]" ||
                        value === "0" ||
                        value === 0 ||
                        value === AnyOption.value;

                    if (isEmpty) {
                        return;
                    }

                    return (
                        <button
                            key={key}
                            onClick={() => {
                                callback({
                                    parameter: key,
                                    value:     "",
                                });
                            }}
                            className="transition-[color,opacity] rounded-md h-fit py-1 px-2 text-sm flex flex-nowrap gap-2 items-center dark:text-neutral-400 text-neutral-600 cursor-pointer dark:hover:text-white hover:text-black focus:opacity-40"
                            style={{
                                backgroundColor: parseTailwindColor({
                                    color: base,
                                    step:  theme === DarkThemeKey
                                        ? 800
                                        : 200,
                                }),
                            }}
                        >
                            <span className="line-clamp-1">
                                {AnilistFilterLabels[key]}
                            </span>
                            <X size={14} />
                        </button>
                    );
                })
            }
        </div>
    );
}
