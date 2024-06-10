import {MultiSelect} from "@mantine/core";
import {Dispatch, memo, SetStateAction} from "react";
import {variables} from "@/configs/variables";
import classes from '@/components/Filters/FiltersSelect.module.css';

export default memo(function RatingFilter({
    ratings,
    setRatings
}: {
    ratings: string[] | undefined,
    setRatings: Dispatch<SetStateAction<string[] | undefined>>
}) {
    return (
        <>
            <MultiSelect
                classNames={classes}
                value={ratings}
                onChange={(rating) => setRatings(rating)}
                placeholder="Возрастное ограничение"
                data={variables.filters.rating}
            />
        </>
    );
});