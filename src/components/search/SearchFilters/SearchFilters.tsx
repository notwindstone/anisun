import { useCallback, useMemo, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { SearchContext } from "@/lib/providers/SearchProvider";
import {
    AnilistFilterKeys,
    AnilistSortValues,
    CheckboxFilters,
    getSelectableFilters,
    SingleSliderFilters,
    SliderFilters,
} from "@/constants/anilist";
import SelectWrapper from "@/components/base/SelectWrapper/SelectWrapper";
import RangedSlider from "@/components/base/RangedSlider/RangedSlider";
import Checkbox from "@/components/base/Checkbox/Checkbox";
import transformIntoDropdownOptions from "@/lib/misc/transformIntoDropdownOptions";
import NativeSlider from "@/components/base/NativeSlider/NativeSlider";
import SearchTags from "@/components/search/SearchTags/SearchTags";
import SegmentedControl from "@/components/base/SegmentedControl/SegmentedControl";

const categories: Array<string> = ["General", "Modifiers", "Tags"];

export default function SearchFilters() {
    const { genres, setData } = useContextSelector(SearchContext, (value) => ({
        genres:  value.mediaGenres,
        setData: value.setData,
    }));
    const [selected, setSelected] = useState<string | undefined>(categories[0]);

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
    const memoizedSegmentedControl = useMemo(() => (
        <SegmentedControl
            darker
            list={categories}
            selected={selected}
            selectList={setSelected}
        />
    ), [selected, setSelected]);
    const memoizedGeneralFilters = useMemo(
        () => (
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
        ),
        [genres, memoizedCallback],
    );
    const memoizedModifierFilters = useMemo(
        () => (
            <>
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
                    {
                        SliderFilters.map((filter) => (
                            <RangedSlider
                                key={filter.parameter[0]}
                                parameter={filter.parameter}
                                label={filter.label}
                                fixed={filter.fixed}
                                callback={memoizedCallback}
                                additionalClassNames={filter.additionalClassNames}
                            />
                        ))
                    }
                </div>
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                    {
                        SingleSliderFilters.map((filter) => (
                            <NativeSlider
                                key={filter.parameter}
                                fixed={filter.fixed}
                                parameter={filter.parameter}
                                callback={memoizedCallback}
                                label={filter.label}
                                reverse={filter.reverse}
                            />
                        ))
                    }
                </div>
                <div className="flex flex-wrap gap-4">
                    {
                        CheckboxFilters.map((filter) => (
                            <Checkbox
                                // there is two children with the `onList` parameter
                                key={`${filter.parameter}_${filter.label}`}
                                parameter={filter.parameter}
                                label={filter.label}
                                callback={memoizedCallback}
                            />
                        ))
                    }
                </div>
            </>
        ),
        [memoizedCallback],
    );
    const memoizedTagFilters = useMemo(
        () => (
            <div className="overflow-y-auto sm:max-h-96 flex flex-col gap-4">
                <SearchTags
                    parameter={AnilistFilterKeys.Tags}
                    callback={memoizedCallback}
                />
            </div>
        ),
        [memoizedCallback],
    );
    const memoizedFilterSelections = useMemo(
        (): Record<string, React.ReactNode> => ({
            General:   memoizedGeneralFilters,
            Modifiers: memoizedModifierFilters,
            Tags:      memoizedTagFilters,
        }),
        [memoizedGeneralFilters, memoizedModifierFilters, memoizedTagFilters],
    );

    // basically never triggers on any of SearchFilters hooks
    return useMemo(
        () => (
            <>
                <div className="overscroll-y-none overflow-y-auto sm:overflow-y-visible h-full px-4 pb-4 flex flex-col gap-4">
                    <SelectWrapper
                        parameter={AnilistFilterKeys.Sort}
                        label="Sort by"
                        options={transformIntoDropdownOptions(AnilistSortValues)}
                        callback={memoizedCallback}
                    />
                    {memoizedSegmentedControl}
                    {memoizedFilterSelections[selected ?? categories[0]]}
                </div>
            </>
        ),
        [memoizedCallback, memoizedSegmentedControl, memoizedFilterSelections, selected],
    );
}
