import {MultiSelect} from "@mantine/core";
import {Dispatch, memo, SetStateAction} from "react";
import {variables} from "@/configs/variables";

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
            placeholder="Статус"
            value={statuses}
            onChange={setStatuses}
            data={statusesArray}
        />
    );
});