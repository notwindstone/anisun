import {Dispatch, memo, SetStateAction} from "react";
import {Select} from "@mantine/core";
import {variables} from "@/configs/variables";
import classes from '@/components/Filters/FiltersSelect.module.css';

export default memo(function OrderFilter({
    order,
    setOrder
}: {
    order: string | null,
    setOrder: Dispatch<SetStateAction<string | null>>
}) {
    return (
        <Select
            classNames={classes}
            placeholder="Сортировка"
            value={order}
            onChange={setOrder}
            data={variables.filters.order}
        />
    );
});