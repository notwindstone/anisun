import {Dispatch, memo, SetStateAction} from "react";
import {Select} from "@mantine/core";
import {variables} from "@/configs/variables";

export default memo(function OrderFilter({
    order,
    setOrder
}: {
    order: string | null,
    setOrder: Dispatch<SetStateAction<string | null>>
}) {
    return (
        <Select
            placeholder="Сортировка"
            value={order}
            onChange={setOrder}
            data={variables.filters.order}
        />
    );
});