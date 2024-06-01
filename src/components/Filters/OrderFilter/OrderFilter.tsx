import {useState} from "react";
import {Select} from "@mantine/core";
import {variables} from "@/configs/variables";

export default function OrderFilter() {
    const [order, setOrder] = useState<string | null>('');

    return (
        <Select
            placeholder="Сортировка"
            value={order}
            onChange={setOrder}
            data={variables.filters.order}
        />
    );
}