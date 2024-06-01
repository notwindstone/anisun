import {MultiSelect} from "@mantine/core";
import {useState} from "react";
import {variables} from "@/configs/variables";

export default function StatusFilter() {
    const [statuses, setStatuses] = useState<string[]>([]);
    const statusesArray = Object.values(variables.sorting);

    return (
        <MultiSelect
            value={statuses}
            onChange={setStatuses}
            data={statusesArray}
        />
    );
}