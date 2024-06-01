import {useState} from "react";
import {Select} from "@mantine/core";
import {variables} from "@/configs/variables";

export default function StudioFilter() {
    const [studio, setStudio] = useState<string | null>('');

    return (
        <>
            <Select
                placeholder="Студия"
                value={studio}
                onChange={setStudio}
                data={variables.filters.studio}
            />
        </>
    );
}