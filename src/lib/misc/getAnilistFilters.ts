import { SearchType } from "@/types/Anime/Search.type";
import { AnyOption } from "@/constants/app";
import { AnilistAllowedFilterKeys } from "@/constants/anilist";

export default function getAnilistFilters({
    search,
}: {
    search: Partial<SearchType> | undefined;
}): Record<string, string | number | boolean> {
    const appliedFilters: Record<string, string | number | boolean> = {};
    const currentSearchFilters = Object.entries(search?.filters ?? {});

    if (search?.search !== undefined) {
        appliedFilters["search"] = search.search;
    }

    for (const [key, value] of currentSearchFilters) {
        if (!AnilistAllowedFilterKeys.has(key)) {
            continue;
        }

        const isValueEmpty = value === "" || value === undefined;
        const isValuePlaceholder = value === AnyOption.value || value === AnyOption.name;
        const isValueAnEmptyArray = value === "[]";
        const isFalsyValue = value === "false" || value === false || value === 0 || value === "0";

        if (isValueEmpty || isValuePlaceholder || isValueAnEmptyArray || isFalsyValue) {
            continue;
        }

        appliedFilters[key] = value;
    }
    console.log(appliedFilters);
    console.log(AnilistAllowedFilterKeys);

    return {};
}
