import {MultiSelect} from "@mantine/core";
import {useContext} from "react";
import {variables} from "@/configs/variables";
import {AdvancedSearchFiltersContext} from "@/utils/Contexts/Contexts";

export default function RatingFilter() {
    const { ratings, setRatings } = useContext(AdvancedSearchFiltersContext);

    return (
        <>
            <MultiSelect
                value={ratings}
                onChange={(rating) => setRatings(rating)}
                placeholder="Возрастное ограничение"
                data={variables.filters.rating}
            />
        </>
    );
}