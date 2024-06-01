import {MultiSelect} from "@mantine/core";
import {useContext} from "react";
import {AdvancedSearchFiltersContext} from "@/utils/Contexts/Contexts";

export default function DurationFilter() {
    const { durations, setDurations } = useContext(AdvancedSearchFiltersContext);

    console.log("durations");
    return (
        <MultiSelect
            value={durations}
            onChange={setDurations}
            data={[
                { label: "Меньше 10 минут", value: "S" },
                { label: "10 - 30 минут", value: "D" },
                { label: "Больше 30 минут", value: "F" },
            ]}
        />
    );
}