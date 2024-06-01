import {MultiSelect} from "@mantine/core";
import {useState} from "react";
import {variables} from "@/configs/variables";

export default function RatingFilter() {
    const [ratings, setRatings] = useState<string[]>();

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