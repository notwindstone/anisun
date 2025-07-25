import { SearchType } from "@/types/Anime/Search.type";
import { AnyOption } from "@/constants/app";
import {AnilistAllowedFilterKeys, AnilistFilterKeys, AnilistRangedFilterKeys} from "@/constants/anilist";

export default function getAnilistFilters({
    search,
}: {
    search: Partial<SearchType> | undefined;
}): Record<string, string | number | boolean | Array<string>> {
    const appliedFilters: Record<string, string | number | boolean | Array<string>> = {};
    const currentSearchFilters = Object.entries(search?.filters ?? {});

    if (
        search?.search !== undefined &&
        search.search !== ""
    ) {
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

        const isCurrentFilterAnArray =
            key === AnilistFilterKeys.Genres ||
            key === AnilistFilterKeys.Tags;

        if (isCurrentFilterAnArray && typeof value === "string") {
            let parsed;

            try {
                parsed = JSON.parse(value);
            } catch {
                continue;
            }

            if (!Array.isArray(parsed)) {
                continue;
            }

            appliedFilters[key] = parsed;

            continue;
        }

        const isCurrentFilterADate =
            key === AnilistRangedFilterKeys.RangedEpisodes[0] ||
            key === AnilistRangedFilterKeys.RangedEpisodes[1];

        if (isCurrentFilterADate) {
            appliedFilters[key] = `${value}0000`;

            continue;
        }

        appliedFilters[key] = value;
    }
    console.log(appliedFilters);
    return appliedFilters;
}
