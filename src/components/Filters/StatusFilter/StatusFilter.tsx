import {MultiSelect} from "@mantine/core";
import {useContext, useState} from "react";
import {variables} from "@/configs/variables";
import {AdvancedSearchFiltersContext} from "@/utils/Contexts/Contexts";

export default function StatusFilter() {
    const { statuses, setStatuses } = useContext(AdvancedSearchFiltersContext);
    const statusesArray = Object.values(variables.sorting);

    return (
        <MultiSelect
            value={statuses}
            onChange={setStatuses}
            data={statusesArray}
        />
    );
}