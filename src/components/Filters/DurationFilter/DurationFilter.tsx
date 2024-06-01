import {MultiSelect} from "@mantine/core";
import {useState} from "react";

export default function DurationFilter() {
    const [durations, setDurations] = useState<string[]>([]);

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