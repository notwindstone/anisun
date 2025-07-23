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
    AnilistSourceMaterials, CheckboxFilters, getSelectableFilters,
} from "@/constants/anilist";
import { AnyOption } from "@/constants/app";
import SelectWrapper from "@/components/base/SelectWrapper/SelectWrapper";
import RangedSlider from "@/components/base/RangedSlider/RangedSlider";
import Checkbox from "@/components/base/Checkbox/Checkbox";
import transformIntoDropdownOptions from "@/utils/misc/transformIntoDropdownOptions";

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
            let parsedValue: Array<string> | string;

            try {
                // value can be either string or an array in the string representation
                parsedValue = JSON.parse(value);
            } catch {
                // it's probably just a string then
                parsedValue = value;
            }

            const isEmptyArrayValue = Array.isArray(parsedValue) && parsedValue.length === 0;
            const isPlaceholderValue = parsedValue === AnyOption.value;

            if (isEmptyArrayValue || isPlaceholderValue) {
                modifiedParameters.delete(key);

                continue;
            }

            modifiedParameters.set(key, value);
        }

        globalThis.history.replaceState({}, "", `?${modifiedParameters.toString()}`);
    }, [debouncedFiltersState, searchParametersAsString]);

    /**
       Genres - MultiSelect (order by alphabet)
       Year - Select
       Enable Ranged Year - Checkbox
     * Ranged Year - Ranged Slider
     * Sort - Select
       Season - Select
       Format (TV, TV_SHORT, etc.) - MultiSelect
       Airing Status - Select
       Source Material - Select
       Only Show My Anime - Checkbox
       Hide My Anime - Checkbox
     * Score - Slider
     * Limit - Slider
     * Episode Duration - Ranged Slider
     * Episodes - Ranged Slider
       Censored (isAdult === false) - checkbox
     * Tags/Themes - Categorize and show buttons
     */

    // basically never triggers on any of SearchFilters hooks
    return useMemo(
        () => (
            <>
                <div className="overscroll-y-none overflow-y-auto h-full px-4 pb-4 flex flex-col gap-4">
                    <div className="grid lg:grid-cols-4 sm:grid-cols-3 xxs:grid-cols-2 grid-cols-1 gap-2">
                        {
                            getSelectableFilters(genres).map((filter) => (
                                <SelectWrapper
                                    key={filter.parameter}
                                    parameter={filter.parameter}
                                    multiple={filter.multiple}
                                    searchable={filter.searchable}
                                    additionalClassNames={filter.additionalClassNames}
                                    options={
                                        transformIntoDropdownOptions(
                                            filter.options,
                                            filter.multiple,
                                        )
                                    }
                                    callback={memoizedCallback}
                                    label={filter.label}
                                />
                            ))
                        }
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {
                            CheckboxFilters.map((filter) => (
                                <Checkbox
                                    key={filter.parameter}
                                    parameter={filter.parameter}
                                    label={filter.label}
                                    callback={memoizedCallback}
                                />
                            ))
                        }
                    </div>
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
