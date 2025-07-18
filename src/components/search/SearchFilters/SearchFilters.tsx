import Button from "@/components/base/Button/Button";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";

export default function SearchFilters() {
    const tempRef = useRef<HTMLSelectElement>(null);
    const temporary = (
        <Button label="shitass" onClick={() => {
            //const modifiedParameters = new URLSearchParams(searchParameters.toString());

            //modifiedParameters.set("jackass", "sosal" + Math.random());

            //globalThis.history.replaceState({}, "", `?${modifiedParameters.toString()}`);
        }}>
            Suck
        </Button>
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
                <p className="text-sm">
                    Select an option
                </p>
                <div
                    className="group relative rounded-md bg-neutral-200 dark:bg-neutral-800 w-fit flex gap-2 flex-nowrap items-center transition ring-2 ring-transparent dark:focus-within:ring-white focus-within:ring-black"
                >
                    <select
                        ref={tempRef}
                        className="w-full pl-4 pr-12 h-10 flex bg-inherit rounded-md appearance-none text-sm outline-none"
                    >
                        {
                            ["Any", "United States", "Canada", "France"].map((key) => {
                                return (
                                    <option
                                        key={key}
                                        value={key}
                                    >
                                        {key}
                                    </option>
                                );
                            })
                        }
                    </select>
                    <ChevronDown
                        className="absolute right-4 pointer-events-none"
                        size={16}
                    />
                </div>
            </div>
        </>
    );
}
