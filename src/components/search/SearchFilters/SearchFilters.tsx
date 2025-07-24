import { useCallback, useMemo } from "react";
import { useContextSelector } from "use-context-selector";
import { SearchContext } from "@/lib/providers/SearchProvider";
import { CheckboxFilters, getSelectableFilters, SliderFilters } from "@/constants/anilist";
import SelectWrapper from "@/components/base/SelectWrapper/SelectWrapper";
import RangedSlider from "@/components/base/RangedSlider/RangedSlider";
import Checkbox from "@/components/base/Checkbox/Checkbox";
import transformIntoDropdownOptions from "@/lib/misc/transformIntoDropdownOptions";

export default function SearchFilters() {
    const { genres, tags, setData } = useContextSelector(SearchContext, (value) => ({
        genres:  value.mediaGenres,
        tags:    value.mediaTags,
        setData: value.setData,
    }));

    const memoizedCallback = useCallback(
        ({
            parameter,
            value,
        }: {
            parameter: string;
            value:     string;
        }) => {
            setData((state) => {
                const updated: Record<string, string | number | boolean> = {
                    ...state.filters,
                };

                updated[parameter] = value;

                return {
                    ...state,
                    filters: updated,
                };
            });
        },
        [setData],
    );

    /**
       Genres - MultiSelect (order by alphabet)
       Year - Select
       Enable Ranged Year - Checkbox
       Ranged Year - Ranged Slider
     * Sort - Select
       Season - Select
       Format (TV, TV_SHORT, etc.) - MultiSelect
       Airing Status - Select
       Source Material - Select
       Only Show My Anime - Checkbox
       Hide My Anime - Checkbox
     * Score - Slider
     * Limit - Slider
       Episode Duration - Ranged Slider
       Episodes - Ranged Slider
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
                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
                        {
                            SliderFilters.map((filter) => (
                                <RangedSlider
                                    key={filter.parameter}
                                    parameter={filter.parameter}
                                    label={filter.label}
                                    fixed={filter.fixed}
                                    callback={memoizedCallback}
                                    additionalClassNames={filter.additionalClassNames}
                                />
                            ))
                        }
                    </div>
                </div>
            </>
        ),
        [memoizedCallback, genres, tags],
    );
}
