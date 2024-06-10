import {MultiSelect} from "@mantine/core";
import {Dispatch, memo, SetStateAction} from "react";
import {variables} from "@/configs/variables";
import classes from '@/components/Filters/FiltersSelect.module.css';

export default memo(function StatusFilter({
    statuses, 
    setStatuses
}: {
    statuses: string[],
    setStatuses: Dispatch<SetStateAction<string[]>>
}) {
    const statusesArray = Object.values(variables.sorting);

    return (
        <MultiSelect
            classNames={classes}
            placeholder="Статус"
            value={statuses}
            onChange={setStatuses}
            data={statusesArray}
        />
    );
});