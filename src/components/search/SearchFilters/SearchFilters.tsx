import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import SelectWrapper from "@/components/base/SelectWrapper/SelectWrapper";

export default function SearchFilters() {
    const searchParameters = useSearchParams();

    const searchParametersAsString = searchParameters.toString();

    const memoizedCallback = useCallback(
        ({
            parameter,
            value,
        }: {
            parameter: string;
            value:     string;
        }) => {
            const modifiedParameters = new URLSearchParams(searchParametersAsString);

            modifiedParameters.set(parameter, value);

            globalThis.history.replaceState({}, "", `?${modifiedParameters.toString()}`);
        },
        [searchParametersAsString],
    );

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

    return (
        <>
            <div className="">
                <SelectWrapper
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
            </div>
        </>
    );
}
