import {Dispatch, SetStateAction} from "react";
import {Select} from "@mantine/core";
import {variables} from "@/configs/variables";

export default (function StudioFilter({
    studio,
    setStudio
}: {
    studio: string | null,
    setStudio: Dispatch<SetStateAction<string | null>>
}) {
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
});