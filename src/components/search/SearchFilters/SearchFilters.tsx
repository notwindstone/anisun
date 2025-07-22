import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { useDebouncedState } from "@mantine/hooks";
import SelectWrapper from "@/components/base/SelectWrapper/SelectWrapper";
import NativeSlider from "@/components/base/NativeSlider/NativeSlider";
import RangedSlider from "@/components/base/RangedSlider/RangedSlider";
import Checkbox from "@/components/base/Checkbox/Checkbox";

export default function SearchFilters() {
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
                    <Checkbox />
                    <SelectWrapper
                        multiple
                        searchable
                        parameter="sosal"
                        callback={memoizedCallback}
                        options={[
                            {
                                name:  "Shitass",
                                value: "shit",
                            },
                            {
                                name:  "Jackass",
                                value: "jack",
                            },
                            {
                                name:  "Fatass",
                                value: "fat",
                            },
                            {
                                name:  "Badass",
                                value: "bad",
                            },
                            {
                                name:  "Piss",
                                value: "piss",
                            },
                        ]}
                    />
                    <RangedSlider
                        fixed={{
                            min:  0,
                            max:  150,
                            step: 1,
                        }}
                    />
                    <NativeSlider />
                    <NativeSlider />
                    <NativeSlider />
                    <NativeSlider />
                    <NativeSlider />
                    <NativeSlider />
                    <NativeSlider />
                    <NativeSlider />
                    <NativeSlider />
                    <NativeSlider />
                    <NativeSlider />
                    <NativeSlider />
                    <NativeSlider />
                    <NativeSlider />
                    <NativeSlider />
                    <NativeSlider />
                    <NativeSlider />
                    <NativeSlider />
                    <NativeSlider />
                    <NativeSlider />
                    <NativeSlider />
                    <NativeSlider />
                    <NativeSlider />
                    <NativeSlider />
                    <NativeSlider />
                </div>
            </>
        ),
        [memoizedCallback],
    );
}
