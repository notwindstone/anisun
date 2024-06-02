import {MultiSelect} from "@mantine/core";
import {Dispatch, memo, SetStateAction} from "react";
import {variables} from "@/configs/variables";

export default memo(function KindFilter({
    kinds,
    setKinds
}: {
    kinds: string[],
    setKinds: Dispatch<SetStateAction<string[]>>
}) {
    return (
        <MultiSelect
            value={kinds}
            onChange={setKinds}
            data={variables.filters.kind}
        />
    );
});