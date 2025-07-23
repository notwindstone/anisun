import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { useDebouncedState } from "@mantine/hooks";
import { useContextSelector } from "use-context-selector";
import { SearchContext } from "@/utils/providers/SearchProvider";
import {
    AnilistAiringStatuses,
    AnilistFormats,
    AnilistQueryYears,
    AnilistSeasons,
    AnilistSourceMaterials,
} from "@/constants/anilist";
import { AnyOption } from "@/constants/app";
import SelectWrapper from "@/components/base/SelectWrapper/SelectWrapper";
import RangedSlider from "@/components/base/RangedSlider/RangedSlider";
import Checkbox from "@/components/base/Checkbox/Checkbox";

type dropdownType = {
    name:  string;
    value: string;
};

const transformIntoDropdown = (
    data:      Array<string | number | dropdownType>,
    multiple?: boolean,
): Array<dropdownType> => {
    const transformedData = data.map((item) => {
        if (typeof item === "object") {
            return item;
        }

        return {
            name:  item.toString(),
            value: item.toString(),
        };
    });

    if (!multiple) {
        transformedData.unshift(AnyOption);
    }

    return transformedData;
};

export default function SearchFilters() {
    const { genres, tags } = useContextSelector(SearchContext, (value) => ({
        genres: value.mediaGenres,
        tags:   value.mediaTags,
    }));
    const [debouncedFiltersState, setDebouncedFiltersState] = useDebouncedState<Record<string, string>>({}, 300);
    const searchParameters = useSearchParams();

    const memoizedCallback = useCallback(
        ({
            parameter,
            value,
        }: {
            parameter: string;
            value:     string;
        }) => {
            setDebouncedFiltersState((state) => {
                const updated: Record<string, string> = {
                    ...state,
                };

                updated[parameter] = value;

                return updated;
            });
        },
        [setDebouncedFiltersState],
    );

    const searchParametersAsString = searchParameters.toString();

    useEffect(() => {
        const modifiedParameters = new URLSearchParams(searchParametersAsString);
        const entries = Object.entries(debouncedFiltersState);

        for (const [key, value] of entries) {
            modifiedParameters.set(key, value);
        }

        globalThis.history.replaceState({}, "", `?${modifiedParameters.toString()}`);
    }, [debouncedFiltersState, searchParametersAsString]);

    /**
     * Genres - MultiSelect (order by alphabet)
     * Year - Select
     * Enable Ranged Year - Checkbox
     * Ranged Year - Slider
     * Sort - Select
     * Season - Select
     * Format (TV, TV_SHORT, etc.) - MultiSelect
     * Airing Status - Select
     * Source Material - Select
     * Tags/Themes - Categorize and show buttons
     * Only Show My Anime - Checkbox
     * Hide My Anime - Checkbox
     * Score - Slider
     * Limit - Slider
     * Episode Duration - Ranged Slider
     * Episodes - Ranged Slider
     * Censored (isAdult === false) - checkbox
     */

    // basically never triggers on any of SearchFilters hooks
    return useMemo(
        () => (
            <>
                <div className="overscroll-y-none overflow-y-auto h-full px-4 pb-4">
                    <Checkbox uniqueID="lol" />
                    <SelectWrapper
                        multiple
                        searchable
                        parameter="genre"
                        callback={memoizedCallback}
                        options={transformIntoDropdown(genres, true)}
                    />
                    <SelectWrapper
                        parameter="year"
                        callback={memoizedCallback}
                        options={transformIntoDropdown(AnilistQueryYears)}
                    />
                    <SelectWrapper
                        parameter="season"
                        callback={memoizedCallback}
                        options={transformIntoDropdown(AnilistSeasons)}
                    />
                    <SelectWrapper
                        parameter="format"
                        callback={memoizedCallback}
                        options={transformIntoDropdown(AnilistFormats)}
                    />
                    <SelectWrapper
                        parameter="status"
                        callback={memoizedCallback}
                        options={transformIntoDropdown(AnilistAiringStatuses)}
                    />
                    <SelectWrapper
                        parameter="source"
                        callback={memoizedCallback}
                        options={transformIntoDropdown(AnilistSourceMaterials)}
                    />
                    <RangedSlider
                        fixed={{
                            min:  0,
                            max:  150,
                            step: 1,
                        }}
                    />
                </div>
            </>
        ),
        [memoizedCallback, genres, tags],
    );
}
