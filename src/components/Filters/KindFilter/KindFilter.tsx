import {MultiSelect} from "@mantine/core";
import {Dispatch, memo, SetStateAction} from "react";
import {variables} from "@/configs/variables";
import classes from '@/components/Filters/FiltersSelect.module.css';

export default memo(function KindFilter({
    kinds,
    setKinds
}: {
    kinds: string[],
    setKinds: Dispatch<SetStateAction<string[]>>
}) {
    return (
        <MultiSelect
            classNames={classes}
            placeholder="Тип"
            value={kinds}
            onChange={setKinds}
            data={variables.filters.kind}
        />
    );
});