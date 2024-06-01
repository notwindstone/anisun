import {MultiSelect} from "@mantine/core";
import {useState} from "react";
import {variables} from "@/configs/variables";

export default function KindFilter() {
    const [kinds, setKinds] = useState<string[]>([]);

    return (
        <MultiSelect
            value={kinds}
            onChange={setKinds}
            data={variables.filters.kind}
        />
    );
}