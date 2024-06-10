import {MultiSelect} from "@mantine/core";
import {Dispatch, memo, SetStateAction} from "react";
import classes from '@/components/Filters/FiltersSelect.module.css';

export default memo(function DurationFilter({
    durations,
    setDurations
}: {
    durations: string[],
    setDurations: Dispatch<SetStateAction<string[]>>
}) {
    return (
        <MultiSelect
            classNames={classes}
            placeholder="Длительность эпизодов"
            value={durations}
            onChange={setDurations}
            data={[
                { label: "Меньше 10 минут", value: "S" },
                { label: "10 - 30 минут", value: "D" },
                { label: "Больше 30 минут", value: "F" },
            ]}
        />
    );
});