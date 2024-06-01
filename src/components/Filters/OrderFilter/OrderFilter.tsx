import {useContext, useState} from "react";
import {Select} from "@mantine/core";
import {variables} from "@/configs/variables";
import {AdvancedSearchFiltersContext} from "@/utils/Contexts/Contexts";

export default function OrderFilter() {
    const { order, setOrder } = useContext(AdvancedSearchFiltersContext);

    return (
        <Select
            placeholder="Сортировка"
            value={order}
            onChange={setOrder}
            data={variables.filters.order}
        />
    );
}