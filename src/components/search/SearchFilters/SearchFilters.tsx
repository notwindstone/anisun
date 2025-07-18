import Button from "@/components/base/Button/Button";

export default function SearchFilters() {
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
     * Genres - Select (order by alphabet)
     * Year - Slider
     * Ranged Year - Checkbox
     * Sort - Select
     * Season - Select
     * Format (TV, TV_SHORT, etc.) - Select
     * Airing Status - Select
     * Source Material - Select
     * Tags/Themes - figure it out (like anilist?)
     * Only Show My Anime - Checkbox
     * Hide My Anime - Checkbox
     */

    return (
        <>
            <div className="">
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-black dark:text-white">
                    Select an option
                </label>
                <select
                    id="countries"
                    className="w-fit h-10 px-4 flex rounded-md bg-neutral-200 appearance-none dark:bg-neutral-800"
                >
                    {
                        ["Any", "United States", "Canada", "France"].map((key) => {
                            return (
                                <option
                                    key={key}
                                    className="bg-transparent checked:bg-linear-to-r checked:from-red-300 checked:to-red-300 rounded-md m-2 text-center h-fit"
                                    value={key}
                                >
                                    {key}
                                </option>
                            );
                        })
                    }
                </select>
            </div>
        </>
    );
}
